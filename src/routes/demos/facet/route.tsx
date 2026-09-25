import { createFileRoute } from '@tanstack/react-router'
import { facetHead } from '../../../demos/facet/facet-shell'
import { FacetLayout } from '../../../demos/facet/Layout'

export const Route = createFileRoute('/demos/facet')({
  head: () => facetHead('/demos/facet'),
  component: FacetLayout,
})
