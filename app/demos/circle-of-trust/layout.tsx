import { Manrope, Fraunces } from "next/font/google";
import Link from "next/link";
import { NdaBanner } from "@/components/demo/NdaBanner";

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--cot-sans",
  display: "swap",
});

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--cot-display",
  display: "swap",
});

export const metadata = {
  title: "Circle of Trust · Save together, grow together",
};

export default function CotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${sans.variable} ${display.variable}`}
      style={{
        background: "#FBF2E4",
        color: "#28160E",
        fontFamily: "var(--cot-sans)",
        minHeight: "100svh",
      }}
    >
      <NdaBanner
        tint="rgba(40,22,14,0.05)"
        ink="#28160E"
        border="rgba(40,22,14,0.12)"
      />
      <header className="sticky top-0 z-40 border-b border-[#28160E]/10 bg-[#FBF2E4]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-4 md:px-10">
          <Link href="/demos/circle-of-trust" className="flex items-center gap-2.5">
            <CotMark />
            <span
              className="text-[20px] font-medium tracking-tight"
              style={{ fontFamily: "var(--cot-display)" }}
            >
              Circle of Trust
            </span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm md:flex">
            {[
              { l: "How it works", h: "/demos/circle-of-trust#how" },
              { l: "Browse circles", h: "/demos/circle-of-trust/circles" },
              { l: "My circles", h: "/demos/circle-of-trust/dashboard" },
              { l: "Trust", h: "/demos/circle-of-trust#trust" },
            ].map((i) => (
              <Link
                key={i.l}
                href={i.h}
                className="text-[#28160E]/70 transition-colors hover:text-[#28160E]"
              >
                {i.l}
              </Link>
            ))}
          </nav>
          <Link
            href="/demos/circle-of-trust/circles"
            className="inline-flex items-center gap-2 rounded-full bg-[#B85138] px-4 py-2 text-sm font-medium text-[#FBF2E4] transition-colors hover:bg-[#9F4129]"
          >
            Join a circle
          </Link>
        </div>
      </header>
      {children}
      <footer className="border-t border-[#28160E]/10 bg-[#F0E2CB]">
        <div className="mx-auto grid max-w-[1240px] gap-8 px-6 py-12 md:grid-cols-4 md:px-10">
          <div>
            <div className="flex items-center gap-2.5">
              <CotMark />
              <span
                className="text-xl"
                style={{ fontFamily: "var(--cot-display)" }}
              >
                Circle of Trust
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#28160E]/65">
              Money circles, modernised. Smart-contract custody, KYC compliant,
              and built on a double-entry ledger.
            </p>
          </div>
          <FCol head="Product" items={["How it works", "Pricing", "Smart contracts", "Security"]} />
          <FCol head="Trust" items={["Licensing", "Audits", "Compliance", "Press"]} />
          <FCol head="Company" items={["About", "Careers", "Help centre", "Contact"]} />
        </div>
        <div className="border-t border-[#28160E]/10 px-6 py-5 text-center text-xs text-[#28160E]/55 md:px-10">
          © Circle of Trust · Licensed by the Central Bank of Egypt (sandbox)
          and the DFSA (DIFC)
        </div>
      </footer>
    </div>
  );
}

function CotMark() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden>
      <circle cx="15" cy="15" r="12.5" fill="none" stroke="#28160E" strokeWidth="1.5" />
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const r = 11;
        const x = 15 + r * Math.cos((deg * Math.PI) / 180);
        const y = 15 + r * Math.sin((deg * Math.PI) / 180);
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="2.2"
            fill={i === 0 ? "#B85138" : "#28160E"}
          />
        );
      })}
    </svg>
  );
}

function FCol({ head, items }: { head: string; items: string[] }) {
  return (
    <div>
      <div className="mb-3 text-[11px] uppercase tracking-[0.18em] text-[#28160E]/45">
        {head}
      </div>
      <ul className="space-y-2 text-sm text-[#28160E]/80">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}
