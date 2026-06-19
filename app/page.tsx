import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { Manifesto } from "@/components/Manifesto";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <main className="relative isolate min-w-0 overflow-x-hidden">
      {/* Ambient spectrum aurora — one continuous fixed layer behind everything, so it
          flows seamlessly across all sections. Dark sections (Contact / Footer) sit opaque on top. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute -left-[10%] -top-[12%] h-[80vh] w-[60vw] rounded-full opacity-[0.45] blur-[120px] animate-breathe"
          style={{ background: "radial-gradient(closest-side, rgba(124,58,237,0.6), transparent 55%)" }}
        />
        <div
          className="absolute -right-[12%] top-[2%] h-[70vh] w-[52vw] rounded-full opacity-[0.4] blur-[120px] animate-drift-2"
          style={{ background: "radial-gradient(closest-side, rgba(192,38,211,0.55), transparent 55%)" }}
        />
        <div
          className="absolute left-[10%] top-[34%] h-[78vh] w-[55vw] rounded-full opacity-[0.38] blur-[130px] animate-drift-1"
          style={{ background: "radial-gradient(closest-side, rgba(59,130,246,0.5), transparent 55%)" }}
        />
        <div
          className="absolute -right-[10%] top-[46%] h-[74vh] w-[52vw] rounded-full opacity-[0.42] blur-[120px] animate-breathe"
          style={{ background: "radial-gradient(closest-side, rgba(139,92,246,0.55), transparent 55%)" }}
        />
        <div
          className="absolute -left-[12%] -bottom-[14%] h-[74vh] w-[55vw] rounded-full opacity-[0.4] blur-[130px] animate-drift-3"
          style={{ background: "radial-gradient(closest-side, rgba(236,72,153,0.5), transparent 55%)" }}
        />
        <div
          className="absolute -right-[14%] -bottom-[10%] h-[70vh] w-[52vw] rounded-full opacity-[0.36] blur-[120px] animate-drift-2"
          style={{ background: "radial-gradient(closest-side, rgba(99,102,241,0.5), transparent 55%)" }}
        />
      </div>
      <Nav />
      <Hero />
      <Marquee />
      <Projects />
      <Services />
      <Manifesto />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
