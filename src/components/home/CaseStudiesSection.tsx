import { TrendingUp, Home, Building2 } from "lucide-react";

const caseStudies = [
  {
    icon: Home,
    type: "First-Time Buyer",
    title: "Young professional avoided $80K mistake",
    situation: "First-time buyer eager to purchase a presale in a trendy neighborhood. Ready to sign with minimal research.",
    strategy: "Uzair reviewed the disclosure and identified the developer had a history of delayed completions and hidden fee structures.",
    numbers: {
      originalPrice: "$650K",
      deposit: "$65K (10%)",
      redirected: "Different project at $620K with better terms",
    },
    outcome: "Client purchased a better-located unit with a reputable developer, 5% lower deposit, and estimated $80K+ in avoided losses from the original problematic project.",
    riskAvoided: "Delayed completion (2+ years), surprise levies, and poor resale value.",
  },
  {
    icon: Home,
    type: "Downsizer Buyer",
    title: "Empty nesters secured premium floor at launch",
    situation: "Retired couple looking to downsize into a presale condo. Overwhelmed by options and confused by disclosure documents.",
    strategy: "Uzair identified a quality developer project, secured VIP access, and negotiated a premium corner unit before public launch.",
    numbers: {
      price: "$890K",
      deposit: "10% extended over 18 months",
      appreciation: "$120K+ paper gain by completion",
    },
    outcome: "Couple secured their ideal floor plan, avoided public launch competition, and saw significant appreciation by move-in.",
    riskAvoided: "Overpaying at public launch, missing preferred floor plans, high upfront deposits.",
  },
  {
    icon: TrendingUp,
    type: "Investor",
    title: "Investor doubled down with deposit leverage",
    situation: "Experienced investor wanted to expand portfolio but had limited liquid capital for large deposits.",
    strategy: "Uzair sourced two projects with 5% deposit structures and 4-year completions, maximizing leverage and hold time.",
    numbers: {
      totalInvestment: "$120K in deposits",
      exposure: "$2.4M in real estate value",
      projectedROI: "60%+ before completion",
    },
    outcome: "Investor secured two units with minimal capital outlay and strong assignment flexibility if needed.",
    riskAvoided: "Overleveraging, projects with no assignment clauses, short timelines.",
  },
  {
    icon: TrendingUp,
    type: "Investor",
    title: "Assignment exit secured $140K profit",
    situation: "Investor needed to exit a presale 18 months before completion due to changing financial circumstances.",
    strategy: "Uzair structured an assignment sale, marketed to qualified buyers, and negotiated terms that protected the investor's interests.",
    numbers: {
      originalPrice: "$720K",
      assignmentPrice: "$860K",
      netProfit: "$140K after fees",
    },
    outcome: "Clean exit with significant profit, avoiding completion obligations and mortgage qualification requirements.",
    riskAvoided: "Forced completion, cash flow strain, rushed sale at discount.",
  },
  {
    icon: Building2,
    type: "Developer Advisory",
    title: "Launch strategy accelerated absorption by 40%",
    situation: "Developer launching 180-unit project struggling with initial sales velocity. Realtors weren't bringing qualified buyers.",
    strategy: "Uzair consulted on pricing adjustments, created realtor education sessions, and brought qualified investor network to the table.",
    numbers: {
      unitsLaunched: "180 units",
      absorptionBefore: "15 units/month",
      absorptionAfter: "21 units/month",
    },
    outcome: "Project achieved 40% faster absorption, reducing carrying costs and improving project economics.",
    riskAvoided: "Stalled launch, price reductions, negative market perception.",
  },
];

export const CaseStudiesSection = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container-xl">
        <div className="text-center mb-16">
          <p className="section-label mb-4">Real Results</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground">
            Case <span className="text-gradient">Studies</span>
          </h2>
          <p className="mt-4 text-foreground/70 max-w-2xl mx-auto">
            Real scenarios, real strategies, real outcomes. Names withheld for privacy — numbers speak for themselves.
          </p>
        </div>

        <div className="grid gap-8">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl border border-border p-8 hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Header */}
                <div className="lg:w-1/3">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <study.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-primary">{study.type}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-4">
                    {study.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{study.situation}</p>
                </div>

                {/* Strategy & Numbers */}
                <div className="lg:w-1/3 space-y-4">
                  <div>
                    <p className="text-xs font-medium text-foreground/60 uppercase tracking-wider mb-2">Strategy</p>
                    <p className="text-sm text-foreground/80">{study.strategy}</p>
                  </div>
                  <div className="p-4 bg-card rounded-xl border border-border">
                    <p className="text-xs font-medium text-foreground/60 uppercase tracking-wider mb-3">Key Numbers</p>
                    <div className="space-y-2">
                      {Object.entries(study.numbers).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span className="font-semibold text-foreground">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Outcome */}
                <div className="lg:w-1/3 space-y-4">
                  <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                    <p className="text-xs font-medium text-primary uppercase tracking-wider mb-2">Outcome</p>
                    <p className="text-sm text-foreground/90">{study.outcome}</p>
                  </div>
                  <div className="p-4 bg-destructive/5 rounded-xl border border-destructive/10">
                    <p className="text-xs font-medium text-destructive uppercase tracking-wider mb-2">Risk Avoided</p>
                    <p className="text-sm text-foreground/70">{study.riskAvoided}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
