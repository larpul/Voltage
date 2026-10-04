import { useThemeContext } from '@/common/context'
import colors from '@/constants/colors'
import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { Card } from 'react-bootstrap'
import Select from 'react-select'

const SolarSalesChart: React.FC = () => {
  const { settings } = useThemeContext()
  const selectedColor = settings.color as keyof typeof colors
  const themeColor = colors[selectedColor] || selectedColor
  const [selectedOption, setSelectedOption] = useState<{ label: string; value: string }>({
    label: 'Monthly',
    value: 'monthly',
  })
  const options = [
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'Yearly', value: 'yearly' },
  ]

  const getChartData = () => {
    switch (selectedOption.value) {
      case 'monthly':
        return [
          { name: 'Quotes', data: [20, 45, 30, 55, 40, 60, 45, 70, 50, 75, 60, 85], type: 'area' as const },
          { name: 'Closed Sales', data: [12, 28, 18, 35, 25, 42, 30, 48, 35, 55, 40, 62], type: 'area' as const },
        ]
      case 'weekly':
        return [
          { name: 'Quotes', data: [8, 12, 6, 15, 10, 18, 12, 20, 14, 22, 16, 25], type: 'area' as const },
          { name: 'Closed Sales', data: [4, 8, 3, 9, 6, 12, 7, 14, 8, 16, 10, 18], type: 'area' as const },
        ]
      case 'daily':
        return [
          { name: 'Quotes', data: [2, 4, 3, 6, 5, 8, 4, 9, 6, 10, 7, 12], type: 'area' as const },
          { name: 'Closed Sales', data: [1, 2, 1, 4, 3, 5, 2, 6, 4, 7, 5, 8], type: 'area' as const },
        ]
      case 'yearly':
        return [
          { name: 'Quotes', data: [220, 245, 210, 275, 235, 280, 240, 285, 245, 290, 255, 305], type: 'area' as const },
          { name: 'Closed Sales', data: [140, 165, 130, 195, 155, 200, 160, 205, 165, 215, 180, 240], type: 'area' as const },
        ]
      default:
        return []
    }
  }

  const apexOptions: ApexCharts.ApexOptions = {
    chart: {
      stacked: false,
      foreColor: '#7d8aa2',
      fontFamily: 'Inter, sans-serif',
      toolbar: { show: false },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: { formatter: function (e) { return +e + '' } },
    },
    stroke: { width: 1, lineCap: 'round', curve: 'smooth', dashArray: [0, 3] },
    grid: { padding: { left: 0, right: 0 }, strokeDashArray: 4, borderColor: 'rgba(170, 180, 195, 0.25)' },
    legend: { show: false },
    colors: [themeColor, '#e49e3d'],
    dataLabels: { enabled: false },
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.3, stops: [0, 90, 100] },
    },
    tooltip: { theme: 'dark' },
  }

  return (
    <Card>
      <Card.Header className="d-flex align-items-center py-3">
        <Card.Title>Solar Sales Report</Card.Title>
        <div className="ms-auto" style={{ width: '160px' }}>
          <Select
            value={selectedOption}
            onChange={(opt) => setSelectedOption(opt as any)}
            options={options}
            isClearable={false}
            classNamePrefix="select"
          />
        </div>
      </Card.Header>
      <Card.Body>
        <ReactApexChart
          options={apexOptions}
          series={[...getChartData()]}
          type="area"
          height={302}
        />
      </Card.Body>
    </Card>
  )
}

export default SolarSalesChart
