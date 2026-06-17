"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowDownRight,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Download,
  FileCheck2,
  Plus,
  ShieldCheck,
  Upload,
  UserCog,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────
const SITES = [
  { code: "TYO", city: "Tokyo HQ", x: 76, y: 56, v: 18420, intensity: 1.0 },
  { code: "OSA", city: "Osaka Distribution", x: 56, y: 64, v: 14210, intensity: 0.78 },
  { code: "KYO", city: "Kyoto R&D", x: 60, y: 60, v: 6420, intensity: 0.36 },
  { code: "NGY", city: "Nagoya Plant", x: 66, y: 58, v: 22810, intensity: 1.0 },
  { code: "FUK", city: "Fukuoka Logistics", x: 36, y: 76, v: 9120, intensity: 0.5 },
  { code: "SDI", city: "Sendai Office", x: 80, y: 42, v: 5410, intensity: 0.3 },
  { code: "SPR", city: "Sapporo Refinery", x: 86, y: 22, v: 7820, intensity: 0.43 },
];

// 7 cols × 14 rows = 98 cells for a calendar heatmap
function buildHeatmap() {
  const out: number[] = [];
  // Plausible pattern: weekly cycle + slow downtrend
  for (let i = 0; i < 98; i++) {
    const week = Math.floor(i / 7);
    const day = i % 7;
    // weekend lower, recent weeks lower
    const base = day < 5 ? 0.6 : 0.25;
    const trend = 1 - week / 25;
    const noise = (Math.sin(i * 1.7) + 1) * 0.18;
    out.push(Math.max(0.05, Math.min(1, base * trend + noise)));
  }
  return out;
}
const HEATMAP = buildHeatmap();

// Waterfall — scope contributions
const WATERFALL = [
  { l: "Baseline FY25", v: 91212, type: "base" as const },
  { l: "Scope 1 reduction", v: -2100, type: "down" as const },
  { l: "Scope 2 RE100", v: -3760, type: "down" as const },
  { l: "Scope 3 logistics", v: -1140, type: "down" as const },
  { l: "Total FY26", v: 84212, type: "total" as const },
];

