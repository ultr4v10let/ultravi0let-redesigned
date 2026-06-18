"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getFacetPortfolio, getFacetUser } from "@/lib/demos/facet";
import { FACET_SHELL } from "@/lib/demos/facet-shell";

export function FacetHeader() {
  const [userName, setUserName] = useState<string | null>(null);
  const [hasPortfolio, setHasPortfolio] = useState(false);

  function sync() {
    setUserName(getFacetUser()?.name ?? null);
    setHasPortfolio(!!getFacetPortfolio());
  }

  useEffect(() => {
    sync();
    window.addEventListener("facet-auth", sync);
    window.addEventListener("facet-portfolio", sync);
    return () => {
      window.removeEventListener("facet-auth", sync);
      window.removeEventListener("facet-portfolio", sync);
    };
  }, []);

  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur-xl"
      style={{
        borderColor: FACET_SHELL.border,
        background: `${FACET_SHELL.paperElevated}e6`,
      }}
    >
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-4 md:px-10">
        <Link href="/demos/facet" className="flex items-center gap-2.5">
          <FacetMark />
          <span
            className="text-xl font-semibold tracking-tight lowercase"
            style={{ fontFamily: "var(--facet-display)", color: FACET_SHELL.ink }}
          >
            facet
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm md:flex">
          {[
            { l: "Fields", h: "/demos/facet#fields" },
            { l: "How it works", h: "/demos/facet#how" },
            ...(userName ? [{ l: "Dashboard", h: "/demos/facet/dashboard" }] : []),
          ].map((i) => (
            <Link
              key={i.l}
              href={i.h}
              className="transition-colors hover:opacity-100"
              style={{ color: `${FACET_SHELL.ink}B3` }}
            >
              {i.l}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          {userName ? (
            <>
              {hasPortfolio && (
                <Link
                  href="/demos/facet/preview"
                  className="hidden rounded-full border px-4 py-2 text-sm sm:inline-flex"
                  style={{
                    borderColor: FACET_SHELL.border,
                    background: FACET_SHELL.paperElevated,
                    color: FACET_SHELL.ink,
                  }}
                >
                  Preview
                </Link>
              )}
              <Link
                href="/demos/facet/dashboard"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white"
                style={{ background: FACET_SHELL.ink }}
              >
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-medium"
                  style={{ background: `${FACET_SHELL.sage}55`, color: FACET_SHELL.darkText }}
                >
                  {userName.charAt(0).toUpperCase()}
                </span>
                Studio
              </Link>
            </>
          ) : (
            <Link
              href="/demos/facet/sign-in"
              className="rounded-full px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
              style={{ background: FACET_SHELL.accent }}
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

function FacetMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden>
      <rect x="2" y="2" width="11" height="11" rx="2" fill={FACET_SHELL.accent} opacity="0.95" />
      <rect x="15" y="2" width="11" height="11" rx="2" fill={FACET_SHELL.sage} opacity="0.85" />
      <rect x="2" y="15" width="11" height="11" rx="2" fill={FACET_SHELL.sage} opacity="0.5" />
      <rect x="15" y="15" width="11" height="11" rx="2" fill={FACET_SHELL.accent} opacity="0.35" />
    </svg>
  );
}
