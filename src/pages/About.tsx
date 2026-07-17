import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Phone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { OptimizedImage } from "@/components/ui/optimized-image";
import heroImage from "@/assets/uzair-walking.jpg";
import clientMeetingImage from "@/assets/uzair-client-meeting.jpg";
import showroomTourImage from "@/assets/uzair-showroom-tour.jpg";
import brochureReviewImage from "@/assets/uzair-brochure-review.jpg";
import officeWideImage from "@/assets/uzair-office-wide.jpg";
import showroomEntranceImage from "@/assets/uzair-showroom-entrance.jpg";
import floorplanImage from "@/assets/uzair-floorplan-consultation.jpg";
import expoImage from "@/assets/uzair-expo-wide.jpg";

const stats = [
  { value: "450+", label: "Units Sold" },
  { value: "$200M+", label: "in Sales Volume" },
  { value: "5 Yrs", label: "in the Presale Market" },
  { value: "4", label: "Languages Spoken" },
];

const values = [
  "Never hypes or pumps up presale projects — consistent for 5+ years",
  "Buys the same products I sell — 5 personal presale investments",
  "Provides honest advice — even when it means saying no",
  "Reviews every contract line-by-line for red flags",
];

const About = () => {
  const navigate = useNavigate();
  const handleCTA = () => navigate('/?scroll=book-section');

  return (
    <>
      <Helmet>
        <title>About Uzair Muhammad — Buyer-Only Presale Specialist, Surrey BC</title>
        <meta
          name="description"
          content="Born in Pakistan, raised in Surrey. Former City of Surrey planning and bylaws professional turned buyer-only presale specialist. 450+ units sold. Works in Punjabi, Hindi, Urdu and English."
        />
        <meta name="keywords" content="Uzair Muhammad realtor, Surrey presale specialist, Fraser Valley buyer's agent, Punjabi realtor Surrey, Hindi realtor Fraser Valley, Urdu realtor BC, buyer-only presale agent, new construction Surrey" />
        <link rel="canonical" href="https://presalewithuzair.com/about" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://presalewithuzair.com/about" />
        <meta property="og:title" content="About Uzair Muhammad — Buyer-Only Presale Specialist, Surrey BC" />
        <meta property="og:description" content="Born in Pakistan, raised in Surrey. Former City of Surrey planning and bylaws professional turned buyer-only presale specialist. 450+ units sold." />
        <meta property="og:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/5CBz3t8hJXQlE60NLFmYURMrWQu2/social-images/social-1775073854345-Screenshot_2026-03-03_at_2.54.42_PM.webp" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Uzair Muhammad — Buyer-Only Presale Specialist, Surrey BC" />
        <meta name="twitter:description" content="Buyer-only presale specialist in the Fraser Valley. 450+ units sold. Punjabi, Hindi, Urdu and English." />
        <meta name="twitter:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/5CBz3t8hJXQlE60NLFmYURMrWQu2/social-images/social-1775073854345-Screenshot_2026-03-03_at_2.54.42_PM.webp" />
        {/* Canonical Person + RealEstateAgent JSON-LD lives in index.html — do not duplicate here */}
      </Helmet>

      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-card">
          <div className="container-xl">
            <div className="max-w-3xl">
              <p className="section-label mb-4 animate-fade-up">Meet Uzair Muhammad</p>
              <h1 className="font-display text-4xl lg:text-6xl font-bold text-foreground animate-fade-up delay-100 leading-tight">
                I help buyers make better presale decisions <span className="text-gradient">before they sign.</span>
              </h1>
              <p className="mt-6 text-xl text-foreground/80 animate-fade-up delay-200">
                Born in Pakistan. Raised in Surrey. 10 years at the City of Surrey in planning and bylaws before real estate. 450+ units sold. $200M+ in new construction. I work in Punjabi, Hindi, Urdu, and English.
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
                <div className="absolute -bottom-8 -right-8 bg-card rounded-xl p-6 border border-border shadow-lg">
                  <p className="text-4xl font-display font-bold text-gradient">450+</p>
                  <p className="text-sm text-muted-foreground">Units Sold</p>
                </div>
              </div>

              <div>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
                  A decade reading development applications, not marketing renderings.
                </h2>
                <div className="space-y-4 text-foreground/80 leading-relaxed">
                  <p>
                    I was born in Pakistan and raised in Surrey. I spent 10 years with the City of Surrey in planning and bylaws — reading development applications, zoning, and building plans — before moving into real estate after COVID.
                  </p>
                  <p>
                    That decade is why I read a project differently. When a presale launches, I look at what has actually been approved and what the contract actually commits the developer to — not the rendering.
                  </p>
                  <p>
                    When I started in real estate I made one rule I've never broken: I represent buyers, never developers. Not once, across 450+ units and more than $200M in new-construction sales.
                  </p>
                  <p>
                    I also lead{" "}
                    <a
                      href="https://presaleproperties.com"
                      target="_blank"
                      rel="noopener"
                      className="text-primary underline underline-offset-4 hover:text-primary/80"
                    >
                      The Presale Properties Group
                    </a>
                    , a team of agents working the Fraser Valley presale market. We cover Surrey, Langley, Abbotsford, Delta, Coquitlam, and Burnaby South, and work in English, Punjabi, Hindi, and Urdu.
                  </p>
                  <p>
                    I founded the Vancouver Presale Expo. I'm a father of two and live in the community I sell in.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="gap-2"
                    onClick={handleCTA}
                  >
                    <Phone className="h-4 w-4" />
                    Book a Buyer Strategy Call
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why I focus on presale */}
        <section className="py-20 bg-card">
          <div className="container-xl">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
                Why I focus on presale
              </h2>
              <div className="space-y-4 text-foreground/80 leading-relaxed text-lg">
                <p>
                  Presale is one of the most misunderstood parts of real estate. The display suite looks finished. The renderings look beautiful. The incentives sound limited. The sales team is polished.
                </p>
                <p>
                  But the buyer still has to understand the deposit, timeline, floor plan, contract, financing, taxes, developer, completion risk, and future resale demand. That's where I help.
                </p>
              </div>

              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mt-14 mb-6 leading-tight">
                My buyer-side approach
              </h2>
              <div className="space-y-4 text-foreground/80 leading-relaxed text-lg">
                <p>I don't believe every launch is worth buying. Sometimes the best advice is:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Wait.</li>
                  <li>Compare another city.</li>
                  <li>Choose a different floor plan.</li>
                  <li>Don't stretch that far.</li>
                  <li>Get financing clarity first.</li>
                  <li>Review the contract before committing.</li>
                  <li>This project isn't the right fit for your goal.</li>
                </ul>
                <p>Good advice should protect the buyer, not just close the deal.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Credentials */}
        <section className="py-16 bg-card">
          <div className="container-xl">
            <div className="max-w-3xl mx-auto">
              <p className="section-label mb-4 text-center">Credentials</p>
              <ul className="grid sm:grid-cols-2 gap-3 text-foreground/80">
                <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" /><span>Former City of Surrey, Planning &amp; Bylaws (10 years)</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" /><span>Founder, Vancouver Presale Expo</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" /><span>Leads The Presale Properties Group</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" /><span>Licensed BC REALTOR® under Real Broker (BCFSA)</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" /><span>450+ units · $200M+ in sales</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" /><span>4.9 stars from 36 Google reviews</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" /><span>Punjabi, Hindi, Urdu, English</span></li>
              </ul>
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
                  I'm on a mission to raise the standard for presale buyers, give back to the community, and share what I've learned with other real estate agents.
                </p>
                <p className="text-foreground/80 leading-relaxed mb-8">
                  I founded the Vancouver Presale Expo, one of BC's largest events for presale agents and developers. Vancouver Presale Expo 2024 was a launchpad for groundbreaking presale projects and delivered training for 1,000+ realtors.
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
                  onClick={handleCTA}
                >
                  <Phone className="h-5 w-5" />
                  Work With Uzair
                </Button>
                <a href="https://presaleproperties.com" target="_blank" rel="noopener">
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
