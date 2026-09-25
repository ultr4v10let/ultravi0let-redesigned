/* The merlin demo's layout. It lives outside the route file so the router's code splitting takes its fonts and
   stylesheet with it: CSS imported by a route file itself would load on every page of the site. */
import { Link, Outlet } from '@tanstack/react-router'
import '@fontsource-variable/dm-sans/wght.css'
import '@fontsource-variable/fraunces/wght.css'
import '@fontsource-variable/fraunces/wght-italic.css'
import { NdaBanner } from '../NdaBanner'
import './merlin.css'

const nav = [
  { l: 'Platform', to: '/demos/merlin', hash: 'platform' },
  { l: 'Editor', to: '/demos/merlin/editor' },
  { l: 'Live preview', to: '/demos/merlin/preview' },
] as const

export function MerlinLayout() {
  return (
    <div className="demo merlin-root" style={{ background: '#F4F6FB', color: '#0F1729', fontFamily: 'var(--mly-sans)', minHeight: '100svh' }}>
      <NdaBanner tint="rgba(15,23,41,0.04)" ink="#0F1729" border="rgba(15,23,41,0.1)" />
      <header className="merlin-header">
        <div className="merlin-header-in">
          <Link to="/demos/merlin" className="merlin-brand">
            <MlyMark />
            <span style={{ fontFamily: 'var(--mly-display)' }}>merlin</span>
          </Link>
          <nav className="merlin-nav" aria-label="Merlin">
            {nav.map((i) => (
              <Link key={i.l} to={i.to} hash={'hash' in i ? i.hash : undefined}>
                {i.l}
              </Link>
            ))}
          </nav>
          <Link to="/demos/merlin/editor" className="merlin-cta">
            Open editor
          </Link>
        </div>
      </header>
      <Outlet />
    </div>
  )
}

function MlyMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden>
      <rect x="2" y="2" width="24" height="24" rx="7" fill="#3B5BDB" opacity="0.15" stroke="#3B5BDB" strokeWidth="1.5" />
      <path d="M8 18 L14 8 L20 18 Z" fill="none" stroke="#3B5BDB" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  )
}
