export const TOPICS = ['Para Niños', 'Amateur', 'Profesional']

export const TOPIC_ACCENT = {
  'Para Niños':  '#E74C3C',
  'Amateur':     '#E67E22',
  'Profesional': '#2563EB',
}

export const LANGUAGES = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
]

export const LANGUAGE_NAME = {
  es: 'Spanish',
  en: 'English',
}

// All terms are matched as word-boundary prefixes (porn → pornography, sex → sexual, etc.)
export const BLOCKED_WORDS = [
  // English
  'sex', 'porn', 'xxx', 'nude', 'naked', 'nudity', 'erotic', 'hentai',
  'nsfw', 'fuck', 'shit', 'bitch', 'pussy', 'cock', 'dick', 'penis',
  'vagina', 'vulva', 'ass', 'anal', 'fetish', 'rape', 'incest',
  'masturbat', 'orgasm', 'ejaculat', 'cum', 'boob', 'tit', 'nipple',
  'clitoris', 'clit', 'dildo', 'vibrator', 'prostitut', 'whore',
  'slut', 'horny', 'kinky', 'bondage', 'bdsm', 'blowjob', 'handjob',
  'rimjob', 'rimming', 'sexting', 'stripper', 'onlyfans', 'camgirl',
  'threesome', 'foursome', 'gangbang', 'creampie', 'squirt', 'milf',
  'groping', 'molest', 'pervert', 'predator',
  // Spanish
  'sexo', 'follar', 'joder', 'coño', 'polla', 'pene', 'vagina', 'vulva',
  'culo', 'fetiche', 'violaci', 'incesto', 'masturb', 'orgasmo',
  'eyaculaci', 'correrse', 'tetas', 'pezón', 'clítoris', 'clitoris',
  'dildo', 'vibrador', 'prostitut', 'puta', 'zorra', 'guarra', 'perra',
  'caliente', 'bondage', 'bdsm', 'mamada', 'pajear', 'sexting',
  'desnud', 'erótic', 'pornografi', 'putón', 'furcia', 'travesti',
  'escort', 'prepago', 'lencería', 'porno',
]

export const SYSTEM_PROMPT = `You are an expert art historian and museum guide.
Deliver precise, factual knowledge about artworks, artists, and art history.
Rules:
- Every sentence must be between 22 and 30 words. Informative and complete.
- No filler phrases. No "It is worth noting" or "Interestingly".
- Be precise with dates, names, artistic movements, techniques, museums.
- Never repeat information. Each fact must be unique.
- Never express opinions or speculation.
- For "Para Niños" lens: use simple, engaging language for children aged 8-12.
- For "Amateur" lens: explain context and introduce basic artistic concepts clearly.
- For "Profesional" lens: use technical art-historical terminology and deep analysis.`
