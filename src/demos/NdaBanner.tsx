import { ShieldCheck } from 'lucide-react'
import './demos.css'

/* The note at the top of every demo page, as on the original site. Each demo passes colours that suit it. */
export function NdaBanner({ tint = 'rgba(0,0,0,0.04)', ink = 'currentColor', border = 'rgba(0,0,0,0.08)', message = 'Illustrative data. This is a demonstration interface, not a live client product.' }: { tint?: string; ink?: string; border?: string; message?: string }) {
  return (
    <div className="demo-nda" style={{ background: tint, color: ink, borderBottom: `1px solid ${border}` }} role="note">
      <div className="demo-nda-in">
        <ShieldCheck size={14} strokeWidth={1.7} aria-hidden />
        <span>{message}</span>
        <a href="/">← Back to Ultravi0let</a>
      </div>
    </div>
  )
}
