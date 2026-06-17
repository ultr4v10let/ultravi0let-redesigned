"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Lock, Mail } from "lucide-react";
import { getHavenUser, setHavenUser } from "@/lib/demos/haven";

export default function HavenSignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getHavenUser()) router.replace("/demos/haven/account");
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
      const name = email.split("@")[0].replace(/[._]/g, " ");
      setHavenUser({
        email,
        name: name.charAt(0).toUpperCase() + name.slice(1),
      });
      router.push("/demos/haven/account");
    }, 600);
  }

  return (
    <main className="mx-auto flex min-h-[calc(100svh-140px)] max-w-md flex-col justify-center px-6 py-16">
      <Link
        href="/demos/haven"
        className="mb-10 inline-flex items-center gap-2 text-sm text-[#1C1917]/60 hover:text-[#1C1917]"
      >
        <ArrowLeft size={14} />
        Back to shop
      </Link>

      <h1
        className="text-3xl"
        style={{ fontFamily: "var(--hvn-display)" }}
      >
        Sign in
      </h1>
      <p className="mt-2 text-sm text-[#1C1917]/65">
        Demo account — any email and password (4+ chars) will work.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-5">
        <div>
          <label className="text-[11px] uppercase tracking-[0.16em] text-[#1C1917]/55">
            Email
          </label>
          <div className="relative mt-2">
            <Mail
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1C1917]/40"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-[#1C1917]/15 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-[#1C1917]/35"
              autoComplete="email"
            />
          </div>
        </div>

        <div>
          <label className="text-[11px] uppercase tracking-[0.16em] text-[#1C1917]/55">
            Password
          </label>
          <div className="relative mt-2">
            <Lock
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1C1917]/40"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-[#1C1917]/15 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-[#1C1917]/35"
              autoComplete="current-password"
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-rose-600" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-[#1C1917] py-3.5 text-sm font-medium text-white hover:bg-[#292524] disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="mt-8 text-center text-xs text-[#1C1917]/50">
        No real authentication — this demonstrates the sign-in UX for the prototype.
      </p>
    </main>
  );
}
