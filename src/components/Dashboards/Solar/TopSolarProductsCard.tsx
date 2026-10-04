import { Link } from 'react-router-dom'
import { Card, Pagination, Stack, Dropdown, DropdownDivider } from 'react-bootstrap'
import Avatar from '@/components/UiElements/Base/Avatars/Avatar'

import avatar1 from '@/assets/images/avatars/1.png'
import avatar2 from '@/assets/images/avatars/2.png'
import avatar3 from '@/assets/images/avatars/3.png'
import avatar4 from '@/assets/images/avatars/4.png'
import avatar5 from '@/assets/images/avatars/5.png'

const products = [
  { id: 1, name: 'Monocrystalline 400W', img: avatar1, itemNumber: '#SP-001', units: 128 },
  { id: 2, name: 'Polycrystalline 350W', img: avatar2, itemNumber: '#SP-202', units: 96 },
  { id: 3, name: 'Solar Inverter 5kW', img: avatar3, itemNumber: '#INV-303', units: 72 },
  { id: 4, name: 'Battery Storage 10kWh', img: avatar4, itemNumber: '#BAT-404', units: 54 },
  { id: 5, name: 'Solar Mounting Kit', img: avatar5, itemNumber: '#MNT-505', units: 47 },
]

const TopSolarProductsCard = () => {
  return (
    <Card>
      <Card.Header className="py-3 pe-3 d-flex justify-content-between align-items-center">
        <Card.Title>Top Solar Products</Card.Title>
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
              <span className="ms-3">All Products</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Card.Header>
      <div className="list-group list-group-flush">
        {products.map((product) => (
          <div
            className="list-group-item hstack"
            key={product.id}
            style={{ borderBottomStyle: 'dashed' }}
          >
            <Stack direction="horizontal" gap={3}>
              <div style={{ width: '3.5rem', height: '3rem' }}>
                <Avatar
                  size="md"
                  type="image"
                  shape="1"
                  src={product.img}
                  alt={`Product ${product.id}`}
                  className="w-100 flex-shrink-0 rounded bg-body-secondary"
                />
              </div>
              <Link to="">
                <h6>{product.name}</h6>
                <span className="fs-12 text-muted">Code: {product.itemNumber}</span>
              </Link>
            </Stack>
            <div className="ms-auto text-end">
              <p className="fs-14 fw-bold mb-0">{product.units} units</p>
              <p className="fs-12 text-muted mb-0">sold</p>
            </div>
          </div>
        ))}
      </div>
      <Card.Footer>
        <Pagination className="mb-0">
          <Pagination.Prev />
          {[...Array(4)].map((_, index) => (
            <Pagination.Item key={index}>{index + 1}</Pagination.Item>
          ))}
          <Pagination.Next />
        </Pagination>
      </Card.Footer>
    </Card>
  )
}

export default TopSolarProductsCard
