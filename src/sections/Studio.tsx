import { studio } from '../content/content'

export function Studio() {
  return (
    <section className="block two-col reveal" id="studio">
      <div className="lead"><span className="eyebrow">{studio.eyebrow}</span><h2 className="note-title">{studio.title}</h2></div>
      <div className="note"><p>{studio.note}</p><span className="eyebrow">{studio.signature}</span></div>
    </section>
  )
}
