import { useLanguage } from '../contexts/language'
import { t } from '../utils/i18n'

export default function SkeletonCards() {
  const lang = useLanguage()
  return (
    <div>
      {[85, 65, 75, 60, 80].map((w, i) => (
        <div key={i} style={{
          background: '#FFFFFF', border: '1px solid #E8E5DF',
          borderRadius: '20px', padding: '22px 24px', marginBottom: '12px',
          animation: `fadeUp 0.35s ease ${i * 0.05}s both`,
        }}>
          <div style={{
            height: '16px', borderRadius: '6px', marginBottom: '12px', width: `${w}%`,
            background: 'linear-gradient(90deg,#EDEAE4 25%,#F5F2ED 50%,#EDEAE4 75%)',
            backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite',
          }} />
          <div style={{
            height: '16px', borderRadius: '6px', width: `${w - 20}%`,
            background: 'linear-gradient(90deg,#EDEAE4 25%,#F5F2ED 50%,#EDEAE4 75%)',
            backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite',
          }} />
        </div>
      ))}
      <p style={{
        textAlign: 'center', color: '#A0A09A',
        fontFamily: '-apple-system, sans-serif',
        fontSize: '13px', marginTop: '20px',
      }}>
        {t(lang, 'loading')}
      </p>
    </div>
  )
}
