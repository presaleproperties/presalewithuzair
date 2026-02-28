import { Helmet } from "react-helmet-async";
import akhiPhoto from "@/assets/testimonials/akhi.jpg";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { SocialProofSection } from "@/components/home/SocialProofSection";

import { DifferentiationSection } from "@/components/home/DifferentiationSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { MidPageCTA } from "@/components/home/MidPageCTA";
import { BookingContextSection } from "@/components/home/BookingContextSection";
import { BlogPreviewSection } from "@/components/home/BlogPreviewSection";
import { InstagramSection } from "@/components/home/InstagramSection";
import { FinalCTASection } from "@/components/home/FinalCTASection";


const Index = () => {
  return (
    <>
      <Helmet>
        <title>Presale Expert Vancouver, Surrey, Burnaby & Fraser Valley | Uzair Muhammad</title>
        <meta
          name="description"
          content="Uzair Muhammad is Vancouver's premier presale expert and realtor. Specializing in presale condos, assignments, and new construction across Vancouver, Surrey, Burnaby, Langley & Fraser Valley. $200M+ in presales, 300+ units."
        />
        <meta name="keywords" content="presale expert Vancouver, presale realtor Vancouver, presale specialist Surrey, presale agent Burnaby, presale condos Langley, new construction condos Vancouver, pre-construction condos BC, Fraser Valley presales, first-time buyer presale, Uzair Muhammad realtor, best presale agent Vancouver, Vancouver condo presales" />
        <link rel="canonical" href="https://presalewithuzair.com" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://presalewithuzair.com" />
        <meta property="og:title" content="Presale Expert Vancouver & Fraser Valley | Uzair Muhammad" />
        <meta property="og:description" content="Vancouver's premier presale expert. Specializing in presale condos, assignments, and new construction. $200M+ in presales, 300+ units." />
        <meta property="og:image" content="https://presalewithuzair.com/og-image.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Presale Expert Vancouver | Uzair Muhammad" />
        <meta name="twitter:description" content="Vancouver's premier presale expert. $200M+ in presales, 300+ units." />
        <meta name="twitter:image" content="https://presalewithuzair.com/og-image.jpg" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Person",
                "@id": "https://presalewithuzair.com/#person",
                "name": "Uzair Muhammad",
                "jobTitle": "Presale Expert & Real Estate Agent",
                "description": "Vancouver's premier presale expert and realtor. $200M+ in presales, 350+ clients. Specializing in presale condos and assignments for buyers and investors across Metro Vancouver and Fraser Valley.",
                "url": "https://presalewithuzair.com",
                "image": "https://presalewithuzair.com/og-image.jpg",
                "telephone": "+1-778-231-3592",
                "email": "info@meetuzair.com",
                "sameAs": [
                  "https://www.instagram.com/presalewithuzair",
                  "https://www.tiktok.com/@presalewithuzair",
                  "https://www.youtube.com/@presalewithuzair",
                  "https://www.linkedin.com/in/uzairmuhammad"
                ],
                "knowsAbout": ["Presale Condos", "Presale Strategy", "Assignment Sales", "Developer Advisory", "Real Estate Investment", "New Construction", "Pre-Construction Condos"],
                "worksFor": {
                  "@type": "RealEstateAgent",
                  "@id": "https://presalewithuzair.com/#business"
                }
              },
              {
                "@type": "LocalBusiness",
                "@id": "https://presalewithuzair.com/#localbusiness",
                "name": "Presale With Uzair",
                "image": "https://presalewithuzair.com/og-image.jpg",
                "description": "Vancouver's leading presale real estate service. Expert guidance on presale condos, assignments, and new construction investments.",
                "url": "https://presalewithuzair.com",
                "telephone": "+1-778-231-3592",
                "email": "info@meetuzair.com",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "3211 152 St Building C, Suite 402",
                  "addressLocality": "Surrey",
                  "addressRegion": "BC",
                  "postalCode": "V3Z 1H8",
                  "addressCountry": "CA"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": 49.2827,
                  "longitude": -123.1207
                },
                "areaServed": [
                  { "@type": "City", "name": "Vancouver", "sameAs": "https://en.wikipedia.org/wiki/Vancouver" },
                  { "@type": "City", "name": "Burnaby", "sameAs": "https://en.wikipedia.org/wiki/Burnaby" },
                  { "@type": "City", "name": "Surrey", "sameAs": "https://en.wikipedia.org/wiki/Surrey,_British_Columbia" },
                  { "@type": "City", "name": "Langley", "sameAs": "https://en.wikipedia.org/wiki/Langley,_British_Columbia_(city)" },
                  { "@type": "City", "name": "Coquitlam", "sameAs": "https://en.wikipedia.org/wiki/Coquitlam" },
                  { "@type": "City", "name": "Richmond", "sameAs": "https://en.wikipedia.org/wiki/Richmond,_British_Columbia" },
                  { "@type": "City", "name": "New Westminster", "sameAs": "https://en.wikipedia.org/wiki/New_Westminster" },
                  { "@type": "City", "name": "Abbotsford", "sameAs": "https://en.wikipedia.org/wiki/Abbotsford,_British_Columbia" },
                  { "@type": "City", "name": "Port Coquitlam" },
                  { "@type": "City", "name": "Port Moody" },
                  { "@type": "City", "name": "North Vancouver" },
                  { "@type": "City", "name": "West Vancouver" },
                  { "@type": "AdministrativeArea", "name": "Fraser Valley" },
                  { "@type": "AdministrativeArea", "name": "Metro Vancouver" }
                ],
                "founder": { "@id": "https://presalewithuzair.com/#person" },
                "priceRange": "$$",
                "openingHoursSpecification": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  "opens": "09:00",
                  "closes": "18:00"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "5",
                  "reviewCount": "31",
                  "bestRating": "5",
                  "worstRating": "1"
                }
              },
              {
                "@type": "RealEstateAgent",
                "@id": "https://presalewithuzair.com/#business",
                "name": "Presale With Uzair",
                "description": "Vancouver's leading presale advisory service. $200M+ in presales, 350+ clients. Specializing in presale strategy and assignments across Metro Vancouver and Fraser Valley.",
                "url": "https://presalewithuzair.com",
                "email": "info@meetuzair.com",
                "telephone": "+1-778-231-3592",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "3211 152 St Building C, Suite 402",
                  "addressLocality": "Surrey",
                  "addressRegion": "BC",
                  "postalCode": "V3Z 1H8",
                  "addressCountry": "CA"
                },
                "areaServed": [
                  { "@type": "City", "name": "Vancouver" },
                  { "@type": "City", "name": "Burnaby" },
                  { "@type": "City", "name": "Surrey" },
                  { "@type": "City", "name": "Langley" },
                  { "@type": "City", "name": "Coquitlam" },
                  { "@type": "City", "name": "Richmond" },
                  { "@type": "City", "name": "New Westminster" },
                  { "@type": "City", "name": "Abbotsford" },
                  { "@type": "AdministrativeArea", "name": "Fraser Valley" },
                  { "@type": "AdministrativeArea", "name": "Metro Vancouver" }
                ],
                "founder": { "@id": "https://presalewithuzair.com/#person" },
                "priceRange": "$$"
              },
              {
                "@type": "WebSite",
                "@id": "https://presalewithuzair.com/#website",
                "url": "https://presalewithuzair.com",
                "name": "Presale With Uzair",
                "description": "Vancouver's premier presale real estate expert",
                "publisher": { "@id": "https://presalewithuzair.com/#person" },
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://presalewithuzair.com/blog?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
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
                  },
                  {
                    "@type": "Question",
                    "name": "What areas does Uzair Muhammad serve?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Uzair serves all of Metro Vancouver and Fraser Valley, including Vancouver, Burnaby, Surrey, Langley, Coquitlam, Richmond, New Westminster, Abbotsford, Port Coquitlam, Port Moody, and North Vancouver."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How do I find the best presale condo in Vancouver?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Work with a presale specialist like Uzair who reviews developer track records, analyzes contracts for red flags, and identifies projects with genuine investment potential rather than marketing hype."
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
        {/* Hero - Bold headline with colorful bokeh */}
        <HeroSection />
        
        {/* Social Proof - "But don't listen to me..." + scrolling testimonials */}
        <SocialProofSection />
        
        {/* Mid-page CTA */}
        <MidPageCTA 
          quote="Uzair told me not to buy two projects I was excited about — and saved me from major issues. That's the kind of honesty you need."
          clientName="Akhi"
          clientRole="First-Time Buyer"
          clientPhoto={akhiPhoto}
        />
        
        {/* Why Work With a Presale Expert */}
        <DifferentiationSection />
        
        {/* Process Steps */}
        <ProcessSection />
        
        {/* Who This Is For */}
        <BookingContextSection />
        
        {/* Blog Preview (desktop only) */}
        <BlogPreviewSection />
        
        {/* Instagram Follow */}
        <InstagramSection />
        
        {/* Final CTA */}
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
};

export default Index;