import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'

/* BRIEF §12. Vercel already sends X-Robots-Tag: noindex on *.vercel.app previews; this also covers a preview branch
   on a custom domain. VERCEL_ENV is set at build time, and promoting a preview to production rebuilds. */
const isPreview = process.env.VERCEL_ENV === 'preview'

const securityHeaders = {
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  ...(isPreview ? { 'X-Robots-Tag': 'noindex' } : {}),
}

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    tanstackStart({
      /* every page is rendered to static HTML at build time; "#section" links are not crawled */
      prerender: { enabled: true, crawlLinks: true, failOnError: true },
      /* the whole stylesheet (~8.5 KB gzipped) goes into the HTML: no render-blocking round trip before first paint */
      server: { build: { inlineCss: true } },
    }),
    nitro({
      /* react-router's "use client" directives mean nothing in the server bundle and flood the log */
      rolldownConfig: {
        onwarn(warning, warn) {
          if (warning.code !== 'MODULE_LEVEL_DIRECTIVE') warn(warning)
        },
      },
      routeRules: {
        '/**': { headers: securityHeaders },
        /* Nitro emits header rules as Vercel routes without `continue`, most specific first, so the hashed assets
           need the security headers repeated next to their long cache. */
        '/assets/**': { headers: { ...securityHeaders, 'cache-control': 'public, max-age=31536000, immutable' } },
      },
    }),
    viteReact(),
  ],
})
