import { SearchIcon, ScanIcon, SettingsIcon, FeedbackIcon, TrendingIcon } from './Icons'
import { useLanguage } from '../contexts/language'
import { t } from '../utils/i18n'

export default function TabBar({ activeTab, onTab }) {
  const lang = useLanguage()

  const TABS = [
    { id: 'search',   label: t(lang, 'tabSearch'),   Icon: SearchIcon },
    { id: 'trending', label: t(lang, 'tabTrending'), Icon: TrendingIcon },
    { id: 'scan',     label: t(lang, 'tabScan'),     Icon: ScanIcon },
    { id: 'feedback', label: t(lang, 'tabFeedback'), Icon: FeedbackIcon },
    { id: 'settings', label: t(lang, 'tabSettings'), Icon: SettingsIcon },
  ]

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
      background: '#FFFFFFee', backdropFilter: 'blur(20px)',
      borderTop: '1px solid #EBEBEB',
      paddingBottom: 'env(safe-area-inset-bottom, 8px)',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-around',
        maxWidth: '680px', margin: '0 auto', padding: '10px 0 4px',
      }}>
        {TABS.map(({ id, label, Icon }) => {
          const active = activeTab === id
          return (
            <button
              key={id}
              onClick={() => onTab(id)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '4px', padding: '4px 12px',
              }}
            >
              <Icon active={active} />
              <span style={{
                fontFamily: '-apple-system, sans-serif', fontSize: '10px',
                color: active ? '#111111' : '#BBBBBB',
                fontWeight: active ? '600' : '400',
              }}>
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
