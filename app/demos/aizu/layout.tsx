import { IBM_Plex_Sans, IBM_Plex_Mono, IBM_Plex_Serif } from "next/font/google";
import Link from "next/link";
import { NdaBanner } from "@/components/demo/NdaBanner";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--aizu-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--aizu-mono",
  display: "swap",
});

const serif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--aizu-display",
  display: "swap",
});

export const metadata = {
  title: "Aizu · Carbon disclosure for Japan",
};

export default function AizuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${sans.variable} ${mono.variable} ${serif.variable}`}
      style={{
        background: "#0C1410",
        color: "#E8F0EA",
        fontFamily: "var(--aizu-sans)",
        minHeight: "100svh",
      }}
    >
      <NdaBanner
        tint="rgba(232,240,234,0.05)"
        ink="#E8F0EA"
        border="rgba(232,240,234,0.1)"
      />
      <header className="border-b border-[#E8F0EA]/10 bg-[#0C1410]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4 md:px-10">
          <Link href="/demos/aizu" className="flex items-center gap-3">
            <AizuMark />
            <span
              className="text-[19px] font-medium tracking-tight"
              style={{ fontFamily: "var(--aizu-display)" }}
            >
              aizu
              <span style={{ color: "#7CA982" }}>.</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7CA982]">
                /JP
              </span>
            </span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm md:flex">
            {[
              { l: "Platform", h: "/demos/aizu#platform" },
              { l: "Dashboard", h: "/demos/aizu/dashboard" },
              { l: "Submit", h: "/demos/aizu/submit" },
              { l: "Compliance", h: "/demos/aizu#compliance" },
            ].map((i) => (
              <Link
                key={i.l}
                href={i.h}
                className="text-[#E8F0EA]/70 transition-colors hover:text-[#E8F0EA]"
              >
                {i.l}
              </Link>
            ))}
          </nav>
          <Link
            href="/demos/aizu/dashboard"
            className="inline-flex items-center gap-2 rounded-md border border-[#7CA982]/40 bg-[#7CA982]/10 px-4 py-2 text-[12px] font-medium text-[#A7D8B0] transition-colors hover:bg-[#7CA982]/20"
          >
            Open console
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}

function AizuMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden>
      <rect
        x="3"
        y="3"
        width="20"
        height="20"
        rx="3"
        fill="none"
        stroke="#7CA982"
        strokeWidth="1.5"
      />
      <path
        d="M8 17 L13 9 L18 17 Z"
        fill="#7CA982"
        opacity="0.35"
        stroke="#A7D8B0"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
