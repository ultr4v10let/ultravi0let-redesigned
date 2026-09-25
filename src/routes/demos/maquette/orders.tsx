import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Clock, Printer } from 'lucide-react'
import { CheckCircle2 } from '../../../demos/maquette/icons'
import { maquetteHead } from '../../../demos/maquette/head'

export const Route = createFileRoute('/demos/maquette/orders')({
  head: maquetteHead('/demos/maquette/orders'),
  component: MaquetteOrders,
})

const ORDERS = [
  { id: 'MQ-8841', client: 'Atelier Noor', line: 'Architectural', job: 'A1 site plans × 12', due: 'Today 14:00', status: 'printing' },
  { id: 'MQ-8842', client: 'GEMS International', line: 'Apparel', job: 'Graduation tees · 240 pcs', due: 'Fri 10:00', status: 'queued' },
  { id: 'MQ-8843', client: 'Vertex Properties', line: 'Architectural', job: 'A0 presentation boards × 4', due: 'Tomorrow 09:00', status: 'queued' },
  { id: 'MQ-8844', client: 'Summit Corp', line: 'Merchandise', job: 'Branded mugs · 80 units', due: 'Mon 12:00', status: 'ready' },
  { id: 'MQ-8845', client: 'Harbor School', line: 'Apparel', job: 'House shirts · 120 pcs', due: 'Next week', status: 'queued' },
]

function MaquetteOrders() {
  const [filter, setFilter] = useState<string>('all')
  const [completed, setCompleted] = useState<Array<string>>([])

  const filtered = filter === 'all' ? ORDERS : ORDERS.filter((o) => o.line.toLowerCase() === filter)

  function markShipped(id: string) {
    setCompleted((prev) => [...prev, id])
  }

  return (
    <main id="main" className="maquette-page">
      <div className="maquette-orders-head">
        <div>
          <div className="maquette-eyebrow">Order board</div>
          <h1 className="maquette-page-title" style={{ fontFamily: 'var(--maq-display)' }}>
            Production queue
          </h1>
        </div>
        <div className="maquette-filters">
          {['all', 'architectural', 'apparel', 'merchandise'].map((f) => (
            <button key={f} type="button" onClick={() => setFilter(f)} aria-pressed={filter === f} className="maquette-filter">
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="maquette-table-wrap">
        <table className="maquette-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Client</th>
              <th className="maquette-hide-md">Line</th>
              <th>Job</th>
              <th className="maquette-hide-sm">Due</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => {
              const shipped = completed.includes(o.id)
              const status = shipped ? 'shipped' : o.status
              return (
                <tr key={o.id}>
                  <td className="maquette-id">{o.id}</td>
                  <td>{o.client}</td>
                  <td className="maquette-hide-md maquette-muted-65">{o.line}</td>
                  <td>
                    <div className="maquette-job">
                      <Printer size={14} />
                      {o.job}
                    </div>
                  </td>
                  <td className="maquette-hide-sm maquette-muted-55">{o.due}</td>
                  <td>
                    <span className={`maquette-status maquette-status-${status}`}>{status}</span>
                  </td>
                  <td>
                    {o.status === 'ready' && !shipped && (
                      <button type="button" onClick={() => markShipped(o.id)} className="maquette-link maquette-ship">
                        Mark shipped
                      </button>
                    )}
                    {o.status === 'printing' && <Clock size={14} className="maquette-clock" />}
                    {shipped && <CheckCircle2 size={14} className="maquette-done" />}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </main>
  )
}
