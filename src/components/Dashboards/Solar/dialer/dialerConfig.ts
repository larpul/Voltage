export interface PlivoDialerConfig {
  username: string
  password: string
  callerId: string
}

export const plivoConfig: PlivoDialerConfig = {
  username: import.meta.env.VITE_PLIVO_ENDPOINT_USERNAME ?? '',
  password: import.meta.env.VITE_PLIVO_ENDPOINT_PASSWORD ?? '',
  callerId: import.meta.env.VITE_PLIVO_CALLER_ID ?? '',
}

export const isPlivoConfigured = Boolean(plivoConfig.username && plivoConfig.password)

/**
 * Keeps digits (and a leading +) so numbers pasted as "(513) 555-0142"
 * are still dialable, e.g. "5135550142".
 */
export const toDialableNumber = (value: string) => {
  const cleaned = value.replace(/[^\d+]/g, '')
  if (cleaned.startsWith('+')) return `+${cleaned.slice(1).replace(/\+/g, '')}`
  return cleaned.replace(/\+/g, '')
}

export const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  return `${minutes}:${String(seconds % 60).padStart(2, '0')}`
}

export const formatCallTime = (isoDate: string) =>
  new Date(isoDate).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
