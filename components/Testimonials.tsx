"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/data";
import { SectionHeader } from "./SectionHeader";

export function Testimonials() {
  return (
    <section className="relative py-16 sm:py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-6 md:px-10">
        <SectionHeader
          eyebrow="Testimonials"
          title={
            <>
              What our clients
              <br />
              <span className="serif-italic text-spectrum">say</span>.
            </>
          }
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-5 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: (i % 3) * 0.08,
              }}
              whileHover={{ y: -2, transition: { duration: 0.3, ease: "easeOut" } }}
              className="group glass-card relative isolate flex flex-col gap-4 overflow-hidden rounded-2xl p-5 transition-[box-shadow,border-color] duration-500 sm:gap-5 sm:p-6 md:p-7"
            >
              <blockquote className="font-display text-base leading-snug tracking-verytight text-ink-950 sm:text-lg md:text-xl">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto border-t border-ink-950/10 pt-5">
                <div className="text-sm font-medium text-ink-950">{t.name}</div>
                <div className="mt-0.5 text-xs text-ink-950/70">{t.title}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
