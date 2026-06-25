const PREFIX = 'artcache_'
const TTL_MS = 30 * 24 * 60 * 60 * 1000 // 30 días

function cacheKey(subject, topic) {
  return PREFIX + btoa(encodeURIComponent(`${subject}||${topic}`)).slice(0, 60)
}

export function getCached(subject, topic) {
  try {
    const raw = localStorage.getItem(cacheKey(subject, topic))
    if (!raw) return null
    const { text, ts } = JSON.parse(raw)
    if (Date.now() - ts > TTL_MS) {
      localStorage.removeItem(cacheKey(subject, topic))
      return null
    }
    return text
  } catch {
    return null
  }
}

export function setCache(subject, topic, text) {
  try {
    localStorage.setItem(cacheKey(subject, topic), JSON.stringify({ text, ts: Date.now() }))
  } catch {
    // localStorage lleno — limpiamos entradas antiguas y reintentamos
    pruneOldCache()
    try {
      localStorage.setItem(cacheKey(subject, topic), JSON.stringify({ text, ts: Date.now() }))
    } catch {}
  }
}

function pruneOldCache() {
  const toDelete = []
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i)
    if (!k?.startsWith(PREFIX)) continue
    try {
      const { ts } = JSON.parse(localStorage.getItem(k))
      if (Date.now() - ts > TTL_MS) toDelete.push(k)
    } catch {
      toDelete.push(k)
    }
  }
  toDelete.forEach(k => localStorage.removeItem(k))
}
