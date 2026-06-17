import { Cormorant_Garamond, Inter } from "next/font/google";
import Link from "next/link";
import { NdaBanner } from "@/components/demo/NdaBanner";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--agl-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--agl-sans",
  display: "swap",
});

export const metadata = {
  title: "AG Law · Counsel of distinction",
};

export default function AgLawLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${cormorant.variable} ${inter.variable} agl-root`}
      style={{
        background: "#F6F1E6",
        color: "#0F1A33",
        fontFamily: "var(--agl-sans)",
        minHeight: "100svh",
      }}
    >
      <NdaBanner
        tint="rgba(15,26,51,0.04)"
        ink="#0F1A33"
        border="rgba(15,26,51,0.1)"
      />
      <AglNav />
      {children}
      <AglFooter />
    </div>
  );
}

function AglNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#0F1A33]/10 bg-[#F6F1E6]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-5 md:px-10">
        <Link href="/demos/ag-law" className="flex items-center gap-3">
          <Crest />
          <span
            className="text-[20px] font-medium tracking-tight"
            style={{ fontFamily: "var(--agl-display)", color: "#0F1A33" }}
          >
            Abdelgawad &amp; Partners
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm md:flex">
          {[
            { l: "Practice", h: "/demos/ag-law#practice" },
            { l: "Attorneys", h: "/demos/ag-law/attorneys" },
            { l: "Insights", h: "/demos/ag-law#insights" },
          ].map((i) => (
            <Link
              key={i.l}
              href={i.h}
              className="text-[#0F1A33]/75 transition-colors hover:text-[#0F1A33]"
            >
              {i.l}
            </Link>
          ))}
        </nav>
        <Link
          href="/demos/ag-law/book"
          className="inline-flex items-center gap-2 rounded-sm border border-[#0F1A33] bg-[#0F1A33] px-4 py-2 text-[12px] uppercase tracking-[0.18em] text-[#F6F1E6] transition-colors hover:bg-[#B89466] hover:border-[#B89466]"
        >
          Request a consultation
        </Link>
      </div>
    </header>
  );
}

function AglFooter() {
  return (
    <footer className="border-t border-[#0F1A33]/10 bg-[#0F1A33] text-[#F6F1E6]/85">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-6 py-16 md:grid-cols-3 md:px-10">
        <div>
          <div className="flex items-center gap-3">
            <Crest light />
            <span
              className="text-xl"
              style={{ fontFamily: "var(--agl-display)" }}
            >
              Abdelgawad &amp; Partners
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#F6F1E6]/65">
            Counsel of distinction. Established Cairo 1986. Recognised in
            Chambers Global Band 1 for Corporate &amp; M&amp;A.
          </p>
        </div>
        <div className="text-sm leading-relaxed">
          <div className="mb-3 text-[11px] uppercase tracking-[0.2em] text-[#B89466]">
            Cairo office
          </div>
          12 Mohammed Mazhar St.
          <br />
          Zamalek, Cairo 11211
          <br />
          Arab Republic of Egypt
        </div>
        <div className="text-sm leading-relaxed">
          <div className="mb-3 text-[11px] uppercase tracking-[0.2em] text-[#B89466]">
            Correspondence
          </div>
          chambers@aglaw.demo
          <br />
          Mon — Thu · 09:00 — 18:00
          <br />
          Sat · By appointment only
        </div>
      </div>
      <div className="border-t border-[#F6F1E6]/10 px-6 py-5 text-center text-[11px] uppercase tracking-[0.2em] text-[#F6F1E6]/45 md:px-10">
        © Abdelgawad &amp; Partners · Bar Association of Egypt
      </div>
    </footer>
  );
}

function Crest({ light }: { light?: boolean }) {
  const ink = light ? "#F6F1E6" : "#0F1A33";
  const gold = "#B89466";
  return (
    <svg width="28" height="34" viewBox="0 0 28 34" aria-hidden>
      <path
        d="M14 1 L26 6 V18 C26 25 20 31 14 33 C8 31 2 25 2 18 V6 Z"
        fill="none"
        stroke={ink}
        strokeWidth="1.4"
      />
      <path
        d="M14 7 L20 9.5 V18 C20 22.5 17 26 14 27 C11 26 8 22.5 8 18 V9.5 Z"
        fill={gold}
        opacity="0.18"
        stroke={gold}
        strokeWidth="1"
      />
      <text
        x="14"
        y="20"
        textAnchor="middle"
        fontFamily="serif"
        fontStyle="italic"
        fontSize="9"
        fill={ink}
      >
        AG
      </text>
    </svg>
  );
}
