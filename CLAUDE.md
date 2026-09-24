# ULTRAVI0LET website

Marketing site for Ultravi0let, a senior-only product studio in Dubai. React 19 + TanStack Start + TypeScript,
prerendered to static HTML, deployed on Vercel (Nitro), contact form via Resend.

The approved design and the full spec live in `handoff/`. Read `handoff/docs/BRIEF.md` before starting any task;
`handoff/docs/BEHAVIOUR.md` before touching motion; `handoff/docs/SEO.md` before touching anything in `<head>`,
headings or routes.

## Commands

- `npm run dev`: dev server on http://localhost:3000
- `npm run build`: production build + prerender into `.output/` (`VERCEL=1 npm run build` writes Vercel's `.vercel/output/`)
- `npm run preview`: serve the production build
- `npm run typecheck`, `npm run lint`
- `npm test`: the prerendered HTML contains every string in content.json (run after a build)
- `npm run test:e2e`: Playwright against the production build (run after a build); `npx playwright test tests/parity.spec.ts`
  alone is the visual-parity check against the reference (diff images in `test-results/parity/`). Interactions and
  the form also run in WebKit and Firefox (`--project=webkit`, `--project=firefox`)
- Lighthouse (after a build): `npx serve .output/public -l 4181`, then
  `npx lighthouse http://localhost:4181/ --throttling-method=devtools`. Headless Chrome has no GPU, so it measures
  the no-WebGL path (the site refuses software WebGL); the final word is PageSpeed Insights on the deployed URL

## Rules

**Design fidelity**
- `handoff/design/reference/ultravi0let-final.html` is the source of truth; the screenshots in
  `handoff/design/reference/screens/` show every state. Match them. Don't restyle, "improve" spacing or swap fonts.
  The only intended differences are the ones the brief calls out (BRIEF §4–§9: semantic markup, the contrast fix,
  theme memory, the faint headline under the typing, the responsive fixes, `inert` for the menu).
- Copy comes from `handoff/design/content/content.json`, verbatim (curly quotes, em dashes, middle dots). The name is
  Ultravi0let with a zero; ULTRAVI0LET in caps.
- Styles are plain CSS from `handoff/design/styles/` with the same class names. No Tailwind, CSS-in-JS or UI kits.
  Colours come from tokens, except the skies, halo marks and four-phase waypoints, which are fixed on purpose.

**Rendering and performance**
- Every page is prerendered. All copy must be in the HTML without JavaScript. No client-side fetching of content.
- React renders markup; `src/motion/*` (plain TypeScript) animates it through refs. Never set React state per frame
  or per scroll event. One requestAnimationFrame loop; draw only what's on screen and changed.
- WebGL loads lazily (dynamic import after hydration, on idle). Each canvas's context is created only when its
  section nears the screen.
- Budget: Lighthouse mobile Performance ≥ 95; LCP ≤ 1.8s; CLS ≤ 0.02; first-load JS ≤ 120 KB gzipped. Check the
  bundle before adding any dependency.
- Honour `prefers-reduced-motion` everywhere, as in BEHAVIOUR §9.

**SEO and accessibility**
- Every route's `head()` comes from `pageHead()` in `src/lib/seo.ts` (title, description, canonical, Open Graph).
  One `<h1>` per page. Landmarks, skip link, visible focus, keyboard access, `aria-hidden` on decoration.
- The structured data is one JSON-LD graph built in `src/lib/seo.ts`. No Review or FAQ markup.

**Server and secrets**
- Server code only in `createServerFn` functions (`src/server/`). Validate every input.
- `RESEND_API_KEY` and `CONTACT_TO` are server-only: never prefix them with `VITE_`, never log them, and never commit
  `.env`. Keep `.env.example` up to date.

**Before saying a task is done**
- Run typecheck, lint and build, plus the tests that cover what you changed. For visual work, run the parity
  screenshots against the reference (BRIEF §13) and look at the diffs. Report what you checked and anything that
  differs from the reference.
- Don't push, deploy or change DNS without asking.
