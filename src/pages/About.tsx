import { openCalendlyPopup } from "@/hooks/useCalendly";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { OptimizedImage } from "@/components/ui/optimized-image";
import heroImage from "@/assets/uzair-walking.jpg";
import { AboutReviews } from "@/components/about/AboutReviews";
import clientMeetingImage from "@/assets/uzair-client-meeting.jpg";
import showroomTourImage from "@/assets/uzair-showroom-tour.jpg";
import brochureReviewImage from "@/assets/uzair-brochure-review.jpg";
import officeWideImage from "@/assets/uzair-office-wide.jpg";
import showroomEntranceImage from "@/assets/uzair-showroom-entrance.jpg";
import floorplanImage from "@/assets/uzair-floorplan-consultation.jpg";
import expoImage from "@/assets/uzair-expo-wide.jpg";

const buyerQuestions = [
  "Is this project fairly priced relative to the alternatives?",
  "Does this floor plan actually work?",
  "Does the deposit schedule fit my cash flow?",
  "What purchase terms deserve closer attention?",
  "What costs should I prepare for at completion?",
  "Is the incentive meaningful or mostly marketing?",
  "How does this neighbourhood fit my goal?",
  "What happens if my circumstances change before completion?",
  "Should I buy now, wait or compare something else?",
  "What should I prepare for at the deficiency walkthrough?",
];

