import Link from "next/link";
import {
  ArrowRight,
  Coffee,
  Layers,
  Ruler,
  Shirt,
} from "lucide-react";

const lines = [
  {
    icon: Ruler,
    title: "Architectural drawings",
    desc: "Large-format prints from A3 to A0 — CAD exports, mark-ups, presentation boards and site plans with colour calibration.",
    formats: "A3 · A2 · A1 · A0",
    tag: "Line 01",
  },
  {
    icon: Shirt,
    title: "Bulk apparel",
    desc: "Screen and DTG runs for senior parties, corporate events and team merchandise — sizing matrices and batch tracking.",
    formats: "50 — 5,000+ units",
    tag: "Line 02",
  },
  {
    icon: Coffee,
    title: "Merchandise & small format",
    desc: "Mugs, keychains, badges and promotional items — single artwork, many SKUs on a unified production queue.",
    formats: "Mugs · keys · badges",
    tag: "Line 03",
  },
];

export default function MaquetteHome() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-[#E8EAED]/10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#E8EAED 1px, transparent 1px), linear-gradient(90deg, #E8EAED 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="mx-auto max-w-[1320px] px-6 py-20 md:px-10 md:py-28">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#F97316]">
            Print production · three lines, one platform
          </div>
          <h1
            className="mt-6 text-[clamp(2.4rem,6vw,5rem)] font-bold uppercase leading-[0.95] tracking-tight"
            style={{ fontFamily: "var(--maq-display)" }}
          >
            From blueprint
            <br />
            to <span className="text-[#F97316]">bulk run.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-[#E8EAED]/75 md:text-lg">
            Maquette unifies architectural drawing output, high-volume apparel
            printing and small merchandise jobs — quoting, scheduling and
            fulfilment on a single production floor.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/demos/maquette/quote"
              className="inline-flex items-center gap-2 rounded-md bg-[#F97316] px-6 py-3.5 text-sm font-semibold text-[#14181F] hover:bg-[#FB923C]"
            >
              Get a quote
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/demos/maquette/orders"
              className="inline-flex items-center gap-2 rounded-md border border-[#E8EAED]/20 px-6 py-3.5 text-sm hover:bg-[#E8EAED]/[0.04]"
            >
              View order board
            </Link>
          </div>

          <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-[#E8EAED]/10 bg-[#E8EAED]/10 md:grid-cols-4">
            {[
              { v: "A0", k: "Max drawing size" },
              { v: "3", k: "Production lines" },
              { v: "48h", k: "Avg. arch turnaround" },
              { v: "2.4k", k: "Jobs / month" },
            ].map((s) => (
              <div key={s.k} className="bg-[#14181F] p-6">
                <div
                  className="text-3xl font-bold uppercase md:text-4xl"
                  style={{ fontFamily: "var(--maq-display)" }}
                >
                  {s.v}
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#E8EAED]/55">
                  {s.k}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="border-b border-[#E8EAED]/10 bg-[#1A1F28]">
        <div className="mx-auto max-w-[1320px] px-6 py-20 md:px-10 md:py-28">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#F97316]">
            <Layers size={14} />
            Production lines
          </div>
          <h2
            className="mt-3 text-[clamp(2rem,4vw,3.4rem)] font-bold uppercase leading-tight"
            style={{ fontFamily: "var(--maq-display)" }}
          >
            One queue. Three specialisms.
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {lines.map((line) => (
              <div
                key={line.title}
                className="rounded-lg border border-[#E8EAED]/10 bg-[#14181F] p-8 transition-colors hover:border-[#F97316]/40"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F97316]">
                  {line.tag}
                </div>
                <line.icon size={28} strokeWidth={1.5} className="mt-6 text-[#F97316]" />
                <h3
                  className="mt-6 text-2xl font-bold uppercase"
                  style={{ fontFamily: "var(--maq-display)" }}
                >
                  {line.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#E8EAED]/70">
                  {line.desc}
                </p>
                <div className="mt-6 font-mono text-xs text-[#E8EAED]/50">
                  {line.formats}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
