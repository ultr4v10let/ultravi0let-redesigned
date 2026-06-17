"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Eye, Image as ImageIcon, LayoutGrid, MessageSquareQuote, Palette, Users } from "lucide-react";

const THEMES = [
  { id: "aurora", name: "Aurora", primary: "#3B5BDB", accent: "#74C0FC", bg: "#F4F6FB" },
  { id: "ember", name: "Ember", primary: "#C2410C", accent: "#FDBA74", bg: "#FFF7ED" },
  { id: "forest", name: "Forest", primary: "#166534", accent: "#86EFAC", bg: "#F0FDF4" },
  { id: "slate", name: "Slate", primary: "#1E293B", accent: "#94A3B8", bg: "#F8FAFC" },
];

const TABS = [
  { id: "team", label: "Team structure", icon: Users, enabled: true },
  { id: "testimonials", label: "Testimonials", icon: MessageSquareQuote, enabled: true },
  { id: "services", label: "Services", icon: LayoutGrid, enabled: true },
  { id: "gallery", label: "Gallery", icon: ImageIcon, enabled: false },
];

export default function MarlyinEditor() {
  const [themeId, setThemeId] = useState("aurora");
  const [company, setCompany] = useState("Northline Ventures");
  const [tagline, setTagline] = useState("Building the infrastructure behind tomorrow's products.");
  const [tabs, setTabs] = useState(TABS);

  const theme = THEMES.find((t) => t.id === themeId) ?? THEMES[0];

  function toggleTab(id: string) {
    setTabs((prev) => prev.map((t) => (t.id === id ? { ...t, enabled: !t.enabled } : t)));
  }

  return (
    <main className="min-h-[calc(100svh-120px)]">
      <div className="mx-auto grid max-w-[1400px] gap-0 lg:grid-cols-[380px_1fr]">
        {/* Sidebar controls */}
        <aside className="border-b border-[#0F1729]/10 bg-white p-6 lg:border-b-0 lg:border-r lg:min-h-[calc(100svh-120px)]">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#3B5BDB]">Site editor</div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">Configure your site</h1>

          <div className="mt-8 space-y-8">
            <div>
              <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#0F1729]/60">
                <Palette size={12} />
                Theme
              </label>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setThemeId(t.id)}
                    className={`flex items-center gap-2 rounded-lg border p-3 text-left text-sm transition-colors ${
                      themeId === t.id ? "border-[#3B5BDB] bg-[#3B5BDB]/5" : "border-[#0F1729]/10 hover:border-[#0F1729]/20"
                    }`}
                  >
                    <span className="h-4 w-4 shrink-0 rounded-full" style={{ background: t.primary }} />
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-[0.16em] text-[#0F1729]/60">Company name</label>
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="mt-2 w-full rounded-lg border border-[#0F1729]/15 bg-[#F4F6FB] px-3 py-2.5 text-sm outline-none focus:border-[#3B5BDB]"
              />
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-[0.16em] text-[#0F1729]/60">Tagline</label>
              <textarea
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                rows={2}
                className="mt-2 w-full resize-none rounded-lg border border-[#0F1729]/15 bg-[#F4F6FB] px-3 py-2.5 text-sm outline-none focus:border-[#3B5BDB]"
              />
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-[0.16em] text-[#0F1729]/60">Logo</label>
              <div className="mt-2 flex items-center justify-center rounded-lg border border-dashed border-[#0F1729]/20 bg-[#F4F6FB] px-4 py-8 text-center">
                <div>
                  <ImageIcon size={20} className="mx-auto text-[#0F1729]/40" />
                  <p className="mt-2 text-xs text-[#0F1729]/55">Drop SVG or PNG · 512×512 recommended</p>
                  <button type="button" className="mt-3 rounded-md border border-[#0F1729]/15 px-3 py-1.5 text-xs hover:bg-white">
                    Upload logo
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-[0.16em] text-[#0F1729]/60">Content tabs</label>
              <ul className="mt-3 space-y-2">
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <button
                      type="button"
                      onClick={() => toggleTab(tab.id)}
                      className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors ${
                        tab.enabled ? "border-[#3B5BDB]/30 bg-[#3B5BDB]/5" : "border-[#0F1729]/10 opacity-60"
                      }`}
                    >
                      <tab.icon size={16} className="text-[#0F1729]/60" />
                      <span className="flex-1">{tab.label}</span>
                      {tab.enabled && <Check size={14} className="text-[#3B5BDB]" />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-2">
            <Link
              href="/demos/merlin/preview"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#3B5BDB] px-4 py-3 text-sm font-medium text-white hover:bg-[#2F4AC0]"
            >
              <Eye size={16} />
              Open full preview
            </Link>
            <button type="button" className="rounded-lg border border-[#0F1729]/15 px-4 py-3 text-sm font-medium hover:bg-[#0F1729]/[0.03]">
              Publish site
            </button>
          </div>
        </aside>

        {/* Live mini-preview */}
        <div className="p-6 lg:p-10" style={{ background: theme.bg }}>
          <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#0F1729]/50">Live preview</div>
          <div
            className="overflow-hidden rounded-2xl border border-[#0F1729]/10 bg-white shadow-xl"
            style={{ borderTopColor: theme.primary, borderTopWidth: 4 }}
          >
            <div className="flex items-center justify-between border-b border-[#0F1729]/8 px-6 py-4">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold text-white"
                  style={{ background: theme.primary }}
                >
                  {company.charAt(0)}
                </div>
                <span className="font-semibold">{company}</span>
              </div>
              <nav className="hidden gap-5 text-sm text-[#0F1729]/70 md:flex">
                {tabs
                  .filter((t) => t.enabled)
                  .map((t) => (
                    <span key={t.id}>{t.label.split(" ")[0]}</span>
                  ))}
                <span>Contact</span>
              </nav>
            </div>

            <div className="px-6 py-12 md:px-12 md:py-16">
              <h2
                className="text-[clamp(1.8rem,4vw,3rem)] leading-tight"
                style={{ fontFamily: "var(--mly-display)", color: theme.primary }}
              >
                {company}
              </h2>
              <p className="mt-4 max-w-lg text-[#0F1729]/70">{tagline}</p>
              <button
                type="button"
                className="mt-8 rounded-lg px-5 py-2.5 text-sm font-medium text-white"
                style={{ background: theme.primary }}
              >
                Get in touch
              </button>
            </div>

            {tabs.find((t) => t.id === "team")?.enabled && (
              <div className="border-t border-[#0F1729]/8 px-6 py-10 md:px-12">
                <h3 className="text-lg font-semibold">Team</h3>
                <div className="mt-6 grid grid-cols-3 gap-4">
                  {["CEO", "CTO", "Head of Ops"].map((role) => (
                    <div key={role} className="rounded-lg bg-[#F4F6FB] p-4 text-center">
                      <div className="mx-auto h-12 w-12 rounded-full" style={{ background: `${theme.accent}55` }} />
                      <div className="mt-3 text-sm font-medium">{role}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tabs.find((t) => t.id === "testimonials")?.enabled && (
              <div className="border-t border-[#0F1729]/8 bg-[#F4F6FB]/50 px-6 py-10 md:px-12">
                <h3 className="text-lg font-semibold">Testimonials</h3>
                <blockquote className="mt-4 text-sm italic text-[#0F1729]/75">
                  &ldquo;We went from zero to a polished company presence in a single afternoon.&rdquo;
                </blockquote>
                <div className="mt-2 text-xs text-[#0F1729]/55">— Early adopter, Series A</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
