import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Calendar,
  Camera,
  CheckCheck,
  Heart,
  MessageCircle,
  Send,
  Sparkles,
  TrendingUp,
} from "lucide-react";

// Two restaurant interior shots for ambience
const HERO_BG =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1800&q=80&auto=format";
const DETAIL_PHOTO =
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80&auto=format";

const CHANNELS = [
  { n: "Instagram", c: "#FF6B9D" },
  { n: "WhatsApp", c: "#25D366" },
  { n: "X (Twitter)", c: "#1DA1F2" },
  { n: "Snapchat", c: "#FFC700" },
];

const PHONES = [
  {
    ch: "Instagram",
    bg: "linear-gradient(135deg,#FF6B9D 0%,#FFA85C 60%,#FFC700 100%)",
    handle: "@layali.restaurant",
    sub: "Active 2m ago",
    messages: [
      { from: "them", t: "Loved the lamb shoulder last night 🤤", at: "8:42" },
      { from: "them", t: "Already coming back next week", at: "8:42" },
      { from: "us", t: "Thanks Khalifa! Telling Chef Ramy now — see you soon ❤️", at: "8:44" },
    ],
    ai: "AI-drafted in 1.4s · approved by Mariam",
  },
  {
    ch: "WhatsApp",
    bg: "linear-gradient(135deg,#075E54 0%,#128C7E 50%,#25D366 100%)",
    handle: "+971 50 ••• 9120",
    sub: "Booking tomorrow 8pm",
    messages: [
      { from: "them", t: "Salam, booking for tomorrow 8pm under Mostafa", at: "12:14" },
      { from: "them", t: "Table for 4 — birthday cake possible?", at: "12:14" },
      {
        from: "us",
        t: "Of course Mostafa — confirmed for 4 tomorrow at 8pm. We'll have a small cake on the house 🎂",
        at: "12:15",
      },
    ],
    ai: "AI-drafted · approved & calendar synced",
  },
  {
    ch: "X (Twitter)",
    bg: "linear-gradient(135deg,#0F1015 0%,#15171E 100%)",
    handle: "@_lana",
    sub: "DM · 18m",
    messages: [
      { from: "them", t: "Is the rooftop open during ramadan?", at: "8:36" },
      {
        from: "us",
        t: "Hi Lana — yes, the rooftop opens at sunset for iftar and stays open until 2am during Ramadan. Want me to hold a table?",
        at: "8:38",
      },
    ],
    ai: "AI suggestion accepted",
  },
];

const STATS = [
  { v: "−68%", k: "Average reply time" },
  { v: "+34%", k: "Bookings via DM" },
  { v: "4.8★", k: "Guest satisfaction" },
  { v: "1 / 4", k: "Agents needed per shift" },
];

