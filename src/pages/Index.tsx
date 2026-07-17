import { Helmet } from "react-helmet-async";
import { lazy, Suspense, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
const HomeFAQSection = lazy(() => import("@/components/home/HomeFAQSection").then(m => ({ default: m.HomeFAQSection })));
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
        <title>Uzair Muhammad | Fraser Valley's Leading Presale Expert</title>
        <meta
          name="description"
          content="Buyer-only presale & new-construction specialist. 450+ units sold, $200M+ in sales. VIP early access for first-time buyers & investors in Surrey, Langley, Abbotsford & the Fraser Valley."
        />
        <meta name="keywords" content="presale expert Vancouver, presale realtor Vancouver, presale specialist Surrey, presale agent Burnaby, presale condos Langley, new construction condos Vancouver, pre-construction condos BC, Fraser Valley presales, first-time buyer presale, Uzair Muhammad realtor, best presale agent Vancouver, Vancouver condo presales" />
        <link rel="canonical" href="https://presalewithuzair.com/" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://presalewithuzair.com/" />
        <meta property="og:title" content="Uzair Muhammad | Fraser Valley's Leading Presale Expert" />
        <meta property="og:description" content="Buyer-only presale & new-construction specialist. 450+ units sold, $200M+ in sales. VIP early access for first-time buyers & investors in Surrey, Langley, Abbotsford & the Fraser Valley." />
        <meta property="og:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/5CBz3t8hJXQlE60NLFmYURMrWQu2/social-images/social-1775073854345-Screenshot_2026-03-03_at_2.54.42_PM.webp" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Uzair Muhammad | Fraser Valley's Leading Presale Expert" />
        <meta name="twitter:description" content="Buyer-only presale & new-construction specialist. 450+ units sold, $200M+ in sales. VIP early access for first-time buyers & investors in Surrey, Langley, Abbotsford & the Fraser Valley." />
        <meta name="twitter:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/5CBz3t8hJXQlE60NLFmYURMrWQu2/social-images/social-1775073854345-Screenshot_2026-03-03_at_2.54.42_PM.webp" />
        {/* Canonical Person + RealEstateAgent JSON-LD lives in index.html — do not duplicate here */}
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
          <HomeFAQSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <FinalCTASection />
        </Suspense>

        <div className="bg-background py-8 border-t border-border">
          <div className="container-xl px-4 sm:px-6 text-center">
            <p className="text-sm sm:text-base text-foreground/70">
              Buying as an investment rather than a home?{" "}
              <Link to="/services" className="text-primary font-medium underline underline-offset-4 hover:text-primary/80">
                See the investor track
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <Suspense fallback={null}>
        <PresaleGuidePopup />
      </Suspense>
    </>
  );
};

export default Index;
