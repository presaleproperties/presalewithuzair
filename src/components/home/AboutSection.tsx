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
              <p className="font-display text-2xl font-bold text-foreground">$200M+ In Volume</p>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <p className="section-label mb-4">Meet Uzair</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Presale <span className="text-gradient">Expert</span>
            </h2>
            
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>
                Uzair is an investor-focused Real Estate Agent and Presale Expert specializing in 
                Vancouver's new construction condo market. With over $200M+ in volume and 350+ clients served, 
                Uzair has built a reputation for delivering exceptional results and unparalleled client service.
              </p>
              <p>
                Working primarily with investors and first-time buyers, Uzair provides insider access 
                to presale projects, market trends, and exclusive opportunities before they become publicly available.
              </p>
              <p>
                He has helped clients save over $1M+ in negotiated credits from developers. 
                Uzair is dedicated to building long-term relationships to deliver a lifetime of real estate services.
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
