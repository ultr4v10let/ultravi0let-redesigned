"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarClock,
  FileCode2,
  Wallet,
} from "lucide-react";

const myCircle = {
  name: "Layali Family Circle",
  size: 8,
  monthly: 1500,
  currency: "AED",
  payout: 12000,
  position: 4,
  cycle: 8,
  contract: "0x4f8…b3c2",
};

const schedule = [
  { m: "Apr 2026", who: "Layla Mansour", state: "paid" },
  { m: "May 2026", who: "Hossam Eid", state: "paid" },
  { m: "Jun 2026", who: "Karim Tarek", state: "paid" },
  { m: "Jul 2026", who: "You", state: "next" },
  { m: "Aug 2026", who: "Reem Mansour", state: "future" },
  { m: "Sep 2026", who: "Omar Saleh", state: "future" },
  { m: "Oct 2026", who: "Sara Khalil", state: "future" },
  { m: "Nov 2026", who: "Tarek Ali", state: "future" },
];

const ledger = [
  { id: "L-008", date: "Apr 12", desc: "Contribution · April cycle", debit: 0, credit: 1500, ref: "0x4f8…fb9a" },
  { id: "L-007", date: "Mar 12", desc: "Contribution · March cycle", debit: 0, credit: 1500, ref: "0x4f8…7a31" },
  { id: "L-006", date: "Feb 12", desc: "Contribution · February cycle", debit: 0, credit: 1500, ref: "0x4f8…2d70" },
  { id: "L-005", date: "Jan 12", desc: "Contribution · January cycle", debit: 0, credit: 1500, ref: "0x4f8…81e9" },
];

export default function Portfolio() {
  const totalContributed = ledger.reduce((s, l) => s + l.credit, 0);
  const monthsLeft = myCircle.cycle - myCircle.position;

  return (
    <main className="mx-auto max-w-[1240px] px-6 py-10 md:px-10 md:py-14">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-[#B85138]">
            Portfolio
          </div>
          <h1
            className="mt-2 text-[clamp(1.8rem,3.6vw,2.8rem)]"
            style={{ fontFamily: "var(--cot-display)" }}
          >
            {myCircle.name}
          </h1>
          <div className="mt-1 inline-flex items-center gap-2 text-[12px] text-[#28160E]/65">
            <FileCode2 size={13} className="text-[#B85138]" />
            Contract <span className="font-mono">{myCircle.contract}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#B85138]/15 px-2 py-0.5 text-[11px] text-[#B85138]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#B85138] animate-pulse" />
              On-chain · healthy
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 rounded-full border border-[#28160E]/15 bg-white px-4 py-2.5 text-sm hover:border-[#28160E]/35">
            <Wallet size={14} />
            Pay contribution
          </button>
          <button className="inline-flex items-center gap-2 rounded-full bg-[#28160E] px-4 py-2.5 text-sm font-medium text-[#FBF2E4] hover:bg-[#B85138]">
            Invite a member
          </button>
        </div>
      </div>

      {/* KPI row */}
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Kpi
          k="Your payout"
          v={`${myCircle.payout.toLocaleString()} ${myCircle.currency}`}
          sub={`Position ${myCircle.position} of ${myCircle.cycle}`}
          icon={<Wallet size={15} className="text-[#B85138]" />}
        />
        <Kpi
          k="Contributed so far"
          v={`${totalContributed.toLocaleString()} ${myCircle.currency}`}
          sub={`${ledger.length} of ${myCircle.cycle} cycles`}
          icon={<ArrowUpRight size={15} className="text-[#B85138]" />}
        />
        <Kpi
          k="Remaining"
          v={`${(monthsLeft * myCircle.monthly).toLocaleString()} ${myCircle.currency}`}
          sub={`${monthsLeft} cycles left`}
          icon={<CalendarClock size={15} className="text-[#B85138]" />}
        />
        <Kpi
          k="Trust score"
          v="A+"
          sub="0 missed payments"
          icon={<BadgeCheck size={15} className="text-[#B85138]" />}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Schedule */}
        <section className="overflow-hidden rounded-2xl border border-[#28160E]/12 bg-white">
          <div className="border-b border-[#28160E]/10 px-6 py-5">
            <div className="text-[11px] uppercase tracking-[0.18em] text-[#28160E]/55">
              Payout queue
            </div>
            <div
              className="mt-1 text-xl"
              style={{ fontFamily: "var(--cot-display)" }}
            >
              Your turn comes in July
            </div>
          </div>
          <ul>
            {schedule.map((s, i) => (
              <li
                key={s.m}
                className={`flex items-center justify-between gap-3 border-b border-[#28160E]/8 px-6 py-4 last:border-b-0 ${
                  s.state === "next" ? "bg-[#B85138]/8" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full font-mono text-[11px] ${
                      s.state === "paid"
                        ? "bg-[#28160E]/8 text-[#28160E]/65"
                        : s.state === "next"
                        ? "bg-[#B85138] text-[#FBF2E4]"
                        : "border border-dashed border-[#28160E]/25 text-[#28160E]/50"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{s.who}</div>
                    <div className="text-[11px] text-[#28160E]/55">{s.m}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-sm">
                    {myCircle.payout.toLocaleString()} {myCircle.currency}
                  </div>
                  <div
                    className={`text-[11px] uppercase tracking-[0.16em] ${
                      s.state === "paid"
                        ? "text-[#28160E]/45"
                        : s.state === "next"
                        ? "text-[#B85138]"
                        : "text-[#28160E]/45"
                    }`}
                  >
                    {s.state === "paid"
                      ? "Paid"
                      : s.state === "next"
                      ? "Next"
                      : "Scheduled"}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Ledger */}
        <section className="overflow-hidden rounded-2xl border border-[#28160E]/12 bg-white">
          <div className="border-b border-[#28160E]/10 px-6 py-5">
            <div className="text-[11px] uppercase tracking-[0.18em] text-[#28160E]/55">
              Double-entry ledger
            </div>
            <div
              className="mt-1 text-xl"
              style={{ fontFamily: "var(--cot-display)" }}
            >
              Your journal
            </div>
          </div>
          <ul>
            {ledger.map((l) => (
              <li
                key={l.id}
                className="border-b border-[#28160E]/8 px-6 py-4 last:border-b-0"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm">{l.desc}</div>
                    <div className="mt-0.5 flex items-center gap-2 text-[11px] text-[#28160E]/55">
                      <span className="font-mono">{l.id}</span>
                      <span>·</span>
                      <span>{l.date}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm text-[#28160E]">
                      −{l.credit.toLocaleString()} AED
                    </div>
                    <div className="font-mono text-[10px] text-[#28160E]/55">
                      tx {l.ref}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t border-[#28160E]/10 bg-[#FBF2E4] px-6 py-4 text-[11px] text-[#28160E]/65">
            Balance reconciles to{" "}
            <span className="font-mono text-[#28160E]">
              0x4f8…b3c2 · 6,000.00 AED
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}

function Kpi({
  k,
  v,
  sub,
  icon,
}: {
  k: string;
  v: string;
  sub: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#28160E]/12 bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="text-[10px] uppercase tracking-[0.18em] text-[#28160E]/55">
          {k}
        </div>
        {icon}
      </div>
      <div
        className="mt-3 text-2xl md:text-3xl"
        style={{ fontFamily: "var(--cot-display)" }}
      >
        {v}
      </div>
      <div className="mt-1 text-[11px] text-[#28160E]/55">{sub}</div>
    </div>
  );
}
