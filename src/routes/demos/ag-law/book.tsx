import { useEffect, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, Calendar, Check, Clock } from 'lucide-react'
import { exact } from '../../../demos/ag-law/link'
import { pageHead } from '../../../lib/seo'

export const Route = createFileRoute('/demos/ag-law/book')({
  head: () => pageHead({ title: 'AG Law · Counsel of distinction', path: '/demos/ag-law/book', noindex: true }),
  /* The next working days, computed where the route renders: the prerendered HTML carries the build day's, and
     hydration reuses them (no mismatch); the page then moves them to the visitor's today, below. */
  loader: () => nextWeekdays(8),
  component: BookConsultation,
})

const practiceAreas = [
  'Corporate & M&A',
  'Banking & Finance',
  'Dispute Resolution',
  'Energy & Infrastructure',
  'Tax & Regulatory',
  'Other',
]

const attorneys = [
  { v: 'any', n: 'First available' },
  { v: 'ahmed', n: 'Ahmed Abdelgawad' },
  { v: 'yasmin', n: 'Yasmin El-Sherbini' },
  { v: 'karim', n: 'Karim Madkour' },
  { v: 'layla', n: 'Layla Mansour' },
]

const times = ['09:30', '10:30', '11:30', '14:00', '15:00', '16:00']

function nextWeekdays(n: number) {
  const out: { iso: string; label: string; day: string; date: string }[] = []
  const cursor = new Date()
  cursor.setHours(0, 0, 0, 0)
  while (out.length < n) {
    cursor.setDate(cursor.getDate() + 1)
    const dow = cursor.getDay()
    if (dow === 5) continue // Friday off in Egypt
    out.push({
      iso: cursor.toISOString().slice(0, 10),
      label: cursor.toLocaleDateString('en-GB', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
      }),
      day: cursor.toLocaleDateString('en-GB', { weekday: 'short' }),
      date: cursor.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
      }),
    })
  }
  return out
}

