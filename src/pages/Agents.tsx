import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Phone, FileText, TrendingUp, Users, Target, Mail, Megaphone, Settings, Calendar, CheckCircle, ArrowRight } from "lucide-react";
import { useCalendly } from "@/hooks/useCalendly";
import { AgentContactForm } from "@/components/forms/AgentContactForm";

const day1Modules = [
  {
    icon: FileText,
    title: "Presale Contracts",
    items: [
      "Review a presale contract — full breakdown",
      "Add addendums properly",
      "Cancel presale contracts when needed",
      "Get extensions from developers",
      "Protect your client's best interest",
    ],
  },
  {
    icon: Megaphone,
    title: "Marketing & Lead Generation",
    items: [
      "Generate free leads consistently",
      "Run paid ads (Facebook, YouTube)",
      "Pull deals from past clients",
      "Create content that attracts presale buyers",
    ],
  },
  {
    icon: Settings,
    title: "Systems & Automations",
    items: [
      "Set up your CRM for presale projects",
      "Smart plans based on project timelines",
      "Email marketing + templates",
      "Virtually sell presale units",
      "Prepare for first access and sell in bulk",
    ],
  },
  {
    icon: TrendingUp,
    title: "Assignment Contracts",
    items: [
      "Get developer approvals",
      "Market assignments on and off market",
      "Draft assignment contracts",
      "Move funds in an assignment",
      "Structure deals to maximize client returns",
      "Negotiate commissions & payouts",
    ],
  },
];

const day2Modules = [
  {
    icon: Target,
    title: "Deals & Negotiations",
    items: [
      "Pick the right projects",
      "Structure deals for different buyer types",
      "Negotiate with developers",
      "Earn more commission",
      "Wholesale units strategically",
    ],
  },
  {
    icon: Users,
    title: "Showhome Preview (In Person)",
    items: [
      "Prepare for a preview properly",
      "Investor presentation techniques",
      "First-time buyer presentation",
      "Step-by-step process",
      "Follow-up with clients after preview",
    ],
  },
  {
    icon: Calendar,
    title: "Follow-Up Strategy Session (VIP)",
    items: [
      "Systems & CRM automation review",
      "Lead generation optimization",
      "Implementing your presale business plan",
      "1-on-1 strategy session with Uzair",
      "Q&A and ongoing support",
    ],
  },
];

