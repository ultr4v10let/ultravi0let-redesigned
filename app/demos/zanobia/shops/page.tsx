"use client";

import { useState } from "react";
import { ArrowRight, Check, Store } from "lucide-react";

const ORDERS = [
  {
    id: "REQ-2401",
    shop: "Marina Walk",
    needed: "Today · 16:00",
    priority: "high",
    items: [
      { name: "Baklava tray", qty: 12 },
      { name: "Mini éclair dozen", qty: 8 },
      { name: "Rosewater ma'amoul box", qty: 6 },
    ],
  },
  {
    id: "REQ-2402",
    shop: "City Walk",
    needed: "Tomorrow · 08:00",
    priority: "normal",
    items: [
      { name: "Kunafa cups", qty: 20 },
      { name: "Truffle assortment", qty: 10 },
    ],
  },
  {
    id: "REQ-2403",
    shop: "JBR Kiosk",
    needed: "Today · 18:00",
    priority: "high",
    items: [
      { name: "Chocolate éclair box", qty: 15 },
      { name: "Pistachio baklava tray", qty: 6 },
    ],
  },
];

export default function ZanobiaShops() {
  const [fulfilled, setFulfilled] = useState<string[]>([]);

  function fulfill(id: string) {
    setFulfilled((prev) => [...prev, id]);
  }

  return (
    <main className="p-5 md:p-8">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8B5E4B]">
        Shop requisitions
      </div>
      <h1
        className="mt-2 text-3xl font-semibold"
        style={{ fontFamily: "var(--zan-display)" }}
      >
        Orders from retail → factory
      </h1>
      <p className="mt-2 max-w-xl text-sm text-[#3D2A24]/70">
        Each shop submits what it needs from central production. Factory fulfils,
        dispatches and updates inventory automatically.
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {ORDERS.map((order) => {
          const done = fulfilled.includes(order.id);
          return (
            <article
              key={order.id}
              className={`rounded-xl border bg-[#FFFDF9] p-5 transition-opacity ${
                done ? "border-emerald-200 opacity-75" : "border-[#3D2A24]/10"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Store size={18} className="text-[#8B5E4B]" />
                  <div>
                    <div className="font-semibold">{order.shop}</div>
                    <div className="font-mono text-[10px] text-[#3D2A24]/55">{order.id}</div>
                  </div>
                </div>
                <span
                  className={`text-[10px] uppercase tracking-wide ${
                    order.priority === "high" ? "text-rose-700" : "text-[#3D2A24]/55"
                  }`}
                >
                  {order.priority}
                </span>
              </div>
              <div className="mt-3 text-xs text-[#3D2A24]/60">Needed {order.needed}</div>
              <ul className="mt-4 space-y-2 border-t border-[#3D2A24]/8 pt-4 text-sm">
                {order.items.map((item) => (
                  <li key={item.name} className="flex justify-between">
                    <span>{item.name}</span>
                    <span className="tabular-nums text-[#3D2A24]/65">×{item.qty}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                disabled={done}
                onClick={() => fulfill(order.id)}
                className={`mt-5 flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium ${
                  done
                    ? "bg-emerald-50 text-emerald-800"
                    : "bg-[#8B5E4B] text-white hover:bg-[#6D4A3C]"
                }`}
              >
                {done ? (
                  <>
                    <Check size={16} />
                    Dispatched
                  </>
                ) : (
                  <>
                    Send to production
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </article>
          );
        })}
      </div>
    </main>
  );
}
