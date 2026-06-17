"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, Copy, Video } from "lucide-react";

const times = [
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "14:00",
  "15:00",
  "16:00",
  "20:00",
  "21:00",
  "22:00",
];

const concerns = [
  "Fever / general illness",
  "Mental health",
  "Skin issue",
  "Follow-up consultation",
  "Second opinion",
  "Paediatric concern",
  "Other",
];

function nextDays(n: number) {
  const out: { iso: string; label: string }[] = [];
  const start = new Date();
  for (let i = 0; i < n; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    out.push({
      iso: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short",
      }),
    });
  }
  return out;
}

export default function BookPage() {
  const days = useMemo(() => nextDays(10), []);
  const [date, setDate] = useState(days[0].iso);
  const [time, setTime] = useState("");
  const [concern, setConcern] = useState(concerns[0]);
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!time) return;
    setSubmitted(true);
    window.scrollTo({ top: 0 });
  };

  if (submitted) {
    const meeting = `lumen.video/${Math.random().toString(36).slice(2, 8)}`;
    return (
      <main className="mx-auto max-w-[820px] px-6 py-16 md:py-24">
        <div className="rounded-3xl border border-[#1F6B5C]/30 bg-white p-8 md:p-12">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1F6B5C] text-white">
            <Check size={22} strokeWidth={2.4} />
          </div>
          <h1
            className="mt-6 text-[clamp(1.9rem,4vw,3rem)] leading-[1.05]"
            style={{ fontFamily: "var(--lumen-display)" }}
          >
            You&apos;re booked.
          </h1>
          <p className="mt-4 text-[#0D2A26]/75">
            Confirmation sent to your phone. Your clinician will join the call
            two minutes before the scheduled time. The meeting link below works
            on any device — no app required.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Cell k="Patient" v={name} />
            <Cell k="Phone" v={phone} />
            <Cell k="Concern" v={concern} />
            <Cell
              k="Appointment"
              v={`${days.find((d) => d.iso === date)?.label} · ${time} GST`}
            />
          </div>

          <div className="mt-8 rounded-2xl border border-[#1F6B5C]/25 bg-[#E5F0ED] p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#1F6B5C]">
                  Meeting link
                </div>
                <div className="mt-1.5 flex items-center gap-2 font-mono text-sm">
                  <Video size={14} className="text-[#1F6B5C]" />
                  https://{meeting}
                </div>
              </div>
              <button
                onClick={() => navigator.clipboard?.writeText(`https://${meeting}`)}
                className="rounded-lg border border-[#1F6B5C]/30 bg-white px-3 py-1.5 text-xs font-medium text-[#1F6B5C] transition-colors hover:bg-[#1F6B5C] hover:text-white"
              >
                <Copy size={13} className="inline-block" /> Copy
              </button>
            </div>
            <p className="mt-3 text-xs text-[#0D2A26]/65">
              You&apos;ll also receive an SMS and email reminder 10 minutes
              before the call.
            </p>
          </div>

          <div className="mt-10 flex gap-3">
            <Link
              href="/demos/lumen-health/doctors"
              className="inline-flex items-center gap-2 rounded-full border border-[#0D2A26]/15 px-5 py-2.5 text-sm hover:border-[#0D2A26]/35"
            >
              Book another
            </Link>
            <Link
              href="/demos/lumen-health"
              className="inline-flex items-center gap-2 rounded-full bg-[#1F6B5C] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#16544A]"
            >
              Done
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1100px] px-6 py-12 md:px-10 md:py-16">
      <div className="text-[11px] uppercase tracking-[0.22em] text-[#1F6B5C]">
        Book consultation
      </div>
      <h1
        className="mt-3 text-[clamp(2rem,4vw,3.4rem)] leading-[1.05]"
        style={{ fontFamily: "var(--lumen-display)" }}
      >
        When works for you?
      </h1>

      <form
        onSubmit={onSubmit}
        className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-[1.4fr_1fr]"
      >
        <div className="space-y-8">
          {/* Date */}
          <div>
            <Label>Choose a date</Label>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
              {days.map((d) => (
                <button
                  type="button"
                  key={d.iso}
                  onClick={() => setDate(d.iso)}
                  className={`flex shrink-0 flex-col items-center gap-0.5 rounded-2xl border px-4 py-3 text-sm transition-colors ${
                    date === d.iso
                      ? "border-[#1F6B5C] bg-[#1F6B5C] text-white"
                      : "border-[#0D2A26]/15 bg-white hover:border-[#0D2A26]/30"
                  }`}
                >
                  <span className="text-[10px] uppercase tracking-[0.15em] opacity-75">
                    {d.label.split(" ")[0]}
                  </span>
                  <span
                    className="text-base"
                    style={{ fontFamily: "var(--lumen-display)" }}
                  >
                    {d.label.split(" ").slice(1).join(" ")}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Time */}
          <div>
            <Label>Available times (GST)</Label>
            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
              {times.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setTime(t)}
                  className={`rounded-xl border px-3 py-2.5 text-sm transition-colors ${
                    time === t
                      ? "border-[#1F6B5C] bg-[#1F6B5C] text-white"
                      : "border-[#0D2A26]/15 bg-white hover:border-[#0D2A26]/30"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Reason */}
          <div>
            <Label>What can the doctor help with?</Label>
            <div className="mt-3 flex flex-wrap gap-2">
              {concerns.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setConcern(c)}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    concern === c
                      ? "border-[#1F6B5C] bg-[#E5F0ED] text-[#1F6B5C]"
                      : "border-[#0D2A26]/15 hover:border-[#0D2A26]/30"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Optional — anything specific the clinician should know"
              className="mt-3 w-full resize-none rounded-2xl border border-[#0D2A26]/10 bg-white p-3 text-sm outline-none transition-colors focus:border-[#1F6B5C]"
            />
          </div>

          {/* Contact */}
          <div>
            <Label>Your details</Label>
            <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
              <Input
                label="Full name"
                value={name}
                onChange={setName}
                required
              />
              <Input
                label="Mobile number"
                value={phone}
                onChange={setPhone}
                required
              />
            </div>
          </div>
        </div>

        {/* Summary */}
        <aside className="md:sticky md:top-24 md:self-start">
          <div className="rounded-2xl border border-[#0D2A26]/10 bg-white p-6">
            <div className="text-[11px] uppercase tracking-[0.18em] text-[#1F6B5C]">
              Your appointment
            </div>
            <dl className="mt-5 space-y-3 text-sm">
              <SumRow k="Date" v={days.find((d) => d.iso === date)?.label || "—"} />
              <SumRow k="Time" v={time || "Select a time"} />
              <SumRow k="Concern" v={concern} />
              <SumRow k="Modality" v="Video · 15 minutes" />
              <SumRow k="Fee" v="AED 120 (covered by most insurance)" />
            </dl>
            <button
              type="submit"
              disabled={!time || !name || !phone}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1F6B5C] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#16544A] disabled:cursor-not-allowed disabled:bg-[#0D2A26]/15 disabled:text-[#0D2A26]/40"
            >
              <Video size={15} />
              Confirm booking
            </button>
            <p className="mt-3 text-[11px] leading-relaxed text-[#0D2A26]/55">
              Cancel up to 30 minutes before for a full refund.
            </p>
          </div>
        </aside>
      </form>
    </main>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] uppercase tracking-[0.18em] text-[#0D2A26]/65">
      {children}
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block pb-1 text-[11px] uppercase tracking-[0.16em] text-[#0D2A26]/55">
        {label}
      </span>
      <input
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-[#0D2A26]/10 bg-white px-3 py-2.5 text-sm outline-none transition-colors focus:border-[#1F6B5C]"
      />
    </label>
  );
}

function SumRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-[11px] uppercase tracking-[0.16em] text-[#0D2A26]/55">
        {k}
      </span>
      <span className="text-right text-[#0D2A26]">{v}</span>
    </div>
  );
}

function Cell({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-2xl border border-[#0D2A26]/10 bg-[#F4F8F7] p-4">
      <div className="text-[10px] uppercase tracking-[0.18em] text-[#0D2A26]/55">
        {k}
      </div>
      <div className="mt-1 text-sm text-[#0D2A26]">{v}</div>
    </div>
  );
}
