import { pageHead } from '../../lib/seo'

/* The original's metadata: the demo layout's title, the old site's root description. */
export const zanobiaHead = (path: string) =>
  pageHead({
    title: 'Zanobia Patisserie · Operations console',
    description:
      'Demonstration of a patisserie operations console. Figures and shop names on these pages are illustrative.',
    path,
    noindex: true,
  })