// Audit trail
const AUDIT = [
  {
    at: "10:42",
    who: "Yuki M.",
    role: "Site lead · Kawasaki",
    a: "Submitted Q1 reading",
    ref: "AZU-2026-Q1-04",
    icon: Upload,
  },
  {
    at: "10:38",
    who: "PwC Tokyo",
    role: "Assurance partner",
    a: "Signed off reading",
    ref: "AZU-2026-Q1-03",
    icon: ShieldCheck,
  },
  {
    at: "10:21",
    who: "Aizu engine",
    role: "v6.2 emission factors",
    a: "Re-applied MOEJ factor revision",
    ref: "+0.4%",
    icon: ClipboardCheck,
  },
  {
    at: "09:56",
    who: "Hana T.",
    role: "Compliance officer",
    a: "Locked FY25 disclosure pack",
    ref: "TCFD 2025",
    icon: FileCheck2,
  },
  {
    at: "09:44",
    who: "System",
    role: "Auto-reconcile",
    a: "Reconciled meter readings · Aichi",
    ref: "8 invoices",
    icon: CheckCircle2,
  },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [range, setRange] = useState<"FY26" | "FY25" | "QTD">("FY26");
  const [activeSite, setActiveSite] = useState<string | null>("NGY");
  const active = SITES.find((s) => s.code === activeSite);

  return (
    <main className="mx-auto max-w-[1320px] px-6 py-10 md:px-10 md:py-12">
      {/* Header strip */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#7CA982]">
            Console · Yamaichi Industries Co. Ltd. · ヤマイチ
          </div>
          <h1
            className="mt-2 text-[clamp(1.8rem,3.6vw,2.8rem)] leading-tight"
            style={{ fontFamily: "var(--aizu-display)" }}
          >
            Carbon ledger — {range}
          </h1>
          <div className="mt-1 inline-flex items-center gap-2 text-[12px] text-[#E8F0EA]/60">
            <span className="inline-flex h-2 w-2 rounded-full bg-[#7CA982] animate-pulse" />
            Live · 7 sites reporting · 142 sources
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-md border border-[#E8F0EA]/15 p-0.5">
            {(["FY26", "FY25", "QTD"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`rounded-sm px-3 py-1.5 text-xs font-medium transition-colors ${
                  range === r
                    ? "bg-[#7CA982] text-[#0C1410]"
                    : "text-[#E8F0EA]/70 hover:text-[#E8F0EA]"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <button className="inline-flex items-center gap-2 rounded-md border border-[#E8F0EA]/15 px-3 py-2 text-xs hover:bg-[#E8F0EA]/[0.04]">
            <Download size={13} />
            Export TCFD pack
          </button>
          <Link
            href="/demos/aizu/submit"
            className="inline-flex items-center gap-2 rounded-md bg-[#7CA982] px-3 py-2 text-xs font-medium text-[#0C1410] hover:bg-[#A7D8B0]"
          >
            <Plus size={13} />
            New reading
          </Link>
        </div>
      </div>

      {/* KPI ribbon */}
      <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-[#E8F0EA]/10 bg-[#E8F0EA]/10 md:grid-cols-4">
        {[
          { l: "Total FY26", v: "84,212", u: "tCO₂e", d: -7.4 },
          { l: "Scope 1", v: "31,008", u: "tCO₂e", d: -2.1 },
          { l: "Scope 2", v: "28,719", u: "tCO₂e", d: -11.6 },
          { l: "Scope 3", v: "24,485", u: "tCO₂e", d: -8.0 },
        ].map((k) => (
          <div key={k.l} className="bg-[#0F1B16] p-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#E8F0EA]/55">
              {k.l}
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span
                className="text-3xl"
                style={{ fontFamily: "var(--aizu-display)" }}
              >
                {k.v}
              </span>
              <span className="text-xs text-[#E8F0EA]/55">{k.u}</span>
            </div>
            <div className="mt-2 inline-flex items-center gap-1 text-xs text-[#7CA982]">
              <ArrowDownRight size={12} />
              {Math.abs(k.d)}% vs prior year
            </div>
          </div>
        ))}
      </div>

      {/* MAP + active-site rail */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-md border border-[#E8F0EA]/10 bg-[#0F1B16] p-6 md:p-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#E8F0EA]/55">
                Emissions by site · 日本国内拠点
              </div>
              <div
                className="mt-1.5 text-lg"
                style={{ fontFamily: "var(--aizu-display)" }}
              >
                Where the tCO₂e lives
              </div>
            </div>
            <Legend />
          </div>

          <JapanMap
            sites={SITES}
            activeCode={activeSite}
            onPick={setActiveSite}
          />
        </div>

        {/* Active site detail */}
        <div className="rounded-md border border-[#E8F0EA]/10 bg-[#0F1B16] p-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#E8F0EA]/55">
            Active site
          </div>
          {active ? (
            <>
              <div
                className="mt-1.5 text-2xl"
                style={{ fontFamily: "var(--aizu-display)" }}
              >
                {active.city}
              </div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[#7CA982]">
                {active.code}
              </div>

              <div className="mt-5 rounded-md border border-[#7CA982]/30 bg-[#7CA982]/8 p-4">
                <div className="text-[10px] uppercase tracking-[0.18em] text-[#E8F0EA]/55">
                  Emissions FYTD
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span
                    className="text-3xl text-[#A7D8B0]"
                    style={{ fontFamily: "var(--aizu-display)" }}
                  >
                    {active.v.toLocaleString()}
                  </span>
                  <span className="text-xs text-[#E8F0EA]/55">tCO₂e</span>
                </div>
              </div>

              <dl className="mt-5 space-y-3 text-sm">
                <Row k="Lead" v="Yuki Matsumoto" />
                <Row k="Last reading" v="2026-04-12" mono />
                <Row k="Open issues" v="2" />
                <Row k="Next deadline" v="May 15" />
              </dl>

              <Link
                href="/demos/aizu/submit"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md border border-[#7CA982]/40 bg-[#7CA982]/15 px-3 py-2.5 text-xs font-medium text-[#A7D8B0] hover:bg-[#7CA982]/25"
              >
                Submit reading for this site
                <ChevronRight size={13} />
              </Link>
            </>
          ) : (
            <div className="mt-4 text-sm text-[#E8F0EA]/55">
              Tap a node on the map to inspect a site.
            </div>
          )}
        </div>
      </div>

      {/* HEATMAP + WATERFALL */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.2fr]">
        {/* Calendar heatmap */}
        <div className="rounded-md border border-[#E8F0EA]/10 bg-[#0F1B16] p-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#E8F0EA]/55">
            Daily intensity · last 14 weeks
          </div>
          <div
            className="mt-1.5 text-lg"
            style={{ fontFamily: "var(--aizu-display)" }}
          >
            Emission heatmap
          </div>

          <Heatmap cells={HEATMAP} />

          <div className="mt-4 flex items-center justify-between text-[11px] text-[#E8F0EA]/55">
            <span>Less</span>
            <div className="flex items-center gap-0.5">
              {[0.15, 0.35, 0.55, 0.75, 0.95].map((v, i) => (
                <span
                  key={i}
                  className="h-3 w-5 rounded-sm"
                  style={{ background: heatColor(v) }}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>

        {/* Waterfall */}
        <div className="rounded-md border border-[#E8F0EA]/10 bg-[#0F1B16] p-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#E8F0EA]/55">
            FY25 → FY26 reconciliation
          </div>
          <div
            className="mt-1.5 text-lg"
            style={{ fontFamily: "var(--aizu-display)" }}
          >
            What changed
          </div>
          <Waterfall data={WATERFALL} />
        </div>
      </div>

      {/* AUDIT TRAIL */}
      <div className="mt-6 overflow-hidden rounded-md border border-[#E8F0EA]/10 bg-[#0F1B16]">
        <div className="flex items-center justify-between border-b border-[#E8F0EA]/10 px-6 py-5">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#E8F0EA]/55">
              Activity · today
            </div>
            <div
              className="mt-1 text-lg"
              style={{ fontFamily: "var(--aizu-display)" }}
            >
              Audit trail
            </div>
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-md border border-[#E8F0EA]/15 px-3 py-1.5 text-xs hover:bg-[#E8F0EA]/[0.04]">
            <UserCog size={12} />
            Export journal
          </button>
        </div>

        <ol className="relative">
          {AUDIT.map((e, i) => (
            <li
              key={i}
              className="grid grid-cols-[80px_36px_1fr_auto] items-start gap-4 border-b border-[#E8F0EA]/8 px-6 py-4 last:border-b-0"
            >
              <span className="pt-0.5 font-mono text-[11px] text-[#E8F0EA]/55">
                {e.at}
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#7CA982]/15 text-[#7CA982]">
                <e.icon size={13} />
              </span>
              <div>
                <div className="text-sm">{e.a}</div>
                <div className="mt-0.5 text-[11px] text-[#E8F0EA]/55">
                  {e.who} · {e.role}
                </div>
              </div>
              <span className="self-center rounded bg-[#E8F0EA]/[0.06] px-2 py-1 font-mono text-[10px] text-[#A7D8B0]">
                {e.ref}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}

// ─── Subcomponents ───────────────────────────────────────────────────────────

function heatColor(v: number) {
  // green-on-dark scale from 0 to 1
  if (v < 0.2) return "rgba(124,169,130,0.12)";
  if (v < 0.4) return "rgba(124,169,130,0.32)";
  if (v < 0.6) return "rgba(124,169,130,0.55)";
  if (v < 0.8) return "rgba(167,216,176,0.78)";
  return "rgba(167,216,176,1)";
}

function Heatmap({ cells }: { cells: number[] }) {
  // 14 weeks × 7 days
  return (
    <div className="mt-6">
      <div className="grid grid-cols-[20px_1fr] gap-3">
        <div className="flex flex-col justify-between py-1 text-[9px] text-[#E8F0EA]/45">
          {["M", "W", "F", "S"].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
        <div className="grid grid-rows-7 grid-flow-col gap-1.5">
          {cells.map((v, i) => (
            <div
              key={i}
              className="aspect-square rounded-[3px]"
              style={{ background: heatColor(v) }}
              title={`Day ${i + 1} · ${(v * 100).toFixed(0)}%`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Waterfall({
  data,
}: {
  data: { l: string; v: number; type: "base" | "down" | "total" }[];
}) {
  let cum = 0;
  const bars = data.map((d) => {
    if (d.type === "base") {
      cum = d.v;
      return { ...d, top: 0, val: d.v, cum: d.v };
    }
    if (d.type === "total") {
      return { ...d, top: 0, val: d.v, cum: d.v };
    }
    const prev = cum;
    cum += d.v;
    return { ...d, top: cum, val: -d.v, cum };
  });
  const max = Math.max(...data.map((d) => (d.type !== "down" ? d.v : 0)));

  return (
    <div className="mt-6 space-y-3">
      {bars.map((b, i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="w-44 text-[12px] text-[#E8F0EA]/70">{b.l}</div>
          <div className="relative h-8 flex-1 rounded-sm bg-[#E8F0EA]/[0.04]">
            {b.type === "base" || b.type === "total" ? (
              <div
                className={`absolute inset-y-0 left-0 rounded-sm ${
                  b.type === "total"
                    ? "bg-[#7CA982]"
                    : "bg-[#E8F0EA]/25"
                }`}
                style={{ width: `${(b.v / max) * 100}%` }}
              />
            ) : (
              <div
                className="absolute inset-y-1 rounded-sm bg-[#A7D8B0]/35"
                style={{
                  left: `${(b.top / max) * 100}%`,
                  width: `${(b.val / max) * 100}%`,
                  minWidth: "8px",
                }}
              />
            )}
          </div>
          <div
            className={`w-20 text-right font-mono text-[12px] ${
              b.type === "down"
                ? "text-[#A7D8B0]"
                : b.type === "total"
                ? "text-[#A7D8B0]"
                : "text-[#E8F0EA]/85"
            }`}
          >
            {b.type === "down" ? "−" : ""}
            {Math.abs(b.v).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}

function JapanMap({
  sites,
  activeCode,
  onPick,
}: {
  sites: typeof SITES;
  activeCode: string | null;
  onPick: (code: string) => void;
}) {
  // A hand-drawn stylised silhouette of Japan's main islands.
  // Not geographically perfect — designed to read as "Japan" and host pins.
  return (
    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[1.5fr_1fr] md:gap-8">
      <div className="relative aspect-[5/4] overflow-hidden rounded-md border border-[#E8F0EA]/10 bg-[#0C1410]">
        {/* Grid backdrop */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(#E8F0EA 1px, transparent 1px), linear-gradient(90deg, #E8F0EA 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Glow under map */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[60px]"
          style={{
            background:
              "radial-gradient(closest-side, rgba(124,169,130,0.5), transparent 70%)",
          }}
        />
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
        >
          {/* Hokkaido */}
          <path
            d="M 78 14 Q 86 12 92 18 Q 94 24 90 28 Q 84 32 80 28 Q 74 24 78 14 Z"
            fill="rgba(124,169,130,0.18)"
            stroke="rgba(167,216,176,0.55)"
            strokeWidth="0.3"
          />
          {/* Honshu */}
          <path
            d="M 70 36 Q 76 38 80 44 Q 86 50 84 56 Q 78 62 70 64 Q 62 64 56 60 Q 50 56 50 54 Q 50 50 56 50 Q 60 48 64 44 Q 66 38 70 36 Z"
            fill="rgba(124,169,130,0.22)"
            stroke="rgba(167,216,176,0.55)"
            strokeWidth="0.3"
          />
          {/* Shikoku */}
          <path
            d="M 52 64 Q 56 64 56 66 Q 56 68 52 68 Q 48 68 48 66 Q 48 64 52 64 Z"
            fill="rgba(124,169,130,0.2)"
            stroke="rgba(167,216,176,0.55)"
            strokeWidth="0.3"
          />
          {/* Kyushu */}
          <path
            d="M 40 70 Q 46 70 46 76 Q 44 82 38 82 Q 34 80 34 76 Q 34 72 40 70 Z"
            fill="rgba(124,169,130,0.2)"
            stroke="rgba(167,216,176,0.55)"
            strokeWidth="0.3"
          />
        </svg>

        {/* Pins */}
        {sites.map((s) => {
          const active = s.code === activeCode;
          const size = 6 + s.intensity * 6;
          return (
            <button
              key={s.code}
              onClick={() => onPick(s.code)}
              className="absolute group"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              title={`${s.city} · ${s.v.toLocaleString()} tCO₂e`}
            >
              {/* Ripple for active */}
              {active && (
                <span
                  aria-hidden
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-[#A7D8B0]/55"
                  style={{ width: size * 3, height: size * 3 }}
                />
              )}
              <span
                className="relative block rounded-full border transition-transform group-hover:scale-110"
                style={{
                  width: size,
                  height: size,
                  background: active ? "#A7D8B0" : "rgba(167,216,176,0.7)",
                  borderColor: active
                    ? "#FFFFFF"
                    : "rgba(167,216,176,0.4)",
                  boxShadow: active
                    ? "0 0 16px rgba(167,216,176,0.7)"
                    : "0 0 0 rgba(0,0,0,0)",
                }}
              />
              <span
                className={`pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded bg-[#0C1410]/90 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider ${
                  active ? "text-[#A7D8B0]" : "text-[#E8F0EA]/55"
                }`}
              >
                {s.code}
              </span>
            </button>
          );
        })}
      </div>

      {/* Sites legend list */}
      <ul className="grid grid-cols-1 gap-1.5">
        {sites.map((s) => {
          const active = s.code === activeCode;
          return (
            <li key={s.code}>
              <button
                onClick={() => onPick(s.code)}
                className={`flex w-full items-center justify-between gap-3 rounded-md border px-3 py-2.5 text-left text-sm transition-colors ${
                  active
                    ? "border-[#A7D8B0]/40 bg-[#7CA982]/10"
                    : "border-[#E8F0EA]/8 hover:border-[#E8F0EA]/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="font-mono text-[10px] uppercase tracking-wider text-[#7CA982]"
                  >
                    {s.code}
                  </span>
                  <span className={active ? "text-[#E8F0EA]" : "text-[#E8F0EA]/85"}>
                    {s.city}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#E8F0EA]/65">
                  {s.v.toLocaleString()}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Legend() {
  return (
    <div className="flex items-center gap-3 text-[11px] text-[#E8F0EA]/65">
      <span className="inline-flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#A7D8B0]" />
        Active
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#7CA982]/70" />
        Reporting
      </span>
    </div>
  );
}

function Row({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-[#E8F0EA]/8 pb-2 last:border-b-0 last:pb-0">
      <span className="text-[11px] uppercase tracking-[0.16em] text-[#E8F0EA]/55">
        {k}
      </span>
      <span className={mono ? "font-mono text-xs text-[#E8F0EA]/85" : ""}>
        {v}
      </span>
    </div>
  );
}
