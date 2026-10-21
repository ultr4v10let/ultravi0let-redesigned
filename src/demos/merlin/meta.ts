import { pageHead } from '../../lib/seo'

/* The original set only the title; the description is the one its pages inherited from the old site's root layout. */
export const merlinHead = (path: string) =>
  pageHead({
    title: 'Merlin · Company site builder',
    description:
      'Demonstration of Merlin, a company-site builder for themes, colours, logos and content tabs. Sample interface, not a live client product.',
    path,
    noindex: true,
  })
