import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Leadership from "@/components/Leadership";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-canvas min-h-screen">
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Experience />
      <Projects />
      <Leadership />
      <Contact />
      <Footer />
    </main>
  );
}
