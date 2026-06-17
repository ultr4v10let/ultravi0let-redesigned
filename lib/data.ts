import {
  Code2,
  Palette,
  Cloud,
  ShieldCheck,
  Workflow,
  Compass,
  Sparkles,
  LifeBuoy,
} from "lucide-react";

export const services = [
  {
    n: "01",
    icon: Palette,
    title: "Interface Design",
    blurb:
      "Editorial-grade UI/UX systems engineered to convert. We treat every pixel like it has rent to pay.",
    keywords: ["Brand", "Product", "Motion"],
  },
  {
    n: "02",
    icon: Code2,
    title: "Engineering",
    blurb:
      "Type-safe, performant web and mobile applications built on modern stacks — Next.js, React Native, Go, Rust.",
    keywords: ["Web", "Mobile", "API"],
  },
  {
    n: "03",
    icon: Cloud,
    title: "Cloud & Infra",
    blurb:
      "Scalable AWS, GCP, and bare-metal deployments with observability baked in from day zero.",
    keywords: ["AWS", "GCP", "DevOps"],
  },
  {
    n: "04",
    icon: Compass,
    title: "Architecture",
    blurb:
      "Systems design for products that need to survive their first ten thousand users — and the next ten million.",
    keywords: ["Systems", "DDD", "Scale"],
  },
  {
    n: "05",
    icon: ShieldCheck,
    title: "Security",
    blurb:
      "Threat modeling, pen-testing, SOC-2 readiness. Sleep at night knowing the locks actually work.",
    keywords: ["Audit", "Pen-test", "SOC-2"],
  },
  {
    n: "06",
    icon: Workflow,
    title: "Integrations",
    blurb:
      "Stripe, Twilio, AI providers, ERPs, custom protocols. We make foreign systems feel native.",
    keywords: ["Stripe", "AI", "ERP"],
  },
  {
    n: "07",
    icon: Sparkles,
    title: "AI Engineering",
    blurb:
      "Production LLM pipelines, RAG, evaluations and guardrails — not demos, real systems that ship.",
    keywords: ["LLM", "RAG", "Eval"],
  },
  {
    n: "08",
    icon: LifeBuoy,
    title: "24/7 Support",
    blurb:
      "Real humans, real timezones, real SLAs. We're awake while your competition is sleeping.",
    keywords: ["SLA", "On-call", "Care"],
  },
];

export const projects = [
  {
    name: "Lumen Health",
    category: "Healthcare · iOS + Web",
    year: "2024",
    blurb:
      "End-to-end telemedicine platform serving four MENA markets. HIPAA-aligned, sub-second clinic search.",
    accent: "from-violet-500 to-fuchsia-500",
    href: "#",
    stats: [
      { k: "DAU", v: "42k" },
      { k: "p95", v: "180ms" },
    ],
  },
  {
    name: "AG Law",
    category: "Legal Tech · Web",
    year: "2024",
    blurb:
      "Practice management suite for one of Egypt's largest law firms. Document AI, billing, and a client portal.",
    accent: "from-amber-300 to-rose-400",
    href: "#",
    stats: [
      { k: "Cases", v: "11k+" },
      { k: "Uptime", v: "99.98%" },
    ],
  },
  {
    name: "Circle of Trust",
    category: "FinTech · Web + Mobile",
    year: "2023",
    blurb:
      "Group-savings and rotating-credit platform. KYC, ledger, payouts — built on a custom double-entry engine.",
    accent: "from-cyan-300 to-violet-500",
    href: "#",
    stats: [
      { k: "GMV", v: "$8.4M" },
      { k: "Markets", v: "3" },
    ],
  },
  {
    name: "Connect 6",
    category: "SaaS · Web",
    year: "2023",
    blurb:
      "Omnichannel CRM with WhatsApp, IG, and email threading. Built for sales teams that live in DMs.",
    accent: "from-emerald-300 to-teal-500",
    href: "#",
    stats: [
      { k: "Threads/day", v: "120k" },
      { k: "Teams", v: "200+" },
    ],
  },
  {
    name: "Sherouq Atlas",
    category: "Logistics · Internal",
    year: "2022",
    blurb:
      "Real-time fleet visibility for a regional courier. Live maps, route optimization, driver mobile app.",
    accent: "from-orange-300 to-pink-500",
    href: "#",
    stats: [
      { k: "Vehicles", v: "1.2k" },
      { k: "Drops/day", v: "38k" },
    ],
  },
  {
    name: "Halo Studio",
    category: "Creative · Brand + Site",
    year: "2022",
    blurb:
      "Identity system and editorial site for an architecture practice. Won D&AD wood pencil for digital craft.",
    accent: "from-violet-400 to-indigo-500",
    href: "#",
    stats: [
      { k: "Award", v: "D&AD" },
      { k: "PSI", v: "100/100" },
    ],
  },
];

export const stats = [
  { v: "30+", k: "Projects shipped" },
  { v: "04", k: "Countries served" },
  { v: "12+", k: "Long-term clients" },
  { v: "80yr", k: "Combined experience" },
];

export const testimonials = [
  {
    quote:
      "Ultravi0let didn't just deliver software — they delivered a competitive advantage. Six months in and our ops cost is down 38%.",
    name: "Ahmed Abdelgawad",
    title: "CEO, AG Law",
  },
  {
    quote:
      "They take ownership in a way our previous vendors never did. It feels like an in-house team that just happens to sit in another timezone.",
    name: "Karim Saad",
    title: "CTO, Circle of Trust",
  },
  {
    quote:
      "The design polish alone justified the engagement. Our app store rating jumped from 3.6 to 4.8 in the first month after the redesign.",
    name: "Nadia Hosny",
    title: "Founder, Connect 6",
  },
  {
    quote:
      "They architected something that genuinely scales. We went from 2k to 200k users without re-platforming once.",
    name: "Omar El-Sayed",
    title: "VP Eng, Lumen Health",
  },
];

export const marqueeWords = [
  "Design",
  "Engineering",
  "Cloud",
  "Security",
  "AI",
  "Integrations",
  "Mobile",
  "Web",
  "Brand",
  "Motion",
  "Systems",
  "Strategy",
];
