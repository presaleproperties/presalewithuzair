import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const investments = [
  {
    name: "Hayer TC - Langley",
    description: "Clients took advantage of some held-back inventory from the developer in this master plan.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop",
  },
  {
    name: "Walker House - Delta",
    description: "We got 17 of our clients into this project after the developer made significant price drops.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop",
  },
  {
    name: "SOCO - Burquitlam",
    description: "Built by Anthem, a master plan in Burquitlam. Our clients got in early on this one.",
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&auto=format&fit=crop",
  },
];

export const ClientInvestmentsSection = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container-xl">
        <div className="text-center mb-16">
          <p className="section-label mb-4">Uzair's Project Picks</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Our Client's <span className="text-gradient">Investments</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Picking the right project, at the right price, and with the right terms and conditions 
            is the ONLY way to maximize your return on presale investments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {investments.map((investment, index) => (
            <div
              key={investment.name}
              className="group relative rounded-2xl overflow-hidden hover-lift bg-background border border-border"
            >
              {/* Image */}
              <div className="aspect-[4/3] image-reveal overflow-hidden">
                <img
                  src={investment.image}
                  alt={investment.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-xs font-medium text-primary uppercase tracking-wider">Investment</span>
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {investment.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {investment.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="gap-2" asChild>
            <a href="https://presalewithuzair.com/en/invested" target="_blank" rel="noopener noreferrer">
              View More Projects
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
