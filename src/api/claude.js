import { SYSTEM_PROMPT, LANGUAGE_NAME } from '../constants'

// ─── PROMPT BUILDER ───────────────────────────────────────────────────────────
export function buildPrompt(subject, word, topic, isSentence, language = 'es') {
  const lang = LANGUAGE_NAME[language] || 'Spanish'
  const langInstruction = `Respond entirely in ${lang}.`

  if (isSentence) {
    return `${langInstruction}
Give exactly 15 facts expanding on: "${subject}"
Original artwork/artist: "${word}". Audience: ${topic}.
Each fact must be 30-50 words. Informative and complete, not bullet points.
Return ONLY a numbered list: 1. sentence ... 15. sentence`
  }
  return `${langInstruction}
Give exactly 15 facts about the artwork or artist "${subject}" from an art history perspective. Audience: ${topic}.
Each fact must be 30-50 words. Informative and complete.
Cover origin, technique, style, historical context, influence, museum location.
Return ONLY a numbered list: 1. sentence ... 15. sentence`
}

// ─── RESPONSE PARSER ──────────────────────────────────────────────────────────
export function parseSentences(text) {
  if (!text) return null

  const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
  const results = []

  for (const line of lines) {
    const m = line.match(/^\d+[\.\)]\s*(.+)/)
    if (m && m[1].trim().length > 10) {
      results.push(m[1].trim())
    }
  }

  if (results.length < 3) {
    const sents = text
      .split(/(?<=[.!?])\s+/)
      .map(s => s.trim())
      .filter(s => s.length > 20)
    if (sents.length >= 3) return sents.slice(0, 15)
    return null
  }

  return results.slice(0, 15)
}

// ─── API CALLER ───────────────────────────────────────────────────────────────
export async function callClaude(prompt) {
  const fullPrompt = SYSTEM_PROMPT + '\n\n' + prompt

  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY

  if (apiKey) {
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 1500,
          messages: [{ role: 'user', content: fullPrompt }],
        }),
      })
      const data = await res.json()
      if (data.content) {
        const text = data.content.find(b => b.type === 'text')?.text
        if (text?.length > 10) return text
      }
      if (data.error) throw new Error(data.error.message)
    } catch (e) {
      console.warn('API fetch failed:', e.message)
    }
  }

  if (typeof window !== 'undefined' && window.claude?.complete) {
    const r = await window.claude.complete(fullPrompt)
    if (typeof r === 'string') return r
    if (r?.content?.[0]?.text) return r.content[0].text
    return JSON.stringify(r)
  }

  throw new Error('No API available. Set VITE_ANTHROPIC_API_KEY in your .env file.')
}
