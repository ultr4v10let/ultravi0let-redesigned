import { team } from '../content/content'
import { founders } from '../content/team'
import { Rich } from '../components/Rich'

/* Only founders with a real entry are rendered. Empty slots stay in team.ts as TODOs, not on the page. */
export function Team() {
  return (
    <section className="block" id="team">
      <div className="sec-head reveal">
        <div className="lead">
          <span className="eyebrow">{team.eyebrow}</span>
          <h2 className="sm"><Rich text={team.heading} /></h2>
        </div>
        <p>{team.lead}</p>
      </div>
      {founders.length > 0 && (
        <ul className="people">
          {founders.map((p) => (
            <li key={p.name} className="person">
              <h3>{p.name}</h3>
              <p className="role">{p.role}</p>
              <p className="bio">{p.bio}</p>
              {p.linkedin && <a href={p.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
