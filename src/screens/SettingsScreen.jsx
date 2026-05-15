import { TOPICS, TOPIC_ACCENT } from '../constants'
import YLogo from '../components/YLogo'

export default function SettingsScreen({ topic, setTopic, history, onClearHistory }) {
  return (
    <div style={{ flex: 1 }}>
      <div style={{ padding: '40px 24px 24px', textAlign: 'center' }}>
        <div style={{
          fontFamily: '-apple-system, sans-serif',
          fontSize: '28px', color: '#fff', fontWeight: '700',
        }}>
          Settings
        </div>
      </div>

      <div style={{ padding: '0 20px' }}>

        {/* Knowledge Lens */}
        <div style={{
          background: '#1C1C1E', borderRadius: '20px',
          padding: '22px 24px', marginBottom: '12px',
        }}>
          <div style={{
            fontFamily: '-apple-system, sans-serif', fontSize: '13px',
            color: '#666', fontWeight: '600', marginBottom: '14px',
            textTransform: 'uppercase', letterSpacing: '1px',
          }}>
            Knowledge Lens
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {TOPICS.map(t => {
              const active = topic === t
              return (
                <button key={t} onClick={() => setTopic(t)} style={{
                  flex: 1, padding: '12px 0', borderRadius: '14px', border: 'none',
                  background: active ? TOPIC_ACCENT[t] : '#2C2C2E',
                  color: active ? '#fff' : '#888',
                  fontFamily: '-apple-system, sans-serif', fontSize: '13px',
                  fontWeight: '600', cursor: 'pointer', textAlign: 'center',
                }}>
                  {t}
                </button>
              )
            })}
          </div>
        </div>

        {/* Stats */}
        <div style={{
          background: '#1C1C1E', borderRadius: '20px',
          padding: '22px 24px', marginBottom: '12px',
        }}>
          <div style={{
            fontFamily: '-apple-system, sans-serif', fontSize: '13px',
            color: '#666', fontWeight: '600', marginBottom: '14px',
            textTransform: 'uppercase', letterSpacing: '1px',
          }}>
            Stats
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {[
              { value: history.length,      label: 'Words' },
              { value: history.length * 15, label: 'Facts' },
            ].map(({ value, label }) => (
              <div key={label} style={{
                flex: 1, background: '#2C2C2E', borderRadius: '14px',
                padding: '18px', textAlign: 'center',
              }}>
                <div style={{
                  fontSize: '32px', color: '#fff',
                  fontFamily: '-apple-system, sans-serif', fontWeight: '700',
                }}>
                  {value}
                </div>
                <div style={{
                  fontFamily: '-apple-system, sans-serif', fontSize: '11px',
                  color: '#666', marginTop: '4px',
                  textTransform: 'uppercase', letterSpacing: '1px',
                }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clear history */}
        <div style={{
          background: '#1C1C1E', borderRadius: '20px',
          padding: '22px 24px', marginBottom: '12px',
        }}>
          <button
            onClick={onClearHistory}
            disabled={history.length === 0}
            style={{
              width: '100%', padding: '14px', borderRadius: '14px', border: 'none',
              background: history.length > 0 ? '#3A1C1C' : '#2C2C2E',
              color: history.length > 0 ? '#FF6B6B' : '#555',
              fontFamily: '-apple-system, sans-serif', fontSize: '15px',
              fontWeight: '600', cursor: history.length > 0 ? 'pointer' : 'default',
            }}
          >
            Clear Search History
          </button>
        </div>

        {/* About */}
        <div style={{
          background: '#1C1C1E', borderRadius: '20px',
          padding: '22px 24px', marginBottom: '12px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
            <YLogo size={32} color="#fff" />
            <div>
              <div style={{
                fontFamily: '-apple-system, sans-serif',
                fontSize: '18px', color: '#fff', fontWeight: '700',
              }}>
                The Y App
              </div>
              <div style={{
                fontFamily: '-apple-system, sans-serif',
                fontSize: '12px', color: '#555',
              }}>
                v1.0 · Powered by Claude AI
              </div>
            </div>
          </div>
          <p style={{
            fontFamily: '-apple-system, sans-serif',
            fontSize: '14px', color: '#888', lineHeight: '1.6',
          }}>
            A cultural knowledge engine. Explore any word through different lenses.
            Tap any fact to dive deeper.
          </p>
        </div>

      </div>
    </div>
  )
}
