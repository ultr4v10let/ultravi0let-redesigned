# Behaviour spec

Every moving part of the approved page, with the numbers pulled out of the prototype script
(`design/behaviour/page.reference.js`). When this file and the script disagree, the script wins: it is what was
approved. Palettes, sky lists and keyframes are in `design/sky/sky-data.json`.

Helpers used below, exactly as the prototype defines them:

```
clamp(v, a, b)
lerp(a, b, t)
sstep(a, b, x)   smoothstep: t = clamp((x - a) / (b - a), 0, 1); t * t * (3 - 2t)   (a may be greater than b)
ease(t)          easeInOutCubic: t < .5 ? 4t³ : 1 - (-2t + 2)³ / 2
mix3(a, b, t)    component-wise lerp of [r, g, b]
```

Scroll progress of a pinned film is `p = clamp(-section.top / (section.height - stage.clientHeight), 0, 1)`, read from
`getBoundingClientRect()` on every frame that needs it.

---

## 1. Theme

- Light is the default design; dark follows the system until the visitor chooses. The choice is `data-theme` on
  `<html>` (`light` | `dark`). The prototype does not remember the choice between visits; the build should (store it
  in `localStorage` and apply it with a tiny inline script in `<head>` before first paint, so there is no flash).
- Two switches share state: `#theme-switch` in the header (hidden at ≤880px) and `#theme-switch-m` in the phone menu.
  Both are `<button role="switch" aria-checked>` with `aria-label` "Switch to dark mode" / "Switch to light mode".
- Click: both switches flip `aria-checked` immediately (the knob slides over 0.7s with a spring, `cubic-bezier(.34,1.45,.5,1)`,
  and the `.draw` class replays the ring sweep, 0.9s). After **380ms** the page changes theme inside
  `document.startViewTransition`: the new theme is painted at once (skies redrawn synchronously for the new mode), then
  the new snapshot is revealed by a `clip-path: circle()` growing from the switch's centre to the farthest corner over
  **900ms**, `cubic-bezier(.2,.7,.2,1)`. While the transition runs, `html.vt` turns off all CSS transitions.
  A second click during the transition is ignored.
- Without View Transitions (or with reduced motion) the theme flips at once and the skies ease: every frame
  `night += (target - night) * min(1, dt / 180)` with `dt` in ms (capped at 64). `night` is 0 in light and 1 in dark.
  It drives the opening film and the four-phases film. The work viewer does not change with the theme: each of its
  skies carries its own `night` value.
- The prototype always sets `data-theme` on load (from the system if nothing else) and doesn't follow later system
  changes. The build keeps `data-theme` always set (BRIEF §6), so the CSS that keys off it works for everyone.
- Elements that exist in both a light and a dark version (the halo marks) use `.l-only` / `.d-only`; CSS shows the right
  one.

## 2. The sky renderer (WebGL)

- One small class drives three canvases: the opening film (`#sky`), the work viewer (`#vsky`) and the four-phases
  film (`#psky`). WebGL 1, one full-screen triangle, the fragment shader `design/sky/sky.frag`.
- Context options: `{ antialias: false, alpha: false, depth: false, stencil: false, premultipliedAlpha: false,
  preserveDrawingBuffer: false, powerPreference: 'high-performance' }`.
- Resolution: device pixel ratio capped at 2, then capped again by a pixel budget: 0.9 MP for the two films when the
  screen's short side is under 600px, 2.0 MP otherwise; 1.2 MP for the work viewer. Every length uniform is in buffer
  pixels, so CSS lengths are multiplied by the buffer scale (`buffer width / CSS width`), which is also passed as
  `uScale`.
- `webglcontextlost`: prevent default, stop drawing that canvas. In the prototype only the opening film's context
  decides the fallback: if it fails, `no-gl` goes on `<html>` and the CSS gradients take over (`.no-gl .stage`,
  `.no-gl .pstage` in `site.css`), while the work viewer gets its gradient inline from
  `sky-data.json → noWebGLFallback.workViewer`. With lazy, per-canvas contexts (BRIEF §7) give each canvas its own
  fallback: the same gradients, applied when that canvas's context can't be created.
- Uniforms (all floats unless noted):

