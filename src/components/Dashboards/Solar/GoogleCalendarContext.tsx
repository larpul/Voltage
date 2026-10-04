import { createContext, useCallback, useContext, useMemo, useRef, useState, ReactNode } from 'react'
import { toast } from 'react-hot-toast'
import { salesAgents } from './salesAgentsData'
import {
  buildDemoSlots,
  computeFreeSlots,
  connectGoogleCalendar,
  fetchBusyIntervals,
  getWeekWindow,
  isGoogleCalendarConfigured,
  revokeGoogleConnection,
  type GoogleConnection,
  type SlotSource,
  type TimeSlot,
} from './googleCalendar'

export interface AgentCalendarConnection {
  email: string
  connectedAt: number
}

interface GoogleCalendarContextValue {
  configured: boolean
  connections: Record<number, AgentCalendarConnection>
  loadingAgentId: number | null
  /** agentId → free slots read from that agent's synced calendar (absent = not synced). */
  liveAvailability: Record<number, number>
  isConnected: (agentId: number) => boolean
  getSlots: (agentId: number, maxSlots?: number) => TimeSlot[]
  getSlotSource: (agentId: number) => SlotSource
  connect: (agentId: number) => Promise<void>
  disconnect: (agentId: number) => void
  refreshAgent: (agentId: number) => Promise<void>
  refreshConnected: () => Promise<void>
}

const GoogleCalendarContext = createContext<GoogleCalendarContextValue | null>(null)

export const useGoogleCalendar = (): GoogleCalendarContextValue => {
  const ctx = useContext(GoogleCalendarContext)
  if (!ctx) throw new Error('useGoogleCalendar must be used within GoogleCalendarProvider')
  return ctx
}

export const GoogleCalendarProvider = ({ children }: { children: ReactNode }) => {
  const configured = isGoogleCalendarConfigured()
  const [connections, setConnections] = useState<Record<number, AgentCalendarConnection>>({})
  const [liveSlots, setLiveSlots] = useState<Record<number, TimeSlot[]>>({})
  const [loadingAgentId, setLoadingAgentId] = useState<number | null>(null)

  // Access tokens stay in memory only — never written to storage.
  const tokensRef = useRef<Record<number, GoogleConnection>>({})

  const agentName = (agentId: number) =>
    salesAgents.find((a) => a.id === agentId)?.name ?? 'Agent'

  const loadSlots = useCallback(async (agentId: number, connection: GoogleConnection) => {
    const { timeMin, timeMax } = getWeekWindow()
    const busy = await fetchBusyIntervals(connection.accessToken, timeMin, timeMax)
    const slots = computeFreeSlots(busy)
    setLiveSlots((prev) => ({ ...prev, [agentId]: slots }))
  }, [])

  const connect = useCallback(
    async (agentId: number) => {
      if (!isGoogleCalendarConfigured()) {
        toast.error('Add a Google OAuth Client ID to connect calendars.')
        return
      }
      setLoadingAgentId(agentId)
      try {
        const connection = await connectGoogleCalendar()
        tokensRef.current[agentId] = connection
        setConnections((prev) => ({
          ...prev,
          [agentId]: { email: connection.email, connectedAt: Date.now() },
        }))
        try {
          await loadSlots(agentId, connection)
          toast.success(`${agentName(agentId)} connected — live availability synced`)
        } catch (error) {
          toast.error(error instanceof Error ? error.message : 'Could not read the calendar')
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Google sign-in failed')
      } finally {
        setLoadingAgentId(null)
      }
    },
    [loadSlots],
  )

  const refreshAgent = useCallback(
    async (agentId: number) => {
      const connection = tokensRef.current[agentId]
      if (!connection) return
      if (connection.expiresAt <= Date.now()) {
        toast.error(`${agentName(agentId)}'s Google session expired — reconnect`)
        return
      }
      setLoadingAgentId(agentId)
      try {
        await loadSlots(agentId, connection)
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Could not refresh the calendar')
      } finally {
        setLoadingAgentId(null)
      }
    },
    [loadSlots],
  )

  const refreshConnected = useCallback(async () => {
    const connectedIds = Object.keys(tokensRef.current).map(Number)
    if (connectedIds.length === 0) {
      toast.error('Connect at least one agent calendar first.')
      return
    }
    for (const id of connectedIds) {
      await refreshAgent(id)
    }
  }, [refreshAgent])

  const disconnect = useCallback((agentId: number) => {
    const connection = tokensRef.current[agentId]
    if (connection) {
      revokeGoogleConnection(connection)
      delete tokensRef.current[agentId]
    }
    setConnections((prev) => {
      const next = { ...prev }
      delete next[agentId]
      return next
    })
    setLiveSlots((prev) => {
      const next = { ...prev }
      delete next[agentId]
      return next
    })
    toast.success('Calendar disconnected')
  }, [])

  const isConnected = useCallback(
    (agentId: number) => Boolean(connections[agentId]),
    [connections],
  )

  const getSlots = useCallback(
    (agentId: number, maxSlots = 4): TimeSlot[] => {
      const live = liveSlots[agentId]
      if (connections[agentId] && live) return live.slice(0, maxSlots)
      const agent = salesAgents.find((a) => a.id === agentId)
      return buildDemoSlots(agentId, agent?.status ?? 'Active', maxSlots)
    },
    [connections, liveSlots],
  )

  const getSlotSource = useCallback(
    (agentId: number): SlotSource =>
      connections[agentId] && liveSlots[agentId] ? 'live' : 'demo',
    [connections, liveSlots],
  )

  // Free-slot counts per synced agent, for callers that weigh real availability.
  const liveAvailability = useMemo(() => {
    const availability: Record<number, number> = {}
    Object.entries(liveSlots).forEach(([id, slots]) => {
      if (connections[Number(id)]) availability[Number(id)] = slots.length
    })
    return availability
  }, [connections, liveSlots])

  const value = useMemo(
    () => ({
      configured,
      connections,
      loadingAgentId,
      liveAvailability,
      isConnected,
      getSlots,
      getSlotSource,
      connect,
      disconnect,
      refreshAgent,
      refreshConnected,
    }),
    [
      configured,
      connections,
      loadingAgentId,
      liveAvailability,
      isConnected,
      getSlots,
      getSlotSource,
      connect,
      disconnect,
      refreshAgent,
      refreshConnected,
    ],
  )

  return <GoogleCalendarContext.Provider value={value}>{children}</GoogleCalendarContext.Provider>
}
