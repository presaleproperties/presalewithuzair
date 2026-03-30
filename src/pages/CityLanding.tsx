import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProjectGrid } from "@/components/ProjectGrid";
import { LeadCaptureSection } from "@/components/home/LeadCaptureSection";
import { CheckCircle, TrendingUp, Shield, MapPin } from "lucide-react";

interface CityConfig {
  city: string;
  slug: string;
  heroImage: string;
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
    metaDescription: "Looking for presale condos in Surrey, BC? Get VIP access to new construction projects, exclusive developer incentives, and expert buyer representation.",
    heroEyebrow: "SURREY PRESALE CONDOS & TOWNHOMES",
    heroHeadline: "Get VIP Access to Surrey's Best Presale Condos.",
    heroSubheadline: "New Construction. Early Pricing. Full Contract Protection.",
    heroBody: "Surrey is the fastest-growing city in BC, and the presale market moves fast. Whether you're looking in Surrey City Centre, Fleetwood, or South Surrey, I get you in before the public launch. Secure the best floor plans, exclusive developer incentives, and bulletproof contract protection.",
    heroCta: "Get Surrey VIP Access",
    whyBuyTitle: "Why Invest in Surrey New Construction?",
    whyBuyBody: "With the upcoming SkyTrain extension and massive infrastructure investments, Surrey offers the strongest appreciation potential in the Fraser Valley. But not every project is a good deal. I analyze the developer's track record, the deposit structure, and the assignment clauses to ensure your investment is protected.",
    benefits: [
      { icon: <TrendingUp className="h-6 w-6" />, title: "SkyTrain Expansion", description: "The Surrey-Langley SkyTrain extension is driving massive appreciation along the corridor." },
      { icon: <Shield className="h-6 w-6" />, title: "Contract Protection", description: "Every developer contract is reviewed line-by-line to protect your deposit and your rights." },
      { icon: <CheckCircle className="h-6 w-6" />, title: "VIP Pricing & First Access", description: "Get access to Surrey presales before the general public — with exclusive incentives." },
      { icon: <MapPin className="h-6 w-6" />, title: "Local Expertise", description: "Deep knowledge of every Surrey neighbourhood — City Centre, Fleetwood, South Surrey." },
    ],
  },
  langley: {
    city: "Langley",
    slug: "langley",
    title: "Presale Townhomes Langley BC | New Construction 2026 | Uzair Muhammad",
    metaDescription: "Find the best presale townhomes and condos in Langley, BC. Get VIP access to Willoughby and Latimer Heights new construction projects before public launch.",
    heroEyebrow: "LANGLEY PRESALE TOWNHOMES & CONDOS",
    heroHeadline: "Secure Your Langley Presale Townhome Before the Public.",
    heroSubheadline: "VIP Access to Willoughby, Latimer Heights, and Central Langley.",
    heroBody: "Langley is the top destination for Fraser Valley families and investors looking for space and growth. I provide expert buyer's representation for Langley's most sought-after new construction townhomes and condos. Get the right deal, with zero developer bias.",
    heroCta: "Get Langley VIP Access",
    whyBuyTitle: "The Langley Presale Advantage",
    whyBuyBody: "Langley offers a perfect mix of family-friendly communities and rapid transit development. As developers build out Willoughby and the upcoming SkyTrain corridor, getting in early is critical. I help you navigate the hype, negotiate the best terms, and secure a home that fits your financial goals.",
    benefits: [
      { icon: <TrendingUp className="h-6 w-6" />, title: "Family-Friendly Growth Hub", description: "Top-ranked schools, parks, and community amenities make Langley a top choice." },
      { icon: <Shield className="h-6 w-6" />, title: "Full Contract Review", description: "Every purchase agreement is reviewed to ensure your deposit is protected and terms are fair." },
      { icon: <CheckCircle className="h-6 w-6" />, title: "Townhome Specialist", description: "Langley is townhome country — I know every project, developer, and neighbourhood." },
      { icon: <MapPin className="h-6 w-6" />, title: "Neighbourhood Expertise", description: "Willoughby, Latimer Heights, Murrayville, Brookswood — deep local knowledge." },
    ],
  },
  abbotsford: {
    city: "Abbotsford",
    slug: "abbotsford",
    title: "Presale Condos Abbotsford BC | New Developments 2026 | Uzair Muhammad",
    metaDescription: "Discover 2026 presale condos and townhomes in Abbotsford, BC. Expert buyer's agent offering VIP access, floor plans, and pricing for new developments.",
    heroEyebrow: "ABBOTSFORD PRESALE CONDOS & TOWNHOMES",
    heroHeadline: "Abbotsford's Top Presale Condos and New Developments.",
    heroSubheadline: "Investor-Grade Advice. First-Time Buyer Focus.",
    heroBody: "Abbotsford is the Fraser Valley's hidden gem for new construction. From the University District to Historic Downtown, I help you identify the most profitable presale opportunities. Get early access to pricing, floor plans, and exclusive incentives before they hit the MLS.",
    heroCta: "Get Abbotsford VIP Access",
    whyBuyTitle: "Why Abbotsford is the Smart Play for 2026",
    whyBuyBody: "With lower entry prices than Surrey and Langley, Abbotsford offers incredible value for both first-time buyers and cash-flow investors. I vet every Abbotsford developer and read every contract line-by-line so you can invest with absolute confidence.",
    benefits: [
      { icon: <TrendingUp className="h-6 w-6" />, title: "Best Value in the Valley", description: "Lower entry prices with strong appreciation potential as the city grows." },
      { icon: <Shield className="h-6 w-6" />, title: "Buyer Protection First", description: "Contract review, deposit protection, and full transparency — your interests come first." },
      { icon: <CheckCircle className="h-6 w-6" />, title: "Early Access Pricing", description: "Get into Abbotsford presales at launch pricing before prices rise." },
      { icon: <MapPin className="h-6 w-6" />, title: "Growing Urban Core", description: "University District and Downtown are transforming with new developments." },
    ],
  },
  chilliwack: {
    city: "Chilliwack",
    slug: "chilliwack",
    title: "Presale Condos Chilliwack BC | New Construction | Uzair Muhammad",
    metaDescription: "VIP access to presale condos and townhomes in Chilliwack, BC. Fraser Valley's leading presale expert helps you find the best new construction deals.",
    heroEyebrow: "CHILLIWACK PRESALE CONDOS & TOWNHOMES",
    heroHeadline: "Chilliwack Presales: Maximum Value, Zero Hype.",
    heroSubheadline: "VIP Access to the Fraser Valley's Most Affordable New Construction.",
    heroBody: "Chilliwack is rapidly transforming, offering some of the best price-per-square-foot value in BC. I help you navigate the Chilliwack presale market, ensuring you buy into quality projects with reputable developers.",
    heroCta: "Get Chilliwack VIP Access",
    whyBuyTitle: "Why Chilliwack Presales Are Worth Watching",
    whyBuyBody: "Chilliwack offers the most affordable new construction entry point in the Fraser Valley. As infrastructure and population grow, early buyers stand to benefit the most. I ensure you're buying quality — not just price.",
    benefits: [
      { icon: <TrendingUp className="h-6 w-6" />, title: "Most Affordable Entry Point", description: "The lowest presale prices in the Fraser Valley with significant upside." },
      { icon: <Shield className="h-6 w-6" />, title: "Developer Vetting", description: "Every contract is reviewed to protect your interests — no surprises at completion." },
      { icon: <CheckCircle className="h-6 w-6" />, title: "First-Mover Advantage", description: "Get into Chilliwack's best new projects before they sell out." },
      { icon: <MapPin className="h-6 w-6" />, title: "Lifestyle + Investment", description: "Mountain views, outdoor recreation, and a growing downtown core." },
    ],
  },
  "maple-ridge": {
    city: "Maple Ridge",
    slug: "maple-ridge",
    title: "Presale Condos Maple Ridge BC | New Homes | Uzair Muhammad",
    metaDescription: "Find the best presale condos and new construction homes in Maple Ridge, BC. VIP access, contract protection, and expert buyer representation.",
    heroEyebrow: "MAPLE RIDGE PRESALE CONDOS & TOWNHOMES",
    heroHeadline: "Maple Ridge Presales and New Construction.",
    heroSubheadline: "Expert Guidance for First-Time Buyers and Investors.",
    heroBody: "Maple Ridge offers incredible lifestyle and investment potential. I get you VIP access to the best new condo and townhome developments, protecting your deposit and your future.",
    heroCta: "Get Maple Ridge VIP Access",
    whyBuyTitle: "Why Buy a Presale in Maple Ridge",
    whyBuyBody: "Maple Ridge combines mountain lifestyle with urban convenience. Growing demand, limited supply, and improving infrastructure make it a strong long-term play for presale buyers.",
    benefits: [
      { icon: <TrendingUp className="h-6 w-6" />, title: "Strong Appreciation Potential", description: "Growing demand and limited supply are driving long-term value." },
      { icon: <Shield className="h-6 w-6" />, title: "Full Buyer Protection", description: "Contract review, deposit protection, and independent advice." },
      { icon: <CheckCircle className="h-6 w-6" />, title: "VIP Project Access", description: "First access to Maple Ridge's best new developments with exclusive pricing." },
      { icon: <MapPin className="h-6 w-6" />, title: "Nature + Convenience", description: "Mountain trails, river parks, and West Coast Express access." },
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
                {config.heroEyebrow}
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black leading-[1.08] text-foreground mb-4 animate-fade-up">
                {config.heroHeadline}
              </h1>
              <h2 className="font-display text-xl md:text-2xl text-foreground/50 mb-4 animate-fade-up">
                {config.heroSubheadline}
              </h2>
              <div className="w-14 h-[2px] rounded-full mb-6 animate-fade-up" style={{ background: "var(--text-gradient)" }} />
              <p className="text-lg text-foreground/60 max-w-2xl leading-relaxed mb-8 animate-fade-up">
                {config.heroBody}
              </p>
              <button
                onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-foreground/80 text-foreground bg-transparent hover:bg-foreground hover:text-background font-semibold text-base transition-all duration-300 animate-fade-up"
              >
                {config.heroCta}
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
            <div className="mb-12 max-w-3xl">
              <p className="section-label mb-3">Why {config.city}</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
                {config.whyBuyTitle}
              </h2>
              <p className="text-foreground/70 leading-relaxed">
                {config.whyBuyBody}
              </p>
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
