import { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Row, Col, Button, Badge, Stack } from 'react-bootstrap'
import PageDashBreadcrumb from '@/components/Common/PageDashBreadcrumb'
import TitleHelmet from '@/components/Common/TitleHelmet'
import { runSmartScheduling, type SchedulingRecommendation } from '@/components/Dashboards/Solar/smartSchedulingEngine'
import { salesAgents, statusConfig } from '@/components/Dashboards/Solar/salesAgentsData'
import { phaseConfig } from '@/components/Dashboards/Solar/installationData'
import { useAgentNotifications } from '@/components/Dashboards/Solar/AgentNotificationContext'
import LiveAvailabilityPanel from '@/components/Dashboards/Solar/LiveAvailabilityPanel'

const SCORE_LABELS: { key: string; label: string; weight: number }[] = [
  { key: 'proximity', label: 'Proximity', weight: 0.35 },
  { key: 'workload', label: 'Workload', weight: 0.25 },
  { key: 'availability', label: 'Availability', weight: 0.25 },
  { key: 'performance', label: 'Performance', weight: 0.15 },
]

const SmartScheduling = () => {
  const navigate = useNavigate()
  const { getAssignedAgentId, assignAgent } = useAgentNotifications()
  const [analyzing, setAnalyzing] = useState(false)
  const [hasRun, setHasRun] = useState(false)

  const recommendations = useMemo<SchedulingRecommendation[]>(
    () => (hasRun ? runSmartScheduling() : []),
    [hasRun],
  )

  const runAnalysis = useCallback(() => {
    setAnalyzing(true)
    setHasRun(false)
    // Simulated agent reasoning delay
    setTimeout(() => {
      setHasRun(true)
      setAnalyzing(false)
    }, 1400)
  }, [])

  const assignedCount = recommendations.filter(
    (r) => (getAssignedAgentId(r.installation.id) ?? r.installation.assignedAgentId) === r.recommendedAgent.id,
  ).length

  return (
    <>
      <TitleHelmet title="Smart Scheduling Agent" />
      <PageDashBreadcrumb title="Smart Scheduling Agent" subName="Dashboards" />

      <Card className="mb-3">
        <Card.Body className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
          <div className="d-flex align-items-center gap-3">
            <div
              className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
              style={{ width: 52, height: 52, background: 'linear-gradient(135deg, #fd670a, #ff8c42)' }}
            >
              <i className="fi fi-rr-brain text-white fs-3"></i>
            </div>
            <div>
              <h4 className="fw-bold mb-1">Smart Scheduling Agent</h4>
              <p className="fs-13 text-muted mb-0">
                AI-assisted assignment of sales agents to upcoming site visits, optimized for proximity,
                workload, availability and performance.
              </p>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2 flex-shrink-0">
            {hasRun && (
              <Badge bg="light" text="dark" className="fs-13">
                <i className="fi fi-rr-bulb me-1 text-warning"></i>
                {recommendations.length} visits · {assignedCount} assigned
              </Badge>
            )}
            <Button variant="primary" onClick={runAnalysis} disabled={analyzing}>
              {analyzing ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" />
                  Analyzing…
                </>
              ) : (
                <>
                  <i className="fi fi-rr-magic-wand me-2"></i>
                  {hasRun ? 'Re-run Analysis' : 'Run Smart Scheduling'}
                </>
              )}
            </Button>
          </div>
        </Card.Body>
      </Card>

      <LiveAvailabilityPanel />

      {analyzing && (
        <Card>
          <Card.Body className="text-center py-5">
            <div className="spinner-border text-primary mb-3" role="status" />
            <p className="text-muted mb-0">
              The scheduling agent is evaluating agent locations, workloads and performance…
            </p>
          </Card.Body>
        </Card>
      )}

      {!analyzing && !hasRun && (
        <Card>
          <Card.Body className="text-center py-5">
            <i className="fi fi-rr-calendar-check text-muted" style={{ fontSize: '3rem' }}></i>
            <h5 className="mt-3 mb-1">No analysis run yet</h5>
            <p className="text-muted mb-0">
              Click <span className="fw-semibold text-primary">Run Smart Scheduling</span> to let the agent
              recommend the best sales agent for each upcoming site visit.
            </p>
          </Card.Body>
        </Card>
      )}

      {!analyzing && hasRun && (
        <Row className="g-3">
          {recommendations.map((rec) => {
            const assignedId = getAssignedAgentId(rec.installation.id) ?? rec.installation.assignedAgentId
            const isAssignedToRecommended = assignedId === rec.recommendedAgent.id
            const phase = phaseConfig[rec.installation.phase]

            return (
              <Col xl={6} key={rec.installation.id}>
                <Card className="h-100">
                  <Card.Header className="d-flex align-items-start justify-content-between gap-2">
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={rec.installation.avatar}
                        alt={rec.installation.customer}
                        className="rounded-circle object-fit-cover"
                        width={40}
                        height={40}
                      />
                      <div>
                        <div className="fw-semibold text-dark">{rec.installation.customer}</div>
                        <div className="fs-12 text-muted">
                          <i className="fi fi-rr-marker me-1"></i>
                          {rec.installation.address}
                        </div>
                      </div>
                    </div>
                    <div className="text-end">
                      <Badge bg={phase.color} className="mb-1">{rec.installation.phase}</Badge>
                      <div className="fs-11 text-muted">{rec.installation.systemSize}</div>
                    </div>
                  </Card.Header>

                  <Card.Body>
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <Badge bg="primary-subtle" text="primary-emphasis" className="px-2 py-1">
                        <i className="fi fi-rr-calendar-plus me-1"></i>
                        {rec.visitType}
                      </Badge>
                      {rec.isReassignment ? (
                        <Badge bg="warning-subtle" text="warning-emphasis" className="px-2 py-1">
                          <i className="fi fi-rr-refresh me-1"></i>
                          Reassignment suggested
                        </Badge>
                      ) : (
                        <Badge bg="success-subtle" text="success-emphasis" className="px-2 py-1">
                          <i className="fi fi-rr-check me-1"></i>
                          Already assigned
                        </Badge>
                      )}
                    </div>

                    {/* Recommended agent */}
                    <div className="d-flex align-items-center justify-content-between p-2 rounded-3 mb-3" style={{ background: 'rgba(253,103,10,0.06)' }}>
                      <div className="d-flex align-items-center gap-2">
                        <div className="position-relative">
                          <img
                            src={rec.recommendedAgent.avatar}
                            alt={rec.recommendedAgent.name}
                            className="rounded-circle object-fit-cover"
                            width={44}
                            height={44}
                          />
                          <span
                            className="position-absolute rounded-circle border border-2 border-white"
                            style={{
                              width: 11,
                              height: 11,
                              background: statusConfig[rec.recommendedAgent.status].hex,
                              bottom: 0,
                              right: 0,
                            }}
                          />
                        </div>
                        <div>
                          <div className="fs-12 text-muted mb-0">Recommended agent</div>
                          <div className="fw-semibold text-dark">{rec.recommendedAgent.name}</div>
                          <div className="fs-11" style={{ color: statusConfig[rec.recommendedAgent.status].hex }}>
                            {rec.recommendedAgent.status}
                          </div>
                        </div>
                      </div>
                      <div className="text-end">
                        <div className="fs-11 text-muted">Match score</div>
                        <div className="fs-4 fw-bold text-primary lh-1">
                          {Math.round(rec.score * 100)}%
                        </div>
                      </div>
                    </div>

                    {/* Factor breakdown */}
                    <div className="mb-3">
                      {SCORE_LABELS.map(({ key, label, weight }) => {
                        const value = (rec.rankedAgents[0].factors as any)[key] as number
                        return (
                          <div key={key} className="mb-2">
                            <div className="d-flex justify-content-between fs-12 mb-1">
                              <span className="text-muted">
                                {label} <span className="text-secondary">({Math.round(weight * 100)}%)</span>
                              </span>
                              <span className="fw-semibold">{Math.round(value * 100)}%</span>
                            </div>
                            <div className="progress" style={{ height: 6 }}>
                              <div
                                className="progress-bar bg-primary"
                                style={{ width: `${value * 100}%` }}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Reasoning */}
                    <div className="mb-3">
                      <div className="fs-12 fw-semibold text-muted text-uppercase mb-2">
                        <i className="fi fi-rr-comment-alt me-1"></i>
                        Agent reasoning
                      </div>
                      <ul className="ps-3 mb-0">
                        {rec.reasoning.map((reason, idx) => (
                          <li key={idx} className="fs-13 text-muted mb-1">{reason}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Other candidates */}
                    <div className="mb-3">
                      <div className="fs-12 fw-semibold text-muted text-uppercase mb-2">
                        Other candidates
                      </div>
                      <Stack direction="horizontal" gap={2} className="flex-wrap">
                        {rec.rankedAgents.slice(1, 4).map((ra) => (
                          <Badge
                            key={ra.agent.id}
                            bg="light"
                            text="dark"
                            className="d-inline-flex align-items-center gap-1 px-2 py-1"
                          >
                            <img
                              src={ra.agent.avatar}
                              alt={ra.agent.name}
                              className="rounded-circle object-fit-cover"
                              width={18}
                              height={18}
                            />
                            <span className="fs-12">{ra.agent.name}</span>
                            <span className="fs-11 text-muted">{Math.round(ra.score * 100)}%</span>
                          </Badge>
                        ))}
                      </Stack>
                    </div>
                  </Card.Body>

                  <Card.Footer className="d-flex gap-2">
                    <Button
                      variant={isAssignedToRecommended ? 'outline-success' : 'primary'}
                      size="sm"
                      className="flex-grow-1"
                      disabled={isAssignedToRecommended}
                      onClick={() => assignAgent(rec.installation, rec.recommendedAgent.id)}
                    >
                      <i className={`fi ${isAssignedToRecommended ? 'fi-rr-check-circle' : 'fi-rr-user-add'} me-2`}></i>
                      {isAssignedToRecommended ? 'Assigned' : 'Assign & Notify'}
                    </Button>
                    <Button
                      variant="light"
                      size="sm"
                      onClick={() => navigate(`/installations/${rec.installation.id}`)}
                    >
                      <i className="fi fi-rr-arrow-right me-1"></i>
                      Details
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            )
          })}
        </Row>
      )}
    </>
  )
}

export default SmartScheduling
