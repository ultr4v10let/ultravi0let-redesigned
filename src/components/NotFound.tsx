import { site } from '../content/content'
import { HaloMarks } from './HaloMark'

/* Unknown URLs are answered by the server function with this page and HTTP 404 (Vercel never serves a static
   404.html in front of the Nitro catch-all). React hoists the <title> and <meta> into <head>. */
export function NotFound() {
  return (
    <main id="main" className="wrap" style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 34 }}>
      <title>{`Page not found · ${site.name}`}</title>
      <meta name="robots" content="noindex" />
      <a href="/" className="brand" aria-label={`${site.name} — home`}><HaloMarks /><span className="wordmark">{site.wordmark}</span></a>
      <span className="eyebrow">404</span>
      <h1>Page not found</h1>
      <a href="/" className="textlink"><span>Back to the studio</span></a>
    </main>
  )
}
