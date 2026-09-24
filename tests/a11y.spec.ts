/* BRIEF §9 / §13.4: axe reports zero violations, in light and dark, desktop and phone, at the top of the page and
   with each section in view (the films change what's on screen as they scroll). */
import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const MODES = [
  { name: 'desktop light', viewport: { width: 1440, height: 900 }, colorScheme: 'light' as const },
  { name: 'desktop dark', viewport: { width: 1440, height: 900 }, colorScheme: 'dark' as const },
  { name: 'phone light', viewport: { width: 390, height: 844 }, colorScheme: 'light' as const },
  { name: 'phone dark', viewport: { width: 390, height: 844 }, colorScheme: 'dark' as const },
]

for (const mode of MODES) {
  test(`axe: ${mode.name}`, async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: mode.viewport, colorScheme: mode.colorScheme, reducedMotion: 'reduce' })
    const page = await ctx.newPage()
    await page.goto('/')
    await page.waitForSelector('#sky[data-gl]')
    const found: string[] = []
    for (const where of ['top', 'work', 'services', 'process', 'contact']) {
      await page.evaluate((id) => document.getElementById(id)!.scrollIntoView({ behavior: 'instant' }), where)
      await page.waitForTimeout(300)
      const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']).analyze()
      for (const v of r.violations) found.push(`${where}: ${v.id} (${v.impact}) ${v.nodes.map((n) => n.target.join(' ')).slice(0, 4).join(' | ')}`)
    }
    expect([...new Set(found)], found.join('\n')).toEqual([])
  })
}

test('axe: phone menu open', async ({ browser }) => {
  const page = await (await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' })).newPage()
  await page.goto('/')
  await page.waitForSelector('#sky[data-gl]')
  await page.click('#menu-open')
  await expect(page.locator('#menu-close')).toBeFocused()
  const r = await new AxeBuilder({ page }).analyze()
  expect(r.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(' | ')}`)).toEqual([])
})
