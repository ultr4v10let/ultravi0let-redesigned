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
import Image from "next/image";
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

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18 });
  const smy = useSpring(my, { stiffness: 60, damping: 18 });
  const auroraX = useTransform(smx, [-1, 1], [-24, 24]);
  const auroraY = useTransform(smy, [-1, 1], [-16, 16]);
  const auroraX2 = useTransform(smx, [-1, 1], [20, -20]);
  const auroraY2 = useTransform(smy, [-1, 1], [12, -12]);

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
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-br from-[#E8DFF8] via-[#F0EBFA] to-[#DDD6FE]"
      />
      <Aurora x={auroraX} y={auroraY} x2={auroraX2} y2={auroraY2} />
      <Grid />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto w-full min-w-0 max-w-[1440px] px-5 sm:px-6 md:px-10"
      >
        <div className="grid items-stretch gap-10 md:grid-cols-[1fr_min(40%,380px)] md:gap-8 lg:grid-cols-[1fr_min(42%,440px)] lg:gap-10">
          <div className="flex min-w-0 flex-col">
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-950/50 sm:text-[11px]">
              Product studio
            </p>

            <h1 className="max-w-3xl font-display text-[clamp(2.35rem,13.5vw,5.75rem)] leading-[1.05] tracking-tightest text-ink-950 md:text-[clamp(3rem,7vw,6rem)] lg:text-[6.5rem]">
              <Line delay={0.18}>We build the</Line>
              <Line delay={0.28}>
                <span className="serif-italic font-normal text-violet-700">
                  quiet&nbsp;machinery
                </span>
              </Line>
              <Line delay={0.38}>
                behind <span className="text-ink-950/40">loud</span> products.
              </Line>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: 0.7 }}
              className="mt-6 space-y-3 sm:mt-8 md:mt-10"
            >
              <p className="max-w-2xl text-pretty text-base leading-relaxed text-ink-950/70 sm:text-[17px] md:text-lg">
                A founder-led product studio for design, engineering, cloud and AI.
                One senior team from first prototype to production — shipping
                full-stack work internationally, with founders on every engagement.
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-950/45 sm:text-[11px] sm:tracking-[0.2em]">
                Design · Engineering · Cloud · AI
              </p>
            </motion.div>

            <div className="mt-8 md:hidden">
              <HeroActions />
            </div>
          </div>

          <div className="hidden min-h-0 md:flex md:flex-col">
            <HeroVisual />
            <div className="mt-auto pt-6">
              <HeroActions />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ ...transition, delay: 0.45 }}
      className="relative w-full max-w-[440px]"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] border border-violet-400/30 shadow-[0_28px_80px_-24px_rgba(109,40,217,0.45)] lg:rounded-[2rem]">
        <Image
          src="/image.png"
          alt="Connected devices and secure digital systems"
          fill
          priority
          className="object-cover object-center"
          sizes="(max-width: 1024px) 40vw, 440px"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-violet-900/20 via-transparent to-violet-200/10" />
      </div>
    </motion.div>
  );
}

function HeroActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...transition, delay: 0.75 }}
      className="flex w-full max-w-[440px] flex-col gap-3 md:flex-row md:items-center md:justify-between"
    >
      <a
        href="#contact"
        className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-violet-700/30 bg-violet-700/10 px-6 py-3.5 text-sm font-medium text-ink-950 backdrop-blur-sm transition-all hover:border-violet-700 hover:bg-violet-700 hover:text-paper-50 hover:violet-glow md:w-auto md:min-w-[11.5rem] md:px-9 md:py-4"
      >
        Start a project
        <ArrowUpRight
          size={16}
          className="transition-transform group-hover:rotate-45"
        />
      </a>
      <a
        href="#work"
        className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink-950/20 px-6 py-3.5 text-sm font-medium text-ink-950 transition-colors hover:border-ink-950/60 hover:bg-ink-950/[0.03] md:w-auto md:min-w-[11.5rem] md:px-9 md:py-4"
      >
        See our work
        <span className="text-ink-950/55 transition-transform group-hover:translate-x-0.5">
          ↓
        </span>
      </a>
    </motion.div>
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
    <span className="block overflow-hidden pb-[0.2em]">
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
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none absolute -top-24 right-0 -z-10 h-[min(70vw,560px)] w-[min(70vw,560px)] rounded-full opacity-40 blur-[100px] md:-right-16 md:h-[640px] md:w-[640px] md:opacity-50"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(139,92,246,0.45) 0%, rgba(167,139,250,0.15) 45%, transparent 72%)",
          }}
        />
      </motion.div>

      <motion.div
        aria-hidden
        style={{ x: x2, y: y2 }}
        className="pointer-events-none absolute -left-24 top-[20%] -z-10 h-[min(50vw,400px)] w-[min(50vw,400px)] rounded-full opacity-30 blur-[90px] md:opacity-35"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(196,165,255,0.4) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      <motion.div
        aria-hidden
        style={{ x, y: y2 }}
        className="pointer-events-none absolute bottom-[10%] right-[15%] -z-10 hidden h-72 w-72 rounded-full opacity-25 blur-[80px] md:block"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(124,58,237,0.35) 0%, transparent 70%)",
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
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.06]"
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
            stroke="#6D28D9"
            strokeWidth="0.5"
          />
        </pattern>
        <radialGradient id="fade" cx="50%" cy="40%" r="70%">
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
