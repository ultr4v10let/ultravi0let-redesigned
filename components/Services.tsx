"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/data";
import { SectionHeader } from "./SectionHeader";

export function Services() {
  return (
    <section id="services" className="relative py-16 sm:py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-6 md:px-10">
        <div className="grid items-end gap-8 md:grid-cols-[1fr_auto] md:gap-16">
          <SectionHeader
            eyebrow="What we do"
            title={
              <>
                Eight disciplines
                <br />
                <span className="text-signal">one team</span>
              </>
            }
          />
          <p className="max-w-md text-pretty text-[15px] leading-relaxed text-paper-50/60 md:text-right">
            The full surface area of a modern product company — from the first
            sketch to the on-call rotation that keeps it alive at 3am.
          </p>
        </div>

        {/* Hairline lattice: the grid gap is the line colour, each cell sits on ground */}
        <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <ServiceCard key={s.n} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

type Service = (typeof services)[number] & { index: number };

function ServiceCard({ n, icon: Icon, title, blurb, keywords, index }: Service) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: (index % 4) * 0.06,
      }}
      className="group relative isolate flex min-h-[230px] flex-col gap-4 bg-ground p-6 transition-colors duration-500 hover:bg-white/[0.02] sm:p-7 md:p-8"
    >
      <div className="flex items-center justify-between text-paper-50/55">
        <span className="font-mono text-[11px] tracking-widest text-violet-400/80">
          {n}
        </span>
        <Icon
          size={19}
          strokeWidth={1.4}
          className="transition-colors duration-500 group-hover:text-violet-300"
        />
      </div>

      <h3 className="font-display text-lg font-bold uppercase leading-tight tracking-tight text-paper-50 sm:text-xl">
        {title}
      </h3>

      <p className="text-[13px] leading-relaxed text-paper-50/60">{blurb}</p>

      <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
        {keywords.map((k) => (
          <span
            key={k}
            className="rounded-full border border-[var(--line)] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-paper-50/55"
          >
            {k}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
