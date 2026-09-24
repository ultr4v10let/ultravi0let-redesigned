import type { CSSProperties, Ref } from 'react'
import { menu, site, ui } from '../content/content'
import { MenuMark, SpectrumIcon } from './Icons'
import { ThemeSwitch } from './ThemeSwitch'

/* The phone menu: a halo opens a sky (BEHAVIOUR §8). motion/menu.ts runs the reveal. */
export function MobileMenu({ ref }: { ref?: Ref<HTMLElement> }) {
  return (
    <>
      <nav ref={ref} className="mnav" id="mnav" aria-label={ui.menuNav}>
        <div className="mn-bg" aria-hidden="true" />
        <div className="mnav-head">
          <span className="wordmark">{site.wordmark}</span>
          <button className="menu-btn x" id="menu-close" type="button" aria-label={ui.closeMenu}><SpectrumIcon /></button>
        </div>
        <ol className="mn-list">
          {menu.items.map((it, i) => (
            <li key={it.label} style={{ '--i': i } as CSSProperties}>
              <a href={it.href}>
                <span className="num">{it.n}</span>
                <span className="mn-line"><span className="mn-word">{it.label}</span></span>
                <MenuMark />
              </a>
            </li>
          ))}
        </ol>
        <div className="mnav-foot">
          <div className="mn-meta"><span className="mn-mail">{menu.email}</span><span className="mn-loc">{menu.location}</span></div>
          <div className="mn-app"><span className="eyebrow">{menu.appearance}</span><ThemeSwitch id="theme-switch-m" /></div>
        </div>
      </nav>
      <svg className="mn-edge" id="mn-edge" aria-hidden="true" focusable="false">
        <circle className="e1" r="0" /><circle className="e2" r="0" /><circle className="e3" r="0" /><circle className="e4" r="0" />
      </svg>
    </>
  )
}