| Uniform | Meaning |
|---|---|
| `uRes` (vec2) | buffer size |
| `uTime` | seconds; frozen at 4 with reduced motion |
| `uScale` | buffer px per CSS px |
| `uSun` (vec2), `uR`, `uSunR` | sun centre, ring radius, sun disc radius (buffer px, y down) |
| `uTop`, `uMid`, `uLow`, `uHaze`, `uGlare` (vec3) | sky palette |
| `uMidPos`, `uHazeAmt`, `uGlareAmt` | where the mid colour sits (0..1 of sky height), haze and glare strength |
| `uPaper` (vec3), `uPaperMix`, `uDisc` | the page colour and how far the sky fades into it outside a disc of `uDisc × R` |
| `uVeil` | cirrostratus veil strength |
| `uRing` | 0..1.04: how much of the 22° ring is drawn, clockwise from the top; past 1.0 the loop closes without a seam |
| `uRingAmt`, `uHead` | ring strength, bright "comet" head at the drawing front |
| `uDogL`, `uDogR` | sundog strengths |
| `uLine`, `uLineW` | parhelic line strength and half-length (buffer px) |
| `uArc`, `uGhost`, `uNight`, `uVig` | upper tangent arc, lens ghosts, night (stars, moon colours), vignette |
| `uSkyH` | the sky's height in buffer px. Every canvas must set it: the canvas height for the opening film and the work viewer, the horizon for the four-phases film. The shader divides by it. |
| `uGroundOn`, `uGround` (vec3) | the flat ground colour below the horizon, four-phases film only (`uGroundOn` 0 elsewhere) |

## 3. Opening film (`#top`)

- Section height 500vh (440vh at ≤880px). `.stage` is `position: sticky; top: 0; height: 100svh`.
- Per frame, with `W × H` the stage size and `portrait = H > 1.05 W`:
  - `skyT = sstep(.04, .30, p)`; palette = `mix(mix(dawn, clear, skyT), mix(nightDawn, nightClear, skyT), night)`.
  - Sun rises: `rise = ease(sstep(.03, .32, p))`; `x = W/2`;
    `y = lerp(H × (portrait ? .80 : .73), H × (portrait ? .47 : .50), rise)`; `R0 = min(W, H) × (portrait ? .30 : .29)`.
  - The halo becomes the zero: `m = ease(sstep(.72, .90, p))`. The sun moves to the centre of `#zero-slot` and the
    radius shrinks to the slot's: `x = lerp(x, zero.x, m)`, `y = lerp(y, zero.y, m)`, `R = R0 × (zero.r / R0)^m`, where
    `zero` is the slot's centre in stage coordinates and `zero.r = slot height × .48` (measured on load, resize and
    after fonts load).
  - `ringLin = clamp((p − .30) / .26, 0, 1)`; `ring = ringLin × 1.04`; `head = sstep(0, .02, ringLin) × (1 − sstep(.93, 1, ringLin))` (0 with reduced motion).
  - `sunR = max(R × (.035 + .01 × night), 2.2)`; `glareAmt × (1 − .35 m)`; `veil = sstep(.10, .32, p) × (1 − .6 m)`;
    `ringAmt = lerp(1, .78, night)`.
  - Sundogs `dogL = sstep(.50, .57, p)`, `dogR = sstep(.54, .61, p)`; line `sstep(.58, .70, p)`,
    `lineW = lerp(W × .56, 1.8 R, m)`; arc `sstep(.62, .72, p) × (1 − sstep(.72, .80, p))`;
    ghosts `sstep(.20, .40, p) × (1 − sstep(.68, .76, p)) × (1 − .5 night)`.
  - `paperMix = sstep(.73, .86, p)` (the sky fades into the page, except a round of sky around the sun),
    `disc = 1.45`, `vig = 1 − paperMix`, `paper = mix3(paper.light, paper.dark, night)`.
  - The canvas stops drawing once `p ≥ .965`; its opacity is `1 − sstep(.90, .95, p)`.
