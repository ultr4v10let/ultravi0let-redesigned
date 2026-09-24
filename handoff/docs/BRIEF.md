# ULTRAVI0LET website: build brief

Build the approved design as a production website: React, TanStack Start, prerendered, hosted on Vercel, with a
working contact form. The goals, in order: **look and move exactly like the approved design**, **load and respond
fast on any phone**, and **be as findable as possible**.

## 1. Sources of truth

| What | Where |
|---|---|
| The approved page, runnable | `handoff/design/reference/ultravi0let-final.html` (open it in Chrome) |
| How it looks at every size and state | `handoff/design/reference/screens/*.jpg` (see the list at the end) |
| Markup and class names | `handoff/design/reference/markup.html` |
| Styles, already cleaned up | `handoff/design/styles/tokens.css` + `site.css` (verified to render identically to the page) |
| Every word | `handoff/design/content/content.json` |
| Sky shader and data | `handoff/design/sky/sky.frag`, `handoff/design/sky/sky-data.json` |
| Behaviour | `handoff/docs/BEHAVIOUR.md` (numbers) and `handoff/design/behaviour/page.reference.js` (the prototype script) |
| Logo, icons, social image | `handoff/design/brand/` |
| SEO | `handoff/docs/SEO.md` and `handoff/seo/` |

The copy on the page is the live site's wording. Keep it verbatim, including curly apostrophes, the em dashes and the
middle dots. The name is always **Ultravi0let** with a zero, **ULTRAVI0LET** in caps. `content.json → _designCopy`
lists the few strings that were written for the design.

## 2. Decisions already made

- **One page now** (the home page), built so project and service pages can be added later without rework.
- **TanStack Start**, React 19, TypeScript, Vite. Scaffold with `npx @tanstack/cli@latest create`.
- **Prerendered, not server-rendered per request.** Every page is rendered to static HTML at build time
  (`prerender: { enabled: true, crawlLinks: true }` in the `tanstackStart()` Vite plugin), then hydrated. Crawlers get
  complete HTML, and the CDN serves pages with no server start-up. The only server code is the contact form's server
  function.
- **Vercel**, via the Nitro Vite plugin (`nitro/vite`), as Vercel's TanStack Start guide describes. The form runs as a
  Vercel Function; everything else is static.
- **Contact form → email via Resend**, sent to hello@ultravi0let.com with the visitor as reply-to.
- **Plain CSS**, from `tokens.css` and `site.css`, same class names. No Tailwind, no CSS-in-JS runtime, no UI kit.
  The design is finished and already expressed in CSS.
- **No animation library.** The motion is scroll-linked maths and one small WebGL shader, ported from the prototype.

Check package names and config options against the current TanStack Start docs as you go. The API moves quickly;
for example, server-function input validation is `.validator()` in current releases.

## 3. Architecture

```
src/
  routes/
    __root.tsx        html shell: <HeadContent />, <Scripts />, theme bootstrap script, fonts, global CSS, skip link
    index.tsx         home: head() from lib/seo.ts, JSON-LD, the sections
  components/         SiteHeader, ThemeSwitch, MenuButton, MobileMenu, HaloMark, SpectrumIcon, MenuMark, Glyph
  sections/           HeroFilm, Marquee, Work, Services, Studio, ProcessFilm, Testimonials, Contact, SiteFooter
  motion/             framework-free TypeScript, no React inside
    engine.ts         the one requestAnimationFrame loop, visibility and reduced-motion gating, the theme's `night`
    sky/renderer.ts   WebGL renderer (lazy-loaded); sky.frag imported with ?raw
    heroFilm.ts  workViewer.ts  processFilm.ts  header.ts  menu.ts  typewriter.ts  theme.ts
  content/content.ts  typed content (from content.json), plus sky data
  lib/seo.ts          site config, pageHead(), JSON-LD builder
  server/contact.ts   createServerFn: validate, spam checks, send with Resend
  styles/             tokens.css, then site.css split by section (keep rule order within each file)
public/               favicon.ico, favicon.svg, apple-touch-icon.png, icon-192.png, icon-512.png, og-image.png,
                      site.webmanifest, robots.txt, llms.txt
```

