import { Check, X } from "lucide-react";

const comparisons = [
  {
    category: "Skin in the Game",
    presaleExpert: "5 personal presale investments",
    regularRealtor: "Sells but doesn't buy presales",
  },
  {
    category: "No Hype",
    presaleExpert: "Never pumps up projects — 4+ years consistent",
    regularRealtor: "Hypes every new launch",
  },
  {
    category: "Honest Advice",
    presaleExpert: "Will advise against bad deals",
    regularRealtor: "Pushes to close any deal",
  },
  {
    category: "Disclosure Review",
    presaleExpert: "Line-by-line red flag analysis",
    regularRealtor: "Quick overview at best",
  },
  {
    category: "Developer Knowledge",
    presaleExpert: "Knows which developers to trust",
    regularRealtor: "Limited developer insight",
  },
  {
    category: "Education Focus",
    presaleExpert: "Teaches before commitment",
    regularRealtor: "Rushes to contract",
  },
];

export const DifferentiationSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container-xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="section-label mb-3 sm:mb-4">Why Expertise Matters</p>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground uppercase tracking-tight">
            Not All Agents Are <span className="text-gradient">Created Equal</span>
          </h2>
        </div>

        {/* Side-by-Side Comparison */}
        <div className="max-w-4xl mx-auto">
          {/* Column Headers */}
          <div className="grid grid-cols-2 gap-3 sm:gap-6 mb-4 sm:mb-6">
            <div className="bg-primary/10 border-2 border-primary rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary mb-2 sm:mb-3">
                <Check className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" strokeWidth={3} />
              </div>
              <h3 className="font-display text-sm sm:text-xl font-bold text-foreground uppercase tracking-tight">
                Presale Expert
              </h3>
              <p className="text-xs sm:text-sm text-primary font-medium mt-1">(Uzair)</p>
            </div>
            <div className="bg-muted/30 border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-muted mb-2 sm:mb-3">
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" strokeWidth={3} />
              </div>
              <h3 className="font-display text-sm sm:text-xl font-bold text-muted-foreground uppercase tracking-tight">
                Regular Agent
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">(Most others)</p>
            </div>
          </div>

          {/* Comparison Rows */}
          <div className="space-y-2 sm:space-y-3">
            {comparisons.map((row, index) => (
              <div key={index} className="grid grid-cols-2 gap-3 sm:gap-6">
                {/* Presale Expert */}
                <div className="relative bg-primary/5 border border-primary/20 rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-primary" strokeWidth={3} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] sm:text-xs text-primary font-semibold uppercase tracking-wider mb-0.5 sm:mb-1">
                        {row.category}
                      </p>
                      <p className="text-xs sm:text-sm text-foreground font-medium leading-snug">
                        {row.presaleExpert}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Regular Agent */}
                <div className="relative bg-muted/20 border border-border rounded-lg sm:rounded-xl p-3 sm:p-4">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-muted flex items-center justify-center mt-0.5">
                      <X className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground/60" strokeWidth={3} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] sm:text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-0.5 sm:mb-1">
                        {row.category}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-snug">
                        {row.regularRealtor}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Insight */}
          <div className="mt-8 sm:mt-12 text-center">
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Presales require specialized knowledge. You deserve someone focused on your interests — not the developer's.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
