"use client";

import { marqueeWords } from "@/lib/data";

export function Marquee() {
  const items = [...marqueeWords, ...marqueeWords];
  return (
    <section
      aria-hidden
      className="relative uv-band border-y border-violet-700/12 py-5 marquee-mask sm:py-8"
    >
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap sm:gap-12">
        {items.map((w, i) => (
          <span
            key={i}
            className="flex items-center gap-8 font-display text-[clamp(1.75rem,5vw,5.5rem)] leading-none tracking-tightest text-violet-950/75 sm:gap-12"
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
      <circle cx="7" cy="7" r="3" fill="#6D28D9" />
    </svg>
  );
}
