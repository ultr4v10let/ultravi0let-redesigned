import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, ChefHat, TrendingUp } from 'lucide-react'
import { Factory, Package, Store } from '../../../demos/zanobia/icons'
import { zanobiaHead } from '../../../demos/zanobia/head'

export const Route = createFileRoute('/demos/zanobia/')({
  head: () => zanobiaHead('/demos/zanobia'),
  component: ZanobiaHome,
})

const kpis = [
  { label: 'Units produced today', value: '2,840', delta: '+12%', icon: Factory },
  { label: 'Shop orders pending', value: '18', delta: '3 urgent', icon: Store },
  { label: 'SKUs below reorder', value: '7', delta: 'Review', icon: Package },
  { label: 'Weekly revenue', value: 'EGP 186k', delta: '+8.4%', icon: TrendingUp },
]

const productionQueue = [
  { item: 'Pistachio baklava tray', qty: 120, line: 'Pastry A', status: 'In progress' },
  { item: "Rosewater ma'amoul", qty: 400, line: 'Pastry B', status: 'Queued' },
  { item: 'Chocolate éclair box', qty: 80, line: 'Chocolat', status: 'QC hold' },
]

const shopOrders = [
  { shop: 'Marina Walk', items: 6, needed: 'Today 16:00', priority: 'High' },
  { shop: 'City Walk', items: 4, needed: 'Tomorrow 08:00', priority: 'Normal' },
  { shop: 'JBR Kiosk', items: 3, needed: 'Today 18:00', priority: 'High' },
]

const display = { fontFamily: 'var(--zan-display)' }

function ZanobiaHome() {
  return (
    <main id="main" className="zanobia-main">
      <div className="zanobia-hero">
        <div>
          <div className="zanobia-eyebrow">Operations overview</div>
          <h1 className="zanobia-hero-title" style={display}>
            Factory &amp; retail, one system.
          </h1>
        </div>
        <div className="zanobia-hero-actions">
          <Link to="/demos/zanobia/production" className="zanobia-btn">
            Production floor
          </Link>
          <Link to="/demos/zanobia/shops" className="zanobia-btn-ghost">
            Shop requisitions
          </Link>
        </div>
      </div>

      <div className="zanobia-kpis">
        {kpis.map((k) => (
          <div key={k.label} className="zanobia-card zanobia-kpi">
            <k.icon size={18} className="zanobia-gold" />
            <div className="zanobia-kpi-value" style={display}>
              {k.value}
            </div>
            <div className="zanobia-kpi-label">{k.label}</div>
            <div className="zanobia-kpi-delta">{k.delta}</div>
          </div>
        ))}
      </div>

      <div className="zanobia-panels">
        <section className="zanobia-card">
          <div className="zanobia-panel-head">
            <div className="zanobia-inline">
              <ChefHat size={18} className="zanobia-brown" />
              <h2 className="zanobia-semibold">Production queue</h2>
            </div>
            <Link to="/demos/zanobia/production" className="zanobia-panel-link">
              View all
            </Link>
          </div>
          <ul className="zanobia-list">
            {productionQueue.map((p) => (
              <li key={p.item} className="zanobia-row">
                <div>
                  <div className="zanobia-medium">{p.item}</div>
                  <div className="zanobia-sub">
                    {p.qty} units · {p.line}
                  </div>
                </div>
                <span className={`zanobia-pill${p.status === 'In progress' ? ' zanobia-pill--run' : p.status === 'QC hold' ? ' zanobia-pill--qc' : ''}`}>{p.status}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="zanobia-card">
          <div className="zanobia-panel-head">
            <div className="zanobia-inline">
              <Store size={18} className="zanobia-brown" />
              <h2 className="zanobia-semibold">Shop → factory orders</h2>
            </div>
            <Link to="/demos/zanobia/shops" className="zanobia-panel-link">
              Fulfill
            </Link>
          </div>
          <ul className="zanobia-list">
            {shopOrders.map((o) => (
              <li key={o.shop} className="zanobia-row">
                <div>
                  <div className="zanobia-medium">{o.shop}</div>
                  <div className="zanobia-sub">
                    {o.items} line items · needed {o.needed}
                  </div>
                </div>
                <span className={`zanobia-prio${o.priority === 'High' ? ' zanobia-prio--high' : ''}`}>{o.priority}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="zanobia-cta">
        <h2 className="zanobia-cta-title">End-to-end patisserie operations</h2>
        <p className="zanobia-cta-text">
          Inventory across factory and shops, production scheduling, shop requisitions to the factory floor, plus finance and HR in the admin module — built for a multi-site dessert business.
        </p>
        <Link to="/demos/zanobia/inventory" className="zanobia-cta-link">
          Explore inventory
          <ArrowRight size={14} />
        </Link>
      </section>
    </main>
  )
}
