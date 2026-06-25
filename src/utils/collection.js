const KEY = 'artgallery_collection'

export function getCollection() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') }
  catch { return [] }
}

export function addToCollection(name, topic) {
  const col = getCollection()
  if (col.find(c => c.name === name)) return col
  col.unshift({ name, topic, savedAt: Date.now() })
  localStorage.setItem(KEY, JSON.stringify(col.slice(0, 100)))
  return getCollection()
}

export function removeFromCollection(name) {
  const col = getCollection().filter(c => c.name !== name)
  localStorage.setItem(KEY, JSON.stringify(col))
  return col
}

export function isInCollection(name) {
  return getCollection().some(c => c.name === name)
}
