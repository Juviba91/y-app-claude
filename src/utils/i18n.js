const UI = {
  es: {
    // Home
    appTagline:        'Busca una obra, artista o movimiento',
    searchPlaceholder: 'La Joconda, Picasso, Impresionismo...',
    objective:         'Objetivo',
    recent:            'Recientes',
    // Topics
    topics: { 'Para Niños': 'Para Niños', 'Amateur': 'Amateur', 'Profesional': 'Profesional' },
    // Tabs
    tabSearch:   'Buscar',
    tabScan:     'Escanear',
    tabSettings: 'Ajustes',
    // Scan
    scanTitle:         'Escanear QR',
    scanSubtitle:      'Apunta al código QR de la obra',
    startScan:         'Iniciar escáner',
    stopScan:          'Detener',
    orType:            'o escribe el nombre',
    manualPlaceholder: 'Nombre de la obra o artista...',
    cameraError:       'No se pudo acceder a la cámara. Comprueba los permisos.',
    unsupported:       'Tu navegador no soporta el escáner. Usa el texto manual.',
    // Sentences
    overview:   'Vista general',
    deepDive:   'Profundizar',
    aboutLabel: 'Sobre:',
    loading:    'Consultando...',
    errorMsg:   'No se pudo generar la respuesta. Vuelve e inténtalo de nuevo.',
    back:       '← Volver',
    // Settings
    settingsTitle:    'Ajustes',
    languageLabel:    'Idioma',
    collectionTitle:  'Mi Colección',
    collectionEmpty:  'Marca obras con el marcador para guardarlas aquí.',
    statsTitle:       'Estadísticas',
    statSearches:     'Búsquedas',
    statSaved:        'Guardadas',
    clearHistory:     'Limpiar historial de búsqueda',
    aboutVersion:     'v2.0 · Impulsado por Claude AI',
    aboutDesc:        'Descubre el arte a tu ritmo. Escanea QRs en la galería, busca obras y artistas, y guarda tus favoritos.',
    // Museum
    museumVisitSite:  'Visitar sitio web',
    museumCollection: 'Obras en esta colección',
    museumIn:         'Disponible en',
    // Toast
    blockedMsg: '🚫 Contenido no permitido',
  },
  en: {
    // Home
    appTagline:        'Search artworks, artists or movements',
    searchPlaceholder: 'Mona Lisa, Picasso, Impressionism...',
    objective:         'Audience',
    recent:            'Recent',
    // Topics
    topics: { 'Para Niños': 'For Kids', 'Amateur': 'Amateur', 'Profesional': 'Professional' },
    // Tabs
    tabSearch:   'Search',
    tabScan:     'Scan',
    tabSettings: 'Settings',
    // Scan
    scanTitle:         'Scan QR',
    scanSubtitle:      'Point at the artwork\'s QR code',
    startScan:         'Start scanner',
    stopScan:          'Stop',
    orType:            'or type the name',
    manualPlaceholder: 'Artwork or artist name...',
    cameraError:       'Could not access camera. Check permissions.',
    unsupported:       'Your browser doesn\'t support the scanner. Use manual input.',
    // Sentences
    overview:   'Overview',
    deepDive:   'Deeper Dive',
    aboutLabel: 'About:',
    loading:    'Loading...',
    errorMsg:   'Could not generate response. Go back and try again.',
    back:       '← Back',
    // Settings
    settingsTitle:    'Settings',
    languageLabel:    'Language',
    collectionTitle:  'My Collection',
    collectionEmpty:  'Bookmark artworks to save them here.',
    statsTitle:       'Statistics',
    statSearches:     'Searches',
    statSaved:        'Saved',
    clearHistory:     'Clear search history',
    aboutVersion:     'v2.0 · Powered by Claude AI',
    aboutDesc:        'Discover art at your own pace. Scan QR codes in the gallery, search artworks and artists, and save your favourites.',
    // Museum
    museumVisitSite:  'Visit website',
    museumCollection: 'Works in this collection',
    museumIn:         'Available at',
    // Toast
    blockedMsg: '🚫 Content not allowed',
  },
}

export function t(lang, key) {
  return UI[lang]?.[key] ?? UI.es[key] ?? key
}

export function topicLabel(lang, topic) {
  return UI[lang]?.topics?.[topic] ?? topic
}
