import { NextRequest, NextResponse } from "next/server";

// Subdomain → demo path map. Production: aglaw.ultravi0let.com/... rewrites
// to /demos/ag-law/.... Local: visit `<sub>.localhost:3000` or use the
// /demos path directly.
const SUBDOMAINS: Record<string, string> = {
  aglaw: "/demos/ag-law",
  lumen: "/demos/lumen-health",
  aizu: "/demos/aizu",
  circle: "/demos/circle-of-trust",
  connect6: "/demos/connect6",
  merlin: "/demos/merlin",
  zanobia: "/demos/zanobia",
  maquette: "/demos/maquette",
  haven: "/demos/haven",
  facet: "/demos/facet",
};

const ROOT_HOSTS = new Set(["ultravi0let.com", "www.ultravi0let.com", "localhost", "localhost:3000"]);

export function middleware(req: NextRequest) {
  const host = (req.headers.get("host") || "").toLowerCase();

  // Strip port for comparison
  const hostNoPort = host.split(":")[0];
  const labels = hostNoPort.split(".");

  // Skip if this is the main domain (no subdomain)
  if (ROOT_HOSTS.has(host) || ROOT_HOSTS.has(hostNoPort) || labels.length < 2) {
    return NextResponse.next();
  }

  const subdomain = labels[0];
  const target = SUBDOMAINS[subdomain];
  if (!target) return NextResponse.next();

  // Don't double-prefix if Next is already routing /demos/* internally
  if (req.nextUrl.pathname.startsWith("/demos/")) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = target + (url.pathname === "/" ? "" : url.pathname);
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    // Skip Next internals and static files
    "/((?!_next/|api/|favicon.ico|icon\\.svg|.*\\..*).*)",
  ],
};
