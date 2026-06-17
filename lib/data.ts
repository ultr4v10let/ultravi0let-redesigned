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
    name: "Lumen Health",
    category: "Healthcare · iOS + Web",
    year: "2024",
    blurb:
      "Telemedicine platform connecting patients with verified clinicians across the GCC. Built for low-bandwidth networks and high regulatory bars.",
    accent: "from-violet-500 to-fuchsia-500",
    href: "#",
    stats: [
      { k: "Surface", v: "iOS · Web" },
      { k: "Markets", v: "GCC" },
    ],
  },
  {
    name: "AG Law",
    category: "Legal Tech · Web",
    year: "2024",
    blurb:
      "Practice-management suite for a regional law firm. Document workflows, billing, and a secure client portal.",
    accent: "from-amber-300 to-rose-400",
    href: "#",
    stats: [
      { k: "Modules", v: "6" },
      { k: "Uptime", v: "99.9%" },
    ],
  },
  {
    name: "Circle of Trust",
    category: "FinTech · Mobile + Web",
    year: "2023",
    blurb:
      "Group-savings and rotating-credit platform. KYC, ledger, and payouts on a custom double-entry engine.",
    accent: "from-cyan-300 to-violet-500",
    href: "#",
    stats: [
      { k: "Ledger", v: "Custom" },
      { k: "Markets", v: "3" },
    ],
  },
  {
    name: "Connect 6",
    category: "SaaS · Web",
    year: "2023",
    blurb:
      "Omnichannel CRM that unifies WhatsApp, Instagram, and email into a single thread per customer.",
    accent: "from-emerald-300 to-teal-500",
    href: "#",
    stats: [
      { k: "Channels", v: "5" },
      { k: "Teams", v: "200+" },
    ],
  },
  {
    name: "Atlas Fleet",
    category: "Logistics · Internal",
    year: "2022",
    blurb:
      "Real-time fleet visibility and route optimisation for a regional courier. Live maps, driver app, and dispatcher console.",
    accent: "from-orange-300 to-pink-500",
    href: "#",
    stats: [
      { k: "Surface", v: "3 apps" },
      { k: "Live", v: "Real-time" },
    ],
  },
  {
    name: "Halo Studio",
    category: "Creative · Brand + Site",
    year: "2022",
    blurb:
      "Identity system and editorial portfolio for an architecture practice. Type-led, image-forward, performance-obsessed.",
    accent: "from-violet-400 to-indigo-500",
    href: "#",
    stats: [
      { k: "PSI", v: "100/100" },
      { k: "Stack", v: "Static" },
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
    name: "Ahmed Abdelgawad",
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
      "The design work alone moved the needle on our app store rating. The engineering kept us from drowning when we did.",
    name: "Nadia Hosny",
    title: "Founder, Connect 6",
  },
  {
    quote:
      "Senior people, sensible decisions, and an honest no when 'no' is the right answer. Rare combination.",
    name: "Omar El-Sayed",
    title: "VP Engineering, Lumen Health",
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
