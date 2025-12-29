import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Phone, GraduationCap, FileText, Users, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { useCalendly } from "@/hooks/useCalendly";

const learningAreas = [
  {
    icon: FileText,
    title: "Disclosure Documents",
    description: "How to read and interpret presale disclosure statements, identify red flags, and protect your clients.",
  },
  {
    icon: TrendingUp,
    title: "Assignment Strategy",
    description: "Understanding assignment clauses, timing, marketing, and how to guide clients through the process.",
  },
  {
    icon: Users,
    title: "Investor Psychology",
    description: "What investors look for in presales — deposit structures, ROI expectations, and exit strategies.",
  },
  {
    icon: GraduationCap,
    title: "Contract & GST Knowledge",
    description: "The specifics of presale contracts, deposit structures, GST rebates, and closing timelines.",
  },
];

const blindSpots = [
  "Clients asking questions you can't confidently answer",
  "Missing out on presale inventory access",
  "Losing investors to presale specialists",
  "Not understanding disclosure documents",
  "Guessing on assignment rules and timelines",
];

const Agents = () => {
  const { openCalendly } = useCalendly();

  return (
    <>
      <Helmet>
        <title>Presale Education & Training for Realtors | Uzair Muhammad</title>
        <meta
          name="description"
          content="Presale education and mentorship for realtors in BC. Learn disclosure documents, assignment strategy, and investor psychology. Founder of Vancouver Presale Expo."
        />
        <meta name="keywords" content="presale training for realtors, presale education BC, presale mentor for agents, realtor presale course, presale certification, Vancouver Presale Expo" />
        <link rel="canonical" href="https://presalewithuzair.com/agents" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Presale Education by Uzair Muhammad",
            "description": "Presale education and mentorship for real estate agents in British Columbia.",
            "founder": {
              "@type": "Person",
              "name": "Uzair Muhammad"
            },
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
                <span className="text-sm font-medium text-primary">For Realtors</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl xl:text-6xl font-bold leading-[1.1] mb-6">
                <span className="text-foreground">Presale Education & Strategy</span>{" "}
                <span className="text-gradient">for Realtors</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8">
                Most agents don't fully understand presales — and it's costing them deals and credibility. Learn from the founder of Vancouver's largest presale event.
              </p>

              <Button variant="hero" size="xl" className="gap-2" onClick={openCalendly}>
                <Phone className="h-5 w-5" />
                Learn Presales the Right Way
              </Button>
            </div>
          </div>
        </section>

        {/* The Blind Spot */}
        <section className="py-24 bg-background">
          <div className="container-xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="section-label mb-4">The Reality</p>
                <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  Why Presales Are a <span className="text-gradient">Blind Spot</span>
                </h2>
                <p className="text-foreground/70 mb-8">
                  Presales are fundamentally different from resale transactions. Different contracts, different timelines, different risks. Most agents learn this the hard way — or lose deals to specialists who understand the nuances.
                </p>

                <div className="p-6 bg-card rounded-xl border border-border">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <p className="font-medium text-foreground">Common Agent Challenges</p>
                  </div>
                  <ul className="space-y-3">
                    {blindSpots.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-destructive/60 mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-8 bg-primary/5 rounded-2xl border border-primary/10">
                <p className="section-label mb-4">The Solution</p>
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                  Presale Knowledge = Competitive Edge
                </h3>
                <p className="text-foreground/70 mb-6">
                  Uzair has trained over 1,000 realtors through the Vancouver Presale Expo — the largest presale education event in BC. This isn't theory — it's practical, deal-focused knowledge.
                </p>
                <ul className="space-y-3">
                  {[
                    "Confidently answer client questions",
                    "Access presale inventory and launches",
                    "Win investor clients from specialists",
                    "Understand contracts and protect clients",
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

        {/* What You'll Learn */}
        <section className="py-24 bg-card">
          <div className="container-xl">
            <div className="text-center mb-16">
              <p className="section-label mb-4">Presale Education</p>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground">
                What <span className="text-gradient">You'll Learn</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {learningAreas.map((area) => (
                <div
                  key={area.title}
                  className="bg-background rounded-2xl border border-border p-8 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                    <area.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">
                    {area.title}
                  </h3>
                  <p className="text-muted-foreground">{area.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vancouver Presale Expo */}
        <section className="py-24 bg-background">
          <div className="container-xl">
            <div className="max-w-3xl mx-auto text-center">
              <p className="section-label mb-4">Vancouver Presale Expo</p>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-6">
                BC's Largest <span className="text-gradient">Presale Event</span>
              </h2>
              <p className="text-foreground/70 mb-8">
                Uzair founded the Vancouver Presale Expo — bringing together developers, investors, and realtors for education, networking, and deal flow. Over 1,000 realtors trained and counting.
              </p>
              <div className="grid sm:grid-cols-3 gap-6 mb-8">
                <div className="p-6 bg-card rounded-xl border border-border text-center">
                  <p className="text-3xl font-display font-bold text-gradient">1,000+</p>
                  <p className="text-sm text-muted-foreground">Realtors Trained</p>
                </div>
                <div className="p-6 bg-card rounded-xl border border-border text-center">
                  <p className="text-3xl font-display font-bold text-gradient">20+</p>
                  <p className="text-sm text-muted-foreground">Developer Partners</p>
                </div>
                <div className="p-6 bg-card rounded-xl border border-border text-center">
                  <p className="text-3xl font-display font-bold text-gradient">#1</p>
                  <p className="text-sm text-muted-foreground">Presale Event in BC</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-card">
          <div className="container-xl">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Ready to Master <span className="text-gradient">Presales?</span>
              </h2>
              <p className="text-foreground/70 mb-8">
                Whether you're looking for one-on-one mentorship, workshop training, or access to presale inventory — start the conversation.
              </p>
              <Button variant="hero" size="xl" className="gap-2" onClick={openCalendly}>
                <Phone className="h-5 w-5" />
                Learn Presales the Right Way
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Agents;
