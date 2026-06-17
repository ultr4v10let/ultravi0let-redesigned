import { DM_Sans, Fraunces } from "next/font/google";
import Link from "next/link";
import { NdaBanner } from "@/components/demo/NdaBanner";

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--mly-sans",
  display: "swap",
});

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--mly-display",
  display: "swap",
});

export const metadata = {
  title: "Merlin · Ship your company site in hours",
};

export default function MarlyinLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${sans.variable} ${display.variable}`}
      style={{
        background: "#F4F6FB",
        color: "#0F1729",
        fontFamily: "var(--mly-sans)",
        minHeight: "100svh",
      }}
    >
      <NdaBanner tint="rgba(15,23,41,0.04)" ink="#0F1729" border="rgba(15,23,41,0.1)" />
      <header className="sticky top-0 z-40 border-b border-[#0F1729]/10 bg-[#F4F6FB]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4 md:px-10">
          <Link href="/demos/merlin" className="flex items-center gap-2.5">
            <MlyMark />
            <span className="text-[20px] font-semibold tracking-tight" style={{ fontFamily: "var(--mly-display)" }}>
              merlin
            </span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm md:flex">
            {[
              { l: "Platform", h: "/demos/merlin#platform" },
              { l: "Editor", h: "/demos/merlin/editor" },
              { l: "Live preview", h: "/demos/merlin/preview" },
            ].map((i) => (
              <Link key={i.l} href={i.h} className="text-[#0F1729]/70 transition-colors hover:text-[#0F1729]">
                {i.l}
              </Link>
            ))}
          </nav>
          <Link
            href="/demos/merlin/editor"
            className="inline-flex items-center gap-2 rounded-lg bg-[#3B5BDB] px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-[#2F4AC0]"
          >
            Open editor
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}

function MlyMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden>
      <rect x="2" y="2" width="24" height="24" rx="7" fill="#3B5BDB" opacity="0.15" stroke="#3B5BDB" strokeWidth="1.5" />
      <path d="M8 18 L14 8 L20 18 Z" fill="none" stroke="#3B5BDB" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
