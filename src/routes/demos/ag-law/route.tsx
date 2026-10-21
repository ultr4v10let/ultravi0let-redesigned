import { createFileRoute } from '@tanstack/react-router'
import { pageHead } from '../../../lib/seo'
import { AgLawLayout } from '../../../demos/ag-law/Layout'

export const Route = createFileRoute('/demos/ag-law')({
  head: () => pageHead({ title: 'AG Law · Counsel of distinction', path: '/demos/ag-law', noindex: true }),
  component: AgLawLayout,
})
