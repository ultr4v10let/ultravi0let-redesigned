import { createFileRoute } from '@tanstack/react-router'
import { AgLawLayout } from '../../../demos/ag-law/Layout'
import { agLawHead } from '../../../demos/ag-law/meta'

export const Route = createFileRoute('/demos/ag-law')({
  head: () => agLawHead('/demos/ag-law', 'AG Law · Practice website'),
  component: AgLawLayout,
})
