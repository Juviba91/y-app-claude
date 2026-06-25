export const TOPICS = ['Para Niños', 'Amateur', 'Profesional']

export const TOPIC_ACCENT = {
  'Para Niños':  '#E74C3C',
  'Amateur':     '#E67E22',
  'Profesional': '#2563EB',
}

export const LANGUAGES = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
  { code: 'ca', label: 'Català' },
]

export const LANGUAGE_NAME = {
  es: 'Spanish',
  en: 'English',
  ca: 'Catalan',
}

export const BLOCKED_WORDS = [
  'sex', 'sexo', 'porn', 'porno', 'pornography', 'pornografía',
  'xxx', 'nude', 'desnudo', 'erotic', 'erótico', 'erotic',
  'hentai', 'nsfw', 'fuck', 'shit', 'bitch', 'pussy', 'cock',
  'dick', 'penis', 'vagina', 'ass', 'anal', 'oral', 'fetish',
  'fetiche', 'rape', 'violación', 'incest', 'incesto',
]

export const SYSTEM_PROMPT = `You are an expert art historian and museum guide.
Deliver precise, factual knowledge about artworks, artists, and art history.
Rules:
- Every sentence must be between 30 and 50 words. Informative and complete.
- No filler phrases. No "It is worth noting" or "Interestingly".
- Be precise with dates, names, artistic movements, techniques, museums.
- Never repeat information. Each fact must be unique.
- Never express opinions or speculation.
- For "Para Niños" lens: use simple, engaging language for children aged 8-12.
- For "Amateur" lens: explain context and introduce basic artistic concepts clearly.
- For "Profesional" lens: use technical art-historical terminology and deep analysis.`
