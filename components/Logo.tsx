import { cn } from "@/lib/cn";

// The vanishing spectrum — eight bars stepping from the brightest visible
// violet into near-black. Even width, even gap. Light enters at the left; the
// mark vanishes to the right. Never reorder, add, or remove a bar.
export const SPECTRUM = [
  "#C4A5FF", // Signal
  "#B491FF",
  "#9E6DFF", // Violet
  "#8452EC",
  "#7C3AED", // Core
  "#5B21B6", // Deep
  "#38156F", // Edge
  "#1B0E3B", // into the ground
];

export function SpectrumMark({
  size = 24,
  className,
  animated = false,
}: {
  /** bar height in px */
  size?: number;
  className?: string;
  /** rise the bars in on mount, one column at a time */
  animated?: boolean;
}) {
  const bar = Math.max(2, Math.round(size / 8.5));
  return (
    <span
      aria-hidden
      className={cn("inline-flex items-end", className)}
      style={{ height: size, gap: bar }}
    >
      {SPECTRUM.map((c, i) => (
        <span
          key={i}
          className={cn("block rounded-[1px]", animated && "animate-bar-in")}
          style={{
            width: bar,
            height: size,
            background: c,
            transformOrigin: "bottom",
            animationDelay: animated ? `${i * 70}ms` : undefined,
          }}
        />
      ))}
    </span>
  );
}

// Wordmark — ULTRAVI0LET, JetBrains Mono 800, uppercase. The numeral zero
// replaces the letter O and carries the brand violet.
export function Wordmark({
  className,
  zeroClassName,
}: {
  className?: string;
  zeroClassName?: string;
}) {
  return (
    <span
      className={cn(
        "font-display font-extrabold uppercase tracking-tight",
        className
      )}
    >
      ULTRAVI
      <span className={cn("text-violet-400", zeroClassName)}>0</span>
      LET
    </span>
  );
}

// Full lockup — mark to the left of the wordmark, one bar-width of space.
export function Logo({
  markSize = 22,
  className,
  wordClassName,
}: {
  markSize?: number;
  className?: string;
  wordClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <SpectrumMark size={markSize} />
      <Wordmark className={cn("text-[19px] leading-none", wordClassName)} />
    </span>
  );
}
