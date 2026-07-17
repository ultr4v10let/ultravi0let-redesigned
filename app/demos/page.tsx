import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const demos = [
  {
    name: "AG Law",
    blurb: "Cairo law firm — practice management and booking.",
    href: "/demos/ag-law",
    sub: "aglaw.ultravi0let.com",
    swatch: ["#0F1A33", "#B89466"],
    type: "Delivered",
  },
  {
    name: "Merlin",
    blurb: "Dynamic company-site builder — themes, tabs and live preview.",
    href: "/demos/merlin",
    sub: "merlin.ultravi0let.com",
    swatch: ["#F4F6FB", "#3B5BDB"],
    type: "Delivered",
  },
  {
    name: "Zanobia Patisserie",
    blurb: "Patisserie ERP — factory, inventory, shops and admin.",
    href: "/demos/zanobia",
    sub: "zanobia.ultravi0let.com",
    swatch: ["#FBF6F0", "#8B5E4B"],
    type: "Prototype",
  },
  {
    name: "Maquette",
    blurb: "Print production — architectural, apparel and merchandise.",
    href: "/demos/maquette",
    sub: "maquette.ultravi0let.com",
    swatch: ["#14181F", "#F97316"],
    type: "Prototype",
  },
  {
    name: "Facet",
    blurb: "Field-specific portfolio builder — CS, architecture and medical.",
    href: "/demos/facet",
    sub: "facet.ultravi0let.com",
    swatch: ["#F7F4EF", "#E07A5F"],
    type: "Prototype",
  },
  // ── Previous demos (still reachable via direct URL) ───────────────────────
  // {
  //   name: "Lumen Health",
  //   blurb: "GCC telemedicine — find a doctor and book consultations.",
  //   href: "/demos/lumen-health",
  //   sub: "lumen.ultravi0let.com",
  //   swatch: ["#E8F1F1", "#1F6B5C"],
  //   type: "Prototype",
  // },
  // {
  //   name: "Aizu",
  //   blurb: "Carbon disclosure platform for Japanese corporates.",
  //   href: "/demos/aizu",
  //   sub: "aizu.ultravi0let.com",
  //   swatch: ["#0C1410", "#7CA982"],
  //   type: "Prototype",
  // },
  // {
  //   name: "Circle of Trust",
  //   blurb: "Rotating credit + smart contracts, KYC and payouts.",
  //   href: "/demos/circle-of-trust",
  //   sub: "circle.ultravi0let.com",
  //   swatch: ["#F2E6D9", "#B85138"],
  //   type: "Prototype",
  // },
  // {
  //   name: "Connect6",
  //   blurb: "Restaurant omnichannel CRM (IG, WA, Snap, X).",
  //   href: "/demos/connect6",
  //   sub: "connect6.ultravi0let.com",
  //   swatch: ["#0F1115", "#7C5CFF"],
  //   type: "Prototype",
  // },
];

export const metadata = { title: "Demos · Ultravi0let" };

export default function DemoIndex() {
  return (
    <main className="mx-auto min-w-0 max-w-[1100px] overflow-x-hidden px-5 py-16 sm:px-6 sm:py-20 md:py-28">
      <div className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-paper-50/50">
        <span className="h-3 w-px bg-[var(--line-strong)]" />
        Client demos
      </div>
      <h1 className="font-display text-[clamp(2rem,9vw,4.5rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.04em] text-paper-50">
        Client <span className="text-signal">demos</span>
      </h1>
      <p className="mt-4 max-w-xl text-pretty text-[15px] leading-relaxed text-paper-50/65 sm:text-base">
        Interactive prototypes that mirror what we delivered. Each includes an NDA disclaimer — locally via the paths below; in production
        on dedicated subdomains.
      </p>

      <ul className="mt-10 grid grid-cols-1 gap-3 sm:mt-12 sm:gap-4 md:grid-cols-2">
        {demos.map((d) => (
          <li key={d.name}>
            <Link
              href={d.href}
              className="panel group flex min-h-[44px] items-stretch gap-4 overflow-hidden rounded-2xl p-4 sm:p-5"
            >
              <div
                aria-hidden
                className="h-auto w-1.5 shrink-0 rounded-full"
                style={{
                  background: `linear-gradient(180deg, ${d.swatch[0]}, ${d.swatch[1]})`,
                }}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="font-display text-lg font-bold uppercase tracking-tight text-paper-50 sm:text-xl">{d.name}</div>
                      <span className="rounded-full border border-[var(--line)] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-paper-50/55">
                        {d.type}
                      </span>
                    </div>
                    <div className="mt-1 text-[13px] leading-relaxed text-paper-50/60">{d.blurb}</div>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="mt-1 shrink-0 text-paper-50/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-paper-50"
                  />
                </div>
                <div className="mt-3 truncate font-mono text-[10px] uppercase tracking-[0.16em] text-paper-50/45 sm:tracking-[0.18em]">
                  {d.sub}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
