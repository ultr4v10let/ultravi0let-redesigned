/* The opening film (BEHAVIOUR §3): a dawn sky grows a 22° halo, which then becomes the zero of the wordmark. */
import { hero as copy, heroFilm as data, paper } from '../content/content'
import { S, clamp, ease, hex, lerp, mix3, mixPal, sstep, toPal } from './env'
import type { Film } from './env'
import type { Sky } from './sky/renderer'

const PAL = { dawn: toPal(data.dawn), clear: toPal(data.clear), ndawn: toPal(data.nightDawn), nclear: toPal(data.nightClear) }
const PAPER = [hex(paper.light), hex(paper.dark)] as const
const CHAPTER_AT = data.chapters.list.map((c) => Number(c[0]))
const LABEL_AT = data.ringLabels.list.map((l) => Number(l[2]))
const pad3 = (n: number) => String(n).padStart(3, '0')

export function heroFilm(film: HTMLElement): Film {
  const q = <T extends Element>(s: string) => film.querySelector(s) as T
  const stage = q<HTMLElement>('.stage'), canvas = q<HTMLCanvasElement>('#sky')
  const heroEl = q<HTMLElement>('.film-hero'), endsub = q<HTMLElement>('.end-sub'), slot = q<HTMLElement>('.zero-slot')
  const halves = [...film.querySelectorAll<HTMLElement>('.bigword .half')]
  const zeros = [...slot.querySelectorAll('svg')]
  const labels = [...film.querySelectorAll<HTMLElement>('.ring-label')]
  const chapterEl = q<HTMLElement>('.chapter'), barEl = q<HTMLElement>('.bar b'), pctEl = q<HTMLElement>('.pct')

  let sky: Sky | null = null
  let failed = false
  let zero = { x: 0, y: 0, r: 20 }, W = 1, H = 1, labelW: number[] = []
  let top = 0, height = 1
  let veil = 0, pNow = 0, lastChapter = '', lastPct = ''

  const fail = () => { failed = true; sky = null; document.documentElement.classList.add('no-gl') }

  const self: Film = {
    name: 'hero',
    inView: true,
    need: true,
    last: 0,
    get sky() { return sky },
    budget: () => (Math.min(screen.width, screen.height) < 600 ? 0.9e6 : 2.0e6),
    canvas,
    attach(s) { if (s) { sky = s; s.size(W, H); self.need = true } else fail() },
    measure() {
      W = stage.clientWidth
      H = stage.clientHeight
      const s = slot.getBoundingClientRect(), g = stage.getBoundingClientRect()
      labelW = labels.map((l) => l.offsetWidth)
      zero = { x: s.left - g.left + s.width / 2, y: s.top - g.top + s.height / 2, r: s.height * 0.48 }
      const box = (zero.r * 46 / 11).toFixed(1)
      zeros.forEach((z) => { z.setAttribute('width', box); z.setAttribute('height', box) })
      sky?.size(W, H)
      self.need = true
    },
    wants(now) {
      const drifting = !S.reduce && !!sky && (S.night > 0.01 || veil > 0.01) && pNow < 0.965
      return self.inView && (self.need || (drifting && now - self.last > 50))
    },
    read() {
      const r = film.getBoundingClientRect()
      top = r.top
      height = r.height
    },
    write(now) {
      self.need = false
      self.last = now
      if (sky?.lost) fail()
      const total = height - H
      const p = total > 0 ? clamp(-top / total, 0, 1) : 0
      const portrait = H > W * 1.05, night = S.night
      const skyT = sstep(0.04, 0.3, p)
      const rise = ease(sstep(0.03, 0.32, p))
      const R0 = Math.min(W, H) * (portrait ? 0.3 : 0.29)
      let sx = W / 2, sy = lerp(H * (portrait ? 0.8 : 0.73), H * (portrait ? 0.47 : 0.5), rise), R = R0
      const m = ease(sstep(0.72, 0.9, p))
      if (m > 0) { sx = lerp(sx, zero.x, m); sy = lerp(sy, zero.y, m); R = R0 * Math.pow(zero.r / R0, m) }
      const ringLin = clamp((p - 0.3) / 0.26, 0, 1)
      pNow = p
      veil = sstep(0.1, 0.32, p)
      const paperMix = sstep(0.73, 0.86, p)
      if (sky && p < 0.965) {
        const pal = mixPal(mixPal(PAL.dawn, PAL.clear, skyT), mixPal(PAL.ndawn, PAL.nclear, skyT), night)
        sky.draw({
          time: S.reduce ? 4 : now / 1000, sx, sy, R, sunR: Math.max(R * (0.035 + 0.01 * night), 2.2),
          top: pal.top, mid: pal.mid, low: pal.low, haze: pal.haze, glare: pal.glare, midPos: pal.midPos, hazeAmt: pal.hazeAmt, glareAmt: pal.glareAmt * (1 - 0.35 * m),
          paper: mix3(PAPER[0], PAPER[1], night),
          veil: veil * (1 - 0.6 * m), ring: ringLin * 1.04, ringAmt: lerp(1, 0.78, night), head: S.reduce ? 0 : sstep(0, 0.02, ringLin) * (1 - sstep(0.93, 1, ringLin)),
          dogL: sstep(0.5, 0.57, p), dogR: sstep(0.54, 0.61, p), line: sstep(0.58, 0.7, p), lineW: lerp(W * 0.56, 1.8 * R, m),
          arc: sstep(0.62, 0.72, p) * (1 - sstep(0.72, 0.8, p)), night, ghost: sstep(0.2, 0.4, p) * (1 - sstep(0.68, 0.76, p)) * (1 - 0.5 * night),
          paperMix, disc: 1.45, vig: 1 - paperMix,
        })
      }
      /* the words around the sky */
      const ho = sstep(0.02, 0.15, p)
      heroEl.style.opacity = (1 - ho).toFixed(3)
      heroEl.style.transform = `translate3d(0,${(-ho * 80).toFixed(1)}px,0)`
      heroEl.style.visibility = ho >= 0.999 ? 'hidden' : ''
      const gap = 16 + 0.07 * R
      labels.forEach((l, i) => {
        const a = LABEL_AT[i] * Math.PI * 2
        const x = sx + Math.sin(a) * (R + gap), y = sy - Math.cos(a) * (R + gap)
        const w = labelW[i] || 0
        const lx = clamp(Math.sin(a) > 0 ? x : x - w, 12, W - 12 - w)
        const o = sstep(LABEL_AT[i] + 0.005, LABEL_AT[i] + 0.06, ringLin) * (1 - sstep(0.7, 0.76, p))
        l.style.opacity = o.toFixed(3)
        l.style.transform = `translate3d(${lx.toFixed(1)}px,${(y - 8).toFixed(1)}px,0)`
      })
      const wm = sstep(0.76, 0.9, p), spread = (1 - ease(wm)) * W * 0.22
      halves[0].style.opacity = halves[1].style.opacity = wm.toFixed(3)
      halves[0].style.transform = `translate3d(${(-spread).toFixed(1)}px,0,0)`
      halves[1].style.transform = `translate3d(${spread.toFixed(1)}px,0,0)`
      const zo = failed ? sstep(0.74, 0.86, p) : sstep(0.87, 0.92, p)
      zeros.forEach((z) => { z.style.opacity = zo.toFixed(3) })
      canvas.style.opacity = (1 - sstep(0.9, 0.95, p)).toFixed(3)
      const so = sstep(0.88, 0.97, p)
      endsub.style.opacity = so.toFixed(3)
      endsub.style.transform = `translate3d(0,${((1 - so) * 18).toFixed(1)}px,0)`
      /* progress bar */
      let ci = 0
      CHAPTER_AT.forEach((at, c) => { if (p >= at) ci = c })
      const key = String(ci)
      if (key !== lastChapter) {
        lastChapter = key
        const n = document.createElement('i')
        n.textContent = `0${ci + 1}`
        chapterEl.replaceChildren(n, copy.film.chapters[ci])
      }
      barEl.style.transform = `scaleX(${p.toFixed(4)})`
      const pct = p < 0.005 ? copy.film.scrollHint : copy.film.progressFormat.replace('NNN', pad3(Math.round(p * 100)))
      if (pct !== lastPct) { lastPct = pct; pctEl.textContent = pct }
      /* is the sky behind the header dark? */
      S.heroDark = S.theme === 'dark' || skyT * (1 - sstep(0.74, 0.84, p)) > 0.5
    },
  }
  return self
}
