import { TOPIC_ACCENT } from '../constants'

export default function Breadcrumb({ trail, topic, onBack }) {
  const accent = TOPIC_ACCENT[topic]
  const MAX = 2
  const visible = trail.length > MAX + 1
    ? [trail[0], '…', ...trail.slice(-MAX)]
    : trail

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
      <button
        onClick={onBack}
        style={{
          background: '#2C2C2E', border: 'none', color: '#999',
          padding: '8px 16px', borderRadius: '20px', cursor: 'pointer',
          fontFamily: '-apple-system, sans-serif', fontSize: '13px', fontWeight: '500',
        }}
      >
        ← Back
      </button>
      {visible.map((crumb, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{
            fontSize: '12px',
            fontFamily: '-apple-system, sans-serif',
            color: i === visible.length - 1 ? '#fff' : '#555',
            maxWidth: '100px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            display: 'inline-block',
          }}>
            {crumb.length > 18 ? crumb.slice(0, 18) + '…' : crumb}
          </span>
          {i < visible.length - 1 && (
            <span style={{ color: '#444', fontSize: '12px' }}>›</span>
          )}
        </span>
      ))}
    </div>
  )
}
