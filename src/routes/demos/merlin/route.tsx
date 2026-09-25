import { createFileRoute } from '@tanstack/react-router'
import { merlinHead } from '../../../demos/merlin/meta'
import { MerlinLayout } from '../../../demos/merlin/Layout'

export const Route = createFileRoute('/demos/merlin')({
  head: () => merlinHead('/demos/merlin'),
  component: MerlinLayout,
})
