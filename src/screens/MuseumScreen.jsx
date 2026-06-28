import { useState, useEffect } from 'react'
import { getMuseumFull } from '../utils/museum'
import { track } from '../utils/analyticsDB'
import { useLanguage } from '../contexts/language'
import { t } from '../utils/i18n'

export default function MuseumScreen({ museum: stub, onBack, onSearchArtwork }) {
  const [museum, setMuseum] = useState(null)
  const [loading, setLoading] = useState(true)
  const lang = useLanguage()

  useEffect(() => {
    track('museum_view', { source: stub.slug })
    getMuseumFull(stub.id)
      .then(data => setMuseum(data))
      .finally(() => setLoading(false))
  }, [stub.id, stub.slug])

  return (
    <div style={{ flex: 1, background: '#fff' }}>

      {/* Header */}
      <div style={{ padding: '16px 20px 0' }}>
        <button onClick={onBack} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: '-apple-system, sans-serif', fontSize: '14px',
          color: '#A0A09A', padding: '0', display: 'flex', alignItems: 'center', gap: '4px',
        }}>
          ← {t(lang, 'back')}
        </button>
      </div>

      {loading ? (
        <MuseumSkeleton />
      ) : !museum ? (
        <div style={{ padding: '40px 20px', color: '#A0A09A', textAlign: 'center',
          fontFamily: '-apple-system, sans-serif', fontSize: '14px' }}>
          No disponible
        </div>
      ) : (
        <>
          {/* Museum identity */}
          <div style={{ padding: '24px 20px 20px' }}>
            <div style={{
              display: 'inline-block', background: '#F2F2F2', borderRadius: '8px',
              padding: '4px 10px', marginBottom: '14px',
            }}>
              <span style={{
                fontFamily: '-apple-system, sans-serif', fontSize: '11px',
                color: '#888', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px',
              }}>
                {museum.city} · {museum.country}
              </span>
            </div>

            <h1 style={{
              fontFamily: "-apple-system, 'Helvetica Neue', sans-serif",
              fontSize: '32px', fontWeight: '800', color: '#1C1A18',
              lineHeight: '1.1', marginBottom: '16px', letterSpacing: '-0.5px',
            }}>
              {museum.name}
            </h1>

            <p style={{
              fontFamily: '-apple-system, sans-serif', fontSize: '15px',
              color: '#555', lineHeight: '1.6', marginBottom: '24px',
            }}>
              {museum.description}
            </p>

            {museum.website_url && (
              <a
                href={museum.website_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('museum_website_click', { source: museum.slug })}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  background: '#1C1A18', color: '#fff',
                  borderRadius: '12px', padding: '12px 20px',
                  fontFamily: '-apple-system, sans-serif', fontSize: '14px',
                  fontWeight: '600', textDecoration: 'none',
                }}
              >
                {t(lang, 'museumVisitSite')} ↗
              </a>
            )}
          </div>

          <div style={{ height: '1px', background: '#F0F0F0', margin: '0 20px' }} />

          {/* Artworks list */}
          <div style={{ padding: '24px 20px' }}>
            <h2 style={{
              fontFamily: '-apple-system, sans-serif', fontSize: '13px',
              fontWeight: '700', color: '#A0A09A',
              textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px',
            }}>
              {t(lang, 'museumCollection')}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {museum.artworks.map((name, i) => (
                <button
                  key={i}
                  onClick={() => {
                    track('museum_artwork_tap', { artwork: name, source: museum.slug })
                    onSearchArtwork(name)
                  }}
                  style={{
                    background: '#FAFAFA', border: '1px solid #EFEFEF',
                    borderRadius: '14px', padding: '14px 18px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontFamily: "-apple-system, 'Helvetica Neue', sans-serif",
                    fontSize: '15px', fontWeight: '500', color: '#1C1A18',
                  }}>
                    {name}
                  </span>
                  <span style={{ color: '#C0C0C0', fontSize: '14px' }}>→</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function MuseumSkeleton() {
  return (
    <div style={{ padding: '24px 20px' }}>
      {[200, 320, 260, 180].map((w, i) => (
        <div key={i} style={{
          height: i === 1 ? '40px' : '16px', width: `${w}px`, maxWidth: '100%',
          background: '#F0F0F0', borderRadius: '8px',
          marginBottom: i === 1 ? '20px' : '12px',
          animation: 'pulse 1.4s ease-in-out infinite',
        }} />
      ))}
    </div>
  )
}
