"use client";

import { isDataImage } from "@/lib/demos/facet-images";
import Image from "next/image";
import { useState } from "react";

export type PhotoVariant =
  | "terminal"
  | "lumen"
  | "blueprint"
  | "atelier"
  | "clinical"
  | "scholar";

const profileStyles: Record<PhotoVariant, string> = {
  terminal: "h-20 w-20 rounded-lg border-2 border-emerald-500/40 object-cover",
  lumen: "h-24 w-24 rounded-2xl border border-[#E2E8F0] object-cover shadow-md",
  blueprint: "h-24 w-24 rounded-sm border-2 border-[#93C5FD]/50 object-cover",
  atelier: "h-28 w-28 rounded-full object-cover ring-2 ring-[#D6D3D1] ring-offset-4 ring-offset-[#F5F0E8]",
  clinical: "h-24 w-24 rounded-full border-4 border-white object-cover shadow-md",
  scholar: "h-28 w-28 rounded-sm border border-[#334155] object-cover",
};

const fallbackInitial: Record<PhotoVariant, string> = {
  terminal:
    "flex h-20 w-20 items-center justify-center rounded-lg border-2 border-emerald-500/40 bg-emerald-500/10 text-2xl font-bold text-emerald-300",
  lumen:
    "flex h-24 w-24 items-center justify-center rounded-2xl border border-[#E2E8F0] bg-[#EEF2FF] text-2xl font-bold text-[#6366F1]",
  blueprint:
    "flex h-24 w-24 items-center justify-center rounded-sm border-2 border-[#93C5FD]/50 bg-[#0F2744] text-2xl font-bold text-[#93C5FD]",
  atelier:
    "flex h-28 w-28 items-center justify-center rounded-full bg-[#E7E5E4] text-3xl italic text-[#78716C]",
  clinical:
    "flex h-24 w-24 items-center justify-center rounded-full bg-[#0D9488] text-2xl font-bold text-white",
  scholar:
    "flex h-28 w-28 items-center justify-center rounded-sm border border-[#334155] bg-[#1E293B] text-2xl text-[#D4A574]",
};

const galleryLabel: Record<PhotoVariant, string> = {
  terminal: "text-emerald-400",
  lumen: "text-xs font-semibold uppercase tracking-[0.2em] text-[#6366F1]",
  blueprint: "font-mono text-[10px] uppercase tracking-[0.2em] text-[#93C5FD]",
  atelier: "text-sm uppercase tracking-[0.16em] text-[#A8A29E]",
  clinical: "text-xs font-semibold uppercase tracking-[0.18em] text-[#0D9488]",
  scholar: "text-[10px] uppercase tracking-[0.2em] text-[#D4A574]",
};

const galleryGrid: Record<PhotoVariant, string> = {
  terminal: "mt-4 grid grid-cols-3 gap-2",
  lumen: "mt-4 grid grid-cols-3 gap-3",
  blueprint: "mt-4 grid grid-cols-3 gap-2",
  atelier: "mt-6 grid grid-cols-3 gap-3",
  clinical: "mt-4 grid grid-cols-3 gap-3",
  scholar: "mt-4 grid grid-cols-3 gap-2",
};

const galleryCell: Record<PhotoVariant, string> = {
  terminal: "relative aspect-[4/3] overflow-hidden rounded border border-emerald-500/25 bg-[#0B1220]",
  lumen: "relative aspect-[4/3] overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-sm",
  blueprint: "relative aspect-[4/3] overflow-hidden border border-[#93C5FD]/30 bg-[#0F2744]",
  atelier: "relative aspect-[4/3] overflow-hidden rounded-sm bg-[#E7E5E4]",
  clinical: "relative aspect-[4/3] overflow-hidden rounded-lg border border-[#99F6E4] bg-white",
  scholar: "relative aspect-[4/3] overflow-hidden border border-[#334155] bg-[#1E293B]",
};

export function ProfilePhoto({
  src,
  name,
  variant,
  className = "",
}: {
  src: string;
  name: string;
  variant: PhotoVariant;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const initial = name.trim().charAt(0).toUpperCase() || "?";

  if (!src.trim() || failed) {
    return <div className={`${fallbackInitial[variant]} ${className}`}>{initial}</div>;
  }

  return (
    <Image
      src={src}
      alt={name}
      width={112}
      height={112}
      className={`${profileStyles[variant]} ${className}`}
      onError={() => setFailed(true)}
      unoptimized={isDataImage(src) || !src.includes("images.unsplash.com")}
    />
  );
}

export function PhotoGallery({
  urls,
  variant,
  label = "Gallery",
}: {
  urls: string[];
  variant: PhotoVariant;
  label?: string;
}) {
  const photos = urls.map((u) => u.trim()).filter(Boolean);
  if (!photos.length) return null;

  const prefix = variant === "terminal" ? "$ ls ./gallery" : null;

  return (
    <div>
      {prefix ? (
        <p className={galleryLabel[variant]}>{prefix}</p>
      ) : (
        <p className={galleryLabel[variant]}>{label}</p>
      )}
      <div className={galleryGrid[variant]}>
        {photos.map((url, i) => (
          <GalleryImage key={`${url}-${i}`} url={url} alt={`${label} ${i + 1}`} className={galleryCell[variant]} />
        ))}
      </div>
    </div>
  );
}

function GalleryImage({ url, alt, className }: { url: string; alt: string; className: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`${className} flex items-center justify-center text-[10px] uppercase tracking-wider opacity-40`}>
        —
      </div>
    );
  }

  return (
    <div className={className}>
      <Image
        src={url}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 33vw, 200px"
        onError={() => setFailed(true)}
        unoptimized={isDataImage(url) || !url.includes("images.unsplash.com")}
      />
    </div>
  );
}
