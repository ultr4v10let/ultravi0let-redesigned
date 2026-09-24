/* Site config, every route's <head> (pageHead) and the one JSON-LD graph (SEO.md). Future pages get it right by
   calling pageHead() from their route's head(). */
import { hero, services, site } from '../content/content'

/* The canonical origin, used in every absolute URL (including on preview deployments). */
export const SITE_URL = 'https://www.ultravi0let.com'

export const SEO = {
  title: 'Ultravi0let — Product design & engineering studio in Cairo',
  description: 'We build the quiet machinery behind loud products. A senior-only studio in Cairo for design, engineering, cloud and AI, from first prototype to production.',
  image: { path: '/og-image.png', width: 1200, height: 630, alt: 'ULTRAVI0LET — the quiet machinery behind loud products.' },
  themeColor: { light: '#F2EDFE', dark: '#110E2A' },
  alternateNames: ['ULTRAVI0LET', 'Ultraviolet', 'Ultraviolet Studio'],
  /* LinkedIn, GitHub, Clutch… as soon as they exist (SEO.md) */
  sameAs: [] as string[],
}

export const abs = (path: string) => SITE_URL + path

export function pageHead({ title = SEO.title, description = SEO.description, path = '/', noindex = false }: { title?: string; description?: string; path?: string; noindex?: boolean } = {}) {
  const url = abs(path)
  const image = abs(SEO.image.path)
  return {
    meta: [
      { title },
      { name: 'description', content: description },
      ...(noindex ? [{ name: 'robots', content: 'noindex' }] : []),
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: site.name },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { property: 'og:image:width', content: String(SEO.image.width) },
      { property: 'og:image:height', content: String(SEO.image.height) },
      { property: 'og:image:alt', content: SEO.image.alt },
      { property: 'og:locale', content: 'en_US' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ],
    links: noindex ? [] : [{ rel: 'canonical', href: url }],
  }
}

/* Organization + WebSite + WebPage, one @graph. No Review or FAQ markup (SEO.md). */
export function jsonLd(path = '/', { title = SEO.title, description = SEO.description } = {}) {
  const org = `${SITE_URL}/#organization`, web = `${SITE_URL}/#website`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': org,
        name: site.name,
        alternateName: SEO.alternateNames,
        url: abs('/'),
        logo: { '@type': 'ImageObject', url: abs('/icon-512.png'), width: 512, height: 512 },
        image: abs(SEO.image.path),
        description: hero.sub,
        slogan: hero.endcard.tagline,
        email: site.email,
        foundingDate: site.founded,
        address: { '@type': 'PostalAddress', addressLocality: site.base, addressCountry: 'EG' },
        areaServed: 'Worldwide',
        knowsAbout: services.items.map((s) => s.name),
        contactPoint: [{ '@type': 'ContactPoint', contactType: 'sales', email: site.email, availableLanguage: ['English'] }],
        sameAs: SEO.sameAs,
      },
      {
        '@type': 'WebSite',
        '@id': web,
        name: site.name,
        alternateName: SEO.alternateNames.slice(0, 2),
        url: abs('/'),
        inLanguage: 'en',
        publisher: { '@id': org },
      },
      {
        '@type': 'WebPage',
        '@id': `${abs(path)}#webpage`,
        url: abs(path),
        name: title,
        description,
        inLanguage: 'en',
        isPartOf: { '@id': web },
        about: { '@id': org },
        primaryImageOfPage: { '@type': 'ImageObject', url: abs(SEO.image.path), width: SEO.image.width, height: SEO.image.height },
      },
    ],
  }
}
