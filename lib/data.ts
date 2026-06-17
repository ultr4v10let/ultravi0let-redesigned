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
      "UI and brand systems that feel inevitable. Visual identity, product surfaces, and design tokens built to scale across teams.",
    keywords: ["Brand", "Product", "Motion"],
  },
  {
    n: "02",
    icon: Code2,
    title: "Engineering",
    blurb:
      "Web and mobile applications written by senior engineers. Type-safe, observable, and built to be maintained, not rewritten.",
    keywords: ["Web", "Mobile", "API"],
  },
  {
    n: "03",
    icon: Cloud,
    title: "Cloud & Infra",
    blurb:
      "AWS and GCP architectures, CI/CD, and infrastructure-as-code. Predictable cost, predictable uptime.",
    keywords: ["AWS", "GCP", "DevOps"],
  },
  {
    n: "04",
    icon: Compass,
    title: "Architecture",
    blurb:
      "Systems design for products that need to last. We choose the boring technology so you can take the exciting risks.",
    keywords: ["Systems", "DDD", "Scale"],
  },
  {
    n: "05",
    icon: ShieldCheck,
    title: "Security",
    blurb:
      "Threat modelling, code audits, and compliance readiness. Built-in, not bolted-on.",
    keywords: ["Audit", "Pen-test", "SOC-2"],
  },
  {
    n: "06",
    icon: Workflow,
    title: "Integrations",
    blurb:
      "Payment rails, messaging, identity, AI providers, and legacy systems. We make foreign services feel native.",
    keywords: ["Stripe", "AI", "ERP"],
  },
  {
    n: "07",
    icon: Sparkles,
    title: "AI Engineering",
    blurb:
      "Production LLM pipelines with retrieval, evaluation, and guardrails. AI that ships, not AI that demos.",
    keywords: ["LLM", "RAG", "Eval"],
  },
  {
    n: "08",
    icon: LifeBuoy,
    title: "Care & Support",
    blurb:
      "Ongoing partnership after launch. Monitoring, on-call rotation, and a real human at the other end of the line.",
    keywords: ["SLA", "On-call", "Care"],
  },
];

export const projects = [
  {
    name: "AG Law",
    category: "Legal Tech · Web",
    year: "2024",
    blurb:
      "Practice-management suite and booking platform for a senior Cairo law firm. Multi-jurisdictional matter intake, secure client portal, and partner-level workflow.",
    accent: "from-amber-300 to-rose-400",
    href: "/demos/ag-law",
    subdomain: "aglaw.ultravi0let.com",
    stats: [
      { k: "Modules", v: "6" },
      { k: "Uptime", v: "99.9%" },
    ],
  },
  {
    name: "Lumen Health",
    category: "Healthcare · iOS + Web",
    year: "2024",
    blurb:
      "Telemedicine platform connecting patients with verified clinicians across the GCC. Built for low-bandwidth networks and high regulatory bars.",
    accent: "from-violet-500 to-fuchsia-500",
    href: "/demos/lumen-health",
    subdomain: "lumen.ultravi0let.com",
    stats: [
      { k: "Surface", v: "iOS · Web" },
      { k: "Markets", v: "GCC" },
    ],
  },
  {
    name: "Aizu",
    category: "GovTech · Compliance",
    year: "2024",
    blurb:
      "Carbon disclosure platform for Japanese corporates. Scope 1–3 ingestion, calculation engine with MOEJ factors, and TCFD-aligned report generation.",
    accent: "from-emerald-300 to-teal-500",
    href: "/demos/aizu",
    subdomain: "aizu.ultravi0let.com",
    stats: [
      { k: "Framework", v: "TCFD" },
      { k: "Filings", v: "Auto" },
    ],
  },
  {
    name: "Circle of Trust",
    category: "FinTech · Mobile + Web",
    year: "2023",
    blurb:
      "Rotating-credit platform with KYC, double-entry ledger, and on-chain custody via audited smart contracts.",
    accent: "from-cyan-300 to-violet-500",
    href: "/demos/circle-of-trust",
    subdomain: "circle.ultravi0let.com",
    stats: [
      { k: "Custody", v: "Smart contract" },
      { k: "Markets", v: "3" },
    ],
  },
  {
    name: "Connect6",
    category: "SaaS · Web",
    year: "2023",
    blurb:
      "Omnichannel CRM for hospitality. Unifies Instagram, WhatsApp, X and Snapchat into a single guest inbox with AI-drafted replies and analytics.",
    accent: "from-violet-400 to-indigo-500",
    href: "/demos/connect6",
    subdomain: "connect6.ultravi0let.com",
    stats: [
      { k: "Channels", v: "4" },
      { k: "Use case", v: "Restaurants" },
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
      "They write code the way good lawyers write contracts. Every line is there for a reason. We've worked with three vendors before them. None compared.",
    name: "Ahmed AbdelGawad",
    title: "Managing Partner, AG Law",
  },
  {
    quote:
      "They run like an in-house team that just happens to sit in another timezone. Ownership, not order-taking.",
    name: "Karim Saad",
    title: "Co-founder, Circle of Trust",
  },
  {
    quote:
      "Senior people, sensible decisions, and an honest no when 'no' is the right answer. Rare combination.",
    name: "Bashir Al-Hubaishi",
    title: "Co-founder, Lumen Health",
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
