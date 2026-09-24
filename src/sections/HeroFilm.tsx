import type { Ref } from 'react'
import { heroFilm, hero, site } from '../content/content'
import { HaloMarks } from '../components/HaloMark'
import { Rich } from '../components/Rich'

const [wmLeft, wmRight] = hero.endcard.wordmark.split('0')

/* The opening film (BEHAVIOUR §3). Static markup; motion/heroFilm.ts scrubs it. */
export function HeroFilm({ ref }: { ref?: Ref<HTMLElement> }) {
  return (
    <section ref={ref} className="film" id="top" aria-label="Introduction">
      <div className="stage" id="stage">
        <canvas id="sky" aria-hidden="true" />

        <div className="film-hero" id="film-hero">
          <div className="wrap">
            <div className="hero-top">
              {hero.eyebrows.map((e) => <span key={e} className="eyebrow">{e}</span>)}
            </div>
            {/* The real headline paints at once, faintly; the typing overlay writes over it (BEHAVIOUR §4, BRIEF §7). */}
            <h1>
              <span className="ghost"><Rich text={hero.headline} /></span>
              <span className="type" aria-hidden="true"><span id="t1" /><span id="t2" className="light" /><span id="t3" /><span className="caret" id="caret" /></span>
            </h1>
            <div className="hero-sub">
              <p>{hero.sub}</p>
              <div className="hero-actions">
                <a href={hero.actions[0].href} className="btn">{hero.actions[0].label}</a>
                <a href={hero.actions[1].href} className="textlink">
                  <span>{hero.actions[1].label}</span>
                  <svg viewBox="0 0 10 16" aria-hidden="true"><path d="M5 0 V14 M1 10 L5 14 L9 10" fill="none" strokeWidth="1.2" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div aria-hidden="true">
          {hero.ringLabels.map((label, i) => (
            <div key={label} className="ring-label"><i>{`0${i + 1}`}</i>{label}</div>
          ))}
        </div>

        <div className="endcard" id="endcard">
          <div className="bigword" role="img" aria-label={site.name}>
            <span className="half">{wmLeft}</span>
            <span className="zero-slot" id="zero-slot"><HaloMarks /></span>
            <span className="half">{wmRight}</span>
          </div>
          <div className="end-sub" id="end-sub">
            <p className="tagline">{hero.endcard.tagline}</p>
            <div className="stats-strip">
              {hero.endcard.stats.map((s) => (
                <div key={s.k}><span className="k">{s.k}</span><span className="v">{s.v}</span></div>
              ))}
            </div>
          </div>
        </div>

        <div className="film-ui" aria-hidden="true">
          <div className="wrap">
            {/* each side holds invisible copies of its widest text, so the bar between them never changes length */}
            <span className="chapter" id="chapter">
              <span className="now"><i>01</i>{hero.film.chapters[0]}</span>
              {hero.film.chapters.map((c, i) => <span key={c} className="size"><i>{`0${i + 1}`}</i>{c}</span>)}
            </span>
            <span className="bar">
              <b id="bar-fill" />
              {heroFilm.chapters.list.slice(1).map(([at]) => <s key={at} style={{ left: `${Math.round(Number(at) * 100)}%` }} />)}
            </span>
            <span className="pct" id="pct">
              <span className="now">{hero.film.scrollHint}</span>
              <span className="size">{hero.film.progressFormat.replace('NNN', '100')}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
