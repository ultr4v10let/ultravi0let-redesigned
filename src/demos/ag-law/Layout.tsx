/* The ag-law demo's layout. It lives outside the route file so the router's code splitting takes its fonts and
   stylesheet with it: CSS imported by a route file itself would load on every page of the site. */
import { useEffect } from 'react'
import { Link, Outlet, useRouter } from '@tanstack/react-router'
import '@fontsource-variable/cormorant-garamond/wght.css'
import '@fontsource-variable/cormorant-garamond/wght-italic.css'
import '@fontsource-variable/inter/wght.css'
import { NdaBanner } from '../NdaBanner'
import { exact } from './link'
import './ag-law.css'

export function AgLawLayout() {
  const router = useRouter()
  /* Scroll on navigation as the original (Next 14) did: only a same-page anchor glides; any other link jumps, and
     stays put when the new page's top edge is already on screen. TanStack's reset otherwise follows the site's
     html{scroll-behavior:smooth}. The router scrolls in its own onRendered listener, which runs before ours. */
  useEffect(() => {
    const html = document.documentElement
    let from: number | null = null
    const offBefore = router.subscribe('onBeforeNavigate', (e) => {
      if (e.toLocation.hash && !e.pathChanged) return
      html.style.scrollBehavior = 'auto'
      from = window.scrollY
    })
    const offAfter = router.subscribe('onRendered', (e) => {
      const top = document.getElementById('main')?.getBoundingClientRect().top
      if (from !== null && !e.toLocation.hash && top !== undefined && top >= from && top - from <= html.clientHeight) {
        window.scrollTo(0, from)
      }
      html.style.scrollBehavior = ''
      from = null
    })
    return () => {
      offBefore()
      offAfter()
      html.style.scrollBehavior = ''
    }
  }, [router])

  return (
    <div
      className="demo aglaw-root"
      style={{
        background: '#F6F1E6',
        color: '#0F1A33',
        fontFamily: 'var(--agl-sans)',
        minHeight: '100svh',
      }}
    >
      <NdaBanner tint="rgba(15,26,51,0.04)" ink="#0F1A33" border="rgba(15,26,51,0.1)" />
      <AglNav />
      <Outlet />
      <AglFooter />
    </div>
  )
}

function AglNav() {
  return (
    <header className="aglaw-nav">
      <div className="aglaw-nav-in">
        <Link {...exact} to="/demos/ag-law" className="aglaw-brand">
          <Crest />
          <span className="aglaw-brand-name" style={{ fontFamily: 'var(--agl-display)', color: '#0F1A33' }}>
            Abdelgawad &amp; Partners
          </span>
        </Link>
        <nav className="aglaw-nav-links">
          <Link {...exact} to="/demos/ag-law" hash="practice" className="aglaw-nav-link aglaw-tc">
            Practice
          </Link>
          <Link {...exact} to="/demos/ag-law/attorneys" className="aglaw-nav-link aglaw-tc">
            Attorneys
          </Link>
          <Link {...exact} to="/demos/ag-law" hash="insights" className="aglaw-nav-link aglaw-tc">
            Insights
          </Link>
        </nav>
        <Link {...exact} to="/demos/ag-law/book" className="aglaw-nav-cta aglaw-tc">
          Request a consultation
        </Link>
      </div>
    </header>
  )
}

function AglFooter() {
  return (
    <footer className="aglaw-footer">
      <div className="aglaw-footer-in">
        <div>
          <div className="aglaw-brand">
            <Crest light />
            <span className="aglaw-footer-name" style={{ fontFamily: 'var(--agl-display)' }}>
              Abdelgawad &amp; Partners
            </span>
          </div>
          <p className="aglaw-footer-p">
            Counsel of distinction. Established Cairo 1986. Recognised in Chambers Global Band 1 for Corporate &amp;
            M&amp;A.
          </p>
        </div>
        <div className="aglaw-footer-col">
          <div className="aglaw-footer-h">Cairo office</div>
          12 Mohammed Mazhar St.
          <br />
          Zamalek, Cairo 11211
          <br />
          Arab Republic of Egypt
        </div>
        <div className="aglaw-footer-col">
          <div className="aglaw-footer-h">Correspondence</div>
          chambers@aglaw.demo
          <br />
          Mon — Thu · 09:00 — 18:00
          <br />
          Sat · By appointment only
        </div>
      </div>
      <div className="aglaw-footer-bar">© Abdelgawad &amp; Partners · Bar Association of Egypt</div>
    </footer>
  )
}

function Crest({ light }: { light?: boolean }) {
  const ink = light ? '#F6F1E6' : '#0F1A33'
  const gold = '#B89466'
  return (
    <svg width="28" height="34" viewBox="0 0 28 34" aria-hidden>
      <path d="M14 1 L26 6 V18 C26 25 20 31 14 33 C8 31 2 25 2 18 V6 Z" fill="none" stroke={ink} strokeWidth="1.4" />
      <path
        d="M14 7 L20 9.5 V18 C20 22.5 17 26 14 27 C11 26 8 22.5 8 18 V9.5 Z"
        fill={gold}
        opacity="0.18"
        stroke={gold}
        strokeWidth="1"
      />
      <text x="14" y="20" textAnchor="middle" fontFamily="serif" fontStyle="italic" fontSize="9" fill={ink}>
        AG
      </text>
    </svg>
  )
}
