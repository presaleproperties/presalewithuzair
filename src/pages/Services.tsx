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
    title: "Presale Guidance",
    subtitle: "New Construction Advisory",
    description: "Considering a presale condo? Before you commit, get clear guidance on contracts, developers, and whether the deal truly makes sense for your situation.",
    image: showroomTourImage,
    benefits: [
      "Honest assessment of each project",
      "Line-by-line contract review",
      "Developer reputation analysis",
      "Red flag identification",
      "Education before commitment",
      "Advice to walk away when needed",
    ],
  },
  {
    id: "assignments",
    title: "Assignment Support",
    subtitle: "Sell Before Completion",
    description: "Looking to assign your presale contract? Get clear guidance on your options, realistic valuations, and the process — without the sales pressure.",
    image: floorplanImage,
    benefits: [
      "Honest valuation of your contract",
      "Clear explanation of your options",
      "Navigate assignment restrictions",
      "Understand tax implications",
      "Developer approval guidance",
      "Transparent process management",
    ],
  },
  {
    id: "resale",
    title: "Resale Properties",
    subtitle: "Buy & Sell",
    description: "Need help with a resale property? Whether buying or selling, get the same buyer-first approach with clear guidance throughout the transaction.",
    image: clientMeetingImage,
    benefits: [
      "Honest market analysis",
      "Realistic pricing guidance",
      "Transparent process",
      "Clear communication",
      "Education at every step",
      "Your interests first",
    ],
  },
];

const Services = () => {
  const { openCalendly } = useCalendly();

  return (
    <>
      <Helmet>
        <title>Services | Presale Guidance, Assignments & Resale | Uzair Muhammad</title>
        <meta
          name="description"
          content="Get clear, buyer-first guidance on presale condos, assignment sales, and resale properties. Independent advice focused on education and protecting your interests."
        />
      </Helmet>

      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-card">
          <div className="container-xl">
            <div className="max-w-3xl">
              <p className="section-label mb-4 animate-fade-up">How I Can Help</p>
              <h1 className="font-display text-5xl lg:text-6xl font-bold text-foreground animate-fade-up delay-100">
                Clear <span className="text-gradient">Guidance</span>
              </h1>
              <p className="mt-6 text-xl text-foreground/80 animate-fade-up delay-200">
                Whether you're buying a presale, assigning a contract, or exploring resale — 
                get honest, buyer-first advice focused on education and protecting your interests.
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
                Have <span className="text-gradient">Questions</span>?
              </h2>
              <p className="text-foreground/80 mb-8">
                Not sure where to start? Let's have an honest conversation about your situation. 
                No pressure, no sales pitch — just clear guidance to help you decide your next step.
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
