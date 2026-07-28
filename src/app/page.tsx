import IntroLoader from "@/components/IntroLoader";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import SideDotNav from "@/components/SideDotNav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import StatsBand from "@/components/StatsBand";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import InvestmentThesis from "@/components/InvestmentThesis";
import Leadership from "@/components/Leadership";
import Recommendations from "@/components/Recommendations";
import Contact from "@/components/Contact";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-canvas min-h-screen">
      <IntroLoader />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <SideDotNav />
      <Hero />
      <Marquee />
      <About />
      <StatsBand />
      <Experience />
      <Projects />
      <InvestmentThesis />
      <Leadership />
      <Recommendations />
      <Contact />
      <BackToTop />
      <Footer />
    </main>
  );
}
