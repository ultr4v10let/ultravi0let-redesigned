"use client";

import { Github, Instagram, Linkedin, Twitter } from "lucide-react";

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
  {
    title: "Elsewhere",
    links: [
      { label: "LinkedIn", href: "https://linkedin.com" },
      { label: "Instagram", href: "https://instagram.com" },
      { label: "GitHub", href: "https://github.com" },
      { label: "Twitter", href: "https://twitter.com" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink-950/10 bg-paper-50 pt-16 pb-8 sm:pt-20 sm:pb-10">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-12 md:gap-10">
          {/* Brand block */}
          <div className="sm:col-span-2 md:col-span-5">
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

            <div className="mt-8 flex items-center gap-2">
              {[Linkedin, Instagram, Github, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-950/10 text-ink-950/65 transition-colors hover:border-ink-950/25 hover:bg-ink-950/[0.04] hover:text-ink-950"
                >
                  <Icon size={15} strokeWidth={1.6} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div
              key={col.title}
              className="col-span-1 md:col-span-2 md:col-start-auto"
            >
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
                      <span className="h-1 w-1 rounded-full bg-ink-950/25 transition-colors group-hover:bg-accent" />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Oversized mark */}
        <div
          aria-hidden
          className="mt-16 select-none overflow-hidden sm:mt-20 md:mt-24"
        >
          <div className="font-display text-[clamp(3.25rem,16vw,17rem)] leading-[0.85] tracking-tightest text-transparent [-webkit-text-stroke:1px_rgba(14,10,31,0.22)]">
            ULTRAVI<span className="serif-italic">0</span>LET
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-ink-950/10 pt-6 text-xs text-ink-950/65 md:flex-row md:items-center">
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
