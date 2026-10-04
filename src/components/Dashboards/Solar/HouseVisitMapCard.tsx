import { useState } from 'react'
import MapBase from '@/components/UiElements/Maps/Vector/MapBase'
import { Card, Dropdown, DropdownDivider, Badge } from 'react-bootstrap'
import 'jsvectormap/dist/js/jsvectormap.min.js'
import 'jsvectormap/dist/maps/us-mill-en.js'
import 'jsvectormap/dist/css/jsvectormap.min.css'

export type VisitStatus = 'Installed' | 'Not Home' | 'Renting' | 'Visited' | 'Not Interested'

interface HouseVisit {
  id: number
  address: string
  coords: [number, number]
  status: VisitStatus
  visitDate: string
  note: string
}

const statusConfig: Record<VisitStatus, { color: string; hex: string; icon: string }> = {
  'Installed': { color: 'success', hex: '#25b865', icon: 'fi-rr-check-circle' },
  'Not Home': { color: 'warning', hex: '#f59e0b', icon: 'fi-rr-house-chimney' },
  'Renting': { color: 'info', hex: '#3dc7be', icon: 'fi-rr-key' },
  'Visited': { color: 'primary', hex: '#6366f1', icon: 'fi-rr-eye' },
  'Not Interested': { color: 'danger', hex: '#d13b4c', icon: 'fi-rr-cross-circle' },
}

const houses: HouseVisit[] = [
  { id: 1, address: '128 Maple St, Austin TX', coords: [30.27, -97.74], status: 'Installed', visitDate: '2026-08-14', note: 'System installed and commissioned. Customer very happy — 8.5 kW system with Powerwall.' },
  { id: 2, address: '45 Oak Ave, Denver CO', coords: [39.74, -104.99], status: 'Installed', visitDate: '2026-08-14', note: 'Completed installation. 10.2 kW SolarEdge system. Net metering enrolled with Xcel.' },
  { id: 3, address: '72 Pine Rd, Phoenix AZ', coords: [33.45, -112.07], status: 'Visited', visitDate: '2026-09-28', note: 'Customer interested in flat roof ballasted system. Waiting on HOA approval. Follow-up scheduled for next week.' },
  { id: 4, address: '15 Birch Ln, Portland OR', coords: [45.52, -122.68], status: 'Visited', visitDate: '2026-09-28', note: 'Site survey done. Metal standing seam roof — clamp attachments. Large system for EV charging needs.' },
  { id: 5, address: '301 Cedar Dr, Miami FL', coords: [25.76, -80.19], status: 'Visited', visitDate: '2026-08-10', note: 'Hurricane zone install. 9.8 kW with Powerwall backup. FPL interconnection submitted.' },
  { id: 6, address: '88 Elm Ct, Dallas TX', coords: [32.78, -96.80], status: 'Installed', visitDate: '2026-07-02', note: '7.2 kW system operational. Customer seeing ~$180/mo savings. Recommended annual panel cleaning.' },
  { id: 7, address: '1007 Mountain Dr, Gotham NJ', coords: [40.73, -74.17], status: 'Visited', visitDate: '2026-09-05', note: 'Large estate — 15 kW system with dual Powerwall. Slate roof needs subcontractor. Time-sensitive before winter.' },
  { id: 8, address: '1200 Themis Blvd, Washington DC', coords: [38.90, -77.03], status: 'Visited', visitDate: '2026-10-03', note: 'Flat roof install in progress. 11.5 kW with Powerwall. Pepco interconnection pending.' },
  { id: 9, address: '55 Sunrise Way, Tucson AZ', coords: [32.22, -110.93], status: 'Not Home', visitDate: '2026-09-30', note: 'Knocked twice — no answer. Left door hanger and voicemail. Will try again Thursday afternoon.' },
  { id: 10, address: '230 Lakeshore Dr, Madison WI', coords: [43.07, -89.40], status: 'Not Home', visitDate: '2026-09-27', note: 'No one home during business hours. Neighbor says owners travel frequently. Mailed brochure.' },
  { id: 11, address: '7 Willow Ct, Charlotte NC', coords: [35.23, -80.84], status: 'Renting', visitDate: '2026-09-25', note: 'Tenant interested but landlord must approve. Sent proposal to property owner. Awaiting response.' },
  { id: 12, address: '18 River Rd, Nashville TN', coords: [36.16, -86.78], status: 'Renting', visitDate: '2026-09-22', note: 'Renter — lease expires in 3 months. Will revisit when new owner takes over the property.' },
  { id: 13, address: '412 Hilltop Ln, Boise ID', coords: [43.62, -116.20], status: 'Not Interested', visitDate: '2026-09-20', note: 'Customer not interested — thinks solar is too expensive. Offered financing options but declined. May revisit in spring.' },
  { id: 14, address: '9 Cypress St, Atlanta GA', coords: [33.75, -84.39], status: 'Not Interested', visitDate: '2026-09-18', note: 'Roof needs replacement first. Customer said to call back in 6 months after roof work is done.' },
  { id: 15, address: '67 Garden Way, Salt Lake City UT', coords: [40.76, -111.89], status: 'Visited', visitDate: '2026-10-01', note: 'Very engaged customer. Wants 12 kW system with battery. Strong lead — scheduling design consultation.' },
  { id: 16, address: '33 Brookside Pl, Columbus OH', coords: [39.96, -83.0], status: 'Not Home', visitDate: '2026-10-02', note: 'No answer at door. Property appears occupied. Will try evening hours tomorrow.' },
]

