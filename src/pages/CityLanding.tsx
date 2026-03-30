import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProjectGrid } from "@/components/ProjectGrid";
import { LeadCaptureSection } from "@/components/home/LeadCaptureSection";
import { CheckCircle, TrendingUp, Shield, MapPin } from "lucide-react";

interface CityConfig {
  city: string;
  slug: string;
  title: string;
  metaDescription: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroBody: string;
  heroCta: string;
  whyBuyTitle: string;
  whyBuyBody: string;
  benefits: { icon: React.ReactNode; title: string; description: string }[];
}

const CITY_CONFIGS: Record<string, CityConfig> = {
  surrey: {
    city: "Surrey",
    slug: "surrey",
    title: "Presale Condos Surrey BC | VIP Access & New Construction | Uzair Muhammad",
    metaDescription: "Get VIP access to presale condos and townhomes in Surrey, BC. Expert guidance on new construction from Fraser Valley's leading presale specialist. First access, best pricing, full contract protection.",
    heroHeadline: "Surrey's Presale Market Is Booming.",
    heroSubheadline: "Make Sure You're Not Overpaying.",
    heroBody: "Surrey is the fastest-growing city in BC with billions in new transit, infrastructure, and housing projects. But not every presale is a smart buy. I help you get into the right project — at the best price, with full contract protection.",
    benefits: [
      { icon: <TrendingUp className="h-6 w-6" />, title: "Fastest-Growing City in BC", description: "SkyTrain expansion, new city centre, and massive population growth are driving demand and long-term value." },
      { icon: <Shield className="h-6 w-6" />, title: "Contract Protection", description: "Every developer contract is reviewed line-by-line to protect your deposit and your rights as a buyer." },
      { icon: <CheckCircle className="h-6 w-6" />, title: "VIP Pricing & First Access", description: "Get access to Surrey presales before the general public — with exclusive incentives and pricing." },
      { icon: <MapPin className="h-6 w-6" />, title: "Local Expertise", description: "Deep knowledge of every Surrey neighbourhood — from Fleetwood to South Surrey to City Centre." },
    ],
  },
  langley: {
    city: "Langley",
    slug: "langley",
    title: "Presale Townhomes Langley BC | New Construction 2026 | Uzair Muhammad",
    metaDescription: "Find presale townhomes and condos in Langley, BC. VIP access to new construction projects with expert guidance. First access, negotiated incentives, and full buyer protection.",
    heroHeadline: "Langley's Best New Townhomes & Condos.",
    heroSubheadline: "First Access. Best Price. Full Protection.",
    heroBody: "Langley is one of BC's most desirable suburbs for families and investors alike. From Willoughby to Murrayville, I help you navigate the presale market with VIP access, exclusive incentives, and unbiased advice.",
    benefits: [
      { icon: <TrendingUp className="h-6 w-6" />, title: "Family-Friendly Growth Hub", description: "Top-ranked schools, parks, and community amenities make Langley a top choice for families and investors." },
      { icon: <Shield className="h-6 w-6" />, title: "Full Contract Review", description: "Every purchase agreement is reviewed to ensure your deposit is protected and terms are fair." },
      { icon: <CheckCircle className="h-6 w-6" />, title: "Townhome Specialist", description: "Langley is townhome country — I know every project, every developer, and every neighbourhood." },
      { icon: <MapPin className="h-6 w-6" />, title: "Neighbourhood Expertise", description: "Willoughby, Willowbrook, Murrayville, Brookswood — I know the nuances of each Langley community." },
    ],
  },
  abbotsford: {
    city: "Abbotsford",
    slug: "abbotsford",
    title: "Presale Condos Abbotsford BC | New Developments 2026 | Uzair Muhammad",
    metaDescription: "Discover presale condos and townhomes in Abbotsford, BC. Get VIP access to new developments with expert presale guidance. Best pricing, contract protection, and unbiased advice.",
    heroHeadline: "Abbotsford Presales Are Heating Up.",
    heroSubheadline: "Get In Early — Before Prices Catch Up.",
    heroBody: "Abbotsford offers some of the best value in the Fraser Valley for presale buyers. With new developments launching regularly, I help you identify the right project and negotiate the best deal — with full contract protection.",
    benefits: [
      { icon: <TrendingUp className="h-6 w-6" />, title: "Best Value in the Valley", description: "Lower entry prices with strong appreciation potential as the city continues to grow and develop." },
      { icon: <Shield className="h-6 w-6" />, title: "Buyer Protection First", description: "Contract review, deposit protection, and full transparency — your interests come first." },
      { icon: <CheckCircle className="h-6 w-6" />, title: "Early Access Pricing", description: "Get into Abbotsford presales at launch pricing before the general public and prices rise." },
      { icon: <MapPin className="h-6 w-6" />, title: "Growing Urban Core", description: "Downtown Abbotsford is transforming with new transit, amenities, and mixed-use developments." },
    ],
  },
  chilliwack: {
    city: "Chilliwack",
    slug: "chilliwack",
    title: "Presale Condos Chilliwack BC | New Construction 2026 | Uzair Muhammad",
    metaDescription: "Explore presale condos and townhomes in Chilliwack, BC. Expert guidance on new construction with VIP access, best pricing, and contract protection from Fraser Valley's top presale specialist.",
    heroHeadline: "Chilliwack: The Fraser Valley's Hidden Gem.",
    heroSubheadline: "Smart Buyers Are Getting in Early.",
    heroBody: "Chilliwack offers the most affordable entry point in the Fraser Valley with strong growth fundamentals. I help buyers and investors find the right presale project — with VIP pricing and full contract protection.",
    benefits: [
      { icon: <TrendingUp className="h-6 w-6" />, title: "Most Affordable Entry Point", description: "The lowest presale prices in the Fraser Valley with significant upside as the city grows." },
      { icon: <Shield className="h-6 w-6" />, title: "Developer Contract Review", description: "Every contract is reviewed to protect your interests — no surprises at completion." },
      { icon: <CheckCircle className="h-6 w-6" />, title: "First-Mover Advantage", description: "Get into Chilliwack's best new projects before they sell out at launch pricing." },
      { icon: <MapPin className="h-6 w-6" />, title: "Lifestyle + Investment", description: "Mountain views, outdoor recreation, and a growing downtown core — lifestyle and value combined." },
    ],
  },
  "maple-ridge": {
    city: "Maple Ridge",
    slug: "maple-ridge",
    title: "Presale Condos Maple Ridge BC | New Townhomes 2026 | Uzair Muhammad",
    metaDescription: "Find presale condos and townhomes in Maple Ridge, BC. VIP access to new construction projects with expert guidance, negotiated incentives, and full buyer protection.",
    heroHeadline: "Maple Ridge: Where Nature Meets New Construction.",
    heroSubheadline: "Premium Presales at Fraser Valley Prices.",
    heroBody: "Maple Ridge offers a unique blend of mountain lifestyle and urban convenience. With new presale projects launching across the city, I help you find the right fit — at the best price, with full contract protection.",
    benefits: [
      { icon: <TrendingUp className="h-6 w-6" />, title: "Strong Appreciation Potential", description: "Growing demand, limited supply, and improving infrastructure are driving long-term value." },
      { icon: <Shield className="h-6 w-6" />, title: "Full Buyer Protection", description: "Contract review, deposit protection, and independent advice — always in your corner." },
      { icon: <CheckCircle className="h-6 w-6" />, title: "VIP Project Access", description: "Get first access to Maple Ridge's best new developments with exclusive pricing." },
      { icon: <MapPin className="h-6 w-6" />, title: "Nature + Convenience", description: "Mountain trails, river parks, and West Coast Express access — the best of both worlds." },
    ],
  },
};

