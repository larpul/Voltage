import PageDashBreadcrumb from '@/components/Common/PageDashBreadcrumb'
import TitleHelmet from '@/components/Common/TitleHelmet'
import CommonFooter from '@/components/Pages/OtherPages/CommonFooter'
import CommonHeader from '@/components/Pages/OtherPages/CommonHeader'
import { TermsServicesContent } from '@/components/Pages/OtherPages/TermsServices'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Ecommerce = () => {
  return (
    <>
      <PageDashBreadcrumb title="Welcome Page" subName="Introduction" />

      <TitleHelmet title="Introduction" />
      <Card>
        
        <CommonHeader
        
          hintText="Introduction"
          bigTitle="Development Documentation"
          leadDescription="Voltage Design System is a reusable UI component library distributed as an npm package. It is designed to help teams build consistent, scalable, and accessible user interfaces efficiently. Voltage provides standardized components, tokens, and patterns that accelerate development while maintaining design and code quality.

This documentation is intended for developers integrating, contributing to, or maintaining the Voltage Design System."
        />
        <div className="mx-4 mx-md-6 mt-8 mt-md-12 mt-lg-16">
          <Link to="#!">
            <span className="text-muted">Updated:</span> January 7, 2026
          </Link>
        </div>
        <section className="mx-4 mx-md-6 my-8 my-md-12 my-lg-16">
          <TermsServicesContent />
        </section>
        <CommonFooter />
      </Card>
      
    </>
  )
}

export default Ecommerce
