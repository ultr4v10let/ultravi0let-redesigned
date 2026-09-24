/* The sky renderer (BEHAVIOUR §2): WebGL 1, one full-screen triangle, sky.frag. Loaded lazily, on idle, after
   hydration; each canvas gets its own context only when its section nears the screen. */
import FS from './sky.frag?raw'
import type { RGB } from '../env'

const VS = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.0,1.0);}'
const UNIFORMS = ['uRes', 'uTime', 'uScale', 'uSun', 'uR', 'uSunR', 'uTop', 'uMid', 'uLow', 'uHaze', 'uGlare', 'uPaper', 'uMidPos', 'uHazeAmt',
  'uGlareAmt', 'uVeil', 'uRing', 'uRingAmt', 'uHead', 'uDogL', 'uDogR', 'uLine', 'uLineW', 'uArc', 'uNight', 'uGhost', 'uPaperMix', 'uDisc', 'uVig',
  'uSkyH', 'uGroundOn', 'uGround'] as const

/* Everything one frame of sky needs; lengths in CSS pixels (the renderer scales them to buffer pixels). */
export interface SkyState {
  time: number; sx: number; sy: number; R: number; sunR: number
  top: RGB; mid: RGB; low: RGB; haze: RGB; glare: RGB; paper: RGB
  midPos: number; hazeAmt: number; glareAmt: number
  veil: number; ring: number; ringAmt: number; head: number; dogL: number; dogR: number; line: number; lineW: number
  arc: number; night: number; ghost: number; paperMix: number; disc: number; vig: number
  skyH?: number; groundOn?: boolean; ground?: RGB
}

export class Sky {
  w = 0
  h = 0
  cssW = 1
  cssH = 1
  scale = 1
  lost = false
  readonly canvas: HTMLCanvasElement
  private readonly gl: WebGLRenderingContext
  private readonly U: Record<(typeof UNIFORMS)[number], WebGLUniformLocation | null>
  private maxPx: number
  private readonly minPx: number
  private constructor(canvas: HTMLCanvasElement, gl: WebGLRenderingContext, U: Record<(typeof UNIFORMS)[number], WebGLUniformLocation | null>, maxPx: number) {
    this.canvas = canvas
    this.gl = gl
    this.U = U
    this.maxPx = maxPx
    this.minPx = maxPx / 2
    canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); this.lost = true })
  }

  /* null when WebGL (or the shader) isn't available: the caller shows that canvas's CSS fallback. */
  static create(canvas: HTMLCanvasElement, maxPx: number): Sky | null {
    let gl: WebGLRenderingContext | null = null
    try {
      gl = canvas.getContext('webgl', { antialias: false, alpha: false, depth: false, stencil: false, premultipliedAlpha: false, preserveDrawingBuffer: false, powerPreference: 'high-performance' })
    } catch { gl = null }
    if (!gl) return null
    const g = gl
    const sh = (type: number, src: string) => {
      const s = g.createShader(type)
      if (!s) return null
      g.shaderSource(s, src)
      g.compileShader(s)
      if (!g.getShaderParameter(s, g.COMPILE_STATUS)) { console.warn(g.getShaderInfoLog(s)); return null }
      return s
    }
    const vs = sh(g.VERTEX_SHADER, VS), fs = sh(g.FRAGMENT_SHADER, FS)
    const pr = g.createProgram()
    if (!vs || !fs) return null
    g.attachShader(pr, vs)
    g.attachShader(pr, fs)
    g.linkProgram(pr)
    if (!g.getProgramParameter(pr, g.LINK_STATUS)) { console.warn(g.getProgramInfoLog(pr)); return null }
    g.useProgram(pr)
    g.bindBuffer(g.ARRAY_BUFFER, g.createBuffer())
    g.bufferData(g.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), g.STATIC_DRAW)
    const loc = g.getAttribLocation(pr, 'a')
    g.enableVertexAttribArray(loc)
    g.vertexAttribPointer(loc, 2, g.FLOAT, false, 0, 0)
    const U = {} as Record<(typeof UNIFORMS)[number], WebGLUniformLocation | null>
    for (const n of UNIFORMS) U[n] = g.getUniformLocation(pr, n)
    return new Sky(canvas, g, U, maxPx)
  }

  /* Device pixel ratio capped at 2, then capped again by the pixel budget. */
  size(cssW: number, cssH: number) {
    cssW = Math.max(1, cssW)
    cssH = Math.max(1, cssH)
    let s = Math.min(window.devicePixelRatio || 1, 2)
    if (cssW * cssH * s * s > this.maxPx) s = Math.sqrt(this.maxPx / (cssW * cssH))
    const W = Math.max(1, Math.round(cssW * s)), H = Math.max(1, Math.round(cssH * s))
    if (W !== this.w || H !== this.h) {
      this.canvas.width = W
      this.canvas.height = H
      this.w = W
      this.h = H
      this.gl.viewport(0, 0, W, H)
    }
    this.cssW = cssW
    this.cssH = cssH
    this.scale = W / cssW
  }

  /* Adaptive quality (BRIEF §7.5): 30% fewer pixels, down to half the original budget. */
  degrade() {
    if (this.maxPx <= this.minPx) return false
    this.maxPx = Math.max(this.minPx, this.maxPx * 0.7)
    this.size(this.cssW, this.cssH)
    return true
  }

  draw(st: SkyState) {
    if (this.lost) return
    const { gl, U } = this
    const k = this.scale
    gl.uniform2f(U.uRes, this.w, this.h)
    gl.uniform1f(U.uTime, st.time)
    gl.uniform1f(U.uScale, k)
    gl.uniform2f(U.uSun, st.sx * k, st.sy * k)
    gl.uniform1f(U.uR, st.R * k)
    gl.uniform1f(U.uSunR, st.sunR * k)
    gl.uniform3fv(U.uTop, st.top)
    gl.uniform3fv(U.uMid, st.mid)
    gl.uniform3fv(U.uLow, st.low)
    gl.uniform3fv(U.uHaze, st.haze)
    gl.uniform3fv(U.uGlare, st.glare)
    gl.uniform3fv(U.uPaper, st.paper)
    gl.uniform1f(U.uMidPos, st.midPos)
    gl.uniform1f(U.uHazeAmt, st.hazeAmt)
    gl.uniform1f(U.uGlareAmt, st.glareAmt)
    gl.uniform1f(U.uVeil, st.veil)
    gl.uniform1f(U.uRing, st.ring)
    gl.uniform1f(U.uRingAmt, st.ringAmt)
    gl.uniform1f(U.uHead, st.head)
    gl.uniform1f(U.uDogL, st.dogL)
    gl.uniform1f(U.uDogR, st.dogR)
    gl.uniform1f(U.uLine, st.line)
    gl.uniform1f(U.uLineW, st.lineW * k)
    gl.uniform1f(U.uArc, st.arc)
    gl.uniform1f(U.uNight, st.night)
    gl.uniform1f(U.uGhost, st.ghost)
    gl.uniform1f(U.uPaperMix, st.paperMix)
    gl.uniform1f(U.uDisc, st.disc)
    gl.uniform1f(U.uVig, st.vig)
    gl.uniform1f(U.uSkyH, (st.skyH || this.cssH) * k)
    gl.uniform1f(U.uGroundOn, st.groundOn ? 1 : 0)
    gl.uniform3fv(U.uGround, st.ground || st.paper)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }

  /* Free the GPU context when the page is left. */
  release() {
    this.lost = true
    this.gl.getExtension('WEBGL_lose_context')?.loseContext()
  }
}
