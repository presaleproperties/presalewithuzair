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
    description: "We start with your goal, budget and timeline. First home, investment, move-up purchase, condo or townhome — the right project depends on what you need the property to do for you. No pitch. Just a clear conversation about whether presale makes sense.",
    image: officeWideImage,
  },
  {
    step: "02",
    title: "Market Fit",
    description: "Before choosing a project, we look at where your money makes the most sense. Surrey, Langley, Abbotsford, Delta, Coquitlam and the rest of the Fraser Valley attract different buyers, renters and long-term demand. The city comes before the building.",
    image: presaleBuilding,
  },
  {
    step: "03",
    title: "Project Shortlist",
    description: "You don't need 140 listings. You need the right two or three options. I narrow the field using price, location, developer, floor plan, deposit structure, incentives, completion timing and your intended use.",
    image: showroomTourImage,
  },
  {
    step: "04",
    title: "Floor Plan & Numbers Review",
    description: "Then we pressure-test the unit itself. Does the layout use space well? Does the deposit schedule work for your cash flow? How does the price compare with nearby resale and competing new construction? Are the incentives genuinely valuable? This is where a good-looking project either becomes a good decision — or doesn't.",
    image: brochureReviewImage,
  },
  {
    step: "05",
    title: "The Walk-Away Rule",
    description: "Not every opportunity deserves a yes. If the price is stretched, the floor plan is weak, the deposit schedule doesn't fit or the project simply isn't right for you, I'll tell you. Sometimes the best presale decision is the one you don't make.",
    image: showroomEntranceImage,
  },
  {
    step: "06",
    title: "Purchase & Completion Guidance",
    description: "If you decide to move forward, I stay involved beyond the signing. We'll keep track of deposit milestones, construction updates, financing preparation, closing costs, walkthrough timing and possession. For contract, legal, lending or tax questions outside my role as your Realtor, I'll help you identify what needs to be confirmed with the appropriate professional.",
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
            A buyer-side process designed to replace sales-centre pressure with clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 lg:gap-y-16">
          {steps.map((item, index) => (
            <article
              key={item.step}
              className="group reveal"
              style={{ transitionDelay: `${(index % 3) * 90}ms` }}
            >
              <div className="image-reveal relative overflow-hidden rounded-sm">
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
