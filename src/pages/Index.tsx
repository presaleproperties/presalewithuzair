import { Helmet } from "react-helmet-async";
import { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import akhiPhoto from "@/assets/testimonials/akhi.jpg";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";

// Lazy load below-fold sections to reduce initial bundle
const SocialProofSection = lazy(() => import("@/components/home/SocialProofSection").then(m => ({ default: m.SocialProofSection })));
const DifferentiationSection = lazy(() => import("@/components/home/DifferentiationSection").then(m => ({ default: m.DifferentiationSection })));
const ProcessSection = lazy(() => import("@/components/home/ProcessSection").then(m => ({ default: m.ProcessSection })));
const MidPageCTA = lazy(() => import("@/components/home/MidPageCTA").then(m => ({ default: m.MidPageCTA })));
const BookingContextSection = lazy(() => import("@/components/home/BookingContextSection").then(m => ({ default: m.BookingContextSection })));


const FinalCTASection = lazy(() => import("@/components/home/FinalCTASection").then(m => ({ default: m.FinalCTASection })));
const PresaleGuidePopup = lazy(() => import("@/components/home/PresaleGuidePopup").then(m => ({ default: m.PresaleGuidePopup })));
const PresaleGuideBanner = lazy(() => import("@/components/home/PresaleGuideBanner").then(m => ({ default: m.PresaleGuideBanner })));

const SectionFallback = () => <div className="min-h-[200px]" />;

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scrollTarget = params.get('scroll');
    if (scrollTarget) {
      // Small delay to allow lazy sections to load
      const timer = setTimeout(() => {
        document.getElementById(scrollTarget)?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [location.search]);

  return (
    <>
      <Helmet>
        <title>Fraser Valley's Leading Presale Expert | Uzair Muhammad</title>
        <meta
          name="description"
          content="Fraser Valley's #1 presale agent. Helping first-time buyers and investors buy new construction condos and townhomes in Surrey, Langley, Abbotsford, and Chilliwack with VIP access, exclusive incentives, and full contract protection. Zero developer bias."
        />
        <meta name="keywords" content="presale expert Vancouver, presale realtor Vancouver, presale specialist Surrey, presale agent Burnaby, presale condos Langley, new construction condos Vancouver, pre-construction condos BC, Fraser Valley presales, first-time buyer presale, Uzair Muhammad realtor, best presale agent Vancouver, Vancouver condo presales" />
        <link rel="canonical" href="https://presalewithuzair.com/" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://presalewithuzair.com/" />
        <meta property="og:title" content="Fraser Valley's Leading Presale Expert | Uzair Muhammad" />
        <meta property="og:description" content="Fraser Valley's #1 presale agent. Helping first-time buyers and investors buy new construction condos and townhomes in Surrey, Langley, Abbotsford, and Chilliwack with VIP access, exclusive incentives, and full contract protection." />
        <meta property="og:image" content="https://presalewithuzair.com/og-image.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Fraser Valley's Leading Presale Expert | Uzair Muhammad" />
        <meta name="twitter:description" content="Fraser Valley's #1 presale agent. VIP access, exclusive incentives, and full contract protection for first-time buyers and investors." />
        <meta name="twitter:image" content="https://presalewithuzair.com/og-image.jpg" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            "name": "Uzair Muhammad",
            "url": "https://presalewithuzair.com",
            "logo": "https://presalewithuzair.com/favicon.jpeg",
            "image": "https://presalewithuzair.com/favicon.jpeg",
            "description": "Fraser Valley's leading presale expert helping first-time buyers and investors buy new construction condos and townhomes in Surrey, Langley, Abbotsford, and Chilliwack with VIP access, exclusive incentives, and full contract protection.",
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
            "areaServed": [
              "Surrey", "Langley", "Abbotsford", "Chilliwack", "Maple Ridge", "Coquitlam", "Fraser Valley"
            ],
            "sameAs": [
              "https://www.instagram.com/presalewithuzair",
              "https://www.tiktok.com/@presalewithuzair"
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "reviewCount": "31"
            }
          })}
        </script>
      </Helmet>

      <Navbar />
      <main>
        {/* Hero - loads immediately (above fold) */}
        <HeroSection />
        
        {/* Below-fold sections lazy loaded */}
        <Suspense fallback={<SectionFallback />}>
          <SocialProofSection />
        </Suspense>
        
        <Suspense fallback={<SectionFallback />}>
          <MidPageCTA 
            quote="I've been working with Uzair for nearly three years now and would highly recommend him for any property purchase or sale. He's consistent, reliable, and great to work with."
            clientName="Akhi"
            clientRole="First-Time Buyer"
            clientPhoto={akhiPhoto}
          />
        </Suspense>
        
        <Suspense fallback={<SectionFallback />}>
          <DifferentiationSection />
        </Suspense>
        
        <Suspense fallback={<SectionFallback />}>
          <ProcessSection />
        </Suspense>
        
        <Suspense fallback={<SectionFallback />}>
          <PresaleGuideBanner />
        </Suspense>
        
        <Suspense fallback={<SectionFallback />}>
          <BookingContextSection />
        </Suspense>
        
        
        <Suspense fallback={<SectionFallback />}>
          <FinalCTASection />
        </Suspense>
      </main>
      <Footer />
      <Suspense fallback={null}>
        <PresaleGuidePopup />
      </Suspense>
    </>
  );
};

export default Index;
