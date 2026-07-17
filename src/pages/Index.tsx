import { Helmet } from "react-helmet-async";
import { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { PresaleGuidePopup } from "@/components/home/PresaleGuidePopup";

// Lazy load below-fold sections to reduce initial bundle
const SocialProofSection = lazy(() => import("@/components/home/SocialProofSection").then(m => ({ default: m.SocialProofSection })));
const DifferentiationSection = lazy(() => import("@/components/home/DifferentiationSection").then(m => ({ default: m.DifferentiationSection })));
const ProcessSection = lazy(() => import("@/components/home/ProcessSection").then(m => ({ default: m.ProcessSection })));

const BookingContextSection = lazy(() => import("@/components/home/BookingContextSection").then(m => ({ default: m.BookingContextSection })));


const FinalCTASection = lazy(() => import("@/components/home/FinalCTASection").then(m => ({ default: m.FinalCTASection })));
const HomeFAQSection = lazy(() => import("@/components/home/HomeFAQSection").then(m => ({ default: m.HomeFAQSection })));
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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('open-guide') === '1') {
      const timer = setTimeout(() => {
        window.dispatchEvent(new CustomEvent('open-presale-guide'));
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [location.search]);

  return (
    <>
      <Helmet>
        <title>Fraser Valley Presale Advisor | Uzair Muhammad</title>
        <meta
          name="description"
          content="Presale advice before you sign. Buyer-side guidance for new condos, townhomes, and homes across Surrey, Langley, Delta, South Surrey, Abbotsford, and the Fraser Valley."
        />
        <meta name="keywords" content="presale expert Vancouver, presale realtor Vancouver, presale specialist Surrey, presale agent Burnaby, presale condos Langley, new construction condos Vancouver, pre-construction condos BC, Fraser Valley presales, first-time buyer presale, Uzair Muhammad realtor, best presale agent Vancouver, Vancouver condo presales" />
        <link rel="canonical" href="https://presalewithuzair.com/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://presalewithuzair.com/" />
        <meta property="og:title" content="Fraser Valley Presale Advisor | Uzair Muhammad" />
        <meta property="og:description" content="Presale advice before you sign. Buyer-side guidance for new condos, townhomes, and homes across Surrey, Langley, Delta, South Surrey, Abbotsford, and the Fraser Valley." />
        <meta property="og:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/5CBz3t8hJXQlE60NLFmYURMrWQu2/social-images/social-1775073854345-Screenshot_2026-03-03_at_2.54.42_PM.webp" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Fraser Valley Presale Advisor | Uzair Muhammad" />
        <meta name="twitter:description" content="Presale advice before you sign. Buyer-side guidance for new condos, townhomes, and homes across Surrey, Langley, Delta, South Surrey, Abbotsford, and the Fraser Valley." />
        <meta name="twitter:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/5CBz3t8hJXQlE60NLFmYURMrWQu2/social-images/social-1775073854345-Screenshot_2026-03-03_at_2.54.42_PM.webp" />
        {/* Canonical Person + RealEstateAgent JSON-LD lives in index.html — do not duplicate here */}
      </Helmet>

      <Navbar />
      <main>
        {/* Hero - loads immediately (above fold) */}
        <HeroSection />
        
        {/* Below-fold sections lazy loaded */}
        {/* 1. Trust: what clients say */}
        <Suspense fallback={<SectionFallback />}>
          <SocialProofSection />
        </Suspense>

        {/* 2. Why Uzair (positioning) */}
        <Suspense fallback={<SectionFallback />}>
          <DifferentiationSection />
        </Suspense>

        {/* 3. How it works */}
        <Suspense fallback={<SectionFallback />}>
          <ProcessSection />
        </Suspense>

        {/* 4. Answers to common buyer questions */}
        <Suspense fallback={<SectionFallback />}>
          <HomeFAQSection />
        </Suspense>

        {/* 5. Free lead magnet */}
        <Suspense fallback={<SectionFallback />}>
          <PresaleGuideBanner />
        </Suspense>

        {/* 6. Book a call */}
        <Suspense fallback={<SectionFallback />}>
          <BookingContextSection />
        </Suspense>

        {/* 7. Final CTA */}
        <Suspense fallback={<SectionFallback />}>
          <FinalCTASection />
        </Suspense>

      </main>

      <Footer />
      <PresaleGuidePopup />
    </>
  );
};

export default Index;
