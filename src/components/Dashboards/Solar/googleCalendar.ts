import type { AgentStatus } from './salesAgentsData'

/**
 * Google Calendar availability connector.
 *
 * Browser-only (this app has no backend), so it uses Google Identity Services'
 * OAuth token model — no client secret, access tokens live in memory and are
 * never persisted. Live sync activates once a Google OAuth Client ID is
 * provided; until then the UI falls back to deterministic demo slots.
 */

export const GOOGLE_CLIENT_ID: string = import.meta.env.VITE_GOOGLE_CLIENT_ID ?? ''

export const isGoogleCalendarConfigured = (): boolean => GOOGLE_CLIENT_ID.trim().length > 0

const GIS_SRC = 'https://accounts.google.com/gsi/client'
const CALENDAR_SCOPE = 'https://www.googleapis.com/auth/calendar.readonly'
const USERINFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo'
const FREEBUSY_URL = 'https://www.googleapis.com/calendar/v3/freeBusy'

const WORK_START_HOUR = 8
const WORK_END_HOUR = 18
const SLOT_MINUTES = 60
const DEMO_GAP_MINUTES = 90
const LOOKAHEAD_DAYS = 4

export interface GoogleConnection {
  accessToken: string
  email: string
  expiresAt: number
}

export interface BusyInterval {
  start: string
  end: string
}

export interface TimeSlot {
  start: string
  end: string
}

export type SlotSource = 'live' | 'demo'

interface TokenResponse {
  access_token?: string
  expires_in?: number | string
  error?: string
}

interface TokenClient {
  requestAccessToken: (overrideConfig?: { prompt?: string }) => void
}

interface GoogleIdentity {
  oauth2: {
    initTokenClient: (config: {
      client_id: string
      scope: string
      callback: (response: TokenResponse) => void
      error_callback?: (error: { message?: string }) => void
    }) => TokenClient
    revoke?: (token: string) => void
  }
}

const getGoogleIdentity = (): GoogleIdentity | undefined =>
  (window as Window & { google?: { accounts?: GoogleIdentity } }).google?.accounts

let gisPromise: Promise<GoogleIdentity> | null = null

function loadGoogleIdentity(): Promise<GoogleIdentity> {
  const existing = getGoogleIdentity()
  if (existing) return Promise.resolve(existing)
  if (gisPromise) return gisPromise

  gisPromise = new Promise<GoogleIdentity>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = GIS_SRC
    script.async = true
    script.defer = true
    script.onload = () => {
      const identity = getGoogleIdentity()
      if (identity) resolve(identity)
      else reject(new Error('Google Identity Services failed to initialise'))
    }
    script.onerror = () => reject(new Error('Could not load Google Identity Services'))
    document.head.appendChild(script)
  })

  return gisPromise
}

async function fetchAccountEmail(accessToken: string): Promise<string> {
  const response = await fetch(USERINFO_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!response.ok) throw new Error('Could not read the Google account')
  const data = (await response.json()) as { email?: string }
  return data.email ?? 'primary'
}

/** Opens the Google consent popup for one agent's calendar and returns its token. */
export async function connectGoogleCalendar(): Promise<GoogleConnection> {
  if (!isGoogleCalendarConfigured()) {
    throw new Error('No Google OAuth Client ID configured')
  }
  const identity = await loadGoogleIdentity()

  return new Promise<GoogleConnection>((resolve, reject) => {
    const client = identity.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: CALENDAR_SCOPE,
      callback: (response) => {
        if (response.error || !response.access_token) {
          reject(new Error(response.error ?? 'Google sign-in was cancelled'))
          return
        }
        const accessToken = response.access_token
        const expiresAt = Date.now() + (Number(response.expires_in) || 3600) * 1000
        fetchAccountEmail(accessToken)
          .then((email) => resolve({ accessToken, email, expiresAt }))
          .catch(() => resolve({ accessToken, email: 'primary', expiresAt }))
      },
      error_callback: (error) => reject(new Error(error?.message ?? 'Google sign-in failed')),
    })
    client.requestAccessToken()
  })
}

export function revokeGoogleConnection(connection: GoogleConnection): void {
  getGoogleIdentity()?.oauth2.revoke?.(connection.accessToken)
}

/** Busy intervals from the connected account's primary calendar for the window. */
export async function fetchBusyIntervals(
  accessToken: string,
  timeMin: string,
  timeMax: string,
): Promise<BusyInterval[]> {
  const response = await fetch(FREEBUSY_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ timeMin, timeMax, items: [{ id: 'primary' }] }),
  })
  if (response.status === 401) throw new Error('Google session expired — reconnect this agent')
  if (!response.ok) throw new Error(`Google Calendar API error (${response.status})`)
  const data = (await response.json()) as {
    calendars?: Record<string, { busy?: BusyInterval[] }>
  }
  return data.calendars?.primary?.busy ?? []
}

