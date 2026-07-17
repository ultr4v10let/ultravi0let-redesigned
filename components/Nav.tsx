"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { Logo, Wordmark, SpectrumMark } from "./Logo";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Studio", href: "#studio" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "py-2 pt-[max(0.5rem,env(safe-area-inset-top))]"
            : "py-4 pt-[max(1rem,env(safe-area-inset-top))]"
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-[1440px] items-center justify-between px-5 transition-all duration-500 sm:px-6 md:px-10",
            scrolled &&
              "max-w-[960px] rounded-full border border-[var(--line)] bg-ground/70 px-5 py-2 backdrop-blur-xl"
          )}
        >
          <a href="#top" className="group flex items-center">
            <Logo markSize={22} />
          </a>

          {/* Desktop links — mono, uppercase, technical */}
          <nav className="hidden items-center gap-9 md:flex">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative font-mono text-[11px] uppercase tracking-[0.18em] text-paper-50/55 transition-colors hover:text-paper-50"
              >
                <span className="text-violet-400/70">
                  {String(i + 1).padStart(2, "0")}
                </span>{" "}
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-violet-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2.5 rounded-full border border-[var(--line-strong)] bg-violet-600/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-paper-50 transition-colors hover:bg-violet-600/20"
            >
              Start a project
              <SpectrumMark size={12} />
            </a>
          </div>

          <button
            aria-label="Menu"
            className="-mr-1 flex h-11 w-11 items-center justify-center rounded-full text-paper-50 md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed inset-x-4 top-[calc(4.75rem+env(safe-area-inset-top))] z-40 rounded-3xl border border-[var(--line)] bg-ground/95 p-6 backdrop-blur-2xl md:hidden"
          >
            <nav className="flex flex-col gap-1">
              {links.map((l, i) => (
                <a
                  key={l.href}
                  onClick={() => setOpen(false)}
                  href={l.href}
                  className="flex items-baseline gap-3 border-b border-[var(--line)] py-3 font-display text-2xl font-extrabold uppercase tracking-tight text-paper-50"
                >
                  <span className="font-mono text-xs text-violet-400/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {l.label}
                </a>
              ))}
              <a
                onClick={() => setOpen(false)}
                href="#contact"
                className="mt-5 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-violet-600 px-4 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-paper-50"
              >
                Start a project
                <SpectrumMark size={12} />
              </a>
            </nav>
            <div className="mt-6">
              <Wordmark className="text-sm text-paper-50/30" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
