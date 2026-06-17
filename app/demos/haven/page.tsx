"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState, useEffect, Suspense } from "react";
import { Search, ShoppingBag, SlidersHorizontal } from "lucide-react";
import { HAVEN_PRODUCTS, getHavenCart, setHavenCart } from "@/lib/demos/haven";

const PRODUCTS = HAVEN_PRODUCTS;

type SortKey = "price-asc" | "price-desc" | "name";

function HavenShop() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat");

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [material, setMaterial] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("name");
  const [cart, setCart] = useState<string[]>([]);

  useEffect(() => {
    if (catParam) setCategory(catParam);
  }, [catParam]);

  useEffect(() => {
    setCart(getHavenCart());
    const sync = () => setCart(getHavenCart());
    window.addEventListener("haven-cart", sync);
    return () => window.removeEventListener("haven-cart", sync);
  }, []);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      const matchQuery =
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.material.toLowerCase().includes(query.toLowerCase());
      const matchCat = category === "all" || p.cat === category;
      const matchMat = material === "all" || p.material === material;
      return matchQuery && matchCat && matchMat;
    });
    list = [...list].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return a.name.localeCompare(b.name);
    });
    return list;
  }, [query, category, material, sort]);

  function addToCart(id: string) {
    setCart((prev) => {
      const next = [...prev, id];
      setHavenCart(next);
      return next;
    });
  }

  const materials = [...new Set(PRODUCTS.map((p) => p.material))];

  return (
    <main>
      <section className="border-b border-[#1C1917]/10 bg-white">
        <div className="mx-auto max-w-[1320px] px-6 py-16 md:px-10 md:py-20">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#78716C]">
            Furniture &amp; living
          </p>
          <h1
            className="mt-4 text-[clamp(2.2rem,5vw,4rem)] leading-tight"
            style={{ fontFamily: "var(--hvn-display)" }}
          >
            Pieces that stay.
          </h1>
          <p className="mt-4 max-w-lg text-[#1C1917]/70">
            Curated furniture with search, filters and sorting — built for
            catalogues where discovery matters.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1320px] px-6 py-10 md:px-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative max-w-md flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1C1917]/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search furniture…"
              className="w-full rounded-full border border-[#1C1917]/15 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#1C1917]/30"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-[#1C1917]/55">
              <SlidersHorizontal size={14} />
              Filters
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-full border border-[#1C1917]/15 bg-white px-4 py-2 text-sm outline-none"
            >
              <option value="all">All rooms</option>
              <option value="living">Living</option>
              <option value="bedroom">Bedroom</option>
              <option value="office">Office</option>
            </select>
            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="rounded-full border border-[#1C1917]/15 bg-white px-4 py-2 text-sm outline-none"
            >
              <option value="all">All materials</option>
              {materials.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-full border border-[#1C1917]/15 bg-white px-4 py-2 text-sm outline-none"
            >
              <option value="name">Sort: Name</option>
              <option value="price-asc">Price: Low to high</option>
              <option value="price-desc">Price: High to low</option>
            </select>
            {cart.length > 0 && (
              <Link
                href="/demos/haven/cart"
                className="rounded-full bg-[#1C1917] px-4 py-2 text-sm text-white"
              >
                Cart ({cart.length})
              </Link>
            )}
          </div>
        </div>

        <p className="mt-6 text-sm text-[#1C1917]/55">
          {filtered.length} product{filtered.length !== 1 ? "s" : ""}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <article
              key={p.id}
              className="group overflow-hidden rounded-2xl border border-[#1C1917]/10 bg-white transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#E7E5E4]">
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1280px) 300px, 50vw"
                />
              </div>
              <div className="p-5">
                <div className="text-[10px] uppercase tracking-[0.16em] text-[#78716C]">
                  {p.cat} · {p.material}
                </div>
                <h2
                  className="mt-1 text-lg"
                  style={{ fontFamily: "var(--hvn-display)" }}
                >
                  {p.name}
                </h2>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-medium tabular-nums">
                    EGP {p.price.toLocaleString()}
                  </span>
                  <button
                    type="button"
                    onClick={() => addToCart(p.id)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#1C1917]/15 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-[#1C1917] hover:text-white"
                  >
                    <ShoppingBag size={12} />
                    Add
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-[#1C1917]/55">
            No products match your filters.
          </p>
        )}
      </div>
    </main>
  );
}

export default function HavenHome() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-sm">Loading…</div>}>
      <HavenShop />
    </Suspense>
  );
}
