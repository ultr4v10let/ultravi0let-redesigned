import { useId } from 'react'

/* The halo mark from design/brand/halo-mark-{light,dark}.svg. It appears six times on the page (header, the
   wordmark's zero, footer; a light and a dark copy each), so every gradient and filter id comes from useId(). */
type Stop = [offset: string, color: string, opacity: string]

const V = {
  light: {
    disc: [['0', '#FFFFFF', '1'], ['0.1', '#F2EEFF', '0.95'], ['0.3', '#A9A2DE', '0.9'], ['0.62', '#7F78CC', '0.95'], ['0.71', '#7068C4', '0.95'], ['0.76', '#9C95D8', '0.55'], ['0.9', '#D8D4EE', '0.18'], ['1', '#F5F4F9', '0']],
    line: [['0', '#7068C4', '0'], ['0.16', '#7068C4', '0.85'], ['0.34', '#FFFFFF', '0.95'], ['0.5', '#FFFFFF', '1'], ['0.66', '#FFFFFF', '0.95'], ['0.84', '#7068C4', '0.85'], ['1', '#7068C4', '0']],
    dog: [['0', '#FF3B4F', '0'], ['0.12', '#FF3B4F', '0.9'], ['0.3', '#FF8A3D', '0.95'], ['0.48', '#FFD66B', '0.95'], ['0.66', '#FFF6DC', '0.9'], ['1', '#E6F0FF', '0']],
    ring: '#FFFFFF', ringOpacity: '0.92', inner: '#FF6A5C', innerOpacity: '0.5',
  },
  dark: {
    disc: [['0', '#F4F6FF', '1'], ['0.1', '#C9CFF5', '0.9'], ['0.3', '#3A3278', '0.92'], ['0.62', '#221B54', '0.95'], ['0.71', '#1D1749', '0.95'], ['0.76', '#2A2360', '0.55'], ['0.9', '#1A1540', '0.2'], ['1', '#110E2A', '0']],
    line: [['0', '#8F88C9', '0'], ['0.16', '#8F88C9', '0.85'], ['0.34', '#E6EAFF', '0.95'], ['0.5', '#E6EAFF', '1'], ['0.66', '#E6EAFF', '0.95'], ['0.84', '#8F88C9', '0.85'], ['1', '#8F88C9', '0']],
    dog: [['0', '#FFB3A8', '0'], ['0.15', '#FFB3A8', '0.6'], ['0.4', '#FFE9D0', '0.7'], ['0.62', '#F2F4FF', '0.75'], ['1', '#DDE3FF', '0']],
    ring: '#E6EAFF', ringOpacity: '0.82', inner: '#FF9A8A', innerOpacity: '0.3',
  },
} satisfies Record<string, { disc: Stop[]; line: Stop[]; dog: Stop[]; ring: string; ringOpacity: string; inner: string; innerOpacity: string }>

const SUN: Stop[] = [['0', '#FFFFFF', '1'], ['0.35', '#FFFFFF', '0.6'], ['1', '#FFFFFF', '0']]

const stops = (list: Stop[]) => list.map(([o, c, a]) => <stop key={o} offset={o} stopColor={c} stopOpacity={a} />)

export function HaloMark({ variant }: { variant: 'light' | 'dark' }) {
  const v = V[variant]
  const id = useId()
  const [d, l, r, L, s, b, c] = ['d', 'l', 'r', 'L', 's', 'b', 'c'].map((k) => id + k)
  return (
    <svg className={variant === 'light' ? 'l-only' : 'd-only'} width="46" height="46" viewBox="0 0 46 46" aria-hidden="true" focusable="false" style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id={d} cx="0.5" cy="0.5" r="0.5">{stops(v.disc)}</radialGradient>
        <linearGradient id={l} gradientUnits="userSpaceOnUse" x1="1.55" y1="0" x2="44.45" y2="0">{stops(v.line)}</linearGradient>
        <linearGradient id={r}>{stops(v.dog)}</linearGradient>
        <linearGradient id={L} x1="1" y1="0" x2="0" y2="0">{stops(v.dog)}</linearGradient>
        <radialGradient id={s} cx="0.5" cy="0.5" r="0.5">{stops(SUN)}</radialGradient>
        <filter id={b} x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="0.9" /></filter>
        <filter id={c} x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="0.45" /></filter>
      </defs>
      <circle cx="23.0" cy="23.0" r="15.40" fill={`url(#${d})`} />
      <circle cx="23.0" cy="23.0" r="11.33" fill="none" stroke={v.ring} strokeWidth="3.52" opacity="0.35" filter={`url(#${b})`} />
      <circle cx="23.0" cy="23.0" r="11.33" fill="none" stroke={v.ring} strokeWidth="1.32" opacity={v.ringOpacity} />
      <circle cx="23.0" cy="23.0" r="10.50" fill="none" stroke={v.inner} strokeWidth="0.55" opacity={v.innerOpacity} />
      <rect x="1.55" y="22.45" width="42.90" height="1.10" fill={`url(#${l})`} />
      <ellipse cx="10.57" cy="23.0" rx="2.64" ry="2.20" fill={`url(#${L})`} filter={`url(#${c})`} />
      <ellipse cx="35.43" cy="23.0" rx="2.64" ry="2.20" fill={`url(#${r})`} filter={`url(#${c})`} />
      <circle cx="23.0" cy="23.0" r="4.62" fill={`url(#${s})`} />
      <circle cx="23.0" cy="23.0" r="1.65" fill="#FFFFFF" />
    </svg>
  )
}

/* The light and dark copies together; CSS (.l-only / .d-only) shows the one for the current theme. */
export function HaloMarks() {
  return (
    <>
      <HaloMark variant="light" />
      <HaloMark variant="dark" />
    </>
  )
}
