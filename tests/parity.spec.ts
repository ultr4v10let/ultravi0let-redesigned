/* BRIEF §13.2: visual parity with the approved page. The reference file and the built site render in the same
   Chromium, with the same font files and reduced motion (sky time frozen, headline complete), at the same scroll
   positions; each pair is pixel-diffed and the diffs are written to test-results/parity/. */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'
import pixelmatch from 'pixelmatch'
import { PNG } from 'pngjs'

const REFERENCE = pathToFileURL(resolve('handoff/design/reference/ultravi0let-final.html')).href
const OUT = resolve('test-results/parity')
/* share of pixels allowed to differ (anti-aliasing noise); anything above is a real difference to explain */
const TOLERANCE = 0.002

/* The reference loads Google Fonts; answer that with the same Fontsource files the build self-hosts. */
const FONTS: [family: string, file: string][] = [
  ['Geist', 'node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2'],
  ['Geist Mono', 'node_modules/@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2'],
  ['Hanken Grotesk', 'node_modules/@fontsource-variable/hanken-grotesk/files/hanken-grotesk-latin-wght-normal.woff2'],
]
const RANGE = 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD'
const FONT_CSS = FONTS.map(([family], i) => `@font-face{font-family:'${family}';font-style:normal;font-display:swap;font-weight:100 900;src:url(https://fonts.test/${i}.woff2) format('woff2');unicode-range:${RANGE}}`).join('\n')

async function serveFonts(page: Page) {
  await page.route('https://fonts.googleapis.com/**', (r) => r.fulfill({ contentType: 'text/css', body: FONT_CSS, headers: { 'access-control-allow-origin': '*' } }))
  await page.route('https://fonts.test/*.woff2', (r) => {
    const i = Number(r.request().url().match(/(\d)\.woff2$/)?.[1])
    return r.fulfill({ contentType: 'font/woff2', body: readFileSync(FONTS[i][1]), headers: { 'access-control-allow-origin': '*' } })
  })
  await page.route('https://fonts.gstatic.com/**', (r) => r.abort())
}

type Shot = { name: string; scroll: (p: Page) => Promise<number>; canvas?: string }

/* scroll offsets exactly as BRIEF §13.2 defines them */
const film = (p: number): Shot => ({
  name: `film-${p}`,
  canvas: p < 0.965 ? '#sky' : undefined,
  scroll: (page) => page.evaluate((at) => {
    const s = document.getElementById('top')!, st = document.getElementById('stage')!
    return (s.offsetHeight - st.clientHeight) * at
  }, p),
})
const proc = (p: number, label: string): Shot => ({
  name: `process-${label}`,
  canvas: '#psky',
  scroll: (page) => page.evaluate((at) => {
    const s = document.getElementById('process')!, st = document.getElementById('pstage')!
    return s.offsetTop + (s.offsetHeight - st.clientHeight) * at
  }, p),
})
const at = (id: string, canvas?: string): Shot => ({
  name: id,
  canvas,
  scroll: (page) => page.evaluate((el) => document.getElementById(el)!.getBoundingClientRect().top + scrollY, id),
})

const SHOTS: Shot[] = [
  film(0), film(0.3), film(0.55), film(0.66), film(0.85), film(1),
  at('work', '#vsky'),
  proc(0, 'intro'), proc(0.15, 'discovery'), proc(0.4, 'architecture'), proc(0.62, 'build'), proc(0.9, 'launch'),
  at('contact'),
]

const MODES = [
  { name: 'desktop-light', viewport: { width: 1440, height: 900 }, colorScheme: 'light' as const },
  { name: 'desktop-dark', viewport: { width: 1440, height: 900 }, colorScheme: 'dark' as const },
  { name: 'phone-light', viewport: { width: 390, height: 844 }, colorScheme: 'light' as const },
]

async function settle(page: Page) {
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(r, 250)))))
}

for (const mode of MODES) {
  test(`parity: ${mode.name}`, async ({ browser, baseURL }) => {
    mkdirSync(OUT, { recursive: true })
    const open = async (url: string, isBuild: boolean) => {
      const ctx = await browser.newContext({ viewport: mode.viewport, colorScheme: mode.colorScheme, reducedMotion: 'reduce', deviceScaleFactor: 1 })
      const page = await ctx.newPage()
      await serveFonts(page)
      /* headless Chromium has no GPU: allow software WebGL, and keep every canvas at its full pixel budget */
      if (isBuild) await page.addInitScript(() => { window.__uvAllowSoftwareGL = true; window.__uvFixedQuality = true })
      await page.goto(url, { waitUntil: 'networkidle' })
      await page.evaluate(() => document.fonts.ready)
      /* intended difference 1: the --faint contrast fix (BRIEF §5), applied to the reference so it isn't reported */
      if (!isBuild) await page.addStyleTag({ content: ':root:not([data-theme="dark"]){--faint:#7262AC}' })
      expect(await page.evaluate(() => !!document.createElement('canvas').getContext('webgl')), 'WebGL must be available').toBe(true)
      if (isBuild) await page.waitForSelector('#sky[data-gl="1"]')
      return page
    }
    const ref = await open(REFERENCE, false)
    const build = await open(baseURL + '/', true)

    const report: string[] = []
    let worst = 0
    for (const shot of SHOTS) {
      for (const [page, isBuild] of [[ref, false], [build, true]] as const) {
        const y = await shot.scroll(page)
        await page.evaluate((top) => window.scrollTo(0, top), y)
        await settle(page)
        if (isBuild && shot.canvas) await page.waitForSelector(`${shot.canvas}[data-gl="1"]`)
        await settle(page)
      }
      const [a, b] = [PNG.sync.read(await ref.screenshot()), PNG.sync.read(await build.screenshot())]
      /* intended difference 2 (owner's request): the film's progress bar keeps one length, so its row is masked */
      if (shot.name.startsWith('film')) {
        const r = await build.evaluate(() => { const ui = document.querySelector('.film-ui')!.getBoundingClientRect(); return [ui.top, ui.bottom].map(Math.round) })
        for (const png of [a, b]) for (let y = Math.max(0, r[0]); y < Math.min(png.height, r[1]); y++) png.data.fill(0, y * png.width * 4, (y + 1) * png.width * 4)
      }
      const diff = new PNG({ width: a.width, height: a.height })
      const n = pixelmatch(a.data, b.data, diff.data, a.width, a.height, { threshold: 0.1 })
      const ratio = n / (a.width * a.height)
      worst = Math.max(worst, ratio)
      const base = `${OUT}/${mode.name}-${shot.name}`
      if (ratio > 0) {
        writeFileSync(`${base}-ref.png`, PNG.sync.write(a))
        writeFileSync(`${base}-build.png`, PNG.sync.write(b))
        writeFileSync(`${base}-diff.png`, PNG.sync.write(diff))
      }
      report.push(`${shot.name.padEnd(22)} ${(ratio * 100).toFixed(3).padStart(7)}%  ${n} px`)
    }
    console.log(`\n${mode.name}\n  ${report.join('\n  ')}`)
    expect(worst, `worst diff ${(worst * 100).toFixed(3)}%; see ${OUT}`).toBeLessThanOrEqual(TOLERANCE)
  })
}
