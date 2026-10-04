import avatar1 from '@/assets/images/avatars/1.png'
import avatar2 from '@/assets/images/avatars/2.png'
import avatar3 from '@/assets/images/avatars/3.png'
import avatar4 from '@/assets/images/avatars/4.png'
import avatar5 from '@/assets/images/avatars/5.png'
import avatar6 from '@/assets/images/avatars/6.png'

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
}

export const salesAgents: SalesAgent[] = [
  {
    id: 1,
    name: 'Mike Reynolds',
    avatar: avatar1,
    currentLocation: 'Portland, OR',
    coords: [45.52, -122.68],
    status: 'On Site Visit',
    lastUpdated: '2 min ago',
    assignedInstallations: 4,
    phone: '(503) 555-0101',
    email: 'mike.reynolds@volt360.com',
  },
  {
    id: 2,
    name: 'Sarah Chen',
    avatar: avatar2,
    currentLocation: 'Austin, TX',
    coords: [30.27, -97.74],
    status: 'Active',
    lastUpdated: '5 min ago',
    assignedInstallations: 3,
    phone: '(512) 555-0102',
    email: 'sarah.chen@volt360.com',
  },
  {
    id: 3,
    name: 'James Carter',
    avatar: avatar3,
    currentLocation: 'Denver, CO',
    coords: [39.74, -104.99],
    status: 'Traveling',
    lastUpdated: '12 min ago',
    assignedInstallations: 2,
    phone: '(303) 555-0103',
    email: 'james.carter@volt360.com',
  },
  {
    id: 4,
    name: 'Lisa Torres',
    avatar: avatar4,
    currentLocation: 'Miami, FL',
    coords: [25.76, -80.19],
    status: 'On Site Visit',
    lastUpdated: '1 min ago',
    assignedInstallations: 3,
    phone: '(305) 555-0104',
    email: 'lisa.torres@volt360.com',
  },
  {
    id: 5,
    name: 'David Park',
    avatar: avatar5,
    currentLocation: 'Phoenix, AZ',
    coords: [33.45, -112.07],
    status: 'Active',
    lastUpdated: '8 min ago',
    assignedInstallations: 2,
    phone: '(602) 555-0105',
    email: 'david.park@volt360.com',
  },
  {
    id: 6,
    name: 'Emily Stone',
    avatar: avatar6,
    currentLocation: 'Dallas, TX',
    coords: [32.78, -96.80],
    status: 'Off Duty',
    lastUpdated: '2 hr ago',
    assignedInstallations: 0,
    phone: '(214) 555-0106',
    email: 'emily.stone@volt360.com',
  },
]

export const statusConfig: Record<AgentStatus, { color: string; hex: string; icon: string }> = {
  'Active': { color: 'success', hex: '#25b865', icon: 'fi-rr-marker' },
  'Traveling': { color: 'warning', hex: '#fb6c25', icon: 'fi-rr-road' },
  'On Site Visit': { color: 'primary', hex: '#3e97ff', icon: 'fi-rr-home' },
  'Off Duty': { color: 'secondary', hex: '#9e9e9e', icon: 'fi-rr-minus-circle' },
}
