import { createFileRoute } from '@tanstack/react-router'
import { Users } from 'lucide-react'
import { Building2, CreditCard } from '../../../demos/zanobia/icons'
import { zanobiaHead } from '../../../demos/zanobia/head'

export const Route = createFileRoute('/demos/zanobia/admin')({
  head: () => zanobiaHead('/demos/zanobia/admin'),
  component: ZanobiaAdmin,
})

const modules = [
  { icon: CreditCard, title: 'Finance', items: ['P&L by shop', 'Payables & receivables', 'Cost per batch', 'Monthly close'], stat: 'EGP 186k', statLabel: 'Revenue this week' },
  { icon: Users, title: 'Human resources', items: ['Shift scheduling', 'Factory & shop staff', 'Leave requests', 'Payroll export'], stat: '84', statLabel: 'Active employees' },
  { icon: Building2, title: 'Administration', items: ['Multi-site permissions', 'Supplier contracts', 'Audit logs', 'Document vault'], stat: '5', statLabel: 'Sites connected' },
]

function ZanobiaAdmin() {
  return (
    <main id="main" className="zanobia-main">
      <div className="zanobia-eyebrow">Back office</div>
      <h1 className="zanobia-title" style={{ fontFamily: 'var(--zan-display)' }}>
        Finance, HR &amp; administration
      </h1>
      <p className="zanobia-lede">Central office tools for a patisserie group — permissions, payroll, financial reporting and supplier management in one admin console.</p>

      <div className="zanobia-modules">
        {modules.map((m) => (
          <div key={m.title} className="zanobia-card zanobia-module">
            <m.icon size={22} className="zanobia-gold" />
            <h2 className="zanobia-module-title">{m.title}</h2>
            <div className="zanobia-module-stat" style={{ fontFamily: 'var(--zan-display)' }}>
              {m.stat}
            </div>
            <div className="zanobia-sub">{m.statLabel}</div>
            <ul className="zanobia-module-list">
              {m.items.map((item) => (
                <li key={item} className="zanobia-inline">
                  <span className="zanobia-dot" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  )
}
