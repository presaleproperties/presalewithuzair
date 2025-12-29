import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { InvestmentSection } from "@/components/home/InvestmentSection";
import { ClientInvestmentsSection } from "@/components/home/ClientInvestmentsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CommunityLeaderSection } from "@/components/home/CommunityLeaderSection";
import { BlogPreviewSection } from "@/components/home/BlogPreviewSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Uzair Muhammad | Vancouver's Top Presale Expert - Presale Condos & New Construction</title>
        <meta
          name="description"
          content="Uzair Muhammad is Vancouver's premier presale real estate expert. Specializing in presale condos, assignments, and new construction investments. Over $200M in volume and 300+ units sold."
        />
        <meta name="keywords" content="presale condos Vancouver, presale expert, new construction Vancouver, real estate investment Vancouver, Uzair Muhammad, presale assignments" />
        <link rel="canonical" href="https://presalewithuzair.com" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Person",
                "@id": "https://presalewithuzair.com/#person",
                "name": "Uzair Muhammad",
                "jobTitle": "Presale Real Estate Expert",
                "description": "Vancouver's premier presale real estate expert specializing in presale condos, assignments, and new construction investments.",
                "url": "https://presalewithuzair.com",
                "sameAs": [
                  "https://www.instagram.com/presalewithuzair",
                  "https://www.linkedin.com/in/uzairmuhammad"
                ],
                "knowsAbout": ["Presale Condos", "Real Estate Investment", "New Construction", "Assignment Sales"],
                "worksFor": {
                  "@type": "RealEstateAgent",
                  "name": "Presale With Uzair"
                }
              },
              {
                "@type": "RealEstateAgent",
                "@id": "https://presalewithuzair.com/#business",
                "name": "Presale With Uzair",
                "description": "Vancouver's leading presale real estate service specializing in presale condos, assignments, and new construction investments.",
                "url": "https://presalewithuzair.com",
                "telephone": "+1-604-000-0000",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Vancouver",
                  "addressRegion": "BC",
                  "addressCountry": "CA"
                },
                "areaServed": {
                  "@type": "City",
                  "name": "Vancouver"
                },
                "founder": {
                  "@id": "https://presalewithuzair.com/#person"
                },
                "priceRange": "$$$$"
              },
              {
                "@type": "WebSite",
                "@id": "https://presalewithuzair.com/#website",
                "url": "https://presalewithuzair.com",
                "name": "Presale With Uzair",
                "publisher": {
                  "@id": "https://presalewithuzair.com/#person"
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <InvestmentSection />
        <ClientInvestmentsSection />
        <TestimonialsSection />
        <CommunityLeaderSection />
        <BlogPreviewSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
