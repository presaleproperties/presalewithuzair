import { useReveal } from "@/hooks/useReveal";
import { OptimizedImage } from "@/components/ui/optimized-image";
import officeWideImage from "@/assets/uzair-office-wide.jpg";
import presaleBuilding from "@/assets/presale-building.jpg";
import showroomTourImage from "@/assets/uzair-showroom-tour.jpg";
import brochureReviewImage from "@/assets/uzair-brochure-review.jpg";
import showroomEntranceImage from "@/assets/uzair-showroom-entrance.jpg";
import clientsImage from "@/assets/uzair-clients.jpg";

const steps = [
  {
    step: "01",
    title: "Buyer Strategy Call",
    description: "We start with your goal, budget, timeline, and comfort level. First home, investment, move-up, condo, townhome, or new-construction home — the right project depends on what you actually need it to do. No pressure. No sales-centre urgency. Just a clear conversation about whether presale makes sense for you right now.",
    image: officeWideImage,
  },
  {
    step: "02",
    title: "Market Fit",
    description: "I help you compare the right city and property type before choosing a project. Surrey, Langley, Delta, South Surrey, Abbotsford, and the Fraser Valley all attract different buyers, renters, and long-term demand. The goal is to understand where your money makes the most sense.",
    image: presaleBuilding,
  },
  {
    step: "03",
    title: "Project Shortlist",
    description: "I narrow the options based on price, floor plan, deposit structure, developer, location, incentives, completion timeline, and resale potential. You do not need every listing. You need the right shortlist.",
    image: showroomTourImage,
  },
  {
    step: "04",
    title: "Floor Plan and Numbers Review",
    description: "We look at how the unit actually works. Is the layout practical? Is there wasted space? Will it rent or resell well? Does the deposit structure fit your cash flow? Are the incentives real, or just marketing? This is where we separate good-looking projects from good decisions.",
    image: brochureReviewImage,
  },
  {
    step: "05",
    title: "The Walk-Away Rule",
    description: "If the project does not fit your goal, I will tell you. If the floor plan is weak, the price is stretched, the deposit is aggressive, or the risk is too high, we pause or walk away. A missed bad deal is still a win.",
    image: showroomEntranceImage,
  },
  {
    step: "06",
    title: "Contract and Completion Guidance",
    description: "Before you sign, we review the key business terms together and make sure you know what to confirm with your lawyer, lender, and accountant. That includes deposit dates, GST, completion costs, assignment rules, incentives, closing adjustments, and important contract questions. My support continues after signing: construction updates, completion preparation, walkthrough timing, assignment strategy if needed, and possession day.",
    image: clientsImage,
  },
];

export const ProcessSection = () => {
  useReveal();

  return (
    <section className="section-y bg-card">
      <div className="container-xl px-4 sm:px-6">
        <div className="max-w-3xl mb-14 sm:mb-20 reveal">
          <p className="section-label mb-5">The Process</p>
          <h2 className="h-section text-foreground">
            Clear advice before you commit.
          </h2>
          <p className="mt-5 lede max-w-2xl">
            A simple buyer-side process built to help you understand the project, compare the risks, and avoid signing under pressure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 lg:gap-y-16">
          {steps.map((item, index) => (
            <article
              key={item.step}
              className="group reveal"
              style={{ transitionDelay: `${(index % 3) * 90}ms` }}
            >
              <div className="image-reveal relative overflow-hidden rounded-sm border border-border">
                <OptimizedImage
                  src={item.image}
                  alt={item.title}
                  className="w-full h-44 sm:h-52 object-cover"
                />
              </div>

              <div className="mt-6 flex items-baseline gap-4">
                <span className="font-display text-sm font-semibold tabular-nums text-foreground/35 tracking-[0.08em]">
                  {item.step}
                </span>
                
              </div>

              <h3 className="mt-3 font-display text-lg sm:text-xl font-bold tracking-[-0.02em] text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-sm sm:text-[0.9375rem] text-foreground/62 leading-relaxed">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
