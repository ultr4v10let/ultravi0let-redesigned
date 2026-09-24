/* Re-renders public/og-image.png (1200×630) from the opening film's end card, so the sharing image always matches the
   page's copy. Run after a build: node scripts/og-image.mjs */
import { spawn } from 'node:child_process'
import { chromium } from '@playwright/test'

const PORT = 4190
const server = spawn('node', ['.output/server/index.mjs'], { env: { ...process.env, PORT: String(PORT) }, stdio: 'ignore' })
try {
  for (let i = 0; i < 50; i++) {
    if (await fetch(`http://localhost:${PORT}/`).then((r) => r.ok, () => false)) break
    await new Promise((r) => setTimeout(r, 200))
  }
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, colorScheme: 'light', reducedMotion: 'reduce' })
  await page.goto(`http://localhost:${PORT}/`)
  await page.evaluate(() => document.fonts.ready)
  /* just the end card: no header, no progress bar */
  await page.addStyleTag({ content: '.site-head,.film-ui{display:none!important}' })
  await page.evaluate(() => { const s = document.getElementById('top'); window.scrollTo(0, s.offsetHeight - innerHeight) })
  await page.waitForTimeout(800)
  await page.screenshot({ path: 'public/og-image.png' })
  await browser.close()
  console.log('public/og-image.png written')
} finally {
  server.kill()
}
