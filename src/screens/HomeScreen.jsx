import { useState, useEffect, useRef } from 'react'
import { TOPICS, TOPIC_ACCENT } from '../constants'
import { useLanguage } from '../contexts/language'
import { t, topicLabel } from '../utils/i18n'

export default function HomeScreen({ onSearch, topic, setTopic, history, onHistoryWord }) {
  const [input, setInput] = useState('')
  const inputRef = useRef(null)
  const lang = useLanguage()
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
      {/* Hero */}
      <div style={{ padding: '56px 24px 36px' }}>
        <img
          src="/logo.png"
          alt="The Y App"
          style={{ width: '40px', height: '40px', objectFit: 'contain', marginBottom: '22px', display: 'block' }}
        />
        <h1 style={{
          fontFamily: "-apple-system, 'Helvetica Neue', sans-serif",
          fontSize: '42px', fontWeight: '800', lineHeight: '1.08',
          letterSpacing: '-1.5px', color: '#1C1A18',
          margin: '0 0 12px',
        }}>
          {t(lang, 'appHero')}
        </h1>
        <p style={{
          fontFamily: '-apple-system, sans-serif',
          fontSize: '16px', color: '#8A8680', margin: 0, lineHeight: '1.5',
        }}>
          {t(lang, 'appTagline')}
        </p>
      </div>

      {/* Search bar */}
      <div style={{ padding: '0 20px 24px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          background: '#FFFFFF', border: '1.5px solid #E8E5DF',
          borderRadius: '18px', padding: '6px 6px 6px 18px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="#C0C0BA" strokeWidth="2.5" strokeLinecap="round">
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
              color: '#1C1A18', fontSize: '16px',
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
              background: input.trim() ? accent : '#EDEAE4',
              color: input.trim() ? '#fff' : '#A0A09A',
              cursor: input.trim() ? 'pointer' : 'default',
              fontFamily: '-apple-system, sans-serif', fontSize: '14px', fontWeight: '600',
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
          color: '#C0C0BA', fontWeight: '600', margin: '0 0 12px',
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
                border: active ? 'none' : '1.5px solid #E8E5DF',
                background: active ? TOPIC_ACCENT[topicKey] : 'transparent',
                color: active ? '#fff' : '#8A8680',
                fontFamily: '-apple-system, sans-serif', fontSize: '13px',
                fontWeight: '600', cursor: 'pointer', transition: 'all 0.18s',
                letterSpacing: '0.2px',
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
            color: '#C0C0BA', fontWeight: '600', margin: '0 0 12px',
            textTransform: 'uppercase', letterSpacing: '1.2px',
          }}>
            {t(lang, 'recent')}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {history.slice(0, 12).map((w, i) => (
              <button key={i} onClick={() => onHistoryWord(w)} style={{
                background: '#FFFFFF', border: '1.5px solid #E8E5DF',
                color: '#3A3835', padding: '8px 16px', borderRadius: '50px',
                cursor: 'pointer', fontFamily: '-apple-system, sans-serif',
                fontSize: '14px', transition: 'border-color 0.15s',
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
