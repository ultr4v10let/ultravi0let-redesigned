import { services } from '../content/content'
import { Rich } from '../components/Rich'

export function Services() {
  return (
    <section className="block two-col" id="services">
      <div className="lead reveal">
        <span className="eyebrow">{services.eyebrow}</span>
        <h2 className="md"><Rich text={services.heading} /></h2>
        <p>{services.lead}</p>
      </div>
      <div className="svcs reveal">
        {services.items.map((s) => (
          <div key={s.n} className="svc">
            <span className="num">{s.n}</span>
            <div className="svc-title"><h3 className="svc-name">{s.name}</h3><span className="tags">{s.tags}</span></div>
            <p className="svc-desc">{s.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
