/* The one requestAnimationFrame loop (BRIEF §7.4). Each film says whether it wants to draw this frame; all layout
   reads happen before any writes. Sky contexts are created lazily (§7.3) and lose pixels if frames run slow (§7.5). */
import { reducedMotion, S } from './env'
import type { Film } from './env'
import type * as SkyModule from './sky/renderer'
import { header } from './header'
import { heroFilm } from './heroFilm'
import { menu } from './menu'
import { processFilm } from './processFilm'
import { theme } from './theme'
import { typewriter } from './typewriter'
import { workViewer } from './workViewer'

declare global {
  interface Window {
    /* tests: keep every canvas at its full pixel budget */
    __uvFixedQuality?: boolean
  }
}

export interface MotionRefs { header: HTMLElement; menu: HTMLElement; film: HTMLElement; work: HTMLElement; process: HTMLElement }

export function startMotion(r: MotionRefs) {
  let alive = true
  S.reduce = reducedMotion()
  document.documentElement.classList.remove('no-gl')
  /* the typewriter goes first, so nothing that throws later can leave the headline faint */
  const stopTyping = typewriter(r.film.querySelector('h1') as HTMLElement, S.reduce)
  const hero = heroFilm(r.film), work = workViewer(r.work), proc = processFilm(r.process)
  const films: Film[] = [hero, work, proc]
  const hdr = header(r.header, r.film, r.process)
  let needHead = true
  S.needAll = () => { films.forEach((f) => { f.need = true }); needHead = true }

  const redrawNow = () => {
    const now = performance.now()
    hero.read?.(); proc.read?.(); hdr.read()
    hero.write(now); work.write(now)
    if (proc.inView) proc.write(now)
    hdr.write()
  }
  const cleanups = [stopTyping, theme(redrawNow), menu(r.menu)]

  const measure = () => { films.forEach((f) => f.measure()); hdr.measure(); needHead = true }
  measure()

  /* ---- sky contexts: the renderer is imported on idle; each canvas gets a context when its section nears ---- */
  let mod: typeof SkyModule | null = null
  const near = new Set<Film>(), tried = new Set<Film>(), born = new Map<Film, number>()
  const tryAttach = (f: Film) => {
    if (!mod || tried.has(f) || !near.has(f)) return
    tried.add(f)
    const s = mod.Sky.create(f.canvas, f.budget())
    f.attach(s)
    /* says whether this canvas got a context: handy when debugging, and the parity tests wait for it */
    f.canvas.dataset.gl = s ? '1' : '0'
    if (!s) return
    s.onLost = (lost) => { f.fallback(lost); if (!lost) { f.need = true; needHead = true } }
    born.set(f, performance.now())
    /* draw the first frame in the same task, so the canvas is never blank */
    f.read?.()
    f.write(performance.now())
    needHead = true
  }
  const nearIO = new IntersectionObserver((es) => es.forEach((e) => {
    const f = films.find((x) => (x.target ?? r.film) === e.target)
    if (f && e.isIntersecting) { near.add(f); tryAttach(f) }
  }), { rootMargin: '100% 0px 100% 0px' })
  const viewIO = new IntersectionObserver((es) => es.forEach((e) => {
    const f = films.find((x) => (x.target ?? r.film) === e.target)
    if (f) { f.inView = e.isIntersecting; if (f.inView) f.need = true }
  }))
  films.forEach((f) => { nearIO.observe(f.target ?? r.film); viewIO.observe(f.target ?? r.film) })

  const load = () => import('./sky/renderer')
    .then((m) => { if (alive) { mod = m; films.forEach(tryAttach) } })
    .catch(() => { if (alive) films.forEach((f) => { if (!tried.has(f)) { tried.add(f); f.attach(null) } }) })
  /* Safari has no requestIdleCallback */
  const ric = window.requestIdleCallback as typeof requestIdleCallback | undefined
  const idleId = ric ? ric(load, { timeout: 2000 }) : window.setTimeout(load, 200)

  /* ---- adaptive quality: three slow frames in a row after a canvas drew → 30% fewer pixels, down to half ----
     "Slow" is measured against the display's own pace (the shortest recent frame), so a 30 fps screen (iOS Low Power
     Mode, energy savers) isn't taken for a struggling GPU. Frames during the theme's view transition don't count. */
  const slow = new Map<Film, number>(), recent: number[] = []
  let drew: Film[] = []
  const adapt = (dt: number, now: number) => {
    recent.push(dt)
    if (recent.length > 60) recent.shift()
    if (window.__uvFixedQuality || document.documentElement.classList.contains('vt')) return
    const slowAt = Math.max(24, 1.5 * Math.min(...recent))
    for (const f of drew) {
      if (!f.sky || now - (born.get(f) ?? now) < 1000) continue
      const c = dt > slowAt ? (slow.get(f) ?? 0) + 1 : 0
      if (c >= 3) { if (f.sky.degrade()) f.need = true; slow.set(f, 0) } else slow.set(f, c)
    }
  }

  /* ---- the loop ---- */
  let raf = 0, lastT = performance.now()
  const frame = (now: number) => {
    raf = requestAnimationFrame(frame)
    const dt = Math.min(64, now - lastT)
    lastT = now
    adapt(dt, now)
    drew = []
    if (Math.abs(S.night - S.nightTarget) > 0.001) { S.night += (S.nightTarget - S.night) * Math.min(1, dt / 180); S.needAll() }
    else S.night = S.nightTarget
    if (document.hidden || S.menuOpen) return
    const draw = films.filter((f) => f.wants(now))
    const head = needHead || draw.includes(hero) || draw.includes(proc)
    draw.forEach((f) => f.read?.())
    if (head) hdr.read()
    draw.forEach((f) => f.write(now))
    if (head) { hdr.write(); needHead = false }
    drew = draw
  }
  raf = requestAnimationFrame(frame)

  const onScroll = () => { hero.need = true; proc.need = true; needHead = true }
  let rt = 0
  const onResize = () => { clearTimeout(rt); rt = window.setTimeout(measure, 120) }
  addEventListener('scroll', onScroll, { passive: true })
  addEventListener('resize', onResize)
  document.fonts.ready.then(() => { if (alive) { hero.measure(); proc.measure() } })

  return () => {
    alive = false
    cancelAnimationFrame(raf)
    clearTimeout(rt)
    if (ric) cancelIdleCallback(idleId)
    else clearTimeout(idleId)
    removeEventListener('scroll', onScroll)
    removeEventListener('resize', onResize)
    nearIO.disconnect()
    viewIO.disconnect()
    cleanups.forEach((c) => c())
    /* free the GPU contexts when the page is left */
    films.forEach((f) => f.sky?.release())
  }
}
