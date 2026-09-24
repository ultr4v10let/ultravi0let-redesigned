# Ultravi0let website: handoff kit

This folder is the starting point for building the approved Ultravi0let design as a real website with Claude Code.

## How to use it

1. Unzip this folder where you keep your projects, e.g. `~/Projects/ultravi0let-site`.
2. Open a terminal in that folder and start Claude Code (`claude`).
3. Paste the message in `PROMPT.md`. Claude Code reads the brief, proposes a plan, and builds the site phase by phase,
   checking each phase against the approved design.

You'll need:
- **Node.js 22 or newer.**
- **A Vercel account** (to deploy) and **a Resend account** (so the contact form can email hello@ultravi0let.com).
  Resend asks you to add a few DNS records to ultravi0let.com. Claude Code will tell you when.

## What's inside

```
START-HERE.md                this file
CLAUDE.md                    standing rules Claude Code follows in this project
PROMPT.md                    the first message to paste
handoff/
  docs/BRIEF.md              the build spec: stack, architecture, performance, responsive fixes, what "done" means
  docs/BEHAVIOUR.md          every animation and interaction, with exact numbers
  docs/SEO.md                the SEO plan: what the code does, and what you do after launch
  design/reference/          the approved page (open it in Chrome), its markup, and 38 screenshots
  design/styles/             the final styles, cleaned up (verified to render identically to the approved page)
  design/content/            every word on the page, as data
  design/sky/                the WebGL sky shader and all palettes and timings
  design/behaviour/          the prototype's script, for reference while porting
  design/brand/              halo mark (light and dark), favicons, app icons, social sharing image
  seo/                       page title and description, structured data, robots.txt, manifest, llms.txt
```

## After launch

Some SEO steps only you can do: Google Search Console, a Google Business Profile, directory listings and client credit
links. They're listed at the end of `handoff/docs/SEO.md`.
