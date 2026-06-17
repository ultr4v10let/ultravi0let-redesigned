import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Brain,
  Heart,
  Bone,
  Baby,
  Eye,
  Stethoscope,
  Star,
  ShieldCheck,
  Clock,
  Languages,
  MessageCircle,
  Phone,
  Video,
} from "lucide-react";

// Hero image: warm portrait of a clinician at a desk
const HERO =
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&q=80&auto=format";
// Photos used in the doctor grid
const DR_PHOTOS = [
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80&auto=format",
  "https://images.unsplash.com/photo-1612531386530-97286d97c2d2?w=600&q=80&auto=format",
  "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&q=80&auto=format",
];

const specialties = [
  { i: Stethoscope, n: "General medicine", c: "152", k: "doctors" },
  { i: Heart, n: "Cardiology", c: "38", k: "doctors" },
  { i: Brain, n: "Mental health", c: "67", k: "doctors" },
  { i: Bone, n: "Orthopaedics", c: "29", k: "doctors" },
  { i: Baby, n: "Paediatrics", c: "44", k: "doctors" },
  { i: Eye, n: "Ophthalmology", c: "21", k: "doctors" },
];

const FEATURED_DOCTORS = [
  {
    name: "Dr. Reem Al-Hashimi",
    speciality: "General medicine",
    img: DR_PHOTOS[0],
    quote:
      "Most of my consultations are quick: a fever, a question about a medication, a follow-up. Lumen lets me handle them in a clinic-free five minutes.",
    rating: 4.9,
    country: "UAE",
  },
  {
    name: "Dr. Priya Iyer",
    speciality: "Mental health",
    img: DR_PHOTOS[1],
    quote:
      "For mental-health support, getting through the door is half the work. The first time on a Lumen call is the first time a patient has spoken to anyone about it.",
    rating: 4.95,
    country: "Bahrain",
  },
  {
    name: "Dr. Amira Hassan",
    speciality: "Dermatology",
    img: DR_PHOTOS[2],
    quote:
      "I see lesions, rashes and acne all day. The image quality on Lumen is good enough that I can usually triage without an in-person visit at all.",
    rating: 4.85,
    country: "Qatar",
  },
];

