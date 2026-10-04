import { Link } from 'react-router-dom'
import { Card, Dropdown, DropdownDivider } from 'react-bootstrap'
import Avatar from '@/components/UiElements/Base/Avatars/Avatar'

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

const SolarAppointmentsCard = () => {
  return (
    <Card>
      <Card.Header className="py-3 pe-3 d-flex justify-content-between align-items-center">
        <Card.Title>Upcoming Appointments</Card.Title>
        <Dropdown className="ms-auto" drop="down">
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
      </Card.Header>
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
