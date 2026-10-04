// Google Calendar sync service — pushes dashboard appointments to the user's
// primary Google Calendar via the Calendar REST API and Google Identity Services (GIS).

interface TokenClient {
  requestAccessToken: (overrideConfig?: { prompt?: string }) => void
}

interface TokenResponse {
  access_token: string
  expires_in: number
  scope: string
  token_type: string
  error?: string
  error_description?: string
}

interface GisWindow extends Window {
  google?: {
    accounts: {
      oauth2: {
        initTokenClient: (config: {
          client_id: string
          scope: string
          callback: (response: TokenResponse) => void
        }) => TokenClient
      }
    }
  }
}

const GIS_SCRIPT_SRC = 'https://accounts.google.com/gsi/client'
const CALENDAR_API_BASE = 'https://www.googleapis.com/calendar/v3'
const CALENDAR_SCOPE = 'https://www.googleapis.com/auth/calendar.events'

let gisLoaded = false

function loadGisScript(): Promise<void> {
  if (gisLoaded) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = GIS_SCRIPT_SRC
    script.async = true
    script.defer = true
    script.onload = () => {
      gisLoaded = true
      resolve()
    }
    script.onerror = () => reject(new Error('Failed to load Google Identity Services'))
    document.head.appendChild(script)
  })
}

export interface CalendarAppointment {
  customer: string
  type: string
  date: string
  time: string
  status: { text: string; color: string }
}

function buildEventDateTime(dateStr: string, timeStr: string) {
  const year = new Date().getFullYear()
  const months: Record<string, string> = {
    Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
    Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12',
  }
  const [monthName, dayStr] = dateStr.split(' ')
  const month = months[monthName] || '01'
  const day = dayStr.padStart(2, '0')

  // Parse "09:00 AM" into 24h hours/minutes
  const timeMatch = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i)
  let hours = 9
  let minutes = 0
  if (timeMatch) {
    hours = parseInt(timeMatch[1], 10)
    minutes = parseInt(timeMatch[2], 10)
    const period = timeMatch[3].toUpperCase()
    if (period === 'PM' && hours !== 12) hours += 12
    if (period === 'AM' && hours === 12) hours = 0
  }

  const start = new Date(year, parseInt(month, 10) - 1, parseInt(day, 10), hours, minutes)
  const end = new Date(start.getTime() + 60 * 60 * 1000) // 1 hour duration

  return {
    start: { dateTime: start.toISOString() },
    end: { dateTime: end.toISOString() },
  }
}

async function createCalendarEvent(accessToken: string, appointment: CalendarAppointment): Promise<boolean> {
  const { start, end } = buildEventDateTime(appointment.date, appointment.time)
  const event = {
    summary: `${appointment.type}: ${appointment.customer}`,
    description: `Solar Dashboard Appointment\n\nCustomer: ${appointment.customer}\nType: ${appointment.type}\nStatus: ${appointment.status.text}`,
    start,
    end,
  }
  const response = await fetch(`${CALENDAR_API_BASE}/calendars/primary/events`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  })
  return response.ok
}

export function getGoogleClientId(): string {
  return import.meta.env.VITE_GOOGLE_CLIENT_ID || ''
}

export function isGoogleCalendarConfigured(): boolean {
  return !!getGoogleClientId()
}

export async function syncAppointmentsToGoogleCalendar(
  appointments: CalendarAppointment[]
): Promise<{ success: number; failed: number }> {
  const clientId = getGoogleClientId()
  if (!clientId) {
    throw new Error('Google Client ID not configured. Add VITE_GOOGLE_CLIENT_ID to your environment.')
  }

  await loadGisScript()

  const gisWindow = window as GisWindow
  if (!gisWindow.google?.accounts?.oauth2) {
    throw new Error('Google Identity Services not available')
  }

  return new Promise((resolve, reject) => {
    const tokenClient = gisWindow.google!.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: CALENDAR_SCOPE,
      callback: async (response: TokenResponse) => {
        if (response.error) {
          reject(new Error(response.error_description || response.error))
          return
        }
        const token = response.access_token
        let success = 0
        let failed = 0
        for (const apt of appointments) {
          const ok = await createCalendarEvent(token, apt)
          if (ok) success++
          else failed++
        }
        resolve({ success, failed })
      },
    })
    tokenClient.requestAccessToken({ prompt: 'consent' })
  })
}
