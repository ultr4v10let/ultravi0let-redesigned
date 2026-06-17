"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import { SectionHeader } from "./SectionHeader";

export function Testimonials() {
  return (
    <section className="relative py-32 md:py-44">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <SectionHeader
          eyebrow="Kind words"
          title={
            <>
              What clients say
              <br />
              when we&apos;re <span className="serif-italic text-accent">not in the room</span>.
            </>
          }
        />

        <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: (i % 2) * 0.1,
              }}
              className="group relative isolate flex flex-col gap-8 overflow-hidden rounded-3xl border border-bone-50/10 bg-ink-900/70 p-8 transition-colors duration-500 hover:border-bone-50/20 md:p-10"
            >
              <Quote
                aria-hidden
                className="text-bone-50/15 transition-colors duration-500 group-hover:text-accent/40"
                size={36}
                strokeWidth={1.2}
              />
              <blockquote className="font-display text-2xl leading-snug tracking-verytight text-bone-50 md:text-[28px]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-4 border-t border-bone-50/10 pt-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-violet-700 font-mono text-sm text-bone-50">
                  {initials(t.name)}
                </div>
                <div>
                  <div className="text-sm font-medium text-bone-50">{t.name}</div>
                  <div className="text-xs text-bone-50/55">{t.title}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");
}
