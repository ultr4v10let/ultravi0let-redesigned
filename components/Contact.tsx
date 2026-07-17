"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, Check, Mail, type LucideIcon } from "lucide-react";
import { SpectrumMark } from "./Logo";

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
        const { error } = await res.json().catch(() => ({ error: null }));
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
    <section
      id="contact"
      className="relative isolate overflow-hidden border-t border-[var(--line)] py-16 sm:py-20 md:py-28"
    >
      {/* single understated violet glow, top-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-0 -z-10 h-[420px] w-[420px] rounded-full opacity-30 blur-[120px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(124,58,237,0.5) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-[1440px] px-5 sm:px-6 md:px-10">
        <div className="grid items-start gap-8 md:grid-cols-2 md:items-end md:gap-12">
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
            <h2 className="font-display text-[clamp(2rem,9vw,5.5rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.04em] text-paper-50">
              Got an idea?
              <br />
              <span className="text-signal">Let&apos;s make</span>
              <br />
              it fly
            </h2>
            <p className="max-w-md text-balance text-[15px] leading-relaxed text-paper-50/65 md:text-base">
              Tell us what you&apos;re building. We&apos;ll come back within 24
              hours with three honest sentences about whether we&apos;re the
              right team.
            </p>

            <div className="mt-4">
              <ContactRow
                icon={Mail}
                label="hello@ultravi0let.com"
                href="mailto:hello@ultravi0let.com"
              />
            </div>
          </motion.div>

          {/* Right: form / thank-you */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="panel relative isolate overflow-hidden rounded-3xl p-5 sm:p-7 md:p-9"
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
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-violet-600/20 text-violet-300">
                    <Check size={22} strokeWidth={2} />
                  </span>
                  <h3 className="font-display text-2xl font-bold uppercase leading-tight text-paper-50 md:text-3xl">
                    Got it. <span className="text-signal">Talk soon.</span>
                  </h3>
                  <p className="max-w-md text-[15px] text-paper-50/65">
                    Your message landed in our inbox. We&apos;ll come back within
                    24 hours with three honest sentences about whether we&apos;re
                    the right team.
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
                      className="group mt-4 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-violet-600 px-6 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-paper-50 transition-colors hover:bg-violet-700 disabled:cursor-not-allowed sm:py-4"
                    >
                      {status === "sending" ? "Sending…" : "Send to Ultravi0let"}
                      {status === "sending" ? (
                        <SpectrumMark size={12} animated />
                      ) : (
                        <ArrowUpRight
                          size={16}
                          className="transition-transform group-hover:rotate-45"
                        />
                      )}
                    </button>
                  </fieldset>

                  {status === "error" && errorMessage && (
                    <p role="alert" className="text-sm text-red-300">
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
    "peer w-full rounded-xl border border-[var(--line)] bg-white/[0.02] px-4 pb-3 pt-5 text-sm text-paper-50 placeholder-transparent transition-colors focus:border-violet-400 focus:outline-none";

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
      <span className="pointer-events-none absolute left-4 top-2 font-mono text-[10px] uppercase tracking-[0.18em] text-paper-50/60 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:font-sans peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-paper-50/45 peer-focus:top-2 peer-focus:font-mono peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.18em] peer-focus:text-violet-300">
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
      <Icon size={14} strokeWidth={1.6} className="shrink-0 text-violet-300/70" />
      <span className="min-w-0 break-all font-mono text-[13px] tracking-tight sm:break-normal">
        {label}
      </span>
    </>
  );
  return href ? (
    <a
      href={href}
      className="group inline-flex max-w-full items-center gap-3 rounded-full border border-[var(--line)] px-4 py-2.5 text-paper-50/85 transition-colors hover:border-violet-400/40 hover:text-paper-50"
    >
      {inner}
    </a>
  ) : (
    <div className="inline-flex max-w-full items-center gap-3 rounded-full border border-[var(--line)] px-4 py-2.5 text-paper-50/85">
      {inner}
    </div>
  );
}
