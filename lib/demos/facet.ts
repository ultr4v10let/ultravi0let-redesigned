export type FacetField = "cs" | "architecture" | "medical";
export type FacetTheme = "a" | "b";

export type FacetUser = {
  email: string;
  name: string;
};

export type FacetPortfolio = {
  field: FacetField;
  theme: FacetTheme;
  name: string;
  profilePhoto: string;
  headline: string;
  bio: string;
  galleryPhotos: string[];
  details: Record<string, string>;
  updatedAt: string;
};

export const FACET_DEFAULT_PHOTOS: Record<
  FacetField,
  { profile: string; gallery: string[] }
> = {
  cs: {
    profile:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop&q=80",
    ],
  },
  architecture: {
    profile:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8627?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1448632109177-0ac0938781a5?w=800&h=600&fit=crop&q=80",
    ],
  },
  medical: {
    profile:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop&q=80",
    ],
  },
};

export const FACET_FIELDS: {
  id: FacetField;
  label: string;
  desc: string;
  icon: string;
  accent: string;
}[] = [
  {
    id: "cs",
    label: "Computer Science",
    desc: "GitHub, LinkedIn, languages and shipped projects.",
    icon: "{ }",
    accent: "#6366F1",
  },
  {
    id: "architecture",
    label: "Architecture & Civil",
    desc: "Behance, design tools, studio work and built projects.",
    icon: "△",
    accent: "#2563EB",
  },
  {
    id: "medical",
    label: "Medical & Healthcare",
    desc: "Certificates, specialisations, affiliations and research.",
    icon: "+",
    accent: "#0D9488",
  },
];

export const FACET_THEMES: Record<
  FacetField,
  { id: FacetTheme; name: string; desc: string; preview: string }[]
> = {
  cs: [
    { id: "a", name: "Terminal", desc: "Dark · monospace · developer-native", preview: "#0F172A" },
    { id: "b", name: "Lumen", desc: "Light · clean · product-engineer", preview: "#F8FAFC" },
  ],
  architecture: [
    { id: "a", name: "Blueprint", desc: "Technical grid · drafting-room blue", preview: "#1E3A5F" },
    { id: "b", name: "Atelier", desc: "Warm editorial · gallery presentation", preview: "#F5F0E8" },
  ],
  medical: [
    { id: "a", name: "Clinical", desc: "Crisp white · trust-forward teal", preview: "#F0FDFA" },
    { id: "b", name: "Scholar", desc: "Academic navy · serif credentials", preview: "#0F1729" },
  ],
};

export type FacetFieldConfig = {
  id: FacetField;
  label: string;
  fields: { key: string; label: string; placeholder: string; type?: "textarea" | "url" }[];
  defaults: Record<string, string>;
};

export const FACET_FIELD_CONFIG: Record<FacetField, FacetFieldConfig> = {
  cs: {
    id: "cs",
    label: "Computer Science",
    defaults: {
      github: "github.com/yourhandle",
      linkedin: "linkedin.com/in/yourhandle",
      languages: "TypeScript, Python, Go, Rust",
      projects:
        "Payments API — led backend for a fintech platform handling 2M req/day\nOpen-source CLI — 1.2k stars on GitHub",
      education: "BSc Computer Science · Cairo University · 2021",
    },
    fields: [
      { key: "github", label: "GitHub", placeholder: "github.com/username", type: "url" },
      { key: "linkedin", label: "LinkedIn", placeholder: "linkedin.com/in/username", type: "url" },
      { key: "languages", label: "Programming languages", placeholder: "TypeScript, Python, Go…" },
      { key: "projects", label: "Featured projects", placeholder: "One project per line…", type: "textarea" },
      { key: "education", label: "Education", placeholder: "Degree · institution · year" },
    ],
  },
  architecture: {
    id: "architecture",
    label: "Architecture & Civil",
    defaults: {
      behance: "behance.net/yourportfolio",
      linkedin: "linkedin.com/in/yourhandle",
      software: "AutoCAD, Revit, Rhino, SketchUp, Lumion",
      projects:
        "Cairo Cultural Centre — competition entry, 12,000 m² mixed-use\nNile Promenade — urban renewal masterplan, lead designer",
      education: "MSc Architecture · Ain Shams University · 2020",
    },
    fields: [
      { key: "behance", label: "Behance / portfolio", placeholder: "behance.net/…", type: "url" },
      { key: "linkedin", label: "LinkedIn", placeholder: "linkedin.com/in/username", type: "url" },
      { key: "software", label: "Design software", placeholder: "AutoCAD, Revit, Rhino…" },
      { key: "projects", label: "Selected projects", placeholder: "One project per line…", type: "textarea" },
      { key: "education", label: "Education & licensure", placeholder: "Degree · institution · year" },
    ],
  },
  medical: {
    id: "medical",
    label: "Medical & Healthcare",
    defaults: {
      certificates: "Board Certified Internal Medicine · 2019\nACLS & BLS — current",
      specializations: "Internal Medicine, Cardiology fellowship",
      affiliation: "Cairo University Hospital · Senior Registrar",
      publications:
        "Hypertension management in diabetic patients — J. Arab Med, 2023\nOutcomes in post-CABG care — regional cohort study, 2022",
      licenses: "Egyptian Medical Syndicate · License #MD-48291",
    },
    fields: [
      { key: "certificates", label: "Certificates & board exams", placeholder: "One per line…", type: "textarea" },
      { key: "specializations", label: "Specialisations", placeholder: "e.g. Cardiology, Pediatrics…" },
      { key: "affiliation", label: "Hospital / clinic affiliation", placeholder: "Institution · role" },
      { key: "publications", label: "Publications & research", placeholder: "One per line…", type: "textarea" },
      { key: "licenses", label: "Licences & registrations", placeholder: "Medical syndicate, GMC, etc." },
    ],
  },
};

