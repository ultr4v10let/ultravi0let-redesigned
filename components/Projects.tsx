"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Search } from "lucide-react";
import { projects } from "@/lib/data";
import { SectionHeader } from "./SectionHeader";
import { SPECTRUM } from "./Logo";
import { cn } from "@/lib/cn";

// Bento rhythm: feature top-left spans two rows, two stacked mediums beside it,
// three equal cards on the bottom row.
const layouts = [
  "md:col-span-7 md:row-span-2",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-4",
];

const statusLabel = {
  project: "Delivered",
  "project-undeployed": "Delivered · Undeployed",
  prototype: "Prototype",
} as const;

export function Projects() {
  return (
    <section id="work" className="relative py-16 sm:py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-6 md:px-10">
        <SectionHeader
          eyebrow="Selected work"
          title={
            <>
              Things we&apos;ve
              <br />
              <span className="text-signal">shipped</span>
            </>
          }
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-5 md:auto-rows-[300px] md:grid-cols-12 md:gap-5">
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
  stats,
  href,
  index,
  layout,
  feature,
}: Project) {
  const external = href.startsWith("http");

  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: (index % 3) * 0.08,
      }}
      className={cn(
        "panel group relative isolate flex min-h-[min(88vw,360px)] flex-col justify-between overflow-hidden rounded-2xl p-5 sm:min-h-[320px] sm:p-6 md:min-h-0",
        layout,
        feature && "md:p-8"
      )}
    >
      {/* Left-edge vanishing spectrum stripe */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 flex w-[3px] flex-col"
      >
        {SPECTRUM.map((c, i) => (
          <span key={i} className="flex-1" style={{ background: c }} />
        ))}
      </span>

      {/* Top row */}
      <div className="flex items-start justify-between gap-3 pl-2">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] tracking-widest text-violet-400/80">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className={cn(
                "rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em]",
                type === "project"
                  ? "border-violet-400/25 bg-violet-600/15 text-violet-300"
                  : "border-[var(--line)] text-paper-50/55"
              )}
            >
              {statusLabel[type]}
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper-50/60">
            {category}
          </span>
          <span className="font-mono text-[10px] tracking-widest text-paper-50/40">
            {year}
          </span>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line-strong)] text-paper-50/70 transition-all duration-500 group-hover:border-violet-400/60 group-hover:bg-violet-600 group-hover:text-paper-50">
          <ArrowUpRight
            size={14}
            className="transition-transform duration-500 group-hover:rotate-45"
          />
        </div>
      </div>

      {feature && <StorefrontMock />}

      {/* Title + blurb */}
      <div className={cn("mt-6 flex flex-col gap-3 pl-2", feature && "md:mt-8")}>
        <h3
          className={cn(
            "font-display font-extrabold uppercase leading-[0.98] tracking-[-0.03em] text-paper-50",
            feature
              ? "text-[clamp(1.6rem,6vw,2.9rem)]"
              : "text-[clamp(1.35rem,4.5vw,2rem)]"
          )}
        >
          {name}
        </h3>
        <p
          className={cn(
            "max-w-xl leading-relaxed text-paper-50/65",
            feature ? "text-[14px] md:text-[15px]" : "text-[13px]"
          )}
        >
          {blurb}
        </p>

        <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1.5">
          {stats.map((s) => (
            <div key={s.k} className="flex items-baseline gap-1.5">
              <span className="font-display text-sm font-bold tabnum text-paper-50">
                {s.v}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-paper-50/50">
                {s.k}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

// A miniature product surface rendered in ultravi0let's own dark language —
// ground panels, hairline borders, a spectrum banner. Reads as "a shop"
// without dropping a foreign brand onto the ground.
const mockProducts = ["UltraBook 14", "Nova Phone", "Aura Buds"];

function StorefrontMock() {
  return (
    <div
      aria-hidden
      className="pointer-events-none mt-5 hidden min-h-[150px] flex-1 flex-col overflow-hidden rounded-xl border border-[var(--line)] bg-black/20 p-3 sm:p-4 md:flex"
    >
      {/* browser chrome */}
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-white/10" />
          <span className="h-2 w-2 rounded-full bg-white/10" />
          <span className="h-2 w-2 rounded-full bg-white/10" />
        </div>
        <div className="flex flex-1 items-center gap-1.5 rounded-full border border-[var(--line)] px-2.5 py-1">
          <Search size={10} className="text-paper-50/35" />
          <span className="font-mono text-[10px] tracking-wide text-paper-50/40">
            shop.co
          </span>
        </div>
      </div>

      {/* spectrum sale banner */}
      <div className="mt-3 flex items-center justify-between overflow-hidden rounded-lg border border-violet-400/20 bg-violet-600/10 px-3 py-2">
        <span className="font-display text-sm font-bold uppercase leading-none text-paper-50/85">
          Summer Sale
        </span>
        <span className="inline-flex items-end gap-[3px]">
          {SPECTRUM.slice(0, 6).map((c, i) => (
            <span
              key={i}
              className="block w-[3px] rounded-[1px]"
              style={{ background: c, height: 8 + i * 2 }}
            />
          ))}
        </span>
      </div>

      {/* product tiles */}
      <div className="mt-3 flex flex-1 gap-2.5">
        {mockProducts.map((p, i) => (
          <div
            key={p}
            className="flex flex-1 flex-col rounded-lg border border-[var(--line)] bg-white/[0.02] p-2"
          >
            <div className="flex min-h-[46px] flex-1 items-center justify-center rounded-md bg-gradient-to-br from-violet-600/25 to-violet-800/10">
              <span
                className="block h-6 w-[3px] rounded-[1px]"
                style={{ background: SPECTRUM[i * 2] }}
              />
            </div>
            <div className="mt-2 truncate font-mono text-[10px] text-paper-50/70">
              {p}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
