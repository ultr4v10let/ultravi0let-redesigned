"use client";

import { useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Filter,
  Inbox as InboxIcon,
  Search,
  Send,
  Sparkles,
  Star,
} from "lucide-react";

const CHANNELS = [
  { v: "all", n: "All channels", c: "#7C5CFF" },
  { v: "ig", n: "Instagram", c: "#FF6B9D" },
  { v: "wa", n: "WhatsApp", c: "#25D366" },
  { v: "x", n: "X (Twitter)", c: "#E8E6F0" },
  { v: "snap", n: "Snapchat", c: "#FFC700" },
];

const THREADS = [
  {
    id: "t1",
    who: "@nadia.k",
    name: "Nadia K.",
    ch: "ig",
    ago: "2m",
    last: "Do you have a private dining room for 14?",
    sentiment: "+",
    tags: ["VIP", "Vegetarian"],
    unread: 2,
    messages: [
      { from: "them", t: "Hi! We're celebrating a birthday next weekend.", at: "9:12" },
      { from: "them", t: "Do you have a private dining room for 14?", at: "9:13" },
    ],
  },
  {
    id: "t2",
    who: "+971 50 ••• 9120",
    name: "Mostafa A.",
    ch: "wa",
    ago: "5m",
    last: "Birthday cake possible?",
    sentiment: "+",
    tags: ["Repeat guest"],
    unread: 1,
    messages: [
      {
        from: "them",
        t: "Salam, booking for tomorrow 8pm under Mostafa, table for 4.",
        at: "8:55",
      },
      { from: "them", t: "Birthday cake possible?", at: "8:56" },
    ],
  },
  {
    id: "t3",
    who: "@khalifa_uae",
    name: "Khalifa A.",
    ch: "x",
    ago: "12m",
    last: "Best knafeh in Dubai 🔥",
    sentiment: "+",
    tags: ["UGC"],
    unread: 0,
    messages: [
      { from: "them", t: "Best knafeh in Dubai 🔥 already coming back next week", at: "8:42" },
    ],
  },
  {
    id: "t4",
    who: "@_lana",
    name: "Lana S.",
    ch: "snap",
    ago: "18m",
    last: "Rooftop open during ramadan?",
    sentiment: "?",
    tags: [],
    unread: 1,
    messages: [
      { from: "them", t: "Is the rooftop open during ramadan?", at: "8:36" },
    ],
  },
  {
    id: "t5",
    who: "@chefjudd",
    name: "Judd N.",
    ch: "ig",
    ago: "33m",
    last: "Loved the lamb shoulder, please tell chef!",
    sentiment: "+",
    tags: ["VIP"],
    unread: 0,
    messages: [
      { from: "them", t: "Loved the lamb shoulder, please tell chef!", at: "8:21" },
      { from: "us", t: "Thanks Judd! Telling him now — see you soon ❤️", at: "8:24" },
    ],
  },
  {
    id: "t6",
    who: "+966 50 ••• 4012",
    name: "Hala Z.",
    ch: "wa",
    ago: "1h",
    last: "What time do you close on Fridays?",
    sentiment: "?",
    tags: [],
    unread: 0,
    messages: [
      { from: "them", t: "What time do you close on Fridays?", at: "7:54" },
      { from: "us", t: "Friday hours are 5pm — 2am. Looking forward!", at: "7:58" },
    ],
  },
];

const AI_REPLIES: Record<string, string> = {
  t1: "Hi Nadia! Yes — our private dining room seats 16. Would you like me to hold it for Saturday evening? I can also pre-arrange a custom menu for the birthday.",
  t2: "Of course Mostafa — confirmed for 4 tomorrow at 8pm. We'll have a small cake on the house. Any allergies we should know about?",
  t3: "Thank you Khalifa! Telling Chef Ramy now. Let us know when you're back and we'll have your usual table ready.",
  t4: "Hi Lana — yes, the rooftop opens for iftar at sunset and stays open until 2am during Ramadan. Want me to hold a table for you?",
  t5: "",
  t6: "",
};

