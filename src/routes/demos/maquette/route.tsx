import { createFileRoute } from '@tanstack/react-router'
import { maquetteHead } from '../../../demos/maquette/head'
import { MaquetteLayout } from '../../../demos/maquette/Layout'

export const Route = createFileRoute('/demos/maquette')({
  head: maquetteHead('/demos/maquette'),
  component: MaquetteLayout,
})
