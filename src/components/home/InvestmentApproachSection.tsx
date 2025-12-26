import { TrendingUp, Wallet, Clock, Calendar } from "lucide-react";
import investmentImage from "@/assets/investment-meeting.jpeg";

const principles = [
  {
    icon: TrendingUp,
    title: "Invest in Undervalued Projects",
    description: "Over 80% of presale projects are overpriced. We focus only on those with true value potential.",
  },
  {
    icon: Wallet,
    title: "Minimal Deposits",
    description: "Put down the lowest amount of deposit possible to maintain financial flexibility.",
  },
  {
    icon: Clock,
    title: "Maximize Holding Time",
    description: "Invest in projects with long completion timelines to maximize appreciation.",
  },
  {
    icon: Calendar,
    title: "5 Year Hold Strategy",
    description: "Always go in with a 5 year hold from contract for optimal returns.",
  },
];

export const InvestmentApproachSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container-xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="image-reveal rounded-2xl overflow-hidden">
              <img
                src={investmentImage}
                alt="Investment strategy meeting"
                className="w-full h-[500px] object-cover"
              />
            </div>
            {/* ROI Badge */}
            <div className="absolute -bottom-6 -right-6 bg-primary rounded-xl p-6 shadow-xl">
              <p className="text-xs font-medium text-primary-foreground/80 uppercase tracking-wider">ROI</p>
              <p className="text-4xl font-display font-bold text-primary-foreground">+50%</p>
            </div>
          </div>

          {/* Content Side */}
          <div>
            <p className="section-label mb-4">Uzair's Investment Approach</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Value <span className="text-gradient">Investments</span>
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-10">
              Over 80% of presale projects are overpriced and don't meet the criteria of an ideal 
              presale investment. Uzair's approach is simple and proven:
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {principles.map((principle, index) => (
                <div 
                  key={principle.title} 
                  className="group p-5 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <principle.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{principle.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{principle.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
