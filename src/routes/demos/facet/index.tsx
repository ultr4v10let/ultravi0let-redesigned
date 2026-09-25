import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, LayoutTemplate } from 'lucide-react'
import { FACET_FIELDS } from '../../../demos/facet/facet'
import { FACET_SHELL } from '../../../demos/facet/facet-shell'
import { Layers, PenLine, Sparkles } from '../../../demos/facet/icons'

export const Route = createFileRoute('/demos/facet/')({
  component: FacetHome,
})

const steps = [
  { icon: PenLine, title: 'Sign in', desc: 'Create your studio account — demo auth, no backend required.' },
  { icon: Layers, title: 'Pick your field', desc: 'CS, architecture or medical — each with tailored prompts.' },
  { icon: LayoutTemplate, title: 'Choose a template', desc: 'Two distinct themes per field — fonts, layout and tone.' },
  { icon: Sparkles, title: 'Publish', desc: 'Fill your details, preview live, share your portfolio link.' },
]

const stats = [
  { v: '3', k: 'Professional fields' },
  { v: '6', k: 'Templates total' },
  { v: '2', k: 'Themes per field' },
  { v: '< 10m', k: 'Time to publish' },
]

function FacetHome() {
  return (
    <main>
      <section className="facet-hero" style={{ borderColor: FACET_SHELL.border }}>
        <div aria-hidden className="facet-blob facet-blob-accent" style={{ background: FACET_SHELL.accent }} />
        <div aria-hidden className="facet-blob facet-blob-sage" style={{ background: FACET_SHELL.sage }} />
        <div className="facet-container">
          <div className="facet-eyebrow" style={{ color: FACET_SHELL.sage, fontFamily: 'var(--facet-mono)' }}>
            Portfolio builder · field-aware
          </div>
          <h1 className="facet-hero-title" style={{ fontFamily: 'var(--facet-display)', color: FACET_SHELL.ink }}>
            Your profession has a shape.
            <br />
            <em style={{ color: FACET_SHELL.accent }}>Facet finds it.</em>
          </h1>
          <p className="facet-hero-lead" style={{ color: FACET_SHELL.inkMuted }}>
            Field-specific portfolio templates for computer science, architecture and medicine.
            Sign in, pick your discipline, choose between two themes, and publish a portfolio
            that asks the right questions — GitHub or Behance, certificates or case studies.
          </p>
          <div className="facet-cta-row">
            <Link to="/demos/facet/sign-in" className="facet-btn-primary" style={{ background: FACET_SHELL.accent }}>
              Start building
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/demos/facet/dashboard"
              className="facet-btn-secondary"
              style={{
                borderColor: FACET_SHELL.border,
                color: FACET_SHELL.ink,
                background: FACET_SHELL.paperElevated,
              }}
            >
              Open studio
            </Link>
          </div>

          <div className="facet-stats" style={{ borderColor: FACET_SHELL.border, background: FACET_SHELL.border }}>
            {stats.map((s) => (
              <div key={s.k} className="facet-stat" style={{ background: FACET_SHELL.paperElevated }}>
                <div className="facet-stat-value" style={{ fontFamily: 'var(--facet-display)', color: FACET_SHELL.ink }}>
                  {s.v}
                </div>
                <div className="facet-stat-label" style={{ color: FACET_SHELL.inkMuted, fontFamily: 'var(--facet-mono)' }}>
                  {s.k}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="fields"
        className="facet-fields"
        style={{ borderColor: FACET_SHELL.border, background: FACET_SHELL.paperElevated }}
      >
        <div className="facet-container">
          <div className="facet-eyebrow" style={{ color: FACET_SHELL.accent, fontFamily: 'var(--facet-mono)' }}>
            Fields
          </div>
          <h2 className="facet-fields-title" style={{ fontFamily: 'var(--facet-display)', color: FACET_SHELL.ink }}>
            Templates that speak your language.
          </h2>
          <div className="facet-field-grid">
            {FACET_FIELDS.map((f) => (
              <div
                key={f.id}
                className="facet-field-card"
                style={{
                  borderColor: FACET_SHELL.border,
                  background: FACET_SHELL.paper,
                }}
              >
                <div className="facet-field-icon" style={{ background: f.accent, fontFamily: 'var(--facet-mono)' }}>
                  {f.icon}
                </div>
                <h3 className="facet-field-card-title" style={{ color: FACET_SHELL.ink }}>
                  {f.label}
                </h3>
                <p className="facet-field-card-desc" style={{ color: FACET_SHELL.inkMuted }}>
                  {f.desc}
                </p>
                <Link
                  to="/demos/facet/sign-in"
                  search={{ field: f.id }}
                  className="facet-field-card-link"
                  style={{ color: FACET_SHELL.accent }}
                >
                  Build this field
                  <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" style={{ background: FACET_SHELL.dark, color: FACET_SHELL.darkText }}>
        <div className="facet-container">
          <div className="facet-eyebrow" style={{ color: FACET_SHELL.darkAccent, fontFamily: 'var(--facet-mono)' }}>
            How it works
          </div>
          <h2 className="facet-how-title" style={{ fontFamily: 'var(--facet-display)' }}>
            From sign-in to shareable portfolio.
          </h2>
          <ol className="facet-steps">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="facet-step"
                style={{ borderColor: 'rgba(247,244,239,0.12)', background: 'rgba(247,244,239,0.04)' }}
              >
                <div className="facet-step-num" style={{ color: FACET_SHELL.sage, fontFamily: 'var(--facet-mono)' }}>
                  0{i + 1}
                </div>
                <s.icon size={22} className="facet-mt-4" style={{ color: FACET_SHELL.darkAccent }} strokeWidth={1.5} />
                <h3 className="facet-step-title">{s.title}</h3>
                <p className="facet-step-desc">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  )
}
