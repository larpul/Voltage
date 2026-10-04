import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MapBase from '@/components/UiElements/Maps/Vector/MapBase'
import { Card, Badge } from 'react-bootstrap'
import { installations, phaseConfig, Phase, Filter } from './installationData'
import 'jsvectormap/dist/js/jsvectormap.min.js'
import 'jsvectormap/dist/maps/us-mill-en.js'
import 'jsvectormap/dist/css/jsvectormap.min.css'

const phaseHex: Record<Phase, string> = {
  'Site Survey': '#02a0e4',
  'Permit Review': '#fb6c25',
  'Pending Install': '#fd670a',
  'Installation': '#3dc7be',
  'Completed': '#25b865',
}

const phaseIcon: Record<Phase, string> = {
  'Site Survey': 'fi-rr-search',
  'Permit Review': 'fi-rr-document',
  'Pending Install': 'fi-rr-clock',
  'Installation': 'fi-rr-tools',
  'Completed': 'fi-rr-check-circle',
}

const InstallationMapCard = () => {
  const navigate = useNavigate()
  const [activePhase, setActivePhase] = useState<Filter>('All')

  const visible = installations.filter(
    (i) => activePhase === 'All' || i.phase === activePhase,
  )

  const markers = visible.map((i) => ({
    name: i.address,
    coords: i.coords,
    style: { fill: phaseHex[i.phase], r: 6 },
  }))

  const markerStyle = {
    initial: { stroke: '#FFF', strokeWidth: 1.5, r: 6, cursor: 'pointer' },
    hover: { stroke: '#DDD', strokeWidth: 3 },
    selected: { stroke: '#FFF', strokeWidth: 2, r: 7 },
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

  const phases = Object.keys(phaseConfig) as Phase[]

  return (
    <Card>
      <Card.Header className="py-3 pe-3 d-flex justify-content-between align-items-center">
        <Card.Title as="h5" className="mb-0">Installation Project Map</Card.Title>
        <span className="fs-13 text-muted">{visible.length} of {installations.length} projects</span>
      </Card.Header>

      {/* Phase filter bar */}
      <Card.Body className="pb-0">
        <div className="d-flex gap-2 flex-wrap mb-3">
          <span
            className={`badge px-3 py-2 bg-light text-muted ${activePhase === 'All' ? 'border border-secondary' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={() => setActivePhase('All')}
          >
            All ({installations.length})
          </span>
          {phases.map((phase) => {
            const cfg = phaseConfig[phase]
            const count = installations.filter((i) => i.phase === phase).length
            const active = activePhase === phase
            return (
              <span
                key={phase}
                className={`badge px-3 py-2 bg-${cfg.color}-subtle text-${cfg.color} ${active ? `border border-${cfg.color}` : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={() => setActivePhase(active ? 'All' : phase)}
              >
                <i className={`fi ${phaseIcon[phase]}`}></i>
                <span className="ms-2">{phase} ({count})</span>
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
          onMarkerClick={(index) => {
            const inst = installations[index]
            if (inst) navigate(`/installations/${inst.id}`)
          }}
        />
      </Card.Body>

      {/* Installation list */}
      <div className="table-responsive">
        <table className="table table-hover mb-0 align-middle">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Address</th>
              <th>System Size</th>
              <th>Phase</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((inst) => {
              const cfg = phaseConfig[inst.phase]
              return (
                <tr key={inst.id}>
                  <td style={{ minWidth: 140 }}>
                    <Link to={`/installations/${inst.id}`} className="d-flex align-items-center gap-2 text-decoration-none">
                      <img src={inst.avatar} alt={inst.customer} className="rounded-circle" width={28} height={28} />
                      <span className="fs-13 fw-semibold text-dark">{inst.customer}</span>
                    </Link>
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <span className="rounded-circle flex-shrink-0" style={{ width: 8, height: 8, background: phaseHex[inst.phase] }} />
                      <span className="fs-13 text-muted">{inst.address}</span>
                    </div>
                  </td>
                  <td className="fs-13 fw-semibold">{inst.systemSize}</td>
                  <td>
                    <Badge bg={`${cfg.color}-subtle`} text={cfg.color}>
                      <i className={`fi ${phaseIcon[inst.phase]} me-1`}></i>
                      {inst.phase}
                    </Badge>
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

export default InstallationMapCard
