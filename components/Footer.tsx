"use client";

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
    <footer className="relative overflow-hidden border-t border-ink-950/[0.06] uv-footer pt-16 pb-8 sm:pt-20 sm:pb-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-violet-500/[0.04] blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-32 h-64 w-64 rounded-full bg-ink-950/[0.02] blur-[90px]"
      />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-12 md:gap-10">
          <div className="sm:col-span-2 md:col-span-7">
            <div className="flex items-center gap-3">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                aria-hidden
              >
                <defs>
                  <linearGradient id="fl" x1="0" y1="0" x2="32" y2="32">
                    <stop offset="0" stopColor="#7C3AED" />
                    <stop offset="1" stopColor="#4C1D95" />
                  </linearGradient>
                </defs>
                <path
                  d="M6 4l10 24L26 4"
                  stroke="url(#fl)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="16" cy="14" r="2.2" fill="url(#fl)" />
              </svg>
              <span className="font-display text-2xl tracking-verytight text-ink-950">
                ultravi
                <span className="serif-italic text-accent">0</span>
                let
              </span>
            </div>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ink-950/55">
              Digital craft, engineered. We turn ideas into systems that ship,
              scale, and stay up.
            </p>
          </div>

          {cols.map((col) => (
            <div key={col.title} className="col-span-1 md:col-span-2 md:col-start-auto">
              <div className="text-[11px] uppercase tracking-[0.18em] text-ink-950/60">
                {col.title}
              </div>
              <ul className="mt-5 flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="group inline-flex items-center gap-2 text-sm text-ink-950/75 transition-colors hover:text-ink-950"
                    >
                      <span className="h-1 w-1 rounded-full bg-violet-500/35 transition-colors group-hover:bg-violet-600 group-hover:shadow-[0_0_8px_rgba(109,40,217,0.55)]" />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          aria-hidden
          className="mt-16 select-none overflow-hidden sm:mt-20 md:mt-24"
        >
          <div className="uv-footer-mark-light font-display text-[clamp(3.25rem,16vw,17rem)] leading-[0.85] tracking-tightest">
            ULTRAVI<span className="serif-italic">0</span>LET
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-ink-950/[0.06] pt-6 text-xs text-ink-950/55 md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} Ultravi0let. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-600/70 shadow-[0_0_8px_rgba(109,40,217,0.35)]" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
