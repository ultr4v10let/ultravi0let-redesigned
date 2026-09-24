/* SEO.md "In the code": what crawlers get from the prerendered home page and the static files. Run after a build:
   node --test tests/seo.test.ts */
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'

const DIR = ['.output/public', '.vercel/output/static'].find((d) => existsSync(`${d}/index.html`))
const SITE = 'https://www.ultravi0let.com'
const html = DIR ? readFileSync(`${DIR}/index.html`, 'utf8') : ''
const head = html.slice(0, html.indexOf('</head>'))
const attr = (re: RegExp) => head.match(re)?.[1]

test('build output exists', () => assert.ok(DIR, 'run the build first'))

test('title, description and canonical', () => {
  assert.equal(attr(/<title>([^<]*)<\/title>/), 'Ultravi0let — Product design &amp; engineering studio in Cairo')
  assert.equal(attr(/<meta name="description" content="([^"]*)"/), 'We build the quiet machinery behind loud products. A senior-only studio in Cairo for design, engineering, cloud and AI, from first prototype to production.')
  assert.equal((head.match(/rel="canonical"/g) ?? []).length, 1)
  assert.equal(attr(/<link rel="canonical" href="([^"]*)"/), `${SITE}/`)
  assert.equal((head.match(/<title>/g) ?? []).length, 1)
  assert.ok(!/name="robots"/.test(head), 'no robots meta on the home page')
})

test('Open Graph and Twitter', () => {
  for (const [p, v] of [['og:type', 'website'], ['og:url', `${SITE}/`], ['og:image', `${SITE}/og-image.png`], ['og:image:width', '1200'], ['og:image:height', '630'], ['og:locale', 'en_US']]) {
    assert.equal(attr(new RegExp(`<meta property="${p}" content="([^"]*)"`)), v, p)
  }
  assert.equal(attr(/<meta name="twitter:card" content="([^"]*)"/), 'summary_large_image')
})

test('theme colours, icons, manifest, lang', () => {
  assert.match(head, /<meta name="theme-color" content="#F2EDFE" media="\(prefers-color-scheme: light\)"/)
  assert.match(head, /<meta name="theme-color" content="#110E2A" media="\(prefers-color-scheme: dark\)"/)
  for (const f of ['favicon.ico', 'favicon.svg', 'apple-touch-icon.png', 'site.webmanifest', 'icon-192.png', 'icon-512.png', 'og-image.png', 'llms.txt']) assert.ok(existsSync(`${DIR}/${f}`), f)
  assert.match(html, /<html lang="en"/)
})

test('one JSON-LD graph: Organization, WebSite, WebPage; no Review or FAQ', () => {
  const blocks = [...head.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  assert.equal(blocks.length, 1)
  const g = JSON.parse(blocks[0][1])
  assert.deepEqual(g['@graph'].map((n: { '@type': string }) => n['@type']), ['Organization', 'WebSite', 'WebPage'])
  assert.ok(!/Review|AggregateRating|FAQPage/.test(blocks[0][1]))
  const org = g['@graph'][0]
  assert.deepEqual(org.alternateName, ['ULTRAVI0LET', 'Ultraviolet', 'Ultraviolet Studio'])
  assert.equal(org.address.addressCountry, 'EG')
  assert.equal(org.knowsAbout.length, 8)
})

test('headings: one h1, then h2s and h3s in order', () => {
  const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]))
  assert.equal(levels.filter((l) => l === 1).length, 1)
  assert.equal(levels[0], 1)
  levels.forEach((l, i) => assert.ok(i === 0 || l <= levels[i - 1] + 1, `h${l} after h${levels[i - 1]}`))
})

test('landmarks and skip link', () => {
  assert.match(html, /<a class="skip" href="#main">/)
  assert.match(html, /<main id="main">/)
  assert.match(html, /<header /)
  assert.match(html, /<nav class="nav" aria-label="Primary">/)
  assert.match(html, /<footer /)
})

test('robots.txt and sitemap.xml', () => {
  const robots = readFileSync(`${DIR}/robots.txt`, 'utf8')
  assert.match(robots, /User-agent: \*\nAllow: \//)
  assert.match(robots, new RegExp(`Sitemap: ${SITE}/sitemap.xml`))
  const sitemap = readFileSync(`${DIR}/sitemap.xml`, 'utf8')
  assert.match(sitemap, /xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9"/)
  assert.deepEqual([...sitemap.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1]), [`${SITE}/`])
})
