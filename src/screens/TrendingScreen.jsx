import { useEffect } from 'react'
import { TOPIC_ACCENT } from '../constants'
import SkeletonCards from '../components/SkeletonCards'

export default function TrendingScreen({ onSelect, topic, trending, loading, onLoad }) {
  const accent = TOPIC_ACCENT[topic]

  useEffect(() => {
    if (!trending.length && !loading) onLoad()
  }, [])

  return (
    <div style={{ flex: 1 }}>
      <div style={{ padding: '40px 24px 24px', textAlign: 'center' }}>
        <div style={{
          fontFamily: '-apple-system, sans-serif',
          fontSize: '28px', color: '#fff', fontWeight: '700',
        }}>
          Trending
        </div>
        <p style={{
          fontFamily: '-apple-system, sans-serif',
          fontSize: '15px', color: '#666', marginTop: '8px',
        }}>
          What the world is talking about
        </p>
      </div>

      <div style={{ padding: '0 20px' }}>
        {loading ? (
          <SkeletonCards />
        ) : trending.map((item, i) => (
          <div
            key={i}
            onClick={() => onSelect(item.word)}
            style={{
              background: '#fff', borderRadius: '20px',
              padding: '22px 24px', marginBottom: '12px', cursor: 'pointer',
              animation: `fadeUp 0.4s ease ${i * 0.07}s both`,
            }}
          >
            <div style={{
              fontSize: '20px', color: '#111',
              fontFamily: '-apple-system, sans-serif',
              fontWeight: '600', marginBottom: '6px',
            }}>
              {item.word}
            </div>
            <p style={{
              fontSize: '14px', color: '#888',
              lineHeight: '1.5', margin: 0,
              fontFamily: '-apple-system, sans-serif',
            }}>
              {item.context}
            </p>
          </div>
        ))}

        {!loading && trending.length === 0 && (
          <div style={{
            background: '#1C1C1E', borderRadius: '20px', padding: '24px',
            color: '#666', fontFamily: '-apple-system, sans-serif',
            fontSize: '15px', textAlign: 'center',
          }}>
            Could not load trending topics.
          </div>
        )}
      </div>
    </div>
  )
}
