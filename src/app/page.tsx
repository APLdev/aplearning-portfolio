import { Hero } from "@/components/Hero";
import { LogosBand } from "@/components/LogosBand";
import { Services } from "@/components/Services";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { WhyMe } from "@/components/WhyMe";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <LogosBand />
      <Services />
      <FeaturedProjects />
      <WhyMe />
      <Contact />
    </>
  );
}
