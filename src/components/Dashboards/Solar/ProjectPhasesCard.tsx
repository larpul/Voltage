import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Dropdown, DropdownDivider } from 'react-bootstrap'
import Avatar from '@/components/UiElements/Base/Avatars/Avatar'

import avatar1 from '@/assets/images/avatars/1.png'
import avatar2 from '@/assets/images/avatars/2.png'
import avatar3 from '@/assets/images/avatars/3.png'
import avatar4 from '@/assets/images/avatars/4.png'
import avatar5 from '@/assets/images/avatars/5.png'
import avatar6 from '@/assets/images/avatars/6.png'

type Phase = 'Site Survey' | 'Permit Review' | 'Pending Install' | 'Installation' | 'Completed'

interface Project {
  id: number
  customer: string
  avatar: string
  address: string
  systemSize: string
  phase: Phase
}

const projects: Project[] = [
  { id: 1, customer: 'Archie Tones', avatar: avatar1, address: '128 Maple St, Austin TX', systemSize: '8.5 kW', phase: 'Permit Review' },
  { id: 2, customer: 'Holmes Cherry', avatar: avatar2, address: '45 Oak Ave, Denver CO', systemSize: '10.2 kW', phase: 'Completed' },
  { id: 3, customer: 'Malanie Hanvey', avatar: avatar3, address: '72 Pine Rd, Phoenix AZ', systemSize: '6.0 kW', phase: 'Pending Install' },
  { id: 4, customer: 'Kenneth Hune', avatar: avatar4, address: '15 Birch Ln, Portland OR', systemSize: '12.4 kW', phase: 'Site Survey' },
  { id: 5, customer: 'Valentine Maton', avatar: avatar5, address: '301 Cedar Dr, Miami FL', systemSize: '9.8 kW', phase: 'Pending Install' },
  { id: 6, customer: 'Selina Kyle', avatar: avatar6, address: '88 Elm Ct, Dallas TX', systemSize: '7.2 kW', phase: 'Completed' },
  { id: 7, customer: 'Bruce Wayne', avatar: avatar1, address: '1007 Mountain Dr, Gotham NJ', systemSize: '15.0 kW', phase: 'Permit Review' },
  { id: 8, customer: 'Diana Prince', avatar: avatar2, address: '1200 Themis Blvd, DC', systemSize: '11.5 kW', phase: 'Installation' },
]

const phaseConfig: Record<Phase, { color: string; step: number }> = {
  'Site Survey': { color: 'info', step: 1 },
  'Permit Review': { color: 'warning', step: 2 },
  'Pending Install': { color: 'primary', step: 3 },
  'Installation': { color: 'info', step: 4 },
  'Completed': { color: 'success', step: 5 },
}

const PHASE_STEPS = 5

type Filter = Phase | 'All'

const ProjectPhasesCard = () => {
  const [filter, setFilter] = useState<Filter>('All')

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.phase === filter)

  const summary: { phase: Phase; icon: string }[] = [
    { phase: 'Permit Review', icon: 'fi-rr-document' },
    { phase: 'Pending Install', icon: 'fi-rr-sun' },
    { phase: 'Completed', icon: 'fi-rr-check-circle' },
  ]

  return (
    <Card>
      <Card.Header className="py-3 pe-3 d-flex justify-content-between align-items-center">
        <Card.Title>Installation Project Phases</Card.Title>
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
              <i className="fi fi-rr-stats"></i>
              <span className="ms-3">All Projects</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Card.Header>

      <Card.Body className="pb-0">
        <div className="d-flex gap-2 flex-wrap mb-3">
          {summary.map(({ phase, icon }) => {
            const count = projects.filter((p) => p.phase === phase).length
            const active = filter === phase
            return (
              <span
                key={phase}
                className={`badge px-3 py-2 bg-${phaseConfig[phase].color}-subtle text-${phaseConfig[phase].color} ${active ? `border border-${phaseConfig[phase].color}` : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={() => setFilter(active ? 'All' : phase)}
              >
                <i className={`fi ${icon}`}></i>
                <span className="ms-2">{phase}: {count}</span>
              </span>
            )
          })}
          {filter !== 'All' && (
            <span
              className="badge px-3 py-2 bg-light text-muted border"
              style={{ cursor: 'pointer' }}
              onClick={() => setFilter('All')}
            >
              <i className="fi fi-rr-cross-circle"></i>
              <span className="ms-2">Clear filter</span>
            </span>
          )}
        </div>
      </Card.Body>

      <div className="table-responsive">
        <table className="table mb-0">
          <thead>
            <tr>
              <th>Customer</th>
              <th>System Size</th>
              <th>Phase</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((project) => (
              <tr key={project.id}>
                <td>
                  <div className="hstack">
                    <Avatar size="md" type="image" src={project.avatar} alt={project.customer} />
                    <div className="ms-3">
                      <Link to="" className="d-block">{project.customer}</Link>
                      <span className="fs-12 text-muted">{project.address}</span>
                    </div>
                  </div>
                </td>
                <td className="fs-13 text-muted">{project.systemSize}</td>
                <td>
                  <span className={`badge bg-${phaseConfig[project.phase].color}-subtle text-${phaseConfig[project.phase].color}`}>
                    {project.phase}
                  </span>
                </td>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <div className="progress flex-grow-1" style={{ height: '6px' }}>
                      <div
                        className={`progress-bar bg-${phaseConfig[project.phase].color}`}
                        style={{ width: `${(phaseConfig[project.phase].step / PHASE_STEPS) * 100}%` }}
                      />
                    </div>
                    <span className="fs-12 text-muted">{phaseConfig[project.phase].step}/{PHASE_STEPS}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default ProjectPhasesCard
