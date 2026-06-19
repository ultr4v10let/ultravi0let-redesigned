"use client";

import { marqueeWords } from "@/lib/data";

// Spectrum bullet colours — indigo → violet → fuchsia → pink, cycled per word
const spectrumDots = ["#3b82f6", "#6366f1", "#7c3aed", "#a855f7", "#c026d3", "#ec4899"];

export function Marquee() {
  const items = [...marqueeWords, ...marqueeWords];
  return (
    <section
      aria-hidden
      className="relative border-y border-ink-950/10 bg-paper-100/50 py-5 marquee-mask sm:py-8"
    >
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap sm:gap-12">
        {items.map((w, i) => (
          <span
            key={i}
            className="flex items-center gap-8 font-display text-[clamp(1.75rem,5vw,5.5rem)] leading-none tracking-tightest text-ink-950/70 sm:gap-12"
          >
            {w}
            <Bullet color={spectrumDots[i % spectrumDots.length]} />
          </span>
        ))}
      </div>
    </section>
  );
}

function Bullet({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
      <circle cx="7" cy="7" r="3" fill={color} />
    </svg>
  );
}
