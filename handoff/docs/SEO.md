# SEO plan

Two halves: what the code must do (Claude Code builds all of it), and what only the owner can do after launch
(nothing in the code can replace those). Ready-made files are in `handoff/seo/`.

## What "first page" realistically means

- **Searches for the brand** ("ultravi0let", "ultravi0let dubai", "ultraviolet studio dubai"): page one within days to a
  few weeks of launch, once Google has crawled the site and connected the name across the site, the structured data
  and the profiles below.
- **Searches for the service** ("product design studio dubai", "software development studio dubai", "AI engineering
  company UAE"): competitive. A fast, clean, well-marked-up home page makes the site eligible; ranking needs
  more pages about each service and the work, links from other sites, and a Google Business Profile. Expect months.
- The name has a zero. People will often type "ultraviolet" with an O, which is also a common word (UV light), so:
  the structured data lists "Ultraviolet" and "Ultraviolet Studio" as alternate names, and the owner's profiles should
  use the same pairing. Don't stuff "Ultraviolet" into visible copy.

## In the code

**Rendering**
- Every page is prerendered to static HTML at build time (TanStack Start `prerender`), so crawlers and AI tools get
  the full text without running JavaScript, and the CDN serves it instantly.
- All copy is real text in the HTML. In particular:
  - The headline is the `<h1>` text itself (not only typed in by script).
  - All six projects' descriptions and stats are in the HTML. Render them as tab panels, with only the active one
    shown. Google indexes content in tabs.
  - The ring labels, progress-bar labels and clock are decorative (`aria-hidden`). They don't need to be indexed.
- One `<h1>` (the headline). One `<h2>` per section: "Things we’ve shipped", "Eight disciplines, one team",
  "A short note", "Four phases, no surprises", "What clients say", "Got an idea? Let’s make it fly".
  `<h3>` for project names, service names and phase names. The prototype uses spans for some of these; keep the
  classes, change the elements.
- Landmarks: `<header>`, `<nav aria-label="Primary">`, `<main id="main">`, `<footer>`. Add a skip link.
- `<html lang="en">`.

**Head (from `seo/meta.json`)**
- Title (58 characters): `Ultravi0let — Product design & engineering studio in Dubai`
- Description (155 characters): `We build the quiet machinery behind loud products. A senior-only studio in Dubai for
  design, engineering, cloud and AI, from first prototype to production.`
- Canonical `https://www.ultravi0let.com/`. Pick www or the bare domain once and redirect the other in Vercel. Use
  the canonical origin in every absolute URL, including on preview deployments.
- Open Graph and Twitter card tags with `og-image.png` (1200×630, in `design/brand/`).
- `theme-color` for light (`#F2EDFE`) and dark (`#110E2A`) with media queries, updated by script when the visitor
  picks a theme (the media queries only follow the system); `color-scheme` `light dark`.
- Icons: `favicon.ico` (48), `favicon.svg`, `apple-touch-icon.png` (180), `site.webmanifest` with 192 and 512 icons.
- Keep all of this in one `src/lib/seo.ts` (site config + a `pageHead({ title, description, path })` helper) so future
  pages get it right by default. Route `head()` returns its result.

**Structured data** (`seo/jsonld.json`)
- A single JSON-LD `@graph` in the home page head: `Organization` (name, alternate names, logo, email, founding year,
  Dubai / AE, services as `knowsAbout`, `sameAs` profiles), `WebSite` (site name and alternates, which is what Google
  uses for the site name shown in results), `WebPage`.
- Fill `sameAs` with the real profile URLs (LinkedIn, GitHub, Clutch…) as soon as they exist; leave the array empty
  until then.
- **Don't** mark the testimonials up as `Review`/`AggregateRating`: Google doesn't show star snippets for reviews a
  business publishes about itself. **Don't** add `FAQPage`: FAQ rich results are limited to government and health
  sites.
- Check it with Google's Rich Results Test and validator.schema.org before launch.

**Crawling**
- `robots.txt` (allow all, point to the sitemap). AI crawlers are allowed, so the studio can appear in AI search
  answers too.
- `sitemap.xml` generated at build (TanStack Start's `sitemap` option with `prerender.crawlLinks`), absolute canonical
  URLs only.
- `llms.txt` (optional, `seo/llms.txt`): a plain summary of the studio for AI tools.
- A real 404 page (status 404, `noindex`): prerendered to `404.html`, which Vercel serves with a 404 status.
- No `noindex` anywhere on production; do add `X-Robots-Tag: noindex` on Vercel preview deployments so previews
  never get indexed.

**Speed** (Google ranks on real-user Core Web Vitals). Google's "good" thresholds, at the 75th percentile of real
visits, are LCP under 2.5s, INP under 200ms and CLS under 0.1. The build's own budget is stricter (LCP ≤ 1.8s,
CLS ≤ 0.02 in the lab); see `BRIEF.md` §7.

**Ready for more pages**
- Routes are planned for `/work/$slug` and `/services/$slug`. When those pages get real copy (a case study per
  project, a page per discipline), each gets its own title, description, canonical and `BreadcrumbList`, the index rows
  and service rows become links to them, and they join the sitemap automatically. Don't publish thin placeholder pages;
  one paragraph per page hurts more than it helps.

## After launch (the owner)

1. **Google Search Console**: verify the domain (DNS), submit `sitemap.xml`, request indexing of the home page, then
   watch Coverage and Core Web Vitals. Import the site into **Bing Webmaster Tools** too; Bing's index feeds several AI
   assistants.
2. **Google Business Profile**: create one for Ultravi0let in Dubai. A remote-first studio can list as a service-area
   business with the address hidden. This is what surfaces the studio for "… Dubai" searches and on Maps, and where
   client reviews belong.
3. **Links and listings**: the same name, email and one-line description everywhere:
   - LinkedIn company page and the founders' profiles, linking to the site.
   - B2B directories that rank for agency searches: Clutch, GoodFirms, DesignRush, Sortlist, plus UAE directories.
   - Ask clients for a credit link ("Built by Ultravi0let") on the sites you shipped, such as AG Law, Maquette and
     Zanobia. Links from real client sites are the strongest signal a studio can get.
4. **Content that ranks** (the next step for the site): a case-study page per project and a page per discipline,
   then occasional articles on what the studio knows (AI engineering, cloud cost, architecture). Each page should target
   one search intent.
5. **Arabic** (optional, later): an Arabic version (`/ar`, with `hreflang`) can widen reach in the UAE market.
