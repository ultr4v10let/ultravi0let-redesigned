/* BRIEF §13.3: the interactions, against the production build. Motion is on (no reduced motion) unless a test says
   otherwise, so the real timings run. */
import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'

const DESKTOP = { width: 1440, height: 900 }
const PHONE = { width: 390, height: 844 }

/* the page is live once the motion engine has started (it runs after hydration) */
const go = async (page: Page) => { await page.goto('/'); await page.waitForSelector('#sky[data-gl]') }
const theme = (page: Page) => page.evaluate(() => document.documentElement.dataset.theme)
const checked = (page: Page) => page.evaluate(() => [...document.querySelectorAll('.switch')].map((s) => s.getAttribute('aria-checked')))

for (const size of [DESKTOP, { width: 1280, height: 720 }, PHONE]) {
  test(`typing at ${size.width}px: every typed letter lands on its faint twin, then the real headline takes over`, async ({ page }) => {
    await page.setViewportSize(size)
    await page.goto('/')
    await page.waitForFunction(() => document.querySelector('h1')?.classList.contains('typing'))
    /* in the page, every 20ms until typing ends: for each new state, the largest distance (px) between a typed letter
       and the same letter in the faint copy */
    const r = await page.evaluate(() => new Promise<{ states: number; worst: number }>((done) => {
      const h1 = document.querySelector('h1')!, ghost = h1.querySelector('.ghost')!, type = h1.querySelector('.type')!
      const full = ghost.textContent
      const box = (root: Element, n: number) => {
        const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
        for (let t = walk.nextNode(); t; t = walk.nextNode()) {
          const len = t.textContent!.length
          if (n < len) { const g = document.createRange(); g.setStart(t, n); g.setEnd(t, n + 1); return g.getBoundingClientRect() }
          n -= len
        }
        return new DOMRect()
      }
      const seen = new Set<number>()
      let worst = 0
      const id = setInterval(() => {
        const typed = [...type.querySelectorAll('span:not(.rest)')].filter((s) => s.firstChild?.nodeType === 3).reduce((a, s) => a + s.textContent.length, 0)
        if (typed && !seen.has(typed)) {
          seen.add(typed)
          for (let k = 0; k < typed; k++) {
            if (full[k] === ' ') continue
            const a = box(ghost, k), b = box(type, k)
            worst = Math.max(worst, Math.abs(a.x - b.x), Math.abs(a.y - b.y))
          }
        }
        if (h1.classList.contains('typed')) { clearInterval(id); done({ states: seen.size, worst }) }
      }, 20)
    }))
    expect(r.states).toBeGreaterThan(20)
    expect(r.worst).toBeLessThan(0.5)
    expect(await page.locator('h1 .ghost').evaluate((el) => getComputedStyle(el).opacity)).toBe('1')
  })
}

test('no console errors or warnings on load, with and without a stored theme', async ({ page }) => {
  const msgs: string[] = []
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') msgs.push(m.text()) })
  page.on('pageerror', (e) => msgs.push(e.message))
  await go(page)
  await page.evaluate(() => localStorage.setItem('theme', 'dark'))
  await page.reload()
  await page.waitForSelector('#sky[data-gl]')
  await page.waitForTimeout(500)
  expect(msgs).toEqual([])
})

for (const size of [DESKTOP, PHONE]) {
  test(`the film's progress bar keeps its length as the labels change (${size.width}px)`, async ({ page }) => {
    await page.setViewportSize(size)
    await go(page)
    const bar = () => page.evaluate(() => { const r = document.querySelector('.film-ui .bar')!.getBoundingClientRect(); return [r.left, r.width].map((v) => Math.round(v * 10) / 10) })
    const first = await bar()
    for (const p of [0.01, 0.31, 0.51, 0.75, 1]) {
      await page.evaluate((at) => { const s = document.getElementById('top')!; window.scrollTo({ top: (s.offsetHeight - innerHeight) * at, behavior: 'instant' }) }, p)
      await page.waitForTimeout(150)
      expect(await bar(), `at p=${p}`).toEqual(first)
    }
    await expect(page.locator('.film-ui .chapter .now')).toContainText('Ultravi0let')
  })
}

