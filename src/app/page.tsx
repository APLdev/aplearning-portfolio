import { Hero } from "@/components/Hero";
import { LogosBand } from "@/components/LogosBand";
import { Services } from "@/components/Services";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { Expertise } from "@/components/Expertise";
import { WhyMe } from "@/components/WhyMe";
import { Contact } from "@/components/Contact";
import { FeaturedDemo } from "@/components/FeaturedDemo";
import { WorkProcess } from "@/components/WorkProcess";

export default function Home() {
  return (
    <>
      <Hero />
      <LogosBand />
      <FeaturedDemo />
      <Services />
      <FeaturedProjects />
      <Expertise />
      <WhyMe />
      <WorkProcess />
      <Contact />
    </>
  );
}
