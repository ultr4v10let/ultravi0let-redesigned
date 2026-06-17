import { Building2, CreditCard, Users } from "lucide-react";

const modules = [
  {
    icon: CreditCard,
    title: "Finance",
    items: ["P&L by shop", "Payables & receivables", "Cost per batch", "Monthly close"],
    stat: "EGP 186k",
    statLabel: "Revenue this week",
  },
  {
    icon: Users,
    title: "Human resources",
    items: ["Shift scheduling", "Factory & shop staff", "Leave requests", "Payroll export"],
    stat: "84",
    statLabel: "Active employees",
  },
  {
    icon: Building2,
    title: "Administration",
    items: ["Multi-site permissions", "Supplier contracts", "Audit logs", "Document vault"],
    stat: "5",
    statLabel: "Sites connected",
  },
];

export default function ZanobiaAdmin() {
  return (
    <main className="p-5 md:p-8">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8B5E4B]">
        Back office
      </div>
      <h1
        className="mt-2 text-3xl font-semibold"
        style={{ fontFamily: "var(--zan-display)" }}
      >
        Finance, HR &amp; administration
      </h1>
      <p className="mt-2 max-w-xl text-sm text-[#3D2A24]/70">
        Central office tools for a patisserie group — permissions, payroll,
        financial reporting and supplier management in one admin console.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {modules.map((m) => (
          <div
            key={m.title}
            className="rounded-xl border border-[#3D2A24]/10 bg-[#FFFDF9] p-6"
          >
            <m.icon size={22} className="text-[#C9A87C]" />
            <h2 className="mt-4 text-xl font-semibold">{m.title}</h2>
            <div
              className="mt-2 text-2xl font-semibold"
              style={{ fontFamily: "var(--zan-display)" }}
            >
              {m.stat}
            </div>
            <div className="text-xs text-[#3D2A24]/55">{m.statLabel}</div>
            <ul className="mt-6 space-y-2 text-sm text-[#3D2A24]/75">
              {m.items.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-[#C9A87C]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
