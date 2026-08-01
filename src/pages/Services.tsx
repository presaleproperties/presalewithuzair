import { openLeadDialog } from "@/components/forms/LeadFormDialog";
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
    title: "Presale Purchasing & VIP Access",
    subtitle: "Presale Acquisitions",
    description: "Stop waiting in line at public launches. I get my clients front-of-the-line access to the best floor plans and pricing across the Fraser Valley. But more importantly, I act as your filter — the unfiltered truth on whether to buy or walk away. I don't promote or hype projects; I don't work for developers. My only job is to help you decide if the project is actually right for you.",
    image: showroomTourImage,
    benefits: [
      "VIP pricing and early floor plan access",
      "Line-by-line disclosure and contract review",
      "Developer track-record analysis",
      "Strict ROI and cash-flow math",
    ],
  },
  {
    id: "assignments",
    title: "Presale Assignment Strategy",
    subtitle: "Contract Assignments",
    description: "Need to exit your presale contract before completion? Assignments are complex and highly regulated. I provide clear, realistic valuations and manage the entire exit strategy.",
    image: floorplanImage,
    benefits: [
      "Honest, data-backed contract valuation",
      "Navigation of developer assignment restrictions",
      "Tax implication overview",
      "Targeted marketing to qualified assignment buyers",
    ],
  },
  {
    id: "resale",
    title: "Resale & Portfolio Building",
    subtitle: "Resale & Investment Properties",
    description: "My investor clients don't just buy presales. When the math makes sense on a resale property, we execute. You get the same analytical, no-nonsense approach applied to the resale market.",
    image: clientMeetingImage,
    benefits: [
      "Cash-flow analysis and cap-rate breakdowns",
      "Strategic portfolio planning",
      "Fierce negotiation on your behalf",
    ],
  },
  {
    id: "completion",
    title: "Completion, Walkthrough & After-Key Support",
    subtitle: "From Contract to Keys — and Beyond",
    description: "Most agents disappear after you sign. We stay. As completion approaches we walk you through financing, closing costs and the statement of adjustments, do the deficiency walkthrough with you room by room, and make sure you know how your 2-5-10 new-home warranty works before the first year runs out.",
    image: clientMeetingImage,
    benefits: [
      "Completion cost estimate before closing day",
      "Room-by-room deficiency walkthrough",
      "2-5-10 warranty guidance",
      "First-year check-in",
    ],
  },
];

const Services = () => {
  const navigate = useNavigate();
  const handleCTA = () => openLeadDialog('services');

  return (
    <>
      <Helmet>
        <title>Presale Buyer Services | VIP Access, Contract Review & Completion Support | Uzair Muhammad</title>
        <meta
          name="description"
          content="Buyer representation for presale condos & townhomes in the Fraser Valley — VIP access and pricing, contract review, assignments, and support through completion to keys. $0 cost to buyers."
        />
        <meta name="keywords" content="presale services Vancouver, presale condo advisory, assignment sale help, presale contract review, new construction guidance Vancouver, Fraser Valley presale services" />
        <link rel="canonical" href="https://presalewithuzair.com/services" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://presalewithuzair.com/services" />
        <meta property="og:title" content="Presale Buyer Services | VIP Access, Contract Review & Completion Support | Uzair Muhammad" />
        <meta property="og:description" content="Buyer representation for presale condos & townhomes in the Fraser Valley — VIP access and pricing, contract review, assignments, and support through completion to keys. $0 cost to buyers." />
        <meta property="og:image" content="https://presalewithuzair.com/og-image.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Presale Buyer Services | Uzair Muhammad" />
        <meta name="twitter:description" content="Buyer representation for presale condos & townhomes in the Fraser Valley — VIP access and pricing, contract review, assignments, and support through completion to keys. $0 cost to buyers." />
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
                Expert guidance. No sales pressure.
              </h1>
              <p className="mt-6 lede animate-fade-up delay-200">
                Whether you are buying your first presale, assigning a contract, or building a portfolio, we're with you from finding the right project to keys in hand — honest, buyer-first advice at $0 cost to you.
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
                Before you walk into a developer sales centre, talk to someone who works for you.
              </h2>
              <p className="lede mb-8">
                No pressure. No pitch. Just a clear conversation about your goals, budget, and the projects worth comparing.
              </p>
              <div className="flex justify-center">
                <Button
                  variant="hero"
                  size="xl"
                  className="gap-2 rounded-full px-8"
                  onClick={handleCTA}
                >
                  <Mail className="h-5 w-5" />
                  Book a Free 15-Minute Call
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
