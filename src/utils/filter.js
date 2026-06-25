import { BLOCKED_WORDS } from '../constants'

export function isBlocked(text) {
  const lower = text.toLowerCase()
  return BLOCKED_WORDS.some(w => {
    // Match at word boundary so "sex" catches "sexual" but not "Sussex"
    const escaped = w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    return new RegExp(`\\b${escaped}`, 'i').test(lower)
  })
}
