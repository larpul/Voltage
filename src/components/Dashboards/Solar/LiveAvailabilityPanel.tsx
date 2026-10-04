import { Badge, Button, Card, Stack } from 'react-bootstrap'
import { salesAgents, statusConfig } from './salesAgentsData'
import { useGoogleCalendar } from './GoogleCalendarContext'
import { formatSlotLabel } from './googleCalendar'

const LiveAvailabilityPanel = () => {
  const {
    configured,
    connections,
    loadingAgentId,
    getSlots,
    getSlotSource,
    connect,
    disconnect,
    refreshAgent,
    refreshConnected,
  } = useGoogleCalendar()

  const liveCount = Object.keys(connections).length

  return (
    <Card className="mb-3">
      <Card.Header className="d-flex flex-wrap gap-2 justify-content-between align-items-center">
        <Card.Title className="mb-0">
          <i className="fi fi-rr-calendar-clock me-2 text-primary"></i>
          Live Agent Availability
        </Card.Title>
        <Stack direction="horizontal" gap={2} className="align-items-center">
          <Badge
            bg={liveCount ? 'success-subtle' : 'warning-subtle'}
            text={liveCount ? 'success-emphasis' : 'warning-emphasis'}
            className="fs-12"
          >
            {liveCount ? `${liveCount} of ${salesAgents.length} calendars live` : 'Demo availability'}
          </Badge>
          <Button
            size="sm"
            variant="light"
            onClick={refreshConnected}
            disabled={liveCount === 0 || loadingAgentId !== null}
          >
            <i className="fi fi-rr-refresh me-1"></i>
            Refresh
          </Button>
        </Stack>
      </Card.Header>

      <Card.Body>
        {!configured && (
          <div className="alert alert-warning fs-13 mb-3 d-flex gap-2">
            <i className="fi fi-rr-info mt-1"></i>
            <span>
              Google Calendar isn't connected yet. Add a Google OAuth Client ID
              (<code>VITE_GOOGLE_CLIENT_ID</code>) and enable the Calendar API to sync live
              availability — showing demo slots for now.
            </span>
          </div>
        )}

        <div className="d-flex flex-column gap-3">
          {salesAgents.map((agent) => {
            const slots = getSlots(agent.id, 3)
            const source = getSlotSource(agent.id)
            const connection = connections[agent.id]
            const isBusy = loadingAgentId === agent.id

            return (
              <div key={agent.id} className="border rounded-3 p-3">
                <Stack direction="horizontal" gap={2} className="align-items-center">
                  <div className="position-relative flex-shrink-0">
                    <img
                      src={agent.avatar}
                      alt={agent.name}
                      className="rounded-circle object-fit-cover"
                      width={40}
                      height={40}
                    />
                    <span
                      className="position-absolute rounded-circle border border-2 border-white"
                      style={{
                        width: 11,
                        height: 11,
                        background: statusConfig[agent.status].hex,
                        bottom: 0,
                        right: 0,
                      }}
                    />
                  </div>
                  <div className="flex-grow-1">
                    <div className="fs-13 fw-semibold text-dark">{agent.name}</div>
                    <div className="fs-11" style={{ color: statusConfig[agent.status].hex }}>
                      {agent.status}
                    </div>
                  </div>

                  {connection ? (
                    <div className="text-end flex-shrink-0">
                      <Badge bg="success-subtle" text="success-emphasis" className="fs-11 mb-1">
                        <i className="fi fi-brands-google me-1"></i>
                        Connected
                      </Badge>
                      <div className="d-flex gap-1 justify-content-end">
                        <Button
                          size="sm"
                          variant="light"
                          onClick={() => refreshAgent(agent.id)}
                          disabled={isBusy}
                          title="Refresh availability"
                        >
                          <i className="fi fi-rr-refresh"></i>
                        </Button>
                        <Button
                          size="sm"
                          variant="light"
                          onClick={() => disconnect(agent.id)}
                          title="Disconnect calendar"
                        >
                          <i className="fi fi-rr-cross-small"></i>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline-primary"
                      className="flex-shrink-0"
                      disabled={!configured || isBusy}
                      onClick={() => connect(agent.id)}
                    >
                      {isBusy ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" />
                          Connecting…
                        </>
                      ) : (
                        <>
                          <i className="fi fi-rr-user-add me-1"></i>
                          Connect
                        </>
                      )}
                    </Button>
                  )}
                </Stack>

                <div className="mt-3 pt-2 border-top">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <span className="fs-11 text-muted text-uppercase">Next available slots</span>
                    <Badge
                      bg={source === 'live' ? 'success-subtle' : 'secondary-subtle'}
                      text={source === 'live' ? 'success-emphasis' : 'secondary-emphasis'}
                      className="fs-11"
                    >
                      {source === 'live' ? 'Live' : 'Demo'}
                    </Badge>
                  </div>

                  {slots.length > 0 ? (
                    <Stack direction="horizontal" gap={1} className="flex-wrap">
                      {slots.map((slot) => (
                        <Badge
                          key={slot.start}
                          bg="light"
                          text="dark"
                          className="border fs-12 fw-normal"
                        >
                          {formatSlotLabel(slot.start)}
                        </Badge>
                      ))}
                    </Stack>
                  ) : (
                    <span className="fs-12 text-muted">No free slots left today</span>
                  )}

                  {connection && (
                    <div className="fs-11 text-muted mt-2">
                      <i className="fi fi-rr-check-circle me-1 text-success"></i>
                      {connection.email}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </Card.Body>
    </Card>
  )
}

export default LiveAvailabilityPanel
