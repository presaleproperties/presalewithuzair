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

const byTheNumbers = [
  { value: "450+", label: "new-construction units sold" },
  { value: "$200M+", label: "in sales volume" },
  { value: "5", label: "years focused on presale real estate" },
  { value: "10", label: "years City of Surrey planning and bylaws" },
  { value: "4.9★", label: "Google review rating" },
  { value: "4", label: "languages: English, Punjabi, Hindi, Urdu" },
];

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

const cities = [
  "Surrey",
  "Langley",
  "South Surrey",
  "White Rock",
  "Delta",
  "Abbotsford",
  "Coquitlam",
  "Burnaby",
  "Maple Ridge",
  "Chilliwack",
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
        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-card">
          <div className="container-xl">
            <div className="max-w-3xl">
              <p className="section-label mb-4 animate-fade-up">About Uzair Muhammad</p>
              <h1 className="font-display text-4xl lg:text-6xl font-bold text-foreground animate-fade-up delay-100 leading-tight">
                One of the Fraser Valley's buyer-side presale authorities.
              </h1>
              <p className="mt-6 text-xl text-foreground/80 animate-fade-up delay-200">
                I help buyers understand presale before they sign. That means comparing the project, price, floor plan, deposit, contract, location, incentives, and resale potential before the sales centre pressure starts.
              </p>
              <p className="mt-4 text-lg text-foreground/70 animate-fade-up delay-300">
                I have helped buyers and investors purchase 450+ new-construction homes, with more than $200M in sales volume across the Fraser Valley and Metro Vancouver.
              </p>
              <p className="mt-4 text-lg text-foreground/70 animate-fade-up delay-300">
                I also lead The Presale Properties Group, a multilingual team focused on presale condos, townhomes, and new homes across Surrey, Langley, Delta, South Surrey, Abbotsford, Coquitlam, and Burnaby.
              </p>
              <p className="mt-4 text-lg text-foreground/70 animate-fade-up delay-300">
                Before real estate, I spent 10 years with the City of Surrey in planning and bylaws. I also founded the Vancouver Presale Expo to help raise the standard of presale education in BC.
              </p>
              <p className="mt-4 text-lg text-foreground/70 animate-fade-up delay-300">
                My job is simple: help you choose the right project, avoid the wrong one, and understand the decision before you commit.
              </p>
              <div className="mt-8 animate-fade-up delay-300">
                <Button variant="hero" size="lg" className="gap-2" onClick={handleCTA}>
                  <Phone className="h-4 w-4" />
                  Book a Buyer Strategy Call
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Buyer-side advice */}
        <section className="py-20 bg-background">
          <div className="container-xl">
            <div className="max-w-3xl mx-auto">
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
                  I work with buyers to compare the opportunity clearly. If a project makes sense, I’ll explain why. If the floor plan is weak, the deposit is aggressive, the location is risky, or the numbers do not support the story, I’ll tell you before you move forward.
                </p>
                <p className="font-semibold text-foreground">Good advice should protect the buyer, not just close the deal.</p>
              </div>
            </div>
          </div>
        </section>

        {/* What I help buyers understand */}
        <section className="py-20 bg-card">
          <div className="container-xl">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
                What I help buyers understand
              </h2>
              <p className="text-foreground/80 leading-relaxed text-lg mb-6">
                Most buyers do not need more listings. They need someone who can help them understand what they are actually buying.
              </p>
              <p className="text-foreground/80 leading-relaxed text-lg mb-6">
                I help buyers answer questions like:
              </p>
              <ul className="grid gap-3 text-foreground/80 text-lg">
                {buyerQuestions.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-foreground/80 leading-relaxed text-lg">
                Presale can be a smart move, but only when the project, timing, budget, and risk all make sense together.
              </p>
            </div>
          </div>
        </section>

        {/* A different lens on development */}
        <section className="py-20 bg-background">
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
                  <p className="text-sm text-muted-foreground">New-construction units sold</p>
                </div>
              </div>

              <div>
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

        {/* Local market focus */}
        <section className="py-20 bg-card">
          <div className="container-xl">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
                Local market focus
              </h2>
              <p className="text-foreground/80 leading-relaxed text-lg mb-6">
                I focus on presale and new construction across the Fraser Valley and Metro Vancouver, with a strong focus on:
              </p>
              <p className="text-foreground/80 leading-relaxed text-lg mb-6">
                Surrey, Langley, South Surrey, White Rock, Delta, Abbotsford, Coquitlam, Burnaby, Maple Ridge, Chilliwack, and surrounding communities.
              </p>
              <p className="text-foreground/80 leading-relaxed text-lg mb-6">
                Each city attracts different buyers, different renters, and different long-term demand.
              </p>
              <p className="text-foreground/80 leading-relaxed text-lg">
                A good presale in Surrey may not be the same as a good presale in Langley. A strong investor unit may not be the best first home. A townhome that works for a family may not work as a rental.
              </p>
              <p className="mt-4 text-foreground/80 leading-relaxed text-lg">
                My job is to help you understand those differences before choosing a project.
              </p>
            </div>
          </div>
        </section>

        {/* The Presale Properties Group */}
        <section className="py-20 bg-background">
          <div className="container-xl">
            <div className="max-w-3xl mx-auto">
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
          </div>
        </section>

        {/* Vancouver Presale Expo */}
        <section className="py-24 bg-card">
          <div className="container-xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-display text-4xl font-bold text-foreground mb-6">
                  Vancouver Presale Expo
                </h2>
                <div className="space-y-4 text-foreground/80 leading-relaxed">
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
                <img
                  src={expoImage}
                  alt="Vancouver Presale Expo"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* By the numbers */}
        <section className="py-16 bg-background">
          <div className="container-xl">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <p className="section-label mb-4">By the numbers</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {byTheNumbers.map((stat) => (
                <div key={stat.label} className="stat-card text-center">
                  <p className="text-3xl lg:text-4xl font-display font-bold text-gradient">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who I help */}
        <section className="py-20 bg-card">
          <div className="container-xl">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
                Who I help
              </h2>
              <div className="space-y-8 text-foreground/80 leading-relaxed text-lg">
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">First-time buyers</h3>
                  <p>
                    If you are buying your first home, I help you slow the decision down and understand what you are actually buying.
                  </p>
                  <p className="mt-2">
                    We look at affordability, deposit timing, completion costs, floor plan, location, and whether presale is the right move for your life right now.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">Investors</h3>
                  <p>
                    If you are buying as an investment, I help you look past the brochure.
                  </p>
                  <p className="mt-2">
                    We compare rental demand, resale potential, price per square foot, incentives, assignment options, completion risk, and exit strategy.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">Move-up buyers</h3>
                  <p>
                    If you are moving from a condo to a townhome, or from resale into new construction, I help you think through timing, financing, completion, and whether the new home fits your long-term plan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Short version */}
        <section className="py-20 bg-background">
          <div className="container-xl">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
                Short version
              </h2>
              <p className="text-foreground/80 leading-relaxed text-lg">
                Uzair Muhammad is a Surrey-based buyer-side presale and new-construction advisor with Presale Properties Group at Real Broker. He helps first-time buyers and investors compare condos, townhomes, and new homes across Surrey, Langley, Delta, South Surrey, Abbotsford, and the Fraser Valley before they sign with a developer.
              </p>
            </div>
          </div>
        </section>

        {/* Photo Gallery */}
        <section className="py-16 bg-card">
          <div className="container-xl">
            <div className="text-center mb-10">
              <p className="section-label mb-3">Working With Buyers</p>
              <h2 className="font-display text-3xl font-bold text-foreground">
                How I work <span className="text-gradient">day to day</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {[clientMeetingImage, showroomTourImage, brochureReviewImage, officeWideImage, showroomEntranceImage, floorplanImage].map((img, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden aspect-[4/3]">
                  <OptimizedImage
                    src={img}
                    alt="Uzair working with buyers"
                    className="w-full h-full hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-background">
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
