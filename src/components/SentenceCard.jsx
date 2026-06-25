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
        background: pressed ? '#F0EDE7' : '#FFFFFF',
        border: '1px solid #E8E5DF',
        borderRadius: '16px',
        padding: '20px 22px',
        marginBottom: '10px',
        cursor: 'pointer',
        transform: pressed ? 'scale(0.97)' : 'scale(1)',
        transition: 'transform 0.12s, background 0.12s',
        animation: `fadeUp 0.4s ease ${Math.min(delay, 0.35)}s both`,
      }}
    >
      <p style={{
        fontSize: '17px',
        lineHeight: '1.55',
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
