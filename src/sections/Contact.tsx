import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { contact } from '../content/content'
import { HaloMarks } from '../components/HaloMark'
import { Rich } from '../components/Rich'
import { sendContact } from '../server/contact'

type State = 'idle' | 'sending' | 'sent' | 'error'

export function Contact() {
  const [state, setState] = useState<State>('idle')
  const [copied, setCopied] = useState(false)
  const shownAt = useRef(0)
  const email = useRef<HTMLSpanElement>(null)
  const sent = useRef<HTMLDivElement>(null)
  const formEl = useRef<HTMLFormElement>(null)

  /* The page is prerendered, so the time the form appeared is recorded here, in the browser. */
  useEffect(() => { shownAt.current = Date.now() }, [])
  useEffect(() => { if (state === 'sent') sent.current?.focus() }, [state])

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    if (state === 'sending' || !form.reportValidity()) return
    const f = new FormData(form)
    const text = (k: string) => String(f.get(k) ?? '')
    setState('sending')
    try {
      const res = await sendContact({
        data: { name: text('name'), company: text('company'), email: text('email'), project: text('project'), extra: text('extra'), elapsed: Date.now() - shownAt.current },
      })
      if (res.ok) form.reset()
      setState(res.ok ? 'sent' : 'error')
    } catch {
      setState('error')
    }
  }

  /* back to an empty form, ready for the next one */
  const again = () => {
    setState('idle')
    requestAnimationFrame(() => formEl.current?.querySelector('input')?.focus())
  }

  const onCopy = () => {
    const done = () => { setCopied(true); setTimeout(() => setCopied(false), 1600) }
    const select = () => {
      if (!email.current) return
      const r = document.createRange()
      r.selectNodeContents(email.current)
      const s = getSelection()
      s?.removeAllRanges()
      s?.addRange(r)
    }
    try { navigator.clipboard.writeText(contact.email).then(done, select) } catch { select() }
  }

  return (
    <section className="block contact" id="contact">
      <div className="lead reveal">
        <span className="eyebrow">{contact.eyebrow}</span>
        <h2><Rich text={contact.heading} /></h2>
        <p>{contact.lead}</p>
        <div className="mailrow">
          <span className="email" id="email" ref={email}>{contact.email}</span>
          <button className="copy" id="copy-email" type="button" aria-live="polite" onClick={onCopy}>{copied ? contact.copy.done : contact.copy.idle}</button>
        </div>
      </div>
      <form className={`form reveal${state === 'sent' ? ' is-sent' : ''}`} id="contact-form" method="post" onSubmit={onSubmit} ref={formEl}>
        {contact.form.fields.map((fl) => (
          <div key={fl.id} className="field" inert={state === 'sent'}>
            <label htmlFor={`f-${fl.id}`}>{fl.label}</label>
            {fl.type === 'textarea'
              ? <textarea id={`f-${fl.id}`} name={fl.id} rows={3} maxLength={4000} />
              : <input id={`f-${fl.id}`} name={fl.id} type={fl.type} autoComplete={fl.autocomplete} required={fl.required} maxLength={fl.type === 'email' ? 254 : 120} />}
          </div>
        ))}
        {/* Honeypot: people never see or reach it; bots that fill every field do. */}
        <div className="hp" inert aria-hidden="true"><label htmlFor="f-extra">Leave this empty</label><input id="f-extra" name="extra" type="text" tabIndex={-1} autoComplete="off" /></div>
        <button type="submit" className="btn" aria-disabled={state === 'sending' || undefined} inert={state === 'sent'}>{contact.form.submit}</button>
        {state === 'error' && <p className="form-note" role="alert">{contact.form.error}</p>}
        {/* sent: the fields step aside and a halo lights up where they were (build.css) */}
        {state === 'sent' && (
          <div className="sent">
            <div className="sent-msg" role="status" tabIndex={-1} ref={sent}>
              <span className="sent-mark" aria-hidden="true"><HaloMarks /></span>
              <span className="eyebrow">{contact.form.sent.eyebrow}</span>
              <p className="sent-title">{contact.form.sent.title}</p>
              <p className="sent-body">{contact.form.sent.body}</p>
            </div>
            <button type="button" className="copy sent-again" onClick={again}>{contact.form.sent.again}</button>
          </div>
        )}
      </form>
    </section>
  )
}
