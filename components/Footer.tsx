import { Logo, Wordmark } from "./Logo";

const cols = [
  {
    title: "Studio",
    links: [
      { label: "Work", href: "#work" },
      { label: "Services", href: "#services" },
      { label: "Process", href: "#studio" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Disciplines",
    links: [
      { label: "Design", href: "#services" },
      { label: "Engineering", href: "#services" },
      { label: "Cloud & Infra", href: "#services" },
      { label: "AI", href: "#services" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--line)] pb-8 pt-16 sm:pb-10 sm:pt-20">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-12 md:gap-10">
          {/* Brand block */}
          <div className="sm:col-span-2 md:col-span-5">
            <Logo markSize={24} wordClassName="text-[21px]" />
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-paper-50/55">
              The quiet machinery behind loud products. We build and own the
              parts of software other people can&apos;t see — and won&apos;t
              touch.
            </p>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.title} className="col-span-1 md:col-span-2">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper-50/45">
                {col.title}
              </div>
              <ul className="mt-5 flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="group inline-flex items-center gap-2 text-[13px] text-paper-50/65 transition-colors hover:text-paper-50"
                    >
                      <span className="h-2.5 w-[2px] rounded-[1px] bg-paper-50/25 transition-colors group-hover:bg-violet-400" />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Oversized ghost wordmark */}
        <div aria-hidden className="mt-16 select-none sm:mt-20 md:mt-24">
          <div className="font-display text-[clamp(2.5rem,15.5vw,15rem)] font-extrabold uppercase leading-none tracking-[-0.04em] text-paper-50/[0.06]">
            ULTRAVI<span className="text-violet-400/25">0</span>LET
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-[var(--line)] pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-paper-50/45 md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} Ultravi0let — Dubai</div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_10px_#9E6DFF]" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
