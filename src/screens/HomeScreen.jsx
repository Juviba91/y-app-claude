import { useState, useEffect, useRef } from 'react'
import { TOPICS, TOPIC_ACCENT } from '../constants'

export default function HomeScreen({ onSearch, topic, setTopic, history, onHistoryWord }) {
  const [input, setInput] = useState('')
  const inputRef = useRef(null)
  const accent = TOPIC_ACCENT[topic]

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100)
  }, [])

  const submit = () => {
    const w = input.trim()
    if (w) { onSearch(w); setInput('') }
  }

  return (
    <div style={{ flex: 1 }}>
      {/* Header */}
      <div style={{ padding: '40px 24px 28px', textAlign: 'center' }}>
        <div style={{
          fontFamily: "-apple-system, 'Helvetica Neue', sans-serif",
          fontSize: '28px', color: '#fff', fontWeight: '700', letterSpacing: '-0.5px',
        }}>
          The Y App
        </div>
      </div>

      {/* Search bar */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          background: '#2C2C2E', borderRadius: '16px', padding: '4px 4px 4px 16px',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="#888" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submit()}
            placeholder="Search any word or concept..."
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              color: '#fff', fontSize: '17px',
              fontFamily: "-apple-system, 'Helvetica Neue', sans-serif",
              padding: '12px 0',
            }}
          />
          <button
            onClick={submit}
            disabled={!input.trim()}
            style={{
              width: '40px', height: '40px', borderRadius: '12px', border: 'none',
              flexShrink: 0,
              background: input.trim() ? accent : '#3A3A3C',
              color: '#fff',
              cursor: input.trim() ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.18s',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12,5 19,12 12,19"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Topic pills */}
      <div style={{ padding: '0 20px 28px' }}>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          {TOPICS.map(t => {
            const active = topic === t
            return (
              <button key={t} onClick={() => setTopic(t)} style={{
                padding: '8px 18px', borderRadius: '20px', border: 'none',
                background: active ? TOPIC_ACCENT[t] : '#2C2C2E',
                color: active ? '#fff' : '#888',
                fontFamily: '-apple-system, sans-serif', fontSize: '13px',
                fontWeight: '600', cursor: 'pointer', transition: 'all 0.18s',
              }}>
                {t}
              </button>
            )
          })}
        </div>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div style={{ padding: '0 20px' }}>
          <div style={{
            fontFamily: '-apple-system, sans-serif', fontSize: '13px',
            color: '#555', fontWeight: '600', marginBottom: '12px',
            textTransform: 'uppercase', letterSpacing: '1px',
          }}>
            Recent
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {history.slice(0, 12).map((w, i) => (
              <button key={i} onClick={() => onHistoryWord(w)} style={{
                background: '#2C2C2E', border: 'none', color: '#CCC',
                padding: '8px 16px', borderRadius: '20px', cursor: 'pointer',
                fontFamily: '-apple-system, sans-serif', fontSize: '15px',
              }}>
                {w}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
