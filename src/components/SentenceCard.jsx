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
        background: pressed ? '#E8E8E8' : '#FFFFFF',
        borderRadius: '20px',
        padding: '22px 24px',
        marginBottom: '12px',
        cursor: 'pointer',
        transform: pressed ? 'scale(0.97)' : 'scale(1)',
        transition: 'transform 0.12s, background 0.12s',
        animation: `fadeUp 0.4s ease ${Math.min(delay, 0.35)}s both`,
      }}
    >
      <p style={{
        fontSize: '20px',
        lineHeight: '1.5',
        color: '#111',
        margin: 0,
        fontFamily: "-apple-system, 'Helvetica Neue', sans-serif",
        fontWeight: '400',
      }}>
        {text}
      </p>
    </div>
  )
}
