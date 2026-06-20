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
                Eight disciplines.
                <br />
                <span className="serif-italic text-spectrum">One team.</span>
              </>
            }
          />
          <p className="max-w-md text-pretty text-base text-ink-950/60 md:text-right">
            We bring the full surface area of a modern product company, from
            the first sketch to the on-call rotation that keeps it alive at
            3am.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:mt-12 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: (index % 4) * 0.07,
      }}
      whileHover={{ y: -2, transition: { duration: 0.3, ease: "easeOut" } }}
      className="group glass-card relative isolate flex flex-col gap-4 overflow-hidden rounded-2xl p-6 transition-[box-shadow,border-color] duration-500 sm:gap-5 sm:p-7 md:p-8"
    >
      {/* Hover glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-violet-600/15 via-fuchsia-500/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="flex items-center justify-between text-ink-950/60">
        <span className="font-mono text-[11px] tracking-widest">{n}</span>
        <Icon
          size={20}
          className="transition-colors duration-500 group-hover:text-violet-400"
          strokeWidth={1.4}
        />
      </div>

      <h3 className="font-display text-2xl leading-tight tracking-verytight text-ink-950 sm:text-3xl">
        {title}
      </h3>

      <p className="text-sm leading-relaxed text-ink-950/70">{blurb}</p>

      <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
        {keywords.map((k) => (
          <span
            key={k}
            className="rounded-full border border-ink-950/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-ink-950/65"
          >
            {k}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
