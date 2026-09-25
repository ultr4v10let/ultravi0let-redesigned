/* How we work: one day, four phases (BEHAVIOUR §6). The sun crosses the sky above a horizon; the page below it is
   the ground where the phase texts sit. */
import { paper, processFilm as data } from '../content/content'
import { S, clamp, ease, hex, lerp, mix3, mixPal, skyCss, sstep, toPal, rgb as rgba } from './env'
import type { Film, Pal } from './env'
import type { Sky } from './sky/renderer'

const KP = data.keyframes.scroll, KU = data.keyframes.sun
const CLOCK = data.clockMinutes
type Row = (typeof data.palettes.light)[number]
const P = (q: Row) => {
  const [top, mid, low, midPos, haze, hazeAmt, glare, glareAmt] = q as [string, string, string, number, string, number, string, number]
  return toPal({ top, mid, low, midPos, haze, hazeAmt, glare, glareAmt })
}
const DAYPAL = { light: data.palettes.light.map(P), dark: data.palettes.dark.map(P) }
const INK = hex(data.markInk), WHITE = [1, 1, 1] as [number, number, number]
const [INK_LO, INK_HI] = data.markInkLuminance
const PAPER = [hex(paper.light), hex(paper.dark)] as const

/* piecewise interpolation over keyframes, optionally eased inside each segment */
function seg(keys: number[], vals: number[], x: number, easeIt: boolean) {
  for (let j = 0; j < keys.length - 1; j++) {
    if (x <= keys[j + 1] || j === keys.length - 2) {
      const t = clamp((x - keys[j]) / (keys[j + 1] - keys[j]), 0, 1)
      return lerp(vals[j], vals[j + 1], easeIt ? ease(t) : t)
    }
  }
  return vals[vals.length - 1]
}
function palAt(list: Pal[], u: number) {
  const j = Math.min(4, Math.floor(u * 5)), t = clamp(u * 5 - j, 0, 1)
  return mixPal(list[j], list[j + 1], t)
}
const rgb = (c: number[]) => `rgb(${Math.round(c[0] * 255)},${Math.round(c[1] * 255)},${Math.round(c[2] * 255)})`

