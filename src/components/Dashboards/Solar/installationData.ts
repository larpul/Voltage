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
    customer: 'Ruth Beck',
    avatar: avatar1,
    address: '1795 E Crescentville Rd, Cincinnati OH',
    coords: [39.27, -84.49],
    systemSize: '5.28 kW',
    phase: 'Completed',
    phone: '(651) 303-3239',
    email: 'Ruth@lumnagallery.com',
    assignedAgentId: 1,
    contractValue: '$33,468',
    panelCount: 13,
    panelModel: 'Q CELLS Q.PEAK DUO (400W)',
    inverterModel: 'Enphase IQ8+ Microinverter',
    batteryModel: 'None',
    roofType: 'Asphalt shingle, 6/12 pitch',
    orientation: 'South, 180° azimuth',
    estimatedAnnualOutput: '5,409 kWh',
    warrantyYears: 20,
    installDate: '2026-03-13',
    customerNotes:
      'Financed via Goodleap, 20-year term at 3.99% APR. Lineside tap adder was missing from the original quote ($425) — flagged for Midas reconciliation. Sales rep Kaden Goines, setter Logan.',
    history: [
      { date: '2026-01-29', event: 'Contract signed — Goodleap loan approved', user: 'Kaden Goines' },
      { date: '2026-03-13', event: 'Installation started', user: 'Dispatch' },
    ],
    techSpecs: [
      { label: 'DC System Size', value: '5.28 kW' },
      { label: 'Panel Count', value: '13 panels' },
      { label: 'Panel Model', value: 'Q CELLS Q.PEAK DUO (400W)' },
      { label: 'Inverter', value: 'Enphase IQ8+ Microinverter' },
      { label: 'Battery Storage', value: 'None' },
      { label: 'Roof Type', value: 'Asphalt shingle, 6/12 pitch' },
      { label: 'Array Orientation', value: 'South, 180° azimuth' },
      { label: 'Est. Annual Output', value: '5,409 kWh' },
      { label: 'Performance Warranty', value: '20 years' },
    ],
  },
  {
    id: 2,
    customer: 'Elizabeth Beck',
    avatar: avatar2,
    address: '12054 Benadir Rd, Cincinnati OH',
    coords: [39.24, -84.46],
    systemSize: '3.52 kW',
    phase: 'Completed',
    phone: '(513) 751-0377',
    email: 'Ehbeck@zoomtown.com',
    assignedAgentId: 1,
    contractValue: '$17,796',
    panelCount: 9,
    panelModel: 'Q CELLS Q.PEAK DUO (400W)',
    inverterModel: 'Enphase IQ8+ Microinverter',
    batteryModel: 'None',
    roofType: 'Asphalt shingle, 5/12 pitch',
    orientation: 'South, 180° azimuth',
    estimatedAnnualOutput: '3,363 kWh',
    warrantyYears: 20,
    installDate: '2026-03-13',
    customerNotes:
      'Lead from tradeshow. Financed via Goodleap, 20-year term at 5.99% APR. Lineside tap adder ($425) was missing from original quote and paid out 5/18/26. Sales rep Kaden Goines, setter Logan.',
    history: [
      { date: '2026-01-29', event: 'Contract signed — Goodleap loan approved', user: 'Kaden Goines' },
      { date: '2026-03-13', event: 'Installation started', user: 'Dispatch' },
      { date: '2026-05-18', event: 'Lineside tap adder paid out ($425)', user: 'Midas' },
    ],
    techSpecs: [
      { label: 'DC System Size', value: '3.52 kW' },
      { label: 'Panel Count', value: '9 panels' },
      { label: 'Panel Model', value: 'Q CELLS Q.PEAK DUO (400W)' },
      { label: 'Inverter', value: 'Enphase IQ8+ Microinverter' },
      { label: 'Battery Storage', value: 'None' },
      { label: 'Roof Type', value: 'Asphalt shingle, 5/12 pitch' },
      { label: 'Array Orientation', value: 'South, 180° azimuth' },
      { label: 'Est. Annual Output', value: '3,363 kWh' },
      { label: 'Performance Warranty', value: '20 years' },
    ],
  },
  {
    id: 3,
    customer: 'Karole McGrew',
    avatar: avatar3,
    address: '1880 North St, Stockport OH',
    coords: [39.54, -81.80],
    systemSize: '10.56 kW',
    phase: 'Completed',
    phone: '(740) 408-4951',
    email: 'Karlynne1880@gmail.com',
    assignedAgentId: 2,
    contractValue: '$57,992',
    panelCount: 26,
    panelModel: 'REC Alpha Pure (420W)',
    inverterModel: 'SolarEdge SE10000H HD-Wave',
    batteryModel: 'None',
    roofType: 'Asphalt shingle, 6/12 pitch',
    orientation: 'South, 180° azimuth',
    estimatedAnnualOutput: '9,973 kWh',
    warrantyYears: 25,
    installDate: '2026-03-11',
    customerNotes: 'Financed via Dividend, 25-year term at 3.99% APR. Sales rep Travis Moss.',
    history: [
      { date: '2026-01-28', event: 'Contract signed — Dividend loan approved', user: 'Travis Moss' },
      { date: '2026-03-11', event: 'Installation started', user: 'Dispatch' },
    ],
    techSpecs: [
      { label: 'DC System Size', value: '10.56 kW' },
      { label: 'Panel Count', value: '26 panels' },
      { label: 'Panel Model', value: 'REC Alpha Pure (420W)' },
      { label: 'Inverter', value: 'SolarEdge SE10000H HD-Wave' },
      { label: 'Battery Storage', value: 'None' },
      { label: 'Roof Type', value: 'Asphalt shingle, 6/12 pitch' },
      { label: 'Array Orientation', value: 'South, 180° azimuth' },
      { label: 'Est. Annual Output', value: '9,973 kWh' },
      { label: 'Performance Warranty', value: '25 years' },
    ],
  },
  {
    id: 4,
    customer: 'Sallyann Wagner',
    avatar: avatar4,
    address: '2355 OH-83, Beverly OH',
    coords: [39.55, -81.65],
    systemSize: '19.36 kW',
    phase: 'Pending Install',
    phone: '(740) 509-2859',
    email: 'Sallywagner21@gmail.com',
    assignedAgentId: 2,
    contractValue: '$84,737',
    panelCount: 46,
    panelModel: 'REC Alpha Pure (420W)',
    inverterModel: 'SolarEdge SE20000H HD-Wave',
    batteryModel: 'None',
    roofType: 'Asphalt shingle, 5/12 pitch',
    orientation: 'South, 180° azimuth',
    estimatedAnnualOutput: '20,623 kWh',
    warrantyYears: 25,
    installDate: 'TBD',
    customerNotes:
      'Financed via Dividend, 25-year term at 3.99% APR. Trenching 300ft adder ($7,500) and lineside tap were included in adders, but no metal roof adder was applied. Sales rep Travis Moss. Second system (same household) also contracted via EnFin financing.',
    history: [
      { date: '2026-02-03', event: 'Contract signed — Dividend loan approved', user: 'Travis Moss' },
      { date: '2026-02-10', event: 'Second system contracted via EnFin financing', user: 'Travis Moss' },
    ],
    techSpecs: [
      { label: 'DC System Size', value: '19.36 kW' },
      { label: 'Panel Count', value: '46 panels' },
      { label: 'Panel Model', value: 'REC Alpha Pure (420W)' },
      { label: 'Inverter', value: 'SolarEdge SE20000H HD-Wave' },
      { label: 'Battery Storage', value: 'None' },
      { label: 'Roof Type', value: 'Asphalt shingle, 5/12 pitch' },
      { label: 'Array Orientation', value: 'South, 180° azimuth' },
      { label: 'Est. Annual Output', value: '20,623 kWh' },
      { label: 'Performance Warranty', value: '25 years' },
    ],
  },
  {
    id: 5,
    customer: 'Jerry & Vicki Welch',
    avatar: avatar5,
    address: '104 Magnolia Cir, Mount Orab OH',
    coords: [39.03, -83.92],
    systemSize: '18.04 kW',
    phase: 'Permit Review',
    phone: '(513) 289-5816',
    email: 'Ktlbiller@gmail.com',
    assignedAgentId: 1,
    contractValue: '$97,538',
    panelCount: 43,
    panelModel: 'SunPower Maxeon 3 (410W)',
    inverterModel: 'Enphase IQ8+ Microinverter',
    batteryModel: 'None',
    roofType: 'Asphalt shingle, 6/12 pitch',
    orientation: 'South, 180° azimuth',
    estimatedAnnualOutput: '21,678 kWh',
    warrantyYears: 25,
    installDate: 'TBD',
    customerNotes:
      'Referral from Justin Welch. Financed via Sungage, 25-year term at 5.99% APR with 2.9% escalator. Full transfer adder not yet paid — follow up with Midas before scheduling install. Sales rep Ronald Howansky.',
    history: [
      { date: '2026-06-03', event: 'Contract signed — Sungage loan approved', user: 'Ronald Howansky' },
    ],
    techSpecs: [
      { label: 'DC System Size', value: '18.04 kW' },
      { label: 'Panel Count', value: '43 panels' },
      { label: 'Panel Model', value: 'SunPower Maxeon 3 (410W)' },
      { label: 'Inverter', value: 'Enphase IQ8+ Microinverter' },
      { label: 'Battery Storage', value: 'None' },
      { label: 'Roof Type', value: 'Asphalt shingle, 6/12 pitch' },
      { label: 'Array Orientation', value: 'South, 180° azimuth' },
      { label: 'Est. Annual Output', value: '21,678 kWh' },
      { label: 'Performance Warranty', value: '25 years' },
    ],
  },
  {
    id: 6,
    customer: 'Kevin Helvey',
    avatar: avatar6,
    address: '4963 Pinecrest Dr, Morrow OH',
    coords: [39.35, -84.12],
    systemSize: '15.84 kW',
    phase: 'Site Survey',
    phone: '(513) 444-6310',
    email: '',
    assignedAgentId: 2,
    contractValue: '$64,998',
    panelCount: 38,
    panelModel: 'Q CELLS Q.PEAK DUO (400W)',
    inverterModel: 'Enphase IQ8M Microinverter',
    batteryModel: 'None',
    roofType: 'Asphalt shingle, 5/12 pitch',
    orientation: 'South, 180° azimuth',
    estimatedAnnualOutput: '19,939 kWh',
    warrantyYears: 25,
    installDate: 'TBD',
    customerNotes:
      'Self-generated lead (ESD). Financed via Sungage, 25-year term at 8.99% APR. Customer has gone unresponsive since contract signing — needs follow-up before scheduling site survey. Sales rep Donte Salter.',
    history: [
      { date: '2026-06-16', event: 'Contract signed — Sungage loan approved', user: 'Donte Salter' },
    ],
    techSpecs: [
      { label: 'DC System Size', value: '15.84 kW' },
      { label: 'Panel Count', value: '38 panels' },
      { label: 'Panel Model', value: 'Q CELLS Q.PEAK DUO (400W)' },
      { label: 'Inverter', value: 'Enphase IQ8M Microinverter' },
      { label: 'Battery Storage', value: 'None' },
      { label: 'Roof Type', value: 'Asphalt shingle, 5/12 pitch' },
      { label: 'Array Orientation', value: 'South, 180° azimuth' },
      { label: 'Est. Annual Output', value: '19,939 kWh' },
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
  { keywords: ['installation completed', 'installation started'], index: 6 },
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
