"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, Calendar, Check, Clock } from "lucide-react";
import Link from "next/link";

const practiceAreas = [
  "Corporate & M&A",
  "Banking & Finance",
  "Dispute Resolution",
  "Energy & Infrastructure",
  "Tax & Regulatory",
  "Other",
];

const attorneys = [
  { v: "any", n: "First available" },
  { v: "ahmed", n: "Ahmed Abdelgawad" },
  { v: "yasmin", n: "Yasmin El-Sherbini" },
  { v: "karim", n: "Karim Madkour" },
  { v: "layla", n: "Layla Mansour" },
];

const times = ["09:30", "10:30", "11:30", "14:00", "15:00", "16:00"];

function nextWeekdays(n: number) {
  const out: { iso: string; label: string; day: string; date: string }[] = [];
  const start = new Date();
  let cursor = new Date(start);
  cursor.setHours(0, 0, 0, 0);
  while (out.length < n) {
    cursor.setDate(cursor.getDate() + 1);
    const dow = cursor.getDay();
    if (dow === 5) continue; // Friday off in Egypt
    out.push({
      iso: cursor.toISOString().slice(0, 10),
      label: cursor.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short",
      }),
      day: cursor.toLocaleDateString("en-GB", { weekday: "short" }),
      date: cursor.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      }),
    });
  }
  return out;
}

