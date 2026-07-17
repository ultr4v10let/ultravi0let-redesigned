"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { SpectrumMark, SPECTRUM } from "./Logo";

const transition = { duration: 1.1, ease: [0.16, 1, 0.3, 1] as const };

const readout = [
  ["EST.", "2022"],
  ["BASE", "DUBAI"],
  ["TEAM", "SENIOR-ONLY"],
  ["MODE", "REMOTE-FIRST"],
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate flex min-h-[100svh] min-h-[100dvh] items-end overflow-hidden pb-10 pt-[max(7rem,env(safe-area-inset-top)+5rem)] sm:pb-14 md:pb-16"
    >
      {/* Ambient vanishing spectrum — oversized, bleeding off the right edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-[-6%] -z-10 flex items-stretch gap-[2.2vw] opacity-[0.14] animate-scan md:right-[2%] md:gap-[1.6vw]"
      >
        {SPECTRUM.map((c, i) => (
          <span
            key={i}
            className="block w-[3.2vw] rounded-sm md:w-[2.1vw]"
            style={{ background: c }}
          />
        ))}
      </div>
      {/* fade the column into the ground on the left */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-ground via-ground/85 to-transparent"
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto w-full min-w-0 max-w-[1440px] px-5 sm:px-6 md:px-10"
      >
        {/* Technical eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.1 }}
          className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-paper-50/55 sm:mb-8"
        >
          <SpectrumMark size={14} animated />
          <span className="h-3 w-px bg-[var(--line-strong)]" />
          Product studio — the invisible layer
        </motion.div>

        {/* Headline */}
        <h1 className="font-display text-[clamp(1.85rem,10vw,5.25rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.04em] text-paper-50">
          <Line delay={0.18}>We build the</Line>
          <Line delay={0.28}>
            <span className="text-signal">quiet&nbsp;machinery</span>
          </Line>
          <Line delay={0.38}>
            behind <span className="text-paper-50/35">loud</span>
          </Line>
          <Line delay={0.46}>
            products
            <span className="ml-1 inline-block h-[0.78em] w-[0.42em] translate-y-[0.04em] bg-violet-400 animate-blink align-baseline" />
          </Line>
        </h1>

        {/* Statement + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.7 }}
          className="mt-7 flex w-full min-w-0 flex-col items-stretch gap-6 sm:mt-9 md:flex-row md:items-end md:justify-between md:gap-10"
        >
          <div className="min-w-0 max-w-xl space-y-4">
            <p className="text-pretty text-[15px] leading-relaxed text-paper-50/70 sm:text-base">
              A senior-only product studio that builds and owns the parts of
              software other people can&apos;t see — and won&apos;t touch.
              Design, engineering, cloud and AI, from first prototype to
              production.
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-paper-50/45 sm:text-[11px]">
              Design · Engineering · Cloud · AI
            </p>
          </div>

          <div className="flex w-full min-w-0 flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href="#contact"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-violet-600 px-6 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-paper-50 transition-colors hover:bg-violet-700 sm:w-auto sm:py-4"
            >
              Start a project
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:rotate-45"
              />
            </a>
            <a
              href="#work"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--line-strong)] px-6 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-paper-50/80 transition-colors hover:border-violet-400/50 hover:text-paper-50 sm:w-auto sm:py-4"
            >
              Selected work
              <span className="transition-transform group-hover:translate-y-0.5">
                ↓
              </span>
            </a>
          </div>
        </motion.div>

        {/* Technical readout strip */}
        <motion.dl
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.85 }}
          className="mt-10 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-lg border border-[var(--line)] sm:mt-12 sm:grid-cols-4"
        >
          {readout.map(([k, v]) => (
            <div
              key={k}
              className="flex flex-col gap-1 bg-white/[0.015] px-4 py-3"
            >
              <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-paper-50/40">
                {k}
              </dt>
              <dd className="font-mono text-[12px] uppercase tracking-[0.08em] text-paper-50/85">
                {v}
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.12em] -mb-[0.08em]">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ ...transition, delay }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}
