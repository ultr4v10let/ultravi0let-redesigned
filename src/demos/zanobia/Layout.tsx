/* The zanobia demo's layout. It lives outside the route file so the router's code splitting takes its fonts and
   stylesheet with it: CSS imported by a route file itself would load on every page of the site. */
import { Link, Outlet } from '@tanstack/react-router'
import '@fontsource-variable/cormorant-garamond/wght.css'
import '@fontsource-variable/source-sans-3/wght.css'
import { NdaBanner } from '../NdaBanner'
import './zanobia.css'

const NAV = [
  { l: 'Overview', h: '/demos/zanobia' },
  { l: 'Inventory', h: '/demos/zanobia/inventory' },
  { l: 'Production', h: '/demos/zanobia/production' },
  { l: 'Shops', h: '/demos/zanobia/shops' },
  { l: 'Admin', h: '/demos/zanobia/admin' },
] as const

export function ZanobiaLayout() {
  return (
    <div className="demo zanobia-root" style={{ background: '#FBF6F0', color: '#3D2A24', fontFamily: 'var(--zan-sans)', minHeight: '100svh' }}>
      <NdaBanner tint="rgba(61,42,36,0.05)" ink="#3D2A24" border="rgba(61,42,36,0.12)" />
      <div className="zanobia-shell">
        <aside className="zanobia-side">
          <Link to="/demos/zanobia" className="zanobia-brand">
            <ZanMark />
            <div>
              <div className="zanobia-brand-name" style={{ fontFamily: 'var(--zan-display)' }}>
                Zanobia
              </div>
              <div className="zanobia-brand-sub">Patisserie Ops</div>
            </div>
          </Link>
          <nav className="zanobia-side-nav">
            {NAV.map((i) => (
              <Link key={i.l} to={i.h} className="zanobia-side-link">
                {i.l}
              </Link>
            ))}
          </nav>
          <div className="zanobia-side-foot">Factory · 4 retail shops · HQ admin</div>
        </aside>
        <div className="zanobia-col">
          <header className="zanobia-topbar">
            <Link to="/demos/zanobia" className="zanobia-topbar-brand">
              <ZanMark />
              <span className="zanobia-semibold" style={{ fontFamily: 'var(--zan-display)' }}>
                Zanobia
              </span>
            </Link>
            <nav className="zanobia-topbar-nav">
              {NAV.slice(1, 4).map((i) => (
                <Link key={i.l} to={i.h} className="zanobia-topbar-link">
                  {i.l}
                </Link>
              ))}
            </nav>
          </header>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

function ZanMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden>
      <circle cx="14" cy="14" r="12" fill="#C9A87C" opacity="0.2" stroke="#C9A87C" strokeWidth="1.5" />
      <path d="M8 16 Q14 8 20 16" fill="none" stroke="#8B5E4B" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
