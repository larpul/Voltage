import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Stack, Dropdown, DropdownDivider } from 'react-bootstrap'
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { useThemeContext } from '@/common/context'
import colors from '@/constants/colors'

const WeeklyAppointmentsCard: React.FC = () => {
  const { settings } = useThemeContext()
  const selectedColor = settings.color as keyof typeof colors
  const themeColor = colors[selectedColor] || selectedColor

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      width: '100%',
      stacked: true,
      foreColor: '#7d8aa2',
      fontFamily: 'Inter, sans-serif',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 3,
        columnWidth: '15%',
        horizontal: false,
      },
    },
    colors: [themeColor, '#E4E8EF'],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    grid: {
      show: false,
      padding: {
        top: -42,
        left: -12,
        right: 6,
        bottom: -16,
      },
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: function (e) {
          return +e + ' appts'
        },
      },
    },
  }

  const series: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined = [
    {
      name: 'Completed',
      data: [12, 15, 10, 18, 14, 16, 20],
    },
    {
      name: 'Pending',
      data: [-8, -6, -10, -5, -8, -7, -4],
    },
  ]

  return (
    <>
      <Card>
        <Card.Header className="py-3 pe-3 d-flex justify-content-between align-items-center">
          <Card.Title>Weekly Appointments</Card.Title>
          <Dropdown className="ms-auto" drop="down">
            <Dropdown.Toggle variant="light" className="p-0 btn-icon btn-md arrow-none">
              <i className="fi fi-bs-menu-dots-vertical"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" style={{ marginTop: '0.875rem' }}>
              <Dropdown.Item>
                <i className="fi fi-rr-share"></i>
                <span className="ms-3">Share</span>
              </Dropdown.Item>
              <Dropdown.Item>
                <i className="fi fi-rr-refresh"></i>
                <span className="ms-3">Refresh</span>
              </Dropdown.Item>
              <DropdownDivider />
              <Dropdown.Item>
                <i className="fi fi-rr-stats"></i>
                <span className="ms-3">Full Reports</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Header>
        <Card.Body>
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={183}
            id="weeklyAppointmentsChart"
          />
          <hr style={{ borderTopStyle: 'dashed' }} />
          <Stack direction="horizontal">
            <Stack direction="horizontal">
              <div className="avatar avatar-lg flex-shrink-0 rounded bg-primary-subtle text-primary">
                <i className="fi fi-rr-calendar-check"></i>
              </div>
              <div className="flex-grow-1 ms-3">
                <Link to="" className="mb-1 d-block">
                  Site Surveys
                </Link>
                <p className="fs-12 text-muted mb-0">42 this week</p>
              </div>
            </Stack>
            <div className="ms-auto text-end">
              <Link to="" className="badge bg-primary-subtle text-primary">
                42
              </Link>
            </div>
          </Stack>
          <hr style={{ borderTopStyle: 'dashed' }} />
          <Stack direction="horizontal">
            <Stack direction="horizontal">
              <div className="avatar avatar-lg flex-shrink-0 rounded bg-success-subtle text-success">
                <i className="fi fi-rr-sun"></i>
              </div>
              <div className="flex-grow-1 ms-3">
                <Link to="" className="mb-1 d-block">
                  Installations
                </Link>
                <p className="fs-12 text-muted mb-0">Completed jobs</p>
              </div>
            </Stack>
            <div className="ms-auto text-end">
              <Link to="" className="badge bg-success-subtle text-success">
                28
              </Link>
            </div>
          </Stack>
          <hr style={{ borderTopStyle: 'dashed' }} />
          <Stack direction="horizontal">
            <Stack direction="horizontal">
              <div className="avatar avatar-lg flex-shrink-0 rounded bg-danger-subtle text-danger">
                <i className="fi fi-rr-phone-call"></i>
              </div>
              <div className="flex-grow-1 ms-3">
                <Link to="" className="mb-1 d-block">
                  Consultations
                </Link>
                <p className="fs-12 text-muted mb-0">New inquiries</p>
              </div>
            </Stack>
            <div className="ms-auto text-end">
              <Link to="" className="badge bg-danger-subtle text-danger">
                16
              </Link>
            </div>
          </Stack>
        </Card.Body>
      </Card>
    </>
  )
}

export default WeeklyAppointmentsCard
