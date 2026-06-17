import { DM_Sans, DM_Serif_Display } from "next/font/google";
import Link from "next/link";
import { Heart } from "lucide-react";
import { NdaBanner } from "@/components/demo/NdaBanner";

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--lumen-sans",
  display: "swap",
});

const display = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--lumen-display",
  display: "swap",
});

export const metadata = {
  title: "Lumen Health · Telemedicine for the GCC",
};

export default function LumenLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${sans.variable} ${display.variable}`}
      style={{
        background: "#F4F8F7",
        color: "#0D2A26",
        fontFamily: "var(--lumen-sans)",
        minHeight: "100svh",
      }}
    >
      <NdaBanner
        tint="rgba(13,42,38,0.04)"
        ink="#0D2A26"
        border="rgba(13,42,38,0.08)"
      />
      <header className="sticky top-0 z-40 border-b border-[#0D2A26]/10 bg-[#F4F8F7]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-4 md:px-10">
          <Link href="/demos/lumen-health" className="flex items-center gap-2.5">
            <LumenMark />
            <span
              className="text-[20px] font-medium tracking-tight"
              style={{ fontFamily: "var(--lumen-display)" }}
            >
              Lumen<span style={{ color: "#1F6B5C" }}>.</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm md:flex">
            {[
              { l: "Find a doctor", h: "/demos/lumen-health/doctors" },
              { l: "How it works", h: "/demos/lumen-health#how" },
              { l: "Specialties", h: "/demos/lumen-health#specialties" },
              { l: "For employers", h: "/demos/lumen-health#employers" },
            ].map((i) => (
              <Link
                key={i.l}
                href={i.h}
                className="text-[#0D2A26]/70 transition-colors hover:text-[#0D2A26]"
              >
                {i.l}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/demos/lumen-health#how"
              className="hidden text-sm text-[#0D2A26]/70 hover:text-[#0D2A26] md:inline"
            >
              Sign in
            </Link>
            <Link
              href="/demos/lumen-health/doctors"
              className="inline-flex items-center gap-2 rounded-full bg-[#1F6B5C] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#16544A]"
            >
              <Heart size={14} strokeWidth={2.2} />
              Book now
            </Link>
          </div>
        </div>
      </header>
      {children}
      <footer className="border-t border-[#0D2A26]/10 bg-[#EAF1EF]">
        <div className="mx-auto grid max-w-[1240px] gap-8 px-6 py-12 text-sm md:grid-cols-4 md:px-10">
          <div>
            <div className="flex items-center gap-2.5">
              <LumenMark />
              <span
                className="text-xl"
                style={{ fontFamily: "var(--lumen-display)" }}
              >
                Lumen<span style={{ color: "#1F6B5C" }}>.</span>
              </span>
            </div>
            <p className="mt-4 text-[#0D2A26]/65">
              Telemedicine for the Gulf Cooperation Council. Licensed by
              regulatory authorities in UAE, KSA, BHR, QAT.
            </p>
          </div>
          <FCol
            head="Patients"
            items={["Find a doctor", "Specialties", "Pricing", "Insurance"]}
          />
          <FCol
            head="Clinicians"
            items={["Join Lumen", "Provider portal", "Continuing education"]}
          />
          <FCol head="Company" items={["About", "Press", "Careers", "Privacy"]} />
        </div>
        <div className="border-t border-[#0D2A26]/10 px-6 py-5 text-center text-xs text-[#0D2A26]/55 md:px-10">
          © Lumen Health · MOH license #DHA-2024-0742 · Not a substitute for emergency care
        </div>
      </footer>
    </div>
  );
}

function LumenMark() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden>
      <defs>
        <linearGradient id="lumen" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0" stopColor="#1F6B5C" />
          <stop offset="1" stopColor="#7CA982" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="13" fill="none" stroke="url(#lumen)" strokeWidth="2" />
      <path
        d="M10 18 L14 14 L18 18 L22 12"
        fill="none"
        stroke="url(#lumen)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FCol({ head, items }: { head: string; items: string[] }) {
  return (
    <div>
      <div className="mb-3 text-[11px] uppercase tracking-[0.16em] text-[#0D2A26]/45">
        {head}
      </div>
      <ul className="space-y-2 text-[#0D2A26]/80">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}
