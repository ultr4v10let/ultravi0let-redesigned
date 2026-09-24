/* The small decorative SVGs from markup.html. */

/* The menu button's spectrum icon: three lines and a hidden ring it folds into. */
export function SpectrumIcon() {
  return (
    <svg className="spec" viewBox="0 0 24 18" aria-hidden="true" focusable="false">
      <circle className="s0" cx="12" cy="9" r="7.5" pathLength={100} />
      <line className="s1" x1="2" y1="4" x2="22" y2="4" />
      <line className="s2" x1="2" y1="9" x2="22" y2="9" />
      <line className="s3" x1="2" y1="14" x2="22" y2="14" />
    </svg>
  )
}

/* The small halo drawn beside a phone-menu item. */
export function MenuMark() {
  return (
    <svg className="mn-mark" viewBox="-15 -15 30 30" aria-hidden="true" focusable="false">
      <line className="mk-l" x1="-14" y1="0" x2="14" y2="0" />
      <circle className="mk-r" r="8.5" pathLength={100} transform="rotate(-90)" />
      <circle className="mk-d" cx="-11.5" cy="0" r="1.7" />
      <circle className="mk-d" cx="11.5" cy="0" r="1.7" />
      <circle className="mk-s" r="1.9" />
    </svg>
  )
}

/* The marquee's separator: a line through a ring. */
export function Glyph() {
  return (
    <svg className="mq-glyph" viewBox="0 0 28 12" aria-hidden="true" focusable="false">
      <line x1="0" y1="6" x2="28" y2="6" />
      <circle cx="14" cy="6" r="4.2" />
    </svg>
  )
}
