"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Brain,
  Bone,
  Eye,
  Heart,
  Languages,
  MapPin,
  Search,
  Sparkles,
  Star,
  Stethoscope,
  Video,
} from "lucide-react";

const doctors = [
  {
    id: "reem",
    name: "Dr. Reem Al-Hashimi",
    speciality: "General medicine",
    country: "UAE",
    languages: ["Arabic", "English"],
    rating: 4.9,
    reviews: 1284,
    fee: "AED 120",
    avail: "now",
    icon: Stethoscope,
    bio: "Family physician with a decade of experience. Special interest in cardiovascular prevention and women's health.",
  },
  {
    id: "mostafa",
    name: "Dr. Mostafa Khaled",
    speciality: "Paediatrics",
    country: "KSA",
    languages: ["Arabic", "English"],
    rating: 4.8,
    reviews: 906,
    fee: "SAR 130",
    avail: "12m",
    icon: Heart,
    bio: "Paediatrician at King Faisal Specialist Hospital. Newborn care, respiratory, allergies.",
  },
  {
    id: "priya",
    name: "Dr. Priya Iyer",
    speciality: "Mental health",
    country: "Bahrain",
    languages: ["English", "Hindi", "Tamil"],
    rating: 4.95,
    reviews: 612,
    fee: "BHD 18",
    avail: "now",
    icon: Brain,
    bio: "Psychiatrist focusing on anxiety, mood disorders and grief counselling. CBT and EMDR trained.",
  },
  {
    id: "khalid",
    name: "Dr. Khalid Al-Mansoori",
    speciality: "Orthopaedics",
    country: "UAE",
    languages: ["Arabic", "English"],
    rating: 4.7,
    reviews: 421,
    fee: "AED 240",
    avail: "40m",
    icon: Bone,
    bio: "Consultant orthopaedic surgeon — sports injuries, joint preservation and post-op rehab guidance.",
  },
  {
    id: "amira",
    name: "Dr. Amira Hassan",
    speciality: "Dermatology",
    country: "Qatar",
    languages: ["Arabic", "English", "French"],
    rating: 4.85,
    reviews: 778,
    fee: "QAR 200",
    avail: "now",
    icon: Sparkles,
    bio: "Dermatologist treating acne, eczema, pigmentation and cosmetic concerns. AI-assisted lesion review.",
  },
  {
    id: "samir",
    name: "Dr. Samir El-Gohary",
    speciality: "Ophthalmology",
    country: "UAE",
    languages: ["Arabic", "English"],
    rating: 4.6,
    reviews: 287,
    fee: "AED 220",
    avail: "1h",
    icon: Eye,
    bio: "Retinal specialist. Diabetic retinopathy, AMD and complex anterior segment cases.",
  },
];

const specialities = [
  "All specialities",
  "General medicine",
  "Paediatrics",
  "Mental health",
  "Orthopaedics",
  "Dermatology",
  "Ophthalmology",
];
const countries = ["All countries", "UAE", "KSA", "Bahrain", "Qatar"];
const languages = ["Any language", "Arabic", "English", "Hindi", "Tamil", "French"];

