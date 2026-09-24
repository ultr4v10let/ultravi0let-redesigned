import { Fragment } from 'react'
import { marquee } from '../content/content'
import { Glyph } from '../components/Icons'

/* Decorative: the same disciplines are listed in Services, so the whole strip is hidden from assistive tech. */
export function Marquee() {
  const run = (
    <div className="mq-run">
      {marquee.map((w) => <Fragment key={w}><span>{w}</span><Glyph /></Fragment>)}
    </div>
  )
  return (
    <div className="marquee" aria-hidden="true">
      <div className="mq-track">{run}{run}</div>
    </div>
  )
}
