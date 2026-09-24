/* The contact form's server function (BRIEF §10). The compiler replaces the handler with an RPC call in the browser
   and drops the validator, so zod and resend never reach the client bundle. Env vars are read per request. */
import { createServerFn } from '@tanstack/react-start'
import { Resend } from 'resend'
import { z } from 'zod'

/* one line, no control characters: the name and company go into the subject */
const line = (max: number) => z.string().transform((s) => s.replace(/\s+/g, ' ').trim()).pipe(z.string().max(max))

const Input = z.object({
  name: line(120).pipe(z.string().min(1)),
  company: line(120),
  email: z.string().trim().pipe(z.email().max(254)),
  project: z.string().trim().max(4000),
  /* honeypot: people never see it, so it must be empty */
  extra: z.string().max(500),
  /* ms between the form appearing (recorded in the browser: the page is prerendered) and sending */
  elapsed: z.number().finite(),
})

export type ContactResult = { ok: true } | { ok: false; reason: 'spam' | 'unavailable' | 'send_failed' }

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)

export const sendContact = createServerFn({ method: 'POST' })
  .validator(Input)
  .handler(async ({ data }): Promise<ContactResult> => {
    if (data.extra) { console.warn('[contact] rejected: honeypot filled'); return { ok: false, reason: 'spam' } }
    if (data.elapsed < 3000) { console.warn('[contact] rejected: sent %dms after the form appeared', Math.round(data.elapsed)); return { ok: false, reason: 'spam' } }

    const key = process.env.RESEND_API_KEY
    if (!key) { console.error('[contact] RESEND_API_KEY is not set'); return { ok: false, reason: 'unavailable' } }
    /* read per request, inside the handler (never at module scope, which the browser build also sees) */
    const FROM = process.env.CONTACT_FROM_EMAIL ?? 'Ultravi0let <onboarding@resend.dev>'
    const TO = process.env.CONTACT_TO_EMAIL ?? 'hello@ultravi0let.com'

    const rows: [string, string][] = [['Name', data.name], ['Company', data.company], ['Email', data.email], ['Project', data.project]]
    const filled = rows.filter(([, v]) => v)
    const text = filled.map(([k, v]) => `${k}: ${v}`).join('\n\n')
    const html = filled.map(([k, v]) => `<p><strong>${k}</strong><br>${esc(v).replace(/\n/g, '<br>')}</p>`).join('')

    try {
      const { error } = await new Resend(key).emails.send({
        from: FROM,
        to: TO,
        replyTo: data.email,
        subject: `New enquiry: ${data.name}${data.company ? ` — ${data.company}` : ''}`,
        text,
        html,
      })
      if (error) { console.error('[contact] Resend refused the email: %s (%s)', error.name, error.statusCode); return { ok: false, reason: 'send_failed' } }
      return { ok: true }
    } catch (e) {
      console.error('[contact] sending failed: %s', e instanceof Error ? e.message : 'unknown error')
      return { ok: false, reason: 'send_failed' }
    }
  })
