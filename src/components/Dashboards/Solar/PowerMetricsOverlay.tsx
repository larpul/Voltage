import type { Installation } from './installationData'

interface Props {
  installation: Installation
}

/** Extract the first numeric value from a string like "8.5 kW" or "12,800 kWh". */
const parseNumber = (s: string) => Number(s.replace(/[^0-9.]/g, '')) || 0

const fmt = (n: number, digits = 0) =>
  n.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })

/**
 * Floating power-production metrics panel overlaid on the 3D house viewer.
 * Every figure is derived from the installation's own design data.
 */
const PowerMetricsOverlay = ({ installation }: Props) => {
  const systemKw = parseNumber(installation.systemSize)
  const annualKwh = parseNumber(installation.estimatedAnnualOutput)
  const dailyKwh = annualKwh / 365
  const monthlyKwh = annualKwh / 12
  // EPA: ~1.56 lbs CO₂ avoided per kWh generated.
  const co2Lbs = annualKwh * 1.56

  const metrics = [
    { label: 'System Size', value: `${fmt(systemKw, 1)} kW`, icon: 'fi-rr-bolt' },
    { label: 'Annual Output', value: `${fmt(annualKwh)} kWh`, icon: 'fi-rr-sun' },
    { label: 'Daily Avg', value: `${fmt(dailyKwh, 1)} kWh`, icon: 'fi-rr-chart-histogram' },
    { label: 'Monthly Avg', value: `${fmt(monthlyKwh)} kWh`, icon: 'fi-rr-calendar' },
    { label: 'CO₂ Offset', value: `${fmt(co2Lbs)} lbs/yr`, icon: 'fi-rr-leaf' },
  ]

  return (
    <div
      className="position-absolute top-0 end-0 m-2 p-2 rounded-3"
      style={{
        background: 'rgba(15, 23, 42, 0.78)',
        backdropFilter: 'blur(8px)',
        minWidth: 150,
        maxWidth: 190,
        pointerEvents: 'none',
      }}
    >
      <div className="d-flex align-items-center gap-1 mb-2 pb-1" style={{ borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
        <i className="fi fi-rr-chart-pie-alt text-warning"></i>
        <span className="text-white fs-12 fw-semibold text-uppercase" style={{ letterSpacing: '0.04em' }}>
          Production
        </span>
      </div>
      {metrics.map((m) => (
        <div key={m.label} className="d-flex align-items-center justify-content-between gap-2 py-1">
          <span className="d-flex align-items-center gap-1 text-white-50 fs-12">
            <i className={`fi ${m.icon}`} style={{ fontSize: 11 }}></i>
            {m.label}
          </span>
          <span className="text-white fs-12 fw-semibold">{m.value}</span>
        </div>
      ))}
    </div>
  )
}

export default PowerMetricsOverlay
