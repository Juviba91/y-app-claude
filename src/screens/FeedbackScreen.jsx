import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { supabase } from '../utils/supabaseClient'
import { SESSION_ID } from '../utils/analyticsDB'
import { useLanguage } from '../contexts/language'
import { t } from '../utils/i18n'

const EJS_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE
const EJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE
const EJS_KEY      = import.meta.env.VITE_EMAILJS_KEY

async function sendFeedback(message, artwork, language) {
  // Always save to Supabase
  if (supabase) {
    await supabase.from('feedback').insert({ message, session_id: SESSION_ID, artwork, language })
  }
  // Send email if EmailJS is configured
  if (EJS_SERVICE && EJS_TEMPLATE && EJS_KEY) {
    await emailjs.send(
      EJS_SERVICE, EJS_TEMPLATE,
      { message, artwork: artwork || '—', language },
      { publicKey: EJS_KEY }
    )
  }
}

export default function FeedbackScreen({ currentArtwork }) {
  const [message, setMessage] = useState('')
  const [status, setStatus]   = useState('idle') // idle | sending | sent | error
  const lang = useLanguage()

  const handleSend = async () => {
    if (!message.trim()) return
    setStatus('sending')
    try {
      await sendFeedback(message.trim(), currentArtwork || null, lang)
      setStatus('sent')
      setMessage('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div style={{ flex: 1, padding: '32px 24px' }}>
      <div style={{
        fontFamily: '-apple-system, sans-serif', fontSize: '11px',
        fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px',
        color: '#999', marginBottom: '12px',
      }}>
        {t(lang, 'tabFeedback')}
      </div>

      <h1 style={{
        fontFamily: "-apple-system, 'Helvetica Neue', sans-serif",
        fontSize: '32px', fontWeight: '800', color: '#111111',
        letterSpacing: '-0.8px', lineHeight: '1.1', marginBottom: '8px',
      }}>
        {t(lang, 'feedbackTitle')}
      </h1>

      <p style={{
        fontFamily: '-apple-system, sans-serif', fontSize: '15px',
        color: '#888', lineHeight: '1.5', marginBottom: '28px',
      }}>
        {t(lang, 'feedbackSubtitle')}
      </p>

      {currentArtwork && (
        <div style={{
          background: '#F7F7F7', borderRadius: '12px',
          padding: '10px 14px', marginBottom: '16px',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          <span style={{ fontSize: '13px', color: '#999' }}>🖼</span>
          <span style={{ fontFamily: '-apple-system, sans-serif', fontSize: '13px', color: '#666' }}>
            {currentArtwork}
          </span>
        </div>
      )}

      <textarea
        value={message}
        onChange={e => { setMessage(e.target.value); if (status !== 'idle') setStatus('idle') }}
        placeholder={t(lang, 'feedbackPlaceholder')}
        rows={5}
        style={{
          width: '100%', border: '1.5px solid #E8E8E8', borderRadius: '16px',
          padding: '16px', fontSize: '15px', fontFamily: '-apple-system, sans-serif',
          color: '#111', lineHeight: '1.5', resize: 'none', outline: 'none',
          background: '#FAFAFA', boxSizing: 'border-box',
          transition: 'border-color .15s',
        }}
        onFocus={e => e.target.style.borderColor = '#111'}
        onBlur={e  => e.target.style.borderColor = '#E8E8E8'}
      />

      <button
        onClick={handleSend}
        disabled={!message.trim() || status === 'sending' || status === 'sent'}
        style={{
          marginTop: '14px', width: '100%',
          background: status === 'sent' ? '#4CAF50' : '#111111',
          color: '#fff', border: 'none', borderRadius: '14px',
          padding: '16px', fontSize: '16px', fontWeight: '700',
          fontFamily: '-apple-system, sans-serif',
          cursor: message.trim() && status === 'idle' ? 'pointer' : 'default',
          opacity: !message.trim() || status === 'sending' ? 0.4 : 1,
          transition: 'opacity .15s, background .2s',
        }}
      >
        {status === 'sending' ? t(lang, 'feedbackSending')
         : status === 'sent'    ? t(lang, 'feedbackSent')
         : t(lang, 'feedbackSend')}
      </button>

      {status === 'error' && (
        <p style={{
          marginTop: '10px', textAlign: 'center',
          fontFamily: '-apple-system, sans-serif', fontSize: '13px', color: '#888',
        }}>
          {t(lang, 'feedbackError')}
        </p>
      )}
    </div>
  )
}
