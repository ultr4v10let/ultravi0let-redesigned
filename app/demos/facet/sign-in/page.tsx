"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { ArrowLeft, Lock, Mail } from "lucide-react";
import { getFacetUser, setFacetUser } from "@/lib/demos/facet";
import { FACET_SHELL } from "@/lib/demos/facet-shell";

const inputClass =
  "w-full rounded-xl border py-3 pl-10 pr-4 text-sm outline-none transition-colors focus:ring-2 focus:ring-[#E07A5F]/20";

function FacetSignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const field = searchParams.get("field");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getFacetUser()) router.replace("/demos/facet/dashboard");
  }, [router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const name = email
        .split("@")[0]
        .replace(/[._]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      setFacetUser({ email, name });
      const dest = field
        ? `/demos/facet/build?field=${field}`
        : "/demos/facet/dashboard";
      router.push(dest);
    }, 500);
  }

  return (
    <main className="mx-auto flex min-h-[calc(100svh-140px)] max-w-md flex-col justify-center px-6 py-16">
      <Link
        href="/demos/facet"
        className="mb-10 inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-80"
        style={{ color: FACET_SHELL.inkMuted }}
      >
        <ArrowLeft size={14} />
        Back
      </Link>

      <h1
        className="text-3xl"
        style={{ fontFamily: "var(--facet-display)", color: FACET_SHELL.ink }}
      >
        Sign in to Facet
      </h1>
      <p className="mt-2 text-sm" style={{ color: FACET_SHELL.inkMuted }}>
        Demo account — any email and password (4+ chars) works.
        {field && ` You'll start building your ${field} portfolio next.`}
      </p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-5">
        <div>
          <label
            className="text-[11px] uppercase tracking-[0.16em]"
            style={{ color: FACET_SHELL.inkMuted, fontFamily: "var(--facet-mono)" }}
          >
            Email
          </label>
          <div className="relative mt-2">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={`${inputClass} focus:border-[#E07A5F]`}
              style={{
                borderColor: FACET_SHELL.border,
                background: FACET_SHELL.paperElevated,
                color: FACET_SHELL.ink,
              }}
            />
          </div>
        </div>
        <div>
          <label
            className="text-[11px] uppercase tracking-[0.16em]"
            style={{ color: FACET_SHELL.inkMuted, fontFamily: "var(--facet-mono)" }}
          >
            Password
          </label>
          <div className="relative mt-2">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`${inputClass} focus:border-[#E07A5F]`}
              style={{
                borderColor: FACET_SHELL.border,
                background: FACET_SHELL.paperElevated,
                color: FACET_SHELL.ink,
              }}
            />
          </div>
        </div>
        {error && <p className="text-sm text-rose-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{ background: FACET_SHELL.accent }}
        >
          {loading ? "Signing in…" : "Continue to studio"}
        </button>
      </form>
    </main>
  );
}

export default function FacetSignIn() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-sm">Loading…</div>}>
      <FacetSignInForm />
    </Suspense>
  );
}
