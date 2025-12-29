import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Target, Users, TrendingUp, BarChart3, Lightbulb, CheckCircle } from "lucide-react";
import { useCalendly } from "@/hooks/useCalendly";

const advisoryServices = [
  {
    icon: Target,
    title: "Pricing & Unit Mix Strategy",
    description: "Data-driven pricing recommendations based on investor criteria, market comparables, and absorption velocity targets.",
  },
  {
    icon: Users,
    title: "Buyer Psychology & Positioning",
    description: "Understanding what drives presale buyers — from first-time buyers seeking value to investors seeking leverage and exit flexibility.",
  },
  {
    icon: BarChart3,
    title: "Absorption & Launch Sequencing",
    description: "Phased release strategies that build momentum, create urgency, and optimize revenue across the sales cycle.",
  },
  {
    icon: Lightbulb,
    title: "Realtor Engagement Strategy",
    description: "Training and incentive structures that get realtors engaged and bringing qualified buyers to your launches.",
  },
];

const outcomes = [
  {
    metric: "40%",
    label: "Faster Absorption",
    description: "Achieved on a 180-unit project through pricing adjustments and realtor education.",
  },
  {
    metric: "1,000+",
    label: "Realtors Trained",
    description: "Through Vancouver Presale Expo — the largest presale education event in BC.",
  },
  {
    metric: "$200M+",
    label: "Presales Closed",
    description: "Direct experience with buyer behavior across Vancouver, Surrey, Langley, and Fraser Valley.",
  },
];

const Developers = () => {
  const { openCalendly } = useCalendly();

  return (
    <>
      <Helmet>
        <title>Presale Consultant for Developers | Launch Strategy & Advisory | Uzair Muhammad</title>
        <meta
          name="description"
          content="Strategic presale advisory for developers in Vancouver and BC. Pricing strategy, buyer psychology, absorption optimization, and launch sequencing. Not just marketing — real strategy."
        />
        <meta name="keywords" content="presale consultant for developers, presale launch strategy, condo project advisory BC, developer advisory Vancouver, presale pricing strategy, absorption optimization" />
        <link rel="canonical" href="https://presalewithuzair.com/developers" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Developer Presale Advisory",
            "provider": {
              "@type": "Person",
              "name": "Uzair Muhammad"
            },
            "description": "Strategic presale advisory for developers including pricing strategy, buyer psychology, and launch sequencing.",
            "areaServed": {
              "@type": "AdministrativeArea",
              "name": "British Columbia"
            }
          })}
        </script>
      </Helmet>

      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative py-32 bg-gradient-to-br from-background via-background to-secondary/30">
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />

          <div className="container-xl relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium text-primary">Developer Advisory</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl xl:text-6xl font-bold leading-[1.1] mb-6">
                <span className="text-foreground">Presale Strategy & Advisory</span>{" "}
                <span className="text-gradient">for Developers</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8">
                Pricing, positioning, and buyer strategy — not just marketing. Strategic advisory that helps developers de-risk launches and accelerate absorption.
              </p>

              <Button variant="hero" size="xl" className="gap-2" onClick={openCalendly}>
                <Phone className="h-5 w-5" />
                Discuss a Presale Advisory Engagement
              </Button>
            </div>
          </div>
        </section>

        {/* Why Advisory Matters */}
        <section className="py-24 bg-background">
          <div className="container-xl">
            <div className="max-w-3xl mb-16">
              <p className="section-label mb-4">The Problem</p>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Why Launches <span className="text-gradient">Stall</span>
              </h2>
              <p className="text-foreground/70">
                Most presale launches underperform not because of the product — but because of misalignment between pricing, buyer expectations, and realtor engagement.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-card rounded-xl border border-border">
                <p className="text-sm font-medium text-foreground/60 uppercase tracking-wider mb-3">Common Issues</p>
                <ul className="space-y-3">
                  {[
                    "Pricing misaligned with investor ROI expectations",
                    "Slow absorption due to lack of realtor buy-in",
                    "No feedback loop from end buyers",
                    "Generic marketing that doesn't differentiate",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-destructive/60 mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 bg-primary/5 rounded-xl border border-primary/10">
                <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">What Uzair Brings</p>
                <ul className="space-y-3">
                  {[
                    "Direct insight into what buyers and investors actually want",
                    "Realtor network and training expertise",
                    "Pricing strategy based on real market feedback",
                    "Launch sequencing that builds momentum",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-foreground/80">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Advisory Services */}
        <section className="py-24 bg-card">
          <div className="container-xl">
            <div className="text-center mb-16">
              <p className="section-label mb-4">Advisory Services</p>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground">
                How Uzair <span className="text-gradient">Helps Developers</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {advisoryServices.map((service) => (
                <div
                  key={service.title}
                  className="bg-background rounded-2xl border border-border p-8 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Proof / Outcomes */}
        <section className="py-24 bg-background">
          <div className="container-xl">
            <div className="text-center mb-16">
              <p className="section-label mb-4">Track Record</p>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground">
                Proven <span className="text-gradient">Results</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {outcomes.map((outcome) => (
                <div
                  key={outcome.label}
                  className="text-center p-8 bg-card rounded-2xl border border-border"
                >
                  <p className="text-4xl font-display font-bold text-gradient mb-2">{outcome.metric}</p>
                  <p className="font-semibold text-foreground mb-2">{outcome.label}</p>
                  <p className="text-sm text-muted-foreground">{outcome.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Advisory vs Brokerage */}
        <section className="py-24 bg-card">
          <div className="container-xl">
            <div className="max-w-3xl mx-auto text-center">
              <p className="section-label mb-4">A Different Approach</p>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Advisory vs Traditional <span className="text-gradient">Brokerage</span>
              </h2>
              <p className="text-foreground/70 mb-8">
                Uzair doesn't just market units — he provides strategic insight that shapes pricing, positioning, and launch execution. This is advisory work, not sales work.
              </p>
              <Button variant="hero" size="xl" className="gap-2" onClick={openCalendly}>
                <Phone className="h-5 w-5" />
                Discuss a Presale Advisory Engagement
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Developers;
