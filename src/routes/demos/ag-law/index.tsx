import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight, Award, BookOpen, Scale, Users } from 'lucide-react'
import { exact } from '../../../demos/ag-law/link'

export const Route = createFileRoute('/demos/ag-law/')({
  component: AgLawHome,
})

const practiceAreas = [
  {
    icon: Scale,
    title: 'Corporate & M&A',
    desc: 'Cross-border acquisitions, private equity, joint ventures and complex restructurings.',
  },
  {
    icon: BookOpen,
    title: 'Banking & Finance',
    desc: 'Syndicated lending, Islamic finance, capital markets and regulatory matters.',
  },
  {
    icon: Users,
    title: 'Dispute Resolution',
    desc: 'Commercial arbitration, white-collar defense and international litigation.',
  },
  {
    icon: Award,
    title: 'Energy & Infrastructure',
    desc: 'Upstream, midstream and renewables — concession agreements to project finance.',
  },
]

const insights = [
  {
    date: 'March 2026',
    tag: 'Brief',
    title: "Egypt's new competition framework: what foreign investors should expect",
  },
  {
    date: 'February 2026',
    tag: 'Note',
    title: 'FRA Decree 142 — practical implications for fintech licensees',
  },
  {
    date: 'January 2026',
    tag: 'Article',
    title: 'Restructuring under the New Bankruptcy Law: lessons from 2025',
  },
]

const stats = [
  { v: '40+', k: 'Years in practice' },
  { v: '60', k: 'Attorneys' },
  { v: '06', k: 'Languages of counsel' },
  { v: 'Band 1', k: 'Chambers Global' },
]

function AgLawHome() {
  return (
    <main id="main">
      {/* Hero */}
      <section className="aglaw-hero">
        <div className="aglaw-hero-grid" aria-hidden>
          <div
            className="aglaw-fill"
            style={{
              backgroundImage:
                'linear-gradient(#0F1A33 1px, transparent 1px), linear-gradient(90deg, #0F1A33 1px, transparent 1px)',
              backgroundSize: '64px 64px',
            }}
          />
        </div>
        <div className="aglaw-wrap">
          <div className="aglaw-eyebrow">Established Cairo · 1986</div>
          <h1 className="aglaw-hero-h1" style={{ fontFamily: 'var(--agl-display)', color: '#0F1A33' }}>
            Counsel of <em>distinction</em>
            <br />
            for matters of consequence.
          </h1>
          <p className="aglaw-hero-p">
            A senior practice serving leading institutions, sovereign clients and family offices across Egypt, the
            Levant and the Gulf. Sixty attorneys across four practice groups. Ranked Band 1 by Chambers Global since
            2018.
          </p>
          <div className="aglaw-ctas">
            <Link {...exact} to="/demos/ag-law/book" className="aglaw-btn aglaw-tc">
              Request a consultation
              <ArrowUpRight size={14} />
            </Link>
            <Link {...exact} to="/demos/ag-law/attorneys" className="aglaw-btn-ghost aglaw-tc">
              Meet the attorneys
            </Link>
          </div>

          {/* Stat strip */}
          <div className="aglaw-grid aglaw-stats">
            {stats.map((s) => (
              <div key={s.k} className="aglaw-stat" style={{ fontFamily: 'var(--agl-sans)' }}>
                <div className="aglaw-stat-v" style={{ fontFamily: 'var(--agl-display)', color: '#0F1A33' }}>
                  {s.v}
                </div>
                <div className="aglaw-stat-k">{s.k}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice areas */}
      <section id="practice" className="aglaw-wrap">
        <div className="aglaw-sec-head">
          <div>
            <div className="aglaw-eyebrow">Practice</div>
            <h2 className="aglaw-h2" style={{ fontFamily: 'var(--agl-display)' }}>
              Four pillars.
            </h2>
          </div>
        </div>

        <div className="aglaw-grid">
          {practiceAreas.map((p) => (
            <div key={p.title} className="aglaw-practice aglaw-tc">
              <div className="aglaw-practice-top">
                <p.icon size={22} strokeWidth={1.4} className="aglaw-gold" />
                <span className="aglaw-practice-label">Practice group</span>
              </div>
              <h3 className="aglaw-practice-h" style={{ fontFamily: 'var(--agl-display)' }}>
                {p.title}
              </h3>
              <p className="aglaw-practice-p">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quote pull */}
      <section className="aglaw-quote">
        <div className="aglaw-wrap aglaw-quote-in">
          <div className="aglaw-eyebrow">From the senior partner</div>
          <blockquote className="aglaw-blockquote" style={{ fontFamily: 'var(--agl-display)' }}>
            <em>
              &ldquo;Our work has never been measured in hours billed. It is measured in the consequence of the matters
              our clients entrust to us, and in the discretion with which we resolve them.&rdquo;
            </em>
          </blockquote>
          <div className="aglaw-quote-by">Ahmed Abdelgawad · Senior Partner</div>
        </div>
      </section>

      {/* Insights */}
      <section id="insights" className="aglaw-wrap">
        <div className="aglaw-eyebrow">Insights</div>
        <h2 className="aglaw-h2" style={{ fontFamily: 'var(--agl-display)' }}>
          Recent commentary.
        </h2>

        <ul className="aglaw-insights">
          {insights.map((i) => (
            <li key={i.title} className="aglaw-insight aglaw-tc">
              <div className="aglaw-insight-date">{i.date}</div>
              <div className="aglaw-insight-tag">{i.tag}</div>
              <div className="aglaw-insight-title" style={{ fontFamily: 'var(--agl-display)' }}>
                {i.title}
              </div>
              <ArrowUpRight size={16} className="aglaw-insight-arrow" />
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
