import Link from "next/link";
import {
  ArrowRight,
  ChefHat,
  Factory,
  Package,
  Store,
  TrendingUp,
} from "lucide-react";

const kpis = [
  { label: "Units produced today", value: "2,840", delta: "+12%", icon: Factory },
  { label: "Shop orders pending", value: "18", delta: "3 urgent", icon: Store },
  { label: "SKUs below reorder", value: "7", delta: "Review", icon: Package },
  { label: "Weekly revenue", value: "EGP 186k", delta: "+8.4%", icon: TrendingUp },
];

const productionQueue = [
  { item: "Pistachio baklava tray", qty: 120, line: "Pastry A", status: "In progress" },
  { item: "Rosewater ma'amoul", qty: 400, line: "Pastry B", status: "Queued" },
  { item: "Chocolate éclair box", qty: 80, line: "Chocolat", status: "QC hold" },
];

const shopOrders = [
  { shop: "Marina Walk", items: 6, needed: "Today 16:00", priority: "High" },
  { shop: "City Walk", items: 4, needed: "Tomorrow 08:00", priority: "Normal" },
  { shop: "JBR Kiosk", items: 3, needed: "Today 18:00", priority: "High" },
];

export default function ZanobiaHome() {
  return (
    <main className="p-5 md:p-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8B5E4B]">
            Operations overview
          </div>
          <h1
            className="mt-2 text-[clamp(1.8rem,4vw,2.8rem)] leading-tight"
            style={{ fontFamily: "var(--zan-display)" }}
          >
            Factory &amp; retail, one system.
          </h1>
        </div>
        <div className="flex gap-2 text-sm">
          <Link
            href="/demos/zanobia/production"
            className="rounded-lg bg-[#8B5E4B] px-4 py-2 text-white hover:bg-[#6D4A3C]"
          >
            Production floor
          </Link>
          <Link
            href="/demos/zanobia/shops"
            className="rounded-lg border border-[#3D2A24]/15 px-4 py-2 hover:bg-[#3D2A24]/[0.03]"
          >
            Shop requisitions
          </Link>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="rounded-xl border border-[#3D2A24]/10 bg-[#FFFDF9] p-5"
          >
            <k.icon size={18} className="text-[#C9A87C]" />
            <div
              className="mt-4 text-2xl font-semibold tabular-nums md:text-3xl"
              style={{ fontFamily: "var(--zan-display)" }}
            >
              {k.value}
            </div>
            <div className="mt-1 text-xs text-[#3D2A24]/60">{k.label}</div>
            <div className="mt-2 text-[11px] font-medium text-[#8B5E4B]">{k.delta}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-[#3D2A24]/10 bg-[#FFFDF9]">
          <div className="flex items-center justify-between border-b border-[#3D2A24]/10 px-5 py-4">
            <div className="flex items-center gap-2">
              <ChefHat size={18} className="text-[#8B5E4B]" />
              <h2 className="font-semibold">Production queue</h2>
            </div>
            <Link href="/demos/zanobia/production" className="text-xs text-[#8B5E4B] hover:underline">
              View all
            </Link>
          </div>
          <ul className="divide-y divide-[#3D2A24]/8">
            {productionQueue.map((p) => (
              <li key={p.item} className="flex items-center justify-between gap-4 px-5 py-4 text-sm">
                <div>
                  <div className="font-medium">{p.item}</div>
                  <div className="text-xs text-[#3D2A24]/55">
                    {p.qty} units · {p.line}
                  </div>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] uppercase tracking-wide ${
                    p.status === "In progress"
                      ? "bg-[#C9A87C]/25 text-[#6D4A3C]"
                      : p.status === "QC hold"
                        ? "bg-rose-100 text-rose-800"
                        : "bg-[#3D2A24]/8 text-[#3D2A24]/70"
                  }`}
                >
                  {p.status}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-[#3D2A24]/10 bg-[#FFFDF9]">
          <div className="flex items-center justify-between border-b border-[#3D2A24]/10 px-5 py-4">
            <div className="flex items-center gap-2">
              <Store size={18} className="text-[#8B5E4B]" />
              <h2 className="font-semibold">Shop → factory orders</h2>
            </div>
            <Link href="/demos/zanobia/shops" className="text-xs text-[#8B5E4B] hover:underline">
              Fulfill
            </Link>
          </div>
          <ul className="divide-y divide-[#3D2A24]/8">
            {shopOrders.map((o) => (
              <li key={o.shop} className="flex items-center justify-between gap-4 px-5 py-4 text-sm">
                <div>
                  <div className="font-medium">{o.shop}</div>
                  <div className="text-xs text-[#3D2A24]/55">
                    {o.items} line items · needed {o.needed}
                  </div>
                </div>
                <span
                  className={`shrink-0 text-[10px] uppercase tracking-wide ${
                    o.priority === "High" ? "text-rose-700" : "text-[#3D2A24]/55"
                  }`}
                >
                  {o.priority}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-10 rounded-xl border border-[#3D2A24]/10 bg-[#8B5E4B] p-8 text-[#FBF6F0]">
        <h2 className="text-xl font-semibold">End-to-end patisserie operations</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#FBF6F0]/80">
          Inventory across factory and shops, production scheduling, shop requisitions
          to the factory floor, plus finance and HR in the admin module — built for a
          multi-site dessert business.
        </p>
        <Link
          href="/demos/zanobia/inventory"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#C9A87C] hover:text-[#E8D4B8]"
        >
          Explore inventory
          <ArrowRight size={14} />
        </Link>
      </section>
    </main>
  );
}
