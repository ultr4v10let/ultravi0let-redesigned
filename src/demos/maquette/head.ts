import { pageHead } from '../../lib/seo'

/* The original's metadata: the layout's title and the old site's root description, on every page. */
export const maquetteHead = (path: string) => () =>
  pageHead({
    title: 'Maquette · Print production platform',
    description:
      'Demonstration of a print-production platform for drawings, apparel and merchandise. Figures on these pages are illustrative.',
    path,
    noindex: true,
  })
