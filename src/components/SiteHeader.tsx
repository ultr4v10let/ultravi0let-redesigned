import type { Ref } from 'react'
import { nav, site, ui } from '../content/content'
import { HaloMarks } from './HaloMark'
import { SpectrumIcon } from './Icons'
import { ThemeSwitch } from './ThemeSwitch'

/* Fixed header. motion/header.ts toggles .solid and .on-sky; motion/menu.ts drives the menu button. */
export function SiteHeader({ ref }: { ref?: Ref<HTMLElement> }) {
  return (
    <header ref={ref} className="site-head" id="site-head">
      <div className="wrap head-row">
        <a href="#top" className="brand" aria-label={ui.home}>
          <HaloMarks />
          <span className="wordmark">{site.wordmark}</span>
        </a>
        <nav className="nav" aria-label={ui.primaryNav}>
          {nav.items.map((it) => (
            <a key={it.n} href={it.href}><span className="n">{it.n}</span>{it.label}</a>
          ))}
          <a href={nav.cta.href} className="cta">{nav.cta.label}</a>
        </nav>
        <div className="head-tools">
          <ThemeSwitch id="theme-switch" />
          <MenuButton />
        </div>
      </div>
    </header>
  )
}

export function MenuButton() {
  return (
    <button className="menu-btn" id="menu-open" type="button" aria-controls="mnav" aria-expanded="false" aria-label={ui.openMenu}>
      <SpectrumIcon />
    </button>
  )
}
