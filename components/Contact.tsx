"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, Check, Mail, MapPin, type LucideIcon } from "lucide-react";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const data = new FormData(e.currentTarget);
    const payload = {
      name: data.get("name"),
      company: data.get("company"),
      email: data.get("email"),
      message: data.get("message"),
    };

    setStatus("sending");
    setErrorMessage(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const { error } = await res
          .json()
          .catch(() => ({ error: null }));
        throw new Error(error ?? `HTTP ${res.status}`);
      }
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Could not send. Try again."
      );
    }
  }

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

          {/* Right: form / thank-you */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative isolate overflow-hidden rounded-3xl border border-ink-950/10 bg-paper-100/70 p-7 backdrop-blur-xl md:p-9"
          >
            <AnimatePresence mode="wait" initial={false}>
              {status === "sent" ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-start gap-5 py-6"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-violet-700/15 text-violet-700">
                    <Check size={22} strokeWidth={2} />
                  </span>
                  <h3 className="font-display text-3xl leading-tight text-ink-950 md:text-4xl">
                    Got it.{" "}
                    <span className="serif-italic text-accent">Talk soon.</span>
                  </h3>
                  <p className="max-w-md text-base text-ink-950/65">
                    Your message landed in our inbox. We&apos;ll come back
                    within 24 hours with three honest sentences about whether
                    we&apos;re the right team.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  aria-busy={status === "sending"}
                  className="flex flex-col gap-4"
                >
                  <fieldset
                    disabled={status === "sending"}
                    className="flex flex-col gap-4 disabled:opacity-70"
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
                      className="group mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-violet-700/30 bg-violet-700/10 px-6 py-4 text-sm font-medium text-ink-950 backdrop-blur-sm transition-all hover:border-violet-700 hover:bg-violet-700 hover:text-paper-50 hover:violet-glow disabled:cursor-not-allowed"
                    >
                      {status === "sending" ? "Sending…" : "Send to Ultravi0let"}
                      <ArrowUpRight
                        size={16}
                        className="transition-transform group-hover:rotate-45"
                      />
                    </button>
                  </fieldset>

                  {status === "error" && errorMessage && (
                    <p
                      role="alert"
                      className="text-sm text-red-700/90"
                    >
                      {errorMessage}. You can also email us at{" "}
                      <a
                        href="mailto:hello@ultravi0let.com"
                        className="underline underline-offset-2"
                      >
                        hello@ultravi0let.com
                      </a>
                      .
                    </p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
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
