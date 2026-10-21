import { ShieldCheck } from 'lucide-react'
import './demos.css'

/* The note at the top of every demo page, as on the original site. Each demo passes colours that suit it. */
export function NdaBanner({ tint = 'rgba(0,0,0,0.04)', ink = 'currentColor', border = 'rgba(0,0,0,0.08)' }: { tint?: string; ink?: string; border?: string }) {
  return (
    <div className="demo-nda" style={{ background: tint, color: ink, borderBottom: `1px solid ${border}` }} role="note">
      <div className="demo-nda-in">
        <ShieldCheck size={14} strokeWidth={1.7} aria-hidden />
        <span>Due to NDAs with our clients, we cannot show the live product. This is a demonstration of what we delivered.</span>
        <a href="/">← Back to Ultravi0let</a>
      </div>
    </div>
  )
}
