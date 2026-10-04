import { Dropdown } from 'react-bootstrap'
import { salesAgents } from './salesAgentsData'
import { useAgentNotifications } from './AgentNotificationContext'
import { Installation } from './installationData'

interface Props {
  installation: Installation
}

const AssignAgentDropdown = ({ installation }: Props) => {
  const { getAssignedAgentId, assignAgent } = useAgentNotifications()
  const currentAgentId = getAssignedAgentId(installation.id) ?? installation.assignedAgentId
  const currentAgent = salesAgents.find((a) => a.id === currentAgentId)

  return (
    <div style={{ minWidth: 180 }}>
      <div className="mb-1">
        <span className="fs-12 text-muted">Assigned Agent</span>
      </div>
      <Dropdown>
        <Dropdown.Toggle
          variant={currentAgent ? 'light' : 'outline-secondary'}
          size="sm"
          className="w-100 text-start d-flex align-items-center justify-content-between"
        >
          {currentAgent ? (
            <span className="d-flex align-items-center gap-2">
              <img
                src={currentAgent.avatar}
                alt={currentAgent.name}
                className="rounded-circle object-fit-cover"
                width={24}
                height={24}
              />
              <span className="fs-13 fw-semibold text-truncate">{currentAgent.name}</span>
            </span>
          ) : (
            <span className="fs-13 text-muted">
              <i className="fi fi-rr-user-add me-1"></i>Assign Agent
            </span>
          )}
        </Dropdown.Toggle>
        <Dropdown.Menu className="w-100">
          <Dropdown.Header className="fs-11 text-uppercase">Assign to Agent</Dropdown.Header>
          {salesAgents.map((agent) => (
            <Dropdown.Item
              key={agent.id}
              active={agent.id === currentAgentId}
              onClick={() => assignAgent(installation, agent.id)}
              className="d-flex align-items-center"
            >
              <img
                src={agent.avatar}
                alt={agent.name}
                className="rounded-circle object-fit-cover me-2"
                width={24}
                height={24}
              />
              <span className="fs-13">{agent.name}</span>
              {agent.id === currentAgentId && (
                <i className="fi fi-rr-check ms-auto text-success"></i>
              )}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default AssignAgentDropdown
