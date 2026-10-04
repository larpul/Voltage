import { useThemeContext } from '@/common/context'
import colors from '@/constants/colors'
import ReactApexChart from 'react-apexcharts'
import { Card, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const InstallationsCard = () => {
  const { settings } = useThemeContext()
  const selectedColor = settings.color as keyof typeof colors
  const themeColor = colors[selectedColor] || selectedColor

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      width: '100%',
      type: 'area',
      stacked: false,
      foreColor: '#7d8aa2',
      fontFamily: 'Inter, sans-serif',
      toolbar: { show: false },
    },
    stroke: { curve: 'straight', show: true, width: 2 },
    colors: [themeColor],
    series: [
      { name: 'Installations', data: [8, 14, 10, 18, 22, 16, 24, 20, 28, 26, 32, 36] },
    ],
    dataLabels: { enabled: false },
    legend: { show: false },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { show: false },
    },
    yaxis: { labels: { show: false } },
    grid: { show: false, padding: { top: -32, left: -6, right: 6, bottom: -12 } },
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.2, stops: [15, 120, 100] },
    },
    tooltip: {
      theme: 'dark',
      y: { formatter: function (e: any) { return +e + ' installs' } },
    },
    markers: {
      size: 3,
      strokeColors: 'transparent',
      strokeWidth: 3,
      discrete: [
        { size: 5, shape: 'circle', seriesIndex: 0, dataPointIndex: 11, fillColor: '#e49e3d', strokeColor: '#ffd396' },
      ],
      hover: { size: 5.5 },
    },
  }

  return (
    <Card>
      <Card.Body>
        <Stack direction="horizontal" gap={2} className="align-items-start">
          <div className="me-auto">
            <p className="fs-13 text-muted mb-1">Installations</p>
            <h4 className="fs-18 fw-bold">236</h4>
          </div>
          <Link to="" className="badge fs-12 fw-sembold bg-success-subtle text-success">
            (+) 12.4%
          </Link>
        </Stack>
        <ReactApexChart
          options={chartOptions}
          series={chartOptions.series}
          type="area"
          height={133}
          width="100%"
        />
      </Card.Body>
    </Card>
  )
}

export default InstallationsCard
