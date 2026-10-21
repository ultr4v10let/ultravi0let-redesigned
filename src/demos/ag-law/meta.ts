import { pageHead } from '../../lib/seo'

/* The demo used to inherit the studio description. This one is about the AG Law site itself. */
export const agLawDescription =
  'Demonstration of the AG Law website delivered by Ultravi0let in 2024: a mobile-responsive practice site with a content back-end for services, team, news, clients and gallery.'

export const agLawHead = (path: string, title: string) =>
  pageHead({ title, description: agLawDescription, path, noindex: true })
