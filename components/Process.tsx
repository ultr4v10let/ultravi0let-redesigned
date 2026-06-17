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
    <section id="studio" className="relative py-32 md:py-44">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
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

        <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-16 md:gap-y-24">
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
              className="relative flex gap-6 md:gap-8"
            >
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-bone-50/15 bg-ink-900 font-mono text-[11px] tracking-widest text-bone-50/70">
                  {s.n}
                </div>
                <div className="mt-3 h-full w-px bg-gradient-to-b from-bone-50/15 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col gap-3 pb-6">
                <h3 className="font-display text-3xl tracking-verytight text-bone-50 md:text-4xl">
                  {s.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-bone-50/65">
                  {s.body}
                </p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-50/35">
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