- The words around the sky:
  - Hero block: opacity `1 − sstep(.02, .15, p)`, `translateY(−80 × that)`; `visibility: hidden` once fully gone.
  - Ring labels ("01 Design" … "04 AI") sit just outside the ring at angles `at × 360°` clockwise from the top
    (`at` = .125, .375, .625, .875), gap `16 + .07 R`, right-aligned on the left side, clamped 12px inside the stage
    horizontally, and drawn at `(x, y − 8)`; opacity `sstep(at + .005, at + .06, ringLin) × (1 − sstep(.70, .76, p))`.
  - Wordmark halves "ULTRAVI" and "LET": opacity `wm = sstep(.76, .90, p)`, sliding in from `∓(1 − ease(wm)) × W × .22`.
  - The zero (the SVG halo mark in the slot, light and dark versions): opacity `sstep(.87, .92, p)`
    (`sstep(.74, .86, p)` without WebGL). Its box is `zero.r × 46 / 11` square.
  - Tagline and stats strip: opacity `sstep(.88, .97, p)`, `translateY((1 − that) × 18px)`.
- Progress bar (`.film-ui`): the checkpoint label is the last chapter whose start ≤ p, rendered as a mono number
  ("01") and the label for the current mode; ticks at each chapter start except the first; the fill is `scaleX(p)`;
  the counter shows "Scroll" while `p < .005`, else `NNN / 100` (zero-padded `round(100 p)`).
- The sky counts as dark behind the text when the theme is dark or `skyT × (1 − sstep(.74, .84, p)) > .5`. The header
  uses this flag (§7). The prototype also toggles a `sky-dark` class on `.stage`, but no CSS uses it.
- While `p < .965` and the veil or night is showing, redraw at most every 50ms so the veil drifts and stars twinkle;
  otherwise draw only on scroll, resize or theme change. Draw only while the section intersects the viewport.

## 4. Typewriter

- The headline is "We build the quiet machinery behind loud products" with "quiet" in the light weight. The prototype
  keeps an invisible full copy in place (so layout never shifts) and types into three overlaid spans:
  "We build the ", "quiet", " machinery behind loud products".
- Starts 450ms after load; one character every 32ms, 60ms after a space; the violet caret blinks (`steps(1)`, 0.8s)
  and hides 1.2s after the last character. With reduced motion the full text shows at once and there is no caret.
- **Build change (for LCP):** in the prototype the headline only exists visually once typed, which makes it the
  page's Largest Contentful Paint about 2 seconds late. In the build, render the full headline as the real `<h1>` text
  and show it faintly (opacity ≈ .14) from the first paint, then type over it. Same look while typing, same end
  state, and the LCP happens at first paint. See BRIEF §7.

## 5. Work: a day of halos (`#work`)

- Six rows (projects) and one viewer. Each project has its own sky (`workSkies`, in project order: Dawn, Morning,
  Noon, Dusk, Twilight, Night). Row 1 is selected on load.
- Select on `mouseenter`, `focus` and click. On phones (≤880px) scrolling selects: a row is chosen as it crosses a band
  at 62–70% of the viewport height (`IntersectionObserver` rootMargin `-62% 0px -30% 0px`).
- On select:
  - Rows: `.on` on the chosen one (its name slides right 14px, 8px on phones; its number turns `--rownum`). The
    prototype sets `aria-pressed`; the build uses tabs with `aria-selected` instead (BRIEF §4).
  - Text panel: fades out (`.v-read.fade`, 0.25s), swaps text at 200ms, fades in. Captions: status, tags, "Fig. 0n",
    the sky's name, year. The Dawn sky is light, so its captions switch to dark ink (`.light-sky`).
  - Sky: animates from wherever it is to the new sky over 0.9s (`mk = ease(clamp(k / .9))`, `k` = seconds since
    select): every palette value and every number (sx, sy, R, veil, dogs, line, arc, night, ghost) interpolates.
    The ring redraws from the top: `ring = clamp((k − .12) / .8)` (×1.04); comet head
    `sstep(0, .03, ring) × (1 − sstep(.93, 1, ring))`; each feature is scaled by the sky's own strength:
    left sundog `sky.dogs × sstep(.75, 1.1, k)`, right `sky.dogs × sstep(.85, 1.2, k)`, line
    `sky.line × sstep(.9, 1.25, k)` (`lineW = W × .56`), arc `sky.arc × sstep(1.0, 1.35, k)`.
  - With reduced motion the ring, sundogs, line and arc appear complete at once and there is no comet head, but the
    palette, sun position, radius and veil still ease over the 0.9s (the prototype has no reduced-motion branch for
    them). Keep that, or make the whole swap instant; either is acceptable.
  - `paperMix` 0, `disc` 1.45, `vig` 1, `ringAmt = lerp(1, .78, sky.night)`, `sunR = max(R × (.035 + .01 night), 2)`,
    where `R = sky.R × H` and the sun sits at `(sky.sx × W, sky.sy × H)`.
