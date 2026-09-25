/* The facet demo's layout. It lives outside the route file so the router's code splitting takes its fonts and
   stylesheet with it: CSS imported by a route file itself would load on every page of the site. */
import { Outlet } from '@tanstack/react-router'
import '@fontsource-variable/outfit/wght.css'
import '@fontsource-variable/libre-baskerville/wght.css'
import '@fontsource-variable/libre-baskerville/wght-italic.css'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'
import { NdaBanner } from '../NdaBanner'
import { FacetHeader } from './FacetHeader'
import { FACET_SHELL } from './facet-shell'
import './facet.css'

export function FacetLayout() {
  return (
    <div
      className="demo facet-root"
      style={{
        background: FACET_SHELL.paper,
        color: FACET_SHELL.ink,
        fontFamily: 'var(--facet-sans)',
        minHeight: '100svh',
      }}
    >
      <NdaBanner tint="rgba(28,43,58,0.05)" ink={FACET_SHELL.ink} border={FACET_SHELL.border} />
      <FacetHeader />
      <div id="main">
        <Outlet />
      </div>
    </div>
  )
}
