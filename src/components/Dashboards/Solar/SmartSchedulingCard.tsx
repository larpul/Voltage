import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Card, Stack, Badge } from 'react-bootstrap'
import { runSmartScheduling } from './smartSchedulingEngine'
import { useGoogleCalendar } from './GoogleCalendarContext'
import { formatSlotLabel } from './googleCalendar'
import { statusConfig } from './salesAgentsData'
import { phaseConfig } from './installationData'

const SmartSchedulingCard = () => {
  const { getSlots, getSlotSource, liveAvailability } = useGoogleCalendar()
  const recommendations = useMemo(
    () => runSmartScheduling(liveAvailability),
    [liveAvailability],
  )
  const topPicks = recommendations.slice(0, 3)

  const nextSlotLabel = (agentId: number) => {
    const slot = getSlots(agentId, 1)[0]
    return slot ? formatSlotLabel(slot.start) : 'None soon'
  }

  return (
    <Card className="h-100">
      <Card.Header className="py-3 pe-3 d-flex justify-content-between align-items-center">
        <Card.Title>
          <i className="fi fi-rr-magic-wand me-2 text-primary"></i>
          Smart Scheduling Agent
        </Card.Title>
        <Badge bg="primary-subtle" text="primary-emphasis" className="fs-11">
          AI
        </Badge>
      </Card.Header>
      <Card.Body className="d-flex flex-column">
        <p className="fs-12 text-muted mb-3">
          Best agent matches for {recommendations.length} upcoming site visits, ranked by proximity,
          workload, availability and performance.
        </p>

        {topPicks.map((rec) => (
          <Stack key={rec.installation.id} direction="horizontal" className="align-items-center mb-3">
            <div className="position-relative flex-shrink-0">
              <img
                src={rec.recommendedAgent.avatar}
                alt={rec.recommendedAgent.name}
                className="rounded-circle object-fit-cover"
                width={38}
                height={38}
              />
              <span
                className="position-absolute rounded-circle border border-2 border-white"
                style={{
                  width: 10,
                  height: 10,
                  background: statusConfig[rec.recommendedAgent.status].hex,
                  bottom: 0,
                  right: 0,
                }}
              />
            </div>
            <div className="flex-grow-1 ms-3">
              <div className="fs-13 fw-semibold text-dark text-truncate">
                {rec.recommendedAgent.name}
              </div>
              <div className="fs-12 text-muted text-truncate">
                {rec.installation.customer} · {rec.installation.systemSize}
              </div>
              <div className="fs-11 text-truncate">
                <i className="fi fi-rr-calendar-clock me-1 text-primary"></i>
                <span className="text-muted">Next slot </span>
                <span className="fw-semibold text-dark">
                  {nextSlotLabel(rec.recommendedAgent.id)}
                </span>
                <span className="text-muted">
                  {' · '}
                  {getSlotSource(rec.recommendedAgent.id) === 'live' ? 'Live' : 'Demo'}
                </span>
              </div>
            </div>
            <Badge
              bg={phaseConfig[rec.installation.phase].color}
              className="ms-2 flex-shrink-0"
            >
              {Math.round(rec.score * 100)}%
            </Badge>
          </Stack>
        ))}

        <Link
          to="/dashboards/smart-scheduling"
          className="btn btn-primary btn-sm mt-auto w-100"
        >
          <i className="fi fi-rr-magic-wand me-2"></i>
          Open Smart Scheduling
        </Link>
      </Card.Body>
    </Card>
  )
}

export default SmartSchedulingCard
