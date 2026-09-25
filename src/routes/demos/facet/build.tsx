import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { ArrowLeft, Eye, Save } from 'lucide-react'
import { GalleryImageUploader, ProfileImageUploader } from '../../../demos/facet/ImageUploaders'
import { PortfolioPreview } from '../../../demos/facet/PortfolioPreview'
import {
  FACET_FIELD_CONFIG,
  FACET_THEMES,
  createDefaultPortfolio,
  getFacetPortfolio,
  getFacetUser,
  normalizePortfolio,
  setFacetPortfolio,
} from '../../../demos/facet/facet'
import type { FacetField, FacetPortfolio } from '../../../demos/facet/facet'
import { FACET_SHELL, facetHead } from '../../../demos/facet/facet-shell'

export const Route = createFileRoute('/demos/facet/build')({
  validateSearch: (search: Record<string, unknown>): { field?: string } =>
    typeof search.field === 'string' && search.field ? { field: search.field } : {},
  head: () => facetHead('/demos/facet/build'),
  component: FacetBuilder,
})

const isField = (f: string | undefined): f is FacetField => !!f && Object.hasOwn(FACET_FIELD_CONFIG, f)

const labelStyle = { color: FACET_SHELL.inkMuted, fontFamily: 'var(--facet-mono)' }
const inputStyle = { borderColor: FACET_SHELL.border, background: FACET_SHELL.paper, color: FACET_SHELL.ink }

