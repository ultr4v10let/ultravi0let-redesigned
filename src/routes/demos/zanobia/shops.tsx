import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Check } from 'lucide-react'
import { Store } from '../../../demos/zanobia/icons'
import { zanobiaHead } from '../../../demos/zanobia/head'

export const Route = createFileRoute('/demos/zanobia/shops')({
  head: () => zanobiaHead('/demos/zanobia/shops'),
  component: ZanobiaShops,
})

const ORDERS = [
  {
    id: 'REQ-2401',
    shop: 'Marina Walk',
    needed: 'Today · 16:00',
    priority: 'high',
    items: [
      { name: 'Baklava tray', qty: 12 },
      { name: 'Mini éclair dozen', qty: 8 },
      { name: "Rosewater ma'amoul box", qty: 6 },
    ],
  },
  {
    id: 'REQ-2402',
    shop: 'City Walk',
    needed: 'Tomorrow · 08:00',
    priority: 'normal',
    items: [
      { name: 'Kunafa cups', qty: 20 },
      { name: 'Truffle assortment', qty: 10 },
    ],
  },
  {
    id: 'REQ-2403',
    shop: 'JBR Kiosk',
    needed: 'Today · 18:00',
    priority: 'high',
    items: [
      { name: 'Chocolate éclair box', qty: 15 },
      { name: 'Pistachio baklava tray', qty: 6 },
    ],
  },
]

function ZanobiaShops() {
  const [fulfilled, setFulfilled] = useState<string[]>([])

  function fulfill(id: string) {
    setFulfilled((prev) => [...prev, id])
  }

  return (
    <main id="main" className="zanobia-main">
      <div className="zanobia-eyebrow">Shop requisitions</div>
      <h1 className="zanobia-title" style={{ fontFamily: 'var(--zan-display)' }}>
        Orders from retail → factory
      </h1>
      <p className="zanobia-lede">Each shop submits what it needs from central production. Factory fulfils, dispatches and updates inventory automatically.</p>

      <div className="zanobia-orders">
        {ORDERS.map((order) => {
          const done = fulfilled.includes(order.id)
          return (
            <article key={order.id} className={`zanobia-order${done ? ' zanobia-order--done' : ''}`}>
              <div className="zanobia-order-top">
                <div className="zanobia-inline">
                  <Store size={18} className="zanobia-brown" />
                  <div>
                    <div className="zanobia-semibold">{order.shop}</div>
                    <div className="zanobia-order-id">{order.id}</div>
                  </div>
                </div>
                <span className={`zanobia-prio${order.priority === 'high' ? ' zanobia-prio--high' : ''}`}>{order.priority}</span>
              </div>
              <div className="zanobia-order-needed">Needed {order.needed}</div>
              <ul className="zanobia-order-items">
                {order.items.map((item) => (
                  <li key={item.name} className="zanobia-order-item">
                    <span>{item.name}</span>
                    <span className="zanobia-qty">×{item.qty}</span>
                  </li>
                ))}
              </ul>
              <button type="button" disabled={done} onClick={() => fulfill(order.id)} className="zanobia-fulfil">
                {done ? (
                  <>
                    <Check size={16} />
                    Dispatched
                  </>
                ) : (
                  <>
                    Send to production
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </article>
          )
        })}
      </div>
    </main>
  )
}