const About = () => {
  const navigate = useNavigate();
  const handleCTA = () => openCalendlyPopup('about');

  return (
    <>
      <Helmet>
        <title>About Uzair Muhammad | Presale Buyer Advisor Fraser Valley</title>
        <meta
          name="description"
          content="Meet Uzair Muhammad, a buyer-side presale Realtor helping families evaluate new condos and townhomes across the Fraser Valley and Metro Vancouver."
        />
        <meta name="keywords" content="Uzair Muhammad realtor, Surrey presale specialist, Fraser Valley buyer's agent, buyer-side presale advisor, new construction Surrey" />
        <link rel="canonical" href="https://presalewithuzair.com/about/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://presalewithuzair.com/about/" />
        <meta property="og:title" content="About Uzair Muhammad | Presale Buyer Advisor Fraser Valley" />
        <meta property="og:description" content="Meet Uzair Muhammad, a buyer-side presale Realtor helping families evaluate new condos and townhomes across the Fraser Valley and Metro Vancouver." />
        <meta property="og:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/5CBz3t8hJXQlE60NLFmYURMrWQu2/social-images/social-1775073854345-Screenshot_2026-03-03_at_2.54.42_PM.webp" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Uzair Muhammad | Presale Buyer Advisor Fraser Valley" />
        <meta name="twitter:description" content="Meet Uzair Muhammad, a buyer-side presale Realtor helping families evaluate new condos and townhomes across the Fraser Valley and Metro Vancouver." />
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
                  <p className="text-xs text-muted-foreground mt-1.5 uppercase tracking-wider">families helped · $200M+ in new homes</p>
                </div>
              </div>

              {/* Detailed bio */}
              <div className="lg:col-span-7">
                <p className="section-label mb-4 animate-fade-up">About Uzair Muhammad</p>
                <h1 className="h-display text-foreground animate-fade-up delay-100">
                  I help buyers see past the brochure.
                </h1>
                <div className="mt-8 space-y-5 text-foreground/80 animate-fade-up delay-200">
                  <p className="text-xl leading-relaxed">
                    Buying presale means making a major financial decision about a home that may not exist yet. That's why my job isn't simply to find you a project. It's to help you understand what you're buying before you commit.
                  </p>
                  <p className="text-lg leading-relaxed text-foreground/70">
                    I help families compare new condos, townhomes and presales across the Fraser Valley and Metro Vancouver — looking at the project, location, price, floor plan, deposit structure, completion timing and long-term fit. And after you sign, I stay involved through the path to completion and keys.
                  </p>
                  <p className="text-lg leading-relaxed text-foreground/70">
                    I've helped more than 450 families purchase over $200M in new homes.
                  </p>
                  <p className="text-lg leading-relaxed text-foreground/70">
                    Before real estate, I spent 10 years working with the City of Surrey in planning and bylaws. That experience changed how I look at development. I naturally ask questions about how a project fits the neighbourhood, what's happening around it and what may matter years from now — not just what looks good on launch day. Today I lead The Presale Properties Group and founded the Vancouver Presale Expo. I work in English, Punjabi, Hindi and Urdu.
                  </p>
                  <p className="text-lg leading-relaxed text-foreground font-medium">
                    My role is simple: help you understand the options, avoid the wrong ones and make the right decision with confidence.
                  </p>
                </div>
                <div className="mt-10 animate-fade-up delay-300">
                  <Button variant="hero" size="lg" className="gap-2" onClick={handleCTA}>
                    <Phone className="h-4 w-4" />
                    Book a 15-Minute Call
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Buyer-side advice — image left, copy right */}
        <section className="section-y bg-background">
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
                <h2 className="h-section text-foreground mb-6">
                  The development already has people selling it. You deserve someone evaluating it from your side.
                </h2>
                <div className="space-y-4 text-foreground/80 leading-relaxed text-lg">
                  <p>The sales team knows its project better than almost anyone. That's valuable. But its job is to sell that development.</p>
                  <p>My job is to help you decide whether that development makes sense for <strong>you</strong>.</p>
                  <p>
                    That means comparing it with alternatives, questioning the numbers, looking critically at the floor plan and helping you understand the purchase terms.
                  </p>
                  <p>If I think the project makes sense, I'll explain why. If I think another project is stronger, I'll say so. If I think you should wait, I'll say that too.</p>
                  <p className="font-semibold text-foreground">Good advice isn't measured by how quickly you buy. It's measured by whether you still feel good about the decision when you get the keys.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What I help buyers understand — image right, copy left */}
        <section className="section-y bg-card">
          <div className="container-xl">
            <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
              <div>
                <p className="section-label mb-4">The questions that matter</p>
                <h2 className="h-section text-foreground mb-6">
                  What I help buyers understand
                </h2>
                <p className="text-foreground/80 leading-relaxed text-lg mb-4">
                  Most buyers don't need more listings. They need better context.
                </p>
                <p className="text-foreground/80 leading-relaxed text-lg mb-6">
                  I help buyers think through questions like:
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
                  Presale can be a strong option. But only when the project, timing, finances and buyer all fit together.
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

        {/* After you sign — image left, copy right */}
        <section className="section-y bg-background">
          <div className="container-xl">
            <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
              <div className="image-reveal rounded-2xl overflow-hidden order-2 lg:order-1">
                <OptimizedImage
                  src={showroomEntranceImage}
                  alt="Uzair supporting buyers after they sign"
                  className="w-full h-[520px]"
                />
              </div>
              <div className="order-1 lg:order-2">
                <p className="section-label mb-4">After you sign</p>
                <h2 className="h-section text-foreground mb-6">
                  With you from decision to keys.
                </h2>
                <div className="space-y-4 text-foreground/80 leading-relaxed text-lg">
                  <p>Signing the contract isn't the end of a presale purchase. In many cases, it's the beginning of a multi-year timeline.</p>
                  <p>
                    I stay connected through deposit milestones, construction updates, completion preparation, financing conversations, walkthrough timing and possession.
                  </p>
                  <p className="font-semibold text-foreground">
                    When a question requires a lawyer, accountant, lender or other specialist, I help make sure you're asking the right person the right question.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* A different lens on development */}
        <section className="section-y bg-card">
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
                <h2 className="h-section text-foreground mb-6">
                  I look at developments differently.
                </h2>
                <div className="space-y-4 text-foreground/80 leading-relaxed text-lg">
                  <p>
                    Before real estate, I spent 10 years working with the City of Surrey in planning and bylaws. That doesn't make me a city planner today. But it gave me a useful lens.
                  </p>
                  <p>
                    When I look at a project, I'm not just looking at finishes and incentives. I'm thinking about location, surrounding development, approvals, land use, neighbourhood change and how the home may function when it's actually completed.
                  </p>
                  <p className="font-semibold text-foreground">Presale isn't only about what looks exciting today. It's about what still makes sense years from now.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who I help — image right */}
        <section className="section-y bg-background">
          <div className="container-xl">
            <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
              <div>
                <p className="section-label mb-4">Who I work with</p>
                <h2 className="h-section text-foreground mb-8">
                  Who I help
                </h2>
                <div className="space-y-8 text-foreground/80 leading-relaxed text-lg">
                  <div className="border-l-2 border-primary/40 pl-5">
                    <h3 className="h-card text-foreground mb-2">First-time buyers</h3>
                    <p>
                      Buying your first home comes with enough uncertainty already.
                    </p>
                    <p className="mt-2">
                      I help you understand the timeline, deposits, purchase terms, completion costs, location and whether presale is actually the right way for you to enter the market.
                    </p>
                  </div>
                  <div className="border-l-2 border-primary/40 pl-5">
                    <h3 className="h-card text-foreground mb-2">Investors</h3>
                    <p>
                      I help investors look past the marketing story and evaluate the fundamentals.
                    </p>
                    <p className="mt-2">
                      That includes price, nearby resale, rent potential, deposit leverage, assignment provisions, completion risk and the eventual exit strategy. No guaranteed returns. Just better questions and clearer numbers.
                    </p>
                  </div>
                  <div className="border-l-2 border-primary/40 pl-5">
                    <h3 className="h-card text-foreground mb-2">Move-up buyers</h3>
                    <p>
                      If you're moving from a condo into a townhome or planning several years ahead, presale can help create time. But timing your existing home, deposits, mortgage and eventual completion matters. I help you see the whole sequence.
                    </p>
                  </div>
                  <div className="border-l-2 border-primary/40 pl-5">
                    <h3 className="h-card text-foreground mb-2">First-generation &amp; newcomer buyers</h3>
                    <p>
                      Sometimes the buyer understands the process in English but the parents helping with the deposit don't. I work in English, Punjabi, Hindi and Urdu so the people involved in the decision can understand it together.
                    </p>
                    <p className="mt-2">No family member should be writing a cheque for something they don't understand.</p>
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
        <section className="section-y bg-card">
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
                <h2 className="h-section text-foreground mb-6">
                  Local market focus
                </h2>
                <p className="text-foreground/80 leading-relaxed text-lg mb-4">
                  My core focus is presale and new construction across:
                </p>
                <p className="text-foreground/80 leading-relaxed text-lg mb-6">
                  Surrey, Langley, South Surrey, White Rock, Delta, Abbotsford, Coquitlam, Burnaby, Maple Ridge, Chilliwack and surrounding communities.
                </p>
                <p className="text-foreground/80 leading-relaxed text-lg mb-4">
                  These aren't interchangeable markets. A project that's right for an investor may be wrong for a first-time buyer.
                </p>
                <p className="text-foreground/80 leading-relaxed text-lg">
                  A great family townhome may be a mediocre rental. A strong building doesn't automatically make every floor plan a good buy.
                </p>
                <p className="mt-4 text-foreground/80 leading-relaxed text-lg font-medium">
                  Context matters.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Presale Properties Group — image right */}
        <section className="section-y bg-background">
          <div className="container-xl">
            <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
              <div>
                <p className="section-label mb-4">Our team</p>
                <h2 className="h-section text-foreground mb-6">
                  The Presale Properties Group
                </h2>
                <div className="space-y-4 text-foreground/80 leading-relaxed text-lg">
                  <p>
                    I lead The Presale Properties Group, a multilingual real estate team helping buyers navigate presale and new construction across the Fraser Valley and Metro Vancouver.
                  </p>
                  <p>Our team works in English, Punjabi, Hindi and Urdu.</p>
                  <p>Alongside me you'll work with Ravish Passy and Sarb Grewal — agents who live and work in the communities we serve.</p>
                  <p>
                    Our shared approach is simple: help the buyer understand the decision before asking them to make it.
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
        <section className="section-y bg-card">
          <div className="container-xl">
            <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
              <div>
                <p className="section-label mb-4">Industry leadership</p>
                <h2 className="h-section text-foreground mb-6">
                  Vancouver Presale Expo
                </h2>
                <div className="space-y-4 text-foreground/80 leading-relaxed text-lg">
                  <p>
                    I founded the Vancouver Presale Expo to help raise the level of education and conversation around BC's presale industry.
                  </p>
                  <p>
                    The event brings together agents, developers and industry professionals.
                  </p>
                  <p>
                    For me, that work matters because a more informed industry should create more informed buyers.
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

        <AboutReviews />

        {/* Proof strip */}
        <section className="py-10 bg-background divider-y">
          <div className="container-xl">
            <p className="text-center font-display text-lg lg:text-xl font-semibold text-foreground">
              4.9★ on Google · 450+ families helped
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="section-y bg-card">
          <div className="container-xl">
            <div className="max-w-2xl mx-auto text-center">
              <p className="section-label mb-4">Before you choose a project, choose your advisor.</p>
              <h2 className="h-section text-foreground mb-6">
                Considering a presale? Start with a <span className="text-gradient">conversation, not a showroom.</span>
              </h2>
              <p className="text-foreground/80 mb-8">
                Tell me what you're considering. I'll help you understand the market, compare the options and identify the questions worth asking before you commit.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="hero"
                  size="xl"
                  className="gap-2 w-full sm:w-auto"
                  onClick={handleCTA}
                >
                  <Phone className="h-5 w-5" />
                  Book a 15-Minute Call
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
