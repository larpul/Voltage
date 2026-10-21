export interface PlivoDialerConfig {
  username: string
  password: string
  callerId: string
}

/**
 * The SDK builds the SIP address itself as `<username>@phone.plivo.com`, so a
 * pasted "sip:user@phone.plivo.com" (or a trailing newline) has to be reduced
 * to the bare endpoint username first.
 */
const normalizeEndpointUsername = (value: string) =>
  value.trim().replace(/^sips?:/i, '').split('@')[0].trim()

export const plivoConfig: PlivoDialerConfig = {
  username: normalizeEndpointUsername(import.meta.env.VITE_PLIVO_ENDPOINT_USERNAME ?? ''),
  password: (import.meta.env.VITE_PLIVO_ENDPOINT_PASSWORD ?? '').trim(),
  callerId: (import.meta.env.VITE_PLIVO_CALLER_ID ?? '').trim(),
}

export const isPlivoConfigured = Boolean(plivoConfig.username && plivoConfig.password)

export const credentialIssue = () => {
  if (/\s/.test(plivoConfig.username)) {
    return 'The Plivo endpoint username still contains spaces. Copy just the Username shown in Plivo Console → Voice → Endpoints.'
  }
  return ''
}

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
