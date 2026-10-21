export type CallOutcome = 'answered' | 'no-answer' | 'failed' | 'canceled'

export interface RecentCall {
  id: string
  number: string
  outcome: CallOutcome
  durationSec: number
  at: string
}

const STORAGE_KEY = 'solar.plivoDialer.recentCalls'
const MAX_RECENT_CALLS = 8

export const outcomeLabels: Record<CallOutcome, string> = {
  answered: 'Answered',
  'no-answer': 'No answer',
  failed: 'Failed',
  canceled: 'Canceled',
}

export const outcomeColors: Record<CallOutcome, string> = {
  answered: 'success',
  'no-answer': 'warning',
  failed: 'danger',
  canceled: 'secondary',
}

export const loadRecentCalls = (): RecentCall[] => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored ? (JSON.parse(stored) as RecentCall[]) : []
  } catch {
    return []
  }
}

export const addRecentCall = (calls: RecentCall[], call: Omit<RecentCall, 'id'>): RecentCall[] => {
  const next = [{ ...call, id: `${Date.now()}-${call.number}` }, ...calls].slice(0, MAX_RECENT_CALLS)
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    return next
  }
  return next
}
