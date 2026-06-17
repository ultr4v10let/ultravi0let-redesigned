"use client";

import { useState } from "react";
import { CheckCircle2, Clock, Printer } from "lucide-react";

const ORDERS = [
  {
    id: "MQ-8841",
    client: "Atelier Noor",
    line: "Architectural",
    job: "A1 site plans × 12",
    due: "Today 14:00",
    status: "printing",
  },
  {
    id: "MQ-8842",
    client: "GEMS International",
    line: "Apparel",
    job: "Graduation tees · 240 pcs",
    due: "Fri 10:00",
    status: "queued",
  },
  {
    id: "MQ-8843",
    client: "Vertex Properties",
    line: "Architectural",
    job: "A0 presentation boards × 4",
    due: "Tomorrow 09:00",
    status: "queued",
  },
  {
    id: "MQ-8844",
    client: "Summit Corp",
    line: "Merchandise",
    job: "Branded mugs · 80 units",
    due: "Mon 12:00",
    status: "ready",
  },
  {
    id: "MQ-8845",
    client: "Harbor School",
    line: "Apparel",
    job: "House shirts · 120 pcs",
    due: "Next week",
    status: "queued",
  },
];

const STATUS_STYLE: Record<string, string> = {
  printing: "bg-[#F97316]/20 text-[#FB923C]",
  queued: "bg-[#E8EAED]/10 text-[#E8EAED]/70",
  ready: "bg-emerald-500/20 text-emerald-400",
};

export default function MaquetteOrders() {
  const [filter, setFilter] = useState<string>("all");
  const [completed, setCompleted] = useState<string[]>([]);

  const filtered =
    filter === "all"
      ? ORDERS
      : ORDERS.filter((o) => o.line.toLowerCase() === filter);

  function markShipped(id: string) {
    setCompleted((prev) => [...prev, id]);
  }

  return (
    <main className="mx-auto max-w-[1320px] px-6 py-10 md:px-10 md:py-14">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#F97316]">
            Order board
          </div>
          <h1
            className="mt-2 text-3xl font-bold uppercase"
            style={{ fontFamily: "var(--maq-display)" }}
          >
            Production queue
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          {["all", "architectural", "apparel", "merchandise"].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium uppercase tracking-wide ${
                filter === f
                  ? "bg-[#F97316] text-[#14181F]"
                  : "border border-[#E8EAED]/15 text-[#E8EAED]/70"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 overflow-hidden rounded-lg border border-[#E8EAED]/10">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[#E8EAED]/10 bg-[#1A1F28] text-[11px] uppercase tracking-[0.14em] text-[#E8EAED]/55">
            <tr>
              <th className="px-5 py-3">Order</th>
              <th className="px-5 py-3">Client</th>
              <th className="hidden px-5 py-3 md:table-cell">Line</th>
              <th className="px-5 py-3">Job</th>
              <th className="hidden px-5 py-3 sm:table-cell">Due</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8EAED]/8">
            {filtered.map((o) => {
              const shipped = completed.includes(o.id);
              return (
                <tr key={o.id} className="hover:bg-[#E8EAED]/[0.02]">
                  <td className="px-5 py-4 font-mono text-xs">{o.id}</td>
                  <td className="px-5 py-4">{o.client}</td>
                  <td className="hidden px-5 py-4 text-[#E8EAED]/65 md:table-cell">{o.line}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Printer size={14} className="text-[#F97316]/70" />
                      {o.job}
                    </div>
                  </td>
                  <td className="hidden px-5 py-4 text-[#E8EAED]/55 sm:table-cell">{o.due}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] uppercase tracking-wide ${
                        shipped ? "bg-emerald-500/20 text-emerald-400" : STATUS_STYLE[o.status]
                      }`}
                    >
                      {shipped ? "shipped" : o.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {o.status === "ready" && !shipped && (
                      <button
                        type="button"
                        onClick={() => markShipped(o.id)}
                        className="text-xs text-[#F97316] hover:underline"
                      >
                        Mark shipped
                      </button>
                    )}
                    {o.status === "printing" && (
                      <Clock size={14} className="text-[#FB923C]" />
                    )}
                    {shipped && <CheckCircle2 size={14} className="text-emerald-400" />}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
