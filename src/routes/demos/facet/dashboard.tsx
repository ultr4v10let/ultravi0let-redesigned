import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { ArrowRight, LogOut, Pencil } from 'lucide-react'
import {
  FACET_FIELDS,
  FACET_THEMES,
  createDefaultPortfolio,
  getFacetPortfolio,
  getFacetUser,
  setFacetPortfolio,
  setFacetUser,
} from '../../../demos/facet/facet'
import type { FacetField, FacetUser } from '../../../demos/facet/facet'
import { FACET_SHELL, facetHead } from '../../../demos/facet/facet-shell'

export const Route = createFileRoute('/demos/facet/dashboard')({
  head: () => facetHead('/demos/facet/dashboard'),
  component: FacetDashboard,
})

function FacetDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState<FacetUser | null>(null)
  const [portfolioField, setPortfolioField] = useState<FacetField | null>(null)

  useEffect(() => {
    const u = getFacetUser()
    if (!u) {
      void navigate({ to: '/demos/facet/sign-in', replace: true })
      return
    }
    setUser(u)
    setPortfolioField(getFacetPortfolio()?.field ?? null)
  }, [navigate])

  function signOut() {
    setFacetUser(null)
    setFacetPortfolio(null)
    void navigate({ to: '/demos/facet' })
  }

  function startField(field: FacetField) {
    if (!user) return
    const existing = getFacetPortfolio()
    if (existing?.field === field) {
      void navigate({ to: '/demos/facet/build', search: { field } })
      return
    }
    setFacetPortfolio(createDefaultPortfolio(field, user.name))
    void navigate({ to: '/demos/facet/build', search: { field } })
  }

  if (!user) {
    return (
      <div className="facet-loading facet-min-h-40vh" style={{ color: FACET_SHELL.inkMuted }}>
        Loading…
      </div>
    )
  }

  return (
    <main className="facet-dash">
      <div className="facet-dash-top">
        <div>
          <p className="facet-dash-eyebrow" style={{ color: FACET_SHELL.sage, fontFamily: 'var(--facet-mono)' }}>
            Your studio
          </p>
          <h1 className="facet-text-3xl facet-mt-2" style={{ fontFamily: 'var(--facet-display)', color: FACET_SHELL.ink }}>
            Welcome, {user.name.split(' ')[0]}.
          </h1>
          <p className="facet-text-sm facet-mt-2" style={{ color: FACET_SHELL.inkMuted }}>
            {user.email}
          </p>
        </div>
        <button
          type="button"
          onClick={signOut}
          className="facet-pill-outline"
          style={{ borderColor: FACET_SHELL.border, color: FACET_SHELL.ink }}
        >
          <LogOut size={14} />
          Sign out
        </button>
      </div>

      {portfolioField && (
        <div
          className="facet-draft"
          style={{
            borderColor: `${FACET_SHELL.accent}44`,
            background: `${FACET_SHELL.accent}12`,
          }}
        >
          <div>
            <p className="facet-draft-title" style={{ color: FACET_SHELL.ink }}>
              Continue your draft
            </p>
            <p className="facet-text-sm facet-mt-1" style={{ color: FACET_SHELL.inkMuted }}>
              {FACET_FIELDS.find((f) => f.id === portfolioField)?.label} ·{' '}
              {FACET_THEMES[portfolioField].find((t) => t.id === getFacetPortfolio()?.theme)?.name} template
            </p>
          </div>
          <div className="facet-draft-actions">
            <Link
              to="/demos/facet/preview"
              className="facet-pill"
              style={{
                borderColor: FACET_SHELL.border,
                background: FACET_SHELL.paperElevated,
                color: FACET_SHELL.ink,
              }}
            >
              Preview
            </Link>
            <Link
              to="/demos/facet/build"
              search={{ field: portfolioField }}
              className="facet-pill-dark"
              style={{ background: FACET_SHELL.ink }}
            >
              <Pencil size={14} />
              Edit
            </Link>
          </div>
        </div>
      )}

      <h2 className="facet-dash-h2" style={{ color: FACET_SHELL.ink }}>
        Choose a field
      </h2>
      <p className="facet-text-sm facet-mt-2" style={{ color: FACET_SHELL.inkMuted }}>
        Each field includes tailored prompts and two visual templates.
      </p>

      <div className="facet-dash-grid">
        {FACET_FIELDS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => startField(f.id)}
            className="facet-dash-card"
            style={{
              borderColor: FACET_SHELL.border,
              background: FACET_SHELL.paperElevated,
            }}
          >
            <div className="facet-dash-icon" style={{ background: f.accent, fontFamily: 'var(--facet-mono)' }}>
              {f.icon}
            </div>
            <h3 className="facet-dash-card-title" style={{ color: FACET_SHELL.ink }}>
              {f.label}
            </h3>
            <p className="facet-text-sm facet-mt-2" style={{ color: FACET_SHELL.inkMuted }}>
              {f.desc}
            </p>
            <div className="facet-swatches">
              {FACET_THEMES[f.id].map((t) => (
                <span
                  key={t.id}
                  className="facet-swatch"
                  style={{ background: t.preview, borderColor: FACET_SHELL.border }}
                  title={t.name}
                />
              ))}
            </div>
            <span className="facet-open-builder" style={{ color: FACET_SHELL.accent }}>
              Open builder
              <ArrowRight size={14} />
            </span>
          </button>
        ))}
      </div>
    </main>
  )
}
