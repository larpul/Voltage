import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { toast } from 'react-hot-toast'
import { salesAgents } from './salesAgentsData'
import { Installation } from './installationData'

export interface AgentNotification {
  id: string
  agentId: number
  agentName: string
  agentAvatar: string
  installationId: number
  customerName: string
  address: string
  systemSize: string
  phase: string
  timestamp: string
  read: boolean
}

interface AgentNotificationContextValue {
  notifications: AgentNotification[]
  unreadCount: number
  assignments: Record<number, number>
  assignAgent: (installation: Installation, agentId: number) => void
  markAllRead: () => void
  markRead: (id: string) => void
  getAssignedAgentId: (installationId: number) => number | null
}

const AgentNotificationContext = createContext<AgentNotificationContextValue | null>(null)

export const useAgentNotifications = () => {
  const ctx = useContext(AgentNotificationContext)
  if (!ctx) throw new Error('useAgentNotifications must be used within AgentNotificationProvider')
  return ctx
}

export const AgentNotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<AgentNotification[]>([])
  const [assignments, setAssignments] = useState<Record<number, number>>({})

  const assignAgent = useCallback((installation: Installation, agentId: number) => {
    const agent = salesAgents.find((a) => a.id === agentId)
    if (!agent) return

    setAssignments((prev) => ({ ...prev, [installation.id]: agentId }))

    const notification: AgentNotification = {
      id: `${Date.now()}-${installation.id}`,
      agentId: agent.id,
      agentName: agent.name,
      agentAvatar: agent.avatar,
      installationId: installation.id,
      customerName: installation.customer,
      address: installation.address,
      systemSize: installation.systemSize,
      phase: installation.phase,
      timestamp: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      }),
      read: false,
    }

    setNotifications((prev) => [notification, ...prev])

    toast.success(`${agent.name} notified of new assignment: ${installation.customer}`, {
      icon: '🔔',
      duration: 4000,
    })
  }, [])

  const markRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }, [])

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }, [])

  const getAssignedAgentId = useCallback(
    (installationId: number) => assignments[installationId] ?? null,
    [assignments]
  )

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <AgentNotificationContext.Provider
      value={{ notifications, unreadCount, assignments, assignAgent, markAllRead, markRead, getAssignedAgentId }}
    >
      {children}
    </AgentNotificationContext.Provider>
  )
}
