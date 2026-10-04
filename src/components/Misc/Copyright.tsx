import { Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import volt360Logo from '@/assets/images/logos/volt360-logo-light.png'

const Copyright = () => {
  return (
    <>
      <Stack direction="horizontal" style={{ lineHeight: 'normal' }}>
        <div className="text-muted">
          <span className="fs-12 fw-medium text-uppercase">Copyright&copy;</span>
          <span className="ms-1">{new Date().getFullYear()}</span>
        </div>
        <span className="vr mx-2 bg-secondary bg-opacity-25"></span>
        <span>
          {' '}
          <Link to="/">
            <img src={volt360Logo} alt="Volt360 — Solutions for a Greener Planet" style={{ height: '24px', width: 'auto' }} />
          </Link>
        </span>
      </Stack>
    </>
  )
}

export default Copyright
