"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export function SectionHeader({
  eyebrow,
  title,
  caption,
  align = "left",
  tone = "light",
}: {
  eyebrow: string;
  title: React.ReactNode;
  caption?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" && "items-center text-center"
      )}
    >
      <motion.span
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="eyebrow"
      >
        <span className="dot" />
        {eyebrow}
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        className={cn(
          "font-display text-[clamp(2.25rem,10vw,6rem)] leading-[0.95] tracking-tightest",
          tone === "dark" ? "text-paper-50" : "text-ink-950"
        )}
      >
        {title}
      </motion.h2>

      {caption && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className={cn(
            "max-w-2xl text-balance text-base md:text-lg",
            tone === "dark" ? "text-paper-50/70" : "text-ink-950/60",
            align === "center" && "mx-auto"
          )}
        >
          {caption}
        </motion.p>
      )}
    </div>
  );
}
