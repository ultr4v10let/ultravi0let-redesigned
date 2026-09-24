/* Shared maths, exactly as the prototype defines them (BEHAVIOUR, "Helpers"), and the state the motion modules share. */
import type { Sky } from './sky/renderer'

export type RGB = [number, number, number]

/* State the modules share. night eases 0 (light) → 1 (dark) and drives the two films' skies. */
export const S = {
  reduce: false,
  theme: 'light' as 'light' | 'dark',
  night: 0,
  nightTarget: 0,
  heroDark: false,
  procDark: false,
  menuOpen: false,
  needAll: () => {},
}

/* A scroll- or time-driven canvas section; the engine asks it each frame whether it wants to draw. */
export interface Film {
  name: string
  inView: boolean
  need: boolean
  last: number
  readonly sky: Sky | null
  budget: () => number
  canvas: HTMLCanvasElement
  /* the element whose visibility gates drawing (defaults to the section) */
  target?: Element
  attach: (s: Sky | null) => void
  measure: () => void
  wants: (now: number) => boolean
  read?: () => void
  write: (now: number) => void
}

export const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
/* smoothstep; a may be greater than b */
export const sstep = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a), 0, 1)
  return t * t * (3 - 2 * t)
}
/* easeInOutCubic */
export const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
export const hex = (h: string): RGB => [parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255]
export const mix3 = (a: RGB, b: RGB, t: number): RGB => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]

export const reducedMotion = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches

/* A sky palette with its colours as floats. */
export interface Pal { top: RGB; mid: RGB; low: RGB; haze: RGB; glare: RGB; midPos: number; hazeAmt: number; glareAmt: number }
export const toPal = (p: { top: string; mid: string; low: string; haze: string; glare: string; midPos: number; hazeAmt: number; glareAmt: number }): Pal => ({
  top: hex(p.top), mid: hex(p.mid), low: hex(p.low), haze: hex(p.haze), glare: hex(p.glare), midPos: p.midPos, hazeAmt: p.hazeAmt, glareAmt: p.glareAmt,
})
export const mixPal = (a: Pal, b: Pal, t: number): Pal => ({
  top: mix3(a.top, b.top, t), mid: mix3(a.mid, b.mid, t), low: mix3(a.low, b.low, t), haze: mix3(a.haze, b.haze, t), glare: mix3(a.glare, b.glare, t),
  midPos: lerp(a.midPos, b.midPos, t), hazeAmt: lerp(a.hazeAmt, b.hazeAmt, t), glareAmt: lerp(a.glareAmt, b.glareAmt, t),
})
