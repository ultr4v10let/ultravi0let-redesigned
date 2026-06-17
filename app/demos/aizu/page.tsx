import Link from "next/link";
import {
  ArrowRight,
  Cpu,
  Database,
  FileCheck2,
  LineChart,
  ShieldCheck,
} from "lucide-react";

const stats = [
  { v: "142", k: "Listed companies onboarded" },
  { v: "ISO 14064", k: "Methodology certified" },
  { v: "TCFD", k: "Aligned disclosures" },
  { v: "99.99%", k: "Audit log uptime" },
];

const features = [
  {
    i: Database,
    t: "Scope 1 / 2 / 3 ingestion",
    d: "Pull invoice-level fuel, electricity and travel data from SAP, Oracle and 30+ providers. Reconcile against meter readings automatically.",
  },
  {
    i: Cpu,
    t: "Continuous calculation engine",
    d: "Apply MOEJ-published emission factors with audit trail. Recalculate retroactively when factors are revised.",
  },
  {
    i: FileCheck2,
    t: "TCFD report generation",
    d: "Generate the full disclosure pack — Japanese and English — ready for submission to the Ministry of Economy or the Tokyo Stock Exchange.",
  },
  {
    i: ShieldCheck,
    t: "Third-party assurance ready",
    d: "Immutable journal, file-level lineage and read-only auditor accounts for your assurance partner.",
  },
];

export default function AizuHome() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#E8F0EA]/10">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-0 -z-0 h-[600px] w-[800px] opacity-25 blur-[80px]"
          style={{
            background:
              "radial-gradient(closest-side, #7CA982 0%, transparent 65%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(#E8F0EA 1px, transparent 1px), linear-gradient(90deg, #E8F0EA 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative mx-auto max-w-[1280px] px-6 py-20 md:px-10 md:py-28">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#7CA982]">
            <span className="h-px w-10 bg-[#7CA982]" />
            Tokyo · Carbon disclosure platform
          </div>
          <h1
            className="mt-8 text-[clamp(2.6rem,6vw,5.5rem)] leading-[1.02] tracking-tight"
            style={{ fontFamily: "var(--aizu-display)" }}
          >
            Greenhouse-gas disclosure,
            <br />
            <span className="text-[#7CA982]">automated end-to-end.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-[#E8F0EA]/75 md:text-lg">
            Aizu ingests your invoices, meter readings and procurement data,
            runs them against the latest MOEJ emission factors, and produces
            a TCFD-aligned disclosure pack — ready for the Tokyo Stock
            Exchange and the Ministry of Economy.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/demos/aizu/dashboard"
              className="inline-flex items-center gap-2 rounded-md bg-[#7CA982] px-6 py-3.5 text-sm font-medium text-[#0C1410] transition-colors hover:bg-[#A7D8B0]"
            >
              View live console
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/demos/aizu/submit"
              className="inline-flex items-center gap-2 rounded-md border border-[#E8F0EA]/20 px-6 py-3.5 text-sm font-medium text-[#E8F0EA] transition-colors hover:bg-[#E8F0EA]/[0.04]"
            >
              Submit Q1 reading
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-[#E8F0EA]/10 bg-[#E8F0EA]/10 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.k} className="bg-[#0C1410] p-6">
                <div
                  className="text-3xl font-medium md:text-4xl"
                  style={{ fontFamily: "var(--aizu-display)" }}
                >
                  {s.v}
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#E8F0EA]/55">
                  {s.k}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform */}
      <section id="platform" className="border-b border-[#E8F0EA]/10">
        <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-10 md:py-28">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#7CA982]">
            Platform
          </div>
          <h2
            className="mt-3 text-[clamp(2rem,4.4vw,3.6rem)] leading-tight"
            style={{ fontFamily: "var(--aizu-display)" }}
          >
            From ledger entry to auditor sign-off.
          </h2>

          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-[#E8F0EA]/10 bg-[#E8F0EA]/10 md:grid-cols-2">
            {features.map((f) => (
              <div key={f.t} className="bg-[#0C1410] p-8 md:p-10">
                <f.i size={22} strokeWidth={1.5} className="text-[#7CA982]" />
                <h3
                  className="mt-6 text-2xl"
                  style={{ fontFamily: "var(--aizu-display)" }}
                >
                  {f.t}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#E8F0EA]/70">
                  {f.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section id="compliance" className="bg-[#0F1B16]">
        <div className="mx-auto grid max-w-[1280px] gap-12 px-6 py-20 md:grid-cols-[1fr_1.2fr] md:px-10 md:py-28">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#7CA982]">
              Compliance
            </div>
            <h2
              className="mt-3 text-[clamp(2rem,4vw,3.4rem)] leading-tight"
              style={{ fontFamily: "var(--aizu-display)" }}
            >
              Built for Japan&apos;s
              <br />
              new disclosure regime.
            </h2>
            <p className="mt-6 text-[#E8F0EA]/70">
              Aizu&apos;s methodology mirrors the framework set by the
              Financial Services Agency and the Tokyo Stock Exchange for
              Prime Market issuers. Every calculation is traceable to a
              ministry-published factor table.
            </p>
            <Link
              href="/demos/aizu/dashboard"
              className="mt-8 inline-flex items-center gap-2 text-sm text-[#7CA982] hover:text-[#A7D8B0]"
            >
              Open dashboard
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Frameworks list */}
          <div className="overflow-hidden rounded-md border border-[#E8F0EA]/10 bg-[#0C1410]">
            <ul>
              {[
                { f: "TCFD", d: "Task Force on Climate-related Financial Disclosures · 2017" },
                { f: "ISO 14064-1", d: "GHG quantification and reporting · 2018" },
                { f: "MOEJ Guidance", d: "Greenhouse Gas Emissions Calculation Method · v6.2" },
                { f: "TSE Prime", d: "Listed company disclosure framework · effective FY2024" },
                { f: "SBTi", d: "Science Based Targets initiative · supplementary" },
              ].map((row) => (
                <li
                  key={row.f}
                  className="flex items-center justify-between border-b border-[#E8F0EA]/10 px-6 py-5 last:border-b-0"
                >
                  <div>
                    <div className="font-mono text-sm">{row.f}</div>
                    <div className="mt-0.5 text-[12px] text-[#E8F0EA]/55">
                      {row.d}
                    </div>
                  </div>
                  <LineChart size={16} className="text-[#7CA982]/60" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
