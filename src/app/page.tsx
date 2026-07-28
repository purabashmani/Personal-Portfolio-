import IntroLoader from "@/components/IntroLoader";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import StatsBand from "@/components/StatsBand";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Leadership from "@/components/Leadership";
import Recommendations from "@/components/Recommendations";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-canvas min-h-screen">
      <IntroLoader />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <StatsBand />
      <Experience />
      <Projects />
      <Leadership />
      <Recommendations />
      <Contact />
      <Footer />
    </main>
  );
}
