import TitleHelmet from '@/components/Common/TitleHelmet'
import { Card } from 'react-bootstrap'

const TestPage = () => {
  return (
    <>
      <TitleHelmet title="Test Page" />
      <Card className="flex-grow-1">
        <Card.Body className="d-flex flex-column align-items-center justify-content-center">
          <div className="display-4 mb-3">Test Page</div>
          <p className="text-muted">This is a test URL for testing purposes.</p>
        </Card.Body>
      </Card>
    </>
  )
}

export default TestPage