const Agents = () => {
  const { openCalendly } = useCalendly();

  return (
    <>
      <Helmet>
        <title>Vancouver Presale Academy | Presale Training for Realtors | Uzair Muhammad</title>
        <meta
          name="description"
          content="Vancouver Presale Academy — the immersion program for real estate agents. Learn presale contracts, assignments, lead generation, and negotiation. Founded by Uzair Muhammad, $200M+ in presales."
        />
        <meta name="keywords" content="presale training for realtors, presale education BC, presale mentor for agents, Vancouver Presale Academy, presale course for agents, assignment training, presale certification" />
        <link rel="canonical" href="https://presalewithuzair.com/agents" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Vancouver Presale Academy",
            "description": "Presale immersion program for real estate agents in Vancouver. Learn contracts, assignments, lead generation, and negotiation strategies.",
            "provider": {
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
        <section className="relative py-20 md:py-28 lg:py-32 bg-gradient-to-br from-background via-background to-secondary/30">
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />

          <div className="container-xl relative z-10 px-4 sm:px-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-primary/30 bg-primary/5 mb-4 sm:mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs sm:text-sm font-medium text-primary">Vancouver Presale Academy</span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold leading-[1.1] mb-4 sm:mb-6">
                <span className="text-foreground">Where Agents Master</span>{" "}
                <span className="text-gradient">The Art of Selling Presales</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-3 sm:mb-4">
                Presale Immersion Program for Real Estate Agents in Vancouver
              </p>

              <p className="text-sm sm:text-base text-foreground/70 mb-6 sm:mb-8">
                This program is for agents who want to GROW their business and sell more presale units without losing resale business. Whether you're experienced or just getting started — this is a high-level, step-by-step process for selling presales in any market.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button variant="hero" size="lg" className="gap-2 w-full sm:w-auto" asChild>
                  <a href="https://vancouverpresaleacademy.com/#tickets-1" target="_blank" rel="noopener noreferrer">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-sm sm:text-base">Join the Waitlist</span>
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto" onClick={openCalendly}>
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-sm sm:text-base">Talk to Uzair First</span>
                </Button>
              </div>

              <p className="text-xs sm:text-sm text-primary mt-3 sm:mt-4">Coming Fall 2025</p>
            </div>
          </div>
        </section>

        {/* Proof Stats */}
        <section className="py-10 sm:py-12 md:py-16 bg-card border-y border-border">
          <div className="container-xl px-4 sm:px-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
              <div>
                <p className="text-2xl sm:text-3xl font-display font-bold text-gradient">$200M+</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Sold in Presales</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-display font-bold text-gradient">300+</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Units Sold</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-display font-bold text-gradient">$26M+</p>
                <p className="text-xs sm:text-sm text-muted-foreground">In Assignments</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-display font-bold text-gradient">$2M+</p>
                <p className="text-xs sm:text-sm text-muted-foreground">GCI as Solo Agent</p>
              </div>
            </div>
          </div>
        </section>

        {/* Day 1 Curriculum */}
        <section className="py-16 md:py-20 lg:py-24 bg-background">
          <div className="container-xl px-4 sm:px-6">
            <div className="text-center mb-10 md:mb-16">
              <p className="section-label mb-3 sm:mb-4">Day 1 Curriculum</p>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                What You'll <span className="text-gradient">Learn</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {day1Modules.map((module) => (
                <div
                  key={module.title}
                  className="bg-card rounded-xl sm:rounded-2xl border border-border p-5 sm:p-6 md:p-8 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-primary/10">
                      <module.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-foreground">
                      {module.title}
                    </h3>
                  </div>
                  <ul className="space-y-2 sm:space-y-3">
                    {module.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
                        <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Day 2 Curriculum */}
        <section className="py-16 md:py-20 lg:py-24 bg-card">
          <div className="container-xl px-4 sm:px-6">
            <div className="text-center mb-10 md:mb-16">
              <p className="section-label mb-3 sm:mb-4">Day 2 Curriculum</p>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Advanced <span className="text-gradient">Training</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {day2Modules.map((module) => (
                <div
                  key={module.title}
                  className="bg-background rounded-xl sm:rounded-2xl border border-border p-5 sm:p-6 md:p-8 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-primary/10">
                      <module.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-foreground">
                      {module.title}
                    </h3>
                  </div>
                  <ul className="space-y-2 sm:space-y-3">
                    {module.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-foreground/80">
                        <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Uzair */}
        <section className="py-16 md:py-20 lg:py-24 bg-background">
          <div className="container-xl px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
              <p className="section-label mb-3 sm:mb-4 text-center">Founder & Coach</p>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 sm:mb-8 text-center">
                Learn From <span className="text-gradient">Uzair Muhammad</span>
              </h2>
              
              <div className="bg-card rounded-xl sm:rounded-2xl border border-border p-5 sm:p-6 md:p-8">
                <p className="text-sm sm:text-base text-foreground/80 mb-4 sm:mb-6">
                  As a leading Presale Expert in Vancouver, Uzair has achieved remarkable success — selling over $200M in presales as a solo agent.
                </p>
                <p className="text-sm sm:text-base text-foreground/80 mb-4 sm:mb-6">
                  In less than 3 years, Uzair built his business from the ground up — selling 300+ units without a team, generating over $2M in GCI. The secret? His systems, processes, automations, and tailored marketing strategy.
                </p>
                <p className="text-sm sm:text-base text-foreground/80 mb-6 sm:mb-8">
                  Vancouver Presale Academy is designed to empower fellow agents with the strategies and insights needed to excel in the lucrative presale market.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button variant="outline" className="gap-2 w-full sm:w-auto" asChild>
                    <a href="https://www.instagram.com/presalewithuzair" target="_blank" rel="noopener noreferrer">
                      Follow on Instagram
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" className="gap-2 w-full sm:w-auto" onClick={openCalendly}>
                    <Phone className="h-4 w-4" />
                    Book a Call
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 md:py-20 lg:py-24 bg-card">
          <div className="container-xl px-4 sm:px-6">
            <div className="max-w-2xl mx-auto">
              <AgentContactForm />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-20 lg:py-24 bg-background">
          <div className="container-xl px-4 sm:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
                Are You <span className="text-gradient">Ready?</span>
              </h2>
              <p className="text-sm sm:text-base text-foreground/70 mb-6 sm:mb-8">
                Join the waitlist for Vancouver Presale Academy. Limited spots available for Fall 2025.
              </p>
              <Button variant="hero" size="lg" className="gap-2 w-full sm:w-auto" asChild>
                <a href="https://vancouverpresaleacademy.com/#tickets-1" target="_blank" rel="noopener noreferrer">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-sm sm:text-base">Join the Waitlist</span>
                </a>
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