**React owns the markup; the motion modules own the frames.** Components render the static HTML and hand refs to the
motion modules from one `useEffect` on the home page, which run after hydration. Nothing re-renders per frame: the
modules write `style.transform`, `style.opacity`, CSS custom properties and classes directly, as the prototype does.
React state is only for discrete things: the selected project, whether the menu is open, the theme, the form's state.
Each module returns a cleanup function.

**Unique SVG ids.** The halo mark appears six times, each with gradients and filters. Generate ids with `useId()`, or
the marks will reference each other's gradients.

## 4. Porting the markup

Follow `markup.html` element for element and class for class, with these changes:

- Build from `content.json`: nav, marquee, projects, services, phases, testimonials, footer.
- **Headline:** real `<h1>` text; see §7 for the typing overlay.
- **Work:** the rows become a `role="tablist"` (vertical) of `<button role="tab" aria-selected aria-controls>`
  elements, not `<a href="#work">`. Arrow keys move between them. Reset the buttons' browser styles (background,
  border, font, colour, text alignment, full width) so they look exactly like the prototype's rows, and keep each
  row's bottom hairline. The viewer's text panel holds six `role="tabpanel"` blocks with only the selected one visible,
  so every project's copy is in the HTML. The sky canvas and captions stay single. Once project pages exist, each row
  gets a real link to its page.
- **Headings:** the project name in each tab panel (`.v-name`), the service names (`.svc-name`) and the phase names
  (`.p-name`, already an `h3`) are `<h3>`. The names inside the tab buttons stay spans, since a heading can't go
  inside a button. The "A short note" title becomes the section's `<h2>`. `site.css` only resets margins on `h1`,
  `h2` and `.p-name`, so give the new `h3`s `margin: 0` (and `font: inherit` where the class sets the font) so nothing
  moves.
- **Form:** add a hidden honeypot field and real success and error states (copy is in `content.json`); drop the
  prototype's "design preview" note.
- **Halo marks:** make one `HaloMark` component with `variant: 'light' | 'dark'` from `design/brand/halo-mark-*.svg`.
  They're used in the header, the wordmark's zero slot and the footer.
- **Skip link** to `#main`, first in the body.

## 5. Styles and fonts

- Import `tokens.css` first, then `site.css`. Split `site.css` into files per section if you like, but keep the
  cascade order.
- Fonts: self-host with Fontsource variable packages (`@fontsource-variable/geist`, `@fontsource-variable/geist-mono`,
  `@fontsource-variable/hanken-grotesk`), Latin subset. Fontsource names the families "Geist Variable" and so on, so
  update `--display`, `--mono` and `--text` in `tokens.css`. Preload the Latin Geist file (the headline is the LCP
  element), and add metric-matched fallbacks (e.g. `fontaine`) so the swap doesn't shift layout.
- **Contrast fix (apply unless the owner objects):** `--faint` in light mode (`#8A7DBA`) is 3.2:1 on the page, below
  WCAG AA for small text. Use `#7262AC` (4.5:1). It's barely visibly different. Dark mode already passes.

## 6. Theme

- Inline script in `<head>`, before anything paints: use `localStorage.theme` if it's `light` or `dark`, otherwise
  the system preference, and set `data-theme` on `<html>`. It is always set, as in the prototype, because some CSS
  (`::selection`, the no-WebGL dark gradient) keys off it. While nothing is stored, follow system changes live
  (`matchMedia('(prefers-color-scheme: dark)')` change → update `data-theme` and the skies).
- The switches must show the right state at first paint. The prerendered HTML says `aria-checked="false"`, so a dark
  visitor would see the light switch flip on hydration. Either set both switches' `aria-checked` from a tiny inline
  script placed right after the header markup (with `suppressHydrationWarning` on them), or key the switch CSS off
  `data-theme`.
