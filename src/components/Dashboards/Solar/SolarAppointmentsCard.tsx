import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Dropdown, DropdownDivider, Button } from 'react-bootstrap'
import Avatar from '@/components/UiElements/Base/Avatars/Avatar'
import { syncAppointmentsToGoogleCalendar, isGoogleCalendarConfigured, CalendarAppointment } from '@/services/googleCalendar'

import avatar1 from '@/assets/images/avatars/1.png'
import avatar2 from '@/assets/images/avatars/2.png'
import avatar3 from '@/assets/images/avatars/3.png'
import avatar4 from '@/assets/images/avatars/4.png'
import avatar5 from '@/assets/images/avatars/5.png'

interface Appointment {
  id: number
  customer: string
  avatar: string
  type: string
  date: string
  time: string
  status: { text: string; color: string }
}

const appointments: Appointment[] = [
  { id: 1, customer: 'Archie Tones', avatar: avatar1, type: 'Site Survey', date: 'Oct 5', time: '09:00 AM', status: { text: 'Confirmed', color: 'success' } },
  { id: 2, customer: 'Holmes Cherry', avatar: avatar2, type: 'Installation', date: 'Oct 5', time: '11:30 AM', status: { text: 'Confirmed', color: 'success' } },
  { id: 3, customer: 'Malanie Hanvey', avatar: avatar3, type: 'Consultation', date: 'Oct 6', time: '02:00 PM', status: { text: 'Pending', color: 'warning' } },
  { id: 4, customer: 'Kenneth Hune', avatar: avatar4, type: 'Site Survey', date: 'Oct 7', time: '10:00 AM', status: { text: 'Confirmed', color: 'success' } },
  { id: 5, customer: 'Valentine Maton', avatar: avatar5, type: 'Follow-up', date: 'Oct 8', time: '03:30 PM', status: { text: 'Cancelled', color: 'danger' } },
]

type SyncState = 'idle' | 'syncing' | 'success' | 'error'

const SolarAppointmentsCard = () => {
  const [syncState, setSyncState] = useState<SyncState>('idle')
  const [syncMessage, setSyncMessage] = useState('')

  const handleSync = async () => {
    if (!isGoogleCalendarConfigured()) {
      setSyncState('error')
      setSyncMessage('Google Client ID not configured. Add VITE_GOOGLE_CLIENT_ID in the Secrets page.')
      return
    }

    setSyncState('syncing')
    setSyncMessage('Connecting to Google Calendar…')

    try {
      const toSync: CalendarAppointment[] = appointments
        .filter((apt) => apt.status.text !== 'Cancelled')
        .map((apt) => ({
          customer: apt.customer,
          type: apt.type,
          date: apt.date,
          time: apt.time,
          status: apt.status,
        }))

      const result = await syncAppointmentsToGoogleCalendar(toSync)

      setSyncState('success')
      setSyncMessage(
        `Synced ${result.success} appointment${result.success !== 1 ? 's' : ''} to Google Calendar` +
        (result.failed > 0 ? ` (${result.failed} failed)` : '')
      )
    } catch (err) {
      setSyncState('error')
      setSyncMessage(err instanceof Error ? err.message : 'Sync failed')
    }
  }

  const alertClass =
    syncState === 'success' ? 'success' : syncState === 'error' ? 'danger' : 'info'

  return (
    <Card>
      <Card.Header className="py-3 pe-3 d-flex justify-content-between align-items-center">
        <Card.Title>Upcoming Appointments</Card.Title>
        <div className="d-flex align-items-center gap-2">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={handleSync}
            disabled={syncState === 'syncing'}
            className="d-flex align-items-center gap-1"
          >
            <i className="fi fi-br-calendar"></i>
            {syncState === 'syncing' ? 'Syncing…' : 'Sync to Calendar'}
          </Button>
          <Dropdown drop="down">
            <Dropdown.Toggle variant="light" className="p-0 btn-icon btn-md arrow-none">
              <i className="fi fi-bs-menu-dots-vertical"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" style={{ marginTop: '0.875rem' }}>
              <Dropdown.Item>
                <i className="fi fi-rr-share"></i>
                <span className="ms-3">Share</span>
              </Dropdown.Item>
              <Dropdown.Item>
                <i className="fi fi-rr-refresh"></i>
                <span className="ms-3">Refresh</span>
              </Dropdown.Item>
              <DropdownDivider />
              <Dropdown.Item>
                <i className="fi fi-rr-calendar"></i>
                <span className="ms-3">Full Calendar</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Card.Header>

      {syncState !== 'idle' && (
        <div className={`alert alert-${alertClass} py-2 px-3 mb-0 rounded-0 d-flex align-items-center gap-2`}>
          <i className={`fi ${syncState === 'success' ? 'fi-rr-check-circle' : syncState === 'error' ? 'fi-rr-cross-circle' : 'fi-rr-spinner'}`}></i>
          <span className="fs-13">{syncMessage}</span>
        </div>
      )}
      <div className="table-responsive">
        <table className="table mb-0">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Type</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((apt) => (
              <tr key={apt.id}>
                <td>
                  <div className="hstack">
                    <Avatar size="md" type="image" src={apt.avatar} alt={apt.customer} />
                    <Link to="" className="ms-3">
                      {apt.customer}
                    </Link>
                  </div>
                </td>
                <td>
                  <span className="badge bg-info-subtle text-info">{apt.type}</span>
                </td>
                <td className="fs-13 text-muted">{apt.date}</td>
                <td className="fs-13 text-muted">{apt.time}</td>
                <td>
                  <span className={`badge bg-${apt.status.color}-subtle text-${apt.status.color}`}>
                    {apt.status.text}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default SolarAppointmentsCard
