"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";

const transition = { duration: 1.1, ease: [0.16, 1, 0.3, 1] as const };

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Mouse parallax for aurora
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18 });
  const smy = useSpring(my, { stiffness: 60, damping: 18 });
  const auroraX = useTransform(smx, [-1, 1], [-30, 30]);
  const auroraY = useTransform(smy, [-1, 1], [-20, 20]);
  const auroraX2 = useTransform(smx, [-1, 1], [25, -25]);
  const auroraY2 = useTransform(smy, [-1, 1], [16, -16]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate flex min-h-[92svh] items-end overflow-hidden pb-16 pt-32 md:pb-20"
    >
      <Aurora x={auroraX} y={auroraY} x2={auroraX2} y2={auroraY2} />
      <Grid />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10"
      >
        {/* Eyebrow row */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.1 }}
          className="mb-7 flex flex-wrap items-center gap-3"
        >
          <span className="eyebrow">
            <span className="dot" />
            Dubai · est. 2022
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="font-display text-[14vw] leading-[0.95] tracking-tightest text-ink-950 md:text-[8.5vw] lg:text-[8vw]">
          <Line delay={0.18}>We build the</Line>
          <Line delay={0.28}>
            <span className="serif-italic font-normal text-accent">
              quiet&nbsp;machinery
            </span>
          </Line>
          <Line delay={0.38}>
            behind <span className="text-ink-950/50">loud</span> products.
          </Line>
        </h1>

        {/* Subhead + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.7 }}
          className="mt-8 flex flex-col items-start gap-6 md:mt-10 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-xl text-balance text-[17px] leading-relaxed text-ink-900/75 md:text-lg">
            A senior product studio based in Dubai. Design, engineering, cloud
            and AI for teams who plan to ship, and keep shipping. Trusted by{" "}
            <span className="text-ink-950">12+ clients</span> across{" "}
            <span className="text-ink-950">4 countries</span>.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-full border border-violet-700/30 bg-violet-700/10 px-6 py-4 text-sm font-medium text-ink-950 backdrop-blur-sm transition-all hover:border-violet-700 hover:bg-violet-700 hover:text-paper-50 hover:violet-glow"
            >
              Start a project
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:rotate-45"
              />
            </a>
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full border border-ink-950/20 px-6 py-4 text-sm font-medium text-ink-950 transition-colors hover:border-ink-950/60 hover:bg-ink-950/[0.03]"
            >
              See our work
              <span className="text-ink-950/55 transition-transform group-hover:translate-x-0.5">
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
          className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-950/12 bg-ink-950/[0.04] md:mt-14 md:grid-cols-4"
        >
          {[
            { k: "Projects", v: "30+" },
            { k: "Countries", v: "04" },
            { k: "Clients", v: "12+" },
            { k: "Years of experience", v: "80" },
          ].map((s) => (
            <div
              key={s.k}
              className="bg-paper-50/80 p-5 backdrop-blur-sm md:p-7"
            >
              <div className="font-display text-4xl tabnum text-ink-950 md:text-5xl">
                {s.v}
              </div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-ink-900/55">
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

function Aurora({
  x,
  y,
  x2,
  y2,
}: {
  x: ReturnType<typeof useTransform>;
  y: ReturnType<typeof useTransform>;
  x2: ReturnType<typeof useTransform>;
  y2: ReturnType<typeof useTransform>;
}) {
  return (
    <>
      {/* Big violet aurora — three nested layers: position + parallax / breathe / gradient */}
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none absolute -top-32 left-1/2 -z-10 -translate-x-1/2"
      >
        <div className="h-[820px] w-[1100px] origin-center animate-breathe">
          <div
            className="h-full w-full rounded-full opacity-70 blur-[120px] animate-pulse-soft"
            style={{
              background:
                "radial-gradient(closest-side, rgba(139,92,246,0.65) 0%, rgba(167,139,250,0.28) 38%, transparent 72%)",
            }}
          />
        </div>
      </motion.div>

      {/* Warm gold aurora — bottom left */}
      <motion.div
        aria-hidden
        style={{ x: x2, y: y2 }}
        className="pointer-events-none absolute -left-32 top-[35%] -z-10 h-[520px] w-[520px] rounded-full opacity-60 blur-[110px] animate-drift-2"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(232,201,141,0.65) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Cool pink aurora — right */}
      <motion.div
        aria-hidden
        style={{ x, y: y2 }}
        className="pointer-events-none absolute -right-32 top-24 -z-10 h-[460px] w-[460px] rounded-full opacity-55 blur-[100px] animate-drift-3"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(244,114,182,0.45) 0%, transparent 70%)",
          }}
        />
      </motion.div>
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
            stroke="#0E0A1F"
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
