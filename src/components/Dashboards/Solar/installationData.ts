import avatar1 from '@/assets/images/avatars/1.png'
import avatar2 from '@/assets/images/avatars/2.png'
import avatar3 from '@/assets/images/avatars/3.png'
import avatar4 from '@/assets/images/avatars/4.png'
import avatar5 from '@/assets/images/avatars/5.png'
import avatar6 from '@/assets/images/avatars/6.png'

export type Phase = 'Site Survey' | 'Permit Review' | 'Pending Install' | 'Installation' | 'Completed'

export interface HistoryEntry {
  date: string
  event: string
  user: string
}

export interface TechSpec {
  label: string
  value: string
}

export interface Installation {
  id: number
  customer: string
  avatar: string
  address: string
  coords: [number, number]
  systemSize: string
  phase: Phase
  phone: string
  email: string
  assignedAgentId: number | null
  contractValue: string
  panelCount: number
  panelModel: string
  inverterModel: string
  batteryModel: string
  roofType: string
  orientation: string
  estimatedAnnualOutput: string
  warrantyYears: number
  installDate: string
  customerNotes: string
  history: HistoryEntry[]
  techSpecs: TechSpec[]
}

export const installations: Installation[] = [
  {
    id: 1,
    customer: 'Archie Tones',
    avatar: avatar1,
    address: '128 Maple St, Cincinnati OH',
    coords: [39.10, -84.51],
    systemSize: '8.5 kW',
    phase: 'Permit Review',
    phone: '(513) 555-0142',
    email: 'archie.tones@email.com',
    assignedAgentId: 2,
    contractValue: '$27,200',
    panelCount: 22,
    panelModel: 'SunPower Maxeon 3 (410W)',
    inverterModel: 'Enphase IQ8+ Microinverter',
    batteryModel: 'Tesla Powerwall 2 (13.5 kWh)',
    roofType: 'Asphalt shingle, 6/12 pitch',
    orientation: 'South, 180° azimuth',
    estimatedAnnualOutput: '12,800 kWh',
    warrantyYears: 25,
    installDate: 'TBD',
    customerNotes:
      'Customer is concerned about HOA approval timelines. Prefers all communication via email. Has a large oak tree on the south side that may cause shading in winter months — recommended tree trimming before installation. Served by Duke Energy Ohio.',
    history: [
      { date: '2026-09-12', event: 'Site survey completed — roof structure confirmed suitable', user: 'Mike Reynolds' },
      { date: '2026-09-18', event: 'System design finalized and sent to customer for approval', user: 'Sarah Chen' },
      { date: '2026-09-25', event: 'Customer approved design; permit application submitted to Duke Energy', user: 'Sarah Chen' },
      { date: '2026-10-01', event: 'Permit review in progress with city of Cincinnati', user: 'System' },
    ],
    techSpecs: [
      { label: 'DC System Size', value: '8.5 kW' },
      { label: 'Panel Count', value: '22 panels' },
      { label: 'Panel Model', value: 'SunPower Maxeon 3 (410W)' },
      { label: 'Inverter', value: 'Enphase IQ8+ Microinverter' },
      { label: 'Battery Storage', value: 'Tesla Powerwall 2 (13.5 kWh)' },
      { label: 'Roof Type', value: 'Asphalt shingle, 6/12 pitch' },
      { label: 'Array Orientation', value: 'South, 180° azimuth' },
      { label: 'Est. Annual Output', value: '12,800 kWh' },
      { label: 'Performance Warranty', value: '25 years' },
    ],
  },
  {
    id: 2,
    customer: 'Holmes Cherry',
    avatar: avatar2,
    address: '45 Oak Ave, Covington KY',
    coords: [39.08, -84.51],
    systemSize: '10.2 kW',
    phase: 'Completed',
    phone: '(513) 555-0187',
    email: 'holmes.cherry@email.com',
    assignedAgentId: 1,
    contractValue: '$31,600',
    panelCount: 26,
    panelModel: 'LG NeON R (410W)',
    inverterModel: 'SolarEdge SE10000H HD-Wave',
    batteryModel: 'None',
    roofType: 'Concrete tile, 4/12 pitch',
    orientation: 'Southwest, 225° azimuth',
    estimatedAnnualOutput: '14,900 kWh',
    warrantyYears: 25,
    installDate: '2026-08-14',
    customerNotes:
      'Installation completed ahead of schedule. Customer very happy with the process. Enrolled in Duke Energy Kentucky net metering. Monitoring app set up and customer trained on usage tracking.',
    history: [
      { date: '2026-06-03', event: 'Initial consultation and site survey', user: 'Mike Reynolds' },
      { date: '2026-06-15', event: 'Permit approved by Kenton County', user: 'Sarah Chen' },
      { date: '2026-07-20', event: 'Materials delivered to site', user: 'System' },
      { date: '2026-08-12', event: 'Installation crew dispatched (2-day install)', user: 'Dispatch' },
      { date: '2026-08-14', event: 'Installation completed and inspected', user: 'Mike Reynolds' },
      { date: '2026-08-20', event: 'PTO (Permission to Operate) granted by Duke Energy', user: 'Utility' },
    ],
    techSpecs: [
      { label: 'DC System Size', value: '10.2 kW' },
      { label: 'Panel Count', value: '26 panels' },
      { label: 'Panel Model', value: 'LG NeON R (410W)' },
      { label: 'Inverter', value: 'SolarEdge SE10000H HD-Wave' },
      { label: 'Battery Storage', value: 'None' },
      { label: 'Roof Type', value: 'Concrete tile, 4/12 pitch' },
      { label: 'Array Orientation', value: 'Southwest, 225° azimuth' },
      { label: 'Est. Annual Output', value: '14,900 kWh' },
      { label: 'Performance Warranty', value: '25 years' },
    ],
  },
  {
    id: 3,
    customer: 'Malanie Hanvey',
    avatar: avatar3,
    address: '72 Pine Rd, Dayton OH',
    coords: [39.76, -84.19],
    systemSize: '6.0 kW',
    phase: 'Pending Install',
    phone: '(513) 555-0199',
    email: 'malanie.h@email.com',
    assignedAgentId: 1,
    contractValue: '$19,800',
    panelCount: 16,
    panelModel: 'Q CELLS Q.PEAK DUO (400W)',
    inverterModel: 'Enphase IQ8M Microinverter',
    batteryModel: 'Enphase IQ Battery 5P',
    roofType: 'Flat roof, membrane',
    orientation: 'South, 180° azimuth',
    estimatedAnnualOutput: '10,500 kWh',
    warrantyYears: 25,
    installDate: 'TBD (scheduled for Oct 15)',
    customerNotes:
      'Flat roof installation requires ballasted racking system. Customer wants battery backup for severe storm power outages. AES Ohio requires specific interconnection documentation — paperwork in progress.',
    history: [
      { date: '2026-08-05', event: 'Site survey completed — flat roof confirmed', user: 'Mike Reynolds' },
      { date: '2026-08-22', event: 'Design approved by customer', user: 'Sarah Chen' },
      { date: '2026-09-03', event: 'Permit approved by City of Dayton', user: 'Sarah Chen' },
      { date: '2026-09-28', event: 'Materials ordered and scheduled for delivery', user: 'System' },
      { date: '2026-10-02', event: 'Install date confirmed for Oct 15', user: 'Dispatch' },
    ],
    techSpecs: [
      { label: 'DC System Size', value: '6.0 kW' },
      { label: 'Panel Count', value: '16 panels' },
      { label: 'Panel Model', value: 'Q CELLS Q.PEAK DUO (400W)' },
      { label: 'Inverter', value: 'Enphase IQ8M Microinverter' },
      { label: 'Battery Storage', value: 'Enphase IQ Battery 5P' },
      { label: 'Roof Type', value: 'Flat roof, membrane' },
      { label: 'Array Orientation', value: 'South, 180° azimuth' },
      { label: 'Est. Annual Output', value: '10,500 kWh' },
      { label: 'Performance Warranty', value: '25 years' },
    ],
  },
  {
    id: 4,
    customer: 'Kenneth Hune',
    avatar: avatar4,
    address: '15 Birch Ln, Columbus OH',
    coords: [39.96, -83.0],
    systemSize: '12.4 kW',
    phase: 'Site Survey',
    phone: '(513) 555-0110',
    email: 'kenneth.hune@email.com',
    assignedAgentId: 1,
    contractValue: '$38,500',
    panelCount: 30,
    panelModel: 'REC Alpha Pure (420W)',
    inverterModel: 'SolarEdge SE12000H HD-Wave',
    batteryModel: 'Tesla Powerwall 2 (13.5 kWh)',
    roofType: 'Metal standing seam, 7/12 pitch',
    orientation: 'South, 180° azimuth',
    estimatedAnnualOutput: '15,200 kWh',
    warrantyYears: 25,
    installDate: 'TBD',
    customerNotes:
      'Large system for a big property with EV charging needs. Metal standing seam roof — can use clamp attachments without penetrations. Customer interested in adding a second battery in the future.',
    history: [
      { date: '2026-09-20', event: 'Lead generated from referral — initial call completed', user: 'Sarah Chen' },
      { date: '2026-09-28', event: 'Site survey scheduled and roof measurements taken', user: 'Mike Reynolds' },
      { date: '2026-10-03', event: 'Shading analysis completed — minimal obstruction', user: 'Mike Reynolds' },
    ],
    techSpecs: [
      { label: 'DC System Size', value: '12.4 kW' },
      { label: 'Panel Count', value: '30 panels' },
      { label: 'Panel Model', value: 'REC Alpha Pure (420W)' },
      { label: 'Inverter', value: 'SolarEdge SE12000H HD-Wave' },
      { label: 'Battery Storage', value: 'Tesla Powerwall 2 (13.5 kWh)' },
      { label: 'Roof Type', value: 'Metal standing seam, 7/12 pitch' },
      { label: 'Array Orientation', value: 'South, 180° azimuth' },
      { label: 'Est. Annual Output', value: '15,200 kWh' },
      { label: 'Performance Warranty', value: '25 years' },
    ],
  },
  {
    id: 5,
    customer: 'Valentine Maton',
    avatar: avatar5,
    address: '301 Cedar Dr, Lexington KY',
    coords: [38.04, -84.50],
    systemSize: '9.8 kW',
    phase: 'Pending Install',
    phone: '(513) 555-0177',
    email: 'val.maton@email.com',
    assignedAgentId: 2,
    contractValue: '$30,100',
    panelCount: 24,
    panelModel: 'SunPower Maxeon 3 (410W)',
    inverterModel: 'Enphase IQ8+ Microinverter',
    batteryModel: 'Tesla Powerwall 2 (13.5 kWh)',
    roofType: 'Concrete tile, 5/12 pitch',
    orientation: 'East-West split',
    estimatedAnnualOutput: '13,600 kWh',
    warrantyYears: 25,
    installDate: 'TBD (scheduled for Oct 22)',
    customerNotes:
      'Storm-prone area — system designed with enhanced wind load ratings (170 mph). Customer requires battery backup for severe weather preparedness. Kentucky Utilities interconnection application submitted. Customer has a pool pump that runs during the day — expects significant offset.',
    history: [
      { date: '2026-08-10', event: 'Site survey completed', user: 'Mike Reynolds' },
      { date: '2026-08-28', event: 'Design finalized with hurricane-rated mounting', user: 'Sarah Chen' },
      { date: '2026-09-15', event: 'Permit approved by Fayette County', user: 'Sarah Chen' },
      { date: '2026-09-30', event: 'FPL interconnection application submitted', user: 'System' },
      { date: '2026-10-02', event: 'Install date confirmed for Oct 22', user: 'Dispatch' },
    ],
    techSpecs: [
      { label: 'DC System Size', value: '9.8 kW' },
      { label: 'Panel Count', value: '24 panels' },
      { label: 'Panel Model', value: 'SunPower Maxeon 3 (410W)' },
      { label: 'Inverter', value: 'Enphase IQ8+ Microinverter' },
      { label: 'Battery Storage', value: 'Tesla Powerwall 2 (13.5 kWh)' },
      { label: 'Roof Type', value: 'Concrete tile, 5/12 pitch' },
      { label: 'Array Orientation', value: 'East-West split' },
      { label: 'Est. Annual Output', value: '13,600 kWh' },
      { label: 'Performance Warranty', value: '25 years' },
    ],
  },
  {
    id: 6,
    customer: 'Selina Kyle',
    avatar: avatar6,
    address: '88 Elm Ct, Hamilton OH',
    coords: [39.40, -84.56],
    systemSize: '7.2 kW',
    phase: 'Completed',
    phone: '(513) 555-0133',
    email: 'selina.kyle@email.com',
    assignedAgentId: 1,
    contractValue: '$23,400',
    panelCount: 18,
    panelModel: 'Q CELLS Q.PEAK DUO (400W)',
    inverterModel: 'Enphase IQ8+ Microinverter',
    batteryModel: 'None',
    roofType: 'Asphalt shingle, 4/12 pitch',
    orientation: 'South, 180° azimuth',
    estimatedAnnualOutput: '10,800 kWh',
    warrantyYears: 25,
    installDate: '2026-07-02',
    customerNotes:
      'Smooth installation with no issues. Customer satisfied with energy savings so far — seeing ~$180/mo reduction. Duke Energy Ohio PTO received in 12 days. Recommended annual panel cleaning due to dust in the area.',
    history: [
      { date: '2026-05-10', event: 'Initial consultation and site survey', user: 'Mike Reynolds' },
      { date: '2026-05-25', event: 'Permit approved by City of Hamilton', user: 'Sarah Chen' },
      { date: '2026-06-20', event: 'Materials delivered', user: 'System' },
      { date: '2026-06-30', event: 'Installation crew dispatched', user: 'Dispatch' },
      { date: '2026-07-02', event: 'Installation completed and inspected', user: 'Mike Reynolds' },
      { date: '2026-07-14', event: 'PTO granted by Oncor', user: 'Utility' },
    ],
    techSpecs: [
      { label: 'DC System Size', value: '7.2 kW' },
      { label: 'Panel Count', value: '18 panels' },
      { label: 'Panel Model', value: 'Q CELLS Q.PEAK DUO (400W)' },
      { label: 'Inverter', value: 'Enphase IQ8+ Microinverter' },
      { label: 'Battery Storage', value: 'None' },
      { label: 'Roof Type', value: 'Asphalt shingle, 4/12 pitch' },
      { label: 'Array Orientation', value: 'South, 180° azimuth' },
      { label: 'Est. Annual Output', value: '10,800 kWh' },
      { label: 'Performance Warranty', value: '25 years' },
    ],
  },
  {
    id: 7,
    customer: 'Bruce Wayne',
    avatar: avatar1,
    address: '1007 Mountain Dr, Newport KY',
    coords: [39.09, -84.49],
    systemSize: '15.0 kW',
    phase: 'Permit Review',
    phone: '(513) 555-0155',
    email: 'b.wayne@email.com',
    assignedAgentId: 2,
    contractValue: '$48,000',
    panelCount: 36,
    panelModel: 'REC Alpha Pure (420W)',
    inverterModel: 'SolarEdge SE15000H HD-Wave',
    batteryModel: '2× Tesla Powerwall 2 (27 kWh total)',
    roofType: 'Slate, 10/12 pitch',
    orientation: 'South, 180° azimuth',
    estimatedAnnualOutput: '18,500 kWh',
    warrantyYears: 25,
    installDate: 'TBD',
    customerNotes:
      'Premium installation on a large estate. Slate roof requires special flashing — coordinating with a roofing subcontractor. Customer has high energy demands (EVs, security system, extensive lighting). Dual battery setup for full home backup. Project is time-sensitive — customer wants completion before winter.',
    history: [
      { date: '2026-09-05', event: 'Site survey completed — slate roof assessment', user: 'Mike Reynolds' },
      { date: '2026-09-15', event: 'Roofing subcontractor engaged for slate work', user: 'Sarah Chen' },
      { date: '2026-09-22', event: 'System design finalized (36 panels, dual battery)', user: 'Sarah Chen' },
      { date: '2026-09-28', event: 'Permit application submitted to Newport City Planning', user: 'System' },
    ],
    techSpecs: [
      { label: 'DC System Size', value: '15.0 kW' },
      { label: 'Panel Count', value: '36 panels' },
      { label: 'Panel Model', value: 'REC Alpha Pure (420W)' },
      { label: 'Inverter', value: 'SolarEdge SE15000H HD-Wave' },
      { label: 'Battery Storage', value: '2× Tesla Powerwall 2 (27 kWh total)' },
      { label: 'Roof Type', value: 'Slate, 10/12 pitch' },
      { label: 'Array Orientation', value: 'South, 180° azimuth' },
      { label: 'Est. Annual Output', value: '18,500 kWh' },
      { label: 'Performance Warranty', value: '25 years' },
    ],
  },
  {
    id: 8,
    customer: 'Diana Prince',
    avatar: avatar2,
    address: '1200 Themis Blvd, Mason OH',
    coords: [39.36, -84.31],
    systemSize: '11.5 kW',
    phase: 'Installation',
    phone: '(513) 555-0166',
    email: 'diana.prince@email.com',
    assignedAgentId: 2,
    contractValue: '$35,800',
    panelCount: 28,
    panelModel: 'SunPower Maxeon 3 (410W)',
    inverterModel: 'Enphase IQ8+ Microinverter',
    batteryModel: 'Tesla Powerwall 2 (13.5 kWh)',
    roofType: 'Flat roof, TPO membrane',
    orientation: 'South, 180° azimuth',
    estimatedAnnualOutput: '16,200 kWh',
    warrantyYears: 25,
    installDate: 'In progress (Oct 3-4)',
    customerNotes:
      'Flat commercial-style roof on a residential property. Ballasted racking with minimal penetrations. Installation is currently in progress — panels being mounted today. Duke Energy Ohio interconnection pending. Customer wants monitoring dashboard accessible on multiple devices.',
    history: [
      { date: '2026-07-15', event: 'Site survey completed', user: 'Mike Reynolds' },
      { date: '2026-08-01', event: 'Design approved by customer', user: 'Sarah Chen' },
      { date: '2026-08-20', event: 'Permit approved by City of Mason', user: 'Sarah Chen' },
      { date: '2026-09-25', event: 'Materials delivered to site', user: 'System' },
      { date: '2026-10-03', event: 'Installation crew dispatched — Day 1', user: 'Dispatch' },
    ],
    techSpecs: [
      { label: 'DC System Size', value: '11.5 kW' },
      { label: 'Panel Count', value: '28 panels' },
      { label: 'Panel Model', value: 'SunPower Maxeon 3 (410W)' },
      { label: 'Inverter', value: 'Enphase IQ8+ Microinverter' },
      { label: 'Battery Storage', value: 'Tesla Powerwall 2 (13.5 kWh)' },
      { label: 'Roof Type', value: 'Flat roof, TPO membrane' },
      { label: 'Array Orientation', value: 'South, 180° azimuth' },
      { label: 'Est. Annual Output', value: '16,200 kWh' },
      { label: 'Performance Warranty', value: '25 years' },
    ],
  },
]

