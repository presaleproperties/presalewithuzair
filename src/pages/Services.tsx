import { openCalendlyPopup } from "@/hooks/useCalendly";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Mail, Search } from "lucide-react";
import showroomTourImage from "@/assets/uzair-showroom-tour.jpg";
import floorplanImage from "@/assets/uzair-floorplan-consultation.jpg";
import clientMeetingImage from "@/assets/uzair-client-meeting.jpg";
import { useNavigate } from "react-router-dom";

const services = [
  {
    id: "presales",
    title: "Presale Purchasing & Early Access",
    subtitle: "Presale Acquisitions",
    description: "I'll help you find and compare presale opportunities across the Fraser Valley and Metro Vancouver, including early-access opportunities when they're available. But access isn't the point. Judgment is. My job is to help you determine whether the project deserves your money in the first place.",
    image: showroomTourImage,
    benefits: [
      "Project and location comparison",
      "Floor plan and pricing analysis",
      "Deposit schedule review",
      "Developer and competing-project research",
      "Incentive comparison",
      "Purchase-term walkthrough and questions to confirm with your lawyer",
      "Early-access opportunities when available",
    ],
  },
  {
    id: "assignments",
    title: "Presale Assignment Strategy",
    subtitle: "Contract Assignments",
    description: "Life can change between signing a presale contract and completion. If you need to explore assigning your contract, I help you understand the market value, developer requirements and practical steps involved in bringing the assignment to market. Because assignments can involve legal and tax considerations, I also make sure those issues are directed to the appropriate professionals.",
    image: floorplanImage,
    benefits: [
      "Market-based assignment pricing",
      "Developer process and restrictions",
      "Marketing strategy",
      "Buyer outreach",
      "Coordination with legal and tax professionals where required",
    ],
  },
  {
    id: "resale",
    title: "Resale & Portfolio Decisions",
    subtitle: "Resale & Investment Properties",
    description: "Presale isn't automatically the right answer. For investors and homebuyers, sometimes the better opportunity is already built. I can help you compare presale and resale through the same lens: price, location, financing, rent potential, long-term demand and your exit strategy. The goal is not to make presale win. The goal is to make the right option obvious.",
    image: clientMeetingImage,
    benefits: [
      "Presale vs. resale comparison",
      "Price, location and financing analysis",
      "Rent potential and long-term demand review",
      "Exit-strategy planning",
    ],
  },
  {
    id: "completion",
    title: "Completion, Walkthrough & After-Key Support",
    subtitle: "From Contract to Keys — and Beyond",
    description: "Presale purchases can take years to complete. I stay involved. As completion approaches, I help you prepare for financing conversations, closing costs, the deficiency walkthrough and possession. I can also help you understand the basics of your new-home warranty and point you toward the right professional resources when something requires legal, financing, tax or warranty expertise.",
    image: clientMeetingImage,
    benefits: [
      "Completion preparation",
      "Closing-cost planning",
      "Deficiency walkthrough support",
      "Possession-day coordination",
      "New-home warranty orientation",
      "Post-completion check-in",
    ],
  },
];

const Services = () => {
  const navigate = useNavigate();
  const handleCTA = () => openCalendlyPopup('services');

  return (
    <>
      <Helmet>
        <title>Presale Buyer Services | Uzair Muhammad</title>
        <meta
          name="description"
          content="Buyer-side presale services including project comparison, purchase guidance, assignments, resale and completion support across the Fraser Valley."
        />
        <meta name="keywords" content="presale services Vancouver, presale condo advisory, assignment sale help, presale contract review, new construction guidance Vancouver, Fraser Valley presale services" />
        <link rel="canonical" href="https://presalewithuzair.com/services/" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://presalewithuzair.com/services/" />
        <meta property="og:title" content="Presale Buyer Services | Uzair Muhammad" />
        <meta property="og:description" content="Buyer-side presale services including project comparison, purchase guidance, assignments, resale and completion support across the Fraser Valley." />
        <meta property="og:image" content="https://presalewithuzair.com/og-image.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Presale Buyer Services | Uzair Muhammad" />
        <meta name="twitter:description" content="Buyer-side presale services including project comparison, purchase guidance, assignments, resale and completion support across the Fraser Valley." />
        <meta name="twitter:image" content="https://presalewithuzair.com/og-image.jpg" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Real Estate Advisory",
            "provider": {
              "@type": "Person",
              "name": "Uzair Muhammad",
              "url": "https://presalewithuzair.com"
            },
            "areaServed": [
              { "@type": "City", "name": "Vancouver" },
              { "@type": "City", "name": "Surrey" },
              { "@type": "City", "name": "Langley" },
              { "@type": "City", "name": "Abbotsford" },
              { "@type": "AdministrativeArea", "name": "Fraser Valley" }
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Presale Real Estate Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Presale Condo Guidance",
                    "description": "Expert advisory on presale condos including contract review, developer analysis, and red flag identification."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Assignment Sales Support",
                    "description": "Guidance on selling presale contracts before completion, including valuation and developer approval."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Resale Property Advisory",
                    "description": "Buyer-first guidance for resale property transactions."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Completion & Warranty Support",
                    "description": "Support through presale completion: closing cost preparation, deficiency walkthrough, and 2-5-10 new home warranty guidance."
                  }
                }
              ]
            }
          })}
        </script>
      </Helmet>

      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-card divider-b">
          <div className="container-xl">
            <div className="max-w-3xl">
              <p className="eyebrow mb-4 animate-fade-up">How I Can Help</p>
              <h1 className="h-display text-foreground animate-fade-up delay-100">
                One advisor from the first question to the keys.
              </h1>
              <p className="mt-6 lede animate-fade-up delay-200">
                Buying a presale isn't one decision. It's a series of decisions about the market, project, floor plan, deposit structure, purchase terms, financing and eventual completion. I help you connect those decisions so you're not evaluating each one in isolation.
              </p>
            </div>
          </div>
        </section>

        {/* Services */}
        {services.map((service, index) => (
          <section
            key={service.id}
            id={service.id}
            className={`section-y ${index % 2 === 0 ? "bg-background" : "bg-card"} section-divider`}
          >
            <div className="container-xl">
              <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${index % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <p className="eyebrow mb-4">{service.subtitle}</p>
                  <h2 className="h-section text-foreground mb-6">
                    {service.title}
                  </h2>
                  <p className="lede mb-8">
                    {service.description}
                  </p>

                  <ul className="grid sm:grid-cols-2 gap-4">
                    {service.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground/90">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                </div>

                <div className={`image-reveal rounded-2xl overflow-hidden ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-[420px] lg:h-[500px] object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section className="section-y bg-card section-divider">
          <div className="container-xl">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="h-section text-foreground mb-6">
                Have a project in mind?
              </h2>
              <p className="lede mb-8">
                Send it to me before you commit. No pressure. No pitch. Just a clear conversation about whether it makes sense for you.
              </p>
              <div className="flex justify-center">
                <Button
                  variant="hero"
                  size="xl"
                  className="gap-2 rounded-full px-8"
                  onClick={handleCTA}
                >
                  <Mail className="h-5 w-5" />
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

export default Services;
