"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
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
          scrolled ? "py-2 pt-[max(0.5rem,env(safe-area-inset-top))]" : "py-4 pt-[max(1rem,env(safe-area-inset-top))]"
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-[1440px] items-center justify-between px-5 sm:px-6 md:px-10 transition-all duration-500",
            scrolled &&
              "rounded-full max-w-[920px] border border-ink-950/10 bg-paper-100/70 backdrop-blur-xl px-5 py-2"
          )}
        >
          {/* Mark */}
          <a href="#top" className="group flex items-center gap-2.5">
            <img
              src="/Ultraviolet-logo.png"
              alt=""
              height={28}
              className="h-7"
            />
          </a>

          {/* Desktop links */}
          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative text-[13px] font-medium text-ink-950/70 transition-colors hover:text-ink-950"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-ink-950 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2 text-[13px] font-medium text-paper-50 backdrop-blur transition-all hover:from-violet-700 hover:to-fuchsia-700"
            >
              Start a project
              <span className="h-1.5 w-1.5 rounded-full bg-paper-50/90" />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            aria-label="Menu"
            className="-mr-1 flex h-11 w-11 items-center justify-center rounded-full text-ink-950 md:hidden"
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
            className="fixed inset-x-4 top-[calc(4.75rem+env(safe-area-inset-top))] z-40 rounded-3xl border border-ink-950/10 bg-paper-100/95 p-6 backdrop-blur-2xl md:hidden"
          >
            <nav className="flex flex-col gap-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  onClick={() => setOpen(false)}
                  href={l.href}
                  className="font-display text-3xl text-ink-950"
                >
                  {l.label}
                </a>
              ))}
              <a
                onClick={() => setOpen(false)}
                href="#contact"
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-3 text-sm font-medium text-paper-50"
              >
                Start a project
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