- Redraw while the transition runs and at most every 50ms while the viewer is on screen (veil drift, stars).
- The viewer is sticky (`top: 112px`; on phones it moves above the list, sticky at the header's bottom).

## 6. How we work: one day, four phases (`#process`)

- Section 470vh (430vh at ≤880px), sticky stage 100svh. The sky fills the stage above a horizon; below it is the
  page itself ("the ground"), where the phase texts sit.
- Geometry (on load and resize): `slim = W < 880`, header height 64 (slim) or 88;
  ground height `slim ? clamp(.37 H, 292, 340) : clamp(.31 H, 236, 300)`; horizon `hz = H − ground`;
  `R = clamp(min(W, hz) × (slim ? .20 : .19), 54, 150)`; apex `max(headerH + R + 46, .34 hz)`.
  The sun's path is a cubic Bézier from `(.04 W, y0)` through controls `(.22 W, yc)`, `(.78 W, yc)` to `(.96 W, y0)`,
  with `y0 = hz + .62 R` and `yc = (8 apex − 2 y0) / 6` so the middle of the curve touches the apex. Everything drawn
  over the sky is clipped at the horizon.
- The horizon is `hz = round(H − ground)`; it is also written to `#pstage` as the CSS variable `--hz`, which positions
  `.p-ground` and the no-WebGL gradient.
- Four waypoints sit on the path at arc-length fractions .2, .4, .6, .8; on phones each waypoint mark is drawn at 0.8
  scale. Step labels ("01 Discovery" …) sit under the horizon at each waypoint's x, clamped 16px from the edges, with a
  tick up to it.
- Scroll to sun: `u = seg(scroll = [0, .15, .37, .59, .81, 1] → sun = [0, .2, .4, .6, .8, 1], p)`, eased inside each
  segment. The sun is the path's point at `u × length`. So the sun eases into each phase and lingers there.
- Sky palette: the six light (or dark) palettes spread evenly over `u` (index `min(4, floor(5u))`, mix by the
  fraction), then light and dark mixed by `night`. Ring `ringLin = clamp((p − .03) / .34)`, `ring = ringLin × 1.04`,
  comet head `sstep(0, .02, ringLin) × (1 − sstep(.93, 1, ringLin))` (0 with reduced motion),
  `ringAmt = lerp(1, .78, night)`; veil
  `.4 + .55 sstep(.02, .15, p)`; sundogs `sstep(.52, .58, p)` / `sstep(.55, .61, p)`; line `sstep(.30, .40, p)`,
  `lineW = .5 W`; arc `sstep(.56, .64, p)`; ghosts `.5 (1 − .5 night)`; `sunR = max(R (.045 + .012 night), 2.4)`;
  ground on, `uSkyH = hz`, ground and paper = `mix3(paper.light, paper.dark, night)`; `paperMix` 0, `disc` 1.45,
  `vig` 1.
- Marks over the sky (dotted path, waypoints, clock, section label) change colour with the sky: from the palette's top
  colour, `lum = .2126 r + .7152 g + .0722 b`, `k = sstep(.58, .72, lum)`, colour `= mix3(white, #121016, k)` (CSS
  `--sk`), shadow `k > .5 ? rgba(255,255,255,.55) : rgba(20,14,60,.45)` (`--sks`).
- The path behind the sun: a gradient stroke (dawn → noon → dusk tokens) with `stroke-dasharray: L, L + 20`
  (`L` = path length), revealed by `stroke-dashoffset = L × (1 − u)`.
  Waypoint `i` lights (ring draws, line and sundogs appear) once `p ≥ scroll[i + 1] − .012`.
- The clock beside the sun: minutes = linear `seg` over the sun keyframes of `clockMinutes[mode]`, wrapped at 24h,
  "HH:MM". It sits to the right of the sun when the sun is in the left 60% of the width, else to the left, offset
  `1.18 R + 16`, 24px above, with x clamped to `[12, W − 12 − its width]`; opacity
  `sstep(hz + 4, hz − 30, sunY) × sstep(.02, .06, p)`.
- Texts: the section intro fades out as the film starts (`io = sstep(.012, .065, p)`; opacity `1 − io`,
  `translateY(−40 io)`); the small section label fades in (`sstep(.06, .10, p)`); the marks go from .15 to 1 opacity
  over `sstep(.01, .06, p)`. One phase text at a time: phase `i` comes in over
  `i = 0 ? sstep(.03, .085, p) : sstep(scroll[i+1] − .075, scroll[i+1] − .035, p)` and leaves over
  `1 − sstep(scroll[i+2] − .115, scroll[i+2] − .08, p)` (the last never leaves); `translateY((1 − in) × 24 − (1 − out) × 24)`.
  The active step label is the last `i` with `p ≥ (i = 0 ? .055 : scroll[i+1] − .078)`; earlier ones get `.done`.
  The rail fill is `scaleX(clamp(sunX / W) × sstep(0, .04, p))`.
- Time-of-day eyebrow per phase: Dawn / Morning / Afternoon / Dusk by day, Moonrise / Night / Small hours / Moonset by night.
- Redraw at most every 50ms while on screen; immediately on scroll.

## 7. Header

- Fixed, 88px tall (64px at ≤880px). Two states, updated whenever either film draws:
  - `solid` (blurred paper background, hairline) when neither film is under the header.
  - `on-sky` (text switches to `--sky-ink`) in light mode when it is over the opening film while the sky is dark
    (§3), or over the pinned four-phases stage while its sky is dark (marks colour `k < .5`).
- Desktop: brand, numbered nav, "Start a project" link, theme switch. ≤880px: brand and the menu button only.

## 8. Phone menu: a halo opens a sky

- Menu button: the spectrum icon (three lines and a hidden ring). Hover/focus tilts the top and bottom lines and tints
  them `--uv1` / `--uv2`.
- Open: the icon folds into its ring (`.to-ring`, 230ms). Then the menu (`#mnav`, full screen, `--mn-sky` background)
  is revealed by `clip-path: circle(r at the button's centre)` with `r` going from 0 to the distance to the farthest
  corner + 48px over **780ms**, ease-out cubic, driven by `requestAnimationFrame`. A matching halo edge rides the
  circle (`#mn-edge`: four concentric circles, radii `r + 6`, `r`, `r`, `r − 3.5`, colours from the `--mn-*` tokens),
  opacity `sin(π · min(1, 1.08 t))^.6`. The menu's own sky has a sun and a ring painted in CSS around the same centre.
- As it opens (`.in`): the items rise with a chromatic split that settles (`--cs1` / `--cs2`, staggered 60ms,
  starting at 360ms); hairlines draw; numbers fade in; the item for the section currently in view gets `.here` and a
  small halo mark draws beside it ("in view" = the last of work, services, studio, process, contact whose top is at or
  above 40% of the viewport height; process counts as Studio); the footer (email, location, "Appearance" + the second switch) rises at 700ms.
  Focus moves to the close button when the reveal ends.
- Close (button, Escape, or following a link): items lift out (`.out`), then after 260ms the circle shrinks to 0 over
  **560ms** (ease-in cubic). Focus returns to the menu button. Following a link closes first, then scrolls to the
  section (smooth unless reduced motion).
- While open: page scroll locked, Tab cycles inside the menu (the build uses `inert` on the rest of the page instead,
  BRIEF §9). The page's own drawing pauses only once the reveal has finished; the reveal runs on its own
  `requestAnimationFrame`, so don't pause it with the page. Resizing past 880px closes it. Reduced motion: open and
  close instantly.

## 9. Small things

- Marquee: two copies of the discipline list scroll left forever (36s linear); hover pauses it. It is decorative, and
  the same disciplines are listed in Services, so in the build the whole marquee is `aria-hidden="true"` (the prototype's
  `aria-label` on a plain `div` isn't valid ARIA). The words stay in the HTML.
- Section reveals: `animation-timeline: view()` where supported (rise 28px from .35 opacity); elsewhere content is
  simply visible.
- Buttons: a light sheen sweeps across on hover (0.9s).
- Copy email: writes the address to the clipboard, the button reads "Copied" for 1.6s; if the clipboard is refused, the
  address gets selected instead.
- Reduced motion (`prefers-reduced-motion: reduce`): CSS animations and transitions off, sky time frozen, no comet
  head, typewriter and menu instant, work-viewer features complete at once (§5). The films still follow the scroll,
  because the visitor drives them.
- Pausing: the loop skips all drawing while the tab is hidden or the phone menu is open.