export default function FindDoctor() {
  const [q, setQ] = useState("");
  const [spec, setSpec] = useState(specialities[0]);
  const [country, setCountry] = useState(countries[0]);
  const [lang, setLang] = useState(languages[0]);
  const [onlyAvail, setOnlyAvail] = useState(false);

  const filtered = useMemo(() => {
    return doctors.filter((d) => {
      if (q && !`${d.name} ${d.speciality}`.toLowerCase().includes(q.toLowerCase()))
        return false;
      if (spec !== "All specialities" && d.speciality !== spec) return false;
      if (country !== "All countries" && d.country !== country) return false;
      if (lang !== "Any language" && !d.languages.includes(lang)) return false;
      if (onlyAvail && d.avail !== "now") return false;
      return true;
    });
  }, [q, spec, country, lang, onlyAvail]);

  return (
    <main className="mx-auto max-w-[1240px] px-6 py-12 md:px-10 md:py-16">
      <div className="text-[11px] uppercase tracking-[0.22em] text-[#1F6B5C]">
        Find a doctor
      </div>
      <h1
        className="mt-3 text-[clamp(2rem,4.4vw,3.6rem)] leading-[1.05]"
        style={{ fontFamily: "var(--lumen-display)" }}
      >
        351 clinicians.
        <br />
        Available in minutes.
      </h1>

      {/* Filter bar */}
      <div className="mt-10 grid grid-cols-1 gap-3 rounded-2xl border border-[#0D2A26]/10 bg-white p-3 md:grid-cols-[1.4fr_1fr_1fr_1fr_auto] md:p-4">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0D2A26]/45"
          />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or condition"
            className="w-full rounded-xl border border-[#0D2A26]/10 bg-[#F4F8F7] py-2.5 pl-9 pr-3 text-sm outline-none transition-colors focus:border-[#1F6B5C]"
          />
        </div>
        <Select value={spec} onChange={setSpec} options={specialities} />
        <Select value={country} onChange={setCountry} options={countries} />
        <Select value={lang} onChange={setLang} options={languages} />
        <button
          onClick={() => setOnlyAvail(!onlyAvail)}
          className={`rounded-xl border px-4 py-2.5 text-sm transition-colors ${
            onlyAvail
              ? "border-[#1F6B5C] bg-[#1F6B5C] text-white"
              : "border-[#0D2A26]/15 hover:border-[#0D2A26]/30"
          }`}
        >
          Live only
        </button>
      </div>

      {/* Result count */}
      <div className="mt-6 text-sm text-[#0D2A26]/65">
        Showing <span className="font-medium text-[#0D2A26]">{filtered.length}</span>{" "}
        of {doctors.length} clinicians
      </div>

      {/* Cards */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {filtered.map((d) => (
          <DoctorCard key={d.id} d={d} />
        ))}
        {filtered.length === 0 && (
          <div className="md:col-span-2 rounded-2xl border border-dashed border-[#0D2A26]/15 bg-white p-10 text-center text-sm text-[#0D2A26]/60">
            No clinicians match your filters. Try widening the search.
          </div>
        )}
      </div>
    </main>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-xl border border-[#0D2A26]/10 bg-[#F4F8F7] px-3 py-2.5 text-sm text-[#0D2A26] outline-none transition-colors focus:border-[#1F6B5C]"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

function DoctorCard({ d }: { d: (typeof doctors)[number] }) {
  return (
    <article className="group flex flex-col gap-5 rounded-2xl border border-[#0D2A26]/10 bg-white p-6 transition-colors hover:border-[#1F6B5C]/40">
      <div className="flex items-start gap-4">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl text-white"
          style={{ background: "linear-gradient(135deg,#1F6B5C,#7CA982)" }}
        >
          <d.icon size={22} strokeWidth={1.9} />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3
                className="text-xl"
                style={{ fontFamily: "var(--lumen-display)" }}
              >
                {d.name}
              </h3>
              <div className="mt-0.5 text-[12px] text-[#0D2A26]/65">
                {d.speciality} · {d.country}
              </div>
            </div>
            {d.avail === "now" ? (
              <span className="flex items-center gap-1.5 rounded-full bg-[#E5F0ED] px-2.5 py-1 text-[11px] font-medium text-[#1F6B5C]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1F6B5C] animate-pulse" />
                Available now
              </span>
            ) : (
              <span className="rounded-full bg-[#0D2A26]/[0.06] px-2.5 py-1 text-[11px] text-[#0D2A26]/75">
                In {d.avail}
              </span>
            )}
          </div>

          <div className="mt-2 flex items-center gap-3 text-[12px] text-[#0D2A26]/65">
            <span className="flex items-center gap-1 text-[#1F6B5C]">
              <Star size={12} fill="currentColor" strokeWidth={0} />
              {d.rating}
            </span>
            <span className="text-[#0D2A26]/40">·</span>
            <span>{d.reviews} reviews</span>
          </div>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-[#0D2A26]/75">{d.bio}</p>

      <div className="flex items-center justify-between gap-3 border-t border-[#0D2A26]/8 pt-4">
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#0D2A26]/65">
          <Languages size={13} />
          {d.languages.join(" · ")}
          <span className="mx-1.5 text-[#0D2A26]/25">|</span>
          <MapPin size={13} />
          {d.country}
        </div>
        <Link
          href={`/demos/lumen-health/book?d=${d.id}`}
          className="inline-flex items-center gap-2 rounded-full bg-[#1F6B5C] px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-[#16544A]"
        >
          <Video size={14} />
          {d.fee}
        </Link>
      </div>
    </article>
  );
}
