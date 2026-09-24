/* The headline types itself over its own faint copy (BEHAVIOUR §4). */
import { hero } from '../content/content'

const FULL = hero.headlinePlain
const [A, B] = hero.headline.split(/\[light\]|\[\/light\]/)

export function typewriter(h1: HTMLElement, reduce: boolean) {
  const [e1, e2, e3] = ['#t1', '#t2', '#t3'].map((s) => h1.querySelector(s) as HTMLElement)
  const caret = h1.querySelector('.caret') as HTMLElement
  /* once typed, the real text takes over and the overlay steps aside */
  const done = () => { caret.classList.add('done'); h1.classList.add('typed') }
  if (reduce) { done(); return () => {} }
  const show = (n: number) => {
    const s = FULL.slice(0, n)
    e1.textContent = s.slice(0, A.length)
    e2.textContent = s.slice(A.length, A.length + B.length)
    e3.textContent = s.slice(A.length + B.length)
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
