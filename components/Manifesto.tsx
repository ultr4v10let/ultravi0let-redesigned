"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Wordmark } from "./Logo";

const sentence =
  "We are a senior-only studio. We build the quiet layer that carries the most value — precise, restrained, and a little rare. If it feels quiet, exact, and uncommon, it is right.";
const words = sentence.split(" ");
// words that should land in signal violet as the line resolves
const accent = new Set(["quiet", "layer", "quiet,", "exact,", "uncommon,"]);

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "center 55%"],
  });

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden border-y border-[var(--line)] py-14 sm:py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 md:px-10">
        <div className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-paper-50/50 sm:mb-8">
          <span className="h-px w-10 bg-[var(--line-strong)]" />
          A short note
        </div>

        <p className="font-display text-[clamp(1.5rem,4.6vw,3.75rem)] font-medium leading-[1.15] tracking-tight">
          {words.map((w, i) => {
            const start = (i / words.length) * 0.85;
            const end = start + 0.18;
            return (
              <Word
                key={i}
                progress={scrollYProgress}
                range={[start, end]}
                accent={accent.has(w.toLowerCase())}
              >
                {w}
              </Word>
            );
          })}
        </p>

        <div className="mt-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-paper-50/50">
          <span>Founders,</span>
          <Wordmark className="text-[13px] text-paper-50/70" />
        </div>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
  accent,
}: {
  children: React.ReactNode;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
  accent?: boolean;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={`mr-[0.25em] inline-block ${
        accent ? "text-violet-400" : "text-paper-50"
      }`}
    >
      {children}
    </motion.span>
  );
}
