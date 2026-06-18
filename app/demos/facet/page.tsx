import Link from "next/link";
import { ArrowRight, Layers, LayoutTemplate, PenLine, Sparkles } from "lucide-react";
import { FACET_FIELDS } from "@/lib/demos/facet";
import { FACET_SHELL } from "@/lib/demos/facet-shell";

const steps = [
  { icon: PenLine, title: "Sign in", desc: "Create your studio account — demo auth, no backend required." },
  { icon: Layers, title: "Pick your field", desc: "CS, architecture or medical — each with tailored prompts." },
  { icon: LayoutTemplate, title: "Choose a template", desc: "Two distinct themes per field — fonts, layout and tone." },
  { icon: Sparkles, title: "Publish", desc: "Fill your details, preview live, share your portfolio link." },
];

export default function FacetHome() {
  return (
    <main>
      <section className="relative overflow-hidden border-b" style={{ borderColor: FACET_SHELL.border }}>
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 top-0 h-[480px] w-[480px] rounded-full opacity-25 blur-[100px]"
          style={{ background: FACET_SHELL.accent }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 bottom-0 h-[360px] w-[360px] rounded-full opacity-20 blur-[90px]"
          style={{ background: FACET_SHELL.sage }}
        />
        <div className="mx-auto max-w-[1320px] px-6 py-20 md:px-10 md:py-28">
          <div
            className="font-mono text-[11px] uppercase tracking-[0.22em]"
            style={{ color: FACET_SHELL.sage, fontFamily: "var(--facet-mono)" }}
          >
            Portfolio builder · field-aware
          </div>
          <h1
            className="mt-6 max-w-4xl text-[clamp(2.4rem,6vw,5.2rem)] leading-[1.05] tracking-tight"
            style={{ fontFamily: "var(--facet-display)", color: FACET_SHELL.ink }}
          >
            Your profession has a shape.
            <br />
            <em style={{ color: FACET_SHELL.accent }}>Facet finds it.</em>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed md:text-lg" style={{ color: FACET_SHELL.inkMuted }}>
            Field-specific portfolio templates for computer science, architecture and medicine.
            Sign in, pick your discipline, choose between two themes, and publish a portfolio
            that asks the right questions — GitHub or Behance, certificates or case studies.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/demos/facet/sign-in"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: FACET_SHELL.accent }}
            >
              Start building
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/demos/facet/dashboard"
              className="inline-flex items-center gap-2 rounded-full border px-6 py-3.5 text-sm font-medium transition-colors"
              style={{
                borderColor: FACET_SHELL.border,
                color: FACET_SHELL.ink,
                background: FACET_SHELL.paperElevated,
              }}
            >
              Open studio
            </Link>
          </div>

          <div
            className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border md:grid-cols-4"
            style={{ borderColor: FACET_SHELL.border, background: FACET_SHELL.border }}
          >
            {[
              { v: "3", k: "Professional fields" },
              { v: "6", k: "Templates total" },
              { v: "2", k: "Themes per field" },
              { v: "< 10m", k: "Time to publish" },
            ].map((s) => (
              <div key={s.k} className="p-6" style={{ background: FACET_SHELL.paperElevated }}>
                <div
                  className="text-3xl font-bold md:text-4xl"
                  style={{ fontFamily: "var(--facet-display)", color: FACET_SHELL.ink }}
                >
                  {s.v}
                </div>
                <div
                  className="mt-2 text-[10px] uppercase tracking-[0.18em]"
                  style={{ color: FACET_SHELL.inkMuted, fontFamily: "var(--facet-mono)" }}
                >
                  {s.k}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="fields" className="border-b" style={{ borderColor: FACET_SHELL.border, background: FACET_SHELL.paperElevated }}>
        <div className="mx-auto max-w-[1320px] px-6 py-20 md:px-10 md:py-28">
          <div
            className="font-mono text-[11px] uppercase tracking-[0.22em]"
            style={{ color: FACET_SHELL.accent, fontFamily: "var(--facet-mono)" }}
          >
            Fields
          </div>
          <h2
            className="mt-3 text-[clamp(2rem,4vw,3.4rem)] leading-tight"
            style={{ fontFamily: "var(--facet-display)", color: FACET_SHELL.ink }}
          >
            Templates that speak your language.
          </h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {FACET_FIELDS.map((f) => (
              <div
                key={f.id}
                className="group rounded-2xl border p-8 transition-all hover:shadow-lg"
                style={{
                  borderColor: FACET_SHELL.border,
                  background: FACET_SHELL.paper,
                }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold text-white"
                  style={{ background: f.accent, fontFamily: "var(--facet-mono)" }}
                >
                  {f.icon}
                </div>
                <h3 className="mt-6 text-xl font-semibold" style={{ color: FACET_SHELL.ink }}>
                  {f.label}
                </h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: FACET_SHELL.inkMuted }}>
                  {f.desc}
                </p>
                <Link
                  href={`/demos/facet/sign-in?field=${f.id}`}
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold transition-colors hover:opacity-80"
                  style={{ color: FACET_SHELL.accent }}
                >
                  Build this field
                  <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" style={{ background: FACET_SHELL.dark, color: FACET_SHELL.darkText }}>
        <div className="mx-auto max-w-[1320px] px-6 py-20 md:px-10 md:py-28">
          <div
            className="font-mono text-[11px] uppercase tracking-[0.22em]"
            style={{ color: FACET_SHELL.darkAccent, fontFamily: "var(--facet-mono)" }}
          >
            How it works
          </div>
          <h2
            className="mt-3 text-[clamp(2rem,4vw,3.2rem)] leading-tight"
            style={{ fontFamily: "var(--facet-display)" }}
          >
            From sign-in to shareable portfolio.
          </h2>
          <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="rounded-xl border p-6"
                style={{ borderColor: "rgba(247,244,239,0.12)", background: "rgba(247,244,239,0.04)" }}
              >
                <div className="font-mono text-[10px]" style={{ color: FACET_SHELL.sage, fontFamily: "var(--facet-mono)" }}>
                  0{i + 1}
                </div>
                <s.icon size={22} className="mt-4" style={{ color: FACET_SHELL.darkAccent }} strokeWidth={1.5} />
                <h3 className="mt-4 font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed opacity-75">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
