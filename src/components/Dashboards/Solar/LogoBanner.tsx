import { Card } from 'react-bootstrap'
import volt360Logo from '@/assets/images/logos/volt360-logo.png'

const LogoBanner = () => {
  return (
    <Card className="border-0 shadow-sm mb-3 mb-md-4">
      <Card.Body className="d-flex justify-content-center py-4">
        <img
          src={volt360Logo}
          alt="Volt360 — Solutions for a Greener Planet"
          style={{ height: '72px', width: 'auto' }}
        />
      </Card.Body>
    </Card>
  )
}

export default LogoBanner
