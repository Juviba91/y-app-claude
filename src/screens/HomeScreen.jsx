import { useState, useEffect, useRef } from 'react'
import { TOPICS } from '../constants'
import { useLanguage } from '../contexts/language'
import { t, topicLabel } from '../utils/i18n'

export default function HomeScreen({ onSearch, topic, setTopic, history, onHistoryWord }) {
  const [input, setInput] = useState('')
  const inputRef = useRef(null)
  const lang = useLanguage()

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100)
  }, [])

  const submit = () => {
    const w = input.trim()
    if (w) { onSearch(w); setInput('') }
  }

  return (
    <div style={{ flex: 1 }}>
      {/* Hero */}
      <div style={{ padding: '56px 24px 36px' }}>
        <img
          src="/logo.png"
          alt="The Y App"
          style={{ width: '88px', height: '88px', objectFit: 'contain', marginBottom: '24px', display: 'block' }}
        />
        <h1 style={{
          fontFamily: "-apple-system, 'Helvetica Neue', sans-serif",
          fontSize: '42px', fontWeight: '800', lineHeight: '1.08',
          letterSpacing: '-1.5px', color: '#111111',
          margin: '0 0 12px',
        }}>
          {t(lang, 'appHero')}
        </h1>
        <p style={{
          fontFamily: '-apple-system, sans-serif',
          fontSize: '16px', color: '#888888', margin: 0, lineHeight: '1.5',
        }}>
          {t(lang, 'appTagline')}
        </p>
      </div>

      {/* Search bar */}
      <div style={{ padding: '0 20px 24px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          background: '#FFFFFF', border: '1.5px solid #EBEBEB',
          borderRadius: '18px', padding: '6px 6px 6px 18px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="#BBBBBB" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submit()}
            placeholder={t(lang, 'searchPlaceholder')}
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              color: '#111111', fontSize: '16px',
              fontFamily: "-apple-system, 'Helvetica Neue', sans-serif",
              padding: '13px 0',
            }}
          />
          <button
            onClick={submit}
            disabled={!input.trim()}
            style={{
              height: '44px', padding: '0 18px', borderRadius: '13px', border: 'none',
              flexShrink: 0,
              background: input.trim() ? '#111111' : '#F0F0F0',
              color: input.trim() ? '#fff' : '#BBBBBB',
              cursor: input.trim() ? 'pointer' : 'default',
              fontFamily: '-apple-system, sans-serif', fontSize: '16px', fontWeight: '500',
              transition: 'all 0.18s',
            }}
          >
            →
          </button>
        </div>
      </div>

      {/* Audience pills */}
      <div style={{ padding: '0 20px 32px' }}>
        <p style={{
          fontFamily: '-apple-system, sans-serif', fontSize: '11px',
          color: '#BBBBBB', fontWeight: '600', margin: '0 0 12px',
          textTransform: 'uppercase', letterSpacing: '1.2px', textAlign: 'center',
        }}>
          {t(lang, 'objective')}
        </p>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          {TOPICS.map(topicKey => {
            const active = topic === topicKey
            return (
              <button key={topicKey} onClick={() => setTopic(topicKey)} style={{
                padding: '10px 18px', borderRadius: '50px',
                border: active ? 'none' : '1.5px solid #EBEBEB',
                background: active ? '#111111' : 'transparent',
                color: active ? '#fff' : '#888888',
                fontFamily: '-apple-system, sans-serif', fontSize: '13px',
                fontWeight: '600', cursor: 'pointer', transition: 'all 0.18s',
              }}>
                {topicLabel(lang, topicKey)}
              </button>
            )
          })}
        </div>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div style={{ padding: '0 20px' }}>
          <p style={{
            fontFamily: '-apple-system, sans-serif', fontSize: '11px',
            color: '#BBBBBB', fontWeight: '600', margin: '0 0 12px',
            textTransform: 'uppercase', letterSpacing: '1.2px',
          }}>
            {t(lang, 'recent')}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {history.slice(0, 12).map((w, i) => (
              <button key={i} onClick={() => onHistoryWord(w)} style={{
                background: '#FFFFFF', border: '1.5px solid #EBEBEB',
                color: '#333333', padding: '8px 16px', borderRadius: '50px',
                cursor: 'pointer', fontFamily: '-apple-system, sans-serif', fontSize: '14px',
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
