"use client";

import {
  motion,
  type MotionValue,
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
      className="relative isolate flex min-h-[100svh] min-h-[100dvh] items-end overflow-hidden pb-12 pt-[max(7rem,env(safe-area-inset-top)+5rem)] sm:pb-16 md:pb-20"
    >
      <Aurora x={auroraX} y={auroraY} x2={auroraX2} y2={auroraY2} />
      <Grid />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto w-full min-w-0 max-w-[1440px] px-5 sm:px-6 md:px-10"
      >
        {/* Headline */}
        <h1 className="font-display text-[clamp(2.35rem,13.5vw,5.75rem)] leading-[0.95] tracking-tightest text-ink-950 md:text-[clamp(3.5rem,8.5vw,7rem)] lg:text-[8vw]">
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

        {/* Statement + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: 0.7 }}
          className="mt-6 flex w-full min-w-0 flex-col items-stretch gap-6 sm:mt-8 md:mt-10 md:flex-row md:items-end md:justify-between md:gap-8"
        >
          <div className="min-w-0 max-w-2xl space-y-3 sm:space-y-4">
            <p className="text-pretty text-base leading-relaxed text-ink-900/75 sm:text-[17px] md:text-lg">
              A founder-led product studio for design, engineering, cloud and AI.
              One senior team from first prototype to production — shipping
              full-stack work internationally, with founders on every engagement.
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-900/50 sm:text-[11px] sm:tracking-[0.2em]">
              Design · Engineering · Cloud · AI
            </p>
          </div>

          <div className="flex w-full min-w-0 flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href="#contact"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-violet-700/30 bg-violet-700/10 px-6 py-3.5 text-sm font-medium text-ink-950 backdrop-blur-sm transition-all hover:border-violet-700 hover:bg-violet-700 hover:text-paper-50 hover:violet-glow sm:w-auto sm:py-4"
            >
              Start a project
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:rotate-45"
              />
            </a>
            <a
              href="#work"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink-950/20 px-6 py-3.5 text-sm font-medium text-ink-950 transition-colors hover:border-ink-950/60 hover:bg-ink-950/[0.03] sm:w-auto sm:py-4"
            >
              See our work
              <span className="text-ink-950/55 transition-transform group-hover:translate-x-0.5">
                ↓
              </span>
            </a>
          </div>
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
  x: MotionValue<number>;
  y: MotionValue<number>;
  x2: MotionValue<number>;
  y2: MotionValue<number>;
}) {
  return (
    <>
      {/* Big violet aurora — three nested layers: position + parallax / breathe / gradient */}
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none absolute -top-32 left-1/2 -z-10 -translate-x-1/2 max-md:scale-[0.65] max-md:opacity-80"
      >
        <div className="h-[520px] w-[700px] origin-center animate-breathe md:h-[820px] md:w-[1100px]">
          <div
            className="h-full w-full rounded-full opacity-70 blur-[80px] animate-pulse-soft md:blur-[120px]"
            style={{
              background:
                "radial-gradient(closest-side, rgba(139,92,246,0.65) 0%, rgba(167,139,250,0.28) 38%, transparent 72%)",
            }}
          />
        </div>
      </motion.div>

      {/* Cool sky aurora — bottom left */}
      <motion.div
        aria-hidden
        style={{ x: x2, y: y2 }}
        className="pointer-events-none absolute -left-32 top-[35%] -z-10 h-[320px] w-[320px] rounded-full opacity-45 blur-[70px] animate-drift-2 md:h-[520px] md:w-[520px] md:opacity-55 md:blur-[110px]"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(140,180,255,0.5) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Magenta aurora — right */}
      <motion.div
        aria-hidden
        style={{ x, y: y2 }}
        className="pointer-events-none absolute -right-32 top-24 -z-10 h-[280px] w-[280px] rounded-full opacity-40 blur-[60px] animate-drift-3 md:h-[460px] md:w-[460px] md:opacity-50 md:blur-[100px]"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(220,120,200,0.4) 0%, transparent 70%)",
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
