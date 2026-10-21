/* The headline types itself over its own faint copy (BEHAVIOUR §4, BRIEF §7.2).
   The overlay always holds the whole sentence, laid out on the faint copy's own lines (one unbreakable span each),
   split only where the typing has got to, with the rest invisible: every typed letter lands on its faint twin.
   The caret sits outside the text flow, after the last typed letter, so it can't move a line break either.
   Geometry (the faint copy's lines and letter boxes) is measured once and again only after a resize or a font load,
   so a keystroke only writes to the page. */
import { hero } from '../content/content'

const FULL = hero.headlinePlain
const [A, B] = hero.headline.split(/\[light\]|\[\/light\]/)
const isLight = (i: number) => i >= A.length && i < A.length + B.length

type Geo = { lines: [number, number][]; boxes: { left: number; right: number; top: number }[]; ascent: number; fs: number; space: number }

export function typewriter(h1: HTMLElement, reduce: boolean) {
  const ghost = h1.querySelector('.ghost') as HTMLElement
  const overlay = h1.querySelector('.type') as HTMLElement
  const caret = h1.querySelector('.caret') as HTMLElement
  /* once typed, the real text takes over and the overlay steps aside */
  const done = () => { caret.classList.add('done'); h1.classList.add('typed') }
  if (reduce) { done(); return () => {} }
  h1.classList.add('typing')

  /* the faint copy's lines as [start, end) ranges, and each letter's box relative to it (the overlay shares its box) */
  let geo: Geo | null = null
  const measure = (): Geo => {
    const g = ghost.getBoundingClientRect()
    const boxes: Geo['boxes'] = [], starts = [0]
    let top = -Infinity, i = 0
    const walk = document.createTreeWalker(ghost, NodeFilter.SHOW_TEXT)
    for (let t = walk.nextNode(); t; t = walk.nextNode()) {
      for (let k = 0; k < (t.textContent?.length ?? 0); k++, i++) {
        const r = document.createRange()
        r.setStart(t, k)
        r.setEnd(t, k + 1)
        const b = r.getBoundingClientRect()
        boxes[i] = { left: b.left - g.left, right: b.right - g.left, top: b.top - g.top }
        if (FULL[i] === ' ') continue
        if (top > -Infinity && b.top > top + 2) starts.push(i)
        top = b.top
      }
    }
    const cs = getComputedStyle(ghost), fs = parseFloat(cs.fontSize)
    /* the font's ascent puts the caret on the baseline, as it stood inline (height .8em, .03em below the baseline) */
    const ctx = document.createElement('canvas').getContext('2d')
    let ascent = fs * 1.005
    if (ctx) {
      ctx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`
      ascent = ctx.measureText('W').fontBoundingBoxAscent || ascent
    }
    const sp = boxes[FULL.indexOf(' ')]
    return { lines: starts.map((s, j) => [s, j + 1 < starts.length ? starts[j + 1] : FULL.length]), boxes, ascent, fs, space: sp.right - sp.left }
  }
  const forget = () => { geo = null }
  const ro = new ResizeObserver(forget)
  ro.observe(ghost)
  document.fonts.addEventListener('loadingdone', forget)

  /* spans for FULL[from..to), one per weight, like the faint copy's own spans */
  const run = (from: number, to: number, rest: boolean) => {
    const out: HTMLElement[] = []
    for (let i = from; i < to;) {
      let j = i + 1
      while (j < to && isLight(j) === isLight(i)) j++
      const s = document.createElement('span')
      s.textContent = FULL.slice(i, j)
      if (isLight(i)) s.className = 'light'
      if (rest) s.classList.add('rest')
      out.push(s)
      i = j
    }
    return out
  }

  const show = (n: number) => {
    geo ??= measure()
    const lines = geo.lines.flatMap(([s, e], j) => {
      const line = document.createElement('span')
      line.style.whiteSpace = 'nowrap'
      const m = Math.min(e, Math.max(s, n))
      line.append(...run(s, m, false), ...run(m, e, true))
      return j ? [document.createElement('br'), line] : [line]
    })
    overlay.replaceChildren(...lines, caret)
    /* after the last typed letter (a space typed at a line end has no usable box, so step back to the letter and add
       a space's width); before anything is typed, at the start of the first line */
    let ref = Math.max(0, n - 1)
    while (ref > 0 && FULL[ref] === ' ') ref--
    const box = geo.boxes[ref]
    const x = (n > 0 ? box.right : box.left) + Math.max(0, n - 1 - ref) * geo.space
    caret.style.transform = `translate(${x.toFixed(2)}px,${(box.top + geo.ascent - 0.77 * geo.fs).toFixed(2)}px)`
  }

  let i = 0, t = 0
  show(0)
  const tick = () => {
    i += 1
    show(i)
    t = window.setTimeout(i < FULL.length ? tick : finish, i < FULL.length ? (FULL.charAt(i - 1) === ' ' ? 60 : 32) : 1200)
  }
  const stop = () => { ro.disconnect(); document.fonts.removeEventListener('loadingdone', forget) }
  const finish = () => { stop(); done() }
  t = window.setTimeout(tick, 450)
  return () => { clearTimeout(t); stop() }
}
