import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { OptimizedImage } from "@/components/ui/optimized-image";
import consultingImage from "@/assets/uzair-brochure-review.jpg";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container-xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative image-reveal rounded-2xl overflow-hidden order-2 lg:order-1">
            <OptimizedImage
              src={consultingImage}
              alt="Uzair Muhammad consulting with clients"
              className="w-full h-[500px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            
            {/* Floating Card */}
            <div className="absolute bottom-6 left-6 right-6 bg-card/95 backdrop-blur-sm rounded-xl p-6 border border-border">
              <p className="text-sm text-primary font-medium mb-2">Investment Track Record</p>
              <p className="font-display text-2xl font-bold text-foreground">$200M+ in Sales Volume</p>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <p className="section-label mb-4">Meet Uzair</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Vancouver's Premier <span className="text-gradient">Presale Expert.</span>
            </h2>

            <p className="text-lg text-foreground/90 font-semibold mb-4">
              $200M+ in Sales Volume. 450+ Units Sold. Zero BS.
            </p>
            
            <h3 className="font-display text-2xl font-bold text-foreground mb-4">
              I Don't Sell Hype. I Sell Financial Clarity.
            </h3>
            
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>
                I was born in Pakistan and raised right here in Surrey. I know the Fraser Valley because I live here, I raise my two kids here, and I invest my own money here.
              </p>
              <p>
                Early in my career, I noticed a massive problem in the real estate industry: most agents treat presales like an afterthought. They sell the hype of a shiny brochure without understanding the contracts, the developers, or the real risks involved.
              </p>
              <p>
                I will never promote or hype a project just because it launched. I don't work for developers, and I never will. Most realtors promote every new product that hits the market to build leverage with developers. That may help their pipeline, but it does a disservice to buyers — because you can't simultaneously push inventory and protect the buyer from it. I represent buyers only. If a project isn't right for you, I'll say so — even if it means losing the sale.
              </p>
            </div>

            <blockquote className="mt-8 pl-6 border-l-2 border-primary">
              <p className="font-display text-xl italic text-foreground">
                "If you knew what I know now, you wouldn't touch 80% of the presale projects out there."
              </p>
              <cite className="text-sm text-muted-foreground mt-2 block not-italic">— Uzair Muhammad</cite>
            </blockquote>

            <div className="flex gap-4 mt-10">
              <Button variant="hero" size="lg" className="gap-2" asChild>
                <Link to="/about">
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
