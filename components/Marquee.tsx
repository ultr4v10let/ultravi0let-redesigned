"use client";

import { marqueeWords } from "@/lib/data";
import { SPECTRUM } from "./Logo";

export function Marquee() {
  const items = [...marqueeWords, ...marqueeWords];
  return (
    <section
      aria-hidden
      className="marquee-mask relative border-y border-[var(--line)] bg-white/[0.015] py-5 sm:py-7"
    >
      <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap sm:gap-12">
        {items.map((w, i) => (
          <span
            key={i}
            className="flex items-center gap-8 font-display text-[clamp(1.4rem,4vw,3.75rem)] font-extrabold uppercase leading-none tracking-tight text-paper-50/45 sm:gap-12"
          >
            {w}
            <Tick shift={i % SPECTRUM.length} />
          </span>
        ))}
      </div>
    </section>
  );
}

// A three-bar slice of the spectrum, cycling colour per word
function Tick({ shift }: { shift: number }) {
  return (
    <span className="inline-flex items-end gap-[3px]" aria-hidden>
      {[0, 1, 2].map((n) => (
        <span
          key={n}
          className="block h-[0.7em] w-[3px] rounded-[1px]"
          style={{ background: SPECTRUM[(shift + n) % SPECTRUM.length] }}
        />
      ))}
    </span>
  );
}
