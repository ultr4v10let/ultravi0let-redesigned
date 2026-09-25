import { Link, useLocation } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { getFacetPortfolio, getFacetUser } from './facet'
import { FACET_SHELL } from './facet-shell'

export function FacetHeader() {
  const [userName, setUserName] = useState<string | null>(null)
  const [hasPortfolio, setHasPortfolio] = useState(false)
  /* as Next did: on the home page a hash link follows the CSS (smooth) scroll, from another page it jumps */
  const onHome = useLocation({ select: (l) => l.pathname.replace(/\/$/, '') === '/demos/facet' })
  const hashScroll = { behavior: onHome ? 'auto' : 'instant' } as const

  useEffect(() => {
    function sync() {
      setUserName(getFacetUser()?.name ?? null)
      setHasPortfolio(!!getFacetPortfolio())
    }
    sync()
    window.addEventListener('facet-auth', sync)
    window.addEventListener('facet-portfolio', sync)
    return () => {
      window.removeEventListener('facet-auth', sync)
      window.removeEventListener('facet-portfolio', sync)
    }
  }, [])

  return (
    <header
      className="facet-header"
      style={{
        borderColor: FACET_SHELL.border,
        background: `${FACET_SHELL.paperElevated}e6`,
      }}
    >
      <div className="facet-header-in">
        <Link to="/demos/facet" activeOptions={{ exact: true }} className="facet-brand">
          <FacetMark />
          <span
            className="facet-wordmark"
            style={{ fontFamily: 'var(--facet-display)', color: FACET_SHELL.ink }}
          >
            facet
          </span>
        </Link>
        <nav className="facet-nav">
          <Link
            to="/demos/facet"
            hash="fields"
            hashScrollIntoView={hashScroll}
            activeOptions={{ exact: true, includeHash: true }}
            className="facet-nav-link"
            style={{ color: `${FACET_SHELL.ink}B3` }}
          >
            Fields
          </Link>
          <Link
            to="/demos/facet"
            hash="how"
            hashScrollIntoView={hashScroll}
            activeOptions={{ exact: true, includeHash: true }}
            className="facet-nav-link"
            style={{ color: `${FACET_SHELL.ink}B3` }}
          >
            How it works
          </Link>
          {userName ? (
            <Link
              to="/demos/facet/dashboard"
              className="facet-nav-link"
              style={{ color: `${FACET_SHELL.ink}B3` }}
            >
              Dashboard
            </Link>
          ) : null}
        </nav>
        <div className="facet-header-actions">
          {userName ? (
            <>
              {hasPortfolio && (
                <Link
                  to="/demos/facet/preview"
                  className="facet-header-preview"
                  style={{
                    borderColor: FACET_SHELL.border,
                    background: FACET_SHELL.paperElevated,
                    color: FACET_SHELL.ink,
                  }}
                >
                  Preview
                </Link>
              )}
              <Link
                to="/demos/facet/dashboard"
                className="facet-header-studio"
                style={{ background: FACET_SHELL.ink }}
              >
                <span
                  className="facet-avatar"
                  style={{
                    background: `${FACET_SHELL.sage}55`,
                    color: FACET_SHELL.darkText,
                  }}
                >
                  {userName.charAt(0).toUpperCase()}
                </span>
                Studio
              </Link>
            </>
          ) : (
            <Link
              to="/demos/facet/sign-in"
              className="facet-header-signin"
              style={{ background: FACET_SHELL.accent }}
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

function FacetMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden>
      <rect x="2" y="2" width="11" height="11" rx="2" fill={FACET_SHELL.accent} opacity="0.95" />
      <rect x="15" y="2" width="11" height="11" rx="2" fill={FACET_SHELL.sage} opacity="0.85" />
      <rect x="2" y="15" width="11" height="11" rx="2" fill={FACET_SHELL.sage} opacity="0.5" />
      <rect x="15" y="15" width="11" height="11" rx="2" fill={FACET_SHELL.accent} opacity="0.35" />
    </svg>
  )
}
