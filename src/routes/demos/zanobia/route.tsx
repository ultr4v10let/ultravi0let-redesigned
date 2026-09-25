import { createFileRoute } from '@tanstack/react-router'
import cormorantLatin from '@fontsource-variable/cormorant-garamond/files/cormorant-garamond-latin-wght-normal.woff2?url'
import sourceSansLatin from '@fontsource-variable/source-sans-3/files/source-sans-3-latin-wght-normal.woff2?url'
import { zanobiaHead } from '../../../demos/zanobia/head'
import monoLatin from '../../../demos/zanobia/jetbrains-mono-latin.woff2?url'
import { ZanobiaLayout } from '../../../demos/zanobia/Layout'

/* next/font preloaded the original's fonts; every page here uses all three, above the fold */
const preload = (href: string) => ({ rel: 'preload', href, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' as const })

export const Route = createFileRoute('/demos/zanobia')({
  head: () => {
    const h = zanobiaHead('/demos/zanobia')
    return { ...h, links: [...h.links, preload(cormorantLatin), preload(sourceSansLatin), preload(monoLatin)] }
  },
  component: ZanobiaLayout,
})
