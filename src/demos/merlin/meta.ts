import { pageHead } from '../../lib/seo'

/* The original set only the title; the description is the one its pages inherited from the old site's root layout. */
export const merlinHead = (path: string) =>
  pageHead({
    title: 'Merlin · Ship your company site in hours',
    description: "A senior-only product studio that builds and owns the parts of software other people can't see — and won't touch. Design, engineering, cloud, and AI.",
    path,
    noindex: true,
  })
