import { SYSTEM_PROMPT } from '../constants'

// ─── PROMPT BUILDER ───────────────────────────────────────────────────────────
export function buildPrompt(subject, word, topic, isSentence) {
  if (isSentence) {
    return `Give exactly 15 concise facts expanding on: "${subject}"
Original subject: "${word}". Lens: ${topic}.
Max 25 words per sentence. Dense facts only.
Return ONLY a numbered list: 1. sentence ... 15. sentence`
  }
  return `Give exactly 15 concise facts about "${subject}" from a ${topic} perspective.
Max 25 words per sentence. Punchy and precise.
Cover origins, significance, impact, lesser-known facts.
Return ONLY a numbered list: 1. sentence ... 15. sentence`
}

// ─── RESPONSE PARSER ──────────────────────────────────────────────────────────
export function parseSentences(text) {
  if (!text) return null

  const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
  const results = []

  for (const line of lines) {
    const m = line.match(/^\d+[\.\)]\s*(.+)/)
    if (m && m[1].trim().length > 8) {
      results.push(m[1].trim())
    }
  }

  // Fallback: split on sentence boundaries
  if (results.length < 3) {
    const sents = text
      .split(/(?<=[.!?])\s+/)
      .map(s => s.trim())
      .filter(s => s.length > 15)
    if (sents.length >= 3) return sents.slice(0, 15)
    return null
  }

  return results.slice(0, 15)
}

// ─── API CALLER ───────────────────────────────────────────────────────────────
export async function callClaude(prompt) {
  const fullPrompt = SYSTEM_PROMPT + '\n\n' + prompt

  // Primary: Anthropic API via fetch
  // Requires VITE_ANTHROPIC_API_KEY in .env
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
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
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

  // Fallback: window.claude.complete (Claude artifact environment)
  if (typeof window !== 'undefined' && window.claude?.complete) {
    const r = await window.claude.complete(fullPrompt)
    if (typeof r === 'string') return r
    if (r?.content?.[0]?.text) return r.content[0].text
    return JSON.stringify(r)
  }

  throw new Error('No API available. Set VITE_ANTHROPIC_API_KEY in your .env file.')
}
