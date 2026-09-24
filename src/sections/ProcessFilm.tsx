import type { Ref } from 'react'
import { process } from '../content/content'
import { Rich } from '../components/Rich'

const [labelShort, labelLong] = process.label.split(' · ')

/* One waypoint on the sun's path: a small halo that lights up once the sun reaches its phase. */
function Waypoint({ i }: { i: number }) {
  return (
    <g className="pw" id={`pw${i}`}>
      <circle className="pw-shade" r="15" />
      <circle className="pw-ghost" r="11" />
      <line className="pw-line" x1="-23" y1="0" x2="23" y2="0" />
      <circle className="pw-ring" r="11" pathLength={100} transform="rotate(-90)" />
      <circle className="pw-dog" cx="-14.5" cy="0" r="1.9" />
      <circle className="pw-dog" cx="14.5" cy="0" r="1.9" />
      <circle className="pw-sun" r="2.3" />
    </g>
  )
}

/* How we work: one day, four phases (BEHAVIOUR §6). Static markup; motion/processFilm.ts scrubs it. */
export function ProcessFilm({ ref }: { ref?: Ref<HTMLElement> }) {
  return (
    <section ref={ref} className="pfilm" id="process" aria-label={process.eyebrow}>
      <div className="pstage" id="pstage">
        <canvas id="psky" aria-hidden="true" />
        <svg className="pover" id="pover" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="pTrailG" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1440" y2="0">
              <stop offset="0" style={{ stopColor: 'var(--dawn)' }} />
              <stop offset="0.5" style={{ stopColor: 'var(--noon)' }} />
              <stop offset="1" style={{ stopColor: 'var(--dusk)' }} />
            </linearGradient>
          </defs>
          <clipPath id="pClip"><rect id="p-cliprect" x="0" y="0" width="10" height="10" /></clipPath>
          <g clipPath="url(#pClip)" id="p-marks">
            <path className="p-arc" id="p-arc" d="M0 0" />
            <path className="p-trail" id="p-trail" d="M0 0" stroke="url(#pTrailG)" />
            {[0, 1, 2, 3].map((i) => <Waypoint key={i} i={i} />)}
          </g>
        </svg>
        <div className="p-time" id="p-time" aria-hidden="true">05:50</div>

        <div className="p-intro" id="p-intro">
          <div className="wrap sec-head">
            <div className="lead"><span className="eyebrow">{process.eyebrow}</span><h2 className="md"><Rich text={process.heading} /></h2></div>
            <p>{process.lead}</p>
          </div>
        </div>
        <div className="p-label" id="p-label" aria-hidden="true">
          <div className="wrap"><span>{labelShort}<span className="lbl-long">{` · ${labelLong}`}</span></span></div>
        </div>

        <div className="p-ground" id="p-ground">
          <div className="p-rail" aria-hidden="true">
            <span className="p-fill" id="p-fill" />
            {process.phases.map((ph, i) => (
              <span key={ph.name} className="p-step"><i>{`0${i + 1}`}</i><b>{ph.name}</b></span>
            ))}
          </div>
          <div className="wrap">
            <div className="p-phases">
              {process.phases.map((ph) => (
                <article key={ph.name} className="p-phase" aria-label={`${ph.phase}, ${ph.name}`}>
                  <div className="p-l">
                    <span className="eyebrow">{ph.phase} · <span className="l-only">{ph.timeOfDay.light}</span><span className="d-only">{ph.timeOfDay.dark}</span></span>
                    <h3 className="p-name">{ph.name}</h3>
                  </div>
                  <div className="p-r"><p>{ph.description}</p><span className="phase-tags">{ph.tags}</span></div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
