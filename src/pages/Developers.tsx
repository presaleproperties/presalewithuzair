import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Target, Users, TrendingUp, BarChart3, Lightbulb, CheckCircle, Building2, DollarSign, Clock, Megaphone } from "lucide-react";
import { useCalCom } from "@/hooks/useCalCom";
import { DeveloperContactForm } from "@/components/forms/DeveloperContactForm";

const advisoryServices = [
  {
    icon: DollarSign,
    title: "Pricing & Unit Mix Strategy",
    description: "Data-driven pricing recommendations based on investor ROI expectations, market comparables, and absorption velocity targets.",
    details: [
      "Competitive market analysis",
      "Investor ROI modeling",
      "Unit mix optimization",
      "Price per sqft benchmarking",
    ],
  },
  {
    icon: Users,
    title: "Buyer Psychology & Positioning",
    description: "Understanding what drives presale buyers — from first-time buyers seeking value to investors seeking leverage and exit flexibility.",
    details: [
      "First-time buyer messaging",
      "Investor value proposition",
      "Deposit structure optimization",
      "Assignment policy guidance",
    ],
  },
  {
    icon: BarChart3,
    title: "Absorption & Launch Sequencing",
    description: "Phased release strategies that build momentum, create urgency, and optimize revenue across the sales cycle.",
    details: [
      "VIP launch strategy",
      "Phase release planning",
      "Urgency creation tactics",
      "Inventory management",
    ],
  },
  {
    icon: Megaphone,
    title: "Realtor Engagement & Training",
    description: "Training and incentive structures that get realtors engaged and bringing qualified buyers to your launches.",
    details: [
      "Realtor education sessions",
      "Commission structures",
      "Co-op incentive programs",
      "Network activation",
    ],
  },
];

const caseStudies = [
  {
    title: "180-Unit Tower — Absorption Accelerated 40%",
    location: "Surrey, BC",
    situation: "Developer launching a 180-unit highrise was experiencing slow initial sales. Realtors weren't engaged, and investor buyers weren't seeing the value proposition clearly.",
    challenge: "15 units/month absorption rate was below projections, creating carrying cost pressure.",
    strategy: [
      "Repriced select unit types based on investor ROI analysis",
      "Created realtor education sessions explaining deposit structures",
      "Brought qualified investor network to exclusive preview",
      "Restructured commission incentives for co-op agents",
    ],
    results: {
      before: "15 units/month",
      after: "21 units/month",
      improvement: "40% faster absorption",
    },
    outcome: "Project achieved target absorption within 6 months, reducing carrying costs and improving overall project economics.",
  },
  {
    title: "Townhome Development — Sold Out in 8 Weeks",
    location: "Langley, BC",
    situation: "42-unit townhome project struggling to differentiate in a crowded Langley market with multiple competing launches.",
    challenge: "Public launch was 3 weeks away with only 8 units reserved from VIP list.",
    strategy: [
      "Repositioned messaging around family lifestyle vs. investment",
      "Adjusted deposit structure to 5% down with extended terms",
      "Targeted first-time buyer marketing through social campaigns",
      "Hosted exclusive broker preview with project walkthrough",
    ],
    results: {
      before: "8 reservations",
      after: "42 units sold",
      improvement: "Sold out in 8 weeks",
    },
    outcome: "Complete sellout before construction completion, enabling developer to secure favorable construction financing.",
  },
  {
    title: "Mixed-Use Project — Investor Repositioning",
    location: "Burnaby, BC",
    situation: "120-unit mixed-use project was positioned for end-users but market conditions favored investor buyers.",
    challenge: "Marketing wasn't resonating with investor audience, and assignment restrictions were deterring sophisticated buyers.",
    strategy: [
      "Restructured assignment policy to allow transfers after 50% construction",
      "Created investor-focused ROI projections and rental yield analysis",
      "Adjusted unit mix to favor smaller, higher-yield floor plans",
      "Engaged investor-focused realtor network through targeted outreach",
    ],
    results: {
      before: "60% sold (stalled)",
      after: "100% sold",
      improvement: "Remaining 40% in 10 weeks",
    },
    outcome: "Project achieved sellout and developer applied learnings to next project launch, achieving 70% presold before construction.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery & Analysis",
    description: "Deep dive into your project, target market, competitive landscape, and current positioning.",
  },
  {
    step: "02",
    title: "Pricing Strategy",
    description: "Data-driven pricing recommendations based on investor expectations and market comparables.",
  },
  {
    step: "03",
    title: "Launch Planning",
    description: "Phased release strategy, VIP structure, and urgency-building tactics.",
  },
  {
    step: "04",
    title: "Realtor Activation",
    description: "Training sessions, incentive structures, and network engagement.",
  },
  {
    step: "05",
    title: "Buyer Network Access",
    description: "Direct access to qualified investor and buyer network for preview events.",
  },
  {
    step: "06",
    title: "Ongoing Advisory",
    description: "Continuous feedback loop and strategy adjustments based on market response.",
  },
];