- Clicking follows BEHAVIOUR §1 (View Transition circle reveal from the switch). If the theme lives in React state,
  apply it synchronously inside `startViewTransition` (`flushSync`), or the transition captures the old theme.
- Store the choice when the visitor clicks, and update the `theme-color` meta to match.

## 7. Performance

**Budget (home page, mobile, Lighthouse "Moto G Power / Slow 4G"):**
- Lighthouse Performance ≥ 95, Accessibility 100, Best Practices 100, SEO 100.
- LCP ≤ 1.8s, CLS ≤ 0.02, TBT ≤ 150ms. In the field: INP ≤ 200ms.
- JavaScript on first load ≤ 120 KB gzipped, excluding the lazy sky module (≤ 20 KB gzipped). CSS ≤ 15 KB gzipped.

**How:**
1. **Static first paint that already looks right.** Prerendered HTML with the stylesheet linked in the head. All the
   CSS is about 8.5 KB gzipped, so there's no need to split out critical CSS. The three variable fonts together are
   about 87 KB (Latin). Give the hero canvas element a CSS `background` gradient matching the film's first frame
   (`heroFilm.dawn` in light, `heroFilm.nightDawn` in dark), so the hero looks finished before any JavaScript runs.
   Put it on the canvas, not on `.stage`: the canvas fades out at the end of the film to reveal the paper behind the
   end card, and the gradient must fade with it. Create the WebGL context and draw the first frame in the same task,
   so there's never a blank canvas.
2. **Headline paints immediately.** The real `<h1>` text renders at first paint at low opacity (≈ .14), and the
   typing overlay writes over it (BEHAVIOUR §4). The LCP is then the first paint, not about 2s later.
3. **WebGL on demand.** `import()` the sky module after hydration, during idle time (`requestIdleCallback`, with a
   `setTimeout` fallback). Create the work viewer's and the process film's contexts only when they come within one
   viewport of the screen, and release them if the page is left. Keep the prototype's pixel budgets and DPR cap.
4. **One loop, doing little.** A single `requestAnimationFrame` loop. It draws a canvas only when its section is on
   screen and something changed (scroll, resize, theme, an animation in progress), plus the 20 fps drift where
   BEHAVIOUR says so. Pause when the tab is hidden, and once the phone menu has finished opening (the menu's reveal
   runs on its own rAF, so it must not be paused). Scroll listeners are passive and only set flags. Measure layout
   once per frame, and never read layout after writing styles in the same frame.
5. **Adaptive quality.** If frames run slow (say three consecutive frames over 24ms), lower that canvas's pixel budget
   by 30%, down to half. In the prototype, dark mode redraws the opening sky 20 times a second for twinkling stars,
   which is cheap on a GPU but heavy on weak or software-rendered ones.
6. **Hydration cost.** No client-side data fetching for content. Keep the root route light, and don't ship
   `content.json` twice (import the parts components need).
7. **Assets.** No raster images on the page besides the icons. Long-cache hashed assets (the default). Preconnect
   nothing: everything is first-party.

## 8. Responsive

The design has three layouts: desktop above 1100px, a tighter desktop from 881px to 1100px, and phone at 880px and
below. The reference screenshots cover all three, plus in-between sizes. Two problems in the prototype need fixing in
the build:

- **Phone in landscape (e.g. 844×390):** the hero headline overruns the progress bar, and the work viewer is taller
  than the screen (`33-phone-landscape-*.jpg`). Add a short-viewport rule (`max-height: 520px`): smaller headline,
  hide the hero paragraph, and cap the viewer art's height (the canvas re-sizes to it and the halo scales with the
  height, so nothing distorts).
- **881–1100px (e.g. 1024×768 tablet landscape):** the viewer's two caption groups collide
  (`32-tablet-landscape-work.jpg`). Hide the tags in the top-left caption in this range, as the phone layout already does.