const USER_KEY = "facet-user";
const PORTFOLIO_KEY = "facet-portfolio";
const AUTH_EVENT = "facet-auth";
const PORTFOLIO_EVENT = "facet-portfolio";

export function getFacetUser(): FacetUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as FacetUser) : null;
  } catch {
    return null;
  }
}

export function setFacetUser(user: FacetUser | null) {
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  else localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function normalizePortfolio(portfolio: FacetPortfolio): FacetPortfolio {
  const defaults = FACET_DEFAULT_PHOTOS[portfolio.field];
  const gallery =
    Array.isArray(portfolio.galleryPhotos) && portfolio.galleryPhotos.some((u) => u.trim())
      ? portfolio.galleryPhotos.map((u) => u.trim()).filter(Boolean)
      : [...defaults.gallery];

  return {
    ...portfolio,
    profilePhoto:
      typeof portfolio.profilePhoto === "string" && portfolio.profilePhoto.trim()
        ? portfolio.profilePhoto.trim()
        : defaults.profile,
    galleryPhotos: gallery,
  };
}

export function getFacetPortfolio(): FacetPortfolio | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PORTFOLIO_KEY);
    return raw ? normalizePortfolio(JSON.parse(raw) as FacetPortfolio) : null;
  } catch {
    return null;
  }
}

export function setFacetPortfolio(portfolio: FacetPortfolio | null) {
  if (portfolio) {
    try {
      localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(portfolio));
    } catch (err) {
      if (err instanceof DOMException && (err.name === "QuotaExceededError" || err.code === 22)) {
        throw new Error("Storage quota exceeded");
      }
      throw err;
    }
  } else {
    localStorage.removeItem(PORTFOLIO_KEY);
  }
  window.dispatchEvent(new Event(PORTFOLIO_EVENT));
}

export function createDefaultPortfolio(
  field: FacetField,
  userName: string,
  theme: FacetTheme = "a"
): FacetPortfolio {
  const config = FACET_FIELD_CONFIG[field];
  const photos = FACET_DEFAULT_PHOTOS[field];
  return {
    field,
    theme,
    name: userName,
    profilePhoto: photos.profile,
    headline: defaultHeadline(field, userName),
    bio: defaultBio(field),
    galleryPhotos: [...photos.gallery],
    details: { ...config.defaults },
    updatedAt: new Date().toISOString(),
  };
}

function defaultHeadline(field: FacetField, name: string): string {
  const first = name.split(" ")[0];
  if (field === "cs") return `${first} builds systems that scale.`;
  if (field === "architecture") return `${first} designs spaces with intent.`;
  return `${first} — evidence-based clinical care.`;
}

function defaultBio(field: FacetField): string {
  if (field === "cs")
    return "Full-stack engineer focused on reliable APIs, developer experience and products that ship.";
  if (field === "architecture")
    return "Architect and urban designer working across cultural, residential and civic projects in Egypt and the Gulf.";
  return "Physician-researcher committed to patient-centred care, continuous learning and translational medicine.";
}

export { AUTH_EVENT, PORTFOLIO_EVENT };
