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
        <title>Presale & New Condos Fraser Valley | Uzair Muhammad</title>
        <meta
          name="description"
          content="Fraser Valley's leading presale agent. VIP access to new condos & townhomes — with you from project to keys, at $0 cost. English · Punjabi · Hindi · Urdu."
        />
        <meta name="keywords" content="presale expert Vancouver, presale realtor Vancouver, presale specialist Surrey, presale agent Burnaby, presale condos Langley, new construction condos Vancouver, pre-construction condos BC, Fraser Valley presales, first-time buyer presale, Uzair Muhammad realtor, best presale agent Vancouver, Vancouver condo presales" />
        <link rel="canonical" href="https://presalewithuzair.com/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://presalewithuzair.com/" />
        <meta property="og:title" content="Presale & New Condos Fraser Valley | Uzair Muhammad" />
        <meta property="og:description" content="Fraser Valley's leading presale agent. VIP access to new condos & townhomes — with you from project to keys, at $0 cost. English · Punjabi · Hindi · Urdu." />
        <meta property="og:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/5CBz3t8hJXQlE60NLFmYURMrWQu2/social-images/social-1775073854345-Screenshot_2026-03-03_at_2.54.42_PM.webp" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Presale & New Condos Fraser Valley | Uzair Muhammad" />
        <meta name="twitter:description" content="Fraser Valley's leading presale agent. VIP access to new condos & townhomes — with you from project to keys, at $0 cost. English · Punjabi · Hindi · Urdu." />
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

      </main>

      <Footer />
      <PresaleGuidePopup />
    </>
  );
};

export default Index;
