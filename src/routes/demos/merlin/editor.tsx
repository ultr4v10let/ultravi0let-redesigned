import { useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { Check, Eye, Image as ImageIcon, LayoutGrid, MessageSquareQuote, Palette, Users } from 'lucide-react'
import { merlinHead } from '../../../demos/merlin/meta'

export const Route = createFileRoute('/demos/merlin/editor')({
  head: () => merlinHead('/demos/merlin/editor'),
  component: MerlinEditor,
})

const THEMES = [
  { id: 'aurora', name: 'Aurora', primary: '#3B5BDB', accent: '#74C0FC', bg: '#F4F6FB' },
  { id: 'ember', name: 'Ember', primary: '#C2410C', accent: '#FDBA74', bg: '#FFF7ED' },
  { id: 'forest', name: 'Forest', primary: '#166534', accent: '#86EFAC', bg: '#F0FDF4' },
  { id: 'slate', name: 'Slate', primary: '#1E293B', accent: '#94A3B8', bg: '#F8FAFC' },
]

const TABS = [
  { id: 'team', label: 'Team structure', icon: Users, enabled: true },
  { id: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote, enabled: true },
  { id: 'services', label: 'Services', icon: LayoutGrid, enabled: true },
  { id: 'gallery', label: 'Gallery', icon: ImageIcon, enabled: false },
]

function MerlinEditor() {
  const [themeId, setThemeId] = useState('aurora')
  const [company, setCompany] = useState('Northline Ventures')
  const [tagline, setTagline] = useState("Building the infrastructure behind tomorrow's products.")
  const [tabs, setTabs] = useState(TABS)

  const theme = THEMES.find((t) => t.id === themeId) ?? THEMES[0]

  function toggleTab(id: string) {
    setTabs((prev) => prev.map((t) => (t.id === id ? { ...t, enabled: !t.enabled } : t)))
  }

  return (
    <main id="main" className="merlin-editor">
      <div className="merlin-editor-grid">
        {/* Sidebar controls */}
        <aside className="merlin-aside">
          <div className="merlin-micro merlin-blue">Site editor</div>
          <h1>Configure your site</h1>

          <div className="merlin-fields">
            <div>
              <label className="merlin-label merlin-label-row">
                <Palette size={12} />
                Theme
              </label>
              <div className="merlin-theme-grid">
                {THEMES.map((t) => (
                  <button key={t.id} type="button" onClick={() => setThemeId(t.id)} aria-pressed={themeId === t.id} className="merlin-theme-btn">
                    <span className="merlin-dot" style={{ background: t.primary }} />
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="merlin-company" className="merlin-label">
                Company name
              </label>
              <input id="merlin-company" value={company} onChange={(e) => setCompany(e.target.value)} className="merlin-input" />
            </div>

            <div>
              <label htmlFor="merlin-tagline" className="merlin-label">
                Tagline
              </label>
              <textarea id="merlin-tagline" value={tagline} onChange={(e) => setTagline(e.target.value)} rows={2} className="merlin-input" />
            </div>

            <div>
              <label className="merlin-label">Logo</label>
              <div className="merlin-drop">
                <div>
                  <ImageIcon size={20} />
                  <p>Drop SVG or PNG · 512×512 recommended</p>
                  <button type="button">Upload logo</button>
                </div>
              </div>
            </div>

            <div>
              <label className="merlin-label">Content tabs</label>
              <ul className="merlin-tabs">
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <button type="button" onClick={() => toggleTab(tab.id)} aria-pressed={tab.enabled} className="merlin-tab">
                      <tab.icon size={16} className="merlin-m60" />
                      <span>{tab.label}</span>
                      {tab.enabled && <Check size={14} className="merlin-blue" />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="merlin-actions">
            <Link to="/demos/merlin/preview" className="merlin-btn">
              <Eye size={16} />
              Open full preview
            </Link>
            <button type="button" className="merlin-btn-line">
              Publish site
            </button>
          </div>
        </aside>

        {/* Live mini-preview */}
        <div className="merlin-stage" style={{ background: theme.bg }}>
          <div className="merlin-micro merlin-m50">Live preview</div>
          <div className="merlin-card" style={{ borderTopColor: theme.primary, borderTopWidth: 4 }}>
            <div className="merlin-card-head">
              <div className="merlin-card-brand">
                <div className="merlin-card-logo" style={{ background: theme.primary }}>
                  {company.charAt(0)}
                </div>
                <span>{company}</span>
              </div>
              <nav className="merlin-card-nav" aria-label="Site preview">
                {tabs
                  .filter((t) => t.enabled)
                  .map((t) => (
                    <span key={t.id}>{t.label.split(' ')[0]}</span>
                  ))}
                <span>Contact</span>
              </nav>
            </div>

            <div className="merlin-card-hero">
              <h2 style={{ fontFamily: 'var(--mly-display)', color: theme.primary }}>{company}</h2>
              <p>{tagline}</p>
              <button type="button" style={{ background: theme.primary }}>
                Get in touch
              </button>
            </div>

            {tabs.find((t) => t.id === 'team')?.enabled && (
              <div className="merlin-card-sec">
                <h3>Team</h3>
                <div className="merlin-card-team">
                  {['CEO', 'CTO', 'Head of Ops'].map((role) => (
                    <div key={role}>
                      <div className="merlin-avatar" style={{ background: `${theme.accent}55` }} />
                      <div className="merlin-role">{role}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tabs.find((t) => t.id === 'testimonials')?.enabled && (
              <div className="merlin-card-sec merlin-card-quotes">
                <h3>Testimonials</h3>
                <blockquote>&ldquo;We went from zero to a polished company presence in a single afternoon.&rdquo;</blockquote>
                <div>— Early adopter, Series A</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
