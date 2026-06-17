import type { Metadata } from "next";
import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
  weight: ["400", "500", "600"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ultravi0let · Digital craft for ambitious products",
  description:
    "A senior product studio based in Dubai. Design, engineering, cloud, and AI for teams who plan to ship and keep shipping.",
  metadataBase: new URL("https://ultravi0let.com"),
  openGraph: {
    title: "Ultravi0let",
    description:
      "Design, engineering, cloud, and AI for ambitious products.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${instrument.variable}`}
    >
      <body className="grain bg-ink-950 font-sans text-bone-50">{children}</body>
    </html>
  );
}
