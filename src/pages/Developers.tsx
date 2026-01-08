import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useCalendly } from "@/hooks/useCalendly";
import uzairHeadshot from "@/assets/uzair-headshot.jpeg";
import uzairOfficeWide from "@/assets/uzair-office-wide.jpg";

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
        <title>Independent Developer Advisory | Presale Strategy & Consulting | Uzair Muhammad</title>
        <meta
          name="description"
          content="Independent strategic advisory for real estate developers. Pre-launch strategy, pricing guidance, and sales momentum — built from real buyer intelligence, not theory."
        />
        <meta name="keywords" content="developer advisory, presale consulting, condo launch strategy, real estate developer consultant, BC developer advisory, presale pricing strategy" />
        <link rel="canonical" href="https://presalewithuzair.com/developers" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Developer Advisory & Consulting",
            "provider": {
              "@type": "Person",
              "name": "Uzair Muhammad"
            },
            "description": "Independent strategic advisory for real estate developers. Pre-launch strategy, pricing guidance, and ongoing sales advisory.",
            "areaServed": {
              "@type": "AdministrativeArea",
              "name": "British Columbia"
            }
          })}
        </script>
      </Helmet>

      <Navbar />
      <main className="bg-[hsl(200,30%,6%)]">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          {/* Subtle gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(200,30%,4%)] via-[hsl(200,30%,6%)] to-[hsl(200,25%,8%)]" />
          
          {/* Very subtle texture overlay */}
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
          
          <div className="container-xl relative z-10 py-24 md:py-32 lg:py-40">
            <div className="max-w-4xl">
              <p className="text-[hsl(45,30%,65%)] font-medium tracking-[0.2em] text-xs uppercase mb-6 animate-fade-up">
                Developer Advisory
              </p>

              <h1 className="font-display text-[2rem] sm:text-[2.75rem] md:text-[3.5rem] lg:text-[4rem] font-bold leading-[1.1] mb-8 animate-fade-up text-foreground tracking-tight normal-case">
                Independent Advisory for Developers Who Want Their Projects to Launch Right
              </h1>

              <p className="text-lg md:text-xl text-[hsl(200,15%,60%)] mb-6 animate-fade-up max-w-3xl leading-relaxed">
                Strategic guidance before launch, during sales, and through completion — built from real buyer and market intelligence, not theory.
              </p>

              <p className="text-sm text-[hsl(200,15%,45%)] mb-10 animate-fade-up max-w-2xl">
                No commissions. No marketing agendas. Just clear, experienced advice developers actually need.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 animate-fade-up">
                <Button 
                  size="lg"
                  className="bg-[hsl(45,25%,88%)] hover:bg-[hsl(45,25%,80%)] text-[hsl(200,30%,8%)] px-8 py-6 text-base font-semibold rounded-md transition-all duration-300"
                  onClick={handleBookCall}
                >
                  Book a Developer Consulting Call
                </Button>
                <button 
                  onClick={scrollToHowIWork}
                  className="text-[hsl(200,15%,55%)] hover:text-[hsl(45,30%,70%)] text-sm font-medium flex items-center gap-2 transition-colors duration-300"
                >
                  Learn How I Work
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Credibility Strip */}
        <section className="py-8 md:py-10 border-y border-[hsl(200,20%,12%)] bg-[hsl(200,28%,7%)]">
          <div className="container-xl">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 md:gap-x-16">
              {credibilityPoints.map((point, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[hsl(45,30%,55%)]" />
                  <span className="text-sm text-[hsl(200,15%,55%)]">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Developers Work With Me */}
        <section id="why-developers" className="py-20 md:py-28 lg:py-36 bg-[hsl(200,30%,6%)]">
          <div className="container-xl">
            <div className="max-w-3xl">
              <p className="text-[hsl(45,30%,65%)] font-medium tracking-[0.15em] text-xs uppercase mb-4">
                The Challenge
              </p>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8 tracking-tight normal-case">
                Why Developers Bring Me In
              </h2>
              
              <div className="space-y-6 text-[hsl(200,15%,60%)] leading-relaxed">
                <p className="text-lg">
                  Most development teams don't lack effort — they lack unfiltered perspective.
                </p>
                <p>
                  Marketing agencies won't challenge bad decisions.
                </p>
                <p>
                  Sales teams report problems too late.
                </p>
                <p>
                  Internal teams are often too close to the project.
                </p>
                <p className="pt-4 text-foreground/80">
                  I work independently, behind the scenes, alongside your team to identify issues early and help you make better decisions before they cost time, momentum, or money.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What I Advise On */}
        <section className="py-20 md:py-28 lg:py-36 bg-[hsl(200,28%,7%)]">
          <div className="container-xl">
            <div className="mb-16 md:mb-20">
              <p className="text-[hsl(45,30%,65%)] font-medium tracking-[0.15em] text-xs uppercase mb-4">
                Advisory Focus
              </p>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight normal-case">
                Where I Create Real Impact
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
              {advisoryAreas.map((area, index) => (
                <div key={index} className="group">
                  <div className="flex items-baseline gap-4 mb-5">
                    <span className="text-[hsl(45,30%,55%)] text-sm font-medium">0{index + 1}</span>
                    <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground tracking-tight normal-case">
                      {area.title}
                    </h3>
                  </div>
                  <ul className="space-y-3 pl-8">
                    {area.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-[hsl(200,15%,55%)]">
                        <span className="w-1 h-1 rounded-full bg-[hsl(200,15%,40%)] mt-2.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Independent Advisory Positioning */}
        <section className="py-20 md:py-28 lg:py-36 bg-[hsl(200,30%,6%)]">
          <div className="container-xl">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <p className="text-[hsl(45,30%,65%)] font-medium tracking-[0.15em] text-xs uppercase mb-4">
                  My Role
                </p>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8 tracking-tight normal-case">
                  Independent. Direct. On Your Side.
                </h2>
                
                <div className="space-y-6 text-[hsl(200,15%,60%)] leading-relaxed">
                  <p>I am not your broker.</p>
                  <p>I am not your marketing agency.</p>
                  <p>I do not sell units.</p>
                  <p className="pt-4 text-foreground/80 text-lg">
                    My role is to advise — clearly and honestly — even when the feedback is uncomfortable.
                  </p>
                  <p className="text-foreground/70">
                    Developers bring me in because I see what buyers see, what realtors hear, and what reports don't show until it's too late.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-[hsl(200,25%,10%)]">
                  <img 
                    src={uzairOfficeWide} 
                    alt="Uzair Muhammad - Developer Advisory"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(200,30%,6%)] via-transparent to-transparent opacity-60" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="py-20 md:py-28 lg:py-36 bg-[hsl(200,28%,7%)]">
          <div className="container-xl">
            <div className="max-w-3xl">
              <p className="text-[hsl(45,30%,65%)] font-medium tracking-[0.15em] text-xs uppercase mb-4">
                Fit
              </p>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-10 tracking-tight normal-case">
                Who This Is For
              </h2>
              
              <ul className="space-y-4 mb-10">
                {whoThisIsFor.map((item, index) => (
                  <li key={index} className="flex items-center gap-4 text-lg text-[hsl(200,15%,65%)]">
                    <div className="w-2 h-2 rounded-full bg-[hsl(45,30%,55%)]" />
                    {item}
                  </li>
                ))}
              </ul>
              
              <div className="pt-6 border-t border-[hsl(200,20%,12%)]">
                <p className="text-[hsl(200,15%,50%)] text-sm mb-2">
                  If you want polished opinions, I'm not the right fit.
                </p>
                <p className="text-foreground/80">
                  If you want clarity and results, let's talk.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-24 md:py-32 lg:py-40 bg-[hsl(200,30%,6%)] border-t border-[hsl(200,20%,12%)]">
          <div className="container-xl">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6 tracking-tight normal-case">
                Book a Developer Consulting Call
              </h2>
              
              <p className="text-[hsl(200,15%,55%)] mb-10">
                Confidential. Direct. No sales pitch.
              </p>
              
              <Button 
                size="lg"
                className="bg-[hsl(45,25%,88%)] hover:bg-[hsl(45,25%,80%)] text-[hsl(200,30%,8%)] px-10 py-6 text-base font-semibold rounded-md transition-all duration-300"
                onClick={handleBookCall}
              >
                Book a Developer Consulting Call
              </Button>
              
              <p className="mt-8 text-xs text-[hsl(200,15%,40%)]">
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