export default function LumenHome() {
  return (
    <main>
      {/* HERO — editorial split layout, big portrait on the right */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-6 py-14 md:grid-cols-[1.05fr_1fr] md:gap-16 md:px-10 md:py-20 lg:py-24">
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#1F6B5C]">
              <span className="h-px w-8 bg-[#1F6B5C]" />
              Telemedicine for the GCC
            </div>
            <h1
              className="mt-8 text-[clamp(2.6rem,6vw,5.5rem)] leading-[1] tracking-tight"
              style={{ fontFamily: "var(--lumen-display)", color: "#0D2A26" }}
            >
              Care that travels at the speed of need.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-[#0D2A26]/75 md:text-lg">
              See a licensed clinician within minutes — by phone or video,
              in the language you&apos;re most comfortable in. From a sore
              throat at 2am to a second opinion before surgery.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/demos/lumen-health/doctors"
                className="inline-flex items-center gap-2 rounded-full bg-[#1F6B5C] px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#16544A]"
              >
                Find a doctor
                <ArrowRight size={16} />
              </Link>
              <Link
                href="#journey"
                className="inline-flex items-center gap-2 rounded-full border border-[#0D2A26]/15 px-6 py-3.5 text-sm font-medium text-[#0D2A26] transition-colors hover:border-[#0D2A26]/35 hover:bg-white/50"
              >
                How it works
              </Link>
            </div>

            {/* Modality chips */}
            <div className="mt-10 flex flex-wrap items-center gap-2">
              {[
                { i: MessageCircle, t: "Text · from EGP 80" },
                { i: Phone, t: "Voice · from EGP 100" },
                { i: Video, t: "Video · from EGP 120" },
              ].map((m) => (
                <div
                  key={m.t}
                  className="inline-flex items-center gap-2 rounded-full border border-[#0D2A26]/12 bg-white px-3.5 py-1.5 text-[12px] text-[#0D2A26]/75"
                >
                  <m.i size={13} className="text-[#1F6B5C]" />
                  {m.t}
                </div>
              ))}
            </div>
          </div>

          {/* Portrait */}
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-2 -z-10 rounded-[36px] bg-gradient-to-br from-[#7CA982]/45 to-[#1F6B5C]/30 blur-2xl"
            />
            <div className="relative overflow-hidden rounded-[28px] border border-[#0D2A26]/10 bg-white">
              <div className="relative aspect-[4/5]">
                <Image
                  src={HERO}
                  alt="A clinician at a consultation desk"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 540px, 100vw"
                  priority
                />
              </div>
              {/* Live consult floating tag */}
              <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/85 px-3 py-1.5 text-[11px] font-medium text-[#0D2A26] backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1F6B5C] opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1F6B5C]" />
                </span>
                4 doctors live · avg 4m
              </div>
              {/* Bottom card overlay */}
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/30 bg-white/90 p-4 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium text-white"
                    style={{
                      background: "linear-gradient(135deg,#1F6B5C,#7CA982)",
                    }}
                  >
                    RA
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[#0D2A26]">
                      Dr. Reem Al-Hashimi
                    </div>
                    <div className="text-[11px] text-[#0D2A26]/65">
                      General medicine · UAE · 4.9★
                    </div>
                  </div>
                  <Link
                    href="/demos/lumen-health/book"
                    className="rounded-full bg-[#1F6B5C] px-3.5 py-1.5 text-[11px] font-medium text-white hover:bg-[#16544A]"
                  >
                    Book now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="mx-auto max-w-[1320px] border-y border-[#0D2A26]/10 px-6 py-5 md:px-10">
          <ul className="grid grid-cols-1 gap-x-10 gap-y-3 text-sm md:grid-cols-3">
            {[
              { i: ShieldCheck, t: "Licensed by DHA, MOH KSA, NHRA" },
              { i: Clock, t: "Average call connect time: 4 minutes" },
              { i: Languages, t: "Arabic, English, Hindi, Urdu, Tagalog" },
            ].map((t) => (
              <li key={t.t} className="flex items-center gap-3 text-[#0D2A26]/75">
                <t.i size={15} className="text-[#1F6B5C]" strokeWidth={2} />
                {t.t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* JOURNEY — visual flow with photos */}
      <section id="journey" className="border-b border-[#0D2A26]/10 bg-white">
        <div className="mx-auto max-w-[1320px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid items-end gap-6 md:grid-cols-[1fr_auto] md:gap-12">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#1F6B5C]">
                The journey
              </div>
              <h2
                className="mt-3 text-[clamp(2rem,4vw,3.4rem)] leading-tight"
                style={{ fontFamily: "var(--lumen-display)" }}
              >
                Three minutes from sore throat
                <br />
                to prescription on the way.
              </h2>
            </div>
            <Link
              href="/demos/lumen-health/doctors"
              className="inline-flex items-center gap-2 self-end text-sm text-[#1F6B5C] hover:text-[#16544A]"
            >
              See available clinicians →
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                n: "01",
                t: "Tell us what's wrong",
                d: "Pick your concern. 30-second triage routes you to the right clinician — emergency, routine, or specialist.",
                img: "https://images.unsplash.com/photo-1591343395082-e120087004b4?w=800&q=80&auto=format",
              },
              {
                n: "02",
                t: "Connect in minutes",
                d: "Average 4-minute connect time. Talk by audio, video or chat — in the language you prefer.",
                img: "https://images.unsplash.com/photo-1593814681464-eef5b1eac2c1?w=800&q=80&auto=format",
              },
              {
                n: "03",
                t: "Prescription on the way",
                d: "E-prescriptions delivered to your pharmacy of choice. Follow-ups and referrals included.",
                img: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=800&q=80&auto=format",
              },
            ].map((s) => (
              <article
                key={s.n}
                className="group overflow-hidden rounded-3xl border border-[#0D2A26]/10 bg-[#F4F8F7]"
              >
                <div className="relative aspect-[5/3] overflow-hidden">
                  <Image
                    src={s.img}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 768px) 400px, 100vw"
                  />
                  <div className="absolute left-4 top-4 inline-flex h-9 items-center rounded-full bg-white/95 px-3 font-mono text-[11px] tracking-widest text-[#1F6B5C] backdrop-blur">
                    {s.n}
                  </div>
                </div>
                <div className="p-6 md:p-7">
                  <h3
                    className="text-2xl"
                    style={{ fontFamily: "var(--lumen-display)" }}
                  >
                    {s.t}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#0D2A26]/75">
                    {s.d}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIALTIES — denser horizontal pill list */}
      <section className="bg-[#0D2A26] text-white">
        <div className="mx-auto max-w-[1320px] px-6 py-20 md:px-10 md:py-24">
          <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#7CA982]">
                Specialties
              </div>
              <h2
                className="mt-3 text-[clamp(2rem,3.6vw,3rem)] leading-tight"
                style={{ fontFamily: "var(--lumen-display)" }}
              >
                Real specialists on call
                <br />
                across the Gulf.
              </h2>
              <p className="mt-5 max-w-md text-white/65">
                351 verified clinicians across nine specialties. Filter by
                language, country, insurance, and availability.
              </p>
              <Link
                href="/demos/lumen-health/doctors"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#0D2A26] hover:bg-[#7CA982] hover:text-white"
              >
                Browse all 351
                <ArrowRight size={14} />
              </Link>
            </div>

            <ul className="grid grid-cols-2 gap-3 self-end">
              {specialties.map((s) => (
                <li
                  key={s.n}
                  className="group flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.04] p-4 transition-colors hover:border-[#7CA982]/60 hover:bg-white/[0.08]"
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7CA982]/20 text-[#7CA982]"
                  >
                    <s.i size={18} strokeWidth={2} />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{s.n}</div>
                    <div className="text-[11px] text-white/55">
                      {s.c} {s.k}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* DOCTOR PORTRAITS — feature row */}
      <section className="border-b border-[#0D2A26]/10 bg-white">
        <div className="mx-auto max-w-[1320px] px-6 py-20 md:px-10 md:py-28">
          <div className="text-[11px] uppercase tracking-[0.22em] text-[#1F6B5C]">
            Our clinicians
          </div>
          <h2
            className="mt-3 text-[clamp(2rem,4vw,3.4rem)] leading-tight"
            style={{ fontFamily: "var(--lumen-display)" }}
          >
            Meet a few.
          </h2>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {FEATURED_DOCTORS.map((d) => (
              <figure
                key={d.name}
                className="overflow-hidden rounded-3xl border border-[#0D2A26]/10 bg-[#F4F8F7]"
              >
                <div className="relative aspect-[5/4] overflow-hidden">
                  <Image
                    src={d.img}
                    alt={d.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 400px, 100vw"
                  />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-[#1F6B5C] backdrop-blur">
                      <Star size={11} fill="currentColor" strokeWidth={0} />
                      {d.rating}
                    </div>
                    <div className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] text-[#0D2A26]/75 backdrop-blur">
                      {d.country}
                    </div>
                  </div>
                </div>
                <figcaption className="p-6 md:p-7">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[#1F6B5C]">
                    {d.speciality}
                  </div>
                  <h3
                    className="mt-1 text-xl"
                    style={{ fontFamily: "var(--lumen-display)" }}
                  >
                    {d.name}
                  </h3>
                  <blockquote className="mt-4 text-sm leading-relaxed text-[#0D2A26]/75">
                    &ldquo;{d.quote}&rdquo;
                  </blockquote>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* PULL QUOTE testimonial */}
      <section className="relative overflow-hidden bg-[#F4F8F7]">
        <div className="mx-auto grid max-w-[1320px] gap-10 px-6 py-20 md:grid-cols-[1.2fr_1fr] md:items-center md:px-10 md:py-28">
          <div>
            <div className="flex items-center gap-1 text-[#1F6B5C]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <blockquote
              className="mt-6 text-[clamp(1.6rem,3vw,2.6rem)] leading-tight"
              style={{ fontFamily: "var(--lumen-display)" }}
            >
              &ldquo;I was on hold with my insurer for an hour. With Lumen I
              had a paediatrician on video in three minutes and a prescription
              at our pharmacy before my husband finished parking the car.&rdquo;
            </blockquote>
            <div className="mt-8 text-sm uppercase tracking-[0.18em] text-[#1F6B5C]">
              Mona R. · Dubai · Lumen since 2023
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <Image
              src="https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80&auto=format"
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 768px) 480px, 100vw"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
