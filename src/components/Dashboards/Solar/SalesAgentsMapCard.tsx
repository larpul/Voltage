import { useState } from 'react'
import { Card, Badge } from 'react-bootstrap'
import MapBase from '@/components/UiElements/Maps/Vector/MapBase'
import { salesAgents, statusConfig, AgentStatus } from './salesAgentsData'
import 'jsvectormap/dist/js/jsvectormap.min.js'
import 'jsvectormap/dist/maps/us-mill-en.js'
import 'jsvectormap/dist/css/jsvectormap.min.css'

type Filter = AgentStatus | 'All'

const SalesAgentsMapCard = () => {
  const [activeStatus, setActiveStatus] = useState<Filter>('All')

  const visible = salesAgents.filter(
    (a) => activeStatus === 'All' || a.status === activeStatus,
  )

  const markers = visible.map((a) => ({
    name: `${a.name} — ${a.currentLocation}`,
    coords: a.coords,
    style: { fill: statusConfig[a.status].hex, r: 7 },
  }))

  const markerStyle = {
    initial: { stroke: '#FFF', strokeWidth: 2, r: 7, cursor: 'pointer' },
    hover: { stroke: '#DDD', strokeWidth: 4 },
    selected: { stroke: '#FFF', strokeWidth: 2, r: 8 },
  }

  const mapOpts = {
    normalizeFunction: 'polynomial',
    zoomButtons: false,
    zoomOnScroll: false,
    hoverOpacity: 0.7,
    hoverColor: false,
    backgroundColor: 'transparent',
    markers,
    markerStyle,
    regionStyle: {
      initial: { fill: '#e4e8ef', stroke: '#fff', strokeWidth: 1 },
      hover: { fill: '#c7d0e0' },
    },
  }

  const statuses = Object.keys(statusConfig) as AgentStatus[]

  return (
    <Card>
      <Card.Header className="py-3 pe-3 d-flex justify-content-between align-items-center">
        <Card.Title as="h5" className="mb-0">Sales Agents Location</Card.Title>
        <span className="fs-13 text-muted">{visible.length} of {salesAgents.length} agents</span>
      </Card.Header>

      {/* Status filter bar */}
      <Card.Body className="pb-0">
        <div className="d-flex gap-2 flex-wrap mb-3">
          <span
            className={`badge px-3 py-2 bg-light text-muted ${activeStatus === 'All' ? 'border border-secondary' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={() => setActiveStatus('All')}
          >
            All ({salesAgents.length})
          </span>
          {statuses.map((status) => {
            const cfg = statusConfig[status]
            const count = salesAgents.filter((a) => a.status === status).length
            const active = activeStatus === status
            return (
              <span
                key={status}
                className={`badge px-3 py-2 bg-${cfg.color}-subtle text-${cfg.color} ${active ? `border border-${cfg.color}` : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={() => setActiveStatus(active ? 'All' : status)}
              >
                <i className={`fi ${cfg.icon}`}></i>
                <span className="ms-2">{status} ({count})</span>
              </span>
            )
          })}
        </div>
      </Card.Body>

      {/* Map */}
      <Card.Body className="pt-0">
        <MapBase
          type="us_mill_en"
          width="100%"
          height="280px"
          options={mapOpts}
        />
      </Card.Body>

      {/* Agent list */}
      <div className="table-responsive">
        <table className="table table-hover mb-0 align-middle">
          <thead>
            <tr>
              <th>Agent</th>
              <th>Current Location</th>
              <th>Status</th>
              <th>Last Updated</th>
              <th>Assigned</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((agent) => {
              const cfg = statusConfig[agent.status]
              return (
                <tr key={agent.id}>
                  <td style={{ minWidth: 160 }}>
                    <div className="d-flex align-items-center gap-2">
                      <div className="position-relative">
                        <img src={agent.avatar} alt={agent.name} className="rounded-circle" width={28} height={28} />
                        <span
                          className="position-absolute rounded-circle border border-2 border-white"
                          style={{ width: 10, height: 10, background: cfg.hex, bottom: 0, right: 0 }}
                        />
                      </div>
                      <span className="fs-13 fw-semibold text-dark">{agent.name}</span>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <span className="rounded-circle flex-shrink-0" style={{ width: 8, height: 8, background: cfg.hex }} />
                      <span className="fs-13 text-muted">{agent.currentLocation}</span>
                    </div>
                  </td>
                  <td>
                    <Badge bg={`${cfg.color}-subtle`} text={cfg.color}>
                      <i className={`fi ${cfg.icon} me-1`}></i>
                      {agent.status}
                    </Badge>
                  </td>
                  <td className="fs-13 text-muted">{agent.lastUpdated}</td>
                  <td className="fs-13 fw-semibold">{agent.assignedInstallations}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default SalesAgentsMapCard
