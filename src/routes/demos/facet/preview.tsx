import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { ArrowLeft, ExternalLink, Pencil } from 'lucide-react'
import { PortfolioPreview } from '../../../demos/facet/PortfolioPreview'
import { getFacetPortfolio, getFacetUser } from '../../../demos/facet/facet'
import type { FacetPortfolio } from '../../../demos/facet/facet'
import { FACET_SHELL, facetHead } from '../../../demos/facet/facet-shell'

export const Route = createFileRoute('/demos/facet/preview')({
  head: () => facetHead('/demos/facet/preview'),
  component: FacetPreviewPage,
})

function FacetPreviewPage() {
  const navigate = useNavigate()
  const [portfolio, setPortfolio] = useState<FacetPortfolio | null>(null)

  useEffect(() => {
    if (!getFacetUser()) {
      void navigate({ to: '/demos/facet/sign-in', replace: true })
      return
    }
    const p = getFacetPortfolio()
    if (!p) {
      void navigate({ to: '/demos/facet/dashboard', replace: true })
      return
    }
    setPortfolio(p)
  }, [navigate])

  if (!portfolio) {
    return (
      <div className="facet-loading facet-min-h-50vh" style={{ color: FACET_SHELL.inkMuted }}>
        Loading preview…
      </div>
    )
  }

  const slug = portfolio.name.toLowerCase().replace(/\s+/g, '-')

  return (
    <div>
      <div className="facet-preview-bar" style={{ borderColor: FACET_SHELL.border, background: FACET_SHELL.paperElevated }}>
        <div className="facet-preview-bar-in">
          <Link
            to="/demos/facet/build"
            search={{ field: portfolio.field }}
            className="facet-preview-back"
            style={{ color: FACET_SHELL.accent }}
          >
            <ArrowLeft size={14} />
            Back to editor
          </Link>
          <span className="facet-slug" style={{ color: FACET_SHELL.inkMuted, fontFamily: 'var(--facet-mono)' }}>
            {slug}.facet.app
          </span>
          <Link
            to="/demos/facet/build"
            search={{ field: portfolio.field }}
            className="facet-pill-outline-sm"
            style={{ borderColor: FACET_SHELL.border, color: FACET_SHELL.ink }}
          >
            <Pencil size={14} />
            Edit
          </Link>
        </div>
      </div>

      <PortfolioPreview data={portfolio} />

      <div
        className="facet-preview-foot"
        style={{ borderColor: FACET_SHELL.border, background: FACET_SHELL.dark, color: FACET_SHELL.darkText }}
      >
        <p className="facet-preview-note">
          This is a demo portfolio — in production, Facet publishes to a shareable subdomain.
        </p>
        <button type="button" className="facet-publish" style={{ background: FACET_SHELL.accent }}>
          <ExternalLink size={14} />
          Publish (demo)
        </button>
      </div>
    </div>
  )
}
