import { useState } from 'react'
import { TOPICS, TOPIC_ACCENT, LANGUAGES } from '../constants'
import { getCollection, removeFromCollection } from '../utils/collection'
import { useLanguage } from '../contexts/language'
import { t, topicLabel } from '../utils/i18n'

export default function SettingsScreen({ topic, setTopic, language, setLanguage, history, onClearHistory, onSelectArtwork }) {
  const [collection, setCollection] = useState(() => getCollection())
  const lang = useLanguage()

  const removeItem = (name) => {
    setCollection(removeFromCollection(name))
  }

  return (
    <div style={{ flex: 1 }}>
      <div style={{ padding: '48px 24px 24px' }}>
        <div style={{
          fontFamily: '-apple-system, sans-serif',
          fontSize: '28px', color: '#1C1A18', fontWeight: '700',
        }}>
          {t(lang, 'settingsTitle')}
        </div>
      </div>

      <div style={{ padding: '0 20px' }}>

        {/* Audience selector */}
        <div style={{
          background: '#FFFFFF', border: '1.5px solid #E8E5DF',
          borderRadius: '20px', padding: '22px 24px', marginBottom: '12px',
        }}>
          <div style={{
            fontFamily: '-apple-system, sans-serif', fontSize: '11px',
            color: '#A0A09A', fontWeight: '600', marginBottom: '14px',
            textTransform: 'uppercase', letterSpacing: '1px',
          }}>
            {t(lang, 'objective')}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {TOPICS.map(topicKey => {
              const active = topic === topicKey
              return (
                <button key={topicKey} onClick={() => setTopic(topicKey)} style={{
                  flex: 1, padding: '12px 0', borderRadius: '14px',
                  border: active ? 'none' : '1.5px solid #E8E5DF',
                  background: active ? TOPIC_ACCENT[topicKey] : '#FAFAF8',
                  color: active ? '#fff' : '#6B6B6B',
                  fontFamily: '-apple-system, sans-serif', fontSize: '12px',
                  fontWeight: '600', cursor: 'pointer', textAlign: 'center', transition: 'all 0.18s',
                }}>
                  {topicLabel(lang, topicKey)}
                </button>
              )
            })}
          </div>
        </div>

        {/* Language selector */}
        <div style={{
          background: '#FFFFFF', border: '1.5px solid #E8E5DF',
          borderRadius: '20px', padding: '22px 24px', marginBottom: '12px',
        }}>
          <div style={{
            fontFamily: '-apple-system, sans-serif', fontSize: '11px',
            color: '#A0A09A', fontWeight: '600', marginBottom: '14px',
            textTransform: 'uppercase', letterSpacing: '1px',
          }}>
            {t(lang, 'languageLabel')}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {LANGUAGES.map(({ code, label }) => {
              const active = language === code
              return (
                <button key={code} onClick={() => setLanguage(code)} style={{
                  flex: 1, padding: '14px 0', borderRadius: '14px',
                  border: active ? 'none' : '1.5px solid #E8E5DF',
                  background: active ? '#1C1A18' : '#FAFAF8',
                  color: active ? '#fff' : '#6B6B6B',
                  fontFamily: '-apple-system, sans-serif', fontSize: '15px',
                  fontWeight: '600', cursor: 'pointer', textAlign: 'center', transition: 'all 0.18s',
                }}>
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Collection */}
        <div style={{
          background: '#FFFFFF', border: '1.5px solid #E8E5DF',
          borderRadius: '20px', padding: '22px 24px', marginBottom: '12px',
        }}>
          <div style={{
            fontFamily: '-apple-system, sans-serif', fontSize: '11px',
            color: '#A0A09A', fontWeight: '600', marginBottom: '14px',
            textTransform: 'uppercase', letterSpacing: '1px',
          }}>
            {t(lang, 'collectionTitle')} ({collection.length})
          </div>

          {collection.length === 0 ? (
            <p style={{ fontFamily: '-apple-system, sans-serif', fontSize: '14px', color: '#A0A09A', lineHeight: '1.5' }}>
              {t(lang, 'collectionEmpty')}
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {collection.map((item) => (
                <div key={item.name} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 14px', background: '#F8F6F1',
                  borderRadius: '12px', border: '1px solid #E8E5DF',
                }}>
                  <button onClick={() => onSelectArtwork(item.name)} style={{
                    background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', flex: 1,
                  }}>
                    <div style={{ fontFamily: '-apple-system, sans-serif', fontSize: '15px', color: '#1C1A18', fontWeight: '500' }}>
                      {item.name}
                    </div>
                    <div style={{ fontFamily: '-apple-system, sans-serif', fontSize: '11px', color: TOPIC_ACCENT[item.topic] || '#A0A09A', marginTop: '2px', fontWeight: '600' }}>
                      {topicLabel(lang, item.topic)}
                    </div>
                  </button>
                  <button onClick={() => removeItem(item.name)} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    padding: '4px', borderRadius: '8px', color: '#C0C0BA', fontSize: '18px', lineHeight: 1,
                  }}>×</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        <div style={{
          background: '#FFFFFF', border: '1.5px solid #E8E5DF',
          borderRadius: '20px', padding: '22px 24px', marginBottom: '12px',
        }}>
          <div style={{
            fontFamily: '-apple-system, sans-serif', fontSize: '11px',
            color: '#A0A09A', fontWeight: '600', marginBottom: '14px',
            textTransform: 'uppercase', letterSpacing: '1px',
          }}>
            {t(lang, 'statsTitle')}
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {[
              { value: history.length,    label: t(lang, 'statSearches') },
              { value: collection.length, label: t(lang, 'statSaved') },
            ].map(({ value, label }) => (
              <div key={label} style={{
                flex: 1, background: '#F8F6F1', borderRadius: '14px',
                border: '1px solid #E8E5DF', padding: '16px', textAlign: 'center',
              }}>
                <div style={{ fontSize: '30px', color: '#1C1A18', fontFamily: '-apple-system, sans-serif', fontWeight: '700' }}>
                  {value}
                </div>
                <div style={{ fontFamily: '-apple-system, sans-serif', fontSize: '11px', color: '#A0A09A', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clear history */}
        <div style={{
          background: '#FFFFFF', border: '1.5px solid #E8E5DF',
          borderRadius: '20px', padding: '22px 24px', marginBottom: '12px',
        }}>
          <button
            onClick={onClearHistory}
            disabled={history.length === 0}
            style={{
              width: '100%', padding: '14px', borderRadius: '14px',
              border: `1px solid ${history.length > 0 ? '#FFD5D5' : '#E8E5DF'}`,
              background: history.length > 0 ? '#FFF0F0' : '#F8F6F1',
              color: history.length > 0 ? '#C0392B' : '#C0C0BA',
              fontFamily: '-apple-system, sans-serif', fontSize: '15px',
              fontWeight: '600', cursor: history.length > 0 ? 'pointer' : 'default',
            }}
          >
            {t(lang, 'clearHistory')}
          </button>
        </div>

        {/* About */}
        <div style={{
          background: '#FFFFFF', border: '1.5px solid #E8E5DF',
          borderRadius: '20px', padding: '22px 24px', marginBottom: '32px',
        }}>
          <div style={{ marginBottom: '10px' }}>
            <div style={{ fontFamily: '-apple-system, sans-serif', fontSize: '17px', color: '#1C1A18', fontWeight: '700' }}>
              The Y App
            </div>
            <div style={{ fontFamily: '-apple-system, sans-serif', fontSize: '12px', color: '#A0A09A', marginTop: '2px' }}>
              {t(lang, 'aboutVersion')}
            </div>
          </div>
          <p style={{ fontFamily: '-apple-system, sans-serif', fontSize: '14px', color: '#8A8680', lineHeight: '1.6' }}>
            {t(lang, 'aboutDesc')}
          </p>
        </div>

      </div>
    </div>
  )
}
