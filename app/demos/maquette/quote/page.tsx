"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calculator } from "lucide-react";

const LINES = [
  { id: "arch", label: "Architectural drawings", base: 45 },
  { id: "apparel", label: "Bulk apparel", base: 8 },
  { id: "merch", label: "Mugs & merchandise", base: 12 },
];

const SIZES: Record<string, { label: string; mult: number }[]> = {
  arch: [
    { label: "A3", mult: 1 },
    { label: "A2", mult: 1.6 },
    { label: "A1", mult: 2.4 },
    { label: "A0", mult: 4 },
  ],
  apparel: [
    { label: "50 units", mult: 1 },
    { label: "120 units", mult: 0.85 },
    { label: "240 units", mult: 0.72 },
    { label: "500+ units", mult: 0.6 },
  ],
  merch: [
    { label: "1–24 pcs", mult: 1 },
    { label: "25–99 pcs", mult: 0.88 },
    { label: "100+ pcs", mult: 0.75 },
  ],
};

export default function MaquetteQuote() {
  const [line, setLine] = useState("arch");
  const [sizeIdx, setSizeIdx] = useState(0);
  const [qty, setQty] = useState(12);
  const [submitted, setSubmitted] = useState(false);

  const lineData = LINES.find((l) => l.id === line)!;
  const sizes = SIZES[line];
  const mult = sizes[sizeIdx]?.mult ?? 1;
  const estimate = Math.round(lineData.base * mult * qty);

  return (
    <main className="mx-auto max-w-[720px] px-6 py-10 md:px-10 md:py-14">
      <Link
        href="/demos/maquette"
        className="inline-flex items-center gap-2 text-sm text-[#E8EAED]/60 hover:text-[#F97316]"
      >
        <ArrowLeft size={14} />
        Back
      </Link>

      <div className="mt-8 flex items-center gap-3">
        <Calculator size={22} className="text-[#F97316]" />
        <h1
          className="text-3xl font-bold uppercase"
          style={{ fontFamily: "var(--maq-display)" }}
        >
          Instant quote
        </h1>
      </div>
      <p className="mt-3 text-sm text-[#E8EAED]/65">
        Select a production line, format and quantity for an indicative estimate.
      </p>

      {submitted ? (
        <div className="mt-10 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-8 text-center">
          <div className="text-lg font-semibold text-emerald-400">Quote submitted</div>
          <p className="mt-2 text-sm text-[#E8EAED]/70">
            Reference MQ-NEW · Estimated EGP {estimate.toLocaleString()} · A
            production coordinator will confirm within 2 hours.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-6 text-sm text-[#F97316] hover:underline"
          >
            Create another quote
          </button>
        </div>
      ) : (
        <form
          className="mt-10 space-y-8"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <div>
            <label className="text-[11px] uppercase tracking-[0.16em] text-[#E8EAED]/55">
              Production line
            </label>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {LINES.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => {
                    setLine(l.id);
                    setSizeIdx(0);
                  }}
                  className={`rounded-lg border px-4 py-3 text-left text-sm ${
                    line === l.id
                      ? "border-[#F97316] bg-[#F97316]/10"
                      : "border-[#E8EAED]/15 hover:border-[#E8EAED]/30"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-[0.16em] text-[#E8EAED]/55">
              {line === "arch" ? "Paper size" : "Volume tier"}
            </label>
            <div className="mt-3 flex flex-wrap gap-2">
              {sizes.map((s, i) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => setSizeIdx(i)}
                  className={`rounded-md px-4 py-2 text-sm ${
                    sizeIdx === i
                      ? "bg-[#F97316] text-[#14181F] font-medium"
                      : "border border-[#E8EAED]/15"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-[0.16em] text-[#E8EAED]/55">
              Quantity
            </label>
            <input
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value) || 1)}
              className="mt-2 w-full max-w-[200px] rounded-lg border border-[#E8EAED]/15 bg-[#1A1F28] px-4 py-2.5 text-sm outline-none focus:border-[#F97316]"
            />
          </div>

          <div className="rounded-lg border border-[#E8EAED]/10 bg-[#1A1F28] p-6">
            <div className="text-[11px] uppercase tracking-[0.16em] text-[#E8EAED]/55">
              Estimated total
            </div>
            <div
              className="mt-2 text-4xl font-bold text-[#F97316]"
              style={{ fontFamily: "var(--maq-display)" }}
            >
              EGP {estimate.toLocaleString()}
            </div>
            <p className="mt-2 text-xs text-[#E8EAED]/50">
              Indicative only · final quote may vary with finishing and rush fees
            </p>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-[#F97316] py-3.5 text-sm font-semibold text-[#14181F] hover:bg-[#FB923C]"
          >
            Submit for confirmation
          </button>
        </form>
      )}
    </main>
  );
}
