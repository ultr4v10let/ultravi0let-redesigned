/* BRIEF §13.3 / §10: the contact form end to end. The built server sends to a fake Resend API (RESEND_BASE_URL in
   playwright.config.ts points here), so nothing leaves the machine and the test sees exactly what would be sent. */
import { createServer } from 'node:http'
import type { Server } from 'node:http'
import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'

type Sent = { auth?: string; body: Record<string, unknown> }
const sent: Sent[] = []
let server: Server
let failNext = false

test.describe.configure({ mode: 'serial' })

test.beforeAll(async () => {
  server = createServer((req, res) => {
    let raw = ''
    req.on('data', (c) => { raw += c })
    req.on('end', () => {
      sent.push({ auth: req.headers.authorization, body: JSON.parse(raw || '{}') })
      if (failNext) {
        failNext = false
        res.writeHead(422, { 'content-type': 'application/json' })
        res.end(JSON.stringify({ name: 'validation_error', message: 'nope', statusCode: 422 }))
        return
      }
      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(JSON.stringify({ id: 'test-email-id' }))
    })
  })
  await new Promise<void>((r) => server.listen(4174, r))
})
test.afterAll(() => new Promise<void>((r) => server.close(() => r())))
test.beforeEach(() => { sent.length = 0 })

/* the page is live once the motion engine has started (it runs after hydration) */
const go = async (page: Page) => { await page.goto('/'); await page.waitForSelector('#sky[data-gl]') }

async function fill(page: Page, { name = 'Ada Lovelace', company = 'Analytical Engines', email = 'ada@example.com', project = 'A machine\nthat weaves.' } = {}) {
  await page.fill('#f-name', name)
  await page.fill('#f-company', company)
  await page.fill('#f-email', email)
  await page.fill('#f-project', project)
}

test('sends the enquiry through Resend, then thanks the visitor and clears the form', async ({ page }) => {
  await go(page)
  await page.locator('#contact').scrollIntoViewIfNeeded()
  await fill(page)
  await page.waitForTimeout(3100)
  await page.click('#contact-form button[type="submit"]')
  await expect(page.locator('#contact-form [role="status"]')).toHaveText('Thanks — it’s with us. We’ll come back within 24 hours.', { timeout: 15_000 })
  await expect(page.locator('#contact-form [role="status"]')).toBeFocused()
  await expect(page.locator('#f-name')).toHaveValue('')
  expect(sent).toHaveLength(1)
  const { auth, body } = sent[0]
  expect(auth).toBe('Bearer re_test')
  expect(body).toMatchObject({
    from: 'Ultravi0let <onboarding@resend.dev>',
    to: 'hello@ultravi0let.com',
    reply_to: 'ada@example.com',
    subject: 'New enquiry: Ada Lovelace — Analytical Engines',
  })
  expect(body.text).toContain('Project: A machine\nthat weaves.')
  expect(body.html).toContain('A machine<br>that weaves.')
})

test('a provider error shows the fallback message, never the provider detail', async ({ page }) => {
  await go(page)
  await fill(page)
  await page.waitForTimeout(3100)
  failNext = true
  await page.click('#contact-form button[type="submit"]')
  await expect(page.locator('#contact-form [role="alert"]')).toHaveText('That didn’t go through. Write to hello@ultravi0let.com and we’ll pick it up there.')
  await expect(page.locator('#contact-form')).not.toContainText('nope')
  await expect(page.locator('#f-name')).toHaveValue('Ada Lovelace')
})

test('too fast to be a person: rejected without sending', async ({ page }) => {
  await go(page)
  await fill(page)
  /* the form times itself from when it appeared; wind the page's clock back so it reads as seconds, not minutes */
  await page.evaluate(() => { const real = Date.now.bind(Date); Date.now = () => real() - 60_000 })
  await page.click('#contact-form button[type="submit"]')
  await expect(page.locator('#contact-form [role="alert"]')).toBeVisible()
  expect(sent).toHaveLength(0)
})

test('honeypot filled: rejected without sending', async ({ page }) => {
  await go(page)
  await fill(page)
  await page.evaluate(() => { (document.getElementById('f-extra') as HTMLInputElement).value = 'http://spam.example' })
  await page.waitForTimeout(3100)
  await page.click('#contact-form button[type="submit"]')
  await expect(page.locator('#contact-form [role="alert"]')).toBeVisible()
  expect(sent).toHaveLength(0)
})

test('native validation stops an empty name or a bad email before any request', async ({ page }) => {
  await go(page)
  let calls = 0
  page.on('request', (r) => { if (r.url().includes('/_serverFn/')) calls++ })
  await fill(page, { name: '' })
  await page.click('#contact-form button[type="submit"]')
  await fill(page, { email: 'not-an-email' })
  await page.click('#contact-form button[type="submit"]')
  await page.waitForTimeout(300)
  expect(calls).toBe(0)
  expect(await page.locator('#f-email').evaluate((el: HTMLInputElement) => el.validity.valid)).toBe(false)
})

test('the server validates too: a crafted request with a bad email is refused', async ({ page }) => {
  await go(page)
  await fill(page, { email: 'x@y' })
  /* bypass the browser's own check */
  await page.evaluate(() => { (document.getElementById('f-email') as HTMLInputElement).type = 'text' })
  await page.waitForTimeout(3100)
  await page.click('#contact-form button[type="submit"]')
  await expect(page.locator('#contact-form [role="alert"]')).toBeVisible()
  expect(sent).toHaveLength(0)
})
