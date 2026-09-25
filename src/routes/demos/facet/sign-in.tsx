import { ClientOnly, Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useId, useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowLeft, Lock, Mail } from 'lucide-react'
import { getFacetUser, setFacetUser } from '../../../demos/facet/facet'
import { FACET_SHELL, facetHead } from '../../../demos/facet/facet-shell'

export const Route = createFileRoute('/demos/facet/sign-in')({
  validateSearch: (search: Record<string, unknown>): { field?: string } =>
    typeof search.field === 'string' && search.field ? { field: search.field } : {},
  head: () => facetHead('/demos/facet/sign-in'),
  component: FacetSignIn,
})

function FacetSignIn() {
  const navigate = useNavigate()
  const { field } = Route.useSearch()
  const emailId = useId()
  const passwordId = useId()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (getFacetUser()) void navigate({ to: '/demos/facet/dashboard', replace: true })
  }, [navigate])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (!email.includes('@')) {
      setError('Enter a valid email address.')
      return
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters.')
      return
    }

    setLoading(true)
    setTimeout(() => {
      const name = email
        .split('@')[0]
        .replace(/[._]/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase())
      setFacetUser({ email, name })
      if (field) void navigate({ to: '/demos/facet/build', search: { field } })
      else void navigate({ to: '/demos/facet/dashboard' })
    }, 500)
  }

  return (
    <main className="facet-signin">
      <Link
        to="/demos/facet"
        activeOptions={{ exact: true }}
        className="facet-back facet-mb-10"
        style={{ color: FACET_SHELL.inkMuted }}
      >
        <ArrowLeft size={14} />
        Back
      </Link>

      <h1 className="facet-text-3xl" style={{ fontFamily: 'var(--facet-display)', color: FACET_SHELL.ink }}>
        Sign in to Facet
      </h1>
      <p className="facet-signin-note" style={{ color: FACET_SHELL.inkMuted }}>
        Demo account — any email and password (4+ chars) works.
        {/* The page is prerendered without a query string, so the field note waits for hydration. */}
        <ClientOnly>{field && ` You'll start building your ${field} portfolio next.`}</ClientOnly>
      </p>

      <form onSubmit={handleSubmit} className="facet-form">
        <div>
          <label
            htmlFor={emailId}
            className="facet-label"
            style={{ color: FACET_SHELL.inkMuted, fontFamily: 'var(--facet-mono)' }}
          >
            Email
          </label>
          <div className="facet-input-wrap">
            <Mail size={16} className="facet-input-icon" />
            <input
              id={emailId}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="facet-input"
              style={{
                borderColor: FACET_SHELL.border,
                background: FACET_SHELL.paperElevated,
                color: FACET_SHELL.ink,
              }}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor={passwordId}
            className="facet-label"
            style={{ color: FACET_SHELL.inkMuted, fontFamily: 'var(--facet-mono)' }}
          >
            Password
          </label>
          <div className="facet-input-wrap">
            <Lock size={16} className="facet-input-icon" />
            <input
              id={passwordId}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="facet-input"
              style={{
                borderColor: FACET_SHELL.border,
                background: FACET_SHELL.paperElevated,
                color: FACET_SHELL.ink,
              }}
            />
          </div>
        </div>
        {error && <p className="facet-error">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="facet-submit"
          style={{ background: FACET_SHELL.accent }}
        >
          {loading ? 'Signing in…' : 'Continue to studio'}
        </button>
      </form>
    </main>
  )
}
