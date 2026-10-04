import { installations, type Installation } from './installationData'

export interface SiteVisitEvent {
  id: string
  title: string
  start: string
  className: string
  description: string
  installationId: number
  phase: string
  address: string
}

type EventCategory = 'survey' | 'permit' | 'material' | 'install' | 'milestone'

const categoryConfig: Record<EventCategory, { className: string; label: string }> = {
  survey: { className: 'fc-event-info-subtle', label: 'Site Survey' },
  permit: { className: 'fc-event-warning-subtle', label: 'Permit' },
  material: { className: 'fc-event-primary-subtle', label: 'Materials' },
  install: { className: 'fc-event-success-subtle', label: 'Installation' },
  milestone: { className: 'fc-event-danger-subtle', label: 'Milestone' },
}

function categorizeEvent(eventText: string): EventCategory {
  const text = eventText.toLowerCase()
  if (text.includes('site survey') || text.includes('shading analysis') || text.includes('consultation')) {
    return 'survey'
  }
  if (text.includes('permit')) {
    return 'permit'
  }
  if (text.includes('material') || text.includes('deliver')) {
    return 'material'
  }
  if (text.includes('install') || text.includes('pto') || text.includes('permission to operate')) {
    return 'install'
  }
  return 'milestone'
}

function buildEventFromHistory(
  installation: Installation,
  date: string,
  eventText: string,
): SiteVisitEvent | null {
  const category = categorizeEvent(eventText)
  const config = categoryConfig[category]
  return {
    id: `sv-${installation.id}-${date}`,
    title: `${installation.customer} — ${config.label}`,
    start: date,
    className: config.className,
    description: `${eventText} | ${installation.address} | ${installation.systemSize} system`,
    installationId: installation.id,
    phase: installation.phase,
    address: installation.address,
  }
}

function parseInstallDate(installDate: string): string | null {
  // Handles formats like "2026-08-14", "TBD (scheduled for Oct 15)", "In progress (Oct 3-4)"
  const directMatch = installDate.match(/^(\d{4}-\d{2}-\d{2})/)
  if (directMatch) return directMatch[1]

  const scheduledMatch = installDate.match(/(\w+ \d{1,2})/)
  if (scheduledMatch) {
    const parsed = new Date(scheduledMatch[1] + ', 2026')
    if (!isNaN(parsed.getTime())) {
      return parsed.toISOString().split('T')[0]
    }
  }
  return null
}

export function getSiteVisitEvents(): SiteVisitEvent[] {
  const events: SiteVisitEvent[] = []

  for (const installation of installations) {
    // History entries
    for (const entry of installation.history) {
      const event = buildEventFromHistory(installation, entry.date, entry.event)
      if (event) events.push(event)
    }

    // Install date (if parseable and not already covered by history)
    if (installation.installDate && installation.installDate !== 'TBD') {
      const parsed = parseInstallDate(installation.installDate)
      if (parsed) {
        const exists = events.some(
          (e) => e.installationId === installation.id && e.start === parsed,
        )
        if (!exists) {
          const event = buildEventFromHistory(
            installation,
            parsed,
            `Installation scheduled — ${installation.installDate}`,
          )
          if (event) events.push(event)
        }
      }
    }
  }

  return events
}

export { categoryConfig, type EventCategory }
