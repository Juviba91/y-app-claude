import { useState, useEffect } from 'react'
import { TOPIC_ACCENT } from '../constants'
import { callClaude, buildPrompt, parseSentences } from '../api/claude'
import SentenceCard from '../components/SentenceCard'
import SkeletonCards from '../components/SkeletonCards'
import Breadcrumb from '../components/Breadcrumb'

export default function SentencesScreen({ subject, word, topic, trail, onBack, onTapSentence, isSentence }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const accent = TOPIC_ACCENT[topic]

  useEffect(() => {
    let cancelled = false
    setLoading(true); setItems([]); setError(null)

    callClaude(buildPrompt(subject, word, topic, isSentence))
      .then(raw => {
        if (cancelled) return
        const parsed = parseSentences(raw)
        if (parsed?.length > 0) setItems(parsed)
        else setError('Could not parse response. Go back and try again.')
      })
      .catch(e => {
        if (!cancelled) setError(e?.message || 'Something went wrong.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [subject, topic])

  const displaySubject = subject.length > 80 ? subject.slice(0, 80) + '…' : subject

  return (
    <div style={{ flex: 1 }}>
      <div style={{ padding: '16px 20px 0' }}>
        <Breadcrumb trail={trail} topic={topic} onBack={onBack} />

        <div style={{ marginTop: '20px', marginBottom: '6px' }}>
          <span style={{
            fontFamily: '-apple-system, sans-serif', fontSize: '12px',
            color: accent, fontWeight: '600',
            textTransform: 'uppercase', letterSpacing: '1px',
          }}>
            {topic} · {isSentence ? 'Deeper Dive' : 'Overview'}
          </span>
        </div>

        <h2 style={{
          fontSize: isSentence ? '18px' : '28px',
          fontWeight: isSentence ? '400' : '700',
          color: '#fff',
          fontFamily: "-apple-system, 'Helvetica Neue', sans-serif",
          lineHeight: isSentence ? '1.5' : '1.15',
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
            color: '#555', paddingLeft: '17px', marginTop: '4px',
          }}>
            About: {word}
          </div>
        )}

        <div style={{ height: '18px' }} />
      </div>

      <div style={{ padding: '0 20px' }}>
        {loading && <SkeletonCards />}
        {error && (
          <div style={{
            background: '#1C1C1E', borderRadius: '20px', padding: '22px 24px',
            color: '#FF6B6B', fontFamily: '-apple-system, sans-serif', fontSize: '14px',
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
