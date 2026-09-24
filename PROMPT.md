Paste everything below the line into Claude Code, started in this folder.

---

We're building the production website for Ultravi0let, a senior-only product studio in Dubai, from an approved
design. Everything you need is in `./handoff`, and `CLAUDE.md` has the standing rules.

Start by reading, in this order:
1. `CLAUDE.md`
2. `handoff/docs/BRIEF.md` (the spec: stack, architecture, performance budget, what "done" means)
3. `handoff/docs/BEHAVIOUR.md` (every animation and interaction, with the numbers)
4. `handoff/docs/SEO.md`

Then look at the approved design: open `handoff/design/reference/ultravi0let-final.html` in a browser and scroll
through it, and view the screenshots in `handoff/design/reference/screens/`.

What I want:
- **React with TanStack Start**, prerendered to static HTML at build time and deployed on **Vercel** (Nitro). The
  contact form sends email through **Resend** from a server function.
- **It must look and move exactly like the approved page**: the scroll-driven sky film at the top, the "day of halos"
  work viewer, the four-phases film, the halo menu on phones, and light/dark with the circle transition.
- **Maximum SEO**: complete HTML for crawlers, proper headings, meta, structured data, sitemap and robots, as the SEO
  doc describes.
- **Very fast and responsive** on any phone: meet the performance budget in BRIEF §7 and fix the two responsive
  problems in BRIEF §8.

How to work:
- The app lives in this folder. The scaffolder may refuse a non-empty folder or overwrite files, so scaffold into a
  temporary subfolder and move the result up, keeping `CLAUDE.md`, `START-HERE.md`, `PROMPT.md` and `handoff/` as
  they are (merge `CLAUDE.md` if the template brings its own). Initialise git and commit at the end of each phase.
- First reply with a short plan: confirm the approach, list the phases (BRIEF §14), and flag anything in the brief
  that the current TanStack Start or Vercel docs contradict. Then start.
- Build phase by phase. After each phase, run the checks for it (BRIEF §13) and give me a short summary with anything
  that differs from the reference. Carry on to the next phase unless something needs my decision.
- Ask me the questions in BRIEF §15 when you reach them; use the defaults if I haven't answered.
- Don't deploy, push or touch DNS without asking me first.
