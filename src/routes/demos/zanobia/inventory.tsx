import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { AlertTriangle, Search } from 'lucide-react'
import { Package } from '../../../demos/zanobia/icons'
import { zanobiaHead } from '../../../demos/zanobia/head'

export const Route = createFileRoute('/demos/zanobia/inventory')({
  head: () => zanobiaHead('/demos/zanobia/inventory'),
  component: ZanobiaInventory,
})

const ITEMS = [
  { sku: 'FLR-001', name: 'Premium pastry flour', loc: 'Factory · Dry store', qty: 420, unit: 'kg', reorder: 200, status: 'ok' },
  { sku: 'PST-014', name: 'Pistachio paste', loc: 'Factory · Cold room', qty: 38, unit: 'kg', reorder: 50, status: 'low' },
  { sku: 'CHC-008', name: 'Couverture 70%', loc: 'Factory · Chocolat', qty: 92, unit: 'kg', reorder: 40, status: 'ok' },
  { sku: 'BOX-022', name: 'Éclair gift box', loc: 'Factory · Packaging', qty: 180, unit: 'pcs', reorder: 300, status: 'low' },
  { sku: 'DSR-101', name: 'Baklava tray (retail)', loc: 'Marina Walk shop', qty: 24, unit: 'pcs', reorder: 15, status: 'ok' },
  { sku: 'DSR-088', name: "Ma'amoul assortment", loc: 'City Walk shop', qty: 8, unit: 'pcs', reorder: 20, status: 'critical' },
  { sku: 'DSR-112', name: 'Mini éclair dozen', loc: 'JBR Kiosk', qty: 31, unit: 'pcs', reorder: 18, status: 'ok' },
]

function ZanobiaInventory() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'low'>('all')

  const filtered = ITEMS.filter((i) => {
    const matchQuery = i.name.toLowerCase().includes(query.toLowerCase()) || i.sku.toLowerCase().includes(query.toLowerCase())
    const matchFilter = filter === 'all' || i.status === 'low' || i.status === 'critical'
    return matchQuery && matchFilter
  })

  return (
    <main id="main" className="zanobia-main">
      <div className="zanobia-head">
        <div>
          <div className="zanobia-eyebrow">Inventory</div>
          <h1 className="zanobia-title" style={{ fontFamily: 'var(--zan-display)' }}>
            Stock across factory &amp; shops
          </h1>
        </div>
        <div className="zanobia-filters">
          <button type="button" onClick={() => setFilter('all')} className={`zanobia-filter${filter === 'all' ? ' zanobia-filter--on' : ''}`}>
            All items
          </button>
          <button type="button" onClick={() => setFilter('low')} className={`zanobia-filter${filter === 'low' ? ' zanobia-filter--on' : ''}`}>
            Below reorder
          </button>
        </div>
      </div>

      <div className="zanobia-search">
        <Search size={16} className="zanobia-search-icon" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search SKU or ingredient…" aria-label="Search SKU or ingredient" className="zanobia-search-input" />
      </div>

      <div className="zanobia-card zanobia-table-wrap">
        <table className="zanobia-table">
          <thead className="zanobia-thead">
            <tr>
              <th className="zanobia-th">SKU</th>
              <th className="zanobia-th">Item</th>
              <th className="zanobia-th zanobia-md-cell">Location</th>
              <th className="zanobia-th zanobia-right">Qty</th>
              <th className="zanobia-th">Status</th>
            </tr>
          </thead>
          <tbody className="zanobia-list">
            {filtered.map((i) => (
              <tr key={i.sku} className="zanobia-tr">
                <td className="zanobia-td zanobia-sku">{i.sku}</td>
                <td className="zanobia-td">
                  <div className="zanobia-inline">
                    <Package size={14} className="zanobia-gold" />
                    {i.name}
                  </div>
                </td>
                <td className="zanobia-td zanobia-md-cell zanobia-loc">{i.loc}</td>
                <td className="zanobia-td zanobia-right zanobia-tnum">
                  {i.qty} {i.unit}
                </td>
                <td className="zanobia-td">
                  {i.status === 'ok' ? (
                    <span className="zanobia-ok">OK</span>
                  ) : (
                    <span className="zanobia-status zanobia-rose">
                      <AlertTriangle size={12} />
                      {i.status === 'critical' ? 'Critical' : 'Low'}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
