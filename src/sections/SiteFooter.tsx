import { footer } from '../content/content'
import { HaloMarks } from '../components/HaloMark'

export function SiteFooter() {
  return (
    <footer className="site-foot">
      <div className="foot-horizon" aria-hidden="true"><HaloMarks /></div>
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand"><span className="wordmark">{footer.wordmark}</span><p>{footer.about}</p></div>
          <div className="foot-cols">
            {footer.columns.map((col) => (
              <div key={col.title} className="foot-col">
                <span className="k">{col.title}</span>
                {col.links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
              </div>
            ))}
          </div>
        </div>
        <div className="foot-bottom"><span className="copyr">{footer.copyright}</span><span className="status"><i />{footer.status}</span></div>
      </div>
    </footer>
  )
}
