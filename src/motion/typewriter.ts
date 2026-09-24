/* The headline types itself over its own faint copy (BEHAVIOUR §4, BRIEF §7.2).
   The overlay always holds the whole sentence, split only where the typing has got to, with the rest invisible.
   Same text, same fonts: text-wrap:balance breaks it exactly where it breaks the faint copy, so every typed letter
   lands on its faint twin. The caret is outside the text flow (absolutely placed after the last typed letter), so it
   can never move a line break either. */
import { hero } from '../content/content'

const FULL = hero.headlinePlain
const [A, B] = hero.headline.split(/\[light\]|\[\/light\]/)
const isLight = (i: number) => i >= A.length && i < A.length + B.length

export function typewriter(h1: HTMLElement, reduce: boolean) {
  const overlay = h1.querySelector('.type') as HTMLElement
  const caret = h1.querySelector('.caret') as HTMLElement
  /* once typed, the real text takes over and the overlay steps aside */
  const done = () => { caret.classList.add('done'); h1.classList.add('typed') }
  if (reduce) { done(); return () => {} }
  h1.classList.add('typing')

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
  const charBox = (n: number, root: Element = overlay) => {
    const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
    for (let t = walk.nextNode(); t; t = walk.nextNode()) {
      const len = t.textContent?.length ?? 0
      if (n < len) {
        const r = document.createRange()
        r.setStart(t, n)
        r.setEnd(t, n + 1)
        return r.getBoundingClientRect()
      }
      n -= len
    }
    return null
  }
  /* the font's ascent: the caret stands on the baseline, as it did inline (height .8em, .03em below it) */
  const ascent = (fs: number) => {
    const cs = getComputedStyle(overlay)
    const ctx = document.createElement('canvas').getContext('2d')
    if (!ctx) return fs * 1.005
    ctx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`
    return ctx.measureText('W').fontBoundingBoxAscent || fs * 1.005
  }

  /* where the faint copy breaks its lines, as [start, end) character ranges (read afresh each time: fonts may swap
     and the window may resize while typing) */
  const ghost = h1.querySelector('.ghost') as HTMLElement
  const ghostLines = () => {
    const starts = [0]
    let top = -Infinity, i = 0
    const walk = document.createTreeWalker(ghost, NodeFilter.SHOW_TEXT)
    for (let t = walk.nextNode(); t; t = walk.nextNode()) {
      for (let k = 0; k < (t.textContent?.length ?? 0); k++, i++) {
        if (FULL[i] === ' ') continue
        const r = document.createRange()
        r.setStart(t, k)
        r.setEnd(t, k + 1)
        const y = r.getBoundingClientRect().top
        if (top > -Infinity && y > top + 2) starts.push(i)
        top = y
      }
    }
    return starts.map((s, j) => [s, j + 1 < starts.length ? starts[j + 1] : FULL.length] as const)
  }

  const show = (n: number) => {
    /* the overlay gets the faint copy's exact lines, one unbreakable span each, so it never balances on its own */
    const lines = ghostLines().flatMap(([s, e], j) => {
      const line = document.createElement('span')
      line.style.whiteSpace = 'nowrap'
      const m = Math.min(e, Math.max(s, n))
      line.append(...run(s, m, false), ...run(m, e, true))
      return j ? [document.createElement('br'), line] : [line]
    })
    overlay.replaceChildren(...lines, caret)
    const o = overlay.getBoundingClientRect(), fs = parseFloat(getComputedStyle(overlay).fontSize)
    /* after the last typed letter (a space typed at a line end has no usable box, so step back to the letter and
       add a space's width); before anything is typed, at the start of the first line */
    let ref = Math.max(0, n - 1)
    while (ref > 0 && FULL[ref] === ' ') ref--
    const box = charBox(ref)
    if (!box) return
    const spaces = n - 1 - ref
    const x = (n > 0 ? box.right : box.left) - o.left + (spaces > 0 ? spaces * (charBox(FULL.indexOf(' '), ghost)?.width ?? 0) : 0)
    caret.style.transform = `translate(${x.toFixed(2)}px,${(box.top - o.top + ascent(fs) - 0.77 * fs).toFixed(2)}px)`
  }

  let i = 0, t = 0
  show(0)
  const tick = () => {
    i += 1
    show(i)
    t = window.setTimeout(i < FULL.length ? tick : done, i < FULL.length ? (FULL.charAt(i - 1) === ' ' ? 60 : 32) : 1200)
  }
  t = window.setTimeout(tick, 450)
  return () => clearTimeout(t)
}
