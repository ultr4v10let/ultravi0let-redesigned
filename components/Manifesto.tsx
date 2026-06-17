"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const sentence =
  "We are a small group of senior engineers, designers and operators who believe the best products are still made by tiny, opinionated teams.";
const words = sentence.split(" ");

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 30%"],
  });

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden border-y border-bone-50/8 py-32 md:py-48"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="mb-10 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-50/45">
          <span className="h-px w-10 bg-bone-50/30" />
          A short note
        </div>

        <p className="font-display text-[clamp(2rem,5.4vw,5.5rem)] leading-[1.05] tracking-tightest">
          {words.map((w, i) => {
            const start = i / words.length;
            const end = start + 1.4 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {w}
              </Word>
            );
          })}
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.18em] text-bone-50/45">
          <span>Founders, Ultravi0let</span>
          <span className="h-px w-12 bg-bone-50/15" />
          <span>Dubai · Media Production Zone</span>
        </div>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: React.ReactNode;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}
