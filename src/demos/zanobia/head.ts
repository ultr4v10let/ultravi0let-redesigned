import { pageHead } from '../../lib/seo'

/* The original's metadata: the demo layout's title, the old site's root description. */
export const zanobiaHead = (path: string) =>
  pageHead({
    title: 'Zanobia Patisserie · Operations console',
    description: "A senior-only product studio that builds and owns the parts of software other people can't see — and won't touch. Design, engineering, cloud, and AI.",
    path,
    noindex: true,
  })
