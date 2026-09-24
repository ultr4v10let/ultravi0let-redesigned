/* The header sits on whichever sky is under it (BEHAVIOUR §7). */
import { S } from './env'

export function header(head: HTMLElement, film: HTMLElement, proc: HTMLElement) {
  let hh = 88, heroBottom = 0, procTop = 0, procBottom = 0, last = ''
  return {
    measure() { hh = head.offsetHeight || 88 },
    read() {
      heroBottom = film.getBoundingClientRect().bottom
      const r = proc.getBoundingClientRect()
      procTop = r.top
      procBottom = r.bottom
    },
    write() {
      const overHero = heroBottom > hh, overProc = procTop < hh && procBottom > hh
      const solid = !(overHero || overProc)
      const onSky = S.theme !== 'dark' && ((overHero && S.heroDark) || (overProc && procTop <= 0 && S.procDark))
      const key = `${solid}${onSky}`
      if (key === last) return
      last = key
      head.classList.toggle('solid', solid)
      head.classList.toggle('on-sky', onSky)
    },
  }
}
