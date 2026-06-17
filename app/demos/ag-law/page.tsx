import Link from "next/link";
import { ArrowUpRight, Award, BookOpen, Scale, Users } from "lucide-react";

const practiceAreas = [
  {
    icon: Scale,
    title: "Corporate & M&A",
    desc: "Cross-border acquisitions, private equity, joint ventures and complex restructurings.",
  },
  {
    icon: BookOpen,
    title: "Banking & Finance",
    desc: "Syndicated lending, Islamic finance, capital markets and regulatory matters.",
  },
  {
    icon: Users,
    title: "Dispute Resolution",
    desc: "Commercial arbitration, white-collar defense and international litigation.",
  },
  {
    icon: Award,
    title: "Energy & Infrastructure",
    desc: "Upstream, midstream and renewables — concession agreements to project finance.",
  },
];

const insights = [
  {
    date: "March 2026",
    tag: "Brief",
    title:
      "Egypt's new competition framework: what foreign investors should expect",
  },
  {
    date: "February 2026",
    tag: "Note",
    title: "FRA Decree 142 — practical implications for fintech licensees",
  },
  {
    date: "January 2026",
    tag: "Article",
    title: "Restructuring under the New Bankruptcy Law: lessons from 2025",
  },
];

export default function AgLawHome() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#0F1A33]/10">
        <div className="absolute inset-0 -z-10 opacity-[0.04]" aria-hidden>
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(#0F1A33 1px, transparent 1px), linear-gradient(90deg, #0F1A33 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>
        <div className="mx-auto max-w-[1240px] px-6 py-24 md:px-10 md:py-32">
          <div className="text-[11px] uppercase tracking-[0.28em] text-[#B89466]">
            Established Cairo · 1986
          </div>
          <h1
            className="mt-6 text-[clamp(2.6rem,7vw,6rem)] leading-[1.05] tracking-tight"
            style={{ fontFamily: "var(--agl-display)", color: "#0F1A33" }}
          >
            Counsel of <em>distinction</em>
            <br />
            for matters of consequence.
          </h1>
          <p className="mt-10 max-w-xl text-base leading-relaxed text-[#0F1A33]/75 md:text-lg">
            A senior practice serving leading institutions, sovereign clients
            and family offices across Egypt, the Levant and the Gulf. Sixty
            attorneys across four practice groups. Ranked Band 1 by Chambers
            Global since 2018.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/demos/ag-law/book"
              className="inline-flex items-center gap-2 rounded-sm bg-[#0F1A33] px-6 py-3.5 text-[12px] uppercase tracking-[0.2em] text-[#F6F1E6] transition-colors hover:bg-[#B89466]"
            >
              Request a consultation
              <ArrowUpRight size={14} />
            </Link>
            <Link
              href="/demos/ag-law/attorneys"
              className="inline-flex items-center gap-2 rounded-sm border border-[#0F1A33]/40 px-6 py-3.5 text-[12px] uppercase tracking-[0.2em] text-[#0F1A33] transition-colors hover:bg-[#0F1A33]/5"
            >
              Meet the attorneys
            </Link>
          </div>

          {/* Stat strip */}
          <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-[#0F1A33]/10 bg-[#0F1A33]/10 md:grid-cols-4">
            {[
              { v: "40+", k: "Years in practice" },
              { v: "60", k: "Attorneys" },
              { v: "06", k: "Languages of counsel" },
              { v: "Band 1", k: "Chambers Global" },
            ].map((s) => (
              <div
                key={s.k}
                className="bg-[#F6F1E6] p-6"
                style={{ fontFamily: "var(--agl-sans)" }}
              >
                <div
                  className="text-3xl font-medium md:text-4xl"
                  style={{ fontFamily: "var(--agl-display)", color: "#0F1A33" }}
                >
                  {s.v}
                </div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-[#0F1A33]/65">
                  {s.k}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice areas */}
      <section id="practice" className="mx-auto max-w-[1240px] px-6 py-24 md:px-10 md:py-32">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-[11px] uppercase tracking-[0.28em] text-[#B89466]">
              Practice
            </div>
            <h2
              className="mt-3 text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.05]"
              style={{ fontFamily: "var(--agl-display)" }}
            >
              Four pillars.
            </h2>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-[#0F1A33]/10 bg-[#0F1A33]/10 md:grid-cols-2">
          {practiceAreas.map((p) => (
            <div
              key={p.title}
              className="group flex flex-col gap-5 bg-[#F6F1E6] p-8 transition-colors hover:bg-[#EFE7D5] md:p-10"
            >
              <div className="flex items-center justify-between">
                <p.icon size={22} strokeWidth={1.4} className="text-[#B89466]" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#0F1A33]/50">
                  Practice group
                </span>
              </div>
              <h3
                className="text-3xl"
                style={{ fontFamily: "var(--agl-display)" }}
              >
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#0F1A33]/70">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Quote pull */}
      <section className="border-y border-[#0F1A33]/10 bg-[#0F1A33] text-[#F6F1E6]">
        <div className="mx-auto max-w-[1100px] px-6 py-24 md:px-10 md:py-32">
          <div className="text-[11px] uppercase tracking-[0.28em] text-[#B89466]">
            From the senior partner
          </div>
          <blockquote
            className="mt-8 text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.25]"
            style={{ fontFamily: "var(--agl-display)" }}
          >
            <em>&ldquo;Our work has never been measured in hours billed.
            It is measured in the consequence of the matters our clients
            entrust to us, and in the discretion with which we resolve
            them.&rdquo;</em>
          </blockquote>
          <div className="mt-10 text-sm uppercase tracking-[0.2em] text-[#F6F1E6]/65">
            Ahmed Abdelgawad · Senior Partner
          </div>
        </div>
      </section>

      {/* Insights */}
      <section id="insights" className="mx-auto max-w-[1240px] px-6 py-24 md:px-10 md:py-32">
        <div className="text-[11px] uppercase tracking-[0.28em] text-[#B89466]">
          Insights
        </div>
        <h2
          className="mt-3 text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.05]"
          style={{ fontFamily: "var(--agl-display)" }}
        >
          Recent commentary.
        </h2>

        <ul className="mt-12 divide-y divide-[#0F1A33]/10 border-y border-[#0F1A33]/10">
          {insights.map((i) => (
            <li
              key={i.title}
              className="group flex flex-col gap-2 py-6 transition-colors hover:bg-[#0F1A33]/[0.02] md:flex-row md:items-baseline md:gap-12 md:px-2"
            >
              <div className="w-32 shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-[#0F1A33]/55">
                {i.date}
              </div>
              <div className="w-20 shrink-0 text-[11px] uppercase tracking-[0.2em] text-[#B89466]">
                {i.tag}
              </div>
              <div
                className="text-lg leading-snug md:text-xl"
                style={{ fontFamily: "var(--agl-display)" }}
              >
                {i.title}
              </div>
              <ArrowUpRight
                size={16}
                className="hidden text-[#0F1A33]/30 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#0F1A33] md:ml-auto md:block"
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
