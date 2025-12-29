import { CheckCircle, XCircle } from "lucide-react";

const comparisons = [
  {
    category: "Transaction Type",
    presaleExpert: "Presale-only specialization with deep market knowledge",
    regularRealtor: "Primarily resale transactions with occasional presales",
  },
  {
    category: "Disclosure Review",
    presaleExpert: "Line-by-line disclosure analysis identifying red flags",
    regularRealtor: "Basic overview or reliance on developer's summary",
  },
  {
    category: "Developer Relationships",
    presaleExpert: "Direct relationships with developers for VIP access",
    regularRealtor: "Limited or no developer access",
  },
  {
    category: "Assignment Expertise",
    presaleExpert: "Deep knowledge of assignment clauses and exit strategies",
    regularRealtor: "Limited understanding of assignment complexities",
  },
  {
    category: "Market Timing",
    presaleExpert: "Data-driven entry timing based on cycle analysis",
    regularRealtor: "Reactive approach based on current listings",
  },
  {
    category: "Investment Analysis",
    presaleExpert: "ROI projections, deposit leverage, and hold strategies",
    regularRealtor: "Basic price comparisons",
  },
];

const whyPresalesAreDifferent = [
  {
    title: "Presales are contracts, not properties",
    description: "You're buying a promise to build something. The disclosure document — not the showroom — tells the real story.",
  },
  {
    title: "Deposits are leverage, not sunk costs",
    description: "With the right structure, you can control $500K+ in real estate with $25K down. But wrong deposits trap your capital.",
  },
  {
    title: "Assignments are not guaranteed",
    description: "Many buyers assume they can sell before completion. Most projects have restrictions that prevent this.",
  },
  {
    title: "Developers are not all equal",
    description: "Completion timelines, build quality, and fee structures vary wildly. The wrong choice costs you years and money.",
  },
];

export const DifferentiationSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container-xl px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <p className="section-label mb-3 sm:mb-4">Why Expertise Matters</p>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Presale Expert vs. <span className="text-gradient">Regular Realtor</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-foreground/70 max-w-2xl mx-auto">
            Presales are fundamentally different from resale transactions. Most agents treat them the same — and their clients pay the price.
          </p>
        </div>

        {/* Why Presales Are Different */}
        <div className="mb-10 sm:mb-16">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-6 sm:mb-8 text-center">
            Why Presales Require Specialized Expertise
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {whyPresalesAreDifferent.map((item, index) => (
              <div
                key={index}
                className="p-4 sm:p-6 bg-card rounded-lg sm:rounded-xl border border-border"
              >
                <h4 className="font-semibold text-sm sm:text-base text-foreground mb-1.5 sm:mb-2">{item.title}</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison - Mobile Cards / Desktop Table */}
        {/* Mobile: Stacked Cards */}
        <div className="sm:hidden space-y-4">
          {comparisons.map((row, index) => (
            <div
              key={index}
              className="bg-card rounded-xl border border-border overflow-hidden"
            >
              {/* Category Header */}
              <div className="px-4 py-3 bg-background border-b border-border">
                <p className="text-sm font-semibold text-foreground">{row.category}</p>
              </div>
              
              {/* Comparison Content */}
              <div className="divide-y divide-border">
                {/* Presale Expert */}
                <div className="p-4 bg-primary/5">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-full bg-primary/20 flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-primary mb-1">Presale Expert</p>
                      <p className="text-sm text-foreground">{row.presaleExpert}</p>
                    </div>
                  </div>
                </div>
                
                {/* Typical Realtor */}
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 rounded-full bg-muted flex-shrink-0">
                      <XCircle className="h-4 w-4 text-muted-foreground/60" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Typical Realtor</p>
                      <p className="text-sm text-muted-foreground">{row.regularRealtor}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Table */}
        <div className="hidden sm:block bg-card rounded-2xl border border-border overflow-hidden">
          <div className="grid grid-cols-3 bg-background border-b border-border">
            <div className="p-4 lg:p-6">
              <p className="font-semibold text-sm text-foreground">Comparison</p>
            </div>
            <div className="p-4 lg:p-6 border-l border-border bg-primary/5">
              <p className="font-semibold text-sm text-primary">Presale Expert (Uzair)</p>
            </div>
            <div className="p-4 lg:p-6 border-l border-border">
              <p className="font-semibold text-sm text-muted-foreground">Typical Realtor</p>
            </div>
          </div>

          {comparisons.map((row, index) => (
            <div
              key={index}
              className={`grid grid-cols-3 ${index !== comparisons.length - 1 ? 'border-b border-border' : ''}`}
            >
              <div className="p-4 lg:p-6">
                <p className="text-sm font-medium text-foreground">{row.category}</p>
              </div>
              <div className="p-4 lg:p-6 border-l border-border bg-primary/5">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground/80">{row.presaleExpert}</p>
                </div>
              </div>
              <div className="p-4 lg:p-6 border-l border-border">
                <div className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-muted-foreground/50 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">{row.regularRealtor}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Educational Note */}
        <div className="mt-8 sm:mt-12 p-5 sm:p-8 bg-card rounded-xl sm:rounded-2xl border border-border text-center">
          <p className="text-sm sm:text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            "Most agents have never read a full disclosure document. They don't know what GST obligations look like, how maintenance fees are calculated, or what assignment restrictions mean for their clients. That's not their fault — presales weren't part of their training. But it <em>is</em> why you need someone who specializes."
          </p>
          <p className="text-xs sm:text-sm text-primary mt-3 sm:mt-4">— Uzair Muhammad</p>
        </div>
      </div>
    </section>
  );
};
