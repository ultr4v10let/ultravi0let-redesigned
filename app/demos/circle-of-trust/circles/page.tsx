"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  Coins,
  Filter,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";

const CIRCLES = [
  {
    id: "layali-family",
    name: "Layali Family Circle",
    size: 8,
    monthly: 1500,
    currency: "AED",
    cycle: 8,
    open: 5,
    payout: 12000,
    type: "family",
    nextStart: "May 1",
    description: "Founded by the Mansour family in Dubai. Open to two more relatives or close friends.",
  },
  {
    id: "founders-dxb",
    name: "Founders Group · Dubai",
    size: 12,
    monthly: 5000,
    currency: "AED",
    cycle: 12,
    open: 12,
    payout: 60000,
    type: "professional",
    nextStart: "Forming",
    description: "Founders and senior operators saving toward equipment, hiring, and team retreats.",
  },
  {
    id: "sherouq-eng",
    name: "Sherouq Engineers",
    size: 6,
    monthly: 4000,
    currency: "EGP",
    cycle: 6,
    open: 1,
    payout: 24000,
    type: "professional",
    nextStart: "Apr 25",
    description: "Tight-knit group of engineers in Cairo. Closing soon — one slot left.",
  },
  {
    id: "qcc-savers",
    name: "QCC Savers Club",
    size: 10,
    monthly: 2000,
    currency: "QAR",
    cycle: 10,
    open: 6,
    payout: 20000,
    type: "community",
    nextStart: "Jun 1",
    description: "Open community circle for Qatari residents. Verified members only.",
  },
  {
    id: "moms-of-mira",
    name: "Mothers of Mira Estates",
    size: 6,
    monthly: 1000,
    currency: "AED",
    cycle: 6,
    open: 2,
    payout: 6000,
    type: "family",
    nextStart: "May 15",
    description: "Neighbourhood circle of mothers based in Mira Estates, Dubai. Bi-monthly meetups.",
  },
  {
    id: "khobar-pros",
    name: "Khobar Professionals",
    size: 12,
    monthly: 3000,
    currency: "SAR",
    cycle: 12,
    open: 7,
    payout: 36000,
    type: "professional",
    nextStart: "May 5",
    description: "Saudi-based professional circle. KYC + employer verification required.",
  },
];

const TYPES = [
  { v: "any", l: "All circles" },
  { v: "family", l: "Family" },
  { v: "professional", l: "Professional" },
  { v: "community", l: "Community" },
];

