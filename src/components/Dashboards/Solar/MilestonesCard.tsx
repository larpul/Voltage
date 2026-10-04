import { Card } from 'react-bootstrap'
import { Installation, getMilestones } from './installationData'

interface Props {
  installation: Installation
}

const statusConfig = {
  completed: { color: 'success', icon: 'fi-rr-check-circle', text: 'text-success' },
  'in-progress': { color: 'primary', icon: 'fi-rr-spinner', text: 'text-primary' },
  pending: { color: 'secondary', icon: 'fi-rr-circle', text: 'text-muted' },
}

const MilestonesCard = ({ installation }: Props) => {
  const milestones = getMilestones(installation)
  const completed = milestones.filter((m) => m.status === 'completed').length
  const pct = (completed / milestones.length) * 100

  return (
    <Card className="h-100">
      <Card.Header className="py-3 d-flex justify-content-between align-items-center">
        <Card.Title className="mb-0">
          <i className="fi fi-rr-bolt me-2"></i>
          Project Milestones
        </Card.Title>
        <span className="badge bg-primary-subtle text-primary">{completed}/{milestones.length}</span>
      </Card.Header>
      <Card.Body>
        {/* overall progress bar */}
        <div className="progress mb-4" style={{ height: '6px' }}>
          <div className="progress-bar bg-success" style={{ width: `${pct}%` }} />
        </div>

        {milestones.map((ms, idx) => {
          const cfg = statusConfig[ms.status]
          const isLast = idx === milestones.length - 1
          return (
            <div key={idx} className="d-flex gap-3">
              {/* marker + connector */}
              <div className="d-flex flex-column align-items-center" style={{ width: 24 }}>
                <i className={`fi ${cfg.icon} ${cfg.text} fs-5`} />
                {!isLast && (
                  <div
                    className="flex-grow-1 my-1"
                    style={{ width: 2, background: ms.status === 'completed' ? 'var(--bs-success)' : 'var(--bs-border-color)' }}
                  />
                )}
              </div>
              {/* content */}
              <div className={`pb-3 ${isLast ? '' : 'border-start-0'}`} style={{ minWidth: 0 }}>
                <div className="d-flex align-items-center gap-2">
                  <span className={`fw-semibold fs-14 ${ms.status === 'pending' ? 'text-muted' : 'text-body'}`}>
                    {ms.label}
                  </span>
                  {ms.status === 'in-progress' && (
                    <span className="badge bg-primary-subtle text-primary fs-11">In Progress</span>
                  )}
                </div>
                {ms.date && <span className="fs-12 text-muted d-block">{ms.date}</span>}
              </div>
            </div>
          )
        })}
      </Card.Body>
    </Card>
  )
}

export default MilestonesCard
