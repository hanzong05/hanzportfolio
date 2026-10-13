import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import Stats from "@/components/stats";
import About from "@/components/about";
import WorkExperience from "@/components/experience";
import Projects from "@/components/projects";
import TechSkills from "@/components/skills";
import Education from "@/components/education";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import AiChat from "@/components/ai-chat";

export default function PageLayout() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <Stats />
        <About />
        <WorkExperience />
        <Projects />
        <TechSkills />
        <Education />
        <Contact />
      </main>
      <Footer />
      <AiChat />
    </>
  );
}