Checked and fine: 360×640, 390×844, 412×915, 768×1024, 1280×720, 1366×768, 1440×900, 1536×864, 1920×1080. There's no
horizontal overflow at any of these. Test on a real iPhone (Safari) and a mid-range Android. `svh` units,
`position: sticky`, View Transitions and `animation-timeline` all behave a little differently in Safari, and the page
must still work without the last two.

## 9. Accessibility

- Semantic landmarks, one `h1`, headings in order, skip link.
- Visible focus everywhere (`:focus-visible` uses `--accent`). Every control reachable by keyboard.
- Phone menu: focus moves in on open and back to the button on close; Escape closes; while it's open, make the
  rest of the page `inert` (simpler and more robust than the prototype's manual Tab trap).
- Theme switches: `role="switch"`, `aria-checked`, labels as in BEHAVIOUR §1.
- Work tabs as in §4. Selecting a tab already tells screen readers which panel is showing, so drop the prototype's
  `aria-live` on `.viewer`. If hover selection should be announced, put `aria-live="polite"` on the panel container
  only, not the captions.
- `aria-hidden` on everything decorative: the canvases, ring labels, progress bar, the whole marquee, the
  four-phases overlay, clock, section label and step rail.
- `prefers-reduced-motion` as in BEHAVIOUR §9.
- Run axe (e.g. `@axe-core/playwright`) in light and dark with zero violations.

## 10. Contact form

- `src/server/contact.ts`: `createServerFn({ method: 'POST' })` with a `.validator()` (zod or valibot).
  - Fields: name (required, 1–120 characters), company (optional, up to 120), email (required, valid), project
    (optional, up to 4,000 characters), plus a honeypot field (must be empty) and the time the form appeared (reject if
    submitted in under 3 seconds). Record that time in the browser when the form mounts; the page is prerendered, so
    a server timestamp would be the build time.
  - Send with the `resend` package: `from: "Ultravi0let website <site@ultravi0let.com>"` (a sender on the verified
    domain), `to: process.env.CONTACT_TO || "hello@ultravi0let.com"` (`||`, so an empty value falls back),
    `replyTo:` the visitor's email, and a plain
    subject such as `New enquiry: {name}{company ? " — " + company : ""}`. Send text and simple HTML.
  - Return `{ ok: true }` or `{ ok: false, reason }`; never expose provider errors to the browser. Log server-side.
- Client: native validation first (`required`, `type="email"`), then the server call. The button shows a sending
  state. On success, show `content.contact.form.sent` in place of the button and reset the fields; on failure, show
  `content.contact.form.error`. The "Copy" email button stays as it is.
- Env vars (server only, **never** `VITE_`-prefixed): `RESEND_API_KEY`, `CONTACT_TO` (optional). Add `.env.example`.
- The owner verifies `ultravi0let.com` in Resend (adds its DNS records) before launch; until then, test with Resend's
  sandbox sender.

## 11. SEO

Everything in `SEO.md → In the code`. The short version: prerendered HTML with all copy, correct headings, title,
description and canonical, Open Graph and Twitter tags, icons, one JSON-LD graph, sitemap, robots, 404, and `noindex`
on preview deployments.

The 404 page is prerendered too (TanStack Start's not-found route rendered to `404.html`, which Vercel serves with a
404 status). Confirm the status code on the deployed site.

## 12. Deploy

- Vercel project from the Git repo; framework detected, Nitro plugin in `vite.config.ts`.
- Env vars as in §10 for Production and Preview.
- Domains: `www.ultravi0let.com` as primary with the bare domain redirecting to it, or the reverse. Whichever you
  pick, it must match the canonical in `lib/seo.ts`. Keep the origin in one `SITE_URL` constant; the files in
  `handoff/seo/` use `https://www.`, so update them if the bare domain wins.
- Headers (via Nitro `routeRules` or `vercel.json`): `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera, microphone and geolocation off), and
  `X-Robots-Tag: noindex` on preview deployments only.
- Optional: Vercel Web Analytics and Speed Insights. Both are cookieless, so no consent banner is needed, and Speed
  Insights reports real-user Core Web Vitals.

## 13. How to check the work (definition of done)

1. `typecheck`, `lint` and `build` pass. The build output contains a prerendered `index.html` with every string
   from `content.json` in it (write a test that greps them, with HTML entities decoded and tags stripped).
   Leave out what only exists after script runs or isn't literal text: the templates (`Fig. {n}`, `NNN / 100`, the
   `[light]` markers), progress-bar chapters after the first, "Copied", whichever switch label isn't showing, and the
   form's sent and error messages unless you render them hidden.
2. **Visual parity with the approved page.** Playwright renders both the reference file and the built site in the
   same Chromium and compares screenshots.
   - Use `reducedMotion: 'reduce'` (freezes sky time and completes the headline).
   - Launch with `--use-angle=swiftshader --enable-unsafe-swiftshader` so WebGL works headless (current Chrome wants
     the explicit opt-in), and assert WebGL is actually available before comparing.
   - Serve both pages the same font files. The reference loads Google Fonts while the build self-hosts, so intercept
     the reference's `fonts.googleapis.com` stylesheet request with `page.route()` and answer it with `@font-face`
     rules pointing at the same Fontsource `.woff2` files, under the family names the reference uses ('Geist',
     'Geist Mono', 'Hanken Grotesk').
   - Positions: the opening film at p = 0, .3, .55, .66, .85, 1; the work section; the process film at p = 0 (intro),
     .15 (Discovery), .40 (Architecture), .62 (Build), .90 (Launch & Care), where each phase is fully shown; the contact
     section.
   - Sizes and modes: 1440×900 light and dark, and 390×844 light.
   - The film's scroll offset is `(section.offsetHeight − stage.clientHeight) × p`; the process film's is
     `section.offsetTop + (section.offsetHeight − stage.clientHeight) × p`.
   - Expect exact matches except where this brief changes things on purpose (the faint headline under the typing, the
     `--faint` contrast fix, semantic element swaps if they move text by a pixel). Explain any remaining difference.
3. Interactions pass in Playwright: theme switch (both switches, persistence), phone menu open/close/Escape/link,
   work selection by hover, click and keyboard, the copy button, and the form (mock Resend in tests).
4. Lighthouse (mobile) meets the §7 budget on the production build, and axe reports zero violations.
5. Rich Results Test / schema validator show the structured data with no errors; `robots.txt` and `sitemap.xml` are
   correct on the deployed URL.
6. Checked by hand on a real iPhone and Android: the films scrub smoothly, and nothing overflows.

## 14. Order of work

1. **Scaffold and static page:** project, prerender, Nitro, fonts, tokens and styles, theme bootstrap, all sections
   as static markup from `content.json`. Check it against the screenshots at scroll position 0 for each section.
2. **Motion:** engine, sky renderer, opening film, typewriter, header states, work viewer, process film, phone menu,
   theme switch transition. Visual-parity tests go green.
3. **SEO:** head, JSON-LD, sitemap, robots, icons, manifest, 404, semantic swaps.
4. **Contact:** server function, Resend, validation, spam checks, UI states, `.env.example`.
5. **Quality:** responsive fixes (§8), contrast fix, accessibility, performance budget, cross-browser pass.
6. **Deploy:** Vercel, env vars, domain, preview `noindex`, then hand the owner the post-launch list in `SEO.md`.

## 15. Questions for the owner (ask when you reach them; defaults in brackets)

- www or bare domain as canonical? [www]
- Profile links for `sameAs` (LinkedIn, GitHub, Clutch…)? [none yet]
- Sender address for form emails? [site@ultravi0let.com]
- Add Vercel Analytics and Speed Insights? [yes]
- OK to apply the `--faint` contrast fix? [yes]

## Reference screenshots

`design/reference/screens/`: `01–16` desktop light (hero, film stages, work, services, studio, process stages,
testimonials, contact, footer), `17–22` desktop dark, `23–30` phone (390×844 @2x, including the open menu),
`31` tablet portrait, `32` tablet landscape, `33` phone landscape (shows the §8 problem), `34` 1920 wide.
