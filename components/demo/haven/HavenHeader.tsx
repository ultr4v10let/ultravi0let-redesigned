"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getHavenCart, getHavenUser } from "@/lib/demos/haven";

export function HavenHeader() {
  const [cartCount, setCartCount] = useState(0);
  const [userName, setUserName] = useState<string | null>(null);

  function sync() {
    setCartCount(getHavenCart().length);
    setUserName(getHavenUser()?.name ?? null);
  }

  useEffect(() => {
    sync();
    window.addEventListener("haven-cart", sync);
    window.addEventListener("haven-auth", sync);
    return () => {
      window.removeEventListener("haven-cart", sync);
      window.removeEventListener("haven-auth", sync);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-[#1C1917]/10 bg-[#F7F5F2]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-4 md:px-10">
        <Link href="/demos/haven" className="flex items-center gap-2">
          <span
            className="text-2xl tracking-tight"
            style={{ fontFamily: "var(--hvn-display)" }}
          >
            Haven
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#1C1917]/50">
            Home
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm md:flex">
          {[
            { l: "Shop", h: "/demos/haven" },
            { l: "Living", h: "/demos/haven?cat=living" },
            { l: "Bedroom", h: "/demos/haven?cat=bedroom" },
            { l: "Office", h: "/demos/haven?cat=office" },
          ].map((i) => (
            <Link
              key={i.l}
              href={i.h}
              className="text-[#1C1917]/70 transition-colors hover:text-[#1C1917]"
            >
              {i.l}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          {userName ? (
            <Link
              href="/demos/haven/account"
              className="hidden items-center gap-2 rounded-full border border-[#1C1917]/15 bg-white px-3 py-2 text-sm sm:inline-flex"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1C1917] text-[10px] font-medium text-white">
                {userName.charAt(0).toUpperCase()}
              </span>
              Account
            </Link>
          ) : (
            <Link
              href="/demos/haven/sign-in"
              className="rounded-full border border-[#1C1917]/15 bg-white px-4 py-2 text-sm hover:border-[#1C1917]/30"
            >
              Sign in
            </Link>
          )}
          <Link
            href="/demos/haven/cart"
            className="inline-flex items-center gap-2 rounded-full border border-[#1C1917]/15 bg-white px-4 py-2 text-sm hover:border-[#1C1917]/30"
          >
            Cart
            {cartCount > 0 && (
              <span className="rounded-full bg-[#1C1917] px-1.5 py-0.5 text-[10px] font-medium text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
