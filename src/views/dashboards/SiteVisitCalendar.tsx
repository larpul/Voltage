import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Card, Stack, Badge } from 'react-bootstrap'
import PageDashBreadcrumb from '@/components/Common/PageDashBreadcrumb'
import TitleHelmet from '@/components/Common/TitleHelmet'
import { getSiteVisitEvents, categoryConfig, type EventCategory } from '@/components/Dashboards/Solar/siteVisitEvents'

const SiteVisitCalendar = () => {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<EventCategory | 'all'>('all')

  const allEvents = useMemo(() => getSiteVisitEvents(), [])

  const visibleEvents = useMemo(() => {
    if (filter === 'all') return allEvents
    const targetClass = categoryConfig[filter].className
    return allEvents.filter((e) => e.className === targetClass)
  }, [allEvents, filter])

  const handleEventClick = (info: any) => {
    const installationId = info.event.extendedProps.installationId
    if (installationId) {
      navigate(`/installations/${installationId}`)
    }
  }

  const legendCategories = Object.keys(categoryConfig) as EventCategory[]

  return (
    <>
      <TitleHelmet title="Site Visit Calendar" />
      <PageDashBreadcrumb title="Site Visit Calendar" subName="Dashboards" />

      <Card>
        <Card.Header
          className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2"
          style={{ minHeight: '5rem' }}
        >
          <h4 className="fw-bold mb-0">
            <i className="fi fi-rr-calendar me-2 text-primary"></i>
            Solar Site Visits
          </h4>
          <Stack direction="horizontal" gap={2} className="flex-wrap">
            <Badge
              bg={filter === 'all' ? 'primary' : 'light'}
              text={filter === 'all' ? 'white' : 'dark'}
              className="cursor-pointer"
              style={{ cursor: 'pointer' }}
              onClick={() => setFilter('all')}
            >
              All ({allEvents.length})
            </Badge>
            {legendCategories.map((cat) => {
              const config = categoryConfig[cat]
              const count = allEvents.filter((e) => e.className === config.className).length
              return (
                <Badge
                  key={cat}
                  bg={filter === cat ? 'primary' : 'light'}
                  text={filter === cat ? 'white' : 'dark'}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setFilter(cat)}
                >
                  {config.label} ({count})
                </Badge>
              )
            })}
          </Stack>
        </Card.Header>

        <PerfectScrollbar className="apps-scrollable-content">
          <FullCalendar
            events={visibleEvents.map((e) => ({
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
            aspectRatio={2.2}
            themeSystem="bootstrap5"
            initialView="dayGridMonth"
            eventClick={handleEventClick}
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next title',
              right: 'today dayGridMonth,timeGridWeek,listWeek',
            }}
            views={{
              dayGridMonth: {
                dayMaxEventRows: 4,
              },
            }}
            eventTimeFormat={{
              hour: 'numeric',
              minute: '2-digit',
              meridiem: 'short',
            }}
          />
        </PerfectScrollbar>
      </Card>
    </>
  )
}

export default SiteVisitCalendar
