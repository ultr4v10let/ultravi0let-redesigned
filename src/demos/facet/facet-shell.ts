import { pageHead } from '../../lib/seo'

/** Facet demo app shell — intentionally distinct from Ultravi0let branding. */
export const FACET_SHELL = {
  paper: '#F7F4EF',
  paperElevated: '#FFFCF8',
  ink: '#1C2B3A',
  inkMuted: '#5C6B7A',
  border: 'rgba(28, 43, 58, 0.12)',
  accent: '#E07A5F',
  accentHover: '#C45E44',
  sage: '#81B29A',
  dark: '#152232',
  darkText: '#F7F4EF',
  darkAccent: '#F2CC8F',
} as const

/* The original set only the layout's title; the description was inherited from the old site's root layout. */
export const facetHead = (path: string) =>
  pageHead({
    title: 'Facet · Field-specific portfolio builder',
    description:
      'Demonstration of a portfolio builder with templates for three fields. Sample profiles on these pages are illustrative.',
    path,
    noindex: true,
  })
