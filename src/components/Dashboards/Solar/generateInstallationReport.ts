import { Installation, phaseConfig, PHASE_STEPS } from './installationData'

/**
 * Builds a plain-text summary report covering the house design and power
 * metrics for a single solar installation, and triggers a browser download.
 */
export function downloadInstallationReport(project: Installation): void {
  const phase = phaseConfig[project.phase]
  const progressPct = Math.round((phase.step / PHASE_STEPS) * 100)

  const lines: string[] = []
  const divider = '============================================================'
  const section = (title: string) => {
    lines.push('', divider, title, divider)
  }

  lines.push('SOLAR INSTALLATION — SUMMARY REPORT')
  lines.push(`Generated: ${new Date().toLocaleString()}`)

  section('CUSTOMER & PROJECT')
  lines.push(`Customer:        ${project.customer}`)
  lines.push(`Address:         ${project.address}`)
  lines.push(`Phone:           ${project.phone}`)
  lines.push(`Email:           ${project.email}`)
  lines.push(`Contract Value:  ${project.contractValue}`)
  lines.push(`Current Phase:   ${project.phase} (${phase.step}/${PHASE_STEPS} — ${progressPct}%)`)
  lines.push(`Install Date:    ${project.installDate}`)
  lines.push(`Warranty:        ${project.warrantyYears} years`)

  section('HOUSE DESIGN')
  lines.push(`Roof Type:       ${project.roofType}`)
  lines.push(`Orientation:     ${project.orientation}`)
  lines.push(`Panel Count:     ${project.panelCount}`)
  lines.push(`Panel Model:     ${project.panelModel}`)
  lines.push(`Inverter:        ${project.inverterModel}`)
  lines.push(`Battery Storage: ${project.batteryModel}`)

  section('POWER METRICS')
  project.techSpecs.forEach((spec) => {
    lines.push(`${spec.label.padEnd(22, ' ')}${spec.value}`)
  })

  section('PROJECT HISTORY')
  project.history.forEach((entry, idx) => {
    lines.push(`${idx + 1}. [${entry.date}] ${entry.event} — ${entry.user}`)
  })

  section('CUSTOMER NOTES')
  lines.push(project.customerNotes)

  lines.push('', divider, 'END OF REPORT', divider)

  const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  const safeName = project.customer.replace(/[^a-z0-9]+/gi, '_').toLowerCase()
  link.download = `installation_${project.id}_${safeName}_report.txt`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
