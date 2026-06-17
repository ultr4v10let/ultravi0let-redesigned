"use client";

import { useState } from "react";
import {
  Activity,
  ArrowDown,
  ArrowUp,
  Calendar,
  Heart,
  MessageSquare,
  Smile,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

const CHANNELS = [
  { n: "Instagram", c: "#FF6B9D", msgs: 412, resp: 6.2, conv: 18, sent: 92 },
  { n: "WhatsApp", c: "#25D366", msgs: 308, resp: 3.1, conv: 31, sent: 88 },
  { n: "X (Twitter)", c: "#E8E6F0", msgs: 91, resp: 14.7, conv: 4, sent: 71 },
  { n: "Snapchat", c: "#FFC700", msgs: 67, resp: 22.3, conv: 9, sent: 84 },
];

const TIMESERIES = [
  ["00", 4],
  ["03", 2],
  ["06", 3],
  ["09", 12],
  ["12", 28],
  ["15", 22],
  ["18", 48],
  ["21", 61],
  ["22", 53],
  ["23", 21],
] as const;

const TOPICS = [
  { t: "Reservations", c: 41, pct: 38 },
  { t: "Menu questions", c: 22, pct: 20 },
  { t: "Compliments", c: 18, pct: 17 },
  { t: "Dietary requests", c: 11, pct: 10 },
  { t: "Complaints", c: 6, pct: 6 },
  { t: "Other", c: 10, pct: 9 },
];

export default function Analytics() {
  const [range, setRange] = useState<"7d" | "30d" | "90d">("7d");
  return (
    <main className="mx-auto max-w-[1400px] px-5 py-10 md:px-8 md:py-12">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-[#7C5CFF]">
            Analytics
          </div>
          <h1 className="mt-2 text-[clamp(1.8rem,3.6vw,2.8rem)] font-semibold tracking-tight">
            Layali · last {range === "7d" ? "7 days" : range === "30d" ? "30 days" : "90 days"}
          </h1>
        </div>
        <div className="flex rounded-lg border border-[#E8E6F0]/10 p-0.5">
          {(["7d", "30d", "90d"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                range === r
                  ? "bg-[#7C5CFF] text-white"
                  : "text-[#E8E6F0]/70 hover:text-[#E8E6F0]"
              }`}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* KPI row */}
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Kpi i={MessageSquare} l="Total messages" v="878" d={+12} />
        <Kpi i={Activity} l="Avg response time" v="6.4m" d={-32} good />
        <Kpi i={Calendar} l="Bookings via DM" v="124" d={+18} />
        <Kpi i={Smile} l="Avg sentiment" v="+0.74" d={+4} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
        {/* Volume over day */}
        <div className="rounded-2xl border border-[#E8E6F0]/10 bg-[#161922] p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-[#E8E6F0]/55">
                Hourly volume
              </div>
              <div className="mt-1 text-lg font-semibold">
                When your guests reach out
              </div>
            </div>
            <span className="text-[11px] text-[#E8E6F0]/55">Peak · 21:00</span>
          </div>
          <div className="mt-6">
            <Bars data={TIMESERIES as unknown as [string, number][]} />
          </div>
        </div>

        {/* Topics */}
        <div className="rounded-2xl border border-[#E8E6F0]/10 bg-[#161922] p-6">
          <div className="text-[10px] uppercase tracking-[0.18em] text-[#E8E6F0]/55">
            What guests are asking
          </div>
          <ul className="mt-5 space-y-4">
            {TOPICS.map((t) => (
              <li key={t.t}>
                <div className="flex items-center justify-between text-sm">
                  <span>{t.t}</span>
                  <span className="font-mono text-[12px] text-[#E8E6F0]/70">
                    {t.c} · {t.pct}%
                  </span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#E8E6F0]/[0.06]">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${t.pct * 2}%`,
                      background:
                        "linear-gradient(90deg, #7C5CFF, #FF6B9D)",
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Channel breakdown */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-[#E8E6F0]/10 bg-[#161922]">
        <div className="border-b border-[#E8E6F0]/8 px-6 py-5">
          <div className="text-[10px] uppercase tracking-[0.18em] text-[#E8E6F0]/55">
            Per channel
          </div>
          <div className="mt-1 text-lg font-semibold">Where the engagement lives</div>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left">
              <Th>Channel</Th>
              <Th right>Messages</Th>
              <Th right>Avg response</Th>
              <Th right>Bookings</Th>
              <Th>Sentiment</Th>
            </tr>
          </thead>
          <tbody>
            {CHANNELS.map((c) => (
              <tr key={c.n} className="border-t border-[#E8E6F0]/8">
                <Td>
                  <div className="flex items-center gap-3">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: c.c }}
                    />
                    {c.n}
                  </div>
                </Td>
                <Td right mono>
                  {c.msgs}
                </Td>
                <Td right mono>
                  {c.resp}m
                </Td>
                <Td right mono>
                  {c.conv}
                </Td>
                <Td>
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 w-32 overflow-hidden rounded-full bg-[#E8E6F0]/[0.06]">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${c.sent}%`,
                          background: "#7C5CFF",
                        }}
                      />
                    </div>
                    <span className="font-mono text-[11px] text-[#E8E6F0]/70">
                      {c.sent}%
                    </span>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

function Kpi({
  i: Icon,
  l,
  v,
  d,
  good,
}: {
  i: LucideIcon;
  l: string;
  v: string;
  d: number;
  good?: boolean;
}) {
  const isUp = d > 0;
  const positive = good ? !isUp : isUp;
  return (
    <div className="rounded-2xl border border-[#E8E6F0]/10 bg-[#161922] p-5">
      <div className="flex items-center justify-between">
        <Icon size={15} className="text-[#7C5CFF]" />
        <span
          className={`inline-flex items-center gap-1 text-[11px] ${
            positive ? "text-[#7CFFA8]" : "text-[#FF6B9D]"
          }`}
        >
          {isUp ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
          {Math.abs(d)}%
        </span>
      </div>
      <div className="mt-3 text-2xl font-semibold md:text-3xl">{v}</div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[#E8E6F0]/55">
        {l}
      </div>
    </div>
  );
}

function Bars({ data }: { data: [string, number][] }) {
  const max = Math.max(...data.map((d) => d[1]));
  return (
    <div className="flex h-44 items-end gap-2">
      {data.map(([label, v]) => (
        <div key={label} className="flex flex-1 flex-col items-center gap-2">
          <div className="relative flex h-full w-full items-end">
            <div
              className="w-full rounded-md"
              style={{
                height: `${(v / max) * 100}%`,
                background: "linear-gradient(180deg, #7C5CFF, #FF6B9D)",
              }}
            />
          </div>
          <div className="font-mono text-[10px] text-[#E8E6F0]/55">{label}</div>
        </div>
      ))}
    </div>
  );
}

function Th({
  children,
  right,
}: {
  children?: React.ReactNode;
  right?: boolean;
}) {
  return (
    <th
      className={`bg-[#0E1015] px-6 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#E8E6F0]/55 ${
        right ? "text-right" : ""
      }`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  right,
  mono,
}: {
  children: React.ReactNode;
  right?: boolean;
  mono?: boolean;
}) {
  return (
    <td
      className={`px-6 py-4 align-middle ${right ? "text-right" : ""} ${
        mono ? "font-mono text-[13px]" : ""
      }`}
    >
      {children}
    </td>
  );
}
