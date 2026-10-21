import { useCallback, useEffect, useRef, useState } from 'react'
import Plivo from 'plivo-browser-sdk'
import { credentialIssue, isPlivoConfigured, plivoConfig, toDialableNumber } from './dialerConfig'
import { CallOutcome, RecentCall, addRecentCall, loadRecentCalls } from './recentCalls'

export type LoginStatus = 'unconfigured' | 'connecting' | 'ready' | 'error'
export type CallStatus = 'idle' | 'dialing' | 'ringing' | 'connected'

const MIN_DIAL_LENGTH = 3
const configIssue = credentialIssue()

/**
 * Registers the Plivo endpoint in the browser and exposes the dialer actions.
 * Nothing is dialled when the endpoint credentials are missing — the card
 * renders a setup notice instead.
 */
export const usePlivoDialer = () => {
  const clientRef = useRef<Plivo['client'] | null>(null)
  const callRef = useRef<{ number: string; outcome: CallOutcome; answeredAt: number }>({
    number: '',
    outcome: 'canceled',
    answeredAt: 0,
  })

  const [loginStatus, setLoginStatus] = useState<LoginStatus>(
    !isPlivoConfigured ? 'unconfigured' : configIssue ? 'error' : 'connecting',
  )
  const [loginError, setLoginError] = useState(configIssue)
  const [callStatus, setCallStatus] = useState<CallStatus>('idle')
  const [number, setNumber] = useState('')
  const [elapsed, setElapsed] = useState(0)
  const [muted, setMuted] = useState(false)
  const [recentCalls, setRecentCalls] = useState<RecentCall[]>(loadRecentCalls)

  const finishCall = useCallback(() => {
    const { number: dialed, outcome, answeredAt } = callRef.current
    if (dialed) {
      setRecentCalls((calls) =>
        addRecentCall(calls, {
          number: dialed,
          outcome,
          durationSec: answeredAt ? Math.round((Date.now() - answeredAt) / 1000) : 0,
          at: new Date().toISOString(),
        }),
      )
    }
    callRef.current = { number: '', outcome: 'canceled', answeredAt: 0 }
    setCallStatus('idle')
    setElapsed(0)
    setMuted(false)
  }, [])

  useEffect(() => {
    if (!isPlivoConfigured || configIssue) return

    const plivo = new Plivo({ debug: 'OFF', permOnClick: true, closeProtection: false })
    const client = plivo.client
    clientRef.current = client

    client.on('onLogin', () => {
      setLoginStatus('ready')
      setLoginError('')
    })
    client.on('onLoginFailed', (...args: unknown[]) => {
      // The SDK emits a single message string here, but earlier versions also
      // passed an error code first — keep whichever strings arrived.
      const message = args.filter((arg): arg is string => typeof arg === 'string').pop()
      setLoginStatus('error')
      setLoginError(
        message?.includes('Failed to create user agent')
          ? 'Plivo could not register the endpoint. Check the endpoint username and password in Plivo Console → Voice → Endpoints.'
          : message || 'Plivo could not register the endpoint.',
      )
    })
    client.on('onCalling', () => setCallStatus('dialing'))
    client.on('onCallRemoteRinging', () => setCallStatus('ringing'))
    client.on('onCallAnswered', () => {
      callRef.current = { ...callRef.current, outcome: 'answered', answeredAt: Date.now() }
      setCallStatus('connected')
      setElapsed(0)
    })
    client.on('onCallTerminated', () => finishCall())
    client.on('onCallFailed', () => {
      callRef.current = {
        ...callRef.current,
        outcome: callRef.current.answeredAt ? 'answered' : 'failed',
      }
      finishCall()
    })

    client.login(plivoConfig.username, plivoConfig.password)

    return () => {
      client.logout()
      clientRef.current = null
    }
  }, [finishCall])

  useEffect(() => {
    if (callStatus !== 'connected') return
    const timer = window.setInterval(() => setElapsed((value) => value + 1), 1000)
    return () => window.clearInterval(timer)
  }, [callStatus])

  const digits = toDialableNumber(number)
  const canDial = loginStatus === 'ready' && callStatus === 'idle' && digits.length >= MIN_DIAL_LENGTH

  const pressKey = useCallback((key: string) => {
    if (callRef.current.answeredAt && clientRef.current) {
      clientRef.current.sendDtmf(key)
      return
    }
    setNumber((value) => `${value}${key}`)
  }, [])

  const backspace = useCallback(() => setNumber((value) => value.slice(0, -1)), [])

  const placeCall = useCallback(() => {
    const client = clientRef.current
    if (!client || !canDial) return
    callRef.current = { number: digits, outcome: 'canceled', answeredAt: 0 }
    setCallStatus('dialing')
    client.call(digits, {})
  }, [canDial, digits])

  const hangUp = useCallback(() => clientRef.current?.hangup(), [])

  const toggleMute = useCallback(() => {
    const client = clientRef.current
    if (!client) return
    if (muted) client.unmute()
    else client.mute()
    setMuted((value) => !value)
  }, [muted])

  return {
    loginStatus,
    loginError,
    callStatus,
    number,
    setNumber,
    elapsed,
    muted,
    canDial,
    recentCalls,
    pressKey,
    backspace,
    placeCall,
    hangUp,
    toggleMute,
  }
}
