"use client";

import { marqueeWords } from "@/lib/data";

export function Marquee() {
  const items = [...marqueeWords, ...marqueeWords];
  return (
    <section
      aria-hidden
      className="relative border-y border-bone-50/8 bg-ink-900/50 py-8 marquee-mask"
    >
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {items.map((w, i) => (
          <span
            key={i}
            className="flex items-center gap-12 font-display text-[clamp(2.5rem,5vw,5.5rem)] leading-none tracking-tightest text-bone-50/70"
          >
            {w}
            <Bullet />
          </span>
        ))}
      </div>
    </section>
  );
}

function Bullet() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
      <circle cx="7" cy="7" r="3" fill="#C4A5FF" />
    </svg>
  );
}
