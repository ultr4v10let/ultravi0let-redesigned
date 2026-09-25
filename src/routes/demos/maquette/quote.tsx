import { useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, Calculator } from 'lucide-react'
import { maquetteHead } from '../../../demos/maquette/head'

export const Route = createFileRoute('/demos/maquette/quote')({
  head: maquetteHead('/demos/maquette/quote'),
  component: MaquetteQuote,
})

const LINES = [
  { id: 'arch', label: 'Architectural drawings', base: 45 },
  { id: 'apparel', label: 'Bulk apparel', base: 8 },
  { id: 'merch', label: 'Mugs & merchandise', base: 12 },
]

const SIZES: Record<string, Array<{ label: string; mult: number }>> = {
  arch: [
    { label: 'A3', mult: 1 },
    { label: 'A2', mult: 1.6 },
    { label: 'A1', mult: 2.4 },
    { label: 'A0', mult: 4 },
  ],
  apparel: [
    { label: '50 units', mult: 1 },
    { label: '120 units', mult: 0.85 },
    { label: '240 units', mult: 0.72 },
    { label: '500+ units', mult: 0.6 },
  ],
  merch: [
    { label: '1–24 pcs', mult: 1 },
    { label: '25–99 pcs', mult: 0.88 },
    { label: '100+ pcs', mult: 0.75 },
  ],
}

function MaquetteQuote() {
  const [line, setLine] = useState('arch')
  const [sizeIdx, setSizeIdx] = useState(0)
  const [qty, setQty] = useState(12)
  const [submitted, setSubmitted] = useState(false)

  const lineData = LINES.find((l) => l.id === line)!
  const sizes = SIZES[line]
  const mult = sizes[sizeIdx]?.mult ?? 1
  const estimate = Math.round(lineData.base * mult * qty)

  return (
    <main id="main" className="maquette-quote">
      <Link to="/demos/maquette" activeOptions={{ exact: true }} className="maquette-back">
        <ArrowLeft size={14} />
        Back
      </Link>

      <div className="maquette-quote-head">
        <Calculator size={22} className="maquette-orange" />
        <h1 className="maquette-page-title" style={{ fontFamily: 'var(--maq-display)' }}>
          Instant quote
        </h1>
      </div>
      <p className="maquette-quote-intro">Select a production line, format and quantity for an indicative estimate.</p>

      {submitted ? (
        <div className="maquette-success">
          <div className="maquette-success-title">Quote submitted</div>
          <p>Reference MQ-NEW · Estimated EGP {estimate.toLocaleString()} · A production coordinator will confirm within 2 hours.</p>
          <button type="button" onClick={() => setSubmitted(false)} className="maquette-link">
            Create another quote
          </button>
        </div>
      ) : (
        <form
          className="maquette-form"
          onSubmit={(e) => {
            e.preventDefault()
            setSubmitted(true)
          }}
        >
          <div>
            <label className="maquette-label">Production line</label>
            <div className="maquette-opts">
              {LINES.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  aria-pressed={line === l.id}
                  onClick={() => {
                    setLine(l.id)
                    setSizeIdx(0)
                  }}
                  className="maquette-opt"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="maquette-label">{line === 'arch' ? 'Paper size' : 'Volume tier'}</label>
            <div className="maquette-sizes">
              {sizes.map((s, i) => (
                <button key={s.label} type="button" aria-pressed={sizeIdx === i} onClick={() => setSizeIdx(i)} className="maquette-size">
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="maquette-qty" className="maquette-label">
              Quantity
            </label>
            <input id="maquette-qty" type="number" min={1} value={qty} onChange={(e) => setQty(Number(e.target.value) || 1)} className="maquette-qty" />
          </div>

          <div className="maquette-estimate">
            <div className="maquette-label">Estimated total</div>
            <div className="maquette-estimate-v" style={{ fontFamily: 'var(--maq-display)' }}>
              EGP {estimate.toLocaleString()}
            </div>
            <p className="maquette-estimate-note">Indicative only · final quote may vary with finishing and rush fees</p>
          </div>

          <button type="submit" className="maquette-submit">
            Submit for confirmation
          </button>
        </form>
      )}
    </main>
  )
}
