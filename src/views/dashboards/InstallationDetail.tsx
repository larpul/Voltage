import { useParams, Link } from 'react-router-dom'
import { Card, Row, Col, Badge } from 'react-bootstrap'
import Avatar from '@/components/UiElements/Base/Avatars/Avatar'
import { getInstallationById, phaseConfig, PHASE_STEPS } from '@/components/Dashboards/Solar/installationData'

const InstallationDetail = () => {
  const { id } = useParams<{ id: string }>()
  const project = getInstallationById(Number(id))

  if (!project) {
    return (
      <div className="text-center py-5">
        <p className="text-muted fs-5">Installation not found.</p>
        <Link to="/" className="btn btn-primary mt-2">
          Back to Dashboard
        </Link>
      </div>
    )
  }

  const phase = phaseConfig[project.phase]
  const progressPct = (phase.step / PHASE_STEPS) * 100

  return (
    <>
      {/* Header card */}
      <Card className="mb-4">
        <Card.Body>
          <div className="d-flex flex-column flex-md-row align-items-md-center gap-3">
            <Link to="/" className="btn btn-soft-primary btn-sm align-self-start">
              <i className="fi fi-rr-arrow-left me-1"></i> Back
            </Link>
            <Avatar size="lg" type="image" src={project.avatar} alt={project.customer} />
            <div className="flex-grow-1">
              <h4 className="fw-bold mb-1">{project.customer}</h4>
              <p className="text-muted fs-13 mb-1">
                <i className="fi fi-rr-marker me-1"></i>{project.address}
              </p>
              <div className="d-flex flex-wrap gap-2 mt-2">
                <Badge bg={`${phase.color}-subtle`} text={phase.color}>
                  {project.phase}
                </Badge>
                <Badge bg="light" text="dark">{project.systemSize}</Badge>
                <Badge bg="light" text="dark">{project.contractValue}</Badge>
              </div>
            </div>
            <div className="align-self-start align-self-md-center" style={{ minWidth: 200 }}>
              <div className="d-flex align-items-center justify-content-between mb-1">
                <span className="fs-12 text-muted">Phase Progress</span>
                <span className="fs-12 text-muted">{phase.step}/{PHASE_STEPS}</span>
              </div>
              <div className="progress" style={{ height: '8px' }}>
                <div className={`progress-bar bg-${phase.color}`} style={{ width: `${progressPct}%` }} />
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Row className="g-3 g-md-4">
        {/* Customer Notes */}
        <Col lg={4}>
          <Card className="h-100">
            <Card.Header className="py-3">
              <Card.Title className="mb-0">
                <i className="fi fi-rr-comment-alt me-2"></i>
                Customer Notes
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <p className="fs-13 lh-lg text-body">{project.customerNotes}</p>
              <hr />
              <Row className="g-2 fs-13">
                <Col xs={6}>
                  <span className="text-muted d-block">Phone</span>
                  <span>{project.phone}</span>
                </Col>
                <Col xs={6}>
                  <span className="text-muted d-block">Email</span>
                  <span className="text-break">{project.email}</span>
                </Col>
                <Col xs={6}>
                  <span className="text-muted d-block">Install Date</span>
                  <span>{project.installDate}</span>
                </Col>
                <Col xs={6}>
                  <span className="text-muted d-block">Warranty</span>
                  <span>{project.warrantyYears} years</span>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* Technical Specs */}
        <Col lg={4}>
          <Card className="h-100">
            <Card.Header className="py-3">
              <Card.Title className="mb-0">
                <i className="fi fi-rr-settings me-2"></i>
                Technical System Specs
              </Card.Title>
            </Card.Header>
            <Card.Body className="p-0">
              <table className="table mb-0">
                <tbody>
                  {project.techSpecs.map((spec, idx) => (
                    <tr key={idx}>
                      <td className="fs-13 text-muted" style={{ width: '45%' }}>{spec.label}</td>
                      <td className="fs-13 fw-semibold">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </Col>

        {/* Project History Timeline */}
        <Col lg={4}>
          <Card className="h-100">
            <Card.Header className="py-3">
              <Card.Title className="mb-0">
                <i className="fi fi-rr-time-past me-2"></i>
                Project History
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="timeline">
                {project.history.map((entry, idx) => (
                  <div key={idx} className="timeline-item d-flex gap-3 pb-3">
                    <div className="timeline-marker d-flex flex-column align-items-center">
                      <div className={`rounded-circle bg-${phase.color}-subtle`} style={{ width: 12, height: 12, marginTop: 4 }} />
                      {idx < project.history.length - 1 && (
                        <div className="flex-grow-1 mt-1" style={{ width: 2, background: 'var(--bs-border-color)' }} />
                      )}
                    </div>
                    <div className="flex-grow-1">
                      <span className="fs-12 text-muted d-block">{entry.date}</span>
                      <p className="fs-13 mb-0">{entry.event}</p>
                      <span className="fs-12 text-muted">by {entry.user}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default InstallationDetail
