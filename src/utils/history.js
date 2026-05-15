let memHistory = []

export function getHistory() {
  return memHistory
}

export function addToHistory(word) {
  memHistory = [
    word,
    ...memHistory.filter(w => w.toLowerCase() !== word.toLowerCase()),
  ].slice(0, 30)
}

export function clearHistory() {
  memHistory = []
}
