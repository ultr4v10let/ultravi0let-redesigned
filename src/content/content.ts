/* Every word on the page (content.json) and every number the skies need (sky-data.json).
   Named imports so each part is only bundled where it is used. */
export {
  site,
  nav,
  menu,
  hero,
  marquee,
  work,
  services,
  studio,
  process,
  testimonials,
  contact,
  footer,
  ui,
} from './content.json'

export {
  paper,
  heroFilm,
  workSkies,
  processFilm,
  noWebGLFallback,
} from './sky-data.json'
