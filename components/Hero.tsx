"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

const transition = { duration: 1.1, ease: [0.16, 1, 0.3, 1] as const };

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
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden pb-24 pt-40 md:pb-32"
    >
      {/* Backdrop layers */}
      <Aurora />
      <Grid />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.1 }}
          className="mb-10 flex flex-wrap items-center gap-3"
        >
          <span className="eyebrow">
            <span className="dot" />
            Dubai · est. 2022
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="font-display text-[14vw] leading-[0.95] tracking-tightest text-bone-50 md:text-[8.5vw] lg:text-[8vw]">
          <Line delay={0.18}>We build the</Line>
          <Line delay={0.28}>
            <span className="serif-italic font-normal text-accent">
              quiet&nbsp;machinery
            </span>
          </Line>
          <Line delay={0.38}>
            behind <span className="text-bone-50/55">loud</span> products.
          </Line>
        </h1>

        {/* Subhead + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.7 }}
          className="mt-12 flex flex-col items-start gap-8 md:mt-16 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-xl text-balance text-base text-bone-50/65 md:text-lg">
            A senior product studio based in Dubai. Design, engineering, cloud
            and AI for teams who plan to ship, and keep shipping. Trusted by{" "}
            <span className="text-bone-50">12+ clients</span> across{" "}
            <span className="text-bone-50">4 countries</span>.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-full bg-bone-50 px-6 py-4 text-sm font-medium text-ink-950 transition-all hover:bg-accent hover:violet-glow"
            >
              Start a project
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:rotate-45"
              />
            </a>
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full border border-bone-50/15 px-6 py-4 text-sm font-medium text-bone-50/85 transition-colors hover:border-bone-50/30 hover:text-bone-50"
            >
              See our work
              <span className="text-bone-50/40 transition-transform group-hover:translate-x-0.5">
                ↓
              </span>
            </a>
          </div>
        </motion.div>

        {/* Bottom rail */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.1 }}
          className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-bone-50/10 bg-bone-50/[0.02] md:mt-24 md:grid-cols-4"
        >
          {[
            { k: "Projects", v: "30+" },
            { k: "Countries", v: "04" },
            { k: "Clients", v: "12+" },
            { k: "Years of experience", v: "80" },
          ].map((s) => (
            <div
              key={s.k}
              className="bg-ink-950/40 p-5 md:p-7 backdrop-blur-sm"
            >
              <div className="font-display text-4xl tabnum text-bone-50 md:text-5xl">
                {s.v}
              </div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-bone-50/45">
                {s.k}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function Line({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <span className="block overflow-hidden pb-[0.18em] -mb-[0.12em]">
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

function Aurora() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[900px] w-[1200px] -translate-x-1/2 rounded-full opacity-50 blur-[140px]"
        style={{
          background:
            "radial-gradient(closest-side, #6D28D9 0%, #2B1F4D 35%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-40 -z-10 h-[600px] w-[600px] rounded-full opacity-40 blur-[120px]"
        style={{
          background:
            "radial-gradient(closest-side, #C4A5FF 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 -z-10 h-[500px] w-[500px] rounded-full opacity-25 blur-[100px]"
        style={{
          background:
            "radial-gradient(closest-side, #E8D9B5 0%, transparent 70%)",
        }}
      />
    </>
  );
}

function Grid() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.08]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="grid"
          width="56"
          height="56"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 56 0 L 0 0 0 56"
            fill="none"
            stroke="#F5F2EC"
            strokeWidth="0.5"
          />
        </pattern>
        <radialGradient id="fade" cx="50%" cy="0%" r="60%">
          <stop offset="0%" stopColor="black" stopOpacity="1" />
          <stop offset="100%" stopColor="black" stopOpacity="0" />
        </radialGradient>
        <mask id="mask">
          <rect width="100%" height="100%" fill="url(#fade)" />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" mask="url(#mask)" />
    </svg>
  );
}
