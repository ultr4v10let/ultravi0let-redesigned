/* Light and dark (BEHAVIOUR §1, BRIEF §6). data-theme on <html> is set before first paint by the inline script in
   the head; this module keeps it, the two switches and theme-color in step, and runs the circle reveal. */
import { paper, ui } from '../content/content'
import { S } from './env'

type Theme = 'light' | 'dark'
const root = () => document.documentElement
const stored = (): Theme | null => {
  try {
    const t = localStorage.getItem('theme')
    return t === 'light' || t === 'dark' ? t : null
  } catch { return null }
}

export function theme(redrawNow: () => void) {
  const switches = [...document.querySelectorAll<HTMLButtonElement>('.switch')]
  const metas = [...document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')]
  const metaDefaults = metas.map((m) => m.content)
  const sys = matchMedia('(prefers-color-scheme: dark)')
  let busy = false

  const paint = (t: Theme) => {
    S.theme = t
    if (root().getAttribute('data-theme') !== t) root().setAttribute('data-theme', t)
    switches.forEach((s) => {
      s.setAttribute('aria-checked', String(t === 'dark'))
      s.setAttribute('aria-label', t === 'dark' ? ui.switchToLight : ui.switchToDark)
    })
    /* the media queries on theme-color only follow the system; a chosen theme overrides both */
    const own = stored()
    metas.forEach((m, i) => { m.content = own ? paper[own] : metaDefaults[i] })
  }
  const ease = (t: Theme) => { S.nightTarget = t === 'dark' ? 1 : 0; S.needAll() }

  const cur = root().getAttribute('data-theme')
  S.theme = cur === 'light' || cur === 'dark' ? cur : sys.matches ? 'dark' : 'light'
  S.night = S.nightTarget = S.theme === 'dark' ? 1 : 0
  paint(S.theme)

  /* while nothing is stored, follow the system live */
  const onSys = () => { if (!stored()) { paint(sys.matches ? 'dark' : 'light'); ease(S.theme) } }
  sys.addEventListener('change', onSys)

  const onClick = (e: MouseEvent) => {
    if (busy) return
    const sw = e.currentTarget as HTMLElement
    const next: Theme = S.theme === 'dark' ? 'light' : 'dark'
    try { localStorage.setItem('theme', next) } catch { /* private mode: the choice lasts this visit */ }
    switches.forEach((s) => {
      s.setAttribute('aria-checked', String(next === 'dark'))
      s.classList.remove('draw')
      void s.offsetWidth
      s.classList.add('draw')
    })
    if (S.reduce || !('startViewTransition' in document)) { paint(next); ease(next); return }
    busy = true
    setTimeout(() => {
      const r = sw.getBoundingClientRect()
      const x = r.left + r.width / 2, y = r.top + r.height / 2
      const R = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
      root().classList.add('vt')
      try {
        const tr = document.startViewTransition(() => {
          paint(next)
          S.night = S.nightTarget = next === 'dark' ? 1 : 0
          redrawNow()
        })
        tr.ready.then(() => {
          root().animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${R}px at ${x}px ${y}px)`] },
            { duration: 900, easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)', pseudoElement: '::view-transition-new(root)' })
        }).catch(() => {})
        tr.finished.finally(() => { root().classList.remove('vt'); busy = false })
      } catch {
        root().classList.remove('vt')
        busy = false
        paint(next)
        ease(next)
      }
    }, 380)
  }
  switches.forEach((s) => s.addEventListener('click', onClick))

  return () => {
    sys.removeEventListener('change', onSys)
    switches.forEach((s) => s.removeEventListener('click', onClick))
  }
}
