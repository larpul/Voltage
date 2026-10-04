import { useState, useRef, useEffect } from 'react'
import { SalesAgent } from './salesAgentsData'

interface ChatMessage {
  id: number
  sender: 'user' | 'agent'
  text: string
  time: string
}

interface AgentChatPanelProps {
  agent: SalesAgent
}

const AgentChatPanel = ({ agent }: AgentChatPanelProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: 'agent',
      text: `Hi! This is ${agent.name}. How can I help you today?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ])
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const sendMessage = () => {
    if (!input.trim()) return
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const userMsg: ChatMessage = { id: Date.now(), sender: 'user', text: input.trim(), time: now }
    setMessages((prev) => [...prev, userMsg])
    setInput('')

    // Simulated agent reply
    setTimeout(() => {
      const replies = [
        'Got it, I\'ll look into that right away.',
        'Sure, I can help with that. Let me check the installation details.',
        'Thanks for reaching out! I\'ll update you shortly.',
        'I\'m currently on a site visit but will get back to you as soon as I can.',
      ]
      const reply: ChatMessage = {
        id: Date.now() + 1,
        sender: 'agent',
        text: replies[Math.floor(Math.random() * replies.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, reply])
    }, 1200)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="d-flex flex-column" style={{ height: 320 }}>
      {/* Chat header */}
      <div className="d-flex align-items-center gap-2 pb-2 mb-2 border-bottom">
        <div className="position-relative">
          <img src={agent.avatar} alt={agent.name} className="rounded-circle object-fit-cover" width={32} height={32} />
          <span
            className="position-absolute rounded-circle border border-2 border-white"
            style={{ width: 9, height: 9, background: '#25b865', bottom: 0, right: 0 }}
          />
        </div>
        <div>
          <div className="fs-13 fw-semibold text-dark">{agent.name}</div>
          <div className="fs-11 text-success">Online</div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-grow-1 overflow-auto d-flex flex-column gap-2 px-1" style={{ minHeight: 0 }}>
        {messages.map((msg) => (
          <div key={msg.id} className={`d-flex ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
            <div
              className={`rounded-3 px-3 py-2 fs-13 ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-light text-dark'}`}
              style={{ maxWidth: '75%' }}
            >
              <div>{msg.text}</div>
              <div className={`fs-11 mt-1 ${msg.sender === 'user' ? 'text-white-50' : 'text-muted'}`}>{msg.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="d-flex gap-2 mt-2 pt-2 border-top">
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="btn btn-primary btn-sm px-3" onClick={sendMessage} disabled={!input.trim()}>
          <i className="fi fi-rr-paper-plane"></i>
        </button>
      </div>
    </div>
  )
}

export default AgentChatPanel
