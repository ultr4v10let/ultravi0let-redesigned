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
import { SiteAtmosphere } from "@/components/SiteAtmosphere";

export default function Page() {
  return (
    <main className="relative min-w-0 overflow-x-hidden">
      <SiteAtmosphere />
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
