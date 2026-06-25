const KEY = 'artgallery_history'

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') }
  catch { return [] }
}

function save(arr) {
  localStorage.setItem(KEY, JSON.stringify(arr))
}

export function getHistory() {
  return load()
}

export function addToHistory(word) {
  const arr = [
    word,
    ...load().filter(w => w.toLowerCase() !== word.toLowerCase()),
  ].slice(0, 30)
  save(arr)
  return arr
}

export function clearHistory() {
  localStorage.removeItem(KEY)
}
