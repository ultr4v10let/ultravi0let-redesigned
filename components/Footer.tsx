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
    <footer className="on-dark relative overflow-hidden border-t border-white/10 bg-ink-950 pt-16 pb-8 text-paper-50 sm:pt-20 sm:pb-10">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-12 md:gap-10">
          {/* Brand block */}
          <div className="sm:col-span-2 md:col-span-5">
            <div className="flex items-center gap-3">
              <img
                src="/Ultraviolet-logo.png"
                alt=""
              />
            </div>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-paper-50/60">
              Digital craft, engineered. We turn ideas into systems that ship, scale, and stay up.
            </p>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.title} className="col-span-1 md:col-span-2 md:col-start-auto">
              <div className="text-[11px] uppercase tracking-[0.18em] text-paper-50/60">{col.title}</div>
              <ul className="mt-5 flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="group inline-flex items-center gap-2 text-sm text-paper-50/70 transition-colors hover:text-paper-50"
                    >
                      <span className="h-1 w-1 rounded-full bg-paper-50/30 transition-colors group-hover:bg-accent-soft" />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Oversized mark — gradient violet outline (matches the buttons) */}
        <div aria-hidden className="mt-16 select-none sm:mt-20 md:mt-24">
          <svg viewBox="0 0 1200 230" className="w-full" aria-hidden focusable="false">
            <defs>
              <linearGradient id="uv-outline" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7C3AED" />
                <stop offset="60%" stopColor="#C026D3" />
                <stop offset="100%" stopColor="#E879F9" />
              </linearGradient>
            </defs>
            <text
              x="600"
              y="185"
              textAnchor="middle"
              textLength="1180"
              lengthAdjust="spacingAndGlyphs"
              fill="none"
              stroke="url(#uv-outline)"
              strokeWidth="1.6"
              style={{
                fontFamily: "var(--font-instrument), Georgia, serif",
                fontSize: "210px",
                letterSpacing: "-0.03em",
              }}
            >
              ULTRAVI<tspan fontStyle="italic">0</tspan>LET
            </text>
          </svg>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-paper-50/55 md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} Ultravi0let. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
