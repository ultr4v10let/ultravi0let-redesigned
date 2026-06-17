import Link from "next/link";
import { ArrowRight, LayoutTemplate, Palette, PanelsTopLeft, Rocket, Users } from "lucide-react";

const features = [
  {
    icon: Palette,
    title: "Themes & brand kit",
    desc: "Pick a base theme, set primary and accent colours, upload a logo — every surface updates instantly.",
  },
  {
    icon: PanelsTopLeft,
    title: "Modular tabs",
    desc: "Toggle sections for team structure, testimonials, services, contact and more. Reorder with drag-and-drop.",
  },
  {
    icon: LayoutTemplate,
    title: "Live preview",
    desc: "See exactly what visitors will get. Desktop and mobile breakpoints, shareable preview links.",
  },
  {
    icon: Rocket,
    title: "Publish in one click",
    desc: "Custom subdomain or bring your own domain. SSL, CDN and analytics included.",
  },
];

const themes = [
  { name: "Aurora", colors: ["#3B5BDB", "#74C0FC", "#F4F6FB"] },
  { name: "Ember", colors: ["#C2410C", "#FDBA74", "#FFF7ED"] },
  { name: "Forest", colors: ["#166534", "#86EFAC", "#F0FDF4"] },
  { name: "Slate", colors: ["#1E293B", "#94A3B8", "#F8FAFC"] },
];

export default function MarlyinHome() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-[#0F1729]/10">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full opacity-30 blur-[100px]"
          style={{ background: "#3B5BDB" }}
        />
        <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-10 md:py-28">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#3B5BDB]">
            Website builder · for teams who need to ship
          </div>
          <h1 className="mt-6 text-[clamp(2.4rem,6vw,5rem)] leading-[1.02] tracking-tight" style={{ fontFamily: "var(--mly-display)" }}>
            Your company site,
            <br />
            <em className="text-[#3B5BDB]">ready before lunch.</em>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-[#0F1729]/75 md:text-lg">
            Merlin lets clients configure themes, colours, logos and content tabs — team, testimonials, services — without touching code.
            Onboard fast, present professionally, iterate in minutes.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/demos/merlin/editor"
              className="inline-flex items-center gap-2 rounded-lg bg-[#3B5BDB] px-6 py-3.5 text-sm font-medium text-white hover:bg-[#2F4AC0]"
            >
              Try the editor
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/demos/merlin/preview"
              className="inline-flex items-center gap-2 rounded-lg border border-[#0F1729]/15 px-6 py-3.5 text-sm font-medium hover:bg-[#0F1729]/[0.03]"
            >
              View live preview
            </Link>
          </div>

          <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[#0F1729]/10 bg-[#0F1729]/10 md:grid-cols-4">
            {[
              { v: "< 4h", k: "Average time to publish" },
              { v: "12", k: "Starter themes" },
              { v: "6", k: "Content modules" },
              { v: "99.9%", k: "Uptime SLA" },
            ].map((s) => (
              <div key={s.k} className="bg-[#F4F6FB] p-6">
                <div className="text-3xl font-medium md:text-4xl" style={{ fontFamily: "var(--mly-display)" }}>
                  {s.v}
                </div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.18em] text-[#0F1729]/60">{s.k}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="platform" className="border-b border-[#0F1729]/10">
        <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-10 md:py-28">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#3B5BDB]">Platform</div>
          <h2 className="mt-3 text-[clamp(2rem,4vw,3.4rem)] leading-tight" style={{ fontFamily: "var(--mly-display)" }}>
            Everything a new company needs to look established.
          </h2>
          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-[#0F1729]/10 bg-[#0F1729]/10 md:grid-cols-2">
            {features.map((f) => (
              <div key={f.title} className="bg-[#F4F6FB] p-8 md:p-10">
                <f.icon size={22} strokeWidth={1.5} className="text-[#3B5BDB]" />
                <h3 className="mt-6 text-2xl" style={{ fontFamily: "var(--mly-display)" }}>
                  {f.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#0F1729]/70">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-10 md:py-28">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#3B5BDB]">Theme library</div>
              <h2 className="mt-3 text-[clamp(2rem,4vw,3rem)] leading-tight" style={{ fontFamily: "var(--mly-display)" }}>
                Start with a palette, make it yours.
              </h2>
            </div>
            <Link href="/demos/merlin/editor" className="inline-flex items-center gap-2 text-sm text-[#3B5BDB] hover:text-[#2F4AC0]">
              Customise in editor
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {themes.map((t) => (
              <div
                key={t.name}
                className="overflow-hidden rounded-xl border border-[#0F1729]/10 bg-[#F4F6FB] p-4 transition-transform hover:-translate-y-1"
              >
                <div className="flex gap-1.5">
                  {t.colors.map((c) => (
                    <div key={c} className="h-8 flex-1 rounded-md" style={{ background: c }} />
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <Users size={14} className="text-[#0F1729]/50" />
                  <span className="text-sm font-medium">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
