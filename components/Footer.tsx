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
    <footer className="relative overflow-hidden border-t border-bone-50/8 bg-ink-950 pt-20 pb-10">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-12">
          {/* Brand block */}
          <div className="col-span-2 md:col-span-5">
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
                    <stop offset="0" stopColor="#C4A5FF" />
                    <stop offset="1" stopColor="#7C3AED" />
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
              <span className="font-display text-2xl tracking-verytight text-bone-50">
                ultravi
                <span className="serif-italic text-accent">0</span>
                let
              </span>
            </div>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-bone-50/55">
              Digital craft, engineered. We turn ideas into systems that ship,
              scale, and stay up.
            </p>

            <div className="mt-8 flex items-center gap-2">
              {[Linkedin, Instagram, Github, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-bone-50/10 text-bone-50/65 transition-colors hover:border-bone-50/25 hover:bg-bone-50/[0.04] hover:text-bone-50"
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
              <div className="text-[11px] uppercase tracking-[0.18em] text-bone-50/40">
                {col.title}
              </div>
              <ul className="mt-5 flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="group inline-flex items-center gap-2 text-sm text-bone-50/75 transition-colors hover:text-bone-50"
                    >
                      <span className="h-1 w-1 rounded-full bg-bone-50/25 transition-colors group-hover:bg-accent" />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Address */}
          <div className="col-span-2 md:col-span-1">
            <div className="text-[11px] uppercase tracking-[0.18em] text-bone-50/40">
              HQ
            </div>
            <address className="mt-5 not-italic text-sm leading-relaxed text-bone-50/75">
              126 Baleegh Hamdy St.
              <br />
              Sherouq City
              <br />
              Cairo · Egypt
            </address>
          </div>
        </div>

        {/* Oversized mark */}
        <div
          aria-hidden
          className="mt-24 select-none overflow-hidden"
        >
          <div className="font-display text-[clamp(5rem,17vw,17rem)] leading-[0.85] tracking-tightest text-transparent [-webkit-text-stroke:1px_rgba(245,242,236,0.18)]">
            ULTRAVI<span className="serif-italic">0</span>LET
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-bone-50/8 pt-6 text-xs text-bone-50/45 md:flex-row md:items-center">
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
