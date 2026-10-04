import PageDashBreadcrumb from '@/components/Common/PageDashBreadcrumb'
import {
  SolarSalesCard,
  InstallationsCard,
  AppointmentsCard,
  SolarSalesChart,
  SolarAppointmentsCard,
  WeeklyAppointmentsCard,
  TopSolarProductsCard,
  ProjectPhasesCard,
  CincinnatiMapCard,
} from '@/components/Dashboards/Solar'
import { SalesLocationCard } from '@/components/Dashboards/Ecommerce'
import { Col, Row } from 'react-bootstrap'

const Solar = () => {
  return (
    <>
      <PageDashBreadcrumb title="Solar Dashboard" subName="Dashboards" />
      <Row className="g-3 g-md-4">
        <Col xl={4}>
          <SolarSalesCard />
        </Col>
        <Col xl={4} lg={6}>
          <InstallationsCard />
        </Col>
        <Col xl={4} lg={6}>
          <AppointmentsCard />
        </Col>
        <Col xl={8}>
          <SolarSalesChart />
        </Col>
        <Col xl={4}>
          <WeeklyAppointmentsCard />
        </Col>
        <Col xl={6}>
          <SalesLocationCard />
        </Col>
        <Col xl={6}>
          <CincinnatiMapCard />
        </Col>
        <Col xl={4}>
          <TopSolarProductsCard />
        </Col>
        <Col xl={8}>
          <ProjectPhasesCard />
        </Col>
        <Col xl={12}>
          <SolarAppointmentsCard />
        </Col>
      </Row>
    </>
  )
}

export default Solar