const Developers = () => {
  const { openCalCom } = useCalCom();

  return (
    <>
      <Helmet>
        <title>Presale Consultant for Developers | Launch Strategy & Advisory | Uzair Muhammad</title>
        <meta
          name="description"
          content="Strategic presale advisory for developers in Vancouver and BC. Pricing strategy, buyer psychology, absorption optimization, and launch sequencing. $200M+ in presales, 300+ units. Not just marketing — real strategy."
        />
        <meta name="keywords" content="presale consultant for developers, presale launch strategy, condo project advisory BC, developer advisory Vancouver, presale pricing strategy, absorption optimization, condo sales strategy" />
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
            "description": "Strategic presale advisory for developers including pricing strategy, buyer psychology, and launch sequencing. $200M+ in presales closed.",
            "areaServed": {
              "@type": "AdministrativeArea",
              "name": "British Columbia"
            }
          })}
        </script>
      </Helmet>

      <Navbar />
      <main>
        {/* Hero Section - Dan Martell Style */}
        <section className="relative min-h-[85vh] overflow-hidden flex items-center">
          {/* Background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />
          
          {/* Colorful bokeh/light effects at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-[40%] pointer-events-none">
            <div className="absolute bottom-20 left-[10%] w-32 h-32 md:w-48 md:h-48 rounded-full bg-pink-500/30 blur-3xl" />
            <div className="absolute bottom-40 left-[5%] w-20 h-20 md:w-32 md:h-32 rounded-full bg-pink-400/40 blur-2xl" />
            <div className="absolute bottom-10 left-[20%] w-16 h-16 md:w-24 md:h-24 rounded-full bg-fuchsia-500/30 blur-xl" />
            <div className="absolute bottom-32 left-[25%] w-24 h-24 md:w-40 md:h-40 rounded-full bg-purple-500/25 blur-3xl" />
            <div className="absolute bottom-16 left-[35%] w-16 h-16 md:w-28 md:h-28 rounded-full bg-violet-400/30 blur-2xl" />
            <div className="absolute bottom-24 right-[20%] w-28 h-28 md:w-44 md:h-44 rounded-full bg-cyan-500/25 blur-3xl" />
            <div className="absolute bottom-8 right-[30%] w-20 h-20 md:w-32 md:h-32 rounded-full bg-teal-400/30 blur-2xl" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent" />
          </div>

          <div className="container-xl relative z-10 px-4 sm:px-6 py-20">
            <div className="max-w-3xl">
              <p className="text-primary font-bold tracking-[0.15em] text-sm mb-4 animate-fade-up">
                DEVELOPER ADVISORY
              </p>

              <h1 className="font-display text-[2.5rem] sm:text-5xl md:text-6xl font-black leading-[1.05] mb-6 animate-fade-up">
                <span className="text-foreground block">LAUNCH YOUR</span>
                <span className="text-foreground block">PRESALE PROJECT</span>
                <span className="text-muted-foreground block">WITH CONFIDENCE</span>
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground mb-4 animate-fade-up">
                <span className="text-foreground font-semibold">Strategic advisory for developers</span>
                {" "}who want pricing, positioning, and buyer strategy — not just marketing.
              </p>

              <p className="text-sm text-muted-foreground mb-8 animate-fade-up">
                De-risk launches, accelerate absorption, and connect with qualified buyers. Direct insight from $200M+ in presale transactions.
              </p>

              <div className="animate-fade-up">
                <Button 
                  variant="outline"
                  size="lg"
                  className="rounded-full border-2 border-foreground/80 text-foreground bg-transparent hover:bg-foreground hover:text-background px-8 py-6 text-base font-semibold gap-2"
                  onClick={() => openCalCom()}
                >
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                  Discuss Advisory Engagement
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Proof Stats */}
        <section className="py-10 sm:py-12 md:py-16 bg-card border-y border-border">
          <div className="container-xl px-4 sm:px-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
              <div>
                <p className="text-2xl sm:text-3xl font-display font-bold text-gradient">$200M+</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Presales Closed</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-display font-bold text-gradient">300+</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Units Sold</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-display font-bold text-gradient">1,000+</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Realtors Trained</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-display font-bold text-gradient">40%</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Faster Absorption</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Advisory Matters */}
        <section className="py-16 md:py-20 lg:py-24 bg-background">
          <div className="container-xl px-4 sm:px-6">
            <div className="max-w-3xl mb-10 md:mb-16">
              <p className="section-label mb-3 sm:mb-4">The Problem</p>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
                Why Launches <span className="text-gradient">Stall</span>
              </h2>
              <p className="text-sm sm:text-base text-foreground/70">
                Most presale launches underperform not because of the product — but because of misalignment between pricing, buyer expectations, and realtor engagement.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <div className="p-4 sm:p-6 bg-card rounded-xl border border-border">
                <p className="text-xs sm:text-sm font-medium text-foreground/60 uppercase tracking-wider mb-3">Common Issues</p>
                <ul className="space-y-2 sm:space-y-3">
                  {[
                    "Pricing misaligned with investor ROI expectations",
                    "Slow absorption due to lack of realtor buy-in",
                    "No feedback loop from end buyers",
                    "Generic marketing that doesn't differentiate",
                    "Assignment policies that deter investors",
                    "Deposit structures that don't match market",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-destructive/60 mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 sm:p-6 bg-primary/5 rounded-xl border border-primary/10">
                <p className="text-xs sm:text-sm font-medium text-primary uppercase tracking-wider mb-3">What Uzair Brings</p>
                <ul className="space-y-2 sm:space-y-3">
                  {[
                    "Direct insight into what buyers and investors want",
                    "Realtor network of 1,000+ trained agents",
                    "Pricing strategy based on real transaction data",
                    "Launch sequencing that builds momentum",
                    "Qualified buyer network for VIP previews",
                    "Ongoing feedback and strategy adjustments",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
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
        <section className="py-16 md:py-20 lg:py-24 bg-card">
          <div className="container-xl px-4 sm:px-6">
            <div className="text-center mb-10 md:mb-16">
              <p className="section-label mb-3 sm:mb-4">Advisory Services</p>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                How Uzair <span className="text-gradient">Helps Developers</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {advisoryServices.map((service) => (
                <div
                  key={service.title}
                  className="bg-background rounded-xl sm:rounded-2xl border border-border p-5 sm:p-6 md:p-8 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-primary/10">
                      <service.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-foreground">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-foreground/80">
                        <CheckCircle className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-16 md:py-20 lg:py-24 bg-background">
          <div className="container-xl px-4 sm:px-6">
            <div className="text-center mb-10 md:mb-16">
              <p className="section-label mb-3 sm:mb-4">Case Studies</p>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Real Projects, <span className="text-gradient">Real Results</span>
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-foreground/70 max-w-2xl mx-auto">
                Anonymized case studies from developer advisory engagements across Metro Vancouver and Fraser Valley.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              {caseStudies.map((study, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 md:p-8 hover:border-primary/20 transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
                    {/* Header */}
                    <div className="lg:w-1/3">
                      <div className="flex items-center gap-2 mb-2 sm:mb-3">
                        <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                        <span className="text-xs sm:text-sm text-primary">{study.location}</span>
                      </div>
                      <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">
                        {study.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">{study.situation}</p>
                      <div className="p-2 sm:p-3 bg-destructive/5 rounded-lg border border-destructive/10">
                        <p className="text-xs font-medium text-destructive uppercase tracking-wider mb-1">Challenge</p>
                        <p className="text-xs sm:text-sm text-foreground/70">{study.challenge}</p>
                      </div>
                    </div>

                    {/* Strategy */}
                    <div className="lg:w-1/3">
                      <p className="text-xs font-medium text-foreground/60 uppercase tracking-wider mb-2 sm:mb-3">Strategy Implemented</p>
                      <ul className="space-y-1.5 sm:space-y-2">
                        {study.strategy.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-foreground/80">
                            <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Results */}
                    <div className="lg:w-1/3 space-y-3 sm:space-y-4">
                      <div className="grid grid-cols-2 gap-2 sm:gap-4">
                        <div className="p-2 sm:p-4 bg-background rounded-lg sm:rounded-xl border border-border text-center">
                          <p className="text-xs text-muted-foreground mb-1">Before</p>
                          <p className="text-sm sm:text-base font-semibold text-foreground">{study.results.before}</p>
                        </div>
                        <div className="p-2 sm:p-4 bg-primary/5 rounded-lg sm:rounded-xl border border-primary/10 text-center">
                          <p className="text-xs text-primary mb-1">After</p>
                          <p className="text-sm sm:text-base font-semibold text-foreground">{study.results.after}</p>
                        </div>
                      </div>
                      <div className="p-2 sm:p-4 bg-primary/10 rounded-lg sm:rounded-xl border border-primary/20 text-center">
                        <p className="text-base sm:text-lg font-bold text-gradient">{study.results.improvement}</p>
                      </div>
                      <p className="text-xs sm:text-sm text-foreground/70">{study.outcome}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 md:py-20 lg:py-24 bg-card">
          <div className="container-xl px-4 sm:px-6">
            <div className="text-center mb-10 md:mb-16">
              <p className="section-label mb-3 sm:mb-4">The Process</p>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                How an <span className="text-gradient">Engagement Works</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {processSteps.map((step) => (
                <div
                  key={step.step}
                  className="bg-background rounded-lg sm:rounded-xl border border-border p-4 sm:p-6 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <span className="text-xl sm:text-2xl font-display font-bold text-gradient">{step.step}</span>
                    <h3 className="font-display text-sm sm:text-base font-bold text-foreground">{step.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Advisory vs Brokerage */}
        <section className="py-16 md:py-20 lg:py-24 bg-background">
          <div className="container-xl px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8 sm:mb-12">
                <p className="section-label mb-3 sm:mb-4">A Different Approach</p>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
                  Advisory vs Traditional <span className="text-gradient">Brokerage</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
                <div className="p-4 sm:p-6 bg-card rounded-xl border border-border">
                  <p className="text-xs sm:text-sm font-medium text-foreground/60 uppercase tracking-wider mb-3 sm:mb-4">Traditional Marketing Brokerage</p>
                  <ul className="space-y-2 sm:space-y-3">
                    {[
                      "Focus on marketing spend and visibility",
                      "Generic buyer targeting",
                      "Commission-driven incentives",
                      "Limited pricing input",
                      "Reactive to market conditions",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-muted-foreground text-xs sm:text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 sm:p-6 bg-primary/5 rounded-xl border border-primary/10">
                  <p className="text-xs sm:text-sm font-medium text-primary uppercase tracking-wider mb-3 sm:mb-4">Strategic Advisory</p>
                  <ul className="space-y-2 sm:space-y-3">
                    {[
                      "Focus on positioning and buyer psychology",
                      "Targeted investor and buyer segmentation",
                      "Aligned with project success metrics",
                      "Data-driven pricing strategy",
                      "Proactive market positioning",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-foreground/80 text-xs sm:text-sm">
                        <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="text-center mb-8 sm:mb-12">
                <p className="text-sm sm:text-base text-foreground/70 max-w-2xl mx-auto">
                  Uzair doesn't just market units — he provides strategic insight that shapes pricing, positioning, and launch execution. This is advisory work, not sales work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 md:py-20 lg:py-24 bg-card">
          <div className="container-xl px-4 sm:px-6">
            <div className="max-w-2xl mx-auto">
              <DeveloperContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Developers;
