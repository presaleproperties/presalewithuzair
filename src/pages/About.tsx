import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { OptimizedImage } from "@/components/ui/optimized-image";
import heroImage from "@/assets/uzair-walking.jpg";
import clientMeetingImage from "@/assets/uzair-client-meeting.jpg";
import showroomTourImage from "@/assets/uzair-showroom-tour.jpg";
import brochureReviewImage from "@/assets/uzair-brochure-review.jpg";
import officeWideImage from "@/assets/uzair-office-wide.jpg";
import showroomEntranceImage from "@/assets/uzair-showroom-entrance.jpg";
import floorplanImage from "@/assets/uzair-floorplan-consultation.jpg";
import expoImage from "@/assets/uzair-expo-wide.jpg";
import { useCalendly } from "@/hooks/useCalendly";

const stats = [
  { value: "330+", label: "Presales Advised" },
  { value: "$100M+", label: "In Experience" },
  { value: "$1M+", label: "Saved for Clients" },
  { value: "100%", label: "Buyer-First" },
];

const values = [
  "Never hypes or pumps up presale projects — consistent for 4+ years",
  "Buys the same products I sell — 5 personal presale investments",
  "Provides honest advice — even when it means saying no",
  "Reviews every contract line-by-line for red flags",
];

const About = () => {
  const { openCalendly } = useCalendly();

  return (
    <>
      <Helmet>
        <title>About Uzair Muhammad | Vancouver Presale Expert | Real Estate Agent</title>
        <meta
          name="description"
          content="Learn about Uzair Muhammad, Vancouver's top presale expert with $150M+ in sales. Specializing in presale condos, assignments, and investment strategies."
        />
      </Helmet>

      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-card">
          <div className="container-xl">
            <div className="max-w-3xl">
              <p className="section-label mb-4 animate-fade-up">About Uzair</p>
              <h1 className="font-display text-5xl lg:text-6xl font-bold text-foreground animate-fade-up delay-100">
                Buyer-First <span className="text-gradient">Guidance</span>
              </h1>
              <p className="mt-6 text-xl text-foreground/80 animate-fade-up delay-200">
                Independent presale advice focused on education, transparency, and protecting your interests — 
                not pushing sales.
              </p>
            </div>
          </div>
        </section>

        {/* Bio Section */}
        <section className="py-24 bg-background">
          <div className="container-xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="image-reveal rounded-2xl overflow-hidden">
                  <OptimizedImage
                    src={heroImage}
                    alt="Uzair Muhammad"
                    className="w-full h-[600px]"
                    priority
                  />
                </div>
                {/* Stats overlay */}
                <div className="absolute -bottom-8 -right-8 bg-card rounded-xl p-6 border border-border shadow-lg">
                  <p className="text-4xl font-display font-bold text-gradient">300+</p>
                  <p className="text-sm text-muted-foreground">Units Sold</p>
                </div>
              </div>

              <div>
                <h2 className="font-display text-4xl font-bold text-foreground mb-6">
                  Clear <span className="text-gradient">Guidance</span>
                </h2>
                <div className="space-y-4 text-foreground/80 leading-relaxed">
                  <p>
                    Uzair is a presale specialist in Vancouver, BC who believes buyers deserve honest, 
                    independent advice — not sales pressure. His approach is simple: educate first, 
                    then help you decide if a presale makes sense for your situation.
                  </p>
                  <p>
                    With experience advising on 330+ presale homes, Uzair has learned which developers 
                    to trust, which contracts have hidden risks, and when to walk away from a deal.
                  </p>
                  <p>
                    Working primarily with first-time buyers and investors, Uzair provides clear 
                    explanations of complex presale contracts, identifies red flags before you commit, 
                    and ensures you understand exactly what you're signing.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="gap-2"
                    onClick={() => openCalendly()}
                  >
                    <Phone className="h-4 w-4" />
                    Book a Discovery Call
                  </Button>
                  <a href="https://presaleproperties.com" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="lg" className="gap-2">
                      Search Presale Projects
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-card">
          <div className="container-xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-card text-center">
                  <p className="text-3xl lg:text-4xl font-display font-bold text-gradient">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Photo Gallery */}
        <section className="py-16 bg-background">
          <div className="container-xl">
            <div className="text-center mb-10">
              <p className="section-label mb-3">Working With Clients</p>
              <h2 className="font-display text-3xl font-bold text-foreground">
                Real <span className="text-gradient">Results</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                <OptimizedImage
                  src={clientMeetingImage}
                  alt="Uzair consulting with clients"
                  className="w-full h-full hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                <OptimizedImage
                  src={showroomTourImage}
                  alt="Uzair guiding showroom tour"
                  className="w-full h-full hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                <OptimizedImage
                  src={brochureReviewImage}
                  alt="Uzair reviewing project details"
                  className="w-full h-full hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                <OptimizedImage
                  src={officeWideImage}
                  alt="Uzair in strategy meeting"
                  className="w-full h-full hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                <OptimizedImage
                  src={showroomEntranceImage}
                  alt="Uzair welcoming clients"
                  className="w-full h-full hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                <OptimizedImage
                  src={floorplanImage}
                  alt="Uzair explaining floor plans"
                  className="w-full h-full hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values & Approach */}
        <section className="py-24 bg-card">
          <div className="container-xl">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                  My <span className="text-gradient">Principles</span>
                </h2>
                <p className="text-foreground/80 leading-relaxed mb-8">
                  Presale purchases are significant decisions. My role is to ensure you have the 
                  information and guidance needed to make the right choice — even if that choice is to wait.
                </p>
                <ul className="space-y-4">
                  {values.map((value) => (
                    <li key={value} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <span className="text-foreground/90">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                  My <span className="text-gradient">Approach</span>
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  I take a buyer-first approach to presales. Before recommending any project, I review 
                  disclosures, assess developer track records, and evaluate whether the deal genuinely 
                  serves your interests.
                </p>
                <p className="text-foreground/80 leading-relaxed mt-4">
                  If a project has concerning clauses, questionable pricing, or a developer I don't trust, 
                  I'll tell you directly. My job isn't to close deals — it's to help you avoid bad ones 
                  and find the right opportunities.
                </p>
                <p className="text-foreground/80 leading-relaxed mt-4">
                  This means some conversations end with "this isn't the right fit for you." That's not 
                  a failure — that's honest guidance doing its job.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Community Leader */}
        <section className="py-24 bg-card">
          <div className="container-xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="section-label mb-4">Community Impact</p>
                <h2 className="font-display text-4xl font-bold text-foreground mb-6">
                  Community <span className="text-gradient">Leader</span>
                </h2>
                <p className="text-foreground/80 leading-relaxed mb-6">
                  Uzair is on a mission to revolutionize presales, give back, and share his formula 
                  for success to enable and motivate other real estate agents.
                </p>
                <p className="text-foreground/80 leading-relaxed mb-8">
                  He is the founder of Vancouver's Largest Presale Expo for real estate agents and 
                  developers. Vancouver Presale Expo 2024 was a launchpad for groundbreaking presale 
                  projects and invaluable training for 1,000+ realtors.
                </p>
                <Button variant="outline" size="lg" className="gap-2" asChild>
                  <a href="https://vancouverpresaleexpo.com/" target="_blank" rel="noopener noreferrer">
                    Learn About the Expo
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>

              <div className="image-reveal rounded-2xl overflow-hidden">
                <img
                  src={expoImage}
                  alt="Vancouver Presale Expo"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-background">
          <div className="container-xl">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-4xl font-bold text-foreground mb-6">
                Get Clear Guidance Before You Buy
              </h2>
              <p className="text-foreground/80 mb-8">
                Have questions about a presale? Want to understand if it's the right move for you? 
                Let's have an honest conversation — no pressure, no sales pitch.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="hero" 
                  size="xl" 
                  className="gap-2 w-full sm:w-auto"
                  onClick={() => openCalendly()}
                >
                  <Phone className="h-5 w-5" />
                  Book a Discovery Call
                </Button>
                <a href="https://presaleproperties.com" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="xl" className="gap-2 w-full sm:w-auto">
                    Search Presale Projects
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
