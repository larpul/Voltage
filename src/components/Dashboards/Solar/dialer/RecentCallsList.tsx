import { Badge } from 'react-bootstrap'
import { formatCallTime, formatDuration } from './dialerConfig'
import { RecentCall, outcomeColors, outcomeLabels } from './recentCalls'

interface RecentCallsListProps {
  calls: RecentCall[]
  onSelect: (number: string) => void
}

const RecentCallsList = ({ calls, onSelect }: RecentCallsListProps) => (
  <div className="d-flex flex-column h-100">
    <div className="d-flex justify-content-between align-items-center mb-2">
      <h6 className="mb-0 fs-12 text-uppercase text-muted">Recent calls</h6>
      <Badge bg="secondary-subtle" text="secondary-emphasis" className="fs-11">
        {calls.length}
      </Badge>
    </div>

    {calls.length === 0 ? (
      <div className="text-center text-muted fs-12 border rounded py-4">
        <i className="fi fi-rr-phone-slash d-block fs-4 mb-1"></i>
        No calls yet
      </div>
    ) : (
      <div className="d-flex flex-column gap-2">
        {calls.map((call) => {
          const color = outcomeColors[call.outcome]
          return (
            <button
              key={call.id}
              type="button"
              className="btn btn-light text-start d-flex align-items-center gap-2 py-2 px-2"
              onClick={() => onSelect(call.number)}
              title={`Dial ${call.number} again`}
            >
              <span
                className={`d-flex align-items-center justify-content-center rounded-circle flex-shrink-0 bg-${color}-subtle text-${color}-emphasis`}
                style={{ width: 30, height: 30 }}
              >
                <i className="fi fi-rr-arrow-up-right fs-11"></i>
              </span>
              <span className="flex-grow-1 overflow-hidden">
                <span className="d-block fs-13 fw-semibold text-dark text-truncate">
                  {call.number}
                </span>
                <span className="d-block fs-11 text-muted">
                  {outcomeLabels[call.outcome]}
                  {call.durationSec > 0 ? ` · ${formatDuration(call.durationSec)}` : ''}
                </span>
              </span>
              <span className="fs-11 text-muted flex-shrink-0">{formatCallTime(call.at)}</span>
            </button>
          )
        })}
      </div>
    )}
  </div>
)

export default RecentCallsList
