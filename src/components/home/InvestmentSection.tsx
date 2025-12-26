import { CheckCircle } from "lucide-react";
import investmentImage from "@/assets/investment-meeting.jpeg";

const investmentPoints = [
  "Invest in undervalued projects.",
  "Put down the lowest amount of deposit possible.",
  "Maximize holding time by investing in projects with long completion timelines.",
  "Always go in with a 5 year hold from contract.",
];

export const InvestmentSection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-card -skew-x-12 origin-top-right hidden lg:block" />
      
      <div className="container-xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <p className="section-label mb-4">Uzair's Investment Approach</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Value <span className="text-gradient">Investments</span>
            </h2>
            
            <p className="text-foreground/80 leading-relaxed mb-8">
              Over 80% of presale projects are overpriced and don't meet the criteria of an ideal 
              presale investment. Uzair's approach is simple:
            </p>

            <ul className="space-y-4">
              {investmentPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/90">{point}</span>
                </li>
              ))}
            </ul>

            {/* ROI Badge */}
            <div className="mt-10 inline-flex items-center gap-4 bg-card rounded-xl p-6 border border-border">
              <div>
                <p className="text-sm text-muted-foreground">Average ROI</p>
                <p className="text-4xl font-display font-bold text-gradient">+50%</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <p className="text-sm text-muted-foreground max-w-[200px]">
                Before project completion on strategically selected investments
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative image-reveal rounded-2xl overflow-hidden lg:ml-8">
            <img
              src={investmentImage}
              alt="Uzair discussing investment strategy"
              className="w-full h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};
