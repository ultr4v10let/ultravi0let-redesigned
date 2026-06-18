"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { ArrowLeft, Eye, Save } from "lucide-react";
import { PortfolioPreview } from "@/components/demo/facet/PortfolioPreview";
import {
  createDefaultPortfolio,
  FACET_FIELD_CONFIG,
  FACET_THEMES,
  getFacetPortfolio,
  getFacetUser,
  setFacetPortfolio,
  type FacetField,
  type FacetPortfolio,
  type FacetTheme,
} from "@/lib/demos/facet";
import { FACET_SHELL } from "@/lib/demos/facet-shell";

const fieldInput =
  "mt-2 w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors focus:border-[#E07A5F] focus:ring-2 focus:ring-[#E07A5F]/15";

function FacetBuilder() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fieldParam = searchParams.get("field") as FacetField | null;

  const [portfolio, setPortfolio] = useState<FacetPortfolio | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const user = getFacetUser();
    if (!user) {
      router.replace("/demos/facet/sign-in");
      return;
    }
    if (!fieldParam || !FACET_FIELD_CONFIG[fieldParam]) {
      router.replace("/demos/facet/dashboard");
      return;
    }

    const existing = getFacetPortfolio();
    if (existing?.field === fieldParam) {
      setPortfolio(existing);
    } else {
      setPortfolio(createDefaultPortfolio(fieldParam, user.name));
    }
  }, [router, fieldParam]);

  if (!portfolio || !fieldParam) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sm" style={{ color: FACET_SHELL.inkMuted }}>
        Loading studio…
      </div>
    );
  }

  const config = FACET_FIELD_CONFIG[fieldParam];
  const themes = FACET_THEMES[fieldParam];

  function update<K extends keyof FacetPortfolio>(key: K, value: FacetPortfolio[K]) {
    setPortfolio((prev) => (prev ? { ...prev, [key]: value } : prev));
    setSaved(false);
  }

  function updateDetail(key: string, value: string) {
    setPortfolio((prev) =>
      prev ? { ...prev, details: { ...prev.details, [key]: value } } : prev
    );
    setSaved(false);
  }

  function save() {
    if (!portfolio) return;
    const next = { ...portfolio, updatedAt: new Date().toISOString() };
    setFacetPortfolio(next);
    setPortfolio(next);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="flex min-h-[calc(100svh-120px)] flex-col lg:flex-row">
      {/* Editor panel */}
      <aside
        className="relative flex w-full shrink-0 flex-col border-b lg:w-[420px] lg:max-h-[calc(100svh-120px)] lg:border-b-0 lg:border-r"
        style={{ borderColor: FACET_SHELL.border, background: FACET_SHELL.paperElevated }}
      >
        <div
          className="sticky top-0 z-10 shrink-0 border-b px-5 py-4"
          style={{ borderColor: FACET_SHELL.border, background: FACET_SHELL.paperElevated }}
        >
          <Link
            href="/demos/facet/dashboard"
            className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-80"
            style={{ color: FACET_SHELL.inkMuted }}
          >
            <ArrowLeft size={14} />
            Dashboard
          </Link>
          <h1 className="mt-3 text-lg font-semibold" style={{ color: FACET_SHELL.ink, fontFamily: "var(--facet-display)" }}>
            {config.label} builder
          </h1>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="space-y-8 p-5">
          {/* Theme picker */}
          <div>
            <label className="text-[11px] uppercase tracking-[0.16em]" style={{ color: FACET_SHELL.inkMuted, fontFamily: "var(--facet-mono)" }}>Template</label>
            <div className="mt-3 grid gap-2">
              {themes.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => update("theme", t.id as FacetTheme)}
                  className="flex items-center gap-3 rounded-xl border p-3 text-left transition-colors"
                  style={{
                    borderColor: portfolio.theme === t.id ? FACET_SHELL.accent : FACET_SHELL.border,
                    background: portfolio.theme === t.id ? `${FACET_SHELL.accent}12` : FACET_SHELL.paper,
                  }}
                >
                  <span
                    className="h-10 w-10 shrink-0 rounded-lg border"
                    style={{ background: t.preview, borderColor: FACET_SHELL.border }}
                  />
                  <div>
                    <div className="text-sm font-medium" style={{ color: FACET_SHELL.ink }}>{t.name}</div>
                    <div className="text-xs" style={{ color: FACET_SHELL.inkMuted }}>{t.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Core fields */}
          <div className="space-y-4">
            <div>
              <label className="text-[11px] uppercase tracking-[0.16em]" style={{ color: FACET_SHELL.inkMuted, fontFamily: "var(--facet-mono)" }}>Full name</label>
              <input
                value={portfolio.name}
                onChange={(e) => update("name", e.target.value)}
                className={fieldInput}
                style={{ borderColor: FACET_SHELL.border, background: FACET_SHELL.paper, color: FACET_SHELL.ink }}
              />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-[0.16em]" style={{ color: FACET_SHELL.inkMuted, fontFamily: "var(--facet-mono)" }}>Headline</label>
              <input
                value={portfolio.headline}
                onChange={(e) => update("headline", e.target.value)}
                className={fieldInput}
                style={{ borderColor: FACET_SHELL.border, background: FACET_SHELL.paper, color: FACET_SHELL.ink }}
              />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-[0.16em]" style={{ color: FACET_SHELL.inkMuted, fontFamily: "var(--facet-mono)" }}>Bio</label>
              <textarea
                value={portfolio.bio}
                onChange={(e) => update("bio", e.target.value)}
                rows={3}
                className={`${fieldInput} resize-none`}
                style={{ borderColor: FACET_SHELL.border, background: FACET_SHELL.paper, color: FACET_SHELL.ink }}
              />
            </div>
          </div>

          {/* Field-specific */}
          <div className="space-y-4 border-t pt-6" style={{ borderColor: FACET_SHELL.border }}>
            <p className="text-[11px] uppercase tracking-[0.16em]" style={{ color: FACET_SHELL.accent, fontFamily: "var(--facet-mono)" }}>{config.label} details</p>
            {config.fields.map((f) => (
              <div key={f.key}>
                <label className="text-[11px] uppercase tracking-[0.16em]" style={{ color: FACET_SHELL.inkMuted, fontFamily: "var(--facet-mono)" }}>{f.label}</label>
                {f.type === "textarea" ? (
                  <textarea
                    value={portfolio.details[f.key] ?? ""}
                    onChange={(e) => updateDetail(f.key, e.target.value)}
                    rows={4}
                    placeholder={f.placeholder}
                    className={`${fieldInput} resize-none`}
                    style={{ borderColor: FACET_SHELL.border, background: FACET_SHELL.paper, color: FACET_SHELL.ink }}
                  />
                ) : (
                  <input
                    value={portfolio.details[f.key] ?? ""}
                    onChange={(e) => updateDetail(f.key, e.target.value)}
                    placeholder={f.placeholder}
                    className={fieldInput}
                    style={{ borderColor: FACET_SHELL.border, background: FACET_SHELL.paper, color: FACET_SHELL.ink }}
                  />
                )}
              </div>
            ))}
          </div>
          </div>
        </div>

        {/* Action bar — pinned to sidebar bottom, never viewport-fixed */}
        <div
          className="z-20 flex shrink-0 gap-2 border-t p-4 backdrop-blur"
          style={{ borderColor: FACET_SHELL.border, background: `${FACET_SHELL.paperElevated}f2` }}
        >
          <button
            type="button"
            onClick={save}
            className="flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white"
            style={{ background: FACET_SHELL.accent }}
          >
            <Save size={16} />
            {saved ? "Saved" : "Save"}
          </button>
          <Link
            href="/demos/facet/preview"
            onClick={() => {
              if (portfolio) setFacetPortfolio({ ...portfolio, updatedAt: new Date().toISOString() });
            }}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border py-3 text-sm font-medium"
            style={{ borderColor: FACET_SHELL.border, color: FACET_SHELL.ink, background: FACET_SHELL.paper }}
          >
            <Eye size={16} />
            Full preview
          </Link>
        </div>
      </aside>

      <div className="min-w-0 flex-1 p-4 lg:p-8" style={{ background: "#D4CFC6" }}>
        <div
          className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em]"
          style={{ color: FACET_SHELL.inkMuted, fontFamily: "var(--facet-mono)" }}
        >
          Live preview
        </div>
        <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border shadow-2xl" style={{ borderColor: FACET_SHELL.border }}>
          <PortfolioPreview data={portfolio} />
        </div>
      </div>
    </div>
  );
}

export default function FacetBuildPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-sm">Loading…</div>}>
      <FacetBuilder />
    </Suspense>
  );
}