/** Query window starting at midnight today, long enough to cover the lookahead. */
export function getWeekWindow(from: Date = new Date()): { timeMin: string; timeMax: string } {
  const timeMin = new Date(from)
  timeMin.setHours(0, 0, 0, 0)
  const timeMax = new Date(timeMin)
  timeMax.setDate(timeMax.getDate() + LOOKAHEAD_DAYS + 2)
  return { timeMin: timeMin.toISOString(), timeMax: timeMax.toISOString() }
}

function startOfDay(date: Date): Date {
  const copy = new Date(date)
  copy.setHours(0, 0, 0, 0)
  return copy
}

/** Snaps a cursor forward to the next half hour, never earlier than `notBefore`. */
function snapForward(cursor: Date, notBefore: number): void {
  if (notBefore > 0 && cursor.getTime() < notBefore) cursor.setTime(notBefore)
  cursor.setMinutes(cursor.getMinutes() + ((30 - (cursor.getMinutes() % 30)) % 30), 0, 0)
}

interface SlotScanOptions {
  maxSlots: number
  from: Date
  /** Extra minutes added to the first slot of a day — keeps demo agents staggered. */
  stagger?: (dayOffset: number) => number
  /** Minutes between slots on the same day. */
  gapMinutes?: (dayOffset: number) => number
}

function scanWorkingDays(
  options: SlotScanOptions,
  isFree: (start: number, end: number) => boolean,
): TimeSlot[] {
  const { maxSlots, from, stagger, gapMinutes } = options
  const slots: TimeSlot[] = []

  for (let dayOffset = 0; dayOffset < LOOKAHEAD_DAYS && slots.length < maxSlots; dayOffset++) {
    const day = new Date(from)
    day.setDate(day.getDate() + dayOffset)

    const dayEnd = new Date(day)
    dayEnd.setHours(WORK_END_HOUR, 0, 0, 0)

    const cursor = new Date(day)
    cursor.setHours(WORK_START_HOUR, 0, 0, 0)
    if (stagger) cursor.setMinutes(cursor.getMinutes() + stagger(dayOffset), 0, 0)
    snapForward(cursor, dayOffset === 0 ? Date.now() : 0)

    const gap = gapMinutes ? gapMinutes(dayOffset) : SLOT_MINUTES

    while (cursor.getTime() + SLOT_MINUTES * 60_000 <= dayEnd.getTime() && slots.length < maxSlots) {
      const start = cursor.getTime()
      const end = start + SLOT_MINUTES * 60_000
      if (isFree(start, end)) {
        slots.push({ start: new Date(start).toISOString(), end: new Date(end).toISOString() })
      }
      cursor.setTime(start + gap * 60_000)
    }
  }

  return slots
}

/** Upcoming free working-hour slots, given the account's busy intervals. */
export function computeFreeSlots(busy: BusyInterval[], maxSlots = 4, from = new Date()): TimeSlot[] {
  const busyRanges = busy.map((interval) => ({
    start: new Date(interval.start).getTime(),
    end: new Date(interval.end).getTime(),
  }))
  return scanWorkingDays({ maxSlots, from }, (start, end) =>
    !busyRanges.some((range) => start < range.end && end > range.start),
  )
}

/** Deterministic stand-in availability so the dashboard stays useful before connecting. */
export function buildDemoSlots(
  agentId: number,
  status: AgentStatus,
  maxSlots = 4,
  from = new Date(),
): TimeSlot[] {
  const loadBonus = status === 'Off Duty' ? 5 : status === 'On Site Visit' ? 3 : status === 'Traveling' ? 2 : 0

  return scanWorkingDays(
    {
      maxSlots,
      from,
      stagger: () => 60 + ((agentId * 47 + loadBonus * 53) % 4) * 30,
      gapMinutes: (dayOffset) => DEMO_GAP_MINUTES + ((agentId * 17 + dayOffset * 11) % 3) * 30,
    },
    () => true,
  )
}

export function formatSlotTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

/** "4:00 PM", "Tomorrow 9:00 AM" or "Mon 9:00 AM" depending on how far out the slot is. */
export function formatSlotLabel(iso: string): string {
  const date = new Date(iso)
  const dayDiff = Math.round(
    (startOfDay(date).getTime() - startOfDay(new Date()).getTime()) / 86_400_000,
  )
  const time = formatSlotTime(iso)
  if (dayDiff <= 0) return time
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' })
  return dayDiff === 1 ? `Tomorrow ${time}` : `${dayName} ${time}`
}
