import { IBM_Plex_Mono, Libre_Baskerville, Outfit } from "next/font/google";
import { NdaBanner } from "@/components/demo/NdaBanner";
import { FacetHeader } from "@/components/demo/facet/FacetHeader";
import { FACET_SHELL } from "@/lib/demos/facet-shell";

const sans = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--facet-sans",
  display: "swap",
});

const display = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--facet-display",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--facet-mono",
  display: "swap",
});

export const metadata = {
  title: "Facet · Field-specific portfolio builder",
};

export default function FacetLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`facet-root ${sans.variable} ${display.variable} ${mono.variable}`}
      style={{
        background: FACET_SHELL.paper,
        color: FACET_SHELL.ink,
        fontFamily: "var(--facet-sans)",
        minHeight: "100svh",
      }}
    >
      <NdaBanner
        tint="rgba(28,43,58,0.05)"
        ink={FACET_SHELL.ink}
        border={FACET_SHELL.border}
      />
      <FacetHeader />
      {children}
    </div>
  );
}
