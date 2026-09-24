/* The phone menu: the icon folds into a ring, a halo expands from it and opens a sky; closing folds the sky back
   (BEHAVIOUR §8). While it's open the rest of the page is inert (BRIEF §9). */
import { S, clamp, lerp } from './env'

type Geom = { x: number; y: number; R: number }
const outCubic = (t: number) => 1 - Math.pow(1 - t, 3)
const inCubic = (t: number) => t * t * t

export function menu(mnav: HTMLElement) {
  const mopen = document.getElementById('menu-open') as HTMLButtonElement
  const mclose = mnav.querySelector('#menu-close') as HTMLButtonElement
  const edge = document.getElementById('mn-edge') as unknown as SVGSVGElement
  const edgeC = [...edge.querySelectorAll('circle')]
  const items = [...mnav.querySelectorAll('.mn-list li')]
  /* everything but the menu: the siblings of the menu and of each of its ancestors, up to <body> */
  const rest: HTMLElement[] = []
  for (let n: Element = mnav; n.parentElement && n !== document.body; n = n.parentElement) {
    for (const sib of n.parentElement.children) {
      if (sib !== n && sib !== edge && sib instanceof HTMLElement && !(sib instanceof HTMLScriptElement)) rest.push(sib)
    }
  }
  let state: 'closed' | 'opening' | 'open' | 'closing' = 'closed'
  let raf = 0
  const timers: number[] = []
  const later = (fn: () => void, ms: number) => { timers.push(window.setTimeout(fn, ms)) }

  const geom = (): Geom => {
    const r = mopen.getBoundingClientRect()
    const x = r.left + r.width / 2, y = r.top + r.height / 2
    return { x, y, R: Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) + 48 }
  }
  const setReveal = (g: Geom, r: number, op: number) => {
    mnav.style.clipPath = `circle(${r.toFixed(1)}px at ${g.x.toFixed(1)}px ${g.y.toFixed(1)}px)`
    edgeC.forEach((c, i) => {
      c.setAttribute('cx', g.x.toFixed(1))
      c.setAttribute('cy', g.y.toFixed(1))
      c.setAttribute('r', Math.max(0, r + (i === 3 ? -3.5 : i === 0 ? 6 : 0)).toFixed(1))
    })
    edge.style.opacity = op.toFixed(3)
  }
  /* the reveal runs on its own requestAnimationFrame, so pausing the page's drawing doesn't pause it */
  const sweep = (g: Geom, from: number, to: number, dur: number, fn: (t: number) => number, done: () => void) => {
    cancelAnimationFrame(raf)
    const t0 = performance.now()
    const step = (now: number) => {
      const t = clamp((now - t0) / dur, 0, 1)
      setReveal(g, lerp(from, to, fn(t)), Math.pow(Math.sin(Math.PI * Math.min(1, t * 1.08)), 0.6))
      if (t < 1) raf = requestAnimationFrame(step)
      else done()
    }
    step(t0)
  }
  /* the section in view: the last whose top is at or above 40% of the viewport; process counts as Studio */
  const markHere = () => {
    const map: Record<string, number> = { work: 0, services: 1, studio: 2, process: 2, contact: 3 }
    let here = -1
    const mid = innerHeight * 0.4
    for (const id of Object.keys(map)) {
      const el = document.getElementById(id)
      if (el && el.getBoundingClientRect().top <= mid) here = map[id]
    }
    items.forEach((li, i) => li.classList.toggle('here', i === here))
  }
  const setInert = (on: boolean) => rest.forEach((el) => { el.inert = on })

  const open = () => {
    if (state !== 'closed') return
    state = 'opening'
    const g = geom()
    mnav.style.setProperty('--mx', `${g.x.toFixed(1)}px`)
    mnav.style.setProperty('--my', `${g.y.toFixed(1)}px`)
    markHere()
    mopen.setAttribute('aria-expanded', 'true')
    document.body.style.overflow = 'hidden'
    setInert(true)
    if (S.reduce) {
      mnav.classList.add('show', 'in')
      mnav.style.clipPath = 'none'
      state = 'open'
      S.menuOpen = true
      mclose.focus({ preventScroll: true })
      return
    }
    mopen.classList.add('to-ring')
    later(() => {
      setReveal(g, 0, 0)
      mnav.classList.add('show')
      edge.classList.add('show')
      void mnav.offsetWidth
      mnav.classList.add('in')
      sweep(g, 0, g.R, 780, outCubic, () => {
        mnav.style.clipPath = 'none'
        edge.classList.remove('show')
        state = 'open'
        S.menuOpen = true
        mclose.focus({ preventScroll: true })
      })
    }, 230)
  }

  const close = (after?: () => void) => {
    if (state !== 'open') return
    state = 'closing'
    S.menuOpen = false
    const g = geom()
    const finish = () => {
      mnav.classList.remove('show', 'in', 'out')
      edge.classList.remove('show')
      mnav.style.clipPath = ''
      mclose.classList.remove('to-ring')
      document.body.style.overflow = ''
      setInert(false)
      mopen.setAttribute('aria-expanded', 'false')
      state = 'closed'
      mopen.focus({ preventScroll: true })
      later(() => mopen.classList.remove('to-ring'), 90)
      after?.()
    }
    if (S.reduce) { finish(); return }
    mclose.classList.add('to-ring')
    mnav.classList.remove('in')
    mnav.classList.add('out')
    later(() => {
      edge.classList.add('show')
      sweep(g, g.R, 0, 560, inCubic, finish)
    }, 260)
  }

  const onOpen = () => open()
  const onClose = () => close()
  const onLink = (ev: Event) => {
    ev.preventDefault()
    const target = document.querySelector((ev.currentTarget as HTMLAnchorElement).getAttribute('href') || '')
    close(() => target?.scrollIntoView({ behavior: S.reduce ? 'auto' : 'smooth' }))
  }
  const onKey = (ev: KeyboardEvent) => { if (state === 'open' && ev.key === 'Escape') close() }
  const onResize = () => { if (state === 'open' && innerWidth > 880) close() }
  const links = [...mnav.querySelectorAll<HTMLAnchorElement>('.mn-list a')]

  mopen.addEventListener('click', onOpen)
  mclose.addEventListener('click', onClose)
  links.forEach((l) => l.addEventListener('click', onLink))
  document.addEventListener('keydown', onKey)
  addEventListener('resize', onResize)

  return () => {
    cancelAnimationFrame(raf)
    timers.forEach(clearTimeout)
    mopen.removeEventListener('click', onOpen)
    mclose.removeEventListener('click', onClose)
    links.forEach((l) => l.removeEventListener('click', onLink))
    document.removeEventListener('keydown', onKey)
    removeEventListener('resize', onResize)
    setInert(false)
    document.body.style.overflow = ''
    S.menuOpen = false
  }
}
