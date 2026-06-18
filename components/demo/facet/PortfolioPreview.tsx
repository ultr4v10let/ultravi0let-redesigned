"use client";

import type { FacetPortfolio } from "@/lib/demos/facet";
import { FACET_FIELD_CONFIG, FACET_THEMES } from "@/lib/demos/facet";
import { PhotoGallery, ProfilePhoto } from "@/components/demo/facet/PortfolioImages";
import { ExternalLink, Github, Linkedin } from "lucide-react";

function splitLines(value?: string) {
  return (value ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function externalUrl(value: string) {
  const v = value.trim();
  if (!v) return "#";
  return v.startsWith("http") ? v : `https://${v}`;
}

type FieldDef = (typeof FACET_FIELD_CONFIG)[keyof typeof FACET_FIELD_CONFIG]["fields"][number];

export function PortfolioPreview({ data }: { data: FacetPortfolio }) {
  const fieldLabel = FACET_FIELD_CONFIG[data.field].label;
  const themeName = FACET_THEMES[data.field].find((t) => t.id === data.theme)?.name ?? "";

  if (data.field === "cs") {
    return data.theme === "a" ? (
      <CsTerminal data={data} fieldLabel={fieldLabel} themeName={themeName} />
    ) : (
      <CsLumen data={data} fieldLabel={fieldLabel} themeName={themeName} />
    );
  }
  if (data.field === "architecture") {
    return data.theme === "a" ? (
      <ArchBlueprint data={data} fieldLabel={fieldLabel} themeName={themeName} />
    ) : (
      <ArchAtelier data={data} fieldLabel={fieldLabel} themeName={themeName} />
    );
  }
  return data.theme === "a" ? (
    <MedClinical data={data} fieldLabel={fieldLabel} themeName={themeName} />
  ) : (
    <MedScholar data={data} fieldLabel={fieldLabel} themeName={themeName} />
  );
}

function MetaBar({
  fieldLabel,
  themeName,
  className = "",
}: {
  fieldLabel: string;
  themeName: string;
  className?: string;
}) {
  return (
    <div className={`text-[10px] uppercase tracking-[0.18em] opacity-50 ${className}`}>
      {fieldLabel} · {themeName} template
    </div>
  );
}

/* ─── Computer Science · Terminal ─────────────────────────────────────────── */

function CsTerminal({
  data,
  fieldLabel,
  themeName,
}: {
  data: FacetPortfolio;
  fieldLabel: string;
  themeName: string;
}) {
  const fields = FACET_FIELD_CONFIG.cs.fields;

  return (
    <div className="min-h-full bg-[#0F172A] font-mono text-[#E2E8F0]">
      <div className="border-b border-emerald-500/20 bg-[#0B1220] px-6 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <MetaBar fieldLabel={fieldLabel} themeName={themeName} className="text-emerald-400/70" />
        <div className="mt-6 flex items-start gap-5">
          <ProfilePhoto src={data.profilePhoto} name={data.name} variant="terminal" />
          <div className="min-w-0 flex-1">
            <p className="text-emerald-400">$ whoami</p>
            <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">{data.name}</h1>
            <p className="mt-3 text-lg text-emerald-300/90">{data.headline}</p>
          </div>
        </div>
        <p className="mt-6 leading-relaxed text-[#94A3B8]">{data.bio}</p>
        <div className="mt-10">
          <PhotoGallery urls={data.galleryPhotos} variant="terminal" />
        </div>

        <div className="mt-10 space-y-10">
          {fields.map((field) => (
            <CsTerminalField key={field.key} field={field} value={data.details[field.key]} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CsTerminalField({ field, value }: { field: FieldDef; value?: string }) {
  if (!value?.trim()) return null;

  if (field.key === "github" || field.key === "linkedin") {
    const Icon = field.key === "github" ? Github : Linkedin;
    return (
      <div>
        <p className="text-emerald-400">$ open {field.key}</p>
        <a
          href={externalUrl(value)}
          className="mt-3 inline-flex items-center gap-2 rounded border border-emerald-500/30 px-3 py-1.5 text-xs text-emerald-400"
        >
          <Icon size={14} /> {value}
        </a>
      </div>
    );
  }

  if (field.key === "languages") {
    const langs = value.split(",").map((l) => l.trim()).filter(Boolean);
    return (
      <div>
        <p className="text-emerald-400">$ cat languages.txt</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {langs.map((l) => (
            <span key={l} className="rounded bg-emerald-500/15 px-2.5 py-1 text-xs text-emerald-300">
              {l}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (field.key === "projects") {
    const lines = splitLines(value);
    return (
      <div>
        <p className="text-emerald-400">$ ls ./projects</p>
        <ul className="mt-4 space-y-4">
          {lines.map((p) => (
            <li key={p} className="border-l-2 border-emerald-500/40 pl-4 text-sm leading-relaxed text-[#CBD5E1]">
              {p}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="border-t border-[#1E293B] pt-6">
      <p className="text-emerald-400"># {field.label}</p>
      <p className="mt-2 text-sm text-[#64748B]">{value}</p>
    </div>
  );
}

/* ─── Computer Science · Lumen ──────────────────────────────────────────── */

function CsLumen({
  data,
  fieldLabel,
  themeName,
}: {
  data: FacetPortfolio;
  fieldLabel: string;
  themeName: string;
}) {
  const fields = FACET_FIELD_CONFIG.cs.fields;

  return (
    <div className="min-h-full bg-[#F8FAFC] text-[#0F172A]" style={{ fontFamily: "var(--facet-sans)" }}>
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <MetaBar fieldLabel={fieldLabel} themeName={themeName} />
        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
          <ProfilePhoto src={data.profilePhoto} name={data.name} variant="lumen" />
          <div className="min-w-0 flex-1">
            <h1
              className="text-4xl font-bold tracking-tight text-[#0F172A] md:text-5xl"
              style={{ fontFamily: "var(--facet-display)" }}
            >
              {data.name}
            </h1>
            <p className="mt-4 text-xl text-[#6366F1]">{data.headline}</p>
          </div>
        </div>
        <p className="mt-6 text-lg leading-relaxed text-[#475569]">{data.bio}</p>
        <div className="mt-10">
          <PhotoGallery urls={data.galleryPhotos} variant="lumen" label="Gallery" />
        </div>

        <div className="mt-12 space-y-10">
          {fields.map((field) => (
            <CsLumenField key={field.key} field={field} value={data.details[field.key]} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CsLumenField({ field, value }: { field: FieldDef; value?: string }) {
  if (!value?.trim()) return null;

  if (field.key === "github" || field.key === "linkedin") {
    return (
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6366F1]">{field.label}</h2>
        <a href={externalUrl(value)} className="mt-3 inline-block text-sm text-[#4338CA] hover:underline">
          {value}
        </a>
      </div>
    );
  }

  if (field.key === "languages") {
    const langs = value.split(",").map((l) => l.trim()).filter(Boolean);
    return (
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6366F1]">{field.label}</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {langs.map((l) => (
            <span key={l} className="rounded-full bg-[#EEF2FF] px-3 py-1 text-sm text-[#4338CA]">
              {l}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (field.key === "projects") {
    const lines = splitLines(value);
    return (
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6366F1]">{field.label}</h2>
        <div className="mt-6 grid gap-4">
          {lines.map((p, i) => (
            <div key={p} className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
              <div className="font-mono text-[10px] text-[#94A3B8]">0{i + 1}</div>
              <p className="mt-2 text-sm leading-relaxed">{p}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6366F1]">{field.label}</h2>
      <p className="mt-3 text-sm leading-relaxed text-[#64748B]">{value}</p>
    </div>
  );
}

/* ─── Architecture · Blueprint ────────────────────────────────────────── */

function ArchBlueprint({
  data,
  fieldLabel,
  themeName,
}: {
  data: FacetPortfolio;
  fieldLabel: string;
  themeName: string;
}) {
  const fields = FACET_FIELD_CONFIG.architecture.fields;

  return (
    <div
      className="min-h-full text-[#DBEAFE]"
      style={{
        background: "#1E3A5F",
        backgroundImage:
          "linear-gradient(rgba(147,197,253,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(147,197,253,0.08) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <MetaBar fieldLabel={fieldLabel} themeName={themeName} className="text-[#93C5FD]/70" />
        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start">
          <ProfilePhoto src={data.profilePhoto} name={data.name} variant="blueprint" />
          <div className="min-w-0 flex-1">
            <h1
              className="text-4xl font-bold uppercase tracking-tight text-white md:text-5xl"
              style={{ fontFamily: "var(--facet-display)" }}
            >
              {data.name}
            </h1>
            <p className="mt-4 text-xl text-[#BFDBFE]">{data.headline}</p>
          </div>
        </div>
        <p className="mt-6 max-w-xl leading-relaxed text-[#93C5FD]/90">{data.bio}</p>
        <div className="mt-10">
          <PhotoGallery urls={data.galleryPhotos} variant="blueprint" label="Project imagery" />
        </div>

        <div className="mt-12 space-y-8">
          {fields.map((field) => (
            <ArchBlueprintField key={field.key} field={field} value={data.details[field.key]} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ArchBlueprintField({ field, value }: { field: FieldDef; value?: string }) {
  if (!value?.trim()) return null;

  if (field.type === "url") {
    return (
      <div className="border border-[#93C5FD]/20 bg-[#1E3A5F]/80 p-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#93C5FD]">{field.label}</div>
        <span className="mt-2 inline-flex items-center gap-1.5 text-sm text-[#93C5FD]">
          <ExternalLink size={14} /> {value}
        </span>
      </div>
    );
  }

  if (field.key === "projects") {
    const lines = splitLines(value);
    return (
      <div className="space-y-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#93C5FD]">{field.label}</div>
        {lines.map((p, i) => (
          <div key={p} className="border border-[#93C5FD]/25 bg-[#0F2744]/60 p-5">
            <div className="font-mono text-xs text-[#60A5FA]">Sheet {String(i + 1).padStart(2, "0")}</div>
            <p className="mt-2 text-sm leading-relaxed text-[#E0F2FE]">{p}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="border border-[#93C5FD]/20 bg-[#1E3A5F]/80 p-5">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#93C5FD]">{field.label}</div>
      <p className="mt-2 text-sm text-[#E0F2FE]">{value}</p>
    </div>
  );
}

/* ─── Architecture · Atelier ──────────────────────────────────────────── */

function ArchAtelier({
  data,
  fieldLabel,
  themeName,
}: {
  data: FacetPortfolio;
  fieldLabel: string;
  themeName: string;
}) {
  const fields = FACET_FIELD_CONFIG.architecture.fields;

  return (
    <div className="min-h-full bg-[#F5F0E8] text-[#292524]" style={{ fontFamily: "var(--facet-display)" }}>
      <div className="mx-auto max-w-3xl px-6 py-14 md:py-20">
        <MetaBar fieldLabel={fieldLabel} themeName={themeName} />
        <div className="mt-8 flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
          <ProfilePhoto src={data.profilePhoto} name={data.name} variant="atelier" className="shrink-0" />
          <div className="mt-6 min-w-0 flex-1 sm:mt-0 sm:pl-10">
            <h1 className="text-[clamp(2.5rem,6vw,4rem)] italic leading-tight text-[#1C1917]">{data.name}</h1>
            <p className="mt-4 text-lg text-[#78716C]">{data.headline}</p>
          </div>
        </div>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-[#57534E]">{data.bio}</p>
        <div className="mt-10">
          <PhotoGallery urls={data.galleryPhotos} variant="atelier" label="Selected work" />
        </div>

        <div className="mt-14 space-y-10">
          {fields.map((field) => (
            <ArchAtelierField key={field.key} field={field} value={data.details[field.key]} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ArchAtelierField({ field, value }: { field: FieldDef; value?: string }) {
  if (!value?.trim()) return null;

  if (field.key === "projects") {
    const lines = splitLines(value);
    return (
      <div>
        <p className="text-sm uppercase tracking-[0.16em] text-[#A8A29E]">{field.label}</p>
        <div className="mt-6 space-y-8">
          {lines.map((p) => (
            <article key={p} className="border-t border-[#D6D3D1] pt-8">
              <p className="text-lg leading-relaxed text-[#44403C]">{p}</p>
            </article>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm uppercase tracking-[0.16em] text-[#A8A29E]">{field.label}</p>
      <p className="mt-3 text-base leading-relaxed text-[#57534E]">{value}</p>
    </div>
  );
}

/* ─── Medical · Clinical ────────────────────────────────────────────────── */

function MedClinical({
  data,
  fieldLabel,
  themeName,
}: {
  data: FacetPortfolio;
  fieldLabel: string;
  themeName: string;
}) {
  const fields = FACET_FIELD_CONFIG.medical.fields;

  return (
    <div className="min-h-full bg-[#F0FDFA] text-[#134E4A]" style={{ fontFamily: "var(--facet-sans)" }}>
      <div className="border-b border-[#99F6E4] bg-white">
        <div className="mx-auto max-w-3xl px-6 py-8">
          <div className="flex items-start gap-5">
            <ProfilePhoto src={data.profilePhoto} name={data.name} variant="clinical" />
            <div className="min-w-0 flex-1">
              <h1 className="text-3xl font-semibold text-[#0F766E]">{data.name}</h1>
              <p className="mt-2 text-lg text-[#0D9488]">{data.headline}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-6 py-10">
        <MetaBar fieldLabel={fieldLabel} themeName={themeName} />
        <p className="mt-6 text-lg leading-relaxed text-[#115E59]">{data.bio}</p>
        <div className="mt-8">
          <PhotoGallery urls={data.galleryPhotos} variant="clinical" label="Practice & environment" />
        </div>

        <div className="mt-10 space-y-6">
          {fields.map((field) => (
            <MedClinicalField key={field.key} field={field} value={data.details[field.key]} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MedClinicalField({ field, value }: { field: FieldDef; value?: string }) {
  if (!value?.trim()) return null;

  if (field.type === "textarea") {
    const lines = splitLines(value);
    return (
      <section className="rounded-xl border border-[#99F6E4] bg-white p-6">
        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0D9488]">{field.label}</h2>
        <ul className="mt-4 space-y-2 text-sm text-[#134E4A]">
          {lines.map((line) => (
            <li key={line} className="flex gap-2 leading-relaxed">
              <span className="text-[#0D9488]">✓</span> {line}
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-[#99F6E4] bg-white p-6">
      <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0D9488]">{field.label}</h2>
      <p className="mt-3 text-sm leading-relaxed text-[#134E4A]">{value}</p>
    </section>
  );
}

/* ─── Medical · Scholar ─────────────────────────────────────────────────── */

function MedScholar({
  data,
  fieldLabel,
  themeName,
}: {
  data: FacetPortfolio;
  fieldLabel: string;
  themeName: string;
}) {
  const fields = FACET_FIELD_CONFIG.medical.fields;

  return (
    <div className="min-h-full bg-[#0F1729] text-[#F1F5F9]" style={{ fontFamily: "var(--facet-display)" }}>
      <div className="mx-auto max-w-3xl px-6 py-14">
        <MetaBar fieldLabel={fieldLabel} themeName={themeName} className="text-[#94A3B8]/70" />
        <p className="mt-8 text-[11px] uppercase tracking-[0.24em] text-[#D4A574]">Curriculum vitae</p>
        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
          <ProfilePhoto src={data.profilePhoto} name={data.name} variant="scholar" />
          <div className="min-w-0 flex-1">
            <h1 className="text-4xl text-white">{data.name}</h1>
            <p className="mt-3 text-xl italic text-[#94A3B8]">{data.headline}</p>
          </div>
        </div>
        <p className="mt-8 leading-relaxed text-[#CBD5E1]">{data.bio}</p>
        <div className="mt-10">
          <PhotoGallery urls={data.galleryPhotos} variant="scholar" label="Clinical photography" />
        </div>

        <div className="mt-12 space-y-8">
          {fields.map((field) => (
            <MedScholarField key={field.key} field={field} value={data.details[field.key]} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MedScholarField({ field, value }: { field: FieldDef; value?: string }) {
  if (!value?.trim()) return null;

  if (field.type === "textarea") {
    const lines = splitLines(value);
    const List = field.key === "publications" ? "ol" : "ul";
    return (
      <div className="border-t border-[#334155] pt-8">
        <h2 className="text-[10px] uppercase tracking-[0.2em] text-[#D4A574]">{field.label}</h2>
        <List className={`mt-4 space-y-3 text-sm text-[#CBD5E1] ${List === "ol" ? "list-decimal pl-5" : ""}`}>
          {lines.map((line) => (
            <li key={line} className="leading-relaxed">
              {line}
            </li>
          ))}
        </List>
      </div>
    );
  }

  return (
    <div className="border border-[#334155] p-5">
      <h2 className="text-[10px] uppercase tracking-[0.2em] text-[#D4A574]">{field.label}</h2>
      <p className="mt-3 text-sm leading-relaxed text-[#E2E8F0]">{value}</p>
    </div>
  );
}
