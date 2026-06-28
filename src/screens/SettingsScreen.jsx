import { useState } from 'react'
import { TOPICS, LANGUAGES } from '../constants'
import { getCollection, removeFromCollection } from '../utils/collection'
import { useLanguage } from '../contexts/language'
import { t, topicLabel } from '../utils/i18n'

export default function SettingsScreen({ topic, setTopic, language, setLanguage, history, onClearHistory, onSelectArtwork }) {
  const [collection, setCollection] = useState(() => getCollection())
  const lang = useLanguage()

  const removeItem = (name) => {
    setCollection(removeFromCollection(name))
  }

  const Card = ({ children, style = {} }) => (
    <div style={{
      background: '#FFFFFF', border: '1.5px solid #EBEBEB',
      borderRadius: '20px', padding: '22px 24px', marginBottom: '12px',
      ...style,
    }}>
      {children}
    </div>
  )

  const SectionLabel = ({ children }) => (
    <p style={{
      fontFamily: '-apple-system, sans-serif', fontSize: '11px',
      color: '#BBBBBB', fontWeight: '600', margin: '0 0 14px',
      textTransform: 'uppercase', letterSpacing: '1.2px',
    }}>
      {children}
    </p>
  )

  return (
    <div style={{ flex: 1 }}>
      <div style={{ padding: '56px 24px 28px' }}>
        <h1 style={{
          fontFamily: "-apple-system, 'Helvetica Neue', sans-serif",
          fontSize: '42px', fontWeight: '800', letterSpacing: '-1.5px',
          color: '#111111', margin: 0,
        }}>
          {t(lang, 'settingsTitle')}
        </h1>
      </div>

      <div style={{ padding: '0 20px' }}>

        {/* Audience selector */}
        <Card>
          <SectionLabel>{t(lang, 'objective')}</SectionLabel>
          <div style={{ display: 'flex', gap: '8px' }}>
            {TOPICS.map(topicKey => {
              const active = topic === topicKey
              return (
                <button key={topicKey} onClick={() => setTopic(topicKey)} style={{
                  flex: 1, padding: '12px 0', borderRadius: '50px',
                  border: active ? 'none' : '1.5px solid #EBEBEB',
                  background: active ? '#111111' : 'transparent',
                  color: active ? '#fff' : '#888888',
                  fontFamily: '-apple-system, sans-serif', fontSize: '12px',
                  fontWeight: '600', cursor: 'pointer', textAlign: 'center', transition: 'all 0.18s',
                }}>
                  {topicLabel(lang, topicKey)}
                </button>
              )
            })}
          </div>
        </Card>

        {/* Language selector */}
        <Card>
          <SectionLabel>{t(lang, 'languageLabel')}</SectionLabel>
          <div style={{ display: 'flex', gap: '8px' }}>
            {LANGUAGES.map(({ code, label }) => {
              const active = language === code
              return (
                <button key={code} onClick={() => setLanguage(code)} style={{
                  flex: 1, padding: '14px 0', borderRadius: '50px',
                  border: active ? 'none' : '1.5px solid #EBEBEB',
                  background: active ? '#111111' : 'transparent',
                  color: active ? '#fff' : '#888888',
                  fontFamily: '-apple-system, sans-serif', fontSize: '15px',
                  fontWeight: '600', cursor: 'pointer', textAlign: 'center', transition: 'all 0.18s',
                }}>
                  {label}
                </button>
              )
            })}
          </div>
        </Card>

        {/* Collection */}
        <Card>
          <SectionLabel>{t(lang, 'collectionTitle')} ({collection.length})</SectionLabel>
          {collection.length === 0 ? (
            <p style={{ fontFamily: '-apple-system, sans-serif', fontSize: '14px', color: '#BBBBBB', lineHeight: '1.5', margin: 0 }}>
              {t(lang, 'collectionEmpty')}
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {collection.map((item) => (
                <div key={item.name} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 14px', background: '#F8F8F8',
                  borderRadius: '12px',
                }}>
                  <button onClick={() => onSelectArtwork(item.name)} style={{
                    background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', flex: 1,
                  }}>
                    <div style={{ fontFamily: '-apple-system, sans-serif', fontSize: '15px', color: '#111111', fontWeight: '500' }}>
                      {item.name}
                    </div>
                    <div style={{ fontFamily: '-apple-system, sans-serif', fontSize: '11px', color: '#BBBBBB', marginTop: '2px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {topicLabel(lang, item.topic)}
                    </div>
                  </button>
                  <button onClick={() => removeItem(item.name)} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    padding: '4px', borderRadius: '8px', color: '#CCCCCC', fontSize: '20px', lineHeight: 1,
                  }}>×</button>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Stats */}
        <Card>
          <SectionLabel>{t(lang, 'statsTitle')}</SectionLabel>
          <div style={{ display: 'flex', gap: '12px' }}>
            {[
              { value: history.length,    label: t(lang, 'statSearches') },
              { value: collection.length, label: t(lang, 'statSaved') },
            ].map(({ value, label }) => (
              <div key={label} style={{
                flex: 1, background: '#F8F8F8', borderRadius: '14px',
                padding: '16px', textAlign: 'center',
              }}>
                <div style={{ fontSize: '32px', color: '#111111', fontFamily: '-apple-system, sans-serif', fontWeight: '700' }}>
                  {value}
                </div>
                <div style={{ fontFamily: '-apple-system, sans-serif', fontSize: '11px', color: '#BBBBBB', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Clear history */}
        <Card>
          <button
            onClick={onClearHistory}
            disabled={history.length === 0}
            style={{
              width: '100%', padding: '14px', borderRadius: '50px',
              border: `1.5px solid ${history.length > 0 ? '#DDDDDD' : '#EBEBEB'}`,
              background: 'transparent',
              color: history.length > 0 ? '#888888' : '#CCCCCC',
              fontFamily: '-apple-system, sans-serif', fontSize: '15px',
              fontWeight: '600', cursor: history.length > 0 ? 'pointer' : 'default',
            }}
          >
            {t(lang, 'clearHistory')}
          </button>
        </Card>

        {/* About */}
        <Card style={{ marginBottom: '32px' }}>
          <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/logo.png" alt="" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
            <div>
              <div style={{ fontFamily: '-apple-system, sans-serif', fontSize: '15px', color: '#111111', fontWeight: '700' }}>
                The Y App
              </div>
              <div style={{ fontFamily: '-apple-system, sans-serif', fontSize: '12px', color: '#BBBBBB', marginTop: '1px' }}>
                {t(lang, 'aboutVersion')}
              </div>
            </div>
          </div>
          <p style={{ fontFamily: '-apple-system, sans-serif', fontSize: '14px', color: '#888888', lineHeight: '1.6', margin: 0 }}>
            {t(lang, 'aboutDesc')}
          </p>
        </Card>

      </div>
    </div>
  )
}
