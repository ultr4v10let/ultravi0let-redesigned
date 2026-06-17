"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

export function SectionHeader({
  eyebrow,
  title,
  caption,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  caption?: React.ReactNode;
  align?: "left" | "center";
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
        className="font-display text-[10vw] leading-[0.95] tracking-tightest text-ink-950 md:text-[clamp(3rem,6vw,6rem)]"
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
            "max-w-2xl text-balance text-base text-ink-950/60 md:text-lg",
            align === "center" && "mx-auto"
          )}
        >
          {caption}
        </motion.p>
      )}
    </div>
  );
}
