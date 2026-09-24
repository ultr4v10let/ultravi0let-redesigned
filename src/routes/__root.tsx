import type { ReactNode } from 'react'
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import geistLatin from '@fontsource-variable/geist/files/geist-latin-wght-normal.woff2?url'
import '../styles/fonts.css'
import '../styles/tokens.css'
import '../styles/site.css'
import '../styles/build.css'
import { ui } from '../content/content'
import { SEO } from '../lib/seo'
import { NotFound } from '../components/NotFound'

/* Before first paint: the stored theme if there is one, else the system's (BRIEF §6). data-theme is always set,
   because some CSS keys off it. `js` lets CSS tell a scripted page from a plain one. */
const THEME_BOOTSTRAP = `(function(){var d=document.documentElement,t;try{t=localStorage.getItem('theme')}catch(e){}if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';d.setAttribute('data-theme',t);d.classList.add('js')})()`

export const Route = createRootRoute({
  /* Only what every page shares. Title, description, canonical and Open Graph come from each route's pageHead():
     links aren't deduplicated across routes, and the 404 must not inherit them. */
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      { name: 'color-scheme', content: 'light dark' },
      { name: 'theme-color', content: SEO.themeColor.light, media: '(prefers-color-scheme: light)' },
      { name: 'theme-color', content: SEO.themeColor.dark, media: '(prefers-color-scheme: dark)' },
    ],
    links: [
      /* the headline is the LCP element */
      { rel: 'preload', href: geistLatin, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
      { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
    ],
  }),
  notFoundComponent: NotFound,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />
        <HeadContent />
      </head>
      <body>
        <a className="skip" href="#main">{ui.skipToContent}</a>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
