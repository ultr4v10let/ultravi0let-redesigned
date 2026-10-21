import { engagement, site } from '../content/content'
import { Rich } from '../components/Rich'

/* The commercial offer. The four-phase film below stays the visual process; these three steps are how a client hires us. */
export function Engagement() {
  return (
    <section className="block two-col" id="engagement">
      <div className="lead reveal">
        <span className="eyebrow">{engagement.eyebrow}</span>
        <h2 className="md"><Rich text={engagement.heading} /></h2>
        <p>{engagement.lead}</p>
      </div>
      <div className="svcs reveal">
        {engagement.steps.map((s) => (
          <div key={s.n} className="svc">
            <span className="num">{s.n}</span>
            <div className="svc-title"><h3 className="svc-name">{s.name}</h3><span className="tags">{s.summary}</span></div>
            <div className="svc-copy">
              <p className="svc-desc">{s.description}</p>
              <p className="svc-cta">
                <a href={s.href}>{engagement.cta}</a>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
