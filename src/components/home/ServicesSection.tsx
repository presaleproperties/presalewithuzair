import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import presaleImage from "@/assets/presale-building.jpg";
import assignmentImage from "@/assets/assignments-building.jpg";
import meetingImage from "@/assets/business-meeting.jpeg";

const services = [
  {
    title: "Presales",
    description: "Thinking of buying a presale condo for investment or personal use? Get insider access to the best projects before they go public.",
    image: presaleImage,
    link: "/services",
  },
  {
    title: "Assignments",
    description: "Bought a presale and looking to assign it before completion? We specialize in maximizing your returns on assignment sales.",
    image: assignmentImage,
    link: "/services",
  },
  {
    title: "Resale",
    description: "Thinking of buying or selling a resale property? We help our clients with complete real estate transactions.",
    image: meetingImage,
    link: "/services",
  },
];

export const ServicesSection = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container-xl">
        <div className="text-center mb-16">
          <p className="section-label mb-4">How Uzair Can Help</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground">
            Presales, Assignments <span className="text-gradient">& Resale</span>
          </h2>
          <p className="mt-4 text-foreground/70 max-w-2xl mx-auto">
            Being a specialist in presales allows Uzair to stay ahead of new projects, 
            gain first access to developments, and negotiate the best deals for his clients.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link
              key={service.title}
              to={service.link}
              className="group relative rounded-2xl overflow-hidden hover-lift"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="aspect-[4/5] image-reveal">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="font-display text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
