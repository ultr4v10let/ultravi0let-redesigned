import { Inter } from "next/font/google";
import Link from "next/link";
import { NdaBanner } from "@/components/demo/NdaBanner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--c6-sans",
  display: "swap",
});

export const metadata = {
  title: "Connect6 · Omnichannel for restaurants",
};

export default function Connect6Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${inter.variable}`}
      style={{
        background: "#0E1015",
        color: "#E8E6F0",
        fontFamily: "var(--c6-sans)",
        minHeight: "100svh",
      }}
    >
      <NdaBanner
        tint="rgba(232,230,240,0.05)"
        ink="#E8E6F0"
        border="rgba(232,230,240,0.1)"
      />
      <header className="border-b border-[#E8E6F0]/8 bg-[#0E1015]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-3.5 md:px-8">
          <div className="flex items-center gap-6">
            <Link href="/demos/connect6" className="flex items-center gap-2.5">
              <C6Mark />
              <span className="text-[18px] font-semibold tracking-tight">
                Connect<span style={{ color: "#7C5CFF" }}>6</span>
              </span>
            </Link>
            <div className="hidden items-center gap-2 rounded-full border border-[#E8E6F0]/10 bg-[#E8E6F0]/[0.03] px-3 py-1.5 text-[11px] text-[#E8E6F0]/70 md:flex">
              <span
                className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
                style={{ background: "linear-gradient(135deg,#FF6B9D,#7C5CFF)" }}
              >
                L
              </span>
              Layali Restaurant
              <span className="text-[#E8E6F0]/35">·</span>
              <span className="text-[#7C5CFF]">Dubai</span>
            </div>
          </div>
          <nav className="hidden items-center gap-7 text-sm md:flex">
            {[
              { l: "Inbox", h: "/demos/connect6/inbox" },
              { l: "Analytics", h: "/demos/connect6/analytics" },
              { l: "Calendar", h: "/demos/connect6#calendar" },
              { l: "Audience", h: "/demos/connect6#audience" },
            ].map((i) => (
              <Link
                key={i.l}
                href={i.h}
                className="text-[#E8E6F0]/70 transition-colors hover:text-[#E8E6F0]"
              >
                {i.l}
              </Link>
            ))}
          </nav>
          <Link
            href="/demos/connect6/inbox"
            className="inline-flex items-center gap-2 rounded-lg bg-[#7C5CFF] px-3.5 py-1.5 text-[13px] font-medium text-white transition-colors hover:bg-[#6E48FF]"
          >
            Open inbox
            <span className="rounded bg-white/20 px-1.5 py-0.5 text-[10px] font-mono">
              28
            </span>
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}

function C6Mark() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden>
      <defs>
        <linearGradient id="c6" x1="0" y1="0" x2="26" y2="26">
          <stop offset="0" stopColor="#7C5CFF" />
          <stop offset="1" stopColor="#FF6B9D" />
        </linearGradient>
      </defs>
      <circle cx="13" cy="13" r="11" fill="url(#c6)" />
      <text
        x="13"
        y="17"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontWeight="700"
        fontSize="11"
        fill="#0E1015"
      >
        6
      </text>
    </svg>
  );
}
