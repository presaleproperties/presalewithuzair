import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Mail, Search } from "lucide-react";
import showroomTourImage from "@/assets/uzair-showroom-tour.jpg";
import floorplanImage from "@/assets/uzair-floorplan-consultation.jpg";
import clientMeetingImage from "@/assets/uzair-client-meeting.jpg";
import { useNavigate } from "react-router-dom";

const services = [
  {
    id: "presales",
    title: "Presale Purchasing & VIP Access",
    subtitle: "Presale Acquisitions",
    description: "Stop waiting in line at public launches. I get my clients front-of-the-line access to the best floor plans and pricing across the Fraser Valley. But more importantly, I act as your filter — the unfiltered truth on whether to buy or walk away.",
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
];

const Services = () => {
  const navigate = useNavigate();
  const handleCTA = () => navigate('/?scroll=book-section');

  return (
    <>
      <Helmet>
        <title>Presale Buyer Services | VIP Access, Contract Protection & Incentives | Uzair Muhammad</title>
        <meta
          name="description"
          content="Expert buyer's representation for presale condos and townhomes in the Fraser Valley. VIP access before public launch, exclusive developer incentives, and full legal protection on every contract."
        />
        <meta name="keywords" content="presale services Vancouver, presale condo advisory, assignment sale help, presale contract review, new construction guidance Vancouver, Fraser Valley presale services" />
        <link rel="canonical" href="https://presalewithuzair.com/services" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://presalewithuzair.com/services" />
        <meta property="og:title" content="Presale Buyer Services | VIP Access, Contract Protection & Incentives | Uzair Muhammad" />
        <meta property="og:description" content="Expert buyer's representation for presale condos and townhomes in the Fraser Valley. VIP access before public launch, exclusive developer incentives, and full legal protection on every contract." />
        <meta property="og:image" content="https://presalewithuzair.com/og-image.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Presale Buyer Services | Uzair Muhammad" />
        <meta name="twitter:description" content="Expert buyer's representation for presale condos and townhomes in the Fraser Valley. VIP access, exclusive incentives, and full contract protection." />
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
                }
              ]
            }
          })}
        </script>
      </Helmet>

      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-card">
          <div className="container-xl">
            <div className="max-w-3xl">
              <p className="section-label mb-4 animate-fade-up">How I Can Help</p>
              <h1 className="font-display text-5xl lg:text-6xl font-bold text-foreground animate-fade-up delay-100">
                Expert Guidance. <span className="text-gradient">No Sales Pressure.</span>
              </h1>
              <p className="mt-6 text-xl text-foreground/80 animate-fade-up delay-200">
                Whether you are buying your first presale, assigning a contract, or looking for an investment property, you get honest, buyer-first advice designed to protect your capital.
              </p>
            </div>
          </div>
        </section>

        {/* Services */}
        {services.map((service, index) => (
          <section
            key={service.id}
            id={service.id}
            className={`py-24 ${index % 2 === 0 ? "bg-background" : "bg-card"}`}
          >
            <div className="container-xl">
              <div className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <p className="section-label mb-4">{service.subtitle}</p>
                  <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-6">
                    {service.title.split(" ")[0]}{" "}
                    <span className="text-gradient">{service.title.split(" ").slice(1).join(" ")}</span>
                  </h2>
                  <p className="text-foreground/80 leading-relaxed mb-8">
                    {service.description}
                  </p>

                  <ul className="grid sm:grid-cols-2 gap-4 mb-8">
                    {service.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground/90">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant="hero"
                    size="lg"
                    className="gap-2"
                    onClick={handleCTA}
                  >
                    Book a Buyer Strategy Call
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className={`image-reveal rounded-2xl overflow-hidden ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-[500px] object-cover saturate-[1.15] contrast-[1.05] brightness-95"
                  />
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section className="py-24 bg-card">
          <div className="container-xl">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-4xl font-bold text-foreground mb-6">
                Before you walk into a developer sales centre, <span className="text-gradient">talk to someone who works for you.</span>
              </h2>
              <p className="text-foreground/80 mb-8">
                No pressure. No pitch. Just a clear conversation about your goals, budget, and the projects worth comparing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="hero"
                  size="xl"
                  className="gap-2 w-full sm:w-auto"
                  onClick={handleCTA}
                >
                  <Mail className="h-5 w-5" />
                  Book a Buyer Strategy Call
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  className="gap-2 w-full sm:w-auto"
                  onClick={handleCTA}
                >
                  <Search className="h-5 w-5" />
                  Get My Presale Shortlist
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
