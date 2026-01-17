import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Phone, CheckCircle } from "lucide-react";
import { useCalendly } from "@/hooks/useCalendly";
import uzairExpoSpeaking from "@/assets/uzair-expo-speaking.jpg";
import uzairExpoCrowd from "@/assets/uzair-expo-crowd.jpg";

const advisoryAreas = [
  {
    title: "Pre-Launch Strategy",
    items: [
      "Unit mix & floor plan review",
      "Identifying dead layouts early",
      "Product positioning (end-user vs investor)",
      "Avoiding generic, overused concepts",
    ],
  },
  {
    title: "Pricing & Release Strategy",
    items: [
      "Initial pricing guidance",
      "Phased release planning",
      "Avoiding over-discounting",
      "Buyer psychology insights",
    ],
  },
  {
    title: "Launch & Sales Momentum",
    items: [
      "Sales flow and friction points",
      "Website and funnel feedback",
      "Objection-driven messaging",
      "Momentum planning beyond launch day",
    ],
  },
  {
    title: "Ongoing Sales Advisory",
    items: [
      "Real-time buyer feedback",
      "Strategy adjustments before absorption slows",
      "Tactical pivots without panic pricing",
    ],
  },
];

const credibilityPoints = [
  "Buyer-first market insight",
  "Real-time sales feedback",
  "Independent from marketing agencies",
  "Advisory role across multiple launches",
];

const whoThisIsFor = [
  "Developers who want honest feedback",
  "Teams open to being challenged early",
  "Projects where long-term performance matters",
];