function BookConsultation() {
  const initialDates = Route.useLoaderData()
  const [dates, setDates] = useState(initialDates)
  const [step, setStep] = useState<'form' | 'done'>('form')
  const [matter, setMatter] = useState(practiceAreas[0])
  const [attorney, setAttorney] = useState('any')
  const [date, setDate] = useState(initialDates[0].iso)
  const [time, setTime] = useState(times[1])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [ref, setRef] = useState('')

  useEffect(() => {
    const today = nextWeekdays(8)
    if (today[0].iso !== initialDates[0].iso) {
      setDates(today)
      setDate(today[0].iso)
    }
  }, [initialDates])

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const r = 'AG-' + Math.random().toString(36).slice(2, 6).toUpperCase() + '-' + String(Date.now()).slice(-4)
    setRef(r)
    setStep('done')
    window.scrollTo({ top: 0 })
  }

  if (step === 'done') {
    const att = attorneys.find((a) => a.v === attorney)?.n
    const dt = dates.find((d) => d.iso === date)?.label
    return (
      <main id="main" className="aglaw-done">
        <div className="aglaw-eyebrow">Confirmed</div>
        <h1 className="aglaw-book-h1" style={{ fontFamily: 'var(--agl-display)' }}>
          Your request has been
          <br />
          <em>received with thanks.</em>
        </h1>
        <p className="aglaw-done-p">
          A member of our chambers will confirm by email within one business day. Should the matter require urgent
          attention, our duty partner can be reached on the emergency line provided in your confirmation.
        </p>

        <div className="aglaw-card aglaw-done-card">
          <div className="aglaw-card-head aglaw-done-head">Reference {ref}</div>
          <dl className="aglaw-done-dl">
            <Row label="Name" value={name} />
            <Row label="Email" value={email} />
            <Row label="Matter" value={matter} />
            <Row label="Counsel" value={att || '—'} />
            <Row label="Requested date" value={dt || '—'} />
            <Row label="Requested time" value={`${time} EET`} />
            {notes && <Row label="Notes" value={notes} full />}
          </dl>
        </div>

        <div className="aglaw-done-actions">
          <Link {...exact} to="/demos/ag-law" className="aglaw-back">
            <ArrowLeft size={14} /> Back to home
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main id="main" className="aglaw-book">
      <div className="aglaw-eyebrow">New consultation</div>
      <h1 className="aglaw-book-h1" style={{ fontFamily: 'var(--agl-display)' }}>
        Request an appointment.
      </h1>
      <p className="aglaw-book-lead">
        Provide a brief outline of the matter. Communications are protected by attorney-client privilege from the moment
        they reach our chambers.
      </p>

      <form onSubmit={onSubmit} className="aglaw-book-form">
        {/* Form */}
        <div className="aglaw-stack">
          {/* Matter */}
          <Section title="Area of practice">
            <div className="aglaw-chips">
              {practiceAreas.map((p) => (
                <Chip key={p} selected={matter === p} onClick={() => setMatter(p)}>
                  {p}
                </Chip>
              ))}
            </div>
          </Section>

          {/* Attorney */}
          <Section title="Preferred counsel">
            <div className="aglaw-radios">
              {attorneys.map((a) => (
                <label key={a.v} className={`aglaw-radio aglaw-tc${attorney === a.v ? ' aglaw-on' : ''}`}>
                  <input
                    type="radio"
                    name="attorney"
                    value={a.v}
                    checked={attorney === a.v}
                    onChange={() => setAttorney(a.v)}
                    className="aglaw-sr"
                  />
                  <span className="aglaw-dot" />
                  {a.n}
                </label>
              ))}
            </div>
          </Section>

          {/* Date */}
          <Section title="Date" icon={<Calendar size={14} className="aglaw-gold" />}>
            <div className="aglaw-dates">
              {dates.map((d) => (
                <button
                  type="button"
                  key={d.iso}
                  onClick={() => setDate(d.iso)}
                  aria-pressed={date === d.iso}
                  className={`aglaw-date aglaw-tc${date === d.iso ? ' aglaw-on' : ''}`}
                >
                  <span className="aglaw-date-day">{d.day}</span>
                  <span className="aglaw-date-d" style={{ fontFamily: 'var(--agl-display)' }}>
                    {d.date}
                  </span>
                </button>
              ))}
            </div>
          </Section>

          {/* Time */}
          <Section title="Time (EET)" icon={<Clock size={14} className="aglaw-gold" />}>
            <div className="aglaw-chips">
              {times.map((t) => (
                <Chip key={t} selected={time === t} onClick={() => setTime(t)}>
                  {t}
                </Chip>
              ))}
            </div>
          </Section>

          {/* Contact */}
          <Section title="Your details">
            <div className="aglaw-fields">
              <Field label="Full name" value={name} onChange={setName} required />
              <Field label="Email" type="email" value={email} onChange={setEmail} required />
              <Field label="Phone" value={phone} onChange={setPhone} className="aglaw-span2-md" />
              <Field
                label="Brief outline of the matter"
                value={notes}
                onChange={setNotes}
                textarea
                className="aglaw-span2-md"
              />
            </div>
          </Section>
        </div>

        {/* Summary rail */}
        <aside className="aglaw-rail">
          <div className="aglaw-card">
            <div className="aglaw-card-head">Summary</div>
            <dl className="aglaw-summary">
              <SummaryRow k="Matter" v={matter} />
              <SummaryRow k="Counsel" v={attorneys.find((a) => a.v === attorney)?.n || '—'} />
              <SummaryRow k="Date" v={dates.find((d) => d.iso === date)?.label || '—'} />
              <SummaryRow k="Time" v={`${time} EET`} />
              <SummaryRow k="Estimated duration" v="45 minutes" />
              <SummaryRow k="Fee" v="Complimentary first call" />
            </dl>
            <div className="aglaw-card-foot">
              <button type="submit" className="aglaw-submit aglaw-tc">
                <Check size={14} />
                Request consultation
              </button>
              <p className="aglaw-note">
                Submitting does not create an attorney-client relationship. You will receive a confirmation by email
                within one business day.
              </p>
            </div>
          </div>
        </aside>
      </form>
    </main>
  )
}

function Section({ title, icon, children }: { title: string; icon?: ReactNode; children: ReactNode }) {
  return (
    <section>
      <div className="aglaw-sec-title">
        {icon}
        {title}
      </div>
      {children}
    </section>
  )
}

function Chip({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`aglaw-chip aglaw-tc${selected ? ' aglaw-on' : ''}`}
    >
      {children}
    </button>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required,
  textarea,
  className,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
  textarea?: boolean
  className?: string
}) {
  return (
    <label className={`aglaw-field ${className ?? ''}`}>
      <span className="aglaw-mono aglaw-field-label">
        {label}
        {required && <span className="aglaw-req">*</span>}
      </span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          rows={4}
          className="aglaw-input aglaw-textarea aglaw-tc"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="aglaw-input aglaw-tc"
        />
      )}
    </label>
  )
}

function SummaryRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="aglaw-srow">
      <span className="aglaw-srow-k">{k}</span>
      <span className="aglaw-srow-v">{v}</span>
    </div>
  )
}

function Row({ label, value, full }: { label: string; value: string; full?: boolean }) {
  return (
    <div className={full ? 'aglaw-span2-md' : undefined}>
      <dt className="aglaw-mono">{label}</dt>
      <dd className="aglaw-row-dd">{value}</dd>
    </div>
  )
}