export default function Connect6Home() {
  return (
    <main>
      {/* HERO — restaurant photo backdrop + tilted phone gallery */}
      <section className="relative overflow-hidden border-b border-[#E8E6F0]/8">
        {/* Background photo */}
        <div className="absolute inset-0 -z-10">
          <Image
            src={HERO_BG}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0E1015]/85 via-[#0E1015]/95 to-[#0E1015]" />
        </div>

        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-16 md:grid-cols-[1.1fr_1fr] md:px-8 md:py-24 lg:gap-16">
          {/* Copy */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#E8E6F0]/15 bg-[#E8E6F0]/[0.06] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[#7C5CFF] backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7C5CFF] animate-pulse" />
              Live · Layali Restaurant
            </div>
            <h1 className="mt-7 text-[clamp(2.6rem,5.4vw,5rem)] font-semibold leading-[0.98] tracking-tight">
              Every guest, every channel,{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #FF6B9D, #7C5CFF, #FFC700)",
                }}
              >
                one inbox.
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-[#E8E6F0]/75 md:text-lg">
              Instagram DMs, WhatsApp bookings, X replies and Snapchat chats —
              all in one room. AI drafts the reply, your team approves it in
              one click, and the booking lands in your calendar before the
              guest finishes typing.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/demos/connect6/inbox"
                className="inline-flex items-center gap-2 rounded-lg bg-[#7C5CFF] px-5 py-3 text-sm font-medium text-white hover:bg-[#6E48FF]"
              >
                Open the inbox
                <span className="rounded bg-white/20 px-1.5 py-0.5 text-[10px] font-mono">
                  28 new
                </span>
              </Link>
              <Link
                href="/demos/connect6/analytics"
                className="inline-flex items-center gap-2 rounded-lg border border-[#E8E6F0]/15 bg-[#0E1015]/40 px-5 py-3 text-sm backdrop-blur hover:border-[#E8E6F0]/35 hover:bg-[#0E1015]/60"
              >
                <TrendingUp size={15} />
                Today&apos;s analytics
              </Link>
            </div>

            {/* Channel chips */}
            <div className="mt-10 flex flex-wrap gap-2">
              {CHANNELS.map((c) => (
                <div
                  key={c.n}
                  className="inline-flex items-center gap-2 rounded-full border border-[#E8E6F0]/12 bg-[#E8E6F0]/[0.04] px-3 py-1.5 text-xs text-[#E8E6F0]/85"
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: c.c }}
                  />
                  {c.n}
                </div>
              ))}
            </div>
          </div>

          {/* Tilted phone stack */}
          <div className="relative h-[640px] lg:h-[720px]">
            {PHONES.map((p, i) => (
              <Phone key={p.ch} phone={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CHANNELS strip — bright photographic cards */}
      <section className="border-b border-[#E8E6F0]/8 bg-[#0E1015]">
        <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-24">
          <div className="grid items-end gap-6 md:grid-cols-[1.2fr_1fr]">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#7C5CFF]">
                Channels we speak
              </div>
              <h2 className="mt-3 text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-tight tracking-tight">
                Four mouths to feed.
                <br />
                One brain to feed them.
              </h2>
            </div>
            <p className="text-[15px] text-[#E8E6F0]/65">
              Native API integration with every major platform. Replies post
              to the original DM thread — guests never realise they&apos;re
              talking to a unified system.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                n: "Instagram",
                desc: "DMs, story replies, comment routing",
                tag: "412 / week",
                grad: "from-[#FF6B9D] via-[#FFA85C] to-[#FFC700]",
              },
              {
                n: "WhatsApp Business",
                desc: "Bookings, broadcasts, opt-in flows",
                tag: "308 / week",
                grad: "from-[#075E54] via-[#128C7E] to-[#25D366]",
              },
              {
                n: "X (Twitter)",
                desc: "Mentions, replies, DM triage",
                tag: "91 / week",
                grad: "from-[#0F1115] via-[#1A1D24] to-[#1DA1F2]",
              },
              {
                n: "Snapchat",
                desc: "Snaps, chats, geofilter UGC",
                tag: "67 / week",
                grad: "from-[#FFC700] via-[#FFD740] to-[#FFE48A]",
              },
            ].map((c) => (
              <div
                key={c.n}
                className={`relative isolate overflow-hidden rounded-2xl border border-[#E8E6F0]/10 p-6 transition-transform hover:-translate-y-1`}
              >
                <div
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${c.grad} opacity-90`}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#0E1015]/30 to-[#0E1015]/85"
                />
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/85">
                  Channel
                </div>
                <h3 className="mt-2 text-2xl font-semibold text-white">{c.n}</h3>
                <p className="mt-2 max-w-xs text-sm text-white/75">{c.desc}</p>
                <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-black/35 px-3 py-1 text-xs font-mono text-white backdrop-blur">
                  {c.tag}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI WORKFLOW — three-step illustration */}
      <section className="border-b border-[#E8E6F0]/8 bg-[#161922]">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-20 md:grid-cols-[1fr_1.2fr] md:px-8 md:py-28">
          <div className="self-center">
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#7C5CFF]">
              The flow
            </div>
            <h2 className="mt-3 text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-tight tracking-tight">
              From DM to confirmed booking
              <br />
              in <span className="text-[#7C5CFF]">3.2 seconds.</span>
            </h2>
            <p className="mt-5 max-w-md text-[15px] text-[#E8E6F0]/65">
              The AI knows your menu, hours, dietary cards and brand voice.
              Your team approves with a tap — or edits inline if the guest is
              a regular and deserves a personal touch.
            </p>

            {/* Restaurant detail image */}
            <div className="relative mt-9 aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={DETAIL_PHOTO}
                alt="Restaurant interior detail"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 500px, 100vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0E1015] via-transparent to-transparent p-5">
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#FFC700]">
                  Layali · Dubai
                </div>
                <div className="text-lg font-semibold">
                  Levantine · 1,200 guests / week
                </div>
              </div>
            </div>
          </div>

          {/* Step cards */}
          <ol className="space-y-3">
            {[
              {
                i: MessageCircle,
                n: "01",
                t: "Inbound",
                d: "Guest DMs `@layali.restaurant` on Instagram asking about a private room.",
                tag: "0.0s",
                tagBg: "#FF6B9D",
              },
              {
                i: Sparkles,
                n: "02",
                t: "AI draft",
                d: "Connect6 looks up private-room availability, drafts a reply, references guest's previous visits.",
                tag: "1.4s",
                tagBg: "#7C5CFF",
              },
              {
                i: CheckCheck,
                n: "03",
                t: "Approve & send",
                d: "Floor manager taps approve. Reply posts to original DM thread. Reservation lands in OpenTable.",
                tag: "3.2s",
                tagBg: "#25D366",
              },
            ].map((s) => (
              <li
                key={s.n}
                className="group relative overflow-hidden rounded-2xl border border-[#E8E6F0]/8 bg-[#0E1015] p-6 transition-colors hover:border-[#7C5CFF]/40"
              >
                <div className="flex items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E8E6F0]/[0.06] text-[#7C5CFF]">
                    <s.i size={20} strokeWidth={1.8} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#E8E6F0]/55">
                        Step {s.n} · {s.t}
                      </div>
                      <span
                        className="rounded-full px-2.5 py-0.5 font-mono text-[10px] text-white"
                        style={{ background: s.tagBg }}
                      >
                        {s.tag}
                      </span>
                    </div>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#E8E6F0]/85">
                      {s.d}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* OUTCOMES strip */}
      <section className="bg-[#0E1015]">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-px overflow-hidden bg-[#E8E6F0]/8 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.k} className="bg-[#0E1015] p-6 md:p-8">
              <div
                className="text-3xl font-semibold md:text-5xl"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #7C5CFF, #FF6B9D)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {s.v}
              </div>
              <div className="mt-3 text-[11px] uppercase tracking-[0.16em] text-[#E8E6F0]/55">
                {s.k}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function Phone({
  phone,
  index,
}: {
  phone: (typeof PHONES)[number];
  index: number;
}) {
  // tilt + offset per phone for the stacked look
  const tilts = ["-rotate-6", "rotate-3", "-rotate-2"];
  const offsets = [
    "left-0 top-0",
    "left-1/2 top-16 -translate-x-1/2 md:left-auto md:right-0 md:top-32 md:translate-x-0",
    "left-0 top-48 md:top-72",
  ];
  return (
    <div
      className={`absolute ${offsets[index]} ${tilts[index]} w-[72%] max-w-[280px] transition-transform duration-500 hover:-translate-y-1 hover:rotate-0 md:max-w-[260px]`}
      style={{ zIndex: 10 - index }}
    >
      <div
        className="rounded-[36px] p-1.5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]"
        style={{ background: phone.bg }}
      >
        <div className="rounded-[30px] bg-[#0E1015] p-3.5">
          {/* status bar */}
          <div className="flex items-center justify-between px-2 font-mono text-[9px] text-[#E8E6F0]/55">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="h-1 w-3 rounded-sm bg-[#E8E6F0]/55" />
              <span className="h-1 w-3 rounded-sm bg-[#E8E6F0]/55" />
            </span>
          </div>
          {/* header */}
          <div className="mt-3 flex items-center gap-2.5 rounded-2xl border border-[#E8E6F0]/10 bg-[#161922] p-2.5">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-full text-[9px] font-bold"
              style={{ background: phone.bg, color: "#0E1015" }}
            >
              {phone.ch[0]}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[11px] font-medium">
                {phone.handle}
              </div>
              <div className="truncate text-[9px] text-[#E8E6F0]/55">
                {phone.sub} · via {phone.ch}
              </div>
            </div>
          </div>
          {/* messages */}
          <div className="mt-3 space-y-1.5 px-1">
            {phone.messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.from === "us" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-2.5 py-1.5 text-[10px] leading-snug ${
                    m.from === "us"
                      ? "rounded-br-sm bg-[#7C5CFF] text-white"
                      : "rounded-bl-sm bg-[#161922] text-[#E8E6F0]/90"
                  }`}
                >
                  {m.t}
                  <div
                    className={`mt-0.5 text-[8px] ${
                      m.from === "us"
                        ? "text-white/65"
                        : "text-[#E8E6F0]/40"
                    }`}
                  >
                    {m.at}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* AI indicator */}
          <div className="mt-3 flex items-center gap-2 rounded-xl border border-[#7C5CFF]/35 bg-[#7C5CFF]/12 px-2.5 py-1.5">
            <Sparkles size={10} className="text-[#A78BFA]" />
            <span className="truncate text-[9px] text-[#A78BFA]">
              {phone.ai}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
