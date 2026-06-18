"use client";

import { FACET_IMAGE_ACCEPT, FacetImageError, processImageFile } from "@/lib/demos/facet-images";
import { FACET_SHELL } from "@/lib/demos/facet-shell";
import { ImagePlus, Upload, X } from "lucide-react";
import { useId, useRef, useState } from "react";

type ShellProps = {
  border?: string;
  paper?: string;
  ink?: string;
  inkMuted?: string;
  accent?: string;
};

function useImageUpload(
  onChange: (dataUrl: string) => void,
  options: { maxWidth: number; maxHeight: number }
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function openPicker() {
    if (!busy) inputRef.current?.click();
  }

  async function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const dataUrl = await processImageFile(file, options);
      onChange(dataUrl);
    } catch (err) {
      setError(err instanceof FacetImageError ? err.message : "Upload failed. Try another image.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  const input = (
    <input
      ref={inputRef}
      type="file"
      accept={FACET_IMAGE_ACCEPT}
      className="sr-only"
      onChange={(e) => void handleFiles(e.target.files)}
    />
  );

  return { inputRef, input, openPicker, busy, error, setError, handleFiles };
}

export function ProfileImageUploader({
  value,
  onChange,
  name,
  shell = FACET_SHELL,
}: {
  value: string;
  onChange: (dataUrl: string) => void;
  name: string;
  shell?: ShellProps;
}) {
  const hintId = useId();
  const { input, openPicker, busy, error } = useImageUpload(onChange, {
    maxWidth: 512,
    maxHeight: 512,
  });

  const initial = name.trim().charAt(0).toUpperCase() || "?";

  return (
    <div className="mt-2">
      {input}
      <button
        type="button"
        onClick={openPicker}
        disabled={busy}
        aria-describedby={hintId}
        className="group relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed transition-colors hover:border-[#E07A5F] focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/25 disabled:opacity-60"
        style={{ borderColor: shell.border, background: shell.paper }}
      >
        {value.trim() ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="Profile" className="h-full w-full object-cover" />
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/45 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              <Upload size={18} className="text-white" />
              <span className="text-[10px] font-medium uppercase tracking-wider text-white">
                {busy ? "Uploading…" : "Change"}
              </span>
            </span>
          </>
        ) : (
          <span className="flex flex-col items-center gap-2 px-2 text-center">
            <span
              className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-semibold"
              style={{ background: `${shell.accent}18`, color: shell.accent }}
            >
              {initial}
            </span>
            <span className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider" style={{ color: shell.inkMuted }}>
              <ImagePlus size={12} />
              {busy ? "Uploading…" : "Upload photo"}
            </span>
          </span>
        )}
      </button>
      <p id={hintId} className="mt-2 text-xs" style={{ color: shell.inkMuted }}>
        Click to upload · JPG, PNG, WebP, GIF & other images
      </p>
      {error ? <p className="mt-1 text-xs text-rose-600">{error}</p> : null}
    </div>
  );
}

export function GalleryImageUploader({
  values,
  onChange,
  maxPhotos = 6,
  shell = FACET_SHELL,
}: {
  values: string[];
  onChange: (photos: string[]) => void;
  maxPhotos?: number;
  shell?: ShellProps;
}) {
  const addInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);
  const replaceIndexRef = useRef<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function ingest(file: File, index?: number) {
    setBusy(true);
    setError(null);
    try {
      const dataUrl = await processImageFile(file, { maxWidth: 1200, maxHeight: 900 });
      if (index === undefined) {
        onChange([...values, dataUrl]);
      } else {
        const next = [...values];
        next[index] = dataUrl;
        onChange(next);
      }
    } catch (err) {
      setError(err instanceof FacetImageError ? err.message : "Upload failed. Try another image.");
    } finally {
      setBusy(false);
      if (addInputRef.current) addInputRef.current.value = "";
      if (replaceInputRef.current) replaceInputRef.current.value = "";
      replaceIndexRef.current = null;
    }
  }

  function removeAt(index: number) {
    onChange(values.filter((_, i) => i !== index));
  }

  return (
    <div className="mt-2">
      <input
        ref={addInputRef}
        type="file"
        accept={FACET_IMAGE_ACCEPT}
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void ingest(file);
        }}
      />
      <input
        ref={replaceInputRef}
        type="file"
        accept={FACET_IMAGE_ACCEPT}
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          const index = replaceIndexRef.current;
          if (file && index !== null) void ingest(file, index);
        }}
      />

      <div className="grid grid-cols-3 gap-2">
        {values.map((src, i) => (
          <div key={`${i}-${src.slice(0, 24)}`} className="group relative aspect-[4/3] overflow-hidden rounded-lg border" style={{ borderColor: shell.border }}>
            <button
              type="button"
              onClick={() => {
                replaceIndexRef.current = i;
                replaceInputRef.current?.click();
              }}
              disabled={busy}
              className="h-full w-full"
              aria-label={`Replace gallery image ${i + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Gallery ${i + 1}`} className="h-full w-full object-cover" />
              <span className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition-opacity group-hover:opacity-100">
                <Upload size={16} className="text-white" />
              </span>
            </button>
            <button
              type="button"
              onClick={() => removeAt(i)}
              className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
              aria-label={`Remove gallery image ${i + 1}`}
            >
              <X size={12} />
            </button>
          </div>
        ))}

        {values.length < maxPhotos ? (
          <button
            type="button"
            onClick={() => addInputRef.current?.click()}
            disabled={busy}
            className="flex aspect-[4/3] flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed text-[10px] font-medium uppercase tracking-wider transition-colors hover:border-[#E07A5F] disabled:opacity-60"
            style={{ borderColor: shell.border, color: shell.inkMuted, background: shell.paper }}
          >
            <ImagePlus size={18} style={{ color: shell.accent }} />
            {busy ? "Uploading…" : "Add photo"}
          </button>
        ) : null}
      </div>

      <p className="mt-2 text-xs" style={{ color: shell.inkMuted }}>
        Click a photo to replace it · up to {maxPhotos} images
      </p>
      {error ? <p className="mt-1 text-xs text-rose-600">{error}</p> : null}
    </div>
  );
}
