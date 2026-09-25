import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, Mail, MapPin } from 'lucide-react'
import { merlinHead } from '../../../demos/merlin/meta'

export const Route = createFileRoute('/demos/merlin/preview')({
  head: () => merlinHead('/demos/merlin/preview'),
  component: MerlinPreview,
})

const team = [
  { name: 'Sara Al-Mansoori', role: 'CEO & Co-founder', bio: 'Former product lead at a regional fintech.' },
  { name: 'Omar Haddad', role: 'CTO', bio: 'Infrastructure engineer, 12 years across cloud and data.' },
  { name: 'Lina Farouk', role: 'Head of Operations', bio: 'Scaled two B2B SaaS teams from seed to Series B.' },
  { name: 'James Okonkwo', role: 'Design Director', bio: 'Brand systems for enterprise and consumer products.' },
]

const testimonials = [
  {
    quote: "Merlin let us look like we'd been around for years — on day one of our fundraise.",
    author: 'Nadia K., Founder',
  },
  {
    quote: 'The team tab and testimonials module alone saved us three weeks of agency back-and-forth.',
    author: 'Rami S., COO',
  },
]

const services = [
  { title: 'Strategy', desc: 'Market positioning, roadmap and go-to-market for early-stage products.' },
  { title: 'Engineering', desc: 'Full-stack development with observability and security built in.' },
  { title: 'Design', desc: 'Brand, product UI and design systems that scale with your team.' },
]

function MerlinPreview() {
  return (
    <main id="main" className="merlin-preview">
      <div className="merlin-bar">
        <div className="merlin-in merlin-row">
          <Link to="/demos/merlin/editor" className="merlin-link">
            <ArrowLeft size={14} />
            Back to editor
          </Link>
          <span className="merlin-micro">Preview · northline.merlin.app</span>
        </div>
      </div>

      <header className="merlin-line-b merlin-white">
        <div className="merlin-in merlin-row merlin-site-head">
          <div className="merlin-card-brand">
            <div className="merlin-site-logo">N</div>
            <span className="merlin-site-name">Northline Ventures</span>
          </div>
          <nav className="merlin-site-nav" aria-label="Northline Ventures">
            <a href="#team">Team</a>
            <a href="#services">Services</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <section className="merlin-line-b merlin-white">
        <div className="merlin-in merlin-sec merlin-site-hero">
          <p className="merlin-eyebrow">Product studio · Dubai</p>
          <h1 className="merlin-site-h1" style={{ fontFamily: 'var(--mly-display)' }}>
            Building the infrastructure behind <em className="merlin-blue">tomorrow&apos;s products.</em>
          </h1>
          <p className="merlin-site-lead">
            We partner with founders to design, engineer and ship software that lasts — from first prototype to production scale.
          </p>
          <a href="#contact" className="merlin-site-cta">
            Start a conversation
          </a>
        </div>
      </section>

      <section id="team" className="merlin-line-b">
        <div className="merlin-in merlin-sec">
          <h2>Team structure</h2>
          <div className="merlin-people">
            {team.map((m) => (
              <div key={m.name} className="merlin-person">
                <div />
                <h3>{m.name}</h3>
                <p>{m.role}</p>
                <p>{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="merlin-line-b merlin-white">
        <div className="merlin-in merlin-sec">
          <h2>Services</h2>
          <div className="merlin-services">
            {services.map((s) => (
              <div key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="merlin-line-b">
        <div className="merlin-in merlin-sec">
          <h2>Testimonials</h2>
          <div className="merlin-quotes">
            {testimonials.map((t) => (
              <blockquote key={t.author}>
                <p>&ldquo;{t.quote}&rdquo;</p>
                <footer>{t.author}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="merlin-contact">
        <div className="merlin-in merlin-sec">
          <h2>Contact</h2>
          <div className="merlin-contact-list">
            <div>
              <Mail size={18} />
              hello@northline.demo
            </div>
            <div>
              <MapPin size={18} />
              Dubai Design District, UAE
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
