import { MessageSquare, Search, FileText, Home, TrendingUp, Headphones } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import officeWideImage from "@/assets/uzair-office-wide.jpg";
import presaleBuilding from "@/assets/presale-building.jpg";
import brochureReviewImage from "@/assets/uzair-brochure-review.jpg";
import showroomEntranceImage from "@/assets/uzair-showroom-entrance.jpg";
import showroomTourImage from "@/assets/uzair-showroom-tour.jpg";
import clientsImage from "@/assets/uzair-clients.jpg";

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Discovery Call",
    description: "We start by understanding your goals, timeline, and concerns. No sales pitch — just an honest conversation about whether presales make sense for you.",
    image: officeWideImage,
  },
  {
    icon: Search,
    step: "02",
    title: "Education & Research",
    description: "Learn how presales work, what risks to watch for, and which projects meet strict quality standards. Most projects don't make the cut.",
    image: presaleBuilding,
  },
  {
    icon: TrendingUp,
    step: "03",
    title: "Showroom Walkthrough",
    description: "We visit together to review finishes, floor plans, and details. No pressure — just making sure everything aligns with your expectations.",
    image: showroomTourImage,
  },
  {
    icon: Home,
    step: "04",
    title: "Guided Decision",
    description: "With clear information in hand, you make the decision. If I think a project isn't right for you, I'll tell you — even if it means walking away.",
    image: showroomEntranceImage,
  },
  {
    icon: FileText,
    step: "05",
    title: "Contract Review",
    description: "Every disclosure document is reviewed line-by-line. I explain what each clause means and identify red flags before you commit to anything.",
    image: brochureReviewImage,
  },
  {
    icon: Headphones,
    step: "06",
    title: "Ongoing Support",
    description: "From contract to keys (or assignment), I remain your advisor. Questions, updates, and guidance whenever you need it throughout the process.",
    image: clientsImage,
  },
];

export const ProcessSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-card">
      <div className="container-xl px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <p className="section-label mb-3 sm:mb-4">The Process</p>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground uppercase tracking-tight">
            Education <span className="text-gradient">Before Commitment</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-foreground/70 max-w-2xl mx-auto font-normal normal-case tracking-normal">
            A transparent, no-pressure approach focused on helping you make informed decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((item, index) => (
            <div
              key={index}
              className="relative bg-background rounded-xl sm:rounded-2xl border border-border overflow-hidden hover:border-primary/30 transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <OptimizedImage 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                
                {/* Step Number Badge */}
                <div className="absolute top-3 left-3 px-2.5 sm:px-3 py-0.5 sm:py-1 bg-primary text-primary-foreground text-xs sm:text-sm font-bold rounded-full">
                  {item.step}
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-2 sm:mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <item.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-foreground">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline Note */}
        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Typical presale investment timeline: 3-5 years from contract to completion. Ongoing support throughout.
          </p>
        </div>
      </div>
    </section>
  );
};
