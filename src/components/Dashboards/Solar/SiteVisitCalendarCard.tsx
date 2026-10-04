import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Card, Stack } from 'react-bootstrap'
import { getSiteVisitEvents, categoryConfig, type EventCategory } from './siteVisitEvents'

const SiteVisitCalendarCard = () => {
  const navigate = useNavigate()
  const events = useMemo(() => getSiteVisitEvents(), [])

  const handleEventClick = (info: any) => {
    const installationId = info.event.extendedProps.installationId
    if (installationId) {
      navigate(`/installations/${installationId}`)
    }
  }

  const legendCategories = Object.keys(categoryConfig) as EventCategory[]

  return (
    <Card>
      <Card.Header className="py-3 d-flex justify-content-between align-items-center">
        <Card.Title className="mb-0">
          <i className="fi fi-rr-calendar me-2 text-primary"></i>
          Site Visit Calendar
        </Card.Title>
        <Stack
          role="button"
          className="text-primary fs-12 fw-medium cursor-pointer"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/dashboards/site-visits')}
        >
          <i className="fi fi-rr-arrow-up-right-from-square me-1"></i>
          Full Calendar
        </Stack>
      </Card.Header>
      <Card.Body className="pt-2">
        <Stack direction="horizontal" gap={2} className="flex-wrap mb-3">
          {legendCategories.map((cat) => {
            const config = categoryConfig[cat]
            return (
              <span key={cat} className="d-inline-flex align-items-center fs-12 text-muted">
                <span
                  className={`badge ${config.className} me-1`}
                  style={{ width: '0.6rem', height: '0.6rem', padding: 0 }}
                ></span>
                {config.label}
              </span>
            )
          })}
        </Stack>
        <FullCalendar
          events={events.map((e) => ({
            id: e.id,
            title: e.title,
            start: e.start,
            className: e.className,
            extendedProps: {
              installationId: e.installationId,
              description: e.description,
              address: e.address,
            },
          }))}
          weekends={true}
          aspectRatio={1.8}
          themeSystem="bootstrap5"
          initialView="dayGridMonth"
          eventClick={handleEventClick}
          plugins={[dayGridPlugin]}
          headerToolbar={{
            left: 'prev,next title',
            right: 'today',
          }}
          views={{
            dayGridMonth: {
              dayMaxEventRows: 3,
            },
          }}
          height="auto"
        />
      </Card.Body>
    </Card>
  )
}

export default SiteVisitCalendarCard
