import Features from "../../components/ui/Features";
import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/ui/Hero/Hero";
import HowItWorks from "../../components/ui/HowItWorks";
import Footer from "../../components/layout/Footer";
import Trust from "../../components/ui/Trust";
import DashboardPreview from "../../components/ui/DashboardPreview";
import Testimonials from "../../components/ui/Testimonials";
import Pricing from "../../components/ui/Pricing";
import CTA from "../../components/ui/CTA";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Trust/>
      <HowItWorks />
      <Features />
      <DashboardPreview/>
      <Testimonials/>
      <Pricing/>
      <CTA/>
      <Footer />
    </>
  );
}

export default Home;
