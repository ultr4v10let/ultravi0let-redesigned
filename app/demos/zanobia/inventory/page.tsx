"use client";

import { useState } from "react";
import { AlertTriangle, Package, Search } from "lucide-react";

const ITEMS = [
  { sku: "FLR-001", name: "Premium pastry flour", loc: "Factory · Dry store", qty: 420, unit: "kg", reorder: 200, status: "ok" },
  { sku: "PST-014", name: "Pistachio paste", loc: "Factory · Cold room", qty: 38, unit: "kg", reorder: 50, status: "low" },
  { sku: "CHC-008", name: "Couverture 70%", loc: "Factory · Chocolat", qty: 92, unit: "kg", reorder: 40, status: "ok" },
  { sku: "BOX-022", name: "Éclair gift box", loc: "Factory · Packaging", qty: 180, unit: "pcs", reorder: 300, status: "low" },
  { sku: "DSR-101", name: "Baklava tray (retail)", loc: "Marina Walk shop", qty: 24, unit: "pcs", reorder: 15, status: "ok" },
  { sku: "DSR-088", name: "Ma'amoul assortment", loc: "City Walk shop", qty: 8, unit: "pcs", reorder: 20, status: "critical" },
  { sku: "DSR-112", name: "Mini éclair dozen", loc: "JBR Kiosk", qty: 31, unit: "pcs", reorder: 18, status: "ok" },
];

export default function ZanobiaInventory() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "low">("all");

  const filtered = ITEMS.filter((i) => {
    const matchQuery =
      i.name.toLowerCase().includes(query.toLowerCase()) ||
      i.sku.toLowerCase().includes(query.toLowerCase());
    const matchFilter =
      filter === "all" || i.status === "low" || i.status === "critical";
    return matchQuery && matchFilter;
  });

  return (
    <main className="p-5 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8B5E4B]">
            Inventory
          </div>
          <h1
            className="mt-2 text-3xl font-semibold"
            style={{ fontFamily: "var(--zan-display)" }}
          >
            Stock across factory &amp; shops
          </h1>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`rounded-lg px-3 py-1.5 text-sm ${
              filter === "all" ? "bg-[#8B5E4B] text-white" : "border border-[#3D2A24]/15"
            }`}
          >
            All items
          </button>
          <button
            type="button"
            onClick={() => setFilter("low")}
            className={`rounded-lg px-3 py-1.5 text-sm ${
              filter === "low" ? "bg-[#8B5E4B] text-white" : "border border-[#3D2A24]/15"
            }`}
          >
            Below reorder
          </button>
        </div>
      </div>

      <div className="relative mt-8 max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3D2A24]/40" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search SKU or ingredient…"
          className="w-full rounded-lg border border-[#3D2A24]/15 bg-[#FFFDF9] py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#8B5E4B]"
        />
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-[#3D2A24]/10 bg-[#FFFDF9]">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[#3D2A24]/10 bg-[#FBF6F0] text-[11px] uppercase tracking-[0.14em] text-[#3D2A24]/60">
            <tr>
              <th className="px-5 py-3 font-medium">SKU</th>
              <th className="px-5 py-3 font-medium">Item</th>
              <th className="hidden px-5 py-3 font-medium md:table-cell">Location</th>
              <th className="px-5 py-3 font-medium text-right">Qty</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#3D2A24]/8">
            {filtered.map((i) => (
              <tr key={i.sku} className="hover:bg-[#FBF6F0]/50">
                <td className="px-5 py-4 font-mono text-xs">{i.sku}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Package size={14} className="text-[#C9A87C]" />
                    {i.name}
                  </div>
                </td>
                <td className="hidden px-5 py-4 text-[#3D2A24]/65 md:table-cell">{i.loc}</td>
                <td className="px-5 py-4 text-right tabular-nums">
                  {i.qty} {i.unit}
                </td>
                <td className="px-5 py-4">
                  {i.status === "ok" ? (
                    <span className="text-xs text-emerald-700">OK</span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-rose-700">
                      <AlertTriangle size={12} />
                      {i.status === "critical" ? "Critical" : "Low"}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