export default function InboxPage() {
  const [ch, setCh] = useState("all");
  const [activeId, setActiveId] = useState(THREADS[0].id);
  const [draft, setDraft] = useState("");
  const [sentByThread, setSentByThread] = useState<Record<string, string[]>>({});

  const list = THREADS.filter((t) => ch === "all" || t.ch === ch);
  const active = THREADS.find((t) => t.id === activeId)!;
  const activeChannel = CHANNELS.find((c) => c.v === active.ch)!;

  const onSend = () => {
    if (!draft.trim()) return;
    setSentByThread((s) => ({
      ...s,
      [activeId]: [...(s[activeId] ?? []), draft],
    }));
    setDraft("");
  };

  const suggestAI = () => {
    const s = AI_REPLIES[activeId];
    if (s) setDraft(s);
  };

  return (
    <main className="grid h-[calc(100svh-110px)] grid-cols-1 lg:grid-cols-[280px_360px_1fr]">
      {/* Channels rail */}
      <aside className="hidden border-r border-[#E8E6F0]/8 bg-[#0E1015] p-4 lg:block">
        <div className="text-[11px] uppercase tracking-[0.18em] text-[#E8E6F0]/55">
          Channels
        </div>
        <ul className="mt-4 space-y-1">
          {CHANNELS.map((c) => (
            <li key={c.v}>
              <button
                onClick={() => setCh(c.v)}
                className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  ch === c.v
                    ? "bg-[#E8E6F0]/[0.06] text-[#E8E6F0]"
                    : "text-[#E8E6F0]/70 hover:bg-[#E8E6F0]/[0.04] hover:text-[#E8E6F0]"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: c.c }}
                  />
                  {c.n}
                </span>
                <span className="text-[11px] text-[#E8E6F0]/45">
                  {c.v === "all"
                    ? THREADS.length
                    : THREADS.filter((t) => t.ch === c.v).length}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-8 text-[11px] uppercase tracking-[0.18em] text-[#E8E6F0]/55">
          Tags
        </div>
        <ul className="mt-3 space-y-1 text-sm text-[#E8E6F0]/70">
          {["VIP", "Vegetarian", "Repeat guest", "UGC", "Issue"].map((t) => (
            <li
              key={t}
              className="cursor-pointer rounded-lg px-3 py-1.5 hover:bg-[#E8E6F0]/[0.04]"
            >
              # {t}
            </li>
          ))}
        </ul>
      </aside>

      {/* Threads list */}
      <section className="flex flex-col border-r border-[#E8E6F0]/8 bg-[#0E1015]">
        <div className="border-b border-[#E8E6F0]/8 p-3">
          <div className="relative">
            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#E8E6F0]/45"
            />
            <input
              placeholder="Search guests, messages"
              className="w-full rounded-lg border border-[#E8E6F0]/10 bg-[#161922] py-2 pl-9 pr-3 text-xs outline-none focus:border-[#7C5CFF]"
            />
          </div>
          <div className="mt-2 flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-md border border-[#E8E6F0]/10 px-2.5 py-1 text-[11px] text-[#E8E6F0]/65 hover:bg-[#E8E6F0]/[0.04]">
              <Filter size={11} />
              Unread
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-md border border-[#E8E6F0]/10 px-2.5 py-1 text-[11px] text-[#E8E6F0]/65 hover:bg-[#E8E6F0]/[0.04]">
              Newest
              <ChevronDown size={11} />
            </button>
          </div>
        </div>

        <ul className="flex-1 overflow-y-auto">
          {list.map((t) => {
            const channel = CHANNELS.find((c) => c.v === t.ch)!;
            const isActive = t.id === activeId;
            return (
              <li key={t.id}>
                <button
                  onClick={() => setActiveId(t.id)}
                  className={`flex w-full items-start gap-3 border-b border-[#E8E6F0]/6 px-4 py-3.5 text-left transition-colors ${
                    isActive
                      ? "bg-[#7C5CFF]/10"
                      : "hover:bg-[#E8E6F0]/[0.03]"
                  }`}
                >
                  <div
                    className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[11px] font-bold"
                    style={{ background: channel.c, color: "#0E1015" }}
                  >
                    {channel.n[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="truncate text-sm font-medium">
                        {t.name}
                      </div>
                      <div className="shrink-0 text-[10px] text-[#E8E6F0]/45">
                        {t.ago}
                      </div>
                    </div>
                    <div className="mt-0.5 truncate text-[12px] text-[#E8E6F0]/65">
                      {t.last}
                    </div>
                    <div className="mt-2 flex items-center gap-1.5">
                      {t.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-[#E8E6F0]/[0.06] px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-[#E8E6F0]/65"
                        >
                          {tag}
                        </span>
                      ))}
                      {t.unread > 0 && (
                        <span className="ml-auto rounded-full bg-[#7C5CFF] px-1.5 py-0.5 text-[10px] font-mono text-white">
                          {t.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Conversation */}
      <section className="flex flex-col bg-[#0E1015]">
        {/* Thread header */}
        <header className="flex items-center justify-between border-b border-[#E8E6F0]/8 px-6 py-3.5">
          <div className="flex items-center gap-3">
            <div
              className="h-2 w-2 rounded-full"
              style={{ background: activeChannel.c }}
            />
            <div>
              <div className="text-sm font-medium">{active.name}</div>
              <div className="text-[11px] text-[#E8E6F0]/55">
                {active.who} · via {activeChannel.n}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-md border border-[#E8E6F0]/10 px-3 py-1.5 text-[11px] text-[#E8E6F0]/70 hover:bg-[#E8E6F0]/[0.04]">
              <Star size={12} />
              VIP
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-md border border-[#E8E6F0]/10 px-3 py-1.5 text-[11px] text-[#E8E6F0]/70 hover:bg-[#E8E6F0]/[0.04]">
              Assign
              <ChevronDown size={11} />
            </button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 space-y-3 overflow-y-auto p-6">
          {active.messages.map((m, i) => (
            <Bubble
              key={i}
              from={m.from as "us" | "them"}
              t={m.t}
              at={m.at}
              color={activeChannel.c}
            />
          ))}
          {(sentByThread[activeId] ?? []).map((m, i) => (
            <Bubble
              key={`s-${i}`}
              from="us"
              t={m}
              at={"now"}
              color={activeChannel.c}
            />
          ))}
        </div>

        {/* Composer */}
        <div className="border-t border-[#E8E6F0]/8 p-4">
          <div className="rounded-xl border border-[#E8E6F0]/10 bg-[#161922]">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={3}
              placeholder={`Reply to ${active.name} via ${activeChannel.n}…`}
              className="w-full resize-none bg-transparent p-3.5 text-sm outline-none placeholder:text-[#E8E6F0]/40"
            />
            <div className="flex items-center justify-between gap-2 border-t border-[#E8E6F0]/8 p-2.5">
              <button
                onClick={suggestAI}
                disabled={!AI_REPLIES[activeId]}
                className="inline-flex items-center gap-2 rounded-md bg-[#7C5CFF]/15 px-3 py-1.5 text-xs font-medium text-[#A78BFA] transition-colors hover:bg-[#7C5CFF]/25 disabled:opacity-40"
              >
                <Sparkles size={12} />
                Suggest with AI
              </button>
              <button
                onClick={onSend}
                disabled={!draft.trim()}
                className="inline-flex items-center gap-2 rounded-md bg-[#7C5CFF] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#6E48FF] disabled:opacity-40"
              >
                Send via {activeChannel.n}
                <Send size={12} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Bubble({
  from,
  t,
  at,
  color,
}: {
  from: "us" | "them";
  t: string;
  at: string;
  color: string;
}) {
  const us = from === "us";
  return (
    <div className={`flex ${us ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm ${
          us
            ? "rounded-br-sm bg-[#7C5CFF] text-white"
            : "rounded-bl-sm border border-[#E8E6F0]/10 bg-[#161922]"
        }`}
        style={
          !us
            ? { borderLeft: `2px solid ${color}` }
            : undefined
        }
      >
        {t}
        <div
          className={`mt-1 text-[10px] ${
            us ? "text-white/65" : "text-[#E8E6F0]/45"
          }`}
        >
          {at}
        </div>
      </div>
    </div>
  );
}
