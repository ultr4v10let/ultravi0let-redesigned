# Ultravi0let — Project Notes

Marketing/portfolio site for **Ultravi0let**, a Dubai product studio (est. 2022) doing design, engineering, cloud, and AI. Static Next.js site — no backend, no CMS.

Brand stylization: lowercase with a zero — `ultravi0let`. Tagline: *"We build the quiet machinery behind loud products."*

## Stack

- **Next.js 14.2** (App Router) · **React 18** · **TypeScript 5.6** (strict)
- **Tailwind 3.4** + PostCSS
- **Framer Motion 11** — used heavily for `whileInView` entrance animations, aurora drift, parallax
- **Lucide React** icons
- `cn()` helper in `lib/cn.ts` = `clsx` + `tailwind-merge`
- Fonts (Google): Inter Tight (`--font-geist`, sans), Instrument Serif (`--font-instrument`, display), JetBrains Mono (`--font-geist-mono`)

## Scripts

```
npm run dev     # localhost:3000
npm run build
npm run start
npm run lint
```

No `vercel.json` — deploys via Vercel's Next.js auto-detection.

## Routing

Main site under `app/`:
- `/` — Hero · Marquee · Projects (bento) · Services · Manifesto · Process · Testimonials · Contact · Footer
- `/demos` — index page listing all five demos

Five client demo apps under `app/demos/*`, each a self-contained mini-site with its own palette, typography, and nested routes:

| Demo | Path | Subdomain | Vibe |
|---|---|---|---|
| AG Law (Cairo law firm) | `app/demos/ag-law` | `aglaw.ultravi0let.com` | Warm beige + dark navy, Cormorant Garamond |
| Lumen Health (GCC telemedicine) | `app/demos/lumen-health` | `lumen.ultravi0let.com` | Teal/green healthcare |
| Aizu (carbon disclosure) | `app/demos/aizu` | `aizu.ultravi0let.com` | Dark green tech |
| Circle of Trust (rotating credit fintech) | `app/demos/circle-of-trust` | `circle.ultravi0let.com` | Warm peach + rust |
| Connect6 (hospitality CRM) | `app/demos/connect6` | `connect6.ultravi0let.com` | Dark + vibrant purple |

Each demo has nested routes like `/book`, `/dashboard`, `/inbox`, etc.

### Subdomain routing — `middleware.ts`

Maps production subdomains to `/demos/<slug>` via Next.js `rewrite`. In dev, use either `<slug>.localhost:3000` or the direct `/demos/<slug>` path. Root hosts: `ultravi0let.com`, `www.ultravi0let.com`.

## Components

Main site (`components/`):
- `Nav.tsx` — fixed header, shrinks on scroll, mobile hamburger
- `Hero.tsx` — animated text reveal, mouse-driven aurora parallax, grid background, stats strip
- `Marquee.tsx` — scrolling keyword strip
- `Projects.tsx` — **bento grid** (1 feature + 4 supporting), 12-col on md
- `Services.tsx` — 8 service cards in 4-col grid
- `Manifesto.tsx` — scroll-triggered word-by-word opacity
- `Process.tsx` · `Testimonials.tsx` · `Contact.tsx` · `Footer.tsx`
- `SectionHeader.tsx` — reusable eyebrow + title + caption with motion

Demo-shared (`components/demo/`):
- `NdaBanner.tsx` — NDA notice strip (tint/ink/border are props)

## Design system

**Light mode** — confirmed by recent commit `8e8cbce`. Don't introduce dark mode without asking.

Palette (Tailwind config):
- `paper`: 50 `#FAFAFA` · 100 `#F4F4F6` · 200 `#E8E8EC`
- `ink`: 950 `#0A0710` · 900 `#15102A` · 800 `#231A36` · 700 `#3A2F4C` (faint violet undertone)
- `violet`: 700 `#6D28D9` · 600 `#7C3AED` · 400 `#A78BFA` · 300 `#C4A5FF`
- `accent`: `#C4A5FF` default; `#9F6A2D` warm fallback

Utility classes in `globals.css`:
- `.eyebrow` — small capsule label with dot, blurred backdrop
- `.violet-glow` — violet box-shadow glow
- `.grain` — fixed SVG noise overlay, `opacity: 0.025`
- `.serif-italic` — Instrument Serif italic, used for accent words like "quiet machinery"
- `.hairline` — xor-mask gradient border trick
- Custom thin scrollbar (violet)

Custom keyframes (tailwind.config.ts): `fade-up`, `marquee`/`marquee-reverse`, `shimmer`, `breathe`, `pulse-soft`, `drift-1/2/3` (aurora), `spin-slow`.

## Content / data

All content is **hardcoded**, no CMS:
- `lib/data.ts` — exports `services`, `projects`, `stats`, `testimonials`, `marqueeWords`. The five project entries include a `subdomain` field used by `Projects.tsx`.

`next.config.mjs` allows remote images from `images.unsplash.com` and `plus.unsplash.com` (AVIF/WebP enabled).

## Conventions

- Components: `PascalCase.tsx`
- Heavy use of `whileInView` with stagger via `(index % 3) * 0.08` delays
- Decorative elements get `aria-hidden`
- Typography hierarchy: display = Instrument Serif (often italic for accent words), body = Inter Tight, monospace = JetBrains Mono for stats/labels/dates
- Mobile-first; `md:` is the main breakpoint
- Each demo has its **own** font + palette baked into its layout — don't try to share a token system across demos
