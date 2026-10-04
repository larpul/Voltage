import { installations, type Installation, type Phase } from './installationData'
import { salesAgents, type SalesAgent, type AgentStatus } from './salesAgentsData'

/**
 * Smart Scheduling Agent engine.
 *
 * Scores every active (non-completed) installation against every available
 * sales agent and recommends the best fit for the next site visit, using four
 * weighted factors:
 *   - Proximity   (haversine distance between agent and installation)
 *   - Workload    (fewer active assignments is better)
 *   - Availability (Active > Traveling > On Site Visit > Off Duty)
 *   - Performance (deals closed + progress toward monthly goal)
 */

export interface AgentFactor {
  distanceMi: number
  proximity: number
  workload: number
  availability: number
  performance: number
}

export interface RankedAgent {
  agent: SalesAgent
  score: number
  factors: AgentFactor
}

export interface SchedulingRecommendation {
  installation: Installation
  visitType: string
  recommendedAgent: SalesAgent
  score: number
  reasoning: string[]
  rankedAgents: RankedAgent[]
  currentAssignment: SalesAgent | null
  isReassignment: boolean
}

const WEIGHTS = {
  proximity: 0.35,
  workload: 0.25,
  availability: 0.25,
  performance: 0.15,
}

const AVAILABILITY_SCORE: Record<AgentStatus, number> = {
  Active: 1.0,
  Traveling: 0.7,
  'On Site Visit': 0.5,
  'Off Duty': 0.1,
}

const VISIT_TYPE_BY_PHASE: Record<Phase, string> = {
  'Site Survey': 'Site Survey Visit',
  'Permit Review': 'Permit Status Check',
  'Pending Install': 'Pre-Install Verification',
  Installation: 'Installation Oversight',
  Completed: 'No visit needed',
}

/** Haversine distance in miles between two [lat, lon] points. */
function haversineMi(a: [number, number], b: [number, number]): number {
  const R = 3958.8
  const dLat = ((b[0] - a[0]) * Math.PI) / 180
  const dLon = ((b[1] - a[1]) * Math.PI) / 180
  const lat1 = (a[0] * Math.PI) / 180
  const lat2 = (b[0] * Math.PI) / 180
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

function scoreAgent(agent: SalesAgent, installation: Installation): RankedAgent {
  const distanceMi = haversineMi(agent.coords, installation.coords)
  const proximity = 1 / (1 + distanceMi)
  const workload = 1 / (1 + agent.assignedInstallations)
  const availability = AVAILABILITY_SCORE[agent.status]
  const goalProgress = Math.min(agent.monthlyEarned / agent.monthlyGoal, 1)
  const performance = (goalProgress + Math.min(agent.dealsClosed / 10, 1)) / 2

  const score =
    WEIGHTS.proximity * proximity +
    WEIGHTS.workload * workload +
    WEIGHTS.availability * availability +
    WEIGHTS.performance * performance

  return {
    agent,
    score,
    factors: { distanceMi, proximity, workload, availability, performance },
  }
}

function buildReasoning(
  ranked: RankedAgent[],
  installation: Installation,
): string[] {
  const top = ranked[0]
  const f = top.factors
  const reasons: string[] = []

  reasons.push(
    `${f.distanceMi.toFixed(1)} mi away — closest available agent to ${installation.address}`,
  )

  if (top.agent.assignedInstallations === 0) {
    reasons.push('No active assignments — full capacity for a new visit')
  } else {
    reasons.push(
      `Only ${top.agent.assignedInstallations} active assignment${top.agent.assignedInstallations > 1 ? 's' : ''} — light workload`,
    )
  }

  reasons.push(
    top.agent.status === 'Active'
      ? 'Currently Active and ready to dispatch'
      : `Status: ${top.agent.status}`,
  )

  const goalPct = Math.round(
    (top.agent.monthlyEarned / top.agent.monthlyGoal) * 100,
  )
  reasons.push(
    `Strong track record — ${top.agent.dealsClosed} deals closed, ${goalPct}% of monthly goal reached`,
  )

  return reasons
}

export function runSmartScheduling(): SchedulingRecommendation[] {
  const pending = installations.filter((i) => i.phase !== 'Completed')

  return pending
    .map((installation) => {
      const ranked = salesAgents
        .map((agent) => scoreAgent(agent, installation))
        .sort((a, b) => b.score - a.score)

      const top = ranked[0]
      const currentAssignment =
        salesAgents.find((a) => a.id === installation.assignedAgentId) ?? null
      const isReassignment = currentAssignment
        ? currentAssignment.id !== top.agent.id
        : true

      return {
        installation,
        visitType: VISIT_TYPE_BY_PHASE[installation.phase],
        recommendedAgent: top.agent,
        score: top.score,
        reasoning: buildReasoning(ranked, installation),
        rankedAgents: ranked,
        currentAssignment,
        isReassignment,
      }
    })
    .sort((a, b) => b.score - a.score)
}

export { VISIT_TYPE_BY_PHASE }