export default function CirclesBrowse() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("any");
  const [maxMonthly, setMaxMonthly] = useState(10000);
  const [joinedId, setJoinedId] = useState<string | null>(null);
  const [kycStep, setKycStep] = useState(0); // 0 = closed, 1..4 = steps

  const filtered = useMemo(
    () =>
      CIRCLES.filter((c) => {
        if (q && !c.name.toLowerCase().includes(q.toLowerCase())) return false;
        if (type !== "any" && c.type !== type) return false;
        if (c.monthly > maxMonthly) return false;
        return true;
      }),
    [q, type, maxMonthly]
  );

  const requestJoin = (id: string) => {
    setJoinedId(id);
    setKycStep(1);
  };

  return (
    <main className="mx-auto max-w-[1240px] px-6 py-12 md:px-10 md:py-16">
      <div className="text-[11px] uppercase tracking-[0.22em] text-[#B85138]">
        Browse circles
      </div>
      <h1
        className="mt-3 text-[clamp(2rem,4.4vw,3.6rem)] leading-tight"
        style={{ fontFamily: "var(--cot-display)" }}
      >
        Find your circle.
      </h1>

      {/* Filter rail */}
      <div className="mt-10 grid grid-cols-1 gap-3 rounded-2xl border border-[#28160E]/12 bg-white p-3 md:grid-cols-[1.4fr_1fr_1fr] md:p-4">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#28160E]/45"
          />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search circles"
            className="w-full rounded-xl border border-[#28160E]/10 bg-[#FBF2E4] py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#B85138]"
          />
        </div>
        <div className="flex items-center gap-2">
          {TYPES.map((t) => (
            <button
              key={t.v}
              onClick={() => setType(t.v)}
              className={`rounded-xl px-3 py-2 text-sm transition-colors ${
                type === t.v
                  ? "bg-[#28160E] text-[#FBF2E4]"
                  : "border border-[#28160E]/15 text-[#28160E]/80 hover:border-[#28160E]/35"
              }`}
            >
              {t.l}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-3 rounded-xl border border-[#28160E]/10 bg-[#FBF2E4] px-3 py-2 text-sm">
          <Filter size={14} className="text-[#28160E]/55" />
          <span className="text-[11px] uppercase tracking-[0.16em] text-[#28160E]/65">
            Max
          </span>
          <input
            type="range"
            min={500}
            max={10000}
            step={500}
            value={maxMonthly}
            onChange={(e) => setMaxMonthly(parseInt(e.target.value))}
            className="flex-1"
          />
          <span className="w-16 text-right font-mono text-xs">{maxMonthly}</span>
        </label>
      </div>

      <div className="mt-6 text-sm text-[#28160E]/65">
        {filtered.length} circles match your filters
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {filtered.map((c) => (
          <article
            key={c.id}
            className="flex flex-col gap-5 rounded-2xl border border-[#28160E]/12 bg-white p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-[#B85138]">
                  {c.type}
                </div>
                <h3
                  className="mt-1 text-2xl"
                  style={{ fontFamily: "var(--cot-display)" }}
                >
                  {c.name}
                </h3>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-[#B85138]/15 px-2.5 py-1 text-[11px] font-medium text-[#B85138]">
                <Users size={12} />
                {c.open}/{c.size}
              </span>
            </div>

            <p className="text-sm leading-relaxed text-[#28160E]/75">
              {c.description}
            </p>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-3 rounded-xl bg-[#FBF2E4] p-4 text-sm">
              <Cell k="Monthly" v={`${c.monthly.toLocaleString()} ${c.currency}`} mono />
              <Cell k="Payout" v={`${c.payout.toLocaleString()} ${c.currency}`} mono accent />
              <Cell k="Cycle length" v={`${c.cycle} months`} />
              <Cell k="Starts" v={c.nextStart} />
            </dl>

            <div className="flex items-center justify-between gap-3 border-t border-[#28160E]/10 pt-4">
              <div className="flex items-center gap-2 text-[11px] text-[#28160E]/65">
                <ShieldCheck size={13} className="text-[#B85138]" />
                Smart contract escrow
              </div>
              <button
                onClick={() => requestJoin(c.id)}
                className="inline-flex items-center gap-2 rounded-full bg-[#B85138] px-4 py-2 text-sm font-medium text-[#FBF2E4] transition-colors hover:bg-[#9F4129]"
              >
                Request to join
                <Coins size={14} />
              </button>
            </div>
          </article>
        ))}
      </div>

      {joinedId && (
        <KycModal
          circle={CIRCLES.find((c) => c.id === joinedId)!}
          step={kycStep}
          setStep={setKycStep}
          close={() => {
            setJoinedId(null);
            setKycStep(0);
          }}
        />
      )}
    </main>
  );
}

function Cell({
  k,
  v,
  mono,
  accent,
}: {
  k: string;
  v: string;
  mono?: boolean;
  accent?: boolean;
}) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-[0.16em] text-[#28160E]/55">
        {k}
      </dt>
      <dd
        className={`mt-0.5 ${mono ? "font-mono" : ""} ${
          accent ? "text-[#B85138]" : "text-[#28160E]"
        }`}
      >
        {v}
      </dd>
    </div>
  );
}

const KYC_STEPS = [
  { t: "Identity", d: "Capture passport / Emirates ID. Sumsub verifies in seconds." },
  { t: "Liveness", d: "Brief selfie video to match against your ID. No data leaves the device." },
  { t: "Source of funds", d: "Declare your source of income for AML/CFT compliance." },
  { t: "Sign contract", d: "Cryptographically sign the smart-contract terms." },
];

function KycModal({
  circle,
  step,
  setStep,
  close,
}: {
  circle: (typeof CIRCLES)[number];
  step: number;
  setStep: (n: number) => void;
  close: () => void;
}) {
  const done = step > KYC_STEPS.length;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#28160E]/40 p-4 backdrop-blur-sm md:items-center">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-[#28160E]/15 bg-[#FBF2E4]">
        <div className="flex items-center justify-between border-b border-[#28160E]/10 px-6 py-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-[#B85138]">
              Joining
            </div>
            <div
              className="text-xl"
              style={{ fontFamily: "var(--cot-display)" }}
            >
              {circle.name}
            </div>
          </div>
          <button
            onClick={close}
            className="text-sm text-[#28160E]/55 hover:text-[#28160E]"
          >
            Close
          </button>
        </div>

        {!done ? (
          <div className="px-6 py-8">
            <div className="mb-7 flex items-center gap-2">
              {KYC_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full ${
                    i + 1 <= step ? "bg-[#B85138]" : "bg-[#28160E]/12"
                  }`}
                />
              ))}
            </div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-[#28160E]/55">
              Step {step} of {KYC_STEPS.length}
            </div>
            <h3
              className="mt-2 text-2xl"
              style={{ fontFamily: "var(--cot-display)" }}
            >
              {KYC_STEPS[step - 1].t}
            </h3>
            <p className="mt-3 text-sm text-[#28160E]/75">
              {KYC_STEPS[step - 1].d}
            </p>

            {/* Step-specific mock UI */}
            <div className="mt-6 rounded-2xl border border-dashed border-[#28160E]/20 bg-white p-8 text-center text-[#28160E]/55">
              <BadgeCheck className="mx-auto text-[#B85138]" size={28} />
              <div className="mt-3 text-sm">Demo placeholder</div>
            </div>

            <div className="mt-7 flex items-center justify-between gap-3">
              <button
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className="text-sm text-[#28160E]/65 hover:text-[#28160E] disabled:opacity-40"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(step + 1)}
                className="inline-flex items-center gap-2 rounded-full bg-[#B85138] px-5 py-2.5 text-sm font-medium text-[#FBF2E4] hover:bg-[#9F4129]"
              >
                {step === KYC_STEPS.length ? "Sign and join" : "Continue"} →
              </button>
            </div>
          </div>
        ) : (
          <div className="px-6 py-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#B85138] text-[#FBF2E4]">
              <BadgeCheck size={26} strokeWidth={2.2} />
            </div>
            <h3
              className="mt-5 text-2xl"
              style={{ fontFamily: "var(--cot-display)" }}
            >
              You&apos;re in.
            </h3>
            <p className="mt-3 text-sm text-[#28160E]/75">
              Smart contract signed. Your first contribution of{" "}
              <span className="font-medium text-[#28160E]">
                {circle.monthly.toLocaleString()} {circle.currency}
              </span>{" "}
              is scheduled for the first of next month.
            </p>
            <Link
              href="/demos/circle-of-trust/dashboard"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#28160E] px-5 py-2.5 text-sm font-medium text-[#FBF2E4] hover:bg-[#B85138]"
            >
              Open my portfolio →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