function FacetBuilder() {
  const navigate = useNavigate()
  const { field } = Route.useSearch()
  const fieldParam = isField(field) ? field : null

  const [portfolio, setPortfolio] = useState<FacetPortfolio | null>(null)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  useEffect(() => {
    const user = getFacetUser()
    if (!user) {
      void navigate({ to: '/demos/facet/sign-in', replace: true })
      return
    }
    if (!fieldParam) {
      void navigate({ to: '/demos/facet/dashboard', replace: true })
      return
    }

    const existing = getFacetPortfolio()
    if (existing?.field === fieldParam) {
      setPortfolio(normalizePortfolio(existing))
    } else {
      setPortfolio(createDefaultPortfolio(fieldParam, user.name))
    }
  }, [navigate, fieldParam])

  if (!portfolio || !fieldParam) {
    return (
      <div className="facet-loading facet-min-h-50vh" style={{ color: FACET_SHELL.inkMuted }}>
        Loading studio…
      </div>
    )
  }

  const config = FACET_FIELD_CONFIG[fieldParam]
  const themes = FACET_THEMES[fieldParam]

  function update<TKey extends keyof FacetPortfolio>(key: TKey, value: FacetPortfolio[TKey]) {
    setPortfolio((prev) => (prev ? { ...prev, [key]: value } : prev))
    setSaved(false)
    setSaveError(null)
  }

  function updateDetail(key: string, value: string) {
    setPortfolio((prev) => (prev ? { ...prev, details: { ...prev.details, [key]: value } } : prev))
    setSaved(false)
    setSaveError(null)
  }

  function save() {
    if (!portfolio) return
    const next = { ...portfolio, updatedAt: new Date().toISOString() }
    try {
      setFacetPortfolio(next)
      setPortfolio(next)
      setSaved(true)
      setSaveError(null)
      setTimeout(() => setSaved(false), 2000)
    } catch {
      setSaveError('Could not save — try fewer or smaller photos.')
    }
  }

  return (
    <div className="facet-build">
      {/* Editor panel */}
      <aside
        className="facet-build-aside"
        style={{ borderColor: FACET_SHELL.border, background: FACET_SHELL.paperElevated }}
      >
        <div
          className="facet-build-head"
          style={{ borderColor: FACET_SHELL.border, background: FACET_SHELL.paperElevated }}
        >
          <Link to="/demos/facet/dashboard" className="facet-back" style={{ color: FACET_SHELL.inkMuted }}>
            <ArrowLeft size={14} />
            Dashboard
          </Link>
          <h1 className="facet-build-title" style={{ color: FACET_SHELL.ink, fontFamily: 'var(--facet-display)' }}>
            {config.label} builder
          </h1>
        </div>

        <div className="facet-build-scroll">
          <div className="facet-build-body">
            {/* Theme picker */}
            <div>
              <label className="facet-label" style={labelStyle}>
                Template
              </label>
              <div className="facet-theme-list">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => update('theme', t.id)}
                    className="facet-theme-btn"
                    style={{
                      borderColor: portfolio.theme === t.id ? FACET_SHELL.accent : FACET_SHELL.border,
                      background: portfolio.theme === t.id ? `${FACET_SHELL.accent}12` : FACET_SHELL.paper,
                    }}
                  >
                    <span
                      className="facet-theme-swatch"
                      style={{ background: t.preview, borderColor: FACET_SHELL.border }}
                    />
                    <div>
                      <div className="facet-theme-name" style={{ color: FACET_SHELL.ink }}>
                        {t.name}
                      </div>
                      <div className="facet-text-xs" style={{ color: FACET_SHELL.inkMuted }}>
                        {t.desc}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Core fields */}
            <div className="facet-space-4">
              <div>
                <label htmlFor="facet-name" className="facet-label" style={labelStyle}>
                  Full name
                </label>
                <input
                  id="facet-name"
                  value={portfolio.name}
                  onChange={(e) => update('name', e.target.value)}
                  className="facet-field-input"
                  style={inputStyle}
                />
              </div>
              <div>
                <label className="facet-label" style={labelStyle}>
                  Profile photo
                </label>
                <ProfileImageUploader
                  value={portfolio.profilePhoto}
                  onChange={(dataUrl) => update('profilePhoto', dataUrl)}
                  name={portfolio.name}
                />
              </div>
              <div>
                <label htmlFor="facet-headline" className="facet-label" style={labelStyle}>
                  Headline
                </label>
                <input
                  id="facet-headline"
                  value={portfolio.headline}
                  onChange={(e) => update('headline', e.target.value)}
                  className="facet-field-input"
                  style={inputStyle}
                />
              </div>
              <div>
                <label htmlFor="facet-bio" className="facet-label" style={labelStyle}>
                  Bio
                </label>
                <textarea
                  id="facet-bio"
                  value={portfolio.bio}
                  onChange={(e) => update('bio', e.target.value)}
                  rows={3}
                  className="facet-field-input facet-resize-none"
                  style={inputStyle}
                />
              </div>
              <div>
                <label className="facet-label" style={labelStyle}>
                  Gallery photos
                </label>
                <GalleryImageUploader
                  values={portfolio.galleryPhotos}
                  onChange={(photos) => update('galleryPhotos', photos)}
                />
              </div>
            </div>

            {/* Field-specific */}
            <div className="facet-space-4 facet-build-details" style={{ borderColor: FACET_SHELL.border }}>
              <p className="facet-label" style={{ color: FACET_SHELL.accent, fontFamily: 'var(--facet-mono)' }}>
                {config.label} details
              </p>
              {config.fields.map((f) => (
                <div key={f.key}>
                  <label htmlFor={`facet-${f.key}`} className="facet-label" style={labelStyle}>
                    {f.label}
                  </label>
                  {f.type === 'textarea' ? (
                    <textarea
                      id={`facet-${f.key}`}
                      value={portfolio.details[f.key] ?? ''}
                      onChange={(e) => updateDetail(f.key, e.target.value)}
                      rows={4}
                      placeholder={f.placeholder}
                      className="facet-field-input facet-resize-none"
                      style={inputStyle}
                    />
                  ) : (
                    <input
                      id={`facet-${f.key}`}
                      value={portfolio.details[f.key] ?? ''}
                      onChange={(e) => updateDetail(f.key, e.target.value)}
                      placeholder={f.placeholder}
                      className="facet-field-input"
                      style={inputStyle}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action bar — pinned to sidebar bottom, never viewport-fixed */}
        <div
          className="facet-build-actions"
          style={{ borderColor: FACET_SHELL.border, background: `${FACET_SHELL.paperElevated}f2` }}
        >
          {saveError ? <p className="facet-save-error">{saveError}</p> : null}
          <div className="facet-build-actions-row">
            <button type="button" onClick={save} className="facet-save" style={{ background: FACET_SHELL.accent }}>
              <Save size={16} />
              {saved ? 'Saved' : 'Save'}
            </button>
            <Link
              to="/demos/facet/preview"
              onClick={() => {
                try {
                  setFacetPortfolio({ ...portfolio, updatedAt: new Date().toISOString() })
                } catch {
                  setSaveError('Could not save — try fewer or smaller photos.')
                }
              }}
              className="facet-full-preview"
              style={{ borderColor: FACET_SHELL.border, color: FACET_SHELL.ink, background: FACET_SHELL.paper }}
            >
              <Eye size={16} />
              Full preview
            </Link>
          </div>
        </div>
      </aside>

      <div className="facet-build-pane" style={{ background: '#D4CFC6' }}>
        <div className="facet-live-label" style={{ color: FACET_SHELL.inkMuted, fontFamily: 'var(--facet-mono)' }}>
          Live preview
        </div>
        <div className="facet-build-frame" style={{ borderColor: FACET_SHELL.border }}>
          <PortfolioPreview data={portfolio} />
        </div>
      </div>
    </div>
  )
}
