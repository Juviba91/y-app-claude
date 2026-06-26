import { useState } from 'react'

export default function SentenceCard({ text, onTap, delay = 0 }) {
  const [pressed, setPressed] = useState(false)

  return (
    <div
      onClick={() => onTap(text)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        background: pressed ? '#F5F3EE' : '#FFFFFF',
        borderRadius: '18px',
        padding: '22px 24px',
        marginBottom: '10px',
        cursor: 'pointer',
        boxShadow: pressed
          ? '0 1px 4px rgba(0,0,0,0.06)'
          : '0 2px 10px rgba(0,0,0,0.07)',
        transform: pressed ? 'scale(0.98)' : 'scale(1)',
        transition: 'transform 0.12s, box-shadow 0.12s, background 0.12s',
        animation: `fadeUp 0.4s ease ${Math.min(delay, 0.35)}s both`,
      }}
    >
      <p style={{
        fontSize: '17px',
        lineHeight: '1.6',
        color: '#1C1A18',
        margin: 0,
        fontFamily: "-apple-system, 'Helvetica Neue', sans-serif",
        fontWeight: '400',
      }}>
        {text}
      </p>
    </div>
  )
}
