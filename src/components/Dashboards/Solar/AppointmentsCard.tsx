import { useThemeContext } from '@/common/context'
import colors from '@/constants/colors'
import ReactApexChart from 'react-apexcharts'
import { Card, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const AppointmentsCard = () => {
  const { settings } = useThemeContext()
  const selectedColor = settings.color as keyof typeof colors
  const themeColor = colors[selectedColor] || selectedColor

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      width: '100%',
      type: 'bar',
      stacked: false,
      foreColor: '#7d8aa2',
      fontFamily: 'Inter, sans-serif',
      toolbar: { show: false },
    },
    series: [{ name: 'Appointments', data: [5, 12, 8, 15, 10, 18, 14, 20, 16, 22, 18, 25] }],
    plotOptions: { bar: { horizontal: false, borderRadius: 2, columnWidth: '25%' } },
    dataLabels: { enabled: false },
    legend: { show: false },
    colors: [themeColor],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { show: false },
    },
    yaxis: { labels: { show: false } },
    grid: { show: false, padding: { top: -32, left: -6, right: 6, bottom: -12 } },
    tooltip: {
      theme: 'dark',
      y: { formatter: function (e: any) { return +e + ' appts' } },
    },
  }

  return (
    <Card>
      <Card.Body>
        <div>
          <Stack direction="horizontal" gap={2} className="align-items-start">
            <div className="me-auto">
              <p className="fs-13 text-muted mb-1">Appointments</p>
              <h4 className="fs-18 fw-bold">48</h4>
            </div>
            <Link to="" className="badge fs-12 fw-sembold bg-danger-subtle text-danger">
              (-) 3.2%
            </Link>
          </Stack>
          <ReactApexChart
            options={chartOptions}
            series={chartOptions.series}
            type="bar"
            height={133}
            width="100%"
          />
        </div>
      </Card.Body>
    </Card>
  )
}

export default AppointmentsCard
