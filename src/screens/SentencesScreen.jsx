import { useState, useEffect } from 'react'
import { TOPIC_ACCENT } from '../constants'
import { callClaude, buildPrompt, parseSentences } from '../api/claude'
import { addToCollection, removeFromCollection, isInCollection } from '../utils/collection'
import { getCached, setCache } from '../utils/cache'
import { track } from '../utils/analyticsDB'
import { getMuseumByArtwork } from '../utils/museum'
import { useLanguage } from '../contexts/language'
import { t, topicLabel } from '../utils/i18n'
import SentenceCard from '../components/SentenceCard'
import SkeletonCards from '../components/SkeletonCards'
import Breadcrumb from '../components/Breadcrumb'
import { BookmarkIcon } from '../components/Icons'

export default function SentencesScreen({ subject, word, topic, language, trail, onBack, onTapSentence, isSentence, onMuseum }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [saved, setSaved] = useState(false)
  const [museum, setMuseum] = useState(null)
  const lang = useLanguage()
  const accent = TOPIC_ACCENT[topic]

  useEffect(() => {
    setSaved(isInCollection(word))
  }, [word])

  // Look up if this artwork is linked to a museum page (only on root searches)
  useEffect(() => {
    if (isSentence) return
    setMuseum(null)
    getMuseumByArtwork(word).then(m => setMuseum(m || null))
  }, [word, isSentence])

  useEffect(() => {
    let cancelled = false
    setLoading(true); setItems([]); setError(null)

    const cacheKey = `${topic}_${language}`
    const cached = getCached(subject, cacheKey)
    if (cached) {
      const parsed = parseSentences(cached)
      if (parsed?.length > 0) { setItems(parsed); setLoading(false); return }
    }

    callClaude(buildPrompt(subject, word, topic, isSentence, language))
      .then(raw => {
        if (cancelled) return
        const parsed = parseSentences(raw)
        if (parsed?.length > 0) {
          setCache(subject, cacheKey, raw)
          setItems(parsed)
        } else {
          setError(t(lang, 'errorMsg'))
        }
      })
      .catch(e => { if (!cancelled) setError(e?.message || t(lang, 'errorMsg')) })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [subject, topic, language])

  const toggleSave = () => {
    if (saved) {
      removeFromCollection(word)
      setSaved(false)
      track('artwork_unsaved', { artwork: word, topic })
    } else {
      addToCollection(word, topic)
      setSaved(true)
      track('artwork_saved', { artwork: word, topic })
    }
  }

  const displaySubject = subject.length > 80 ? subject.slice(0, 80) + '…' : subject

  return (
    <div style={{ flex: 1 }}>
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Breadcrumb trail={trail} topic={topic} onBack={onBack} />
          {!isSentence && (
            <button onClick={toggleSave} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '6px', borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <BookmarkIcon filled={saved} />
            </button>
          )}
        </div>

        <div style={{ marginTop: '20px', marginBottom: '6px' }}>
          <span style={{
            fontFamily: '-apple-system, sans-serif', fontSize: '11px',
            color: accent, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px',
          }}>
            {topicLabel(lang, topic)} · {isSentence ? t(lang, 'deepDive') : t(lang, 'overview')}
          </span>
        </div>

        <h2 style={{
          fontSize: isSentence ? '17px' : '32px',
          fontWeight: isSentence ? '400' : '800',
          color: '#1C1A18',
          fontFamily: "-apple-system, 'Helvetica Neue', sans-serif",
          lineHeight: isSentence ? '1.5' : '1.1',
          letterSpacing: isSentence ? 'normal' : '-0.8px',
          fontStyle: isSentence ? 'italic' : 'normal',
          borderLeft: isSentence ? `3px solid ${accent}` : 'none',
          paddingLeft: isSentence ? '14px' : '0',
          marginBottom: '4px',
        }}>
          {displaySubject}
        </h2>

        {isSentence && word && (
          <div style={{
            fontFamily: '-apple-system, sans-serif', fontSize: '12px',
            color: '#A0A09A', paddingLeft: '17px', marginTop: '4px',
          }}>
            {t(lang, 'aboutLabel')} {word}
          </div>
        )}

        <div style={{ height: '18px' }} />
      </div>

      <div style={{ padding: '0 20px' }}>
        {museum && onMuseum && (
          <button
            onClick={() => onMuseum(museum)}
            style={{
              width: '100%', background: '#F7F7F7', border: '1px solid #EBEBEB',
              borderRadius: '16px', padding: '14px 18px', marginBottom: '16px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              cursor: 'pointer', textAlign: 'left',
            }}
          >
            <div>
              <div style={{
                fontFamily: '-apple-system, sans-serif', fontSize: '11px',
                color: '#999', fontWeight: '600', textTransform: 'uppercase',
                letterSpacing: '1px', marginBottom: '4px',
              }}>
                {t(lang, 'museumIn')}
              </div>
              <div style={{
                fontFamily: "-apple-system, 'Helvetica Neue', sans-serif",
                fontSize: '15px', fontWeight: '600', color: '#1C1A18',
              }}>
                {museum.name}
              </div>
              <div style={{
                fontFamily: '-apple-system, sans-serif', fontSize: '12px', color: '#999', marginTop: '2px',
              }}>
                {museum.city} · {museum.country}
              </div>
            </div>
            <span style={{ fontSize: '18px', color: '#C0C0C0' }}>→</span>
          </button>
        )}

        {loading && <SkeletonCards />}
        {error && (
          <div style={{
            background: '#FFF5F5', border: '1px solid #FFD5D5',
            borderRadius: '16px', padding: '20px 22px',
            color: '#C0392B', fontFamily: '-apple-system, sans-serif', fontSize: '14px',
          }}>
            {error}
          </div>
        )}
        {!loading && !error && items.map((text, i) => (
          <SentenceCard key={i} text={text} onTap={onTapSentence} delay={i * 0.03} />
        ))}
      </div>
    </div>
  )
}
