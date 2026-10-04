import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import Flatpickr from 'react-flatpickr'
import Select from 'react-select'
import 'flatpickr/dist/themes/airbnb.css'
import { installations } from './installationData'
import { categoryConfig, type EventCategory, type SiteVisitEvent } from './siteVisitEvents'

interface ScheduleVisitModalProps {
  show: boolean
  handleClose: () => void
  handleSave: (event: SiteVisitEvent) => void
}

const visitTypeOptions = (Object.keys(categoryConfig) as EventCategory[]).map((cat) => ({
  value: cat,
  label: categoryConfig[cat].label,
}))

const customerOptions = installations.map((i) => ({
  value: i.id,
  label: `${i.customer} — ${i.address}`,
  installation: i,
}))

const ScheduleVisitModal: React.FC<ScheduleVisitModalProps> = ({
  show,
  handleClose,
  handleSave,
}) => {
  const [customer, setCustomer] = useState<typeof customerOptions[0] | null>(null)
  const [visitType, setVisitType] = useState<typeof visitTypeOptions[0] | null>(null)
  const [visitDate, setVisitDate] = useState<Date>(new Date())
  const [notes, setNotes] = useState('')
  const [validated, setValidated] = useState(false)

  useEffect(() => {
    if (show) {
      setCustomer(null)
      setVisitType(visitTypeOptions[0])
      setVisitDate(new Date())
      setNotes('')
      setValidated(false)
    }
  }, [show])

  const handleSaveClick = () => {
    if (!customer || !visitType) {
      setValidated(true)
      return
    }

    const dateStr = visitDate.toISOString().split('T')[0]
    const config = categoryConfig[visitType.value as EventCategory]
    const installation = customer.installation

    handleSave({
      id: `sv-new-${Date.now()}`,
      title: `${installation.customer} — ${config.label}`,
      start: dateStr,
      className: config.className,
      description: notes || `Scheduled ${config.label.toLowerCase()} visit`,
      installationId: installation.id,
      phase: installation.phase,
      address: installation.address,
    })
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="fi fi-rr-calendar-plus me-2 text-primary"></i>
          Schedule Site Visit
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Customer</Form.Label>
            <Select
              options={customerOptions}
              value={customer}
              onChange={(val) => setCustomer(val)}
              placeholder="Select a customer..."
              className={validated && !customer ? 'is-invalid' : ''}
            />
            {validated && !customer && (
              <Form.Text className="text-danger">Please select a customer</Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Visit Type</Form.Label>
            <Select
              options={visitTypeOptions}
              value={visitType}
              onChange={(val) => setVisitType(val)}
              placeholder="Select visit type..."
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Flatpickr
              value={visitDate}
              onChange={(dates: Date[]) => dates[0] && setVisitDate(dates[0])}
              options={{ minDate: 'today', dateFormat: 'Y-m-d' }}
              className="form-control"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about this visit..."
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSaveClick}>
          <i className="fi fi-rr-calendar-check me-2"></i>
          Schedule Visit
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ScheduleVisitModal
