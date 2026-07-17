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
      {/* Fixed technical lattice behind everything — restrained, top-weighted */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div
          className="grid-bg absolute inset-0 opacity-[0.5]"
          style={{
            maskImage:
              "radial-gradient(120% 80% at 50% -10%, black, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(120% 80% at 50% -10%, black, transparent 75%)",
          }}
        />
        {/* one understated violet glow, top-centre — never a light show */}
        <div
          className="absolute left-1/2 top-[-20%] h-[70vh] w-[80vw] -translate-x-1/2 rounded-full opacity-[0.22] blur-[130px]"
          style={{
            background:
              "radial-gradient(closest-side, rgba(124,58,237,0.5), transparent 70%)",
          }}
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
