import { MessageSquare, Search, FileText, Home, TrendingUp, Headphones } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Understand Your Goals",
    description: "We start with a strategy call to understand your timeline, budget, risk tolerance, and whether you're buying for investment, personal use, or both.",
  },
  {
    icon: Search,
    step: "02",
    title: "Shortlist Projects",
    description: "Based on your criteria, Uzair identifies projects that meet strict value and risk standards — filtering out the 80% that don't qualify.",
  },
  {
    icon: FileText,
    step: "03",
    title: "Review Disclosure & Pricing",
    description: "Every disclosure document is reviewed line-by-line. Pricing is analyzed against comparables. Red flags are identified before you commit.",
  },
  {
    icon: Home,
    step: "04",
    title: "Secure Your Unit",
    description: "With VIP access and developer relationships, we secure your preferred unit — often before public launch or with negotiated terms.",
  },
  {
    icon: TrendingUp,
    step: "05",
    title: "Plan Your Exit",
    description: "Whether you're holding to completion or planning an assignment, we establish your exit strategy from day one — including market triggers and timing.",
  },
  {
    icon: Headphones,
    step: "06",
    title: "Ongoing Advisory",
    description: "From contract to keys (or assignment), Uzair remains your advisor. Market updates, milestone reminders, and strategic guidance throughout the process.",
  },
];

export const ProcessSection = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container-xl">
        <div className="text-center mb-16">
          <p className="section-label mb-4">The Process</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground">
            How We <span className="text-gradient">Work Together</span>
          </h2>
          <p className="mt-4 text-foreground/70 max-w-2xl mx-auto">
            A structured, transparent approach that protects your interests and maximizes your outcomes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((item, index) => (
            <div
              key={index}
              className="relative bg-background rounded-2xl border border-border p-8 hover:border-primary/30 transition-all duration-300"
            >
              {/* Step Number */}
              <div className="absolute -top-4 left-8 px-3 py-1 bg-primary text-primary-foreground text-sm font-bold rounded-full">
                {item.step}
              </div>

              <div className="pt-4">
                <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Typical presale investment timeline: 3-5 years from contract to completion. Ongoing support throughout.
          </p>
        </div>
      </div>
    </section>
  );
};
