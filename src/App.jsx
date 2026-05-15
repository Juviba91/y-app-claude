import { useState } from 'react'
import { TOPIC_ACCENT } from './constants'
import { callClaude } from './api/claude'
import { getHistory, addToHistory, clearHistory } from './utils/history'
import TabBar from './components/TabBar'
import HomeScreen from './screens/HomeScreen'
import SentencesScreen from './screens/SentencesScreen'
import TrendingScreen from './screens/TrendingScreen'
import SettingsScreen from './screens/SettingsScreen'

export default function App() {
  const [tab, setTab]                 = useState('search')
  const [screen, setScreen]           = useState('home')
  const [topic, setTopic]             = useState('General')
  const [history, setHistory]         = useState([])
  const [trending, setTrending]       = useState([])
  const [trendingLoaded, setTrendingLoaded] = useState(false)
  const [trendingLoading, setTrendingLoading] = useState(false)
  const [navStack, setNavStack]       = useState([])

  const currentNav = navStack[navStack.length - 1]
  const trail      = navStack.map(n => n.label)
  const accent     = TOPIC_ACCENT[topic]

  // ─── TRENDING ───────────────────────────────────────────────────────────────
  const loadTrending = async () => {
    if (trendingLoaded) return
    setTrendingLoading(true)
    try {
      const raw = await callClaude(
        `List exactly 5 words or concepts currently prominent in global news, culture, science, or geopolitics.
For each provide a factual context (max 12 words).
Return ONLY exactly 5 lines: WORD | context`
      )
      const lines = raw.split('\n').map(l => l.trim()).filter(l => l.includes('|'))
      const items = lines.slice(0, 5).map(l => {
        const idx = l.indexOf('|')
        return {
          word:    l.slice(0, idx).trim().replace(/^\d+[\.\)]\s*/, ''),
          context: l.slice(idx + 1).trim(),
        }
      }).filter(item => item.word.length > 0)
      if (items.length >= 2) setTrending(items)
    } catch (e) {
      console.error(e)
    }
    setTrendingLoaded(true)
    setTrendingLoading(false)
  }

  // ─── NAVIGATION ─────────────────────────────────────────────────────────────
  const goToWord = (word) => {
    const w = word.trim()
    if (!w) return
    addToHistory(w)
    setHistory([...getHistory()])
    setNavStack([{ type: 'word', subject: w, word: w, label: w }])
    setScreen('sentences')
    setTab('search')
  }

  const goDeeper = (sentence) => {
    const rootWord = navStack[0]?.word || ''
    setNavStack(prev => [...prev, {
      type: 'sentence', subject: sentence, word: rootWord, label: sentence,
    }])
  }

  const goBack = () => {
    if (navStack.length <= 1) { setNavStack([]); setScreen('home') }
    else setNavStack(prev => prev.slice(0, -1))
  }

  const handleTab = (t) => {
    setTab(t)
    if (t === 'search') { setScreen('home'); setNavStack([]) }
  }

  const activeTab = screen === 'sentences' ? 'search' : tab

  return (
    <div style={{ minHeight: '100vh', background: '#000', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        flex: 1, maxWidth: '680px', width: '100%', margin: '0 auto',
        paddingBottom: '90px', display: 'flex', flexDirection: 'column',
      }}>

        {tab === 'search' && screen === 'home' && (
          <HomeScreen
            topic={topic} setTopic={setTopic}
            onSearch={goToWord}
            history={history} onHistoryWord={goToWord}
          />
        )}

        {tab === 'search' && screen === 'sentences' && currentNav && (
          <SentencesScreen
            key={currentNav.subject + topic}
            subject={currentNav.subject}
            word={currentNav.word}
            topic={topic}
            trail={trail}
            onBack={goBack}
            onTapSentence={goDeeper}
            isSentence={currentNav.type === 'sentence'}
          />
        )}

        {tab === 'trending' && (
          <TrendingScreen
            onSelect={goToWord}
            topic={topic}
            trending={trending}
            loading={trendingLoading}
            onLoad={loadTrending}
          />
        )}

        {tab === 'settings' && (
          <SettingsScreen
            topic={topic} setTopic={setTopic}
            history={history}
            onClearHistory={() => { clearHistory(); setHistory([]) }}
          />
        )}

      </div>

      <TabBar activeTab={activeTab} onTab={handleTab} />
    </div>
  )
}
