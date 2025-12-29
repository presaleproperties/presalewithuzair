import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";
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
  { value: "300+", label: "Units Sold" },
  { value: "$200M+", label: "In Volume" },
  { value: "$500K+", label: "Buyers Credit" },
  { value: "$26M+", label: "In Assignments" },
];

const values = [
  "Identifies undervalued projects with substantial returns",
  "Advocates for minimal deposits to maintain financial flexibility",
  "Chooses projects with extended completion timelines",
  "Prioritizes your financial growth and interests",
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
                Meet <span className="text-gradient">Uzair</span>
              </h1>
              <p className="mt-6 text-xl text-foreground/80 animate-fade-up delay-200">
                Vancouver's premier presale expert dedicated to helping investors and first-time buyers 
                navigate the new construction market with confidence.
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
                  <img
                    src={heroImage}
                    alt="Uzair Muhammad"
                    className="w-full h-[600px] object-cover"
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
                  Presale <span className="text-gradient">Expert</span>
                </h2>
                <div className="space-y-4 text-foreground/80 leading-relaxed">
                  <p>
                    Uzair is a Real Estate Agent and Presale Expert in Vancouver, BC. With a focus 
                    on the Lower Mainland Presale Market, Uzair has helped hundreds of clients make 
                    lucrative presale investments in undervalued projects.
                  </p>
                  <p>
                    With over $200M+ in volume and 300+ units sold, Uzair has facilitated $26M+ in 
                    assignment sales and secured over $500K in buyer credits for his clients.
                  </p>
                  <p>
                    Working primarily with investors and first-time buyers, Uzair provides insider 
                    access to presale projects, market trends, and exclusive opportunities before 
                    they become publicly available.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="gap-2"
                    onClick={openCalendly}
                  >
                    <Phone className="h-4 w-4" />
                    Schedule a Call
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
                <img
                  src={clientMeetingImage}
                  alt="Uzair consulting with clients"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                <img
                  src={showroomTourImage}
                  alt="Uzair guiding showroom tour"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                <img
                  src={brochureReviewImage}
                  alt="Uzair reviewing project details"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                <img
                  src={officeWideImage}
                  alt="Uzair in strategy meeting"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                <img
                  src={showroomEntranceImage}
                  alt="Uzair welcoming clients"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                <img
                  src={floorplanImage}
                  alt="Uzair explaining floor plans"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
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
                  Uzair's <span className="text-gradient">Values</span>
                </h2>
                <p className="text-foreground/80 leading-relaxed mb-8">
                  Uzair believes that successful real estate investment goes beyond finding the right deal. 
                  It's about making strategic choices for long-term growth and security.
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
                  Uzair's <span className="text-gradient">Approach</span>
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  Uzair's real estate investment approach is meticulous and client-centered. He understands 
                  that selecting the right project, price, and terms is crucial for maximizing presale 
                  investment returns.
                </p>
                <p className="text-foreground/80 leading-relaxed mt-4">
                  Uzair's clients see impressive returns even before project completion. He specializes 
                  in undervalued projects with significant appreciation potential, ensuring clients 
                  maintain liquidity with minimal deposits.
                </p>
                <p className="text-foreground/80 leading-relaxed mt-4">
                  Prioritizing projects with longer completion timelines allows for extended holding 
                  periods, enhancing investment returns. Uzair's commitment is to help you build a 
                  robust real estate portfolio.
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
                Book a 1-on-1 Call with Uzair
              </h2>
              <p className="text-foreground/80 mb-8">
                Ready to explore presale opportunities? Schedule a consultation to discuss your 
                investment goals and discover exclusive projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="hero" 
                  size="xl" 
                  className="gap-2 w-full sm:w-auto"
                  onClick={openCalendly}
                >
                  <Phone className="h-5 w-5" />
                  Schedule a Call
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
