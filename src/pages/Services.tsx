import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Mail, Search } from "lucide-react";
import showroomTourImage from "@/assets/uzair-showroom-tour.jpg";
import floorplanImage from "@/assets/uzair-floorplan-consultation.jpg";
import clientMeetingImage from "@/assets/uzair-client-meeting.jpg";
import { useCalendly } from "@/hooks/useCalendly";

const services = [
  {
    id: "presales",
    title: "Presale Condos",
    subtitle: "New Construction Investments",
    description: "Thinking of buying a presale condo for investment or personal use? Get insider access to the best projects before they go public.",
    image: showroomTourImage,
    benefits: [
      "Early access to new developments",
      "Priority unit selection",
      "Negotiated pricing and incentives",
      "Lower upfront deposit requirements",
      "Time to save while building completes",
      "Brand new with full warranty",
    ],
  },
  {
    id: "assignments",
    title: "Presale Assignments",
    subtitle: "Sell Before Completion",
    description: "Bought a presale and looking to assign it before completion? We specialize in maximizing your returns on assignment sales.",
    image: floorplanImage,
    benefits: [
      "Expert valuation of your contract",
      "Marketing to qualified buyers",
      "Negotiation to maximize profit",
      "Navigate assignment restrictions",
      "Handle developer approvals",
      "Complete transaction management",
    ],
  },
  {
    id: "resale",
    title: "Resale Properties",
    subtitle: "Buy & Sell",
    description: "Thinking of buying or selling a resale property? We help our clients with complete real estate transactions. Ultimately, all presale units turn to resale properties.",
    image: clientMeetingImage,
    benefits: [
      "Comprehensive market analysis",
      "Strategic pricing for sellers",
      "Negotiation expertise",
      "Full transaction support",
      "Network of qualified buyers",
      "Seamless closing process",
    ],
  },
];

const Services = () => {
  const { openCalendly } = useCalendly();

  return (
    <>
      <Helmet>
        <title>Services | Presale Condos, Assignments & Resale | Uzair Muhammad</title>
        <meta
          name="description"
          content="Explore our real estate services: presale condos, assignment sales, and resale properties. Vancouver's premier presale expert helping investors maximize returns."
        />
      </Helmet>

      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-card">
          <div className="container-xl">
            <div className="max-w-3xl">
              <p className="section-label mb-4 animate-fade-up">How We Can Help</p>
              <h1 className="font-display text-5xl lg:text-6xl font-bold text-foreground animate-fade-up delay-100">
                Our <span className="text-gradient">Services</span>
              </h1>
              <p className="mt-6 text-xl text-foreground/80 animate-fade-up delay-200">
                Being a specialist in presales allows Uzair to stay ahead of new projects, 
                gain first access to developments, and negotiate the best deals for his clients.
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
                    onClick={openCalendly}
                  >
                    Schedule a Call
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className={`image-reveal rounded-2xl overflow-hidden ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-[500px] object-cover"
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
                Ready to Get <span className="text-gradient">Started</span>?
              </h2>
              <p className="text-foreground/80 mb-8">
                Whether you're buying your first presale, looking to assign, or exploring resale options, 
                Uzair is here to help you make informed decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="hero" 
                  size="xl" 
                  className="gap-2 w-full sm:w-auto"
                  onClick={openCalendly}
                >
                  <Mail className="h-5 w-5" />
                  Schedule a Call
                </Button>
                <a href="https://presaleproperties.com" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="xl" className="gap-2 w-full sm:w-auto">
                    <Search className="h-5 w-5" />
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

export default Services;
