import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const demos = [
  {
    name: "AG Law",
    blurb: "Cairo law firm — practice management and booking.",
    href: "/demos/ag-law",
    sub: "aglaw.ultravi0let.com",
    swatch: ["#0F1A33", "#B89466"],
  },
  {
    name: "Lumen Health",
    blurb: "GCC telemedicine — find a doctor and book consultations.",
    href: "/demos/lumen-health",
    sub: "lumen.ultravi0let.com",
    swatch: ["#E8F1F1", "#1F6B5C"],
  },
  {
    name: "Aizu",
    blurb: "Carbon disclosure platform for Japanese corporates.",
    href: "/demos/aizu",
    sub: "aizu.ultravi0let.com",
    swatch: ["#0C1410", "#7CA982"],
  },
  {
    name: "Circle of Trust",
    blurb: "Rotating credit + smart contracts, KYC and payouts.",
    href: "/demos/circle-of-trust",
    sub: "circle.ultravi0let.com",
    swatch: ["#F2E6D9", "#B85138"],
  },
  {
    name: "Connect6",
    blurb: "Restaurant omnichannel CRM (IG, WA, Snap, X).",
    href: "/demos/connect6",
    sub: "connect6.ultravi0let.com",
    swatch: ["#0F1115", "#7C5CFF"],
  },
];

export const metadata = { title: "Demos · Ultravi0let" };

export default function DemoIndex() {
  return (
    <main className="mx-auto max-w-[1100px] px-6 py-20 md:py-28">
      <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-tightest text-ink-950">
        Client demos.
      </h1>
      <p className="mt-4 max-w-xl text-ink-900/75">
        Five interactive prototypes that mirror what we delivered. Locally
        reachable via the paths below; in production they live on dedicated
        subdomains.
      </p>

      <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
        {demos.map((d) => (
          <li key={d.name}>
            <Link
              href={d.href}
              className="group flex items-stretch gap-4 overflow-hidden rounded-2xl border border-ink-950/10 bg-paper-100/60 p-5 transition-colors hover:border-ink-950/25 hover:bg-paper-100"
            >
              <div
                aria-hidden
                className="h-auto w-1.5 shrink-0 rounded-full"
                style={{
                  background: `linear-gradient(180deg, ${d.swatch[0]}, ${d.swatch[1]})`,
                }}
              />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-display text-2xl tracking-verytight text-ink-950">
                      {d.name}
                    </div>
                    <div className="mt-1 text-sm text-ink-900/70">{d.blurb}</div>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="mt-1 shrink-0 text-ink-950/55 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink-950"
                  />
                </div>
                <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-950/55">
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
