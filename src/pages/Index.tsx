import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { InvestmentSection } from "@/components/home/InvestmentSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { BlogPreviewSection } from "@/components/home/BlogPreviewSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Uzair Muhammad | Vancouver's Top Presale Expert - Presale Condos & New Construction</title>
        <meta
          name="description"
          content="Uzair Muhammad is Vancouver's premier presale real estate expert. Specializing in presale condos, assignments, and new construction investments. Over $150M in sales and 300+ units sold."
        />
        <meta name="keywords" content="presale condos Vancouver, presale expert, new construction Vancouver, real estate investment Vancouver, Uzair Muhammad, presale assignments" />
        <link rel="canonical" href="https://presalewithuzair.com" />
      </Helmet>

      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <InvestmentSection />
        <TestimonialsSection />
        <BlogPreviewSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
