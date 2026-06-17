import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Light surfaces — warm cream / paper
        paper: {
          50: "#FAF7F0",  // page background
          100: "#F2ECD9", // raised card
          200: "#E8DEC5", // deeper card
          300: "#D9CCAE", // borders / muted blocks
          400: "#BFB291",
        },
        // Dark text / ink
        ink: {
          700: "#3A2F4C",
          800: "#231A36",
          900: "#15102A",
          950: "#0E0A1F", // primary text / headings
        },
        violet: {
          300: "#C4A5FF",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#4C1D95",
        },
        accent: {
          DEFAULT: "#6D28D9",  // italic accent on cream
          warm: "#9F6A2D",      // optional warm gold for variety
        },
      },
      fontFamily: {
        sans: ["var(--font-geist)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-instrument)", "ui-serif", "Georgia"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.05em",
        verytight: "-0.03em",
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee 40s linear infinite reverse",
        shimmer: "shimmer 3s linear infinite",
        breathe: "breathe 14s ease-in-out infinite",
        "pulse-soft": "pulseSoft 9s ease-in-out infinite",
        "drift-1": "drift1 22s ease-in-out infinite",
        "drift-2": "drift2 28s ease-in-out infinite",
        "drift-3": "drift3 18s ease-in-out infinite",
        "spin-slow": "spin 24s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        breathe: {
          "0%,100%": {
            transform: "translate(0,0) scale(1) rotate(0deg)",
          },
          "25%": {
            transform: "translate(40px,-30px) scale(1.08) rotate(2deg)",
          },
          "50%": {
            transform: "translate(-30px,42px) scale(1.16) rotate(-2deg)",
          },
          "75%": {
            transform: "translate(50px,18px) scale(1.06) rotate(1deg)",
          },
        },
        pulseSoft: {
          "0%,100%": { opacity: "0.55" },
          "50%": { opacity: "0.85" },
        },
        drift1: {
          "0%,100%": { transform: "translate(-50%, 0) scale(1)" },
          "50%": { transform: "translate(-46%, 28px) scale(1.08)" },
        },
        drift2: {
          "0%,100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-40px, 24px) scale(1.12)" },
        },
        drift3: {
          "0%,100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(28px, -20px) scale(1.06)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
