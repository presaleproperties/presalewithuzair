import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { OptimizedImage } from "@/components/ui/optimized-image";
import heroImage from "@/assets/uzair-walking.jpg";
import clientMeetingImage from "@/assets/uzair-client-meeting.jpg";
import showroomTourImage from "@/assets/uzair-showroom-tour.jpg";
import brochureReviewImage from "@/assets/uzair-brochure-review.jpg";
import officeWideImage from "@/assets/uzair-office-wide.jpg";
import showroomEntranceImage from "@/assets/uzair-showroom-entrance.jpg";
import floorplanImage from "@/assets/uzair-floorplan-consultation.jpg";
import expoImage from "@/assets/uzair-expo-wide.jpg";

const buyerQuestions = [
  "Is this project priced fairly?",
  "Is this floor plan good for living, renting, or resale?",
  "What does the deposit structure really mean?",
  "What costs may show up at completion?",
  "Is this incentive actually valuable?",
  "What happens if the market changes before completion?",
  "Is this city right for my goal?",
  "Should I buy now, wait, or compare another project?",
];

const About = () => {
  const navigate = useNavigate();
  const handleCTA = () => navigate('/?scroll=book-section');

  return (
    <>
      <Helmet>
        <title>About Uzair Muhammad | Buyer-Side Presale Specialist for the Fraser Valley</title>
        <meta
          name="description"
          content="I help buyers understand presale before they sign. I have helped buyers purchase 450+ new-construction homes with more than $200M in sales volume across the Fraser Valley and Metro Vancouver."
        />
        <meta name="keywords" content="Uzair Muhammad realtor, Surrey presale specialist, Fraser Valley buyer's agent, buyer-side presale advisor, new construction Surrey" />
        <link rel="canonical" href="https://presalewithuzair.com/about" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://presalewithuzair.com/about" />
        <meta property="og:title" content="About Uzair Muhammad | Buyer-Side Presale Specialist for the Fraser Valley" />
        <meta property="og:description" content="I help buyers understand presale before they sign. 450+ new-construction units sold across the Fraser Valley and Metro Vancouver." />
        <meta property="og:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/5CBz3t8hJXQlE60NLFmYURMrWQu2/social-images/social-1775073854345-Screenshot_2026-03-03_at_2.54.42_PM.webp" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Uzair Muhammad | Buyer-Side Presale Specialist for the Fraser Valley" />
        <meta name="twitter:description" content="I help buyers understand presale before they sign. 450+ new-construction units sold across the Fraser Valley and Metro Vancouver." />
        <meta name="twitter:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/5CBz3t8hJXQlE60NLFmYURMrWQu2/social-images/social-1775073854345-Screenshot_2026-03-03_at_2.54.42_PM.webp" />
      </Helmet>

      <Navbar />
      <main>
        {/* Hero — one key section: portrait + detailed bio */}
        <section className="relative pt-32 pb-24 bg-card overflow-hidden">
          <div className="container-xl">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Portrait */}
              <div className="lg:col-span-5 relative animate-fade-up">
                <div className="image-reveal rounded-2xl overflow-hidden shadow-2xl">
                  <OptimizedImage
                    src={heroImage}
                    alt="Uzair Muhammad — Buyer-side presale specialist"
                    className="w-full h-[560px] lg:h-[680px]"
                    priority
                  />
                </div>
                <div className="hidden lg:block absolute -bottom-6 -right-6 bg-card rounded-xl px-6 py-5 border border-border shadow-xl">
                  <p className="text-3xl font-display font-bold text-gradient leading-none">450+</p>
                  <p className="text-xs text-muted-foreground mt-1.5 uppercase tracking-wider">units sold · $200M+ volume</p>
                </div>
              </div>

              {/* Detailed bio */}
              <div className="lg:col-span-7">
                <p className="section-label mb-4 animate-fade-up">About Uzair Muhammad</p>
                <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground animate-fade-up delay-100 leading-[1.05]">
                  Fraser Valley's leading Presale Expert
                </h1>
                <div className="mt-8 space-y-5 text-foreground/80 animate-fade-up delay-200">
                  <p className="text-xl leading-relaxed">
                    I help buyers understand presale before they sign. That means comparing the project, price, floor plan, deposit, contract, location, incentives, and resale potential before the sales centre pressure starts.
                  </p>
                  <p className="text-lg leading-relaxed text-foreground/70">
                    I have helped buyers and investors purchase 450+ new-construction homes, with more than $200M in sales volume across the Fraser Valley and Metro Vancouver.
                  </p>
                  <p className="text-lg leading-relaxed text-foreground/70">
                    I also lead The Presale Properties Group, a multilingual team focused on presale condos, townhomes, and new homes across Surrey, Langley, Delta, South Surrey, Abbotsford, Coquitlam, and Burnaby.
                  </p>
                  <p className="text-lg leading-relaxed text-foreground/70">
                    Before real estate, I spent 10 years with the City of Surrey in planning and bylaws. I also founded the Vancouver Presale Expo to help raise the standard of presale education in BC.
                  </p>
                  <p className="text-lg leading-relaxed text-foreground font-medium">
                    My job is simple: help you choose the right project, avoid the wrong one, and understand the decision before you commit.
                  </p>
                </div>
                <div className="mt-10 animate-fade-up delay-300">
                  <Button variant="hero" size="lg" className="gap-2" onClick={handleCTA}>
                    <Phone className="h-4 w-4" />
                    Book a Buyer Strategy Call
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Buyer-side advice — image left, copy right */}
        <section className="py-24 bg-background">
          <div className="container-xl">
            <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
              <div className="image-reveal rounded-2xl overflow-hidden order-2 lg:order-1">
                <OptimizedImage
                  src={clientMeetingImage}
                  alt="Uzair meeting with buyers"
                  className="w-full h-[480px]"
                />
              </div>
              <div className="order-1 lg:order-2">
                <p className="section-label mb-4">Buyer-side, not developer-side</p>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
                  Buyer-side advice, not developer-side pressure.
                </h2>
                <div className="space-y-4 text-foreground/80 leading-relaxed text-lg">
                  <p>When you walk into a developer sales centre, the project already has representation.</p>
                  <p>You should too.</p>
                  <p>
                    The sales team knows the project, the pricing, the incentives, and the urgency. But their job is to sell the development.
                  </p>
                  <p>My job is different.</p>
                  <p>
                    I work with buyers to compare the opportunity clearly. If a project makes sense, I'll explain why. If the floor plan is weak, the deposit is aggressive, the location is risky, or the numbers do not support the story, I'll tell you before you move forward.
                  </p>
                  <p className="font-semibold text-foreground">Good advice should protect the buyer, not just close the deal.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What I help buyers understand — image right, copy left */}
        <section className="py-24 bg-card">
          <div className="container-xl">
            <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
              <div>
                <p className="section-label mb-4">The questions that matter</p>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
                  What I help buyers understand
                </h2>
                <p className="text-foreground/80 leading-relaxed text-lg mb-4">
                  Most buyers do not need more listings. They need someone who can help them understand what they are actually buying.
                </p>
                <p className="text-foreground/80 leading-relaxed text-lg mb-6">
                  I help buyers answer questions like:
                </p>
                <ul className="grid sm:grid-cols-2 gap-3 text-foreground/80">
                  {buyerQuestions.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-foreground/80 leading-relaxed text-lg">
                  Presale can be a smart move, but only when the project, timing, budget, and risk all make sense together.
                </p>
              </div>
              <div className="image-reveal rounded-2xl overflow-hidden">
                <OptimizedImage
                  src={brochureReviewImage}
                  alt="Reviewing project brochures with buyers"
                  className="w-full h-[540px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* A different lens on development */}
        <section className="py-24 bg-background">
          <div className="container-xl">
            <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
              <div className="image-reveal rounded-2xl overflow-hidden order-2 lg:order-1">
                <OptimizedImage
                  src={officeWideImage}
                  alt="Uzair reviewing a development plan"
                  className="w-full h-[540px]"
                />
              </div>
              <div className="order-1 lg:order-2">
                <p className="section-label mb-4">A planner's background</p>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
                  A different lens on development.
                </h2>
                <div className="space-y-4 text-foreground/80 leading-relaxed text-lg">
                  <p>
                    Before real estate, I spent 10 years with the City of Surrey in planning and bylaws.
                  </p>
                  <p>
                    That background gives me a different way of looking at presale and new construction. I am not only looking at renderings, brochures, or launch incentives. I am looking at how the project fits the area, what has been approved, how the floor plan works, and what questions a buyer should ask before signing.
                  </p>
                  <p>
                    That experience matters because presale is not just about what looks good today.
                  </p>
                  <p className="font-semibold text-foreground">It is about what will still make sense at completion.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who I help — image right */}
        <section className="py-24 bg-card">
          <div className="container-xl">
            <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
              <div>
                <p className="section-label mb-4">Who I work with</p>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-8 leading-tight">
                  Who I help
                </h2>
                <div className="space-y-8 text-foreground/80 leading-relaxed text-lg">
                  <div className="border-l-2 border-primary/40 pl-5">
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">First-time buyers</h3>
                    <p>
                      If you are buying your first home, I help you slow the decision down and understand what you are actually buying.
                    </p>
                    <p className="mt-2">
                      We look at affordability, deposit timing, completion costs, floor plan, location, and whether presale is the right move for your life right now.
                    </p>
                  </div>
                  <div className="border-l-2 border-primary/40 pl-5">
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">Investors</h3>
                    <p>
                      If you are buying as an investment, I help you look past the brochure.
                    </p>
                    <p className="mt-2">
                      We compare rental demand, resale potential, price per square foot, incentives, assignment options, completion risk, and exit strategy.
                    </p>
                  </div>
                  <div className="border-l-2 border-primary/40 pl-5">
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">Move-up buyers</h3>
                    <p>
                      If you are moving from a condo to a townhome, or from resale into new construction, I help you think through timing, financing, completion, and whether the new home fits your long-term plan.
                    </p>
                  </div>
                </div>
              </div>
              <div className="image-reveal rounded-2xl overflow-hidden lg:sticky lg:top-24">
                <OptimizedImage
                  src={showroomTourImage}
                  alt="Uzair touring a presale showroom with clients"
                  className="w-full h-[620px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Local market focus — image left */}
        <section className="py-24 bg-background">
          <div className="container-xl">
            <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
              <div className="image-reveal rounded-2xl overflow-hidden order-2 lg:order-1">
                <OptimizedImage
                  src={showroomEntranceImage}
                  alt="Presale showroom in the Fraser Valley"
                  className="w-full h-[520px]"
                />
              </div>
              <div className="order-1 lg:order-2">
                <p className="section-label mb-4">Fraser Valley &amp; Metro Vancouver</p>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
                  Local market focus
                </h2>
                <p className="text-foreground/80 leading-relaxed text-lg mb-4">
                  I focus on presale and new construction across the Fraser Valley and Metro Vancouver, with a strong focus on:
                </p>
                <p className="text-foreground/80 leading-relaxed text-lg mb-6">
                  Surrey, Langley, South Surrey, White Rock, Delta, Abbotsford, Coquitlam, Burnaby, Maple Ridge, Chilliwack, and surrounding communities.
                </p>
                <p className="text-foreground/80 leading-relaxed text-lg mb-4">
                  Each city attracts different buyers, different renters, and different long-term demand.
                </p>
                <p className="text-foreground/80 leading-relaxed text-lg">
                  A good presale in Surrey may not be the same as a good presale in Langley. A strong investor unit may not be the best first home. A townhome that works for a family may not work as a rental.
                </p>
                <p className="mt-4 text-foreground/80 leading-relaxed text-lg font-medium">
                  My job is to help you understand those differences before choosing a project.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Presale Properties Group — image right */}
        <section className="py-24 bg-card">
          <div className="container-xl">
            <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
              <div>
                <p className="section-label mb-4">Our team</p>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
                  The Presale Properties Group
                </h2>
                <div className="space-y-4 text-foreground/80 leading-relaxed text-lg">
                  <p>
                    I lead The Presale Properties Group, a multilingual team focused on helping buyers compare presale condos, townhomes, and new homes across the Fraser Valley and Metro Vancouver.
                  </p>
                  <p>Our team works in English, Punjabi, Hindi, and Urdu.</p>
                  <p>
                    We help buyers understand projects before they commit, including pricing, layouts, deposits, incentives, completion timelines, and buyer-side representation.
                  </p>
                </div>
              </div>
              <div className="image-reveal rounded-2xl overflow-hidden">
                <OptimizedImage
                  src={floorplanImage}
                  alt="Reviewing a floor plan with buyers"
                  className="w-full h-[500px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Vancouver Presale Expo */}
        <section className="py-24 bg-background">
          <div className="container-xl">
            <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
              <div>
                <p className="section-label mb-4">Industry leadership</p>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
                  Vancouver Presale Expo
                </h2>
                <div className="space-y-4 text-foreground/80 leading-relaxed text-lg">
                  <p>
                    I founded the Vancouver Presale Expo to help raise the standard of presale education in BC.
                  </p>
                  <p>
                    The Expo brings together agents, developers, and industry professionals to improve how presale projects are explained, understood, and represented.
                  </p>
                  <p>
                    For buyers, this matters because better education leads to better advice, better questions, and better decisions.
                  </p>
                </div>
                <div className="mt-8">
                  <Button variant="outline" size="lg" className="gap-2" asChild>
                    <a href="https://vancouverpresaleexpo.com/" target="_blank" rel="noopener noreferrer">
                      Learn about the Expo
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
              <div className="image-reveal rounded-2xl overflow-hidden">
                <OptimizedImage
                  src={expoImage}
                  alt="Vancouver Presale Expo"
                  className="w-full h-[500px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-card">
          <div className="container-xl">
            <div className="max-w-2xl mx-auto text-center">
              <p className="section-label mb-4">Before you choose a project, choose your advisor.</p>
              <h2 className="font-display text-4xl font-bold text-foreground mb-6">
                Let's talk before the sales centre starts <span className="text-gradient">selling to you.</span>
              </h2>
              <p className="text-foreground/80 mb-8">
                If you are thinking about buying presale, I can help you understand the market, compare projects, and pressure-test the numbers before you commit.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="hero"
                  size="xl"
                  className="gap-2 w-full sm:w-auto"
                  onClick={handleCTA}
                >
                  <Phone className="h-5 w-5" />
                  Book a Buyer Strategy Call
                </Button>
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
