import { Col, Row } from 'react-bootstrap'

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#']

interface DialerKeypadProps {
  onKey: (key: string) => void
  onBackspace: () => void
  disabled?: boolean
}

const DialerKeypad = ({ onKey, onBackspace, disabled }: DialerKeypadProps) => (
  <Row className="g-2">
    {KEYS.map((key) => (
      <Col key={key} xs={4}>
        <button
          type="button"
          className="btn btn-light w-100 fw-semibold fs-5 py-2"
          onClick={() => onKey(key)}
          disabled={disabled}
          aria-label={`Dial ${key}`}
        >
          {key}
        </button>
      </Col>
    ))}
    <Col xs={12}>
      <button
        type="button"
        className="btn btn-outline-secondary btn-sm w-100"
        onClick={onBackspace}
        disabled={disabled}
      >
        <i className="fi fi-rr-backspace me-1"></i>
        Backspace
      </button>
    </Col>
  </Row>
)

export default DialerKeypad
