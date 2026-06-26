import { useState, useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { track } from './utils/analyticsDB'
import { LanguageContext } from './contexts/language'
import { t } from './utils/i18n'
import { getHistory, addToHistory, clearHistory } from './utils/history'
import { isBlocked } from './utils/filter'
import TabBar from './components/TabBar'
import HomeScreen from './screens/HomeScreen'
import SentencesScreen from './screens/SentencesScreen'
import ScanScreen from './screens/ScanScreen'
import SettingsScreen from './screens/SettingsScreen'

export default function App() {
  const [tab, setTab]       = useState('search')
  const [screen, setScreen] = useState('home')
  const [topic, setTopic]   = useState('Amateur')
  const [language, setLanguage] = useState(() => localStorage.getItem('artlang') || 'es')
  const [history, setHistory] = useState(() => getHistory())
  const [navStack, setNavStack] = useState([])
  const [blockedMsg, setBlockedMsg] = useState(false)

  const currentNav = navStack[navStack.length - 1]
  const trail      = navStack.map(n => n.label)

  // ─── NAVIGATION ─────────────────────────────────────────────────────────────
  const goToWord = (word, source = 'search') => {
    const w = word.trim()
    if (!w) return
    if (isBlocked(w)) {
      setBlockedMsg(true)
      setTimeout(() => setBlockedMsg(false), 3000)
      track('search_blocked', { term: w })
      return
    }
    track('artwork_search', { artwork: w, topic, source })
    addToHistory(w)
    setHistory([...getHistory()])
    setNavStack([{ type: 'word', subject: w, word: w, label: w }])
    setScreen('sentences')
    setTab('search')
  }

  const goDeeper = (sentence) => {
    const rootWord = navStack[0]?.word || ''
    track('dive_deeper', { artwork: rootWord, topic })
    setNavStack(prev => [...prev, {
      type: 'sentence', subject: sentence, word: rootWord, label: sentence,
    }])
  }

  const goBack = () => {
    if (navStack.length <= 1) { setNavStack([]); setScreen('home') }
    else setNavStack(prev => prev.slice(0, -1))
  }

  // Only reset to home when already on the search tab
  const handleTab = (t) => {
    track('tab_change', { tab: t })
    setTab(t)
    if (t === 'search' && tab === 'search') {
      setScreen('home')
      setNavStack([])
    }
  }

  const handleSetTopic = (t) => {
    track('topic_change', { topic: t })
    setTopic(t)
  }

  const handleSetLanguage = (lang) => {
    localStorage.setItem('artlang', lang)
    track('language_change', { language: lang })
    setLanguage(lang)
  }

  // Read ?obra= on first load so QR codes can deep-link directly to an artwork
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const obra = params.get('obra')
    if (obra) {
      window.history.replaceState(null, '', window.location.pathname)
      goToWord(obra.trim(), 'qr_url')
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const activeTab = screen === 'sentences' ? 'search' : tab

  return (
    <LanguageContext.Provider value={language}>
      <div style={{ minHeight: '100vh', background: '#FFFFFF', display: 'flex', flexDirection: 'column' }}>
        <Analytics />

        {/* Blocked word toast */}
        {blockedMsg && (
          <div style={{
            position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
            background: '#111111', color: '#fff', borderRadius: '14px',
            padding: '12px 20px', zIndex: 999, fontSize: '14px',
            fontFamily: '-apple-system, sans-serif', fontWeight: '500',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            animation: 'fadeUp 0.3s ease', whiteSpace: 'nowrap',
          }}>
            {t(language, 'blockedMsg')}
          </div>
        )}

        <div style={{
          flex: 1, maxWidth: '680px', width: '100%', margin: '0 auto',
          paddingBottom: '90px', display: 'flex', flexDirection: 'column',
        }}>

          {tab === 'search' && screen === 'home' && (
            <HomeScreen
              topic={topic} setTopic={handleSetTopic}
              onSearch={goToWord}
              history={history} onHistoryWord={(w) => goToWord(w, 'history')}
            />
          )}

          {tab === 'search' && screen === 'sentences' && currentNav && (
            <SentencesScreen
              key={currentNav.subject + topic + language}
              subject={currentNav.subject}
              word={currentNav.word}
              topic={topic}
              language={language}
              trail={trail}
              onBack={goBack}
              onTapSentence={goDeeper}
              isSentence={currentNav.type === 'sentence'}
            />
          )}

          {tab === 'scan' && (
            <ScanScreen onScan={(w) => goToWord(w, 'qr_scan')} />
          )}

          {tab === 'settings' && (
            <SettingsScreen
              topic={topic} setTopic={handleSetTopic}
              language={language} setLanguage={handleSetLanguage}
              history={history}
              onClearHistory={() => { clearHistory(); setHistory([]) }}
              onSelectArtwork={(w) => goToWord(w, 'collection')}
            />
          )}

        </div>

        <TabBar activeTab={activeTab} onTab={handleTab} />
      </div>
    </LanguageContext.Provider>
  )
}
