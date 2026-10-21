import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, LayoutTemplate, Palette, PanelsTopLeft, Rocket, Users } from 'lucide-react'
import { merlinHead } from '../../../demos/merlin/meta'

export const Route = createFileRoute('/demos/merlin/')({
  head: () => merlinHead('/demos/merlin'),
  component: MerlinHome,
})

const features = [
  {
    icon: Palette,
    title: 'Themes & brand kit',
    desc: 'Pick a base theme, set primary and accent colours, upload a logo — every surface updates instantly.',
  },
  {
    icon: PanelsTopLeft,
    title: 'Modular tabs',
    desc: 'Toggle sections for team structure, testimonials, services, contact and more. Reorder with drag-and-drop.',
  },
  {
    icon: LayoutTemplate,
    title: 'Live preview',
    desc: 'See exactly what visitors will get. Desktop and mobile breakpoints, shareable preview links.',
  },
  {
    icon: Rocket,
    title: 'Publish in one click',
    desc: 'Custom subdomain or bring your own domain. SSL, CDN and analytics included.',
  },
]

const themes = [
  { name: 'Aurora', colors: ['#3B5BDB', '#74C0FC', '#F4F6FB'] },
  { name: 'Ember', colors: ['#C2410C', '#FDBA74', '#FFF7ED'] },
  { name: 'Forest', colors: ['#166534', '#86EFAC', '#F0FDF4'] },
  { name: 'Slate', colors: ['#1E293B', '#94A3B8', '#F8FAFC'] },
]

const stats = [
  { v: '< 4h', k: 'Average time to publish' },
  { v: '12', k: 'Starter themes' },
  { v: '6', k: 'Content modules' },
  { v: '99.9%', k: 'Uptime SLA' },
]

function MerlinHome() {
  return (
    <main id="main">
      <section className="merlin-hero">
        <div aria-hidden className="merlin-glow" style={{ background: '#3B5BDB' }} />
        <div className="merlin-wrap">
          <div className="merlin-eyebrow">Website builder · for teams who need to ship</div>
          <h1 className="merlin-h1" style={{ fontFamily: 'var(--mly-display)' }}>
            Your company site,
            <br />
            <em className="merlin-blue">ready before lunch.</em>
          </h1>
          <p className="merlin-lead">
            Merlin lets clients configure themes, colours, logos and content tabs — team, testimonials, services — without touching code.
            Onboard fast, present professionally, iterate in minutes.
          </p>
          <div className="merlin-ctas">
            <Link to="/demos/merlin/editor" className="merlin-btn">
              Try the editor
              <ArrowRight size={16} />
            </Link>
            <Link to="/demos/merlin/preview" className="merlin-btn-line">
              View live preview
            </Link>
          </div>

          <div className="merlin-stats">
            {stats.map((s) => (
              <div key={s.k} className="merlin-stat">
                <div className="merlin-stat-v" style={{ fontFamily: 'var(--mly-display)' }}>
                  {s.v}
                </div>
                <div className="merlin-stat-k">{s.k}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="platform" className="merlin-line-b">
        <div className="merlin-wrap">
          <div className="merlin-eyebrow">Platform</div>
          <h2 className="merlin-h2" style={{ fontFamily: 'var(--mly-display)' }}>
            Everything a new company needs to look established.
          </h2>
          <div className="merlin-features">
            {features.map((f) => (
              <div key={f.title} className="merlin-feature">
                <f.icon size={22} strokeWidth={1.5} className="merlin-blue" />
                <h3 style={{ fontFamily: 'var(--mly-display)' }}>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="merlin-white">
        <div className="merlin-wrap">
          <div className="merlin-lib-head">
            <div>
              <div className="merlin-eyebrow">Theme library</div>
              <h2 className="merlin-h2-sm" style={{ fontFamily: 'var(--mly-display)' }}>
                Start with a palette, make it yours.
              </h2>
            </div>
            <Link to="/demos/merlin/editor" className="merlin-link">
              Customise in editor
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="merlin-themes">
            {themes.map((t) => (
              <div key={t.name} className="merlin-theme">
                <div className="merlin-swatches">
                  {t.colors.map((c) => (
                    <div key={c} style={{ background: c }} />
                  ))}
                </div>
                <div className="merlin-theme-name">
                  <Users size={14} />
                  <span>{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
