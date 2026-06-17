import { DM_Sans, Playfair_Display } from "next/font/google";
import { NdaBanner } from "@/components/demo/NdaBanner";
import { HavenHeader } from "@/components/demo/haven/HavenHeader";

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--hvn-sans",
  display: "swap",
});

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--hvn-display",
  display: "swap",
});

export const metadata = {
  title: "Haven Home · Furniture & living",
};

export default function HavenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${sans.variable} ${display.variable}`}
      style={{
        background: "#F7F5F2",
        color: "#1C1917",
        fontFamily: "var(--hvn-sans)",
        minHeight: "100svh",
      }}
    >
      <NdaBanner
        tint="rgba(28,25,23,0.04)"
        ink="#1C1917"
        border="rgba(28,25,23,0.1)"
      />
      <HavenHeader />
      {children}
    </div>
  );
}
