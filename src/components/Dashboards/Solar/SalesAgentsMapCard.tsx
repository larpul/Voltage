import { useState, useCallback } from 'react'
import { Card, Badge, Modal, Button, ProgressBar } from 'react-bootstrap'
import MapBase from '@/components/UiElements/Maps/Vector/MapBase'
import { salesAgents, statusConfig, AgentStatus, SalesAgent } from './salesAgentsData'
import 'jsvectormap/dist/js/jsvectormap.min.js'
import 'jsvectormap/dist/maps/us-mill-en.js'
import 'jsvectormap/dist/css/jsvectormap.min.css'

type Filter = AgentStatus | 'All'

const SalesAgentsMapCard = () => {
  const [activeStatus, setActiveStatus] = useState<Filter>('All')
  const [selectedAgent, setSelectedAgent] = useState<SalesAgent | null>(null)

  const visible = salesAgents.filter(
    (a) => activeStatus === 'All' || a.status === activeStatus,
  )

  const handleMarkerClick = useCallback((index: number) => {
    const agent = visible[index]
    if (agent) setSelectedAgent(agent)
  }, [visible])

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
  const cfg = selectedAgent ? statusConfig[selectedAgent.status] : null

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
            const sCfg = statusConfig[status]
            const count = salesAgents.filter((a) => a.status === status).length
            const active = activeStatus === status
            return (
              <span
                key={status}
                className={`badge px-3 py-2 bg-${sCfg.color}-subtle text-${sCfg.color} ${active ? `border border-${sCfg.color}` : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={() => setActiveStatus(active ? 'All' : status)}
              >
                <i className={`fi ${sCfg.icon}`}></i>
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
          onMarkerClick={handleMarkerClick}
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
              const aCfg = statusConfig[agent.status]
              return (
                <tr key={agent.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedAgent(agent)}>
                  <td style={{ minWidth: 160 }}>
                    <div className="d-flex align-items-center gap-2">
                      <div className="position-relative">
                        <img src={agent.avatar} alt={agent.name} className="rounded-circle object-fit-cover" width={40} height={40} />
                        <span
                          className="position-absolute rounded-circle border border-2 border-white"
                          style={{ width: 12, height: 12, background: aCfg.hex, bottom: 0, right: 0 }}
                        />
                      </div>
                      <span className="fs-13 fw-semibold text-dark">{agent.name}</span>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <span className="rounded-circle flex-shrink-0" style={{ width: 8, height: 8, background: aCfg.hex }} />
                      <span className="fs-13 text-muted">{agent.currentLocation}</span>
                    </div>
                  </td>
                  <td>
                    <Badge bg={`${aCfg.color}-subtle`} text={aCfg.color}>
                      <i className={`fi ${aCfg.icon} me-1`}></i>
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

      {/* Agent detail modal */}
      <Modal show={!!selectedAgent} onHide={() => setSelectedAgent(null)} centered size="sm">
        {selectedAgent && cfg && (
          <>
            <Modal.Header closeButton className="position-relative border-0" style={{ minHeight: 120, backgroundImage: `url(${selectedAgent.avatar})`, backgroundSize: 'cover', backgroundPosition: 'center top' }}>
              <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.65))' }} />
              <style>{'.modal .btn-close { filter: invert(1) grayscale(1) brightness(2); z-index: 1; }'}</style>
              <Modal.Title as="h6" className="d-flex align-items-center gap-2 position-relative text-white">
                <img src={selectedAgent.avatar} alt={selectedAgent.name} className="rounded-circle object-fit-cover border border-2 border-white" width={48} height={48} />
                {selectedAgent.name}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex align-items-center gap-2 mb-3">
                <Badge bg={`${cfg.color}-subtle`} text={cfg.color}>
                  <i className={`fi ${cfg.icon} me-1`}></i>
                  {selectedAgent.status}
                </Badge>
                <span className="fs-13 text-muted">Updated {selectedAgent.lastUpdated}</span>
              </div>
              <div className="d-flex flex-column gap-2">
                <div className="d-flex justify-content-between">
                  <span className="fs-13 text-muted">Current Location</span>
                  <span className="fs-13 fw-semibold">{selectedAgent.currentLocation}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="fs-13 text-muted">Coordinates</span>
                  <span className="fs-13 fw-semibold">{selectedAgent.coords[0].toFixed(2)}, {selectedAgent.coords[1].toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="fs-13 text-muted">Assigned Installations</span>
                  <span className="fs-13 fw-semibold">{selectedAgent.assignedInstallations}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="fs-13 text-muted">Phone</span>
                  <span className="fs-13 fw-semibold">{selectedAgent.phone}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="fs-13 text-muted">Email</span>
                  <span className="fs-13 fw-semibold text-truncate" style={{ maxWidth: 180 }}>{selectedAgent.email}</span>
                </div>
              </div>
              {/* Commission tracking */}
              {(() => {
                const pct = Math.round((selectedAgent.monthlyEarned / selectedAgent.monthlyGoal) * 100)
                const commission = Math.round(selectedAgent.monthlyEarned * selectedAgent.commissionRate / 100)
                const remaining = selectedAgent.monthlyGoal - selectedAgent.monthlyEarned
                return (
                  <div className="mt-3 pt-3 border-top">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="fs-13 fw-semibold text-dark">Commission Tracking</span>
                      <Badge bg={pct >= 100 ? 'success' : pct >= 75 ? 'primary' : pct >= 50 ? 'warning' : 'danger'}>
                        {pct}% of goal
                      </Badge>
                    </div>
                    <ProgressBar
                      now={Math.min(pct, 100)}
                      variant={pct >= 100 ? 'success' : pct >= 75 ? 'primary' : pct >= 50 ? 'warning' : 'danger'}
                      className="mb-3"
                      style={{ height: 8 }}
                    />
                    <div className="d-flex flex-column gap-2">
                      <div className="d-flex justify-content-between">
                        <span className="fs-13 text-muted">Monthly Sales</span>
                        <span className="fs-13 fw-semibold">${selectedAgent.monthlyEarned.toLocaleString()}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="fs-13 text-muted">Monthly Goal</span>
                        <span className="fs-13 fw-semibold">${selectedAgent.monthlyGoal.toLocaleString()}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="fs-13 text-muted">Remaining to Goal</span>
                        <span className={`fs-13 fw-semibold ${remaining > 0 ? '' : 'text-success'}`}>${Math.max(remaining, 0).toLocaleString()}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="fs-13 text-muted">Commission Rate</span>
                        <span className="fs-13 fw-semibold">{selectedAgent.commissionRate}%</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="fs-13 text-muted">Est. Commission</span>
                        <span className="fs-13 fw-bold text-success">${commission.toLocaleString()}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="fs-13 text-muted">Deals Closed</span>
                        <span className="fs-13 fw-semibold">{selectedAgent.dealsClosed}</span>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </Modal.Body>
            <Modal.Footer className="gap-2">
              <a href={`tel:${selectedAgent.phone.replace(/[^0-9+]/g, '')}`} className="btn btn-success btn-sm">
                <i className="fi fi-rr-phone-call me-1"></i>Call
              </a>
              <a href={`mailto:${selectedAgent.email}`} className="btn btn-primary btn-sm">
                <i className="fi fi-rr-envelope me-1"></i>Email
              </a>
              <Button variant="light" size="sm" onClick={() => setSelectedAgent(null)}>Close</Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </Card>
  )
}

export default SalesAgentsMapCard
