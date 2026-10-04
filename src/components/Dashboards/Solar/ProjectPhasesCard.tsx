import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Dropdown, DropdownDivider } from 'react-bootstrap'
import Avatar from '@/components/UiElements/Base/Avatars/Avatar'

import { installations, phaseConfig, PHASE_STEPS, Phase, Filter } from './installationData'

const ProjectPhasesCard = () => {
  const [filter, setFilter] = useState<Filter>('All')

  const filtered = filter === 'All' ? installations : installations.filter((p) => p.phase === filter)

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
            const count = installations.filter((p) => p.phase === phase).length
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
              <tr key={project.id} style={{ cursor: 'pointer' }} className="hover-bg-light">
                <td>
                  <Link to={`/installations/${project.id}`} className="text-decoration-none text-reset d-flex align-items-center gap-2">
                    <Avatar size="md" type="image" src={project.avatar} alt={project.customer} />
                    <div>
                      <span className="d-block fw-semibold">{project.customer}</span>
                      <span className="fs-12 text-muted">{project.address}</span>
                    </div>
                  </Link>
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
