import Image from "next/image";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import WorkExperience from "@/components/experience";
import Projects from "@/components/projects";
import TechSkills from "@/components/skills";
import Education from "@/components/education";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function PageLayout() {
  return (
    <>
      <Header></Header>
      <HeroSection></HeroSection>
      <WorkExperience></WorkExperience>
      <Projects></Projects>
      <TechSkills></TechSkills>
      <Education></Education>
      <Contact></Contact>
      <Footer></Footer>
    </>
  );
}