export type Filter = Phase | 'All'

export const phaseConfig: Record<Phase, { color: string; step: number }> = {
  'Site Survey': { color: 'info', step: 1 },
  'Permit Review': { color: 'warning', step: 2 },
  'Pending Install': { color: 'primary', step: 3 },
  'Installation': { color: 'info', step: 4 },
  'Completed': { color: 'success', step: 5 },
}

export interface Milestone {
  label: string
  icon: string
  status: 'completed' | 'in-progress' | 'pending'
  date?: string
}

export const MILESTONE_STAGES = [
  { label: 'Site Survey', icon: 'fi-rr-marker' },
  { label: 'Design Approved', icon: 'fi-rr-check' },
  { label: 'Permit Submitted', icon: 'fi-rr-document' },
  { label: 'Permit Approved', icon: 'fi-rr-document-checked' },
  { label: 'Materials Ordered', icon: 'fi-rr-truck' },
  { label: 'Install Scheduled', icon: 'fi-rr-calendar' },
  { label: 'Install Complete', icon: 'fi-rr-sun' },
  { label: 'PTO / Inspection', icon: 'fi-rr-check-circle' },
]

const PHASE_COMPLETED_MILESTONES: Record<Phase, number> = {
  'Site Survey': 0,
  'Permit Review': 2,
  'Pending Install': 4,
  'Installation': 6,
  'Completed': 8,
}

