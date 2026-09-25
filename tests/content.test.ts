/* BRIEF §13.1: the prerendered index.html contains every string from content.json, with entities decoded and tags
   stripped. Strings that only exist after script runs, or aren't literal text, are left out on purpose.
   Run after a build: node --test tests/content.test.ts */
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import content from '../src/content/content.json' with { type: 'json' }

const OUT = ['.output/public/index.html', '.vercel/output/static/index.html', 'dist/client/index.html'].find(existsSync)

/* what isn't literal page text: hrefs, field ids and types, flags, templates, and text that only script shows */
const SKIP_KEYS = new Set(['_about', '_designCopy', 'href', 'id', 'type', 'autocomplete', 'required', 'kind', 'url', 'figure', 'progressFormat'])
const SKIP_PATHS = [
  /^hero\.film\.chapters\.[123]$/, // progress-bar chapters after the first
  /^work\.viewer\.skyLabels\.[1-5]$/, // the viewer caption shows the first sky until a project is chosen
  /^contact\.copy\.done$/, // "Copied"
  /^ui\.switchToLight$/, // the switch label that isn't showing
  /^contact\.form\.(sent\.\w+|error)$/, // shown after sending
  /^footer\.columns\.\d+\.links\.\d+\.1$/, // hrefs
]

function strings(v: unknown, path: string, out: [string, string][]) {
  if (typeof v === 'string') out.push([path, v.replace(/\[\/?light\]/g, '')])
  else if (Array.isArray(v)) v.forEach((x, i) => strings(x, `${path}.${i}`, out))
  else if (v && typeof v === 'object') {
    for (const [k, x] of Object.entries(v)) if (!SKIP_KEYS.has(k)) strings(x, path ? `${path}.${k}` : k, out)
  }
  return out
}

const decode = (s: string) => s
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
  .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')

test('prerendered index.html contains every string from content.json', () => {
  assert.ok(OUT, 'no build output found: run the build first')
  const html = readFileSync(OUT, 'utf8')
  const body = html.slice(html.indexOf('<body'))
  /* page text: no scripts, no comments, no tags */
  const text = decode(body.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, ''))
  /* attribute values (aria-labels and the like) count too */
  const attrs = decode(body)
  const missing = strings(content, '', [])
    .filter(([path]) => !SKIP_PATHS.some((re) => re.test(path)))
    .filter(([, s]) => !text.includes(s) && !attrs.includes(`"${s}"`))
  assert.deepEqual(missing, [], `missing from ${OUT}`)
})
