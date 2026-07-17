import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ── Brand spectrum — a single violet range, deepening to black ──────
        // Ground is where the brand sits. Use the full ramp only in the mark.
        ground: "#08070B", // near-black — the ground
        verge: "#160B2E", // darkest visible violet
        edge: "#38156F",
        deep: "#5B21B6",
        core: "#7C3AED", // the anchor violet
        signal: "#C4A5FF", // brightest visible violet
        // Paper white for inverted surfaces / text on ground
        paper: {
          50: "#F5F3F7",
          100: "#F4F4F6",
          200: "#E8E8EC",
          300: "#D4D4D9",
          400: "#A8A8B0",
        },
        // Kept for the isolated demo pages that reference ink-*
        ink: {
          700: "#3A2F4C",
          800: "#231A36",
          900: "#15102A",
          950: "#0A0710",
        },
        violet: {
          300: "#C4A5FF", // Signal
          400: "#9E6DFF", // Violet
          500: "#8B5CF6",
          600: "#7C3AED", // Core
          700: "#6D28D9",
          800: "#5B21B6", // Deep
          900: "#4C1D95",
        },
        accent: {
          DEFAULT: "#9E6DFF",
          soft: "#C4A5FF",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.05em",
        verytight: "-0.03em",
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        marquee: "marquee 42s linear infinite",
        "marquee-reverse": "marquee 42s linear infinite reverse",
        shimmer: "shimmer 3s linear infinite",
        "bar-in": "barIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        blink: "blink 1.15s steps(1) infinite",
        scan: "scan 7s ease-in-out infinite",
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
        // Bars rise from nothing — light entering at the left, one column at a time
        barIn: {
          "0%": { transform: "scaleY(0.12)", opacity: "0.25" },
          "100%": { transform: "scaleY(1)", opacity: "1" },
        },
        blink: {
          "0%, 50%": { opacity: "1" },
          "50.01%, 100%": { opacity: "0" },
        },
        // A faint sheen travelling down the ambient spectrum column
        scan: {
          "0%, 100%": { transform: "translateY(-8%)", opacity: "0.5" },
          "50%": { transform: "translateY(8%)", opacity: "0.85" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