export function processFilm(section: HTMLElement): Film {
  const q = <T extends Element>(s: string) => section.querySelector(s) as T
  const stage = q<HTMLElement>('.pstage'), canvas = q<HTMLCanvasElement>('canvas')
  const arc = q<SVGPathElement>('.p-arc'), trail = q<SVGPathElement>('.p-trail'), over = q<SVGSVGElement>('.pover')
  const grad = q<SVGLinearGradientElement>('linearGradient'), clip = q<SVGRectElement>('clipPath rect'), marks = q<SVGGElement>('#p-marks')
  const pws = [...section.querySelectorAll<SVGGElement>('.pw')]
  const steps = [...section.querySelectorAll<HTMLElement>('.p-step')], phases = [...section.querySelectorAll<HTMLElement>('.p-phase')]
  const intro = q<HTMLElement>('.p-intro'), label = q<HTMLElement>('.p-label'), time = q<HTMLElement>('.p-time'), fill = q<HTMLElement>('.p-fill')

  let sky: Sky | null = null
  let W = 1, H = 1, HZ = 1, R = 60, total = 1, timeW = 44, lastClock = '', top = 0, height = 1

  const self: Film = {
    name: 'process',
    inView: false,
    need: true,
    last: 0,
    get sky() { return sky },
    budget: () => (Math.min(screen.width, screen.height) < 600 ? 0.9e6 : 2.0e6),
    canvas,
    target: section,
    /* no WebGL: write() paints a stand-in gradient in the sky's palette; .no-gl .pstage is the stylesheet's first guess */
    attach(s) { if (s) { sky = s; s.size(W, H); self.need = true } else self.fallback(true) },
    fallback(on) { section.classList.toggle('no-gl', on) },
    measure() {
      W = stage.clientWidth
      H = stage.clientHeight
      const stepW = steps.map((s) => s.offsetWidth)
      timeW = time.offsetWidth || 44
      const slim = W < 880, headH = slim ? 64 : 88
      const ground = slim ? clamp(H * 0.37, 292, 340) : clamp(H * 0.31, 236, 300)
      HZ = Math.round(H - ground)
      /* owner's change: phones and portrait tablets had the prototype's 0.2 (a halo 40% of the screen wide) */
      R = clamp(Math.min(W, HZ) * (slim ? 0.15 : 0.19), 44, 150)
      const apex = Math.max(headH + R + 46, HZ * 0.34)
      const y0 = HZ + 0.62 * R, yc = (8 * apex - 2 * y0) / 6
      const d = `M${(0.04 * W).toFixed(1)} ${y0.toFixed(1)} C${(0.22 * W).toFixed(1)} ${yc.toFixed(1)} ${(0.78 * W).toFixed(1)} ${yc.toFixed(1)} ${(0.96 * W).toFixed(1)} ${y0.toFixed(1)}`
      arc.setAttribute('d', d)
      trail.setAttribute('d', d)
      over.setAttribute('viewBox', `0 0 ${W} ${H}`)
      clip.setAttribute('x', '-40')
      clip.setAttribute('y', '-40')
      clip.setAttribute('width', String(W + 80))
      clip.setAttribute('height', String(HZ + 40))
      grad.setAttribute('x2', String(W))
      total = arc.getTotalLength() || 1
      trail.style.strokeDasharray = `${total.toFixed(1)} ${(total + 20).toFixed(1)}`
      const wp = KU.slice(1, 5).map((u) => arc.getPointAtLength(u * total))
      pws.forEach((g, i) => g.setAttribute('transform', `translate(${wp[i].x.toFixed(1)} ${wp[i].y.toFixed(1)}) scale(${slim ? 0.8 : 1})`))
      steps.forEach((s, i) => {
        const x = clamp(wp[i].x - stepW[i] / 2, 16, W - 16 - stepW[i])
        s.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`
        s.style.setProperty('--tick', `${(wp[i].x - x).toFixed(1)}px`)
      })
      stage.style.setProperty('--hz', `${HZ}px`)
      /* the marks have places now (build.css keeps them hidden until then) */
      section.classList.add('measured')
      sky?.size(W, H)
      self.need = true
    },
    wants(now) {
      return self.inView && (self.need || (!S.reduce && !!sky && now - self.last > 50))
    },
    read() {
      const r = section.getBoundingClientRect()
      top = r.top
      height = r.height
    },
    write(now) {
      self.need = false
      self.last = now
      const night = S.night, dark = S.theme === 'dark'
      const tot = height - H
      const p = tot > 0 ? clamp(-top / tot, 0, 1) : 0
      const u = seg(KP, KU, p, true)
      const pt = arc.getPointAtLength(clamp(u, 0, 1) * total)
      const pal = mixPal(palAt(DAYPAL.light, u), palAt(DAYPAL.dark, u), night)
      const ringLin = clamp((p - 0.03) / 0.34, 0, 1)
      const pp = mix3(PAPER[0], PAPER[1], night)
      if (!sky || sky.lost) {
        /* no live sky: the stand-in follows the palette down to the horizon, then the page (no glow: it would spill
           onto the ground, where the phase texts sit) */
        stage.style.background = skyCss(pal, { x: pt.x, y: pt.y, r: 0 }, `${HZ}px`, `,${rgba(pp)} ${HZ}px`)
      } else {
        sky.draw({
          time: S.reduce ? 4 : now / 1000, sx: pt.x, sy: pt.y, R, sunR: Math.max(R * (0.045 + 0.012 * night), 2.4),
          top: pal.top, mid: pal.mid, low: pal.low, haze: pal.haze, glare: pal.glare, midPos: pal.midPos, hazeAmt: pal.hazeAmt, glareAmt: pal.glareAmt,
          paper: pp, ground: pp, groundOn: true, skyH: HZ,
          veil: 0.4 + 0.55 * sstep(0.02, 0.15, p), ring: ringLin * 1.04, ringAmt: lerp(1, 0.78, night), head: S.reduce ? 0 : sstep(0, 0.02, ringLin) * (1 - sstep(0.93, 1, ringLin)),
          dogL: sstep(0.52, 0.58, p), dogR: sstep(0.55, 0.61, p), line: sstep(0.3, 0.4, p), lineW: W * 0.5,
          arc: sstep(0.56, 0.64, p), night, ghost: 0.5 * (1 - 0.5 * night), paperMix: 0, disc: 1.45, vig: 1,
        })
      }
      /* marks over the sky switch between ink and white with the sky behind them */
      const lum = 0.2126 * pal.top[0] + 0.7152 * pal.top[1] + 0.0722 * pal.top[2]
      const kInk = sstep(INK_LO, INK_HI, lum)
      stage.style.setProperty('--sk', rgb(mix3(WHITE, INK, kInk)))
      stage.style.setProperty('--sks', kInk > 0.5 ? 'rgba(255,255,255,.55)' : data.markShade)
      S.procDark = dark || kInk < 0.5
      /* the path behind the sun, and each phase it has reached */
      trail.style.strokeDashoffset = (total * (1 - u)).toFixed(1)
      pws.forEach((g, i) => g.classList.toggle('lit', p >= KP[i + 1] - 0.012))
      /* solar time rides the parhelic line beside the sun */
      const mm = Math.round(seg(KU, CLOCK[dark ? 'dark' : 'light'], u, false)) % 1440
      const clock = `${String(Math.floor(mm / 60)).padStart(2, '0')}:${String(mm % 60).padStart(2, '0')}`
      if (clock !== lastClock) { time.textContent = clock; lastClock = clock }
      const right = pt.x < W * 0.6, off = 1.18 * R + 16
      const tx = right ? pt.x + off : pt.x - off - timeW
      time.style.transform = `translate3d(${clamp(tx, 12, W - 12 - timeW).toFixed(1)}px,${(pt.y - 24).toFixed(1)}px,0)`
      time.style.opacity = (sstep(HZ + 4, HZ - 30, pt.y) * sstep(0.02, 0.06, p)).toFixed(3)
      /* the section title gives way to the phases */
      const io = sstep(0.012, 0.065, p)
      intro.style.opacity = (1 - io).toFixed(3)
      intro.style.transform = `translate3d(0,${(-io * 40).toFixed(1)}px,0)`
      label.style.opacity = sstep(0.06, 0.1, p).toFixed(3)
      marks.style.opacity = (0.15 + 0.85 * sstep(0.01, 0.06, p)).toFixed(3)
      phases.forEach((el, i) => {
        /* one phase at a time: the old one lifts away before the next one rises in */
        const a = i === 0 ? sstep(0.03, 0.085, p) : sstep(KP[i + 1] - 0.075, KP[i + 1] - 0.035, p)
        const b = i === 3 ? 1 : 1 - sstep(KP[i + 2] - 0.115, KP[i + 2] - 0.08, p)
        el.style.opacity = (a * b).toFixed(3)
        el.style.transform = `translate3d(0,${((1 - a) * 24 - (1 - b) * 24).toFixed(1)}px,0)`
      })
      let active = -1
      for (let i = 0; i < 4; i++) if (p >= (i === 0 ? 0.055 : KP[i + 1] - 0.078)) active = i
      steps.forEach((s, i) => { s.classList.toggle('on', i === active); s.classList.toggle('done', i < active) })
      fill.style.transform = `scaleX(${(clamp(pt.x / W, 0, 1) * sstep(0, 0.04, p)).toFixed(4)})`
    },
  }
  return self
}
