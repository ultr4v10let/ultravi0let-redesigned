"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/data";
import { SectionHeader } from "./SectionHeader";

export function Services() {
  return (
    <section id="services" className="relative py-32 md:py-44">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="grid items-end gap-16 md:grid-cols-[1fr_auto]">
          <SectionHeader
            eyebrow="What we do"
            title={
              <>
                Eight disciplines.
                <br />
                <span className="serif-italic text-accent">One team.</span>
              </>
            }
          />
          <p className="max-w-md text-balance text-base text-bone-50/60 md:text-right">
            We bring the full surface area of a modern product company, from
            the first sketch to the on-call rotation that keeps it alive at
            3am.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-bone-50/10 bg-bone-50/8 md:grid-cols-2 lg:grid-cols-4">
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
      className="group relative isolate flex flex-col gap-5 bg-ink-900/70 p-7 transition-colors duration-500 hover:bg-ink-800 md:p-8"
    >
      {/* Hover glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-violet-600/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="flex items-center justify-between text-bone-50/40">
        <span className="font-mono text-[11px] tracking-widest">{n}</span>
        <Icon
          size={20}
          className="transition-colors duration-500 group-hover:text-accent"
          strokeWidth={1.4}
        />
      </div>

      <h3 className="font-display text-3xl leading-tight tracking-verytight text-bone-50">
        {title}
      </h3>

      <p className="text-sm leading-relaxed text-bone-50/55">{blurb}</p>

      <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
        {keywords.map((k) => (
          <span
            key={k}
            className="rounded-full border border-bone-50/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-bone-50/45"
          >
            {k}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
