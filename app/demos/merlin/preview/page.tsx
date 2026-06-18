import Link from "next/link";
import { ArrowLeft, Mail, MapPin } from "lucide-react";

const team = [
  { name: "Sara Al-Mansoori", role: "CEO & Co-founder", bio: "Former product lead at a regional fintech." },
  { name: "Omar Haddad", role: "CTO", bio: "Infrastructure engineer, 12 years across cloud and data." },
  { name: "Lina Farouk", role: "Head of Operations", bio: "Scaled two B2B SaaS teams from seed to Series B." },
  { name: "James Okonkwo", role: "Design Director", bio: "Brand systems for enterprise and consumer products." },
];

const testimonials = [
  {
    quote: "Merlin let us look like we'd been around for years — on day one of our fundraise.",
    author: "Nadia K., Founder",
  },
  {
    quote: "The team tab and testimonials module alone saved us three weeks of agency back-and-forth.",
    author: "Rami S., COO",
  },
];

const services = [
  { title: "Strategy", desc: "Market positioning, roadmap and go-to-market for early-stage products." },
  { title: "Engineering", desc: "Full-stack development with observability and security built in." },
  { title: "Design", desc: "Brand, product UI and design systems that scale with your team." },
];

export default function MerlinPreview() {
  return (
    <main className="bg-[#F4F6FB]">
      <div className="border-b border-[#0F1729]/10 bg-white px-6 py-3">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between">
          <Link href="/demos/merlin/editor" className="inline-flex items-center gap-2 text-sm text-[#3B5BDB] hover:text-[#2F4AC0]">
            <ArrowLeft size={14} />
            Back to editor
          </Link>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0F1729]/50">Preview · northline.merlin.app</span>
        </div>
      </div>

      <header className="border-b border-[#0F1729]/10 bg-white">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3B5BDB] text-sm font-bold text-white">N</div>
            <span className="text-lg font-semibold">Northline Ventures</span>
          </div>
          <nav className="hidden gap-8 text-sm text-[#0F1729]/75 md:flex">
            <a href="#team">Team</a>
            <a href="#services">Services</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <section className="border-b border-[#0F1729]/10 bg-white">
        <div className="mx-auto max-w-[1100px] px-6 py-20 md:py-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#3B5BDB]">Product studio · Dubai</p>
          <h1 className="mt-6 text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.05]" style={{ fontFamily: "var(--mly-display)" }}>
            Building the infrastructure behind <em className="text-[#3B5BDB]">tomorrow&apos;s products.</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[#0F1729]/70">
            We partner with founders to design, engineer and ship software that lasts — from first prototype to production scale.
          </p>
          <a href="#contact" className="mt-10 inline-flex rounded-lg bg-[#3B5BDB] px-6 py-3 text-sm font-medium text-white">
            Start a conversation
          </a>
        </div>
      </section>

      <section id="team" className="border-b border-[#0F1729]/10">
        <div className="mx-auto max-w-[1100px] px-6 py-20">
          <h2 className="text-3xl font-semibold">Team structure</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {team.map((m) => (
              <div key={m.name} className="rounded-xl border border-[#0F1729]/10 bg-white p-6">
                <div className="h-14 w-14 rounded-full bg-[#74C0FC]/40" />
                <h3 className="mt-4 text-lg font-semibold">{m.name}</h3>
                <p className="text-sm text-[#3B5BDB]">{m.role}</p>
                <p className="mt-2 text-sm text-[#0F1729]/65">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="border-b border-[#0F1729]/10 bg-white">
        <div className="mx-auto max-w-[1100px] px-6 py-20">
          <h2 className="text-3xl font-semibold">Services</h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-[#0F1729]/10 bg-[#0F1729]/10 md:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="bg-[#F4F6FB] p-8">
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="mt-3 text-sm text-[#0F1729]/70">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="border-b border-[#0F1729]/10">
        <div className="mx-auto max-w-[1100px] px-6 py-20">
          <h2 className="text-3xl font-semibold">Testimonials</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {testimonials.map((t) => (
              <blockquote key={t.author} className="rounded-xl border border-[#0F1729]/10 bg-white p-8">
                <p className="text-lg italic leading-relaxed text-[#0F1729]/80">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-4 text-sm text-[#0F1729]/55">{t.author}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#0F1729] text-white">
        <div className="mx-auto max-w-[1100px] px-6 py-20">
          <h2 className="text-3xl font-semibold">Contact</h2>
          <div className="mt-8 flex flex-col gap-4 text-[#F4F6FB]/80">
            <div className="flex items-center gap-3">
              <Mail size={18} />
              hello@northline.demo
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={18} />
              Dubai Design District, UAE
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
