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
    <section className="py-16 sm:py-24 bg-background relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-card -skew-x-12 origin-top-right hidden lg:block" />
      
      <div className="container-xl relative z-10 px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <p className="section-label mb-3 sm:mb-4">Uzair's Investment Approach</p>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
              Value <span className="text-gradient">Investments</span>
            </h2>
            
            <p className="text-sm sm:text-base text-foreground/80 leading-relaxed mb-6 sm:mb-8">
              Over 80% of presale projects are overpriced and don't meet the criteria of an ideal 
              presale investment. Uzair's approach is simple:
            </p>

            <ul className="space-y-3 sm:space-y-4">
              {investmentPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3 sm:gap-4">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-foreground/90">{point}</span>
                </li>
              ))}
            </ul>

            {/* ROI Badge */}
            <div className="mt-8 sm:mt-10 inline-flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 bg-card rounded-lg sm:rounded-xl p-4 sm:p-6 border border-border">
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">Average ROI</p>
                <p className="text-3xl sm:text-4xl font-display font-bold text-gradient">+50%</p>
              </div>
              <div className="hidden sm:block w-px h-12 bg-border" />
              <div className="sm:hidden w-full h-px bg-border" />
              <p className="text-xs sm:text-sm text-muted-foreground max-w-[200px]">
                Before project completion on strategically selected investments
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative image-reveal rounded-xl sm:rounded-2xl overflow-hidden lg:ml-8">
            <img
              src={investmentImage}
              alt="Uzair discussing investment strategy"
              className="w-full h-[350px] sm:h-[450px] lg:h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};
