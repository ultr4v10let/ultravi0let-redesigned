import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Clock, PauseCircle } from 'lucide-react'
import { CheckCircle2 } from '../../../demos/zanobia/icons'
import { zanobiaHead } from '../../../demos/zanobia/head'

export const Route = createFileRoute('/demos/zanobia/production')({
  head: () => zanobiaHead('/demos/zanobia/production'),
  component: ZanobiaProduction,
})

const LINES = [
  {
    id: 'pastry-a',
    name: 'Pastry line A',
    jobs: [
      { id: 1, product: 'Pistachio baklava tray', batch: 120, progress: 72, status: 'running' },
      { id: 2, product: 'Kunafa cups', batch: 200, progress: 0, status: 'queued' },
    ],
  },
  {
    id: 'pastry-b',
    name: 'Pastry line B',
    jobs: [{ id: 3, product: "Rosewater ma'amoul", batch: 400, progress: 15, status: 'running' }],
  },
  {
    id: 'chocolat',
    name: 'Chocolatier',
    jobs: [
      { id: 4, product: 'Chocolate éclair box', batch: 80, progress: 100, status: 'qc' },
      { id: 5, product: 'Truffle assortment', batch: 60, progress: 0, status: 'queued' },
    ],
  },
]

function ZanobiaProduction() {
  const [completed, setCompleted] = useState<number[]>([])

  function advanceJob(id: number) {
    setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }

  return (
    <main id="main" className="zanobia-main">
      <div className="zanobia-eyebrow">Production floor</div>
      <h1 className="zanobia-title" style={{ fontFamily: 'var(--zan-display)' }}>
        Live production lines
      </h1>
      <p className="zanobia-lede">Schedule batches, track progress and release to QC before dispatch to shops.</p>

      <div className="zanobia-lines">
        {LINES.map((line) => (
          <section key={line.id} className="zanobia-card zanobia-clip">
            <div className="zanobia-line-head">{line.name}</div>
            <ul className="zanobia-list">
              {line.jobs.map((job) => {
                const done = completed.includes(job.id) || job.status === 'qc'
                return (
                  <li key={job.id} className="zanobia-job">
                    <div className="zanobia-job-row">
                      <div>
                        <div className="zanobia-medium">{job.product}</div>
                        <div className="zanobia-job-batch">Batch {job.batch} units</div>
                      </div>
                      <div className="zanobia-job-actions">
                        {job.status === 'running' && !done && (
                          <span className="zanobia-status zanobia-brown">
                            <Clock size={12} />
                            Running · {job.progress}%
                          </span>
                        )}
                        {job.status === 'qc' || done ? (
                          <span className="zanobia-status zanobia-green">
                            <CheckCircle2 size={12} />
                            QC complete
                          </span>
                        ) : job.status === 'queued' ? (
                          <span className="zanobia-status zanobia-muted">
                            <PauseCircle size={12} />
                            Queued
                          </span>
                        ) : null}
                        {job.status === 'running' && !done && (
                          <button type="button" onClick={() => advanceJob(job.id)} className="zanobia-btn-sm">
                            Mark QC done
                          </button>
                        )}
                      </div>
                    </div>
                    {job.status === 'running' && (
                      <div className="zanobia-bar">
                        <div className="zanobia-bar-fill" style={{ width: `${done ? 100 : job.progress}%` }} />
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>
    </main>
  )
}
