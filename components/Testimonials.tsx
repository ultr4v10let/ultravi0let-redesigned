"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/data";
import { SectionHeader } from "./SectionHeader";
import { SpectrumMark } from "./Logo";

export function Testimonials() {
  return (
    <section className="relative py-16 sm:py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-6 md:px-10">
        <SectionHeader
          eyebrow="Testimonials"
          title={
            <>
              What clients
              <br />
              <span className="text-signal">say</span>
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
              className="panel group relative isolate flex flex-col gap-5 overflow-hidden rounded-2xl p-6 sm:p-7"
            >
              <SpectrumMark size={16} />
              <blockquote className="text-[15px] leading-relaxed text-paper-50/85 sm:text-base">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto border-t border-[var(--line)] pt-5">
                <div className="font-display text-sm font-bold uppercase tracking-tight text-paper-50">
                  {t.name}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-paper-50/50">
                  {t.title}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
