export default function SkeletonCards() {
  return (
    <div>
      {[85, 65, 75, 60, 80].map((w, i) => (
        <div key={i} style={{
          background: '#1C1C1E',
          borderRadius: '20px',
          padding: '22px 24px',
          marginBottom: '12px',
          animation: `fadeUp 0.35s ease ${i * 0.05}s both`,
        }}>
          <div style={{
            height: '18px', borderRadius: '6px', marginBottom: '12px',
            width: `${w}%`,
            background: 'linear-gradient(90deg,#2C2C2E 25%,#3A3A3C 50%,#2C2C2E 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.4s infinite',
          }} />
          <div style={{
            height: '18px', borderRadius: '6px',
            width: `${w - 20}%`,
            background: 'linear-gradient(90deg,#2C2C2E 25%,#3A3A3C 50%,#2C2C2E 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.4s infinite',
          }} />
        </div>
      ))}
      <p style={{
        textAlign: 'center', color: '#555',
        fontFamily: '-apple-system, sans-serif',
        fontSize: '13px', marginTop: '20px',
      }}>
        Generating...
      </p>
    </div>
  )
}
