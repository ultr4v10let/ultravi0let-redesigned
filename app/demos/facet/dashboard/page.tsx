"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, LogOut, Pencil } from "lucide-react";
import {
  createDefaultPortfolio,
  FACET_FIELDS,
  FACET_THEMES,
  getFacetPortfolio,
  getFacetUser,
  setFacetPortfolio,
  setFacetUser,
  type FacetField,
  type FacetUser,
} from "@/lib/demos/facet";
import { FACET_SHELL } from "@/lib/demos/facet-shell";

export default function FacetDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<FacetUser | null>(null);
  const [portfolioField, setPortfolioField] = useState<FacetField | null>(null);

  useEffect(() => {
    const u = getFacetUser();
    if (!u) {
      router.replace("/demos/facet/sign-in");
      return;
    }
    setUser(u);
    setPortfolioField(getFacetPortfolio()?.field ?? null);
  }, [router]);

  function signOut() {
    setFacetUser(null);
    setFacetPortfolio(null);
    router.push("/demos/facet");
  }

  function startField(field: FacetField) {
    if (!user) return;
    const existing = getFacetPortfolio();
    if (existing?.field === field) {
      router.push(`/demos/facet/build?field=${field}`);
      return;
    }
    setFacetPortfolio(createDefaultPortfolio(field, user.name));
    router.push(`/demos/facet/build?field=${field}`);
  }

  if (!user) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm" style={{ color: FACET_SHELL.inkMuted }}>
        Loading…
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-[1100px] px-6 py-12 md:px-10 md:py-16">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p
            className="font-mono text-[10px] uppercase tracking-[0.2em]"
            style={{ color: FACET_SHELL.sage, fontFamily: "var(--facet-mono)" }}
          >
            Your studio
          </p>
          <h1
            className="mt-2 text-3xl"
            style={{ fontFamily: "var(--facet-display)", color: FACET_SHELL.ink }}
          >
            Welcome, {user.name.split(" ")[0]}.
          </h1>
          <p className="mt-2 text-sm" style={{ color: FACET_SHELL.inkMuted }}>
            {user.email}
          </p>
        </div>
        <button
          type="button"
          onClick={signOut}
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm"
          style={{ borderColor: FACET_SHELL.border, color: FACET_SHELL.ink }}
        >
          <LogOut size={14} />
          Sign out
        </button>
      </div>

      {portfolioField && (
        <div
          className="mt-10 flex flex-col gap-4 rounded-2xl border p-6 sm:flex-row sm:items-center sm:justify-between"
          style={{
            borderColor: `${FACET_SHELL.accent}44`,
            background: `${FACET_SHELL.accent}12`,
          }}
        >
          <div>
            <p className="text-sm font-semibold" style={{ color: FACET_SHELL.ink }}>
              Continue your draft
            </p>
            <p className="mt-1 text-sm" style={{ color: FACET_SHELL.inkMuted }}>
              {FACET_FIELDS.find((f) => f.id === portfolioField)?.label} ·{" "}
              {FACET_THEMES[portfolioField].find((t) => t.id === getFacetPortfolio()?.theme)?.name} template
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/demos/facet/preview"
              className="rounded-full border px-4 py-2 text-sm"
              style={{
                borderColor: FACET_SHELL.border,
                background: FACET_SHELL.paperElevated,
                color: FACET_SHELL.ink,
              }}
            >
              Preview
            </Link>
            <Link
              href={`/demos/facet/build?field=${portfolioField}`}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white"
              style={{ background: FACET_SHELL.ink }}
            >
              <Pencil size={14} />
              Edit
            </Link>
          </div>
        </div>
      )}

      <h2 className="mt-14 text-xl font-semibold" style={{ color: FACET_SHELL.ink }}>
        Choose a field
      </h2>
      <p className="mt-2 text-sm" style={{ color: FACET_SHELL.inkMuted }}>
        Each field includes tailored prompts and two visual templates.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {FACET_FIELDS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => startField(f.id)}
            className="group rounded-2xl border p-6 text-left transition-all hover:shadow-lg"
            style={{
              borderColor: FACET_SHELL.border,
              background: FACET_SHELL.paperElevated,
            }}
          >
            <div
              className="flex h-11 w-11 items-center justify-center rounded-lg text-base font-bold text-white"
              style={{ background: f.accent, fontFamily: "var(--facet-mono)" }}
            >
              {f.icon}
            </div>
            <h3 className="mt-5 text-lg font-semibold" style={{ color: FACET_SHELL.ink }}>
              {f.label}
            </h3>
            <p className="mt-2 text-sm" style={{ color: FACET_SHELL.inkMuted }}>
              {f.desc}
            </p>
            <div className="mt-4 flex gap-2">
              {FACET_THEMES[f.id].map((t) => (
                <span
                  key={t.id}
                  className="h-6 w-6 rounded-full border"
                  style={{ background: t.preview, borderColor: FACET_SHELL.border }}
                  title={t.name}
                />
              ))}
            </div>
            <span
              className="mt-6 inline-flex items-center gap-1 text-sm font-semibold transition-all group-hover:gap-2"
              style={{ color: FACET_SHELL.accent }}
            >
              Open builder
              <ArrowRight size={14} />
            </span>
          </button>
        ))}
      </div>
    </main>
  );
}
