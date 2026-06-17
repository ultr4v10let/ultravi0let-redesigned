"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import {
  getHavenCart,
  getHavenUser,
  HAVEN_PRODUCT_MAP,
  setHavenCart,
} from "@/lib/demos/haven";

function groupCart(ids: string[]) {
  const counts: Record<string, number> = {};
  ids.forEach((id) => {
    counts[id] = (counts[id] ?? 0) + 1;
  });
  return counts;
}

export default function HavenCart() {
  const router = useRouter();
  const [cart, setCart] = useState<string[]>([]);
  const [checkedOut, setCheckedOut] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    setCart(getHavenCart());
    setSignedIn(!!getHavenUser());
    const sync = () => {
      setCart(getHavenCart());
      setSignedIn(!!getHavenUser());
    };
    window.addEventListener("haven-cart", sync);
    window.addEventListener("haven-auth", sync);
    return () => {
      window.removeEventListener("haven-cart", sync);
      window.removeEventListener("haven-auth", sync);
    };
  }, []);

  const grouped = groupCart(cart);
  const total = Object.entries(grouped).reduce(
    (sum, [id, qty]) => sum + (HAVEN_PRODUCT_MAP[id]?.price ?? 0) * qty,
    0
  );

  function updateQty(id: string, delta: number) {
    setCart((prev) => {
      let next: string[];
      if (delta > 0) {
        next = [...prev, id];
      } else {
        const idx = prev.indexOf(id);
        if (idx === -1) return prev;
        next = [...prev.slice(0, idx), ...prev.slice(idx + 1)];
      }
      setHavenCart(next);
      return next;
    });
  }

  function removeAll(id: string) {
    setCart((prev) => {
      const next = prev.filter((x) => x !== id);
      setHavenCart(next);
      return next;
    });
  }

  function checkout() {
    if (!signedIn) {
      router.push("/demos/haven/sign-in");
      return;
    }
    setCheckedOut(true);
    setHavenCart([]);
    setCart([]);
  }

  if (checkedOut) {
    return (
      <main className="mx-auto max-w-lg px-6 py-20 text-center">
        <h1
          className="text-3xl"
          style={{ fontFamily: "var(--hvn-display)" }}
        >
          Order placed
        </h1>
        <p className="mt-4 text-[#1C1917]/70">
          Thank you — this is a demo checkout. Your selections have been cleared.
        </p>
        <Link
          href="/demos/haven/account"
          className="mt-8 inline-block rounded-full bg-[#1C1917] px-6 py-3 text-sm text-white"
        >
          View account
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[900px] px-6 py-10 md:px-10 md:py-14">
      <Link
        href="/demos/haven"
        className="inline-flex items-center gap-2 text-sm text-[#1C1917]/60 hover:text-[#1C1917]"
      >
        <ArrowLeft size={14} />
        Continue shopping
      </Link>

      <h1
        className="mt-8 text-3xl"
        style={{ fontFamily: "var(--hvn-display)" }}
      >
        Your cart
      </h1>

      {!signedIn && Object.keys(grouped).length > 0 && (
        <p className="mt-4 rounded-xl border border-[#1C1917]/10 bg-white px-4 py-3 text-sm text-[#1C1917]/70">
          <Link href="/demos/haven/sign-in" className="font-medium underline-offset-2 hover:underline">
            Sign in
          </Link>{" "}
          to save your cart and complete checkout.
        </p>
      )}

      {Object.keys(grouped).length === 0 ? (
        <p className="mt-10 text-[#1C1917]/60">Your cart is empty.</p>
      ) : (
        <>
          <ul className="mt-10 divide-y divide-[#1C1917]/10">
            {Object.entries(grouped).map(([id, qty]) => {
              const p = HAVEN_PRODUCT_MAP[id];
              if (!p) return null;
              return (
                <li key={id} className="flex gap-5 py-6">
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-[#E7E5E4]">
                    <Image src={p.img} alt={p.name} fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between sm:flex-row sm:items-center">
                    <div>
                      <h2 className="font-medium">{p.name}</h2>
                      <p className="mt-1 tabular-nums text-[#1C1917]/65">
                        EGP {p.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center gap-4 sm:mt-0">
                      <div className="flex items-center gap-2 rounded-full border border-[#1C1917]/15">
                        <button
                          type="button"
                          onClick={() => updateQty(id, -1)}
                          className="p-2 hover:bg-[#1C1917]/5"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-6 text-center text-sm tabular-nums">{qty}</span>
                        <button
                          type="button"
                          onClick={() => updateQty(id, 1)}
                          className="p-2 hover:bg-[#1C1917]/5"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAll(id)}
                        className="text-[#1C1917]/45 hover:text-rose-600"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                      <span className="w-24 text-right font-medium tabular-nums">
                        EGP {(p.price * qty).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-10 rounded-2xl border border-[#1C1917]/10 bg-white p-6">
            <div className="flex justify-between text-lg font-medium">
              <span>Subtotal</span>
              <span className="tabular-nums">EGP {total.toLocaleString()}</span>
            </div>
            <p className="mt-2 text-xs text-[#1C1917]/55">
              Shipping and tax calculated at checkout (demo).
            </p>
            <button
              type="button"
              onClick={checkout}
              className="mt-6 w-full rounded-full bg-[#1C1917] py-3.5 text-sm font-medium text-white hover:bg-[#292524]"
            >
              {signedIn ? "Checkout" : "Sign in to checkout"}
            </button>
          </div>
        </>
      )}
    </main>
  );
}