const MILESTONE_KEYWORDS: { keywords: string[]; index: number }[] = [
  { keywords: ['site survey', 'roof measurement', 'shading analysis'], index: 0 },
  { keywords: ['design'], index: 1 },
  { keywords: ['permit application submitted', 'permit submitted', 'interconnection application submitted'], index: 2 },
  { keywords: ['permit approved'], index: 3 },
  { keywords: ['materials'], index: 4 },
  { keywords: ['install date confirmed', 'installation crew dispatched', 'install scheduled'], index: 5 },
  { keywords: ['installation completed'], index: 6 },
  { keywords: ['pto', 'inspection'], index: 7 },
]

export function getMilestones(project: Installation): Milestone[] {
  const completedCount = PHASE_COMPLETED_MILESTONES[project.phase]
  const dateMap = new Map<number, string>()

  project.history.forEach((entry) => {
    const text = entry.event.toLowerCase()
    for (const { keywords, index } of MILESTONE_KEYWORDS) {
      if (keywords.some((kw) => text.includes(kw))) {
        if (!dateMap.has(index)) dateMap.set(index, entry.date)
      }
    }
  })

  return MILESTONE_STAGES.map((stage, index) => {
    let status: Milestone['status']
    if (index < completedCount) status = 'completed'
    else if (index === completedCount && completedCount < MILESTONE_STAGES.length) status = 'in-progress'
    else status = 'pending'

    return {
      label: stage.label,
      icon: stage.icon,
      status,
      date: dateMap.get(index),
    }
  })
}

export const PHASE_STEPS = 5

export function getInstallationById(id: number): Installation | undefined {
  return installations.find((i) => i.id === id)
}
