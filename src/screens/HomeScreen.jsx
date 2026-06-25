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
      <div style={{ padding: '48px 24px 24px', textAlign: 'center' }}>
        <div style={{
          fontFamily: "-apple-system, 'Helvetica Neue', sans-serif",
          fontSize: '13px', color: '#A0A09A', fontWeight: '600',
          letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px',
        }}>
          Galería de Arte
        </div>
        <div style={{
          fontFamily: "-apple-system, 'Helvetica Neue', sans-serif",
          fontSize: '30px', color: '#1C1A18', fontWeight: '700', letterSpacing: '-0.5px',
        }}>
          Descubre el Arte
        </div>
        <div style={{
          fontFamily: '-apple-system, sans-serif',
          fontSize: '15px', color: '#8A8680', marginTop: '6px',
        }}>
          Busca una obra, artista o movimiento
        </div>
      </div>

      {/* Search bar */}
      <div style={{ padding: '0 20px 20px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          background: '#FFFFFF', border: '1.5px solid #E8E5DF',
          borderRadius: '16px', padding: '4px 4px 4px 16px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="#A0A09A" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submit()}
            placeholder="La Joconda, Picasso, Impresionismo..."
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              color: '#1C1A18', fontSize: '16px',
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
              background: input.trim() ? accent : '#EDEAE4',
              color: input.trim() ? '#fff' : '#A0A09A',
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

      {/* Audience pills */}
      <div style={{ padding: '0 20px 28px' }}>
        <div style={{
          fontFamily: '-apple-system, sans-serif', fontSize: '11px',
          color: '#A0A09A', fontWeight: '600', marginBottom: '10px',
          textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center',
        }}>
          Objetivo
        </div>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          {TOPICS.map(t => {
            const active = topic === t
            return (
              <button key={t} onClick={() => setTopic(t)} style={{
                padding: '8px 16px', borderRadius: '20px',
                border: active ? 'none' : '1.5px solid #E8E5DF',
                background: active ? TOPIC_ACCENT[t] : '#FFFFFF',
                color: active ? '#fff' : '#6B6B6B',
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
            fontFamily: '-apple-system, sans-serif', fontSize: '11px',
            color: '#A0A09A', fontWeight: '600', marginBottom: '12px',
            textTransform: 'uppercase', letterSpacing: '1px',
          }}>
            Recientes
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {history.slice(0, 12).map((w, i) => (
              <button key={i} onClick={() => onHistoryWord(w)} style={{
                background: '#FFFFFF', border: '1.5px solid #E8E5DF',
                color: '#3A3835',
                padding: '7px 14px', borderRadius: '20px', cursor: 'pointer',
                fontFamily: '-apple-system, sans-serif', fontSize: '14px',
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
