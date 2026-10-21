import { pageHead } from '../../lib/seo'

/* The original's metadata: the layout's title and the old site's root description, on every page. */
export const maquetteHead = (path: string) => () =>
  pageHead({
    title: 'Maquette · Print production platform',
    description: "A senior-only product studio that builds and owns the parts of software other people can't see — and won't touch. Design, engineering, cloud, and AI.",
    path,
    noindex: true,
  })
