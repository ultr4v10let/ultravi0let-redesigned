import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import Link from "next/link";
import { NdaBanner } from "@/components/demo/NdaBanner";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--zan-display",
  display: "swap",
});

const sans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--zan-sans",
  display: "swap",
});

export const metadata = {
  title: "Zanobia Patisserie · Operations console",
};

const NAV = [
  { l: "Overview", h: "/demos/zanobia" },
  { l: "Inventory", h: "/demos/zanobia/inventory" },
  { l: "Production", h: "/demos/zanobia/production" },
  { l: "Shops", h: "/demos/zanobia/shops" },
  { l: "Admin", h: "/demos/zanobia/admin" },
];

export default function ZanobiaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${display.variable} ${sans.variable}`}
      style={{
        background: "#FBF6F0",
        color: "#3D2A24",
        fontFamily: "var(--zan-sans)",
        minHeight: "100svh",
      }}
    >
      <NdaBanner
        tint="rgba(61,42,36,0.05)"
        ink="#3D2A24"
        border="rgba(61,42,36,0.12)"
      />
      <div className="flex min-h-[calc(100svh-40px)]">
        <aside className="hidden w-56 shrink-0 flex-col border-r border-[#3D2A24]/10 bg-[#FFFDF9] lg:flex">
          <Link
            href="/demos/zanobia"
            className="flex items-center gap-2.5 border-b border-[#3D2A24]/10 px-5 py-5"
          >
            <ZanMark />
            <div>
              <div
                className="text-lg font-semibold leading-tight"
                style={{ fontFamily: "var(--zan-display)" }}
              >
                Zanobia
              </div>
              <div className="text-[10px] uppercase tracking-[0.16em] text-[#3D2A24]/55">
                Patisserie Ops
              </div>
            </div>
          </Link>
          <nav className="flex flex-1 flex-col gap-1 p-3">
            {NAV.map((i) => (
              <Link
                key={i.l}
                href={i.h}
                className="rounded-lg px-3 py-2.5 text-sm text-[#3D2A24]/75 transition-colors hover:bg-[#C9A87C]/15 hover:text-[#3D2A24]"
              >
                {i.l}
              </Link>
            ))}
          </nav>
          <div className="border-t border-[#3D2A24]/10 p-4 text-[11px] text-[#3D2A24]/55">
            Factory · 4 retail shops · HQ admin
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-[#3D2A24]/10 bg-[#FFFDF9]/90 px-5 py-3.5 backdrop-blur lg:hidden">
            <Link href="/demos/zanobia" className="flex items-center gap-2">
              <ZanMark />
              <span className="font-semibold" style={{ fontFamily: "var(--zan-display)" }}>
                Zanobia
              </span>
            </Link>
            <nav className="flex gap-3 overflow-x-auto text-xs">
              {NAV.slice(1, 4).map((i) => (
                <Link key={i.l} href={i.h} className="whitespace-nowrap text-[#3D2A24]/70">
                  {i.l}
                </Link>
              ))}
            </nav>
          </header>
          {children}
        </div>
      </div>
    </div>
  );
}

function ZanMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden>
      <circle cx="14" cy="14" r="12" fill="#C9A87C" opacity="0.2" stroke="#C9A87C" strokeWidth="1.5" />
      <path
        d="M8 16 Q14 8 20 16"
        fill="none"
        stroke="#8B5E4B"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
