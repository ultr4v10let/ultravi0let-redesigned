import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Coffee, Ruler, Shirt } from 'lucide-react'
import { Layers } from '../../../demos/maquette/icons'

export const Route = createFileRoute('/demos/maquette/')({
  component: MaquetteHome,
})

const lines = [
  {
    icon: Ruler,
    title: 'Architectural drawings',
    desc: 'Large-format prints from A3 to A0 — CAD exports, mark-ups, presentation boards and site plans with colour calibration.',
    formats: 'A3 · A2 · A1 · A0',
    tag: 'Line 01',
  },
  {
    icon: Shirt,
    title: 'Bulk apparel',
    desc: 'Screen and DTG runs for senior parties, corporate events and team merchandise — sizing matrices and batch tracking.',
    formats: '50 — 5,000+ units',
    tag: 'Line 02',
  },
  {
    icon: Coffee,
    title: 'Merchandise & small format',
    desc: 'Mugs, keychains, badges and promotional items — single artwork, many SKUs on a unified production queue.',
    formats: 'Mugs · keys · badges',
    tag: 'Line 03',
  },
]

const stats = [
  { v: 'A0', k: 'Max drawing size' },
  { v: '3', k: 'Production lines' },
  { v: '48h', k: 'Avg. arch turnaround' },
  { v: '2.4k', k: 'Jobs / month' },
]

const display = { fontFamily: 'var(--maq-display)' }

function MaquetteHome() {
  return (
    <main id="main">
      <section className="maquette-hero">
        <div
          aria-hidden
          className="maquette-hero-grid"
          style={{
            backgroundImage: 'linear-gradient(#E8EAED 1px, transparent 1px), linear-gradient(90deg, #E8EAED 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="maquette-wrap">
          <div className="maquette-eyebrow">Print production · three lines, one platform</div>
          <h1 className="maquette-hero-title" style={display}>
            From blueprint
            <br />
            to <span className="maquette-orange">bulk run.</span>
          </h1>
          <p className="maquette-lede">
            Maquette unifies architectural drawing output, high-volume apparel printing and small merchandise jobs — quoting, scheduling and fulfilment on a single
            production floor.
          </p>
          <div className="maquette-ctas">
            <Link to="/demos/maquette/quote" className="maquette-btn maquette-btn-primary">
              Get a quote
              <ArrowRight size={16} />
            </Link>
            <Link to="/demos/maquette/orders" className="maquette-btn maquette-btn-ghost">
              View order board
            </Link>
          </div>

          <div className="maquette-stats">
            {stats.map((s) => (
              <div key={s.k} className="maquette-stat">
                <div className="maquette-stat-v" style={display}>
                  {s.v}
                </div>
                <div className="maquette-stat-k">{s.k}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="maquette-services">
        <div className="maquette-wrap">
          <div className="maquette-eyebrow maquette-eyebrow-icon">
            <Layers size={14} />
            Production lines
          </div>
          <h2 className="maquette-services-title" style={display}>
            One queue. Three specialisms.
          </h2>

          <div className="maquette-lines">
            {lines.map((line) => (
              <div key={line.title} className="maquette-line">
                <div className="maquette-line-tag">{line.tag}</div>
                <line.icon size={28} strokeWidth={1.5} className="maquette-line-icon" />
                <h3 className="maquette-line-title" style={display}>
                  {line.title}
                </h3>
                <p className="maquette-line-desc">{line.desc}</p>
                <div className="maquette-line-formats">{line.formats}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
