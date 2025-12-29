import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { AudienceSegmentSection } from "@/components/home/AudienceSegmentSection";
import { CaseStudiesSection } from "@/components/home/CaseStudiesSection";
import { DifferentiationSection } from "@/components/home/DifferentiationSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { InvestmentSection } from "@/components/home/InvestmentSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";


import { BookingContextSection } from "@/components/home/BookingContextSection";
import { BlogPreviewSection } from "@/components/home/BlogPreviewSection";
import { FinalCTASection } from "@/components/home/FinalCTASection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Presale Expert in Vancouver & Fraser Valley | Uzair Muhammad</title>
        <meta
          name="description"
          content="Uzair Muhammad is Vancouver's premier presale advisor and strategist. Specializing in presale condos, assignments, and new construction. $200M+ in presales, 300+ units. Expert guidance for buyers and investors."
        />
        <meta name="keywords" content="presale expert Vancouver, presale advisor, presale strategist, presale consultant, presale assignments expert, presale condos Vancouver, new construction Vancouver, Fraser Valley presales, first-time buyer presale" />
        <link rel="canonical" href="https://presalewithuzair.com" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Person",
                "@id": "https://presalewithuzair.com/#person",
                "name": "Uzair Muhammad",
                "jobTitle": "Presale Expert & Strategist",
                "description": "Vancouver's premier presale expert and strategist. $200M+ in presales, 300+ units. Specializing in presale condos and assignments for buyers and investors.",
                "url": "https://presalewithuzair.com",
                "sameAs": [
                  "https://www.instagram.com/presalewithuzair",
                  "https://www.linkedin.com/in/uzairmuhammad"
                ],
                "knowsAbout": ["Presale Condos", "Presale Strategy", "Assignment Sales", "Developer Advisory", "Real Estate Investment", "New Construction"],
                "worksFor": {
                  "@type": "RealEstateAgent",
                  "@id": "https://presalewithuzair.com/#business"
                }
              },
              {
                "@type": "RealEstateAgent",
                "@id": "https://presalewithuzair.com/#business",
                "name": "Presale With Uzair",
                "description": "Vancouver's leading presale advisory service. $200M+ in presales, 300+ units. Specializing in presale strategy and assignments across Metro Vancouver and Fraser Valley.",
                "url": "https://presalewithuzair.com",
                "email": "info@meetuzair.com",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Vancouver",
                  "addressRegion": "BC",
                  "addressCountry": "CA"
                },
                "areaServed": [
                  { "@type": "City", "name": "Vancouver" },
                  { "@type": "City", "name": "Burnaby" },
                  { "@type": "City", "name": "Surrey" },
                  { "@type": "City", "name": "Langley" },
                  { "@type": "AdministrativeArea", "name": "Fraser Valley" }
                ],
                "founder": { "@id": "https://presalewithuzair.com/#person" },
                "priceRange": "$$$$"
              },
              {
                "@type": "WebSite",
                "@id": "https://presalewithuzair.com/#website",
                "url": "https://presalewithuzair.com",
                "name": "Presale With Uzair",
                "publisher": { "@id": "https://presalewithuzair.com/#person" }
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What is a presale condo?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "A presale condo is a property purchased before construction is complete, typically offering lower prices and deposit structures that allow for capital appreciation before completion."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Does working with a presale expert cost extra?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "No. Working with a presale expert like Uzair costs buyers $0 — the developer pays the commission, not you."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What is an assignment sale?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "An assignment sale is when the original buyer of a presale contract sells their purchase agreement to another buyer before the property is completed."
                    }
                  }
                ]
              }
            ]
          })}
        </script>
      </Helmet>

      <Navbar />
      <main>
        <HeroSection />
        <AudienceSegmentSection />
        <DifferentiationSection />
        <ProcessSection />
        <CaseStudiesSection />
        <InvestmentSection />
        <TestimonialsSection />
        
        
        <BookingContextSection />
        <BlogPreviewSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