test.describe('theme switch', () => {
  test('header switch: flips at once, theme follows after the reveal, choice persists', async ({ page }) => {
    await page.setViewportSize(DESKTOP)
    await go(page)
    expect(await theme(page)).toBe('light')
    await page.click('#theme-switch')
    /* both switches flip immediately; the page follows after 380ms inside the view transition */
    expect(await checked(page)).toEqual(['true', 'true'])
    await expect(page.locator('#theme-switch')).toHaveClass(/draw/)
    await expect.poll(() => theme(page)).toBe('dark')
    await expect(page.locator('#theme-switch')).toHaveAttribute('aria-label', 'Switch to light mode')
    expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe('dark')
    /* the chosen theme's colour is the first theme-color meta, so the browser uses it */
    expect(await page.locator('meta[name="theme-color"]').first().getAttribute('content')).toBe('#110E2A')
    await expect.poll(() => page.evaluate(() => document.documentElement.classList.contains('vt'))).toBe(false)

    /* a reload paints dark from the first frame, with the switches already on */
    await page.reload(); await page.waitForSelector('#sky[data-gl]')
    expect(await theme(page)).toBe('dark')
    expect(await checked(page)).toEqual(['true', 'true'])

    await page.click('#theme-switch')
    await expect.poll(() => theme(page)).toBe('light')
    expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe('light')
  })

  test('a second click during the transition is ignored', async ({ page }) => {
    await page.setViewportSize(DESKTOP)
    await go(page)
    /* the second click lands inside the 380ms wait before the transition, while the first is still busy */
    await page.click('#theme-switch')
    await page.click('#theme-switch', { force: true, delay: 0 })
    await expect.poll(() => theme(page)).toBe('dark')
    /* and it stays dark once the reveal is over */
    await page.waitForTimeout(1500)
    expect(await theme(page)).toBe('dark')
    expect(await checked(page)).toEqual(['true', 'true'])
  })

  test('follows the system while nothing is stored', async ({ page }) => {
    await page.setViewportSize(DESKTOP)
    await page.emulateMedia({ colorScheme: 'light' })
    await go(page)
    expect(await theme(page)).toBe('light')
    await page.emulateMedia({ colorScheme: 'dark' })
    await expect.poll(() => theme(page)).toBe('dark')
    expect(await checked(page)).toEqual(['true', 'true'])
  })

  test('reduced motion flips at once', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.setViewportSize(DESKTOP)
    await go(page)
    await page.click('#theme-switch')
    expect(await theme(page)).toBe('dark')
  })
})

test.describe('phone menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(PHONE)
    await go(page)
  })

  test('opens from the halo, traps focus with inert, closes with Escape', async ({ page }) => {
    await page.click('#menu-open')
    await expect(page.locator('#menu-open')).toHaveAttribute('aria-expanded', 'true')
    await expect(page.locator('#mnav')).toHaveClass(/show/)
    await expect(page.locator('#menu-close')).toBeFocused()
    expect(await page.evaluate(() => document.querySelector('main')!.inert && document.querySelector('header')!.inert)).toBe(true)
    /* Tab stays inside the menu */
    for (let i = 0; i < 9; i++) await page.keyboard.press('Tab')
    expect(await page.evaluate(() => !!document.activeElement?.closest('#mnav'))).toBe(true)

    await page.keyboard.press('Escape')
    await expect(page.locator('#mnav')).not.toHaveClass(/show/)
    await expect(page.locator('#menu-open')).toBeFocused()
    await expect(page.locator('#menu-open')).toHaveAttribute('aria-expanded', 'false')
    expect(await page.evaluate(() => document.querySelector('main')!.inert)).toBe(false)
  })

  test('the close button closes it', async ({ page }) => {
    await page.click('#menu-open')
    await expect(page.locator('#menu-close')).toBeFocused()
    await page.click('#menu-close')
    await expect(page.locator('#mnav')).not.toHaveClass(/show/)
  })

  test('a link closes the menu, then scrolls to its section', async ({ page }) => {
    await page.click('#menu-open')
    await expect(page.locator('#menu-close')).toBeFocused()
    await page.click('#mnav .mn-list a[href="#services"]')
    await expect(page.locator('#mnav')).not.toHaveClass(/show/)
    await expect.poll(() => page.evaluate(() => Math.abs(document.getElementById('services')!.getBoundingClientRect().top)), { timeout: 5000 }).toBeLessThan(4)
  })

  test('the menu switch changes the theme too', async ({ page }) => {
    await page.click('#menu-open')
    await expect(page.locator('#menu-close')).toBeFocused()
    await page.click('#theme-switch-m')
    await expect.poll(() => theme(page)).toBe('dark')
    expect(await checked(page)).toEqual(['true', 'true'])
  })
})