export default function BookConsultation() {
  const dates = useMemo(() => nextWeekdays(8), []);
  const [step, setStep] = useState<"form" | "done">("form");
  const [matter, setMatter] = useState(practiceAreas[0]);
  const [attorney, setAttorney] = useState("any");
  const [date, setDate] = useState(dates[0]?.iso);
  const [time, setTime] = useState(times[1]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [ref, setRef] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const r =
      "AG-" +
      Math.random().toString(36).slice(2, 6).toUpperCase() +
      "-" +
      String(Date.now()).slice(-4);
    setRef(r);
    setStep("done");
    window.scrollTo({ top: 0 });
  };

  if (step === "done") {
    const att = attorneys.find((a) => a.v === attorney)?.n;
    const dt = dates.find((d) => d.iso === date)?.label;
    return (
      <main className="mx-auto max-w-[820px] px-6 py-20 md:py-32">
        <div className="text-[11px] uppercase tracking-[0.28em] text-[#B89466]">
          Confirmed
        </div>
        <h1
          className="mt-4 text-[clamp(2.2rem,5vw,4rem)] leading-[1.05]"
          style={{ fontFamily: "var(--agl-display)" }}
        >
          Your request has been
          <br />
          <em>received with thanks.</em>
        </h1>
        <p className="mt-6 max-w-xl text-[#0F1A33]/75">
          A member of our chambers will confirm by email within one business
          day. Should the matter require urgent attention, our duty partner can
          be reached on the emergency line provided in your confirmation.
        </p>

        <div className="mt-12 overflow-hidden rounded-sm border border-[#0F1A33]/15 bg-[#F6F1E6]">
          <div className="border-b border-[#0F1A33]/10 bg-[#0F1A33]/[0.03] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[#0F1A33]/65">
            Reference {ref}
          </div>
          <dl className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 md:p-8">
            <Row label="Name" value={name} />
            <Row label="Email" value={email} />
            <Row label="Matter" value={matter} />
            <Row label="Counsel" value={att || "—"} />
            <Row label="Requested date" value={dt || "—"} />
            <Row label="Requested time" value={`${time} EET`} />
            {notes && <Row label="Notes" value={notes} full />}
          </dl>
        </div>

        <div className="mt-10 flex gap-3">
          <Link
            href="/demos/ag-law"
            className="inline-flex items-center gap-2 rounded-sm border border-[#0F1A33]/40 px-5 py-3 text-[12px] uppercase tracking-[0.18em] hover:bg-[#0F1A33]/5"
          >
            <ArrowLeft size={14} /> Back to home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1240px] px-6 py-16 md:px-10 md:py-24">
      <div className="text-[11px] uppercase tracking-[0.28em] text-[#B89466]">
        New consultation
      </div>
      <h1
        className="mt-4 text-[clamp(2.2rem,5vw,4rem)] leading-[1.05]"
        style={{ fontFamily: "var(--agl-display)" }}
      >
        Request an appointment.
      </h1>
      <p className="mt-5 max-w-xl text-[#0F1A33]/75">
        Provide a brief outline of the matter. Communications are protected by
        attorney-client privilege from the moment they reach our chambers.
      </p>

      <form
        onSubmit={onSubmit}
        className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-[1fr_360px]"
      >
        {/* Form */}
        <div className="space-y-8">
          {/* Matter */}
          <Section title="Area of practice">
            <div className="flex flex-wrap gap-2">
              {practiceAreas.map((p) => (
                <Chip
                  key={p}
                  selected={matter === p}
                  onClick={() => setMatter(p)}
                >
                  {p}
                </Chip>
              ))}
            </div>
          </Section>

          {/* Attorney */}
          <Section title="Preferred counsel">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {attorneys.map((a) => (
                <label
                  key={a.v}
                  className={`flex cursor-pointer items-center gap-3 rounded-sm border px-4 py-3 text-sm transition-colors ${
                    attorney === a.v
                      ? "border-[#0F1A33] bg-[#0F1A33]/[0.04]"
                      : "border-[#0F1A33]/15 hover:border-[#0F1A33]/35"
                  }`}
                >
                  <input
                    type="radio"
                    name="attorney"
                    value={a.v}
                    checked={attorney === a.v}
                    onChange={() => setAttorney(a.v)}
                    className="sr-only"
                  />
                  <span
                    className={`h-3.5 w-3.5 rounded-full border ${
                      attorney === a.v
                        ? "border-[#0F1A33] bg-[#0F1A33]"
                        : "border-[#0F1A33]/40"
                    }`}
                  />
                  {a.n}
                </label>
              ))}
            </div>
          </Section>

          {/* Date */}
          <Section
            title="Date"
            icon={<Calendar size={14} className="text-[#B89466]" />}
          >
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {dates.map((d) => (
                <button
                  type="button"
                  key={d.iso}
                  onClick={() => setDate(d.iso)}
                  className={`flex flex-col items-start gap-1 rounded-sm border px-3 py-3 text-left text-sm transition-colors ${
                    date === d.iso
                      ? "border-[#0F1A33] bg-[#0F1A33] text-[#F6F1E6]"
                      : "border-[#0F1A33]/15 hover:border-[#0F1A33]/35"
                  }`}
                >
                  <span className="text-[10px] uppercase tracking-[0.18em] opacity-70">
                    {d.day}
                  </span>
                  <span
                    className="text-base"
                    style={{ fontFamily: "var(--agl-display)" }}
                  >
                    {d.date}
                  </span>
                </button>
              ))}
            </div>
          </Section>

          {/* Time */}
          <Section
            title="Time (EET)"
            icon={<Clock size={14} className="text-[#B89466]" />}
          >
            <div className="flex flex-wrap gap-2">
              {times.map((t) => (
                <Chip key={t} selected={time === t} onClick={() => setTime(t)}>
                  {t}
                </Chip>
              ))}
            </div>
          </Section>

          {/* Contact */}
          <Section title="Your details">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <Field label="Full name" value={name} onChange={setName} required />
              <Field
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                required
              />
              <Field
                label="Phone"
                value={phone}
                onChange={setPhone}
                className="md:col-span-2"
              />
              <Field
                label="Brief outline of the matter"
                value={notes}
                onChange={setNotes}
                textarea
                className="md:col-span-2"
              />
            </div>
          </Section>
        </div>

        {/* Summary rail */}
        <aside className="md:sticky md:top-28 md:self-start">
          <div className="rounded-sm border border-[#0F1A33]/15 bg-[#F6F1E6]">
            <div className="border-b border-[#0F1A33]/10 bg-[#0F1A33]/[0.03] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[#0F1A33]/65">
              Summary
            </div>
            <dl className="space-y-3 p-5 text-sm">
              <SummaryRow k="Matter" v={matter} />
              <SummaryRow
                k="Counsel"
                v={attorneys.find((a) => a.v === attorney)?.n || "—"}
              />
              <SummaryRow
                k="Date"
                v={dates.find((d) => d.iso === date)?.label || "—"}
              />
              <SummaryRow k="Time" v={`${time} EET`} />
              <SummaryRow k="Estimated duration" v="45 minutes" />
              <SummaryRow k="Fee" v="Complimentary first call" />
            </dl>
            <div className="border-t border-[#0F1A33]/10 p-5">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[#0F1A33] px-5 py-3 text-[12px] uppercase tracking-[0.2em] text-[#F6F1E6] transition-colors hover:bg-[#B89466]"
              >
                <Check size={14} />
                Request consultation
              </button>
              <p className="mt-4 text-[11px] leading-relaxed text-[#0F1A33]/55">
                Submitting does not create an attorney-client relationship.
                You will receive a confirmation by email within one business
                day.
              </p>
            </div>
          </div>
        </aside>
      </form>
    </main>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#0F1A33]/65">
        {icon}
        {title}
      </div>
      {children}
    </section>
  );
}

function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-sm border px-4 py-2 text-sm transition-colors ${
        selected
          ? "border-[#0F1A33] bg-[#0F1A33] text-[#F6F1E6]"
          : "border-[#0F1A33]/20 text-[#0F1A33] hover:border-[#0F1A33]/45"
      }`}
    >
      {children}
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  textarea,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  className?: string;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="block pb-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#0F1A33]/55">
        {label}
        {required && <span className="ml-1 text-[#B89466]">*</span>}
      </span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          rows={4}
          className="w-full resize-none rounded-sm border border-[#0F1A33]/20 bg-[#F6F1E6] px-3 py-2.5 text-sm text-[#0F1A33] outline-none transition-colors focus:border-[#0F1A33]"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="w-full rounded-sm border border-[#0F1A33]/20 bg-[#F6F1E6] px-3 py-2.5 text-sm text-[#0F1A33] outline-none transition-colors focus:border-[#0F1A33]"
        />
      )}
    </label>
  );
}

function SummaryRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-[11px] uppercase tracking-[0.18em] text-[#0F1A33]/55">
        {k}
      </span>
      <span className="text-right">{v}</span>
    </div>
  );
}

function Row({
  label,
  value,
  full,
}: {
  label: string;
  value: string;
  full?: boolean;
}) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0F1A33]/55">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-[#0F1A33]">{value}</dd>
    </div>
  );
}
