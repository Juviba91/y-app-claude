import { useEffect } from 'react'
import { useLanguage } from '../contexts/language'
import { t } from '../utils/i18n'
import SkeletonCards from '../components/SkeletonCards'

export default function TrendingScreen({ onSelect, topic, trending, loading, onLoad }) {
  const lang = useLanguage()

  useEffect(() => {
    if (!trending.length && !loading) onLoad()
  }, [])

  return (
    <div style={{ flex: 1 }}>
      <div style={{ padding: '56px 24px 28px' }}>
        <h1 style={{
          fontFamily: "-apple-system, 'Helvetica Neue', sans-serif",
          fontSize: '42px', fontWeight: '800', lineHeight: '1.08',
          letterSpacing: '-1.5px', color: '#111111', margin: '0 0 8px',
        }}>
          Trending
        </h1>
        <p style={{
          fontFamily: '-apple-system, sans-serif',
          fontSize: '16px', color: '#888888', margin: 0,
        }}>
          {t(lang, 'trendingSubtitle')}
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
              background: '#FFFFFF', border: '1.5px solid #EBEBEB',
              borderRadius: '20px', padding: '22px 24px', marginBottom: '10px',
              cursor: 'pointer', animation: `fadeUp 0.4s ease ${i * 0.07}s both`,
            }}
          >
            <div style={{
              fontSize: '19px', color: '#111111',
              fontFamily: "-apple-system, 'Helvetica Neue', sans-serif",
              fontWeight: '700', marginBottom: '6px',
            }}>
              {item.word}
            </div>
            <p style={{
              fontSize: '14px', color: '#888888',
              lineHeight: '1.5', margin: 0,
              fontFamily: '-apple-system, sans-serif',
            }}>
              {item.context}
            </p>
          </div>
        ))}

        {!loading && trending.length === 0 && (
          <div style={{
            background: '#F8F8F8', border: '1.5px solid #EBEBEB',
            borderRadius: '20px', padding: '24px',
            color: '#BBBBBB', fontFamily: '-apple-system, sans-serif',
            fontSize: '15px', textAlign: 'center',
          }}>
            {t(lang, 'trendingEmpty')}
          </div>
        )}
      </div>
    </div>
  )
}
