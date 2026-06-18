"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/cn";

// Bento rhythm for six cards: feature top-left spans two rows, two stacked
// mediums next to it, three equal cards on the bottom row.
const layouts = [
  "md:col-span-7 md:row-span-2", // 1 · feature
  "md:col-span-5",                // 2 · medium top
  "md:col-span-5",                // 3 · medium bottom (under #2)
  "md:col-span-4",                // 4 · bottom-left
  "md:col-span-4",                // 5 · bottom-centre
  "md:col-span-4",                // 6 · bottom-right
];

export function Projects() {
  return (
    <section id="work" className="relative py-16 sm:py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-6 md:px-10">
        <SectionHeader
          eyebrow="Selected work"
          title={
            <>
              A few things
              <br />
              we&apos;ve <span className="serif-italic text-accent">shipped</span>.
            </>
          }
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-5 md:grid-cols-12 md:auto-rows-[300px] md:gap-6">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.name}
              {...p}
              index={i}
              layout={layouts[i] ?? "md:col-span-4"}
              feature={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

type Project = (typeof projects)[number] & {
  index: number;
  layout: string;
  feature: boolean;
};

function ProjectCard({
  name,
  type,
  category,
  year,
  blurb,
  accent,
  stats,
  href,
  index,
  layout,
  feature,
}: Project) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: (index % 3) * 0.08,
      }}
      className={cn(
        "group relative isolate flex min-h-[min(88vw,380px)] flex-col justify-between overflow-hidden rounded-2xl border border-ink-950/10 bg-paper-100 p-5 transition-all duration-500 hover:border-ink-950/20 sm:min-h-[340px] sm:p-6 md:min-h-0 md:aspect-auto",
        layout,
        feature && "md:p-8"
      )}
    >
      {/* Background gradient (project accent) */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br opacity-[0.18] transition-opacity duration-700 group-hover:opacity-[0.35]",
          accent
        )}
      />
      {/* Vignette overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-paper-50/90 via-paper-50/30 to-transparent"
      />
      {/* Subtle radial */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-ink-950/[0.04] blur-3xl transition-all duration-700 group-hover:bg-ink-950/[0.08]"
      />

      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <span
            className={cn(
              "w-fit rounded-full px-2 py-0.5 text-[9px] uppercase tracking-[0.16em]",
              type === "project"
                ? "bg-ink-950/10 text-ink-950/80"
                : "border border-ink-950/15 bg-paper-50/60 text-ink-950/70"
            )}
          >
            {type === "project" ? "Delivered" : "Prototype"}
          </span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-ink-950/75">
            {category}
          </span>
          <span className="font-mono text-[10px] tracking-widest text-ink-950/60">
            {year}
          </span>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-ink-950/15 bg-ink-950/[0.04] text-ink-950/80 transition-all duration-500 group-hover:border-ink-950/30 group-hover:bg-ink-950 group-hover:text-paper-50">
          <ArrowUpRight
            size={14}
            className="transition-transform duration-500 group-hover:rotate-45"
          />
        </div>
      </div>

      {/* Title + blurb */}
      <div className={cn("mt-6 flex flex-col gap-3", feature && "md:mt-8")}>
        <h3
          className={cn(
            "font-display leading-[0.98] tracking-tightest text-ink-950",
            feature
              ? "text-[clamp(1.75rem,7vw,3.4rem)]"
              : "text-[clamp(1.5rem,5.5vw,2.4rem)]"
          )}
        >
          {name}
        </h3>
        <p
          className={cn(
            "max-w-xl leading-relaxed text-ink-950/75",
            feature ? "text-[14px] md:text-[15px]" : "text-[13px]"
          )}
        >
          {blurb}
        </p>

        <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1.5">
          {stats.map((s) => (
            <div key={s.k} className="flex items-baseline gap-1.5">
              <span className="font-display text-base tabnum text-ink-950">
                {s.v}
              </span>
              <span className="text-[10px] uppercase tracking-[0.16em] text-ink-950/65">
                {s.k}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.a>
  );
}
