import { ShieldCheck } from "lucide-react";

export function NdaBanner({
  tint = "rgba(0,0,0,0.04)",
  ink = "currentColor",
  border = "rgba(0,0,0,0.08)",
}: {
  tint?: string;
  ink?: string;
  border?: string;
}) {
  return (
    <div
      className="relative z-50 w-full"
      style={{
        background: tint,
        color: ink,
        borderBottom: `1px solid ${border}`,
        backdropFilter: "blur(10px)",
      }}
      role="note"
    >
      <div className="mx-auto flex max-w-[1440px] items-center gap-3 px-4 py-2 text-[11px] leading-snug md:px-8 md:py-2.5 md:text-xs">
        <ShieldCheck size={14} strokeWidth={1.7} aria-hidden />
        <span>
          Due to NDAs with our clients, we cannot show the live product.
          This is a demonstration of what we delivered.
        </span>
        <a
          href="/"
          className="ml-auto whitespace-nowrap underline-offset-2 hover:underline"
        >
          ← Back to Ultravi0let
        </a>
      </div>
    </div>
  );
}
