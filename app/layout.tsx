import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Body — Space Grotesk carries longer copy where mono would tire the eye.
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Display + mono — JetBrains Mono, the engineer's typeface. Wordmark is 800.
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "ULTRAVI0LET · Light just past what the eye can see",
  description:
    "A senior-only product studio that builds and owns the parts of software other people can't see — and won't touch. Design, engineering, cloud, and AI.",
  metadataBase: new URL("https://ultravi0let.com"),
  openGraph: {
    title: "ULTRAVI0LET",
    description:
      "The quiet machinery behind loud products. Design, engineering, cloud, and AI.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
  themeColor: "#08070B",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${grotesk.variable} ${mono.variable}`}>
      <body className="grain bg-ground font-sans text-paper-50 antialiased">
        {children}
      </body>
    </html>
  );
}
