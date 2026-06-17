"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, FileUp, Plus, X } from "lucide-react";

const scopes = [
  { v: "1", n: "Scope 1 — Direct emissions" },
  { v: "2", n: "Scope 2 — Purchased energy" },
  { v: "3", n: "Scope 3 — Value chain" },
];

const sites = [
  "Kawasaki Plant #2",
  "Yokohama HQ",
  "Aichi Logistics",
  "Osaka Distribution",
  "Sendai Office",
];

const activities = {
  "1": ["Natural gas combustion", "Diesel generator", "Fleet fuel", "Refrigerant leak"],
  "2": ["Grid electricity", "District heating", "Steam"],
  "3": ["Business travel", "Employee commuting", "Logistics — outbound", "Capital goods"],
} as Record<string, string[]>;

const units = ["kWh", "MJ", "litres", "kg", "tonnes", "km"];

type Row = {
  id: string;
  activity: string;
  qty: string;
  unit: string;
  date: string;
};

export default function SubmitReading() {
  const [scope, setScope] = useState("1");
  const [site, setSite] = useState(sites[0]);
  const [period, setPeriod] = useState("Q1 FY2026");
  const [rows, setRows] = useState<Row[]>([
    {
      id: cryptoId(),
      activity: activities["1"][0],
      qty: "",
      unit: "litres",
      date: new Date().toISOString().slice(0, 10),
    },
  ]);
  const [submitted, setSubmitted] = useState<{
    ref: string;
    factor: number;
    total: number;
  } | null>(null);

  const addRow = () =>
    setRows((r) => [
      ...r,
      {
        id: cryptoId(),
        activity: activities[scope][0],
        qty: "",
        unit: scope === "2" ? "kWh" : "litres",
        date: new Date().toISOString().slice(0, 10),
      },
    ]);

  const update = (id: string, key: keyof Row, value: string) =>
    setRows((rs) =>
      rs.map((r) => (r.id === id ? { ...r, [key]: value } : r))
    );

  const remove = (id: string) => setRows((rs) => rs.filter((r) => r.id !== id));

  // very rough factor for visual purposes only
  const total = rows.reduce(
    (sum, r) => sum + (parseFloat(r.qty) || 0) * (scope === "2" ? 0.000489 : 0.00268),
    0
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted({
      ref:
        "AZU-2026-" +
        scope +
        "-" +
        Math.random().toString(36).slice(2, 6).toUpperCase(),
      factor: scope === "2" ? 0.489 : 2.68,
      total,
    });
    window.scrollTo({ top: 0 });
  };

  if (submitted) {
    return (
      <main className="mx-auto max-w-[820px] px-6 py-16 md:py-24">
        <div className="rounded-md border border-[#7CA982]/40 bg-[#0F1B16] p-8 md:p-12">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#7CA982] text-[#0C1410]">
            <Check size={24} strokeWidth={2.4} />
          </div>
          <h1
            className="mt-6 text-[clamp(1.9rem,4vw,3rem)] leading-[1.05]"
            style={{ fontFamily: "var(--aizu-display)" }}
          >
            Reading submitted.
          </h1>
          <p className="mt-4 text-[#E8F0EA]/75">
            Your submission has been written to the immutable journal and is
            queued for assurance review.
          </p>

          <div className="mt-8 grid gap-3 md:grid-cols-2">
            <Cell k="Reference" v={submitted.ref} mono />
            <Cell k="Scope" v={scopes.find((s) => s.v === scope)?.n.replace(/ — .*/, "") ?? scope} />
            <Cell k="Site" v={site} />
            <Cell k="Period" v={period} />
            <Cell
              k="Emission factor (kg CO₂e/unit)"
              v={submitted.factor.toFixed(3)}
              mono
            />
            <Cell
              k="Calculated tCO₂e"
              v={submitted.total.toFixed(2)}
              mono
              highlight
            />
          </div>

          <div className="mt-10 flex gap-3">
            <Link
              href="/demos/aizu/dashboard"
              className="inline-flex items-center gap-2 rounded-md border border-[#E8F0EA]/15 px-5 py-2.5 text-sm hover:bg-[#E8F0EA]/[0.04]"
            >
              Back to dashboard
            </Link>
            <button
              onClick={() => {
                setSubmitted(null);
                setRows([
                  {
                    id: cryptoId(),
                    activity: activities[scope][0],
                    qty: "",
                    unit: "litres",
                    date: new Date().toISOString().slice(0, 10),
                  },
                ]);
              }}
              className="inline-flex items-center gap-2 rounded-md bg-[#7CA982] px-5 py-2.5 text-sm font-medium text-[#0C1410] hover:bg-[#A7D8B0]"
            >
              Submit another
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1100px] px-6 py-10 md:px-10 md:py-14">
      <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#7CA982]">
        New reading
      </div>
      <h1
        className="mt-3 text-[clamp(1.8rem,3.6vw,2.6rem)] leading-tight"
        style={{ fontFamily: "var(--aizu-display)" }}
      >
        Submit emissions data
      </h1>

      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        {/* Top metadata */}
        <div className="grid grid-cols-1 gap-3 rounded-md border border-[#E8F0EA]/10 bg-[#0F1B16] p-5 md:grid-cols-3">
          <Field label="Scope">
            <select
              value={scope}
              onChange={(e) => {
                const s = e.target.value;
                setScope(s);
                setRows((rs) =>
                  rs.map((r) => ({ ...r, activity: activities[s][0] }))
                );
              }}
              className="w-full rounded-md border border-[#E8F0EA]/15 bg-[#0C1410] px-3 py-2 text-sm outline-none focus:border-[#7CA982]"
            >
              {scopes.map((s) => (
                <option key={s.v} value={s.v}>
                  {s.n}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Site">
            <select
              value={site}
              onChange={(e) => setSite(e.target.value)}
              className="w-full rounded-md border border-[#E8F0EA]/15 bg-[#0C1410] px-3 py-2 text-sm outline-none focus:border-[#7CA982]"
            >
              {sites.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </Field>
          <Field label="Reporting period">
            <input
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full rounded-md border border-[#E8F0EA]/15 bg-[#0C1410] px-3 py-2 text-sm outline-none focus:border-[#7CA982]"
            />
          </Field>
        </div>

        {/* Rows */}
        <div className="overflow-hidden rounded-md border border-[#E8F0EA]/10 bg-[#0F1B16]">
          <div className="grid grid-cols-[1.4fr_1fr_0.8fr_1fr_auto] gap-3 border-b border-[#E8F0EA]/10 bg-[#0C1410] px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#E8F0EA]/55">
            <div>Activity</div>
            <div>Quantity</div>
            <div>Unit</div>
            <div>Date</div>
            <div />
          </div>
          {rows.map((r) => (
            <div
              key={r.id}
              className="grid grid-cols-[1.4fr_1fr_0.8fr_1fr_auto] gap-3 border-b border-[#E8F0EA]/8 px-4 py-3 last:border-b-0"
            >
              <select
                value={r.activity}
                onChange={(e) => update(r.id, "activity", e.target.value)}
                className="rounded-md border border-[#E8F0EA]/15 bg-[#0C1410] px-3 py-2 text-sm outline-none focus:border-[#7CA982]"
              >
                {activities[scope].map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
              <input
                value={r.qty}
                onChange={(e) => update(r.id, "qty", e.target.value)}
                type="number"
                placeholder="0"
                className="rounded-md border border-[#E8F0EA]/15 bg-[#0C1410] px-3 py-2 text-right font-mono text-sm outline-none focus:border-[#7CA982]"
              />
              <select
                value={r.unit}
                onChange={(e) => update(r.id, "unit", e.target.value)}
                className="rounded-md border border-[#E8F0EA]/15 bg-[#0C1410] px-3 py-2 text-sm outline-none focus:border-[#7CA982]"
              >
                {units.map((u) => (
                  <option key={u}>{u}</option>
                ))}
              </select>
              <input
                type="date"
                value={r.date}
                onChange={(e) => update(r.id, "date", e.target.value)}
                className="rounded-md border border-[#E8F0EA]/15 bg-[#0C1410] px-3 py-2 font-mono text-sm outline-none focus:border-[#7CA982]"
              />
              <button
                type="button"
                onClick={() => remove(r.id)}
                disabled={rows.length === 1}
                className="text-[#E8F0EA]/45 hover:text-[#E8A982] disabled:opacity-30"
              >
                <X size={16} />
              </button>
            </div>
          ))}
          <div className="flex items-center justify-between gap-3 border-t border-[#E8F0EA]/10 bg-[#0C1410] px-4 py-3">
            <button
              type="button"
              onClick={addRow}
              className="inline-flex items-center gap-2 text-xs text-[#7CA982] hover:text-[#A7D8B0]"
            >
              <Plus size={13} /> Add line
            </button>
            <div className="font-mono text-[11px] text-[#E8F0EA]/65">
              Live total ·{" "}
              <span className="text-[#A7D8B0]">{total.toFixed(2)} tCO₂e</span>
            </div>
          </div>
        </div>

        {/* Supporting docs */}
        <div className="rounded-md border border-dashed border-[#E8F0EA]/15 bg-[#0F1B16] p-6 text-center">
          <FileUp size={20} className="mx-auto text-[#7CA982]" />
          <div className="mt-3 text-sm text-[#E8F0EA]/75">
            Attach invoices or meter readings (PDF, CSV, XLSX)
          </div>
          <div className="mt-1 text-[11px] text-[#E8F0EA]/45">
            Drag and drop — optional, recommended for assurance
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <Link
            href="/demos/aizu/dashboard"
            className="text-sm text-[#E8F0EA]/65 hover:text-[#E8F0EA]"
          >
            ← Cancel
          </Link>
          <button
            type="submit"
            disabled={!rows.some((r) => parseFloat(r.qty) > 0)}
            className="inline-flex items-center gap-2 rounded-md bg-[#7CA982] px-5 py-3 text-sm font-medium text-[#0C1410] transition-colors hover:bg-[#A7D8B0] disabled:cursor-not-allowed disabled:bg-[#E8F0EA]/15 disabled:text-[#E8F0EA]/40"
          >
            Submit to ledger
          </button>
        </div>
      </form>
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block pb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#E8F0EA]/55">
        {label}
      </span>
      {children}
    </label>
  );
}

function Cell({
  k,
  v,
  mono,
  highlight,
}: {
  k: string;
  v: string;
  mono?: boolean;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-md border p-4 ${
        highlight
          ? "border-[#7CA982]/40 bg-[#7CA982]/10"
          : "border-[#E8F0EA]/10 bg-[#0C1410]"
      }`}
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#E8F0EA]/55">
        {k}
      </div>
      <div className={`mt-1 text-sm ${mono ? "font-mono" : ""}`}>{v}</div>
    </div>
  );
}

function cryptoId() {
  return Math.random().toString(36).slice(2, 10);
}