const Developers = () => {
  const { openCalendly } = useCalendly();

  const handleBookCall = () => {
    openCalendly();
  };

  const scrollToHowIWork = () => {
    document.getElementById("why-developers")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        <title>Developer Advisory Vancouver | Presale Strategy & Consulting | Uzair Muhammad</title>
        <meta
          name="description"
          content="Independent strategic advisory for real estate developers in BC. Pre-launch strategy, pricing guidance, and sales momentum — built from real buyer intelligence."
        />
        <meta name="keywords" content="developer advisory Vancouver, presale consulting BC, condo launch strategy, real estate developer consultant, presale pricing strategy, developer sales advisory" />
        <link rel="canonical" href="https://presalewithuzair.com/developers" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://presalewithuzair.com/developers" />
        <meta property="og:title" content="Developer Advisory | Presale Strategy Consulting" />
        <meta property="og:description" content="Independent strategic advisory for real estate developers. Pre-launch strategy and sales momentum." />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Developer Advisory | Uzair Muhammad" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Developer Advisory & Consulting",
            "provider": {
              "@type": "Person",
              "name": "Uzair Muhammad",
              "url": "https://presalewithuzair.com"
            },
            "description": "Independent strategic advisory for real estate developers. Pre-launch strategy, pricing guidance, and ongoing sales advisory.",
            "url": "https://presalewithuzair.com/developers",
            "areaServed": [
              { "@type": "AdministrativeArea", "name": "British Columbia" },
              { "@type": "City", "name": "Vancouver" },
              { "@type": "AdministrativeArea", "name": "Metro Vancouver" }
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Developer Advisory Services",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Pre-Launch Strategy" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Pricing & Release Strategy" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Launch & Sales Momentum" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Ongoing Sales Advisory" } }
              ]
            }
          })}
        </script>
      </Helmet>

      <Navbar />
      <main>
        {/* Hero Section - Matching site style */}
        <section className="relative min-h-[90vh] overflow-hidden flex items-center">
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

          <div className="container-xl relative z-10 px-4 sm:px-6 py-20 md:py-28">
            <div className="max-w-4xl">
              <p className="text-primary font-bold tracking-[0.15em] text-sm mb-4 animate-fade-up">
                DEVELOPER ADVISORY
              </p>

              <h1 className="font-display text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] mb-6 animate-fade-up">
                <span className="text-foreground block">INDEPENDENT</span>
                <span className="text-foreground block">ADVISORY FOR</span>
                <span className="text-muted-foreground block">DEVELOPERS WHO</span>
                <span className="text-muted-foreground block">WANT IT DONE RIGHT.</span>
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground mb-4 animate-fade-up max-w-2xl">
                Strategic guidance before launch, during sales, and through completion — built from real buyer and market intelligence, not theory.
              </p>

              <p className="text-sm text-primary/80 mb-8 animate-fade-up font-medium">
                No commissions. No marketing agendas. Just clear, experienced advice developers actually need.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-up">
                <Button 
                  variant="outline"
                  size="lg"
                  className="rounded-full border-2 border-foreground/80 text-foreground bg-transparent hover:bg-foreground hover:text-background px-8 py-6 text-base font-semibold gap-2"
                  onClick={handleBookCall}
                >
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                  Book a Developer Consulting Call
                </Button>
                <button 
                  onClick={scrollToHowIWork}
                  className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors duration-300 underline underline-offset-4"
                >
                  Learn How I Work
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Stats Section */}
        <section className="py-16 md:py-20 lg:py-24 bg-card border-y border-border">
          <div className="container-xl px-4 sm:px-6">
            <div className="text-center mb-10 md:mb-14">
              <p className="section-label mb-3">TRACK RECORD</p>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                SOLD OVER <span className="text-gradient">300+ PRESALE UNITS</span> SINCE 2022
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
              {/* Stat 1 */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-background rounded-2xl border border-border p-6 md:p-8 text-center hover:border-primary/30 transition-all duration-300">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-gradient mb-3">
                    200+
                  </div>
                  <p className="text-lg font-semibold text-foreground mb-2">Units Closed</p>
                  <p className="text-sm text-muted-foreground">Direct presale transactions completed for buyers and investors</p>
                </div>
              </div>
              
              {/* Stat 2 */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-background rounded-2xl border border-border p-6 md:p-8 text-center hover:border-primary/30 transition-all duration-300">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-gradient mb-3">
                    100+
                  </div>
                  <p className="text-lg font-semibold text-foreground mb-2">Agents Educated</p>
                  <p className="text-sm text-muted-foreground">Real estate professionals trained on presale strategy and execution</p>
                </div>
              </div>
              
              {/* Stat 3 */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-background rounded-2xl border border-border p-6 md:p-8 text-center hover:border-primary/30 transition-all duration-300">
                  <div className="flex justify-center mb-3">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/20 flex items-center justify-center">
                      <svg className="w-8 h-8 md:w-10 md:h-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" />
                        <path d="M2 12l10 5 10-5" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-foreground mb-2">Expo Founder</p>
                  <p className="text-sm text-muted-foreground">Founded the Vancouver Presale Expo — BC's premier presale event</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Why Developers Work With Me */}
        <section id="why-developers" className="py-16 md:py-24 lg:py-32 bg-background">
          <div className="container-xl px-4 sm:px-6">
            <div className="max-w-3xl">
              <p className="section-label mb-3 sm:mb-4">THE CHALLENGE</p>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">
                WHY DEVELOPERS <span className="text-gradient">BRING ME IN</span>
              </h2>
              
              <div className="space-y-6 text-muted-foreground">
                <p className="text-lg text-foreground/80">
                  Most development teams don't lack effort — they lack unfiltered perspective.
                </p>
                <p>Marketing agencies won't challenge bad decisions.</p>
                <p>Sales teams report problems too late.</p>
                <p>Internal teams are often too close to the project.</p>
                <p className="pt-4 text-foreground/90 border-l-2 border-primary pl-4">
                  I work independently, behind the scenes, alongside your team to identify issues early and help you make better decisions before they cost time, momentum, or money.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What I Advise On */}
        <section className="py-16 md:py-24 lg:py-32 bg-card">
          <div className="container-xl px-4 sm:px-6">
            <div className="mb-12 md:mb-16">
              <p className="section-label mb-3 sm:mb-4">ADVISORY FOCUS</p>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                WHERE I CREATE <span className="text-gradient">REAL IMPACT</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
              {advisoryAreas.map((area, index) => (
                <div 
                  key={index} 
                  className="bg-background rounded-xl sm:rounded-2xl border border-border p-5 sm:p-6 md:p-8 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-5">
                    <span className="text-primary font-bold text-lg">0{index + 1}</span>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-foreground">
                      {area.title}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {area.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Independent Advisory Positioning */}
        <section className="py-16 md:py-24 lg:py-32 bg-background">
          <div className="container-xl px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <p className="section-label mb-3 sm:mb-4">MY ROLE</p>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8">
                  INDEPENDENT. <span className="text-gradient">DIRECT.</span> ON YOUR SIDE.
                </h2>
                
                <div className="space-y-4 text-muted-foreground mb-8">
                  <p>I am not your broker.</p>
                  <p>I am not your marketing agency.</p>
                  <p>I do not sell units.</p>
                </div>
                
                <div className="bg-card rounded-xl p-5 sm:p-6 border border-border">
                  <p className="text-foreground/90 text-lg leading-relaxed">
                    My role is to advise — clearly and honestly — even when the feedback is uncomfortable.
                  </p>
                  <p className="text-muted-foreground mt-4">
                    Developers bring me in because I see what buyers see, what realtors hear, and what reports don't show until it's too late.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
                
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={uzairExpoSpeaking} 
                    alt="Uzair Muhammad speaking at Vancouver Presale Expo"
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="py-16 md:py-24 lg:py-32 bg-card">
          <div className="container-xl px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <p className="section-label mb-3 sm:mb-4">FIT</p>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-10">
                  WHO THIS IS <span className="text-gradient">FOR</span>
                </h2>
                
                <ul className="space-y-4 mb-10">
                  {whoThisIsFor.map((item, index) => (
                    <li key={index} className="flex items-center gap-4 text-lg text-foreground/80">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                
                <div className="pt-6 border-t border-border">
                  <p className="text-muted-foreground mb-2">
                    If you want polished opinions, I'm not the right fit.
                  </p>
                  <p className="text-foreground font-medium">
                    If you want clarity and results, let's talk.
                  </p>
                </div>
              </div>
              
              <div className="relative order-first lg:order-last">
                <div className="absolute -top-4 -left-4 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-accent/10 rounded-full blur-2xl" />
                
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={uzairExpoCrowd} 
                    alt="Audience at Vancouver Presale Expo"
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="relative py-20 md:py-28 lg:py-36 bg-background overflow-hidden">
          {/* Bokeh effects */}
          <div className="absolute bottom-0 left-0 right-0 h-[60%] pointer-events-none">
            <div className="absolute bottom-10 left-[15%] w-24 h-24 md:w-40 md:h-40 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="absolute bottom-20 right-[15%] w-32 h-32 md:w-48 md:h-48 rounded-full bg-purple-500/20 blur-3xl" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
          </div>
          
          <div className="container-xl px-4 sm:px-6 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                BOOK A <span className="text-gradient">DEVELOPER</span> CONSULTING CALL
              </h2>
              
              <p className="text-muted-foreground mb-10">
                Confidential. Direct. No sales pitch.
              </p>
              
              <Button 
                variant="outline"
                size="lg"
                className="rounded-full border-2 border-foreground/80 text-foreground bg-transparent hover:bg-foreground hover:text-background px-10 py-6 text-base font-semibold gap-2"
                onClick={handleBookCall}
              >
                <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                Book a Developer Consulting Call
              </Button>
              
              <p className="mt-8 text-sm text-muted-foreground">
                Consulting engagements are selective.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Developers;