interface CityLandingProps {
  citySlug: string;
}

const CityLanding = ({ citySlug }: CityLandingProps) => {
  const config = CITY_CONFIGS[citySlug];

  if (!config) return null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Uzair Muhammad",
    description: config.metaDescription,
    url: `https://presalewithuzair.com/${config.slug}`,
    areaServed: { "@type": "City", name: config.city, containedInPlace: { "@type": "AdministrativeArea", name: "British Columbia" } },
    priceRange: "$$",
    telephone: "+1-778-231-3592",
    address: { "@type": "PostalAddress", addressLocality: config.city, addressRegion: "BC", addressCountry: "CA" },
  };

  return (
    <>
      <Helmet>
        <title>{config.title}</title>
        <meta name="description" content={config.metaDescription} />
        <link rel="canonical" href={`https://presalewithuzair.com/${config.slug}`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://presalewithuzair.com/${config.slug}`} />
        <meta property="og:title" content={config.title} />
        <meta property="og:description" content={config.metaDescription} />
        <meta property="og:image" content="https://presalewithuzair.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={config.title} />
        <meta name="twitter:description" content={config.metaDescription} />
        <meta name="twitter:image" content="https://presalewithuzair.com/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <Navbar />

      <main>
        {/* ── Hero Section ── */}
        <section className="dark-section relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />
          <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "var(--text-gradient)" }} />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-[10%] w-48 h-48 rounded-full bg-primary/15 blur-3xl" />
            <div className="absolute bottom-20 right-[10%] w-40 h-40 rounded-full bg-primary/10 blur-3xl" />
          </div>

          <div className="relative z-10 container-xl px-4 sm:px-6">
            <div className="max-w-3xl">
              <p className="text-xs font-black tracking-[0.25em] uppercase mb-4 animate-fade-up" style={{ color: "hsl(230 70% 60%)" }}>
                {config.city} Presales · Fraser Valley
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black leading-[1.08] text-foreground mb-4 animate-fade-up">
                {config.heroHeadline}
                <br />
                <span className="text-foreground/50">{config.heroSubheadline}</span>
              </h1>
              <div className="w-14 h-[2px] rounded-full mb-6 animate-fade-up" style={{ background: "var(--text-gradient)" }} />
              <p className="text-lg text-foreground/60 max-w-2xl leading-relaxed mb-8 animate-fade-up">
                {config.heroBody}
              </p>
              <button
                onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-foreground/80 text-foreground bg-transparent hover:bg-foreground hover:text-background font-semibold text-base transition-all duration-300 animate-fade-up"
              >
                Get VIP Access — It's Free
              </button>
            </div>
          </div>
        </section>

        {/* ── Active Projects Section ── */}
        <section className="py-16 sm:py-24 bg-background">
          <div className="container-xl px-4 sm:px-6">
            <div className="mb-12">
              <p className="section-label mb-3">Active Projects</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                {config.city} <span className="text-gradient">Presales</span>
              </h2>
              <p className="mt-3 text-foreground/70 max-w-xl">
                Current and upcoming presale condos and townhomes in {config.city}. Get VIP access and exclusive incentives.
              </p>
            </div>
            <ProjectGrid city={config.city} />
          </div>
        </section>

        {/* ── Why Buy Here Section ── */}
        <section className="py-16 sm:py-24" style={{ background: "hsl(var(--card))" }}>
          <div className="container-xl px-4 sm:px-6">
            <div className="mb-12 text-center">
              <p className="section-label mb-3">Why {config.city}</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                Why Buy a Presale in <span className="text-gradient">{config.city}</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {config.benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="stat-card p-6 rounded-xl"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Lead Capture CTA ── */}
        <section id="book-section">
          <LeadCaptureSection />
        </section>
      </main>

      <Footer />
    </>
  );
};

export default CityLanding;
