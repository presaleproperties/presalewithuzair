import { Button } from "@/components/ui/button";
import { ArrowRight, Home, TrendingUp, Building2, Users } from "lucide-react";
import { useCalendly } from "@/hooks/useCalendly";

const segments = [
  {
    icon: Home,
    title: "For Buyers & First-Time Buyers",
    description: "Buying a presale without expert guidance is like signing a contract you don't fully understand.",
    problems: [
      "Overpaying for units in projects that won't appreciate",
      "Missing critical disclosure red flags",
      "Getting locked into unfavorable deposit structures",
      "Not understanding assignment restrictions",
    ],
    solution: "Uzair reviews every disclosure document, negotiates deposits, and ensures you're buying into a project with real value potential.",
    cta: "Book a Buyer Strategy Call",
    note: "Working with a presale expert costs you $0 — the developer pays the commission.",
  },
  {
    icon: TrendingUp,
    title: "For Investors",
    description: "Presales can be highly profitable — but only with the right strategy and risk management.",
    problems: [
      "Overleveraging with high deposit requirements",
      "No exit strategy if markets shift",
      "Buying projects with poor assignment terms",
      "Timing the market without data",
    ],
    solution: "Uzair helps you maximize deposit leverage, plan assignment strategies as Plan B, and time entries based on market cycles — not hype.",
    cta: "Book an Investor Strategy Call",
    note: "Average ROI of 50%+ on strategically selected investments before completion.",
  },
  {
    icon: Building2,
    title: "For Developers",
    description: "Launching a presale project requires more than marketing — it requires buyer psychology and strategic positioning.",
    problems: [
      "Slow absorption rates on new launches",
      "Pricing misalignment with market expectations",
      "Lack of realtor engagement and buy-in",
      "No feedback loop from end buyers",
    ],
    solution: "Uzair provides launch strategy consulting, pricing guidance based on investor criteria, and direct access to a network of qualified buyers.",
    cta: "Discuss Developer Advisory",
    note: "Founder of Vancouver's Largest Presale Expo — 1,000+ realtors trained.",
  },
  {
    icon: Users,
    title: "For Realtors & Agents",
    description: "Most agents don't fully understand presales — and it's costing them deals and credibility.",
    problems: [
      "Clients asking questions you can't answer",
      "Missing out on presale inventory access",
      "Not understanding disclosure documents",
      "Losing investors to presale specialists",
    ],
    solution: "Uzair offers mentorship, education, and strategic exposure to presale inventory through the Vancouver Presale Expo and ongoing training.",
    cta: "Learn About Agent Training",
    note: "Founder of Vancouver Presale Expo — the largest presale training event for agents.",
  },
];

export const AudienceSegmentSection = () => {
  const { openCalendly } = useCalendly();

  return (
    <section className="py-24 bg-background">
      <div className="container-xl">
        <div className="text-center mb-16">
          <p className="section-label mb-4">Who Uzair Helps</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground">
            Presale Guidance for <span className="text-gradient">Every Stakeholder</span>
          </h2>
          <p className="mt-4 text-foreground/70 max-w-2xl mx-auto">
            Whether you're buying your first home, building a portfolio, launching a project, or advising clients — presales require specialized expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {segments.map((segment) => (
            <div
              key={segment.title}
              className="bg-card rounded-2xl border border-border p-8 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-xl bg-primary/10">
                  <segment.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    {segment.title}
                  </h3>
                  <p className="text-muted-foreground mt-1">{segment.description}</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm font-medium text-foreground/80 mb-3">Common problems:</p>
                <ul className="space-y-2">
                  {segment.problems.map((problem, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-destructive/60 mt-2 flex-shrink-0" />
                      {problem}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6 p-4 bg-primary/5 rounded-xl border border-primary/10">
                <p className="text-sm text-foreground/90">{segment.solution}</p>
              </div>

              {segment.note && (
                <p className="text-xs text-primary mb-4">{segment.note}</p>
              )}

              <Button
                variant="outline"
                className="gap-2 group"
                onClick={openCalendly}
              >
                {segment.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
