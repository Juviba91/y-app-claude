export default function YLogo({ size = 40, color = '#fff' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline
        points="8,5 50,52 92,5"
        stroke={color}
        strokeWidth="13"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
      />
      <line
        x1="50" y1="52" x2="50" y2="105"
        stroke={color}
        strokeWidth="13"
        strokeLinecap="square"
      />
    </svg>
  )
}
