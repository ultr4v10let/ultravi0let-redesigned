import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { exact } from '../../../demos/ag-law/link'
import { agLawHead } from '../../../demos/ag-law/meta'

export const Route = createFileRoute('/demos/ag-law/attorneys')({
  head: () => agLawHead('/demos/ag-law/attorneys', 'Attorneys · AG Law'),
  component: AttorneysPage,
})

const attorneys = [
  {
    name: 'Ahmed Abdelgawad',
    title: 'Managing Partner',
    practice: 'Corporate · M&A',
    bars: ['Egypt', 'England & Wales'],
    languages: ['Arabic', 'English', 'French'],
    bio: 'Founding partner. Advises on corporate work and mergers.',
    education: 'LL.B Cairo · LL.M Harvard',
  },
  {
    name: 'Yasmin El-Sherbini',
    title: 'Managing Partner',
    practice: 'Banking & Finance',
    bars: ['Egypt', 'DIFC'],
    languages: ['Arabic', 'English'],
    bio: "Heads the firm's banking practice.",
    education: 'LL.B Ain Shams · LL.M Cambridge',
  },
  {
    name: 'Karim Madkour',
    title: 'Partner',
    practice: 'Dispute Resolution',
    bars: ['Egypt', 'ICC', 'LCIA'],
    languages: ['Arabic', 'English', 'Italian'],
    bio: 'Arbitrator and counsel in commercial and investor-state matters.',
    education: 'LL.B Cairo · LL.M Sciences Po',
  },
  {
    name: 'Layla Mansour',
    title: 'Partner',
    practice: 'Energy & Infrastructure',
    bars: ['Egypt', 'ADGM'],
    languages: ['Arabic', 'English'],
    bio: 'Project finance and concession agreements across upstream, midstream and renewables.',
    education: 'LL.B Alexandria · LL.M Columbia',
  },
  {
    name: 'Hossam Eid',
    title: 'Counsel',
    practice: 'Corporate · M&A',
    bars: ['Egypt'],
    languages: ['Arabic', 'English'],
    bio: 'Cross-border acquisitions and private equity.',
    education: 'LL.B Cairo · LL.M NYU',
  },
  {
    name: 'Nour El-Sayed',
    title: 'Counsel',
    practice: 'Tax & Regulatory',
    bars: ['Egypt', 'Chartered Tax Adviser'],
    languages: ['Arabic', 'English', 'German'],
    bio: 'Transfer pricing, indirect tax and regulatory work.',
    education: 'LL.B Cairo · LL.M Munich',
  },
]

function AttorneysPage() {
  return (
    <main id="main" className="aglaw-page">
      <div className="aglaw-eyebrow">Our people</div>
      <h1 className="aglaw-att-h1" style={{ fontFamily: 'var(--agl-display)' }}>
        The partnership.
      </h1>
      <p className="aglaw-att-lead">
        Sample profiles for this demonstration. Names, titles and education on this page are illustrative.
      </p>

      <div className="aglaw-grid">
        {attorneys.map((a) => (
          <article key={a.name} className="aglaw-att">
            <div className="aglaw-att-head">
              <div className="aglaw-avatar" aria-hidden>
                {a.name
                  .split(' ')
                  .slice(0, 2)
                  .map((n) => n[0])
                  .join('')}
              </div>
              <div className="aglaw-flex1">
                <h2 className="aglaw-att-name" style={{ fontFamily: 'var(--agl-display)' }}>
                  {a.name}
                </h2>
                <div className="aglaw-att-role">
                  {a.title} · {a.practice}
                </div>
              </div>
            </div>

            <p className="aglaw-att-bio">{a.bio}</p>

            <dl className="aglaw-att-dl">
              <div>
                <dt className="aglaw-mono">Bar</dt>
                <dd className="aglaw-mt1">{a.bars.join(', ')}</dd>
              </div>
              <div>
                <dt className="aglaw-mono">Languages</dt>
                <dd className="aglaw-mt1">{a.languages.join(', ')}</dd>
              </div>
              <div className="aglaw-span2">
                <dt className="aglaw-mono">Education</dt>
                <dd className="aglaw-mt1">{a.education}</dd>
              </div>
            </dl>

            <Link {...exact} to="/demos/ag-law/book" className="aglaw-att-link">
              Request a consultation
              <ArrowUpRight size={14} className="aglaw-att-arrow" />
            </Link>
          </article>
        ))}
      </div>
    </main>
  )
}
