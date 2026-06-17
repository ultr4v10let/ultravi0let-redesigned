"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/cn";

export function Projects() {
  return (
    <section id="work" className="relative py-32 md:py-44">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <SectionHeader
          eyebrow="Selected work · since 2022"
          title={
            <>
              A few things
              <br />
              we&apos;ve <span className="serif-italic text-accent">shipped</span>.
            </>
          }
        />

        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} {...p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

type Project = (typeof projects)[number] & { index: number };

function ProjectCard({
  name,
  category,
  year,
  blurb,
  accent,
  stats,
  href,
  index,
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
        "group relative isolate flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-3xl border border-bone-50/10 bg-ink-900 p-7 transition-all duration-500 hover:border-bone-50/20 md:p-8"
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
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-ink-950/90 via-ink-950/30 to-transparent"
      />
      {/* Subtle radial */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-bone-50/[0.04] blur-3xl transition-all duration-700 group-hover:bg-bone-50/[0.08]"
      />

      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] uppercase tracking-[0.18em] text-bone-50/45">
            {category}
          </span>
          <span className="font-mono text-[11px] tracking-widest text-bone-50/35">
            {year}
          </span>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-bone-50/15 bg-bone-50/[0.04] text-bone-50/80 transition-all duration-500 group-hover:border-bone-50/30 group-hover:bg-bone-50 group-hover:text-ink-950">
          <ArrowUpRight
            size={16}
            className="transition-transform duration-500 group-hover:rotate-45"
          />
        </div>
      </div>

      {/* Title + blurb */}
      <div className="mt-12 flex flex-col gap-5">
        <h3 className="font-display text-[clamp(2rem,4.5vw,3.8rem)] leading-[0.95] tracking-tightest text-bone-50">
          {name}
        </h3>
        <p className="max-w-xl text-sm leading-relaxed text-bone-50/65 md:text-[15px]">
          {blurb}
        </p>

        <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
          {stats.map((s) => (
            <div key={s.k} className="flex items-baseline gap-2">
              <span className="font-display text-xl tabnum text-bone-50">
                {s.v}
              </span>
              <span className="text-[11px] uppercase tracking-[0.16em] text-bone-50/45">
                {s.k}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.a>
  );
}