test.describe('work viewer', () => {
  const row = (page: Page, n: number) => page.locator(`#work-tab-0${n}`)
  const panel = (page: Page, n: number) => page.locator(`#work-panel-0${n}`)

  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(DESKTOP)
    await go(page)
    await page.locator('#work').scrollIntoViewIfNeeded()
  })

  test('hover selects; the text swaps after the fade', async ({ page }) => {
    await expect(row(page, 1)).toHaveAttribute('aria-selected', 'true')
    await row(page, 3).hover()
    await expect(row(page, 3)).toHaveAttribute('aria-selected', 'true')
    await expect(row(page, 3)).toHaveClass(/\bon\b/)
    await expect(row(page, 1)).toHaveAttribute('aria-selected', 'false')
    await expect(panel(page, 3)).toBeVisible()
    await expect(panel(page, 1)).toBeHidden()
    await expect(page.locator('.v-cap.tr')).toContainText('Noon')
    await expect(page.locator('.v-art')).not.toHaveClass(/light-sky/)
  })

  test('click selects', async ({ page }) => {
    await row(page, 5).click()
    await expect(row(page, 5)).toHaveAttribute('aria-selected', 'true')
    await expect(panel(page, 5)).toBeVisible()
  })

  test('keyboard: arrows, Home and End move and select', async ({ page }) => {
    await row(page, 1).focus()
    await page.keyboard.press('ArrowDown')
    await expect(row(page, 2)).toBeFocused()
    await expect(row(page, 2)).toHaveAttribute('aria-selected', 'true')
    await page.keyboard.press('End')
    await expect(row(page, 6)).toBeFocused()
    await expect(panel(page, 6)).toBeVisible()
    await page.keyboard.press('ArrowDown')
    await expect(row(page, 1)).toBeFocused()
    await page.keyboard.press('ArrowUp')
    await expect(row(page, 6)).toBeFocused()
    await page.keyboard.press('Home')
    await expect(row(page, 1)).toHaveAttribute('aria-selected', 'true')
    await expect(page.locator('.v-art')).toHaveClass(/light-sky/)
    /* only the selected tab is in the Tab order */
    expect(await page.locator('[role="tab"][tabindex="0"]').count()).toBe(1)
  })

  test('phones: scrolling a row into the band selects it', async ({ page }) => {
    await page.setViewportSize(PHONE)
    await go(page)
    await page.evaluate(() => {
      const r = document.getElementById('work-tab-04')!.getBoundingClientRect()
      window.scrollTo({ top: scrollY + r.top - innerHeight * 0.64, behavior: 'instant' })
    })
    await expect(row(page, 4)).toHaveAttribute('aria-selected', 'true')
  })
})

test('copy button copies the address and says so for 1.6s (or selects it if the clipboard is refused)', async ({ page, context, browserName }) => {
  /* Playwright can grant clipboard access only in Chromium */
  if (browserName === 'chromium') await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.setViewportSize(DESKTOP)
  await go(page)
  await page.click('#copy-email')
  const outcome = () => page.evaluate(() => (document.getElementById('copy-email')!.textContent === 'Copied' ? 'copied' : getSelection()?.toString() === 'hello@ultravi0let.com' ? 'selected' : ''))
  await expect.poll(outcome).not.toBe('')
  if (browserName === 'chromium') {
    expect(await outcome()).toBe('copied')
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('hello@ultravi0let.com')
  }
  await expect(page.locator('#copy-email')).toHaveText('Copy', { timeout: 3000 })
})
