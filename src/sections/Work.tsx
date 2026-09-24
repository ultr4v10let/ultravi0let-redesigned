import { useCallback, useEffect, useRef, useState } from 'react'
import type { KeyboardEvent, Ref } from 'react'
import { work } from '../content/content'
import { Glyph } from '../components/Icons'
import { Rich } from '../components/Rich'
import { reducedMotion } from '../motion/env'
import { selectSky } from '../motion/workViewer'

const P = work.projects
const [figBefore, figAfter] = work.viewer.figure.split('{n}')
const STEP: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }

/* Work: a day of halos (BEHAVIOUR §5). The rows are a vertical tablist; every project's copy is in the HTML as a
   tab panel. `sel` moves at once (row, tab state, sky); `shown` follows 200ms later, while the text is faded out. */
export function Work({ ref }: { ref?: Ref<HTMLElement> }) {
  const [sel, setSel] = useState(0)
  const [shown, setShown] = useState(0)
  const [fading, setFading] = useState(false)
  const selRef = useRef(0)
  const timer = useRef(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  const select = useCallback((i: number) => {
    if (i === selRef.current || i < 0) return
    selRef.current = i
    setSel(i)
    selectSky(i)
    clearTimeout(timer.current)
    if (reducedMotion()) {
      setShown(i)
      setFading(false)
      return
    }
    setFading(true)
    timer.current = window.setTimeout(() => { setShown(i); setFading(false) }, 200)
  }, [])

  /* On phones, scrolling selects: a row is chosen as it crosses a band at 62–70% of the viewport height. */
  useEffect(() => {
    const rows = tabs.current.filter((r): r is HTMLButtonElement => !!r)
    const narrow = matchMedia('(max-width: 880px)')
    const io = new IntersectionObserver((entries) => {
      if (!narrow.matches) return
      for (const en of entries) if (en.isIntersecting) select(rows.indexOf(en.target as HTMLButtonElement))
    }, { rootMargin: '-62% 0px -30% 0px', threshold: 0 })
    rows.forEach((r) => io.observe(r))
    return () => { io.disconnect(); clearTimeout(timer.current) }
  }, [select])

  const onKey = (e: KeyboardEvent) => {
    let next = -1
    if (e.key in STEP) next = (sel + STEP[e.key] + P.length) % P.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = P.length - 1
    if (next < 0) return
    e.preventDefault()
    tabs.current[next]?.focus()
    select(next)
  }

  const s = P[shown]
  return (
    <section ref={ref} className="block" id="work">
      <div className="sec-head reveal">
        <div className="lead"><span className="eyebrow">{work.eyebrow}</span><h2><Rich text={work.heading} /></h2></div>
        <div className="work-hint"><span className="eyebrow">{work.hint[0]}</span><Glyph /><span className="eyebrow">{work.hint[1]}</span></div>
      </div>
      <div className="work-grid">
        <div className="index" id="work-index" role="tablist" aria-orientation="vertical" aria-label="Projects" onKeyDown={onKey}>
          {P.map((p, i) => (
            <button
              key={p.n}
              ref={(el) => { tabs.current[i] = el }}
              type="button"
              role="tab"
              id={`work-tab-${p.n}`}
              aria-selected={i === sel}
              aria-controls={`work-panel-${p.n}`}
              tabIndex={i === sel ? 0 : -1}
              className={i === sel ? 'row on' : 'row'}
              onMouseEnter={() => select(i)}
              onFocus={() => select(i)}
              onClick={() => select(i)}
            >
              <span className="num">{p.n}</span>
              <span className="row-title"><span className="row-name">{p.name}</span><span className="tags">{`${p.status} · ${p.tags}`}</span></span>
              <span className="year">{p.year}</span>
            </button>
          ))}
        </div>
        <div className="viewer">
          <div className={shown === 0 ? 'v-art light-sky' : 'v-art'} id="v-art">
            <canvas id="vsky" aria-hidden="true" />
            <div className="v-cap tl"><span>{s.status}</span><span className="dim">{s.tags}</span></div>
            <div className="v-cap tr"><span className="m">{figBefore}<span>{s.n}</span>{figAfter}</span><span>{work.viewer.skyLabels[shown]}</span><span className="m">{s.year}</span></div>
          </div>
          <div className={fading ? 'v-read fade' : 'v-read'}>
            {P.map((p, i) => (
              <div key={p.n} role="tabpanel" id={`work-panel-${p.n}`} aria-labelledby={`work-tab-${p.n}`} hidden={i !== shown}>
                <div className="v-head"><h3 className="v-name">{p.name}</h3><a className="v-link" href="#contact">{work.viewer.link}</a></div>
                <p className="v-desc">{p.description}</p>
                <div className="stats">
                  {p.stats.map((st) => <span key={st.label}><b>{st.value}</b>{` ${st.label}`}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
