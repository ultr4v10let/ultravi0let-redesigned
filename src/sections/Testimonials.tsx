import { testimonials } from '../content/content'
import { Rich } from '../components/Rich'

/* Plain figures and quotes. No Review markup: Google doesn't show stars for reviews a business publishes itself. */
export function Testimonials() {
  return (
    <section className="block" aria-label={testimonials.eyebrow}>
      <div className="sec-head reveal">
        <div className="lead"><span className="eyebrow">{testimonials.eyebrow}</span><h2 className="sm"><Rich text={testimonials.heading} /></h2></div>
      </div>
      <div className="quotes">
        {testimonials.items.map((q) => (
          <figure key={q.name} className="quote reveal">
            <blockquote>{q.quote}</blockquote>
            <figcaption><span className="who">{q.name}</span><span className="role">{q.role}</span></figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
