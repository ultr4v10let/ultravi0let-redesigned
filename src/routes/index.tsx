import { useEffect, useRef } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { jsonLd, pageHead } from '../lib/seo'
import { SiteHeader } from '../components/SiteHeader'
import { MobileMenu } from '../components/MobileMenu'
import { ThemeSync } from '../components/ThemeSwitch'
import { HeroFilm } from '../sections/HeroFilm'
import { Marquee } from '../sections/Marquee'
import { Work } from '../sections/Work'
import { Services } from '../sections/Services'
import { Studio } from '../sections/Studio'
import { ProcessFilm } from '../sections/ProcessFilm'
import { Testimonials } from '../sections/Testimonials'
import { Contact } from '../sections/Contact'
import { SiteFooter } from '../sections/SiteFooter'
import { startMotion } from '../motion/engine'

export const Route = createFileRoute('/')({
  head: () => ({
    ...pageHead({ path: '/' }),
    /* TanStack doesn't escape script children, so "<" is escaped here */
    scripts: [{ type: 'application/ld+json', children: JSON.stringify(jsonLd('/')).replace(/</g, '\\u003c') }],
  }),
  component: Home,
})

function Home() {
  const header = useRef<HTMLElement>(null)
  const menu = useRef<HTMLElement>(null)
  const film = useRef<HTMLElement>(null)
  const work = useRef<HTMLElement>(null)
  const process = useRef<HTMLElement>(null)

  /* React renders the markup once; from here the motion modules animate it through these elements (BRIEF §3). */
  useEffect(() => startMotion({ header: header.current!, menu: menu.current!, film: film.current!, work: work.current!, process: process.current! }), [])

  return (
    <>
      <SiteHeader ref={header} />
      <MobileMenu ref={menu} />
      <ThemeSync />
      <main id="main">
        <HeroFilm ref={film} />
        <Marquee />
        <div className="wrap">
          <Work ref={work} />
          <Services />
          <Studio />
        </div>
        <ProcessFilm ref={process} />
        <div className="wrap">
          <Testimonials />
          <Contact />
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
