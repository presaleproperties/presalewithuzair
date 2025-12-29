import { Button } from "@/components/ui/button";
import { ArrowRight, Home, TrendingUp } from "lucide-react";
import { useCalendly } from "@/hooks/useCalendly";

const segments = [
  {
    icon: Home,
    title: "First-Time Buyers",
    description: "Buying your first presale condo is exciting — but without expert guidance, it's easy to make costly mistakes.",
    problems: [
      "Buying with 5–10% deposit without understanding the risks",
      "Missing critical disclosure red flags",
      "Not understanding contracts, GST, and timelines",
      "Getting locked into unfavorable deposit structures",
    ],
    solution: "Uzair reviews every disclosure document, negotiates deposits, and ensures you're buying into a project with real value potential — at no cost to you.",
    cta: "See How I Help First-Time Buyers",
    note: "Working with a presale expert costs you $0 — the developer pays the commission.",
  },
  {
    icon: TrendingUp,
    title: "Investors",
    description: "Presales can be highly profitable — but only with the right strategy and risk management.",
    problems: [
      "Overleveraging with high deposit requirements",
      "No exit strategy if markets shift",
      "Buying projects with poor assignment terms",
      "Treating assignment as a guarantee (it's not)",
    ],
    solution: "Uzair helps you maximize deposit leverage, plan assignment strategies as Plan B, and time entries based on market cycles — not hype.",
    cta: "See How I Help Investors",
    note: "Deposit leverage strategies + assignment planning for risk-managed investing.",
  },
];

export const AudienceSegmentSection = () => {
  const { openCalendly } = useCalendly();

  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container-xl px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <p className="section-label mb-3 sm:mb-4">Who This Is For</p>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Presale Guidance for <span className="text-gradient">Buyers & Investors</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-foreground/70 max-w-2xl mx-auto">
            Whether you're buying your first home or building an investment portfolio — presales require specialized expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {segments.map((segment) => (
            <div
              key={segment.title}
              className="bg-card rounded-xl sm:rounded-2xl border border-border p-5 sm:p-8 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-primary/10 flex-shrink-0">
                  <segment.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-foreground">
                    {segment.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mt-1">{segment.description}</p>
                </div>
              </div>

              <div className="mb-4 sm:mb-6">
                <p className="text-xs sm:text-sm font-medium text-foreground/80 mb-2 sm:mb-3">Common challenges:</p>
                <ul className="space-y-1.5 sm:space-y-2">
                  {segment.problems.map((problem, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-destructive/60 mt-1.5 sm:mt-2 flex-shrink-0" />
                      {problem}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-primary/5 rounded-lg sm:rounded-xl border border-primary/10">
                <p className="text-xs sm:text-sm text-foreground/90">{segment.solution}</p>
              </div>

              {segment.note && (
                <p className="text-xs text-primary mb-3 sm:mb-4">{segment.note}</p>
              )}

              <Button
                variant="outline"
                className="gap-2 group w-full sm:w-auto text-sm h-11 sm:h-10"
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
