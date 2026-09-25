/* The maquette demo's layout. It lives outside the route file so the router's code splitting takes its fonts and
   stylesheet with it: CSS imported by a route file itself would load on every page of the site. */
import { Link, Outlet, useLocation } from '@tanstack/react-router'
import '@fontsource/barlow/400.css'
import '@fontsource/barlow/500.css'
import '@fontsource/barlow/600.css'
import '@fontsource/barlow/700.css'
import '@fontsource/barlow-condensed/600.css'
import '@fontsource/barlow-condensed/700.css'
import { NdaBanner } from '../NdaBanner'
import './maquette.css'

export function MaquetteLayout() {
  /* as Next did: from another page the hash link jumps, on the home page it follows the CSS (smooth) scroll */
  const onHome = useLocation({ select: (l) => l.pathname.replace(/\/$/, '') === '/demos/maquette' })
  return (
    <div className="demo maquette-root" style={{ background: '#14181F', color: '#E8EAED', fontFamily: 'var(--maq-sans)', minHeight: '100svh' }}>
      <NdaBanner tint="rgba(232,234,237,0.05)" ink="#E8EAED" border="rgba(232,234,237,0.1)" />
      <header className="maquette-header">
        <div className="maquette-header-in">
          <Link to="/demos/maquette" activeOptions={{ exact: true }} className="maquette-brand">
            <MaqMark />
            <span className="maquette-brand-name" style={{ fontFamily: 'var(--maq-display)' }}>
              Maquette
            </span>
          </Link>
          <nav className="maquette-nav">
            <Link to="/demos/maquette" hash="services" hashScrollIntoView={{ behavior: onHome ? 'auto' : 'instant' }} activeOptions={{ exact: true, includeHash: true }}>
              Services
            </Link>
            <Link to="/demos/maquette/orders">Orders</Link>
            <Link to="/demos/maquette/quote">Get quote</Link>
          </nav>
          <Link to="/demos/maquette/quote" className="maquette-new">
            New quote
          </Link>
        </div>
      </header>
      <Outlet />
    </div>
  )
}

function MaqMark() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden>
      <rect x="2" y="2" width="26" height="26" fill="#F97316" opacity="0.15" />
      <rect x="2" y="2" width="26" height="26" fill="none" stroke="#F97316" strokeWidth="1.5" />
      <path d="M6 22 L15 8 L24 22 Z" fill="none" stroke="#F97316" strokeWidth="1.8" />
    </svg>
  )
}
