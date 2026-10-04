export type AgentStatus = 'Active' | 'Traveling' | 'On Site Visit' | 'Off Duty'

export interface SalesAgent {
  id: number
  name: string
  avatar: string
  currentLocation: string
  coords: [number, number]
  status: AgentStatus
  lastUpdated: string
  assignedInstallations: number
  phone: string
  email: string
  monthlyGoal: number
  monthlyEarned: number
  commissionRate: number
  dealsClosed: number
}

export const salesAgents: SalesAgent[] = [
  {
    id: 1,
    name: 'Mike Reynolds',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    currentLocation: '1234 Vine St, Cincinnati, OH',
    coords: [39.1164, -84.5147],
    status: 'On Site Visit',
    lastUpdated: '2 min ago',
    assignedInstallations: 4,
    phone: '(513) 555-0101',
    email: 'mike.reynolds@volt360.com',
    monthlyGoal: 75000,
    monthlyEarned: 52000,
    commissionRate: 8,
    dealsClosed: 6,
  },
  {
    id: 2,
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    currentLocation: '5671 Hamilton Ave, Cincinnati, OH',
    coords: [39.1616, -84.5245],
    status: 'Active',
    lastUpdated: '5 min ago',
    assignedInstallations: 3,
    phone: '(513) 555-0102',
    email: 'sarah.chen@volt360.com',
    monthlyGoal: 75000,
    monthlyEarned: 71000,
    commissionRate: 8,
    dealsClosed: 9,
  },
  {
    id: 3,
    name: 'James Carter',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    currentLocation: '8920 Reading Rd, Cincinnati, OH',
    coords: [39.2202, -84.4189],
    status: 'Traveling',
    lastUpdated: '12 min ago',
    assignedInstallations: 2,
    phone: '(513) 555-0103',
    email: 'james.carter@volt360.com',
    monthlyGoal: 60000,
    monthlyEarned: 34500,
    commissionRate: 7,
    dealsClosed: 4,
  },
  {
    id: 4,
    name: 'Lisa Torres',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    currentLocation: '3401 Montgomery Rd, Cincinnati, OH',
    coords: [39.1322, -84.4706],
    status: 'On Site Visit',
    lastUpdated: '1 min ago',
    assignedInstallations: 3,
    phone: '(513) 555-0104',
    email: 'lisa.torres@volt360.com',
    monthlyGoal: 70000,
    monthlyEarned: 61500,
    commissionRate: 7.5,
    dealsClosed: 7,
  },
  {
    id: 5,
    name: 'David Park',
    avatar: 'https://images.unsplash.com/photo-1633332755192-780a367c9a11?w=150&h=150&fit=crop&crop=face',
    currentLocation: '2450 Riverside Dr, Cincinnati, OH',
    coords: [39.0994, -84.4881],
    status: 'Active',
    lastUpdated: '8 min ago',
    assignedInstallations: 2,
    phone: '(513) 555-0105',
    email: 'david.park@volt360.com',
    monthlyGoal: 65000,
    monthlyEarned: 28000,
    commissionRate: 6.5,
    dealsClosed: 3,
  },
  {
    id: 6,
    name: 'Emily Stone',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    currentLocation: '11200 Princeton Pike, Cincinnati, OH',
    coords: [39.2917, -84.4367],
    status: 'Off Duty',
    lastUpdated: '2 hr ago',
    assignedInstallations: 0,
    phone: '(513) 555-0106',
    email: 'emily.stone@volt360.com',
    monthlyGoal: 50000,
    monthlyEarned: 12000,
    commissionRate: 6,
    dealsClosed: 1,
  },
]

export const statusConfig: Record<AgentStatus, { color: string; hex: string; icon: string }> = {
  'Active': { color: 'success', hex: '#25b865', icon: 'fi-rr-marker' },
  'Traveling': { color: 'warning', hex: '#fb6c25', icon: 'fi-rr-road' },
  'On Site Visit': { color: 'primary', hex: '#fd670a', icon: 'fi-rr-home' },
  'Off Duty': { color: 'secondary', hex: '#9e9e9e', icon: 'fi-rr-minus-circle' },
}
