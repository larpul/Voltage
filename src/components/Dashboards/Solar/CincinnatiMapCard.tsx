import { Link } from 'react-router-dom'
import MapBase from '@/components/UiElements/Maps/Vector/MapBase'
import { Card, Dropdown, DropdownDivider, ListGroup, Stack } from 'react-bootstrap'
import 'jsvectormap/dist/js/jsvectormap.min.js'
import 'jsvectormap/dist/maps/us-mill-en.js'
import 'jsvectormap/dist/css/jsvectormap.min.css'

const CincinnatiMapCard = () => {
  const mapOpts = {
    normalizeFunction: 'polynomial',
    zoomButtons: false,
    zoomOnScroll: false,
    hoverOpacity: 0.7,
    hoverColor: false,
    backgroundColor: 'transparent',
    markers: [
      { name: 'Hyde Park', coords: [39.14, -84.44], style: { fill: '#f59e0b' } },
      { name: 'Over-the-Rhine', coords: [39.11, -84.51], style: { fill: '#d13b4c' } },
      { name: 'West Chester', coords: [39.32, -84.32], style: { fill: '#3dc7be' } },
      { name: 'Madeira', coords: [39.19, -84.38], style: { fill: '#6366f1' } },
      { name: 'Covington, KY', coords: [39.08, -84.51], style: { fill: '#25b865' } },
      { name: 'Clifton', coords: [39.14, -84.52], style: { fill: '#fd7e14' } },
      { name: 'Mount Adams', coords: [39.11, -84.49], style: { fill: '#963258' } },
    ],
    markerStyle: {
      initial: { fill: '#ff525d', stroke: '#FFF', strokeWidth: 1.5, r: 5 },
      hover: { stroke: '#DDD', strokeWidth: 3, fill: '#FFF' },
      selected: { fill: '#ff525d' },
    },
    regionStyle: {
      initial: {
        fill: '#e4e8ef',
        stroke: '#fff',
        strokeWidth: 1,
      },
      hover: {
        fill: '#c7d0e0',
      },
    },
  }

  const neighborhoods = [
    { name: 'Hyde Park', color: 'warning', count: '18 houses' },
    { name: 'West Chester', color: 'success', count: '14 houses' },
    { name: 'Over-the-Rhine', color: 'danger', count: '12 houses' },
    { name: 'Madeira', color: 'primary', count: '8 houses' },
    { name: 'Clifton', color: 'dark', count: '6 houses' },
  ]

  return (
    <Card>
      <Card.Header className="py-3 pe-3 d-flex justify-content-between align-items-center">
        <Card.Title>Cincinnati Installations</Card.Title>
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
              <span className="ms-3">Full Reports</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Card.Header>
      <Card.Body>
        <MapBase type="us_mill_en" width="100%" height="300px" options={mapOpts} />
        <Stack direction="horizontal" gap={4}>
          <div className="mt-4">
            <span className="fs-20 fw-bold text-dark">58 houses</span>
            <span className="badge bg-success-subtle text-success rounded-pill d-inline-flex align-items-center ms-2">
              <i className="fi fi-rr-arrow-trend-up fs-11"></i>
              <span>8.4%</span>
            </span>
            <span className="fs-13 text-muted mt-1 d-block">Solar installations in the Cincinnati area.</span>
          </div>
          <Link to="" className="ms-auto icon-link icon-link-hover link-primary">
            <span>Explore</span>
            <i className="fi fi-rr-arrow-small-right bi"></i>
          </Link>
        </Stack>
      </Card.Body>
      <ListGroup>
        {neighborhoods.map(({ name, color, count }, index) => (
          <ListGroup.Item key={index} className="hstack py-2">
            <div className="me-auto">
              <Link to="" className="hstack gap-3">
                <span
                  className={`bg-${color} rounded-circle d-flex flex-shrink-0`}
                  style={{ width: '0.45rem', height: '0.45rem' }}
                ></span>
                <span>{name}</span>
              </Link>
            </div>
            <div className="text-muted">{count}</div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  )
}

export default CincinnatiMapCard
