/* Work: a day of halos (BEHAVIOUR §5). One sky per project; choosing a project animates the sky to it. React owns
   the rows and text; this module owns the sky. */
import { paper, workSkies } from '../content/content'
import { S, clamp, ease, hex, lerp, mix3, skyCss, sstep } from './env'
import type { Film, RGB } from './env'
import type { Sky } from './sky/renderer'

const COLORS = ['top', 'mid', 'low', 'haze', 'glare'] as const
const NUMBERS = ['midPos', 'hazeAmt', 'glareAmt', 'sx', 'sy', 'R', 'veil', 'dogs', 'line', 'arc', 'night', 'ghost'] as const
type V = Record<(typeof COLORS)[number], RGB> & Record<(typeof NUMBERS)[number], number>

const SKIES: V[] = workSkies.list.map((s) => {
  const v = {} as V
  for (const c of COLORS) v[c] = hex(s[c])
  for (const n of NUMBERS) v[n] = s[n]
  return v
})
const PAPER = hex(paper.light)

const lerpSky = (a: V, b: V, t: number) => {
  const o = {} as V
  for (const c of COLORS) o[c] = mix3(a[c], b[c], t)
  for (const n of NUMBERS) o[n] = lerp(a[n], b[n], t)
  return o
}

/* The chosen sky, where it animates from, and when it was chosen. Row 1 is selected on load, complete. */
let cur = 0, from = SKIES[0], state = SKIES[0], t0 = -1e9
let film: Film | null = null

export function selectSky(i: number) {
  if (i === cur || i < 0) return
  from = state
  t0 = performance.now()
  cur = i
  if (film) film.need = true
}

export function workViewer(section: HTMLElement): Film {
  const art = section.querySelector('.v-art') as HTMLElement
  const canvas = art.querySelector('canvas') as HTMLCanvasElement
  let sky: Sky | null = null, W = 1, H = 1
  cur = 0
  from = state = SKIES[0]
  t0 = -1e9

  const self: Film = {
    name: 'work',
    inView: false,
    need: true,
    last: 0,
    get sky() { return sky },
    budget: () => 1.2e6,
    canvas,
    target: art,
    attach(s) { if (s) { sky = s; self.measure() } else self.fallback(true) },
    /* the stand-in itself is painted in write(), in the chosen sky's palette */
    fallback() { self.need = true },
    measure() {
      const r = art.getBoundingClientRect()
      W = r.width
      H = r.height
      sky?.size(W, H)
      self.need = true
    },
    wants(now) {
      /* the stand-in has no drift to draw: only transitions */
      return self.inView && (self.need || now - t0 < 1500 || (!S.reduce && !!sky && now - self.last > 50))
    },
    write(now) {
      self.need = false
      self.last = now
      const reduce = S.reduce
      const k = (now - t0) / 1000
      state = lerpSky(from, SKIES[cur], ease(clamp(k / 0.9, 0, 1)))
      const s = state
      const R = s.R * H
      if (!sky || sky.lost) {
        art.style.background = skyCss(s, { x: s.sx * W, y: s.sy * H, r: R }, '100%')
        return
      }
      const ring = reduce ? 1 : clamp((k - 0.12) / 0.8, 0, 1)
      const kk = reduce ? 2 : k
      sky.draw({
        time: reduce ? 4 : now / 1000, sx: s.sx * W, sy: s.sy * H, R, sunR: Math.max(R * (0.035 + 0.01 * s.night), 2),
        top: s.top, mid: s.mid, low: s.low, haze: s.haze, glare: s.glare, midPos: s.midPos, hazeAmt: s.hazeAmt, glareAmt: s.glareAmt,
        paper: PAPER, veil: s.veil, ring: ring * 1.04, ringAmt: lerp(1, 0.78, s.night), head: reduce ? 0 : sstep(0, 0.03, ring) * (1 - sstep(0.93, 1, ring)),
        dogL: s.dogs * (reduce ? 1 : sstep(0.75, 1.1, k)), dogR: s.dogs * sstep(0.85, 1.2, kk), line: s.line * sstep(0.9, 1.25, kk), lineW: W * 0.56,
        arc: s.arc * sstep(1.0, 1.35, kk), night: s.night, ghost: s.ghost, paperMix: 0, disc: 1.45, vig: 1,
      })
    },
  }
  film = self
  return self
}
