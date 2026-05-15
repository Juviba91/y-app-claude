import { SearchIcon, TrendingIcon, SettingsIcon } from './Icons'

const TABS = [
  { id: 'search',   label: 'Search',   Icon: SearchIcon },
  { id: 'trending', label: 'Trending', Icon: TrendingIcon },
  { id: 'settings', label: 'Settings', Icon: SettingsIcon },
]

export default function TabBar({ activeTab, onTab }) {
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
      background: '#111113f8', backdropFilter: 'blur(20px)',
      borderTop: '1px solid #2C2C2E',
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
                alignItems: 'center', gap: '4px', padding: '4px 20px',
              }}
            >
              <Icon active={active} />
              <span style={{
                fontFamily: '-apple-system, sans-serif',
                fontSize: '10px',
                color: active ? '#fff' : '#555',
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
