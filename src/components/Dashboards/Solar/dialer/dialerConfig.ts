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

/**
 * Plivo reports a rejected outbound leg and a busy destination with the same
 * 486 "Busy" cause, so point at the call log instead of echoing the code.
 */
export const describeCallFailure = (cause: string) => {
  const value = cause.toLowerCase()
  if (value.includes('busy')) {
    return 'Call rejected as Busy. Check Voice → Logs → Calls in your Plivo Console for the hangup cause, and make sure the endpoint is attached to an application whose answer URL returns a <Dial> element.'
  }
  if (value.includes('media')) {
    return 'Microphone problem — allow microphone access for this page and try again.'
  }
  if (value.includes('invalid') || value.includes('not found') || value.includes('unavailable')) {
    return `${cause} — check the number is valid and that geo permissions allow the destination country.`
  }
  if (value.includes('no answer')) return 'No answer.'
  return cause
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
