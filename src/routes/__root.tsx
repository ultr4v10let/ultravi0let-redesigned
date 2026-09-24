import type { ReactNode } from 'react'
import { HeadContent, ScriptOnce, Scripts, createRootRoute } from '@tanstack/react-router'
import geistLatin from '@fontsource-variable/geist/files/geist-latin-wght-normal.woff2?url'
import '../styles/fonts.css'
import '../styles/tokens.css'
import '../styles/site.css'
import '../styles/build.css'
import { ui } from '../content/content'
import { SEO } from '../lib/seo'
import { NotFound } from '../components/NotFound'

/* Before first paint: the stored theme if there is one, else the system's (BRIEF §6). data-theme is always set,
   because some CSS keys off it; a stored choice also gets its own theme-color meta, first in the head (the two
   media-query metas React renders are never touched, so hydration matches them);
   while nothing is stored, the page keeps following the system. `js` lets CSS tell a scripted page from a plain one. */
const THEME_BOOTSTRAP = `(function(){var d=document.documentElement,m=matchMedia('(prefers-color-scheme: dark)'),s=function(){try{var t=localStorage.getItem('theme');return t==='light'||t==='dark'?t:null}catch(e){return null}},t=s()||(m.matches?'dark':'light');d.setAttribute('data-theme',t);d.classList.add('js');if(s()){var e=document.createElement('meta');e.name='theme-color';e.id='theme-choice';e.content=t==='dark'?'${SEO.themeColor.dark}':'${SEO.themeColor.light}';document.head.prepend(e)}m.addEventListener('change',function(e){if(!s())d.setAttribute('data-theme',e.matches?'dark':'light')})})()`

export const Route = createRootRoute({
  /* Only what every page shares. Title, description, canonical and Open Graph come from each route's pageHead():
     links aren't deduplicated across routes, and the 404 must not inherit them. */
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      { name: 'color-scheme', content: 'light dark' },
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
        {/* server HTML only (it removes itself after running), so nothing injected into the head, like antivirus
            scripts, gets matched against it during hydration */}
        <ScriptOnce>{THEME_BOOTSTRAP}</ScriptOnce>
        {/* here, not in head(): TanStack dedupes meta by name, which would drop one of the two */}
        <meta name="theme-color" content={SEO.themeColor.light} media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content={SEO.themeColor.dark} media="(prefers-color-scheme: dark)" />
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
