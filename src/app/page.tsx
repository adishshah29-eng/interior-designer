import Navbar from "../components/Navbar";
import Hero from "../sections/hero/Hero";
import Marquee from "../components/Marquee";
import About from "../sections/about/About";
import Services from "../sections/services/Services";
import Transformation from "../sections/transformation/Transformation";
import FeaturedStories from "../sections/featured-stories/FeaturedStories";
import Projects from "../sections/projects/Projects";
import Footprint from "../sections/footprint/Footprint";
import Leadership from "../sections/leadership/Leadership";
import Footer from "../sections/footer/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Transformation />
      <Projects />
      <Footprint />
      <Leadership />
      <FeaturedStories />
      <Footer />
    </main>
  );
}