const HouseVisitMapCard = () => {
  const [activeStatus, setActiveStatus] = useState<VisitStatus | 'All'>('All')

  const visibleHouses = activeStatus === 'All' ? houses : houses.filter((h) => h.status === activeStatus)

  const markers = visibleHouses.map((h) => ({
    name: h.address,
    coords: h.coords,
    style: { fill: statusConfig[h.status].hex, r: 6 },
  }))

  const markerStyle = {
    initial: { stroke: '#FFF', strokeWidth: 1.5, r: 6 },
    hover: { stroke: '#DDD', strokeWidth: 3 },
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

  const statuses = Object.keys(statusConfig) as VisitStatus[]

  return (
    <Card>
      <Card.Header className="py-3 pe-3 d-flex justify-content-between align-items-center">
        <Card.Title>House Visit Map</Card.Title>
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
              <span className="ms-3">All Visits</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Card.Header>

      {/* Legend / Filter bar */}
      <Card.Body className="pb-0">
        <div className="d-flex gap-2 flex-wrap mb-3">
          <span
            className={`badge px-3 py-2 bg-light text-muted ${activeStatus === 'All' ? 'border border-secondary' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={() => setActiveStatus('All')}
          >
            All ({houses.length})
          </span>
          {statuses.map((status) => {
            const cfg = statusConfig[status]
            const count = houses.filter((h) => h.status === status).length
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
        <MapBase type="us_mill_en" width="100%" height="280px" options={mapOpts} />
      </Card.Body>

      {/* House visit list with notes */}
      <div className="table-responsive">
        <table className="table table-hover mb-0 align-middle">
          <thead>
            <tr>
              <th>Address</th>
              <th>Status</th>
              <th>Visit Date</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {visibleHouses.map((house) => {
              const cfg = statusConfig[house.status]
              return (
                <tr key={house.id}>
                  <td style={{ minWidth: 160 }}>
                    <div className="d-flex align-items-center gap-2">
                      <span className="rounded-circle flex-shrink-0" style={{ width: 8, height: 8, background: cfg.hex }} />
                      <span className="fs-13 fw-semibold">{house.address}</span>
                    </div>
                  </td>
                  <td>
                    <Badge bg={`${cfg.color}-subtle`} text={cfg.color}>
                      <i className={`fi ${cfg.icon} me-1`}></i>
                      {house.status}
                    </Badge>
                  </td>
                  <td className="fs-13 text-muted" style={{ whiteSpace: 'nowrap' }}>{house.visitDate}</td>
                  <td>
                    <p className="fs-12 text-muted mb-0" style={{ maxWidth: 320, lineHeight: 1.5 }}>{house.note}</p>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default HouseVisitMapCard
