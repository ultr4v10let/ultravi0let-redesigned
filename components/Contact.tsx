"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, type LucideIcon } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative isolate overflow-hidden py-20 md:py-28">
      {/* Aurora */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[820px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-[130px] animate-drift-1"
        style={{
          background:
            "radial-gradient(closest-side, rgba(139,92,246,0.55) 0%, rgba(167,139,250,0.2) 35%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -bottom-10 -z-10 h-[420px] w-[420px] rounded-full opacity-50 blur-[110px] animate-drift-3"
        style={{
          background:
            "radial-gradient(closest-side, rgba(140,180,255,0.45) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="grid items-end gap-10 md:grid-cols-2 md:gap-12">
          {/* Left: pitch */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <span className="eyebrow">
              <span className="dot" />
              Let&apos;s build
            </span>
            <h2 className="font-display text-[12vw] leading-[0.95] tracking-tightest text-ink-950 md:text-[clamp(3.5rem,7vw,7rem)]">
              Got an idea?
              <br />
              <span className="serif-italic text-accent">Let&apos;s make</span>
              <br />
              it fly.
            </h2>
            <p className="max-w-md text-balance text-base text-ink-950/65 md:text-lg">
              Tell us what you&apos;re building. We&apos;ll come back within 24
              hours with three honest sentences about whether we&apos;re the
              right team.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 text-sm text-ink-950/75 sm:grid-cols-2">
              <ContactRow
                icon={Mail}
                label="hello@ultravi0let.com"
                href="mailto:hello@ultravi0let.com"
              />
              <ContactRow
                icon={MapPin}
                label="Dubai · Media Production Zone"
              />
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const name = data.get("name");
              const subject = `New inquiry from ${name}`;
              const body = `${data.get("message")}\n\nFrom: ${name}\n${data.get(
                "email"
              )}\n${data.get("company") ?? ""}`;
              window.location.href = `mailto:hello@ultravi0let.com?subject=${encodeURIComponent(
                subject as string
              )}&body=${encodeURIComponent(body)}`;
            }}
            className="relative isolate flex flex-col gap-4 overflow-hidden rounded-3xl border border-ink-950/10 bg-paper-100/70 p-7 backdrop-blur-xl md:p-9"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Your name" name="name" required />
              <Field label="Company" name="company" />
            </div>
            <Field label="Email" name="email" type="email" required />
            <Field
              label="Tell us about the project"
              name="message"
              textarea
              required
            />

            <button
              type="submit"
              className="group mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-violet-700/30 bg-violet-700/10 px-6 py-4 text-sm font-medium text-ink-950 backdrop-blur-sm transition-all hover:border-violet-700 hover:bg-violet-700 hover:text-paper-50 hover:violet-glow"
            >
              Send to Ultravi0let
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:rotate-45"
              />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  textarea,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  const base =
    "peer w-full rounded-xl border border-ink-950/10 bg-paper-50/50 px-4 pb-3 pt-5 text-sm text-ink-950 placeholder-transparent transition-colors focus:border-accent focus:outline-none";

  return (
    <label className="group relative block">
      {textarea ? (
        <textarea
          name={name}
          rows={4}
          required={required}
          placeholder={label}
          className={base + " resize-none"}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          placeholder={label}
          className={base}
        />
      )}
      <span className="pointer-events-none absolute left-4 top-2 text-[10px] uppercase tracking-[0.18em] text-ink-950/65 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-ink-950/55 peer-focus:top-2 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.18em] peer-focus:text-accent">
        {label}
      </span>
    </label>
  );
}

function ContactRow({
  icon: Icon,
  label,
  href,
}: {
  icon: LucideIcon;
  label: string;
  href?: string;
}) {
  const inner = (
    <>
      <Icon size={14} strokeWidth={1.6} className="text-ink-950/50" />
      <span>{label}</span>
    </>
  );
  return href ? (
    <a
      href={href}
      className="group inline-flex items-center gap-3 rounded-full border border-ink-950/10 bg-ink-950/[0.02] px-4 py-2.5 transition-colors hover:border-ink-950/25 hover:text-ink-950"
    >
      {inner}
    </a>
  ) : (
    <div className="inline-flex items-center gap-3 rounded-full border border-ink-950/10 bg-ink-950/[0.02] px-4 py-2.5">
      {inner}
    </div>
  );
}
