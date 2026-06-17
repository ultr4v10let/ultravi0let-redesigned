import { Barlow, Barlow_Condensed } from "next/font/google";
import Link from "next/link";
import { NdaBanner } from "@/components/demo/NdaBanner";

const sans = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--maq-sans",
  display: "swap",
});

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--maq-display",
  display: "swap",
});

export const metadata = {
  title: "Maquette · Print production platform",
};

export default function MaquetteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${sans.variable} ${display.variable}`}
      style={{
        background: "#14181F",
        color: "#E8EAED",
        fontFamily: "var(--maq-sans)",
        minHeight: "100svh",
      }}
    >
      <NdaBanner
        tint="rgba(232,234,237,0.05)"
        ink="#E8EAED"
        border="rgba(232,234,237,0.1)"
      />
      <header className="border-b border-[#E8EAED]/10 bg-[#14181F]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-4 md:px-10">
          <Link href="/demos/maquette" className="flex items-center gap-3">
            <MaqMark />
            <span
              className="text-2xl font-bold uppercase tracking-wide"
              style={{ fontFamily: "var(--maq-display)" }}
            >
              Maquette
            </span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm md:flex">
            {[
              { l: "Services", h: "/demos/maquette#services" },
              { l: "Orders", h: "/demos/maquette/orders" },
              { l: "Get quote", h: "/demos/maquette/quote" },
            ].map((i) => (
              <Link
                key={i.l}
                href={i.h}
                className="text-[#E8EAED]/70 transition-colors hover:text-[#E8EAED]"
              >
                {i.l}
              </Link>
            ))}
          </nav>
          <Link
            href="/demos/maquette/quote"
            className="rounded-md bg-[#F97316] px-4 py-2 text-[13px] font-semibold text-[#14181F] hover:bg-[#FB923C]"
          >
            New quote
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}

function MaqMark() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden>
      <rect x="2" y="2" width="26" height="26" fill="#F97316" opacity="0.15" />
      <rect x="2" y="2" width="26" height="26" fill="none" stroke="#F97316" strokeWidth="1.5" />
      <path d="M6 22 L15 8 L24 22 Z" fill="none" stroke="#F97316" strokeWidth="1.8" />
    </svg>
  );
}
