"use client";

import { useState } from "react";
import { CheckCircle2, Clock, PauseCircle } from "lucide-react";

const LINES = [
  {
    id: "pastry-a",
    name: "Pastry line A",
    jobs: [
      { id: 1, product: "Pistachio baklava tray", batch: 120, progress: 72, status: "running" },
      { id: 2, product: "Kunafa cups", batch: 200, progress: 0, status: "queued" },
    ],
  },
  {
    id: "pastry-b",
    name: "Pastry line B",
    jobs: [
      { id: 3, product: "Rosewater ma'amoul", batch: 400, progress: 15, status: "running" },
    ],
  },
  {
    id: "chocolat",
    name: "Chocolatier",
    jobs: [
      { id: 4, product: "Chocolate éclair box", batch: 80, progress: 100, status: "qc" },
      { id: 5, product: "Truffle assortment", batch: 60, progress: 0, status: "queued" },
    ],
  },
];

export default function ZanobiaProduction() {
  const [completed, setCompleted] = useState<number[]>([]);

  function advanceJob(id: number) {
    setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }

  return (
    <main className="p-5 md:p-8">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8B5E4B]">
        Production floor
      </div>
      <h1
        className="mt-2 text-3xl font-semibold"
        style={{ fontFamily: "var(--zan-display)" }}
      >
        Live production lines
      </h1>
      <p className="mt-2 max-w-xl text-sm text-[#3D2A24]/70">
        Schedule batches, track progress and release to QC before dispatch to shops.
      </p>

      <div className="mt-10 space-y-8">
        {LINES.map((line) => (
          <section
            key={line.id}
            className="rounded-xl border border-[#3D2A24]/10 bg-[#FFFDF9] overflow-hidden"
          >
            <div className="border-b border-[#3D2A24]/10 bg-[#FBF6F0] px-5 py-3 font-semibold">
              {line.name}
            </div>
            <ul className="divide-y divide-[#3D2A24]/8">
              {line.jobs.map((job) => {
                const done = completed.includes(job.id) || job.status === "qc";
                return (
                  <li key={job.id} className="px-5 py-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="font-medium">{job.product}</div>
                        <div className="mt-1 text-xs text-[#3D2A24]/55">
                          Batch {job.batch} units
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {job.status === "running" && !done && (
                          <span className="inline-flex items-center gap-1 text-xs text-[#8B5E4B]">
                            <Clock size={12} />
                            Running · {job.progress}%
                          </span>
                        )}
                        {job.status === "qc" || done ? (
                          <span className="inline-flex items-center gap-1 text-xs text-emerald-700">
                            <CheckCircle2 size={12} />
                            QC complete
                          </span>
                        ) : job.status === "queued" ? (
                          <span className="inline-flex items-center gap-1 text-xs text-[#3D2A24]/55">
                            <PauseCircle size={12} />
                            Queued
                          </span>
                        ) : null}
                        {job.status === "running" && !done && (
                          <button
                            type="button"
                            onClick={() => advanceJob(job.id)}
                            className="rounded-lg bg-[#8B5E4B] px-3 py-1.5 text-xs text-white hover:bg-[#6D4A3C]"
                          >
                            Mark QC done
                          </button>
                        )}
                      </div>
                    </div>
                    {job.status === "running" && (
                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#3D2A24]/10">
                        <div
                          className="h-full rounded-full bg-[#C9A87C] transition-all"
                          style={{ width: `${done ? 100 : job.progress}%` }}
                        />
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
