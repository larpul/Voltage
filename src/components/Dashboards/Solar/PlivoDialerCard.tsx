import { Badge, Button, Card, Col, Row } from 'react-bootstrap'
import { formatDuration, plivoConfig } from './dialer/dialerConfig'
import DialerKeypad from './dialer/DialerKeypad'
import RecentCallsList from './dialer/RecentCallsList'
import { LoginStatus, usePlivoDialer } from './dialer/usePlivoDialer'

const statusBadge: Record<LoginStatus, { label: string; color: string }> = {
  ready: { label: 'Ready', color: 'success' },
  connecting: { label: 'Connecting', color: 'warning' },
  error: { label: 'Offline', color: 'danger' },
  unconfigured: { label: 'Setup required', color: 'secondary' },
}

const PlivoDialerCard = () => {
  const {
    loginStatus,
    loginError,
    callError,
    callStatus,
    number,
    setNumber,
    elapsed,
    muted,
    canDial,
    recentCalls,
    pressKey,
    backspace,
    placeCall,
    hangUp,
    toggleMute,
  } = usePlivoDialer()

  const badge = statusBadge[loginStatus]
  const inCall = callStatus !== 'idle'

  const callStatusLabel = () => {
    if (callStatus === 'dialing') return 'Calling…'
    if (callStatus === 'ringing') return 'Ringing…'
    return `Connected ${formatDuration(elapsed)}`
  }

  return (
    <Card className="h-100">
      <Card.Header className="py-3 pe-3 d-flex justify-content-between align-items-center">
        <Card.Title>
          <i className="fi fi-rr-phone-call me-2 text-primary"></i>
          Plivo Dialer
        </Card.Title>
        <Badge bg={`${badge.color}-subtle`} text={`${badge.color}-emphasis`} className="fs-11">
          {badge.label}
        </Badge>
      </Card.Header>
      <Card.Body>
        <Row className="g-3 g-md-4">
          <Col xs={12} md={6}>
            <input
              type="tel"
              className="form-control form-control-lg text-center fw-semibold"
              placeholder="(513) 555-0142"
              aria-label="Phone number"
              value={number}
              onChange={(event) => setNumber(event.target.value)}
              disabled={inCall}
            />

            {inCall ? (
              <div
                className={`alert py-2 fs-12 mt-2 mb-3 ${
                  callStatus === 'connected' ? 'alert-success' : 'alert-info'
                }`}
              >
                <i className="fi fi-rr-phone-call me-1"></i>
                {callStatusLabel()}
              </div>
            ) : loginStatus === 'unconfigured' ? (
              <div className="alert alert-warning py-2 fs-12 mt-2 mb-3">
                Add <code>VITE_PLIVO_ENDPOINT_USERNAME</code> and{' '}
                <code>VITE_PLIVO_ENDPOINT_PASSWORD</code> on the Secrets page to enable calling.
              </div>
            ) : loginStatus === 'error' ? (
              <div className="alert alert-danger py-2 fs-12 mt-2 mb-3">{loginError}</div>
            ) : callError ? (
              <div className="alert alert-danger py-2 fs-12 mt-2 mb-3">{callError}</div>
            ) : (
              <div className="text-muted fs-12 mt-2 mb-3">
                {loginStatus === 'connecting'
                  ? 'Registering your Plivo endpoint…'
                  : 'Endpoint registered — enter a number to call.'}
              </div>
            )}

            <DialerKeypad onKey={pressKey} onBackspace={backspace} disabled={inCall} />

            <div className="mt-3">
              {inCall ? (
                <div className="d-flex gap-2">
                  <Button
                    variant="outline-secondary"
                    className="flex-fill"
                    onClick={toggleMute}
                    disabled={callStatus !== 'connected'}
                  >
                    <i className={`fi fi-rr-${muted ? 'microphone-slash' : 'microphone'} me-1`}></i>
                    {muted ? 'Unmute' : 'Mute'}
                  </Button>
                  <Button variant="danger" className="flex-fill" onClick={hangUp}>
                    <i className="fi fi-rr-phone-slash me-1"></i>
                    Hang up
                  </Button>
                </div>
              ) : (
                <Button variant="success" className="w-100" onClick={placeCall} disabled={!canDial}>
                  <i className="fi fi-rr-phone-call me-2"></i>
                  Call
                </Button>
              )}
            </div>

            {plivoConfig.callerId && (
              <div className="fs-11 text-muted mt-2">Caller ID {plivoConfig.callerId}</div>
            )}
          </Col>

          <Col xs={12} md={6}>
            <RecentCallsList calls={recentCalls} onSelect={setNumber} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default PlivoDialerCard
