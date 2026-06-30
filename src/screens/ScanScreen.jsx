import { useState, useEffect, useRef } from 'react'
import jsQR from 'jsqr'
import { useLanguage } from '../contexts/language'
import { t } from '../utils/i18n'

export default function ScanScreen({ onScan }) {
  const videoRef  = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)
  const intervalRef = useRef(null)
  const [status, setStatus] = useState('idle')
  const [manualInput, setManualInput] = useState('')
  const lastDetected = useRef(null)
  const lang = useLanguage()

  const stopScan = () => {
    clearInterval(intervalRef.current)
    streamRef.current?.getTracks().forEach(tr => tr.stop())
    streamRef.current = null
    setStatus('idle')
  }

  const handleDetected = (raw) => {
    const value = raw.trim()
    if (!value || value === lastDetected.current) return
    lastDetected.current = value
    stopScan()
    // Support both plain text and deep-link URLs (?obra=...)
    try {
      const url = new URL(value)
      const obra = url.searchParams.get('obra')
      if (obra) { onScan(obra); return }
    } catch (_) {}
    onScan(value)
  }

  const startScan = async () => {
    setStatus('scanning')
    lastDetected.current = null
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 } },
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
      intervalRef.current = setInterval(() => {
        const video  = videoRef.current
        const canvas = canvasRef.current
        if (!video || video.readyState < 2 || !canvas) return
        const w = video.videoWidth
        const h = video.videoHeight
        if (!w || !h) return
        canvas.width  = w
        canvas.height = h
        const ctx = canvas.getContext('2d', { willReadFrequently: true })
        ctx.drawImage(video, 0, 0, w, h)
        const imageData = ctx.getImageData(0, 0, w, h)
        const code = jsQR(imageData.data, w, h)
        if (code?.data) handleDetected(code.data)
      }, 300)
    } catch (_) {
      setStatus('error')
    }
  }

  useEffect(() => () => stopScan(), [])

  const submitManual = () => {
    const v = manualInput.trim()
    if (v) { onScan(v); setManualInput('') }
  }

  return (
    <div style={{ flex: 1, padding: '0 20px' }}>
      {/* Hidden canvas for frame processing */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* Header */}
      <div style={{ padding: '48px 0 28px', textAlign: 'center' }}>
        <div style={{
          fontSize: '28px', color: '#111111', fontWeight: '700',
          fontFamily: "-apple-system, 'Helvetica Neue', sans-serif",
        }}>
          {t(lang, 'scanTitle')}
        </div>
        <div style={{
          fontSize: '14px', color: '#888888', marginTop: '6px',
          fontFamily: '-apple-system, sans-serif',
        }}>
          {t(lang, 'scanSubtitle')}
        </div>
      </div>

      {/* Camera viewfinder */}
      <div style={{
        position: 'relative', borderRadius: '24px', overflow: 'hidden',
        background: '#111111', aspectRatio: '1',
        border: '1.5px solid #EBEBEB', boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      }}>
        <video ref={videoRef} autoPlay playsInline muted style={{
          width: '100%', height: '100%', objectFit: 'cover',
          display: status === 'scanning' ? 'block' : 'none',
        }} />

        {status !== 'scanning' && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex',
            flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px',
          }}>
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <path d="M8 20V8h12"  stroke="#555" strokeWidth="3" strokeLinecap="round"/>
              <path d="M72 20V8H60" stroke="#555" strokeWidth="3" strokeLinecap="round"/>
              <path d="M8 60v12h12"  stroke="#555" strokeWidth="3" strokeLinecap="round"/>
              <path d="M72 60v12H60" stroke="#555" strokeWidth="3" strokeLinecap="round"/>
              <rect x="24" y="24" width="10" height="10" rx="2" fill="#555"/>
              <rect x="46" y="24" width="10" height="10" rx="2" fill="#555"/>
              <rect x="24" y="46" width="10" height="10" rx="2" fill="#555"/>
              <rect x="42" y="42" width="14" height="14" rx="2" fill="#555"/>
            </svg>
            {status === 'error' && (
              <p style={{ color: '#FF6B6B', fontFamily: '-apple-system, sans-serif', fontSize: '13px', textAlign: 'center', padding: '0 20px' }}>
                {t(lang, 'cameraError')}
              </p>
            )}
          </div>
        )}

        {status === 'scanning' && (
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '200px', height: '200px', border: '2px solid #111111', borderRadius: '20px', animation: 'scanPulse 2s ease-in-out infinite' }} />
          </div>
        )}
      </div>

      {/* Scan button */}
      <div style={{ marginTop: '20px' }}>
        {status !== 'scanning' ? (
          <button onClick={startScan} style={{
            width: '100%', padding: '16px', borderRadius: '16px', border: 'none',
            background: '#111111', color: '#fff',
            fontFamily: '-apple-system, sans-serif', fontSize: '16px', fontWeight: '600', cursor: 'pointer',
          }}>
            {t(lang, 'startScan')}
          </button>
        ) : (
          <button onClick={stopScan} style={{
            width: '100%', padding: '16px', borderRadius: '16px', border: 'none',
            background: '#F0F0F0', color: '#888888',
            fontFamily: '-apple-system, sans-serif', fontSize: '16px', fontWeight: '600', cursor: 'pointer',
          }}>
            {t(lang, 'stopScan')}
          </button>
        )}
      </div>

      {/* Divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '24px 0' }}>
        <div style={{ flex: 1, height: '1px', background: '#EBEBEB' }} />
        <span style={{ fontFamily: '-apple-system, sans-serif', fontSize: '12px', color: '#BBBBBB', fontWeight: '500' }}>
          {t(lang, 'orType')}
        </span>
        <div style={{ flex: 1, height: '1px', background: '#EBEBEB' }} />
      </div>

      {/* Manual input */}
      <div style={{
        display: 'flex', gap: '10px', alignItems: 'center',
        background: '#FFFFFF', border: '1.5px solid #EBEBEB',
        borderRadius: '16px', padding: '4px 4px 4px 16px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
      }}>
        <input
          value={manualInput}
          onChange={e => setManualInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submitManual()}
          placeholder={t(lang, 'manualPlaceholder')}
          style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            color: '#111111', fontSize: '16px',
            fontFamily: "-apple-system, 'Helvetica Neue', sans-serif", padding: '12px 0',
          }}
        />
        <button
          onClick={submitManual}
          disabled={!manualInput.trim()}
          style={{
            width: '40px', height: '40px', borderRadius: '12px', border: 'none',
            background: manualInput.trim() ? '#111111' : '#F0F0F0',
            color: manualInput.trim() ? '#fff' : '#BBBBBB',
            cursor: manualInput.trim() ? 'pointer' : 'default',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.18s', flexShrink: 0,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12,5 19,12 12,19"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
