import { MessageSquare, Search, TrendingUp, Home, X, Headphones } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import officeWideImage from "@/assets/uzair-office-wide.jpg";
import presaleBuilding from "@/assets/presale-building.jpg";
import showroomTourImage from "@/assets/uzair-showroom-tour.jpg";
import brochureReviewImage from "@/assets/uzair-brochure-review.jpg";
import showroomEntranceImage from "@/assets/uzair-showroom-entrance.jpg";
import clientsImage from "@/assets/uzair-clients.jpg";

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Buyer Strategy Call",
    description: "We start with your goal, budget, timeline, and comfort level. First home, investment, move-up, condo, townhome, or new-construction home — the right project depends on what you actually need it to do. No pressure. No sales-centre urgency. Just a clear conversation about whether presale makes sense for you right now.",
    image: officeWideImage,
  },
  {
    icon: Search,
    step: "02",
    title: "Market Fit",
    description: "I help you compare the right city and property type before choosing a project. Surrey, Langley, Delta, South Surrey, Abbotsford, and the Fraser Valley all attract different buyers, renters, and long-term demand. The goal is to understand where your money makes the most sense.",
    image: presaleBuilding,
  },
  {
    icon: TrendingUp,
    step: "03",
    title: "Project Shortlist",
    description: "I narrow the options based on price, floor plan, deposit structure, developer, location, incentives, completion timeline, and resale potential. You do not need every listing. You need the right shortlist.",
    image: showroomTourImage,
  },
  {
    icon: Home,
    step: "04",
    title: "Floor Plan and Numbers Review",
    description: "We look at how the unit actually works. Is the layout practical? Is there wasted space? Will it rent or resell well? Does the deposit structure fit your cash flow? Are the incentives real, or just marketing? This is where we separate good-looking projects from good decisions.",
    image: brochureReviewImage,
  },
  {
    icon: X,
    step: "05",
    title: "The Walk-Away Rule",
    description: "If the project does not fit your goal, I will tell you. If the floor plan is weak, the price is stretched, the deposit is aggressive, or the risk is too high, we pause or walk away. A missed bad deal is still a win.",
    image: showroomEntranceImage,
  },
  {
    icon: Headphones,
    step: "06",
    title: "Contract and Completion Guidance",
    description: "Before you sign, we review the key business terms together and make sure you know what to confirm with your lawyer, lender, and accountant. That includes deposit dates, GST, completion costs, assignment rules, incentives, closing adjustments, and important contract questions. My support continues after signing: construction updates, completion preparation, walkthrough timing, assignment strategy if needed, and possession day.",
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
            Clear advice before you commit.
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-foreground/70 max-w-2xl mx-auto font-normal normal-case tracking-normal">
            A simple buyer-side process built to help you understand the project, compare the risks, and avoid signing under pressure.
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
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent" />
                
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
        <div className="mt-8 sm:mt-12 text-center max-w-3xl mx-auto">
          <p className="text-sm sm:text-base font-semibold text-foreground mb-2">
            Typical presale timeline
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Most presale purchases take months to several years from contract to completion. The goal is to make sure the decision still makes sense when the keys are ready.
          </p>
        </div>
      </div>
    </section>
  );
};