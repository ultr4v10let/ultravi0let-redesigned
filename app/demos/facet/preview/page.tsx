"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, ExternalLink, Pencil } from "lucide-react";
import { PortfolioPreview } from "@/components/demo/facet/PortfolioPreview";
import { getFacetPortfolio, getFacetUser, type FacetPortfolio } from "@/lib/demos/facet";
import { FACET_SHELL } from "@/lib/demos/facet-shell";

export default function FacetPreviewPage() {
  const router = useRouter();
  const [portfolio, setPortfolio] = useState<FacetPortfolio | null>(null);

  useEffect(() => {
    if (!getFacetUser()) {
      router.replace("/demos/facet/sign-in");
      return;
    }
    const p = getFacetPortfolio();
    if (!p) {
      router.replace("/demos/facet/dashboard");
      return;
    }
    setPortfolio(p);
  }, [router]);

  if (!portfolio) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sm" style={{ color: FACET_SHELL.inkMuted }}>
        Loading preview…
      </div>
    );
  }

  const slug = portfolio.name.toLowerCase().replace(/\s+/g, "-");

  return (
    <div>
      <div
        className="border-b px-6 py-3"
        style={{ borderColor: FACET_SHELL.border, background: FACET_SHELL.paperElevated }}
      >
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
          <Link
            href={`/demos/facet/build?field=${portfolio.field}`}
            className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-80"
            style={{ color: FACET_SHELL.accent }}
          >
            <ArrowLeft size={14} />
            Back to editor
          </Link>
          <span
            className="font-mono text-[10px] uppercase tracking-[0.18em]"
            style={{ color: FACET_SHELL.inkMuted, fontFamily: "var(--facet-mono)" }}
          >
            {slug}.facet.app
          </span>
          <Link
            href={`/demos/facet/build?field=${portfolio.field}`}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm"
            style={{ borderColor: FACET_SHELL.border, color: FACET_SHELL.ink }}
          >
            <Pencil size={14} />
            Edit
          </Link>
        </div>
      </div>

      <PortfolioPreview data={portfolio} />

      <div
        className="border-t px-6 py-8 text-center"
        style={{ borderColor: FACET_SHELL.border, background: FACET_SHELL.dark, color: FACET_SHELL.darkText }}
      >
        <p className="text-sm opacity-75">
          This is a demo portfolio — in production, Facet publishes to a shareable subdomain.
        </p>
        <button
          type="button"
          className="mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white"
          style={{ background: FACET_SHELL.accent }}
        >
          <ExternalLink size={14} />
          Publish (demo)
        </button>
      </div>
    </div>
  );
}
