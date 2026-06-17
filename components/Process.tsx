"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const steps = [
  {
    n: "01",
    title: "Discovery",
    body:
      "Two weeks of deep listening. We map users, constraints, and the gap between where you are and where you want to be.",
    detail: "Stakeholder interviews · Competitive audit · Technical scoping",
  },
  {
    n: "02",
    title: "Architecture",
    body:
      "Information architecture, systems design, and a north-star prototype. Decisions get cheap before code gets expensive.",
    detail: "IA · Wireframes · Tech RFC · Roadmap",
  },
  {
    n: "03",
    title: "Build",
    body:
      "Two-week sprints. Demo every Friday. You watch the product grow in your hands, not in a status doc.",
    detail: "Design · Engineering · QA · Weekly demos",
  },
  {
    n: "04",
    title: "Launch & Care",
    body:
      "We don't disappear at v1. SLOs, monitoring, growth experiments, and a team that picks up the phone.",
    detail: "Observability · On-call · Iteration",
  },
];

export function Process() {
  return (
    <section id="studio" className="relative py-16 sm:py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-6 md:px-10">
        <SectionHeader
          eyebrow="How we work"
          title={
            <>
              Four phases.
              <br />
              <span className="serif-italic text-accent">No surprises.</span>
            </>
          }
          caption="Our engagements run lean. Small teams, short feedback loops, and demos every Friday. The process is the product."
        />

        <div className="mt-10 grid grid-cols-1 gap-8 sm:mt-12 md:grid-cols-2 md:gap-x-14 md:gap-y-14">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: (i % 2) * 0.1,
              }}
              className="relative flex gap-4 sm:gap-6 md:gap-8"
            >
              <div className="flex shrink-0 flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-950/15 bg-paper-100 font-mono text-[10px] tracking-widest text-ink-950/70 sm:h-12 sm:w-12 sm:text-[11px]">
                  {s.n}
                </div>
                <div className="mt-3 h-full w-px bg-gradient-to-b from-ink-950/15 to-transparent" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-2 pb-4 sm:gap-3 sm:pb-6">
                <h3 className="font-display text-2xl tracking-verytight text-ink-950 sm:text-3xl md:text-4xl">
                  {s.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-ink-950/65">
                  {s.body}
                </p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-950/55">
                  {s.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
