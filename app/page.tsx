import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import WhyUs from "@/components/WhyUs";
import Programs from "@/components/Programs";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <StatsSection />
      <WhyUs />
      <Programs />
      <Testimonials />
      <Faq />
      <Footer />
    </>
  );
}
