export type HavenProduct = {
  id: string;
  name: string;
  cat: "living" | "bedroom" | "office";
  price: number;
  material: string;
  color: string;
  img: string;
};

export const HAVEN_PRODUCTS: HavenProduct[] = [
  {
    id: "sofa-linen",
    name: "Oslo Linen Sofa",
    cat: "living",
    price: 4290,
    material: "Linen",
    color: "Natural",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80&auto=format",
  },
  {
    id: "table-oak",
    name: "Nord Oak Dining Table",
    cat: "living",
    price: 2890,
    material: "Oak",
    color: "Walnut",
    img: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80&auto=format",
  },
  {
    id: "chair-walnut",
    name: "Arc Walnut Chair",
    cat: "living",
    price: 890,
    material: "Walnut",
    color: "Brown",
    img: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80&auto=format",
  },
  {
    id: "bed-frame",
    name: "Sage Platform Bed",
    cat: "bedroom",
    price: 3490,
    material: "Oak",
    color: "Sage",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80&auto=format",
  },
  {
    id: "nightstand",
    name: "Pebble Nightstand",
    cat: "bedroom",
    price: 620,
    material: "Ash",
    color: "Natural",
    img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80&auto=format",
  },
  {
    id: "desk-minimal",
    name: "Linea Writing Desk",
    cat: "office",
    price: 1240,
    material: "Ash",
    color: "White",
    img: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80&auto=format",
  },
  {
    id: "shelf-unit",
    name: "Grid Shelving Unit",
    cat: "office",
    price: 980,
    material: "Steel",
    color: "Black",
    img: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&q=80&auto=format",
  },
  {
    id: "lamp-floor",
    name: "Halo Floor Lamp",
    cat: "living",
    price: 540,
    material: "Brass",
    color: "Gold",
    img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80&auto=format",
  },
];

export const HAVEN_PRODUCT_MAP = Object.fromEntries(
  HAVEN_PRODUCTS.map((p) => [p.id, p])
) as Record<string, HavenProduct>;

export type HavenUser = {
  email: string;
  name: string;
};

const USER_KEY = "haven-user";
const CART_KEY = "haven-cart";

export function getHavenUser(): HavenUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as HavenUser) : null;
  } catch {
    return null;
  }
}

export function setHavenUser(user: HavenUser | null) {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_KEY);
  }
  window.dispatchEvent(new Event("haven-auth"));
}

export function getHavenCart(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function setHavenCart(ids: string[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event("haven-cart"));
}
