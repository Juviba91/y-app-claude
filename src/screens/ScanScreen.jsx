import { useState, useEffect, useRef } from 'react'

export default function ScanScreen({ onScan }) {
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const intervalRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | scanning | unsupported | error
  const [manualInput, setManualInput] = useState('')
  const [lastDetected, setLastDetected] = useState(null)

  const stopScan = () => {
    clearInterval(intervalRef.current)
    streamRef.current?.getTracks().forEach(t => t.stop())
    streamRef.current = null
    setStatus('idle')
  }

  const startScan = async () => {
    if (!('BarcodeDetector' in window)) {
      setStatus('unsupported')
      return
    }
    setStatus('scanning')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 } },
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }

      const detector = new window.BarcodeDetector({ formats: ['qr_code'] })

      intervalRef.current = setInterval(async () => {
        if (!videoRef.current || videoRef.current.readyState < 2) return
        try {
          const codes = await detector.detect(videoRef.current)
          if (codes.length > 0) {
            const value = codes[0].rawValue.trim()
            if (value && value !== lastDetected) {
              setLastDetected(value)
              stopScan()
              onScan(value)
            }
          }
        } catch (_) {}
      }, 400)
    } catch (e) {
      setStatus('error')
    }
  }

  useEffect(() => {
    return () => stopScan()
  }, [])

  const submitManual = () => {
    const v = manualInput.trim()
    if (v) { onScan(v); setManualInput('') }
  }

  return (
    <div style={{ flex: 1, padding: '0 20px' }}>
      {/* Header */}
      <div style={{ padding: '48px 0 28px', textAlign: 'center' }}>
        <div style={{
          fontSize: '13px', color: '#A0A09A', fontWeight: '600',
          letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px',
          fontFamily: '-apple-system, sans-serif',
        }}>
          The Y App
        </div>
        <div style={{
          fontSize: '28px', color: '#1C1A18', fontWeight: '700',
          fontFamily: "-apple-system, 'Helvetica Neue', sans-serif",
        }}>
          Escanear QR
        </div>
        <div style={{
          fontSize: '14px', color: '#8A8680', marginTop: '6px',
          fontFamily: '-apple-system, sans-serif',
        }}>
          Apunta al código QR de la obra
        </div>
      </div>

      {/* Camera viewfinder */}
      <div style={{
        position: 'relative', borderRadius: '24px', overflow: 'hidden',
        background: '#1C1A18', aspectRatio: '1',
        border: '1.5px solid #E8E5DF',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      }}>
        <video
          ref={videoRef}
          autoPlay playsInline muted
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            display: status === 'scanning' ? 'block' : 'none',
          }}
        />

        {/* Overlay when idle */}
        {status !== 'scanning' && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '16px',
          }}>
            {/* QR frame icon */}
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <path d="M8 20V8h12" stroke="#555" strokeWidth="3" strokeLinecap="round"/>
              <path d="M72 20V8H60" stroke="#555" strokeWidth="3" strokeLinecap="round"/>
              <path d="M8 60v12h12" stroke="#555" strokeWidth="3" strokeLinecap="round"/>
              <path d="M72 60v12H60" stroke="#555" strokeWidth="3" strokeLinecap="round"/>
              <rect x="24" y="24" width="10" height="10" rx="2" fill="#555"/>
              <rect x="46" y="24" width="10" height="10" rx="2" fill="#555"/>
              <rect x="24" y="46" width="10" height="10" rx="2" fill="#555"/>
              <rect x="42" y="42" width="14" height="14" rx="2" fill="#555"/>
            </svg>

            {status === 'error' && (
              <p style={{
                color: '#FF6B6B', fontFamily: '-apple-system, sans-serif',
                fontSize: '13px', textAlign: 'center', padding: '0 20px',
              }}>
                No se pudo acceder a la cámara.{'\n'}Comprueba los permisos.
              </p>
            )}
            {status === 'unsupported' && (
              <p style={{
                color: '#A0A09A', fontFamily: '-apple-system, sans-serif',
                fontSize: '13px', textAlign: 'center', padding: '0 20px',
              }}>
                Tu navegador no soporta el escáner.{'\n'}Usa el texto manual.
              </p>
            )}
          </div>
        )}

        {/* Scanning indicator */}
        {status === 'scanning' && (
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: '200px', height: '200px', border: '2px solid #2563EB',
              borderRadius: '20px', animation: 'scanPulse 2s ease-in-out infinite',
            }} />
          </div>
        )}
      </div>

      {/* Scan button */}
      <div style={{ marginTop: '20px' }}>
        {status !== 'scanning' ? (
          <button onClick={startScan} style={{
            width: '100%', padding: '16px', borderRadius: '16px', border: 'none',
            background: '#1C1A18', color: '#fff',
            fontFamily: '-apple-system, sans-serif', fontSize: '16px',
            fontWeight: '600', cursor: 'pointer',
          }}>
            Iniciar escáner
          </button>
        ) : (
          <button onClick={stopScan} style={{
            width: '100%', padding: '16px', borderRadius: '16px', border: 'none',
            background: '#EDEAE4', color: '#6B6B6B',
            fontFamily: '-apple-system, sans-serif', fontSize: '16px',
            fontWeight: '600', cursor: 'pointer',
          }}>
            Detener
          </button>
        )}
      </div>

      {/* Divider */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        margin: '24px 0',
      }}>
        <div style={{ flex: 1, height: '1px', background: '#E8E5DF' }} />
        <span style={{
          fontFamily: '-apple-system, sans-serif', fontSize: '12px',
          color: '#A0A09A', fontWeight: '500',
        }}>
          o escribe el nombre
        </span>
        <div style={{ flex: 1, height: '1px', background: '#E8E5DF' }} />
      </div>

      {/* Manual input */}
      <div style={{
        display: 'flex', gap: '10px', alignItems: 'center',
        background: '#FFFFFF', border: '1.5px solid #E8E5DF',
        borderRadius: '16px', padding: '4px 4px 4px 16px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
      }}>
        <input
          value={manualInput}
          onChange={e => setManualInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submitManual()}
          placeholder="Nombre de la obra o artista..."
          style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            color: '#1C1A18', fontSize: '16px',
            fontFamily: "-apple-system, 'Helvetica Neue', sans-serif",
            padding: '12px 0',
          }}
        />
        <button
          onClick={submitManual}
          disabled={!manualInput.trim()}
          style={{
            width: '40px', height: '40px', borderRadius: '12px', border: 'none',
            background: manualInput.trim() ? '#1C1A18' : '#EDEAE4',
            color: manualInput.trim() ? '#fff' : '#A0A09A',
            cursor: manualInput.trim() ? 'pointer' : 'default',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.18s', flexShrink: 0,
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
  )
}
