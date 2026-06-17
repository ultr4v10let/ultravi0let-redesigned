"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut, Package, ShoppingBag } from "lucide-react";
import {
  getHavenCart,
  getHavenUser,
  HAVEN_PRODUCT_MAP,
  setHavenUser,
  type HavenUser,
} from "@/lib/demos/haven";

export default function HavenAccount() {
  const router = useRouter();
  const [user, setUser] = useState<HavenUser | null>(null);
  const [cartIds, setCartIds] = useState<string[]>([]);

  useEffect(() => {
    const u = getHavenUser();
    if (!u) {
      router.replace("/demos/haven/sign-in");
      return;
    }
    setUser(u);
    setCartIds(getHavenCart());
  }, [router]);

  function signOut() {
    setHavenUser(null);
    router.push("/demos/haven");
  }

  if (!user) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-[#1C1917]/55">
        Loading…
      </div>
    );
  }

  const savedItems = [...new Set(cartIds)]
    .map((id) => HAVEN_PRODUCT_MAP[id])
    .filter(Boolean);

  return (
    <main className="mx-auto max-w-[900px] px-6 py-12 md:px-10 md:py-16">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1C1917] text-xl font-medium text-white">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1
              className="text-2xl"
              style={{ fontFamily: "var(--hvn-display)" }}
            >
              {user.name}
            </h1>
            <p className="text-sm text-[#1C1917]/60">{user.email}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={signOut}
          className="inline-flex items-center gap-2 rounded-full border border-[#1C1917]/15 px-4 py-2 text-sm hover:bg-[#1C1917]/[0.03]"
        >
          <LogOut size={14} />
          Sign out
        </button>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-[#1C1917]/10 bg-white p-6">
          <div className="flex items-center gap-2 text-[#1C1917]/70">
            <ShoppingBag size={18} />
            <h2 className="font-semibold">Saved cart</h2>
          </div>
          {savedItems.length === 0 ? (
            <p className="mt-4 text-sm text-[#1C1917]/55">No items in your cart yet.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {savedItems.map((p) => (
                <li key={p.id} className="flex items-center gap-3">
                  <div className="relative h-12 w-10 shrink-0 overflow-hidden rounded-md bg-[#E7E5E4]">
                    <Image src={p.img} alt={p.name} fill className="object-cover" sizes="40px" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{p.name}</div>
                    <div className="text-xs text-[#1C1917]/55">
                      EGP {p.price.toLocaleString()}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <Link
            href="/demos/haven/cart"
            className="mt-5 inline-block text-sm text-[#1C1917] underline-offset-2 hover:underline"
          >
            View cart →
          </Link>
        </section>

        <section className="rounded-2xl border border-[#1C1917]/10 bg-white p-6">
          <div className="flex items-center gap-2 text-[#1C1917]/70">
            <Package size={18} />
            <h2 className="font-semibold">Order history</h2>
          </div>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex justify-between border-b border-[#1C1917]/8 pb-3">
              <span>HV-1042 · Oslo Linen Sofa</span>
              <span className="text-[#1C1917]/55">Delivered</span>
            </li>
            <li className="flex justify-between border-b border-[#1C1917]/8 pb-3">
              <span>HV-0988 · Halo Floor Lamp</span>
              <span className="text-[#1C1917]/55">Delivered</span>
            </li>
            <li className="flex justify-between text-[#1C1917]/55">
              <span>Demo orders for signed-in users</span>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
