import { BLOCKED_WORDS } from '../constants'

export function isBlocked(text) {
  const lower = text.toLowerCase().replace(/[^a-záéíóúàèìòùüïñç\s]/g, ' ')
  return BLOCKED_WORDS.some(w => {
    const re = new RegExp(`(^|\\s)${w}(\\s|$)`, 'i')
    return re.test(lower) || lower.includes(w)
  })
}
