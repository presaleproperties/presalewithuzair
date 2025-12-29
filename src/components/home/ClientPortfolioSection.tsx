import { useState } from "react";
import { ChevronLeft, ChevronRight, Building2, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const portfolioProjects = [
  {
    id: 1,
    name: "The Arc Vancouver",
    yearPurchased: 2023,
    units: 47,
    image: "/images/blog/presale-deals.jpg",
  },
  {
    id: 2,
    name: "Lumina Burnaby",
    yearPurchased: 2022,
    units: 32,
    image: "/images/blog/fraser-valley.jpg",
  },
  {
    id: 3,
    name: "Skyview Richmond",
    yearPurchased: 2024,
    units: 58,
    image: "/images/blog/never-buy-direct.jpg",
  },
];

const ClientPortfolioSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % portfolioProjects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + portfolioProjects.length) % portfolioProjects.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        nextProject();
      } else {
        prevProject();
      }
    }
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.05),transparent_50%)]" />
      
      <div className="container-lg relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary uppercase tracking-widest text-sm font-medium mb-4 block">
            Success Stories
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Client Portfolio
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A showcase of successful presale investments made for our clients across Greater Vancouver.
          </p>
        </div>

        {/* Portfolio carousel */}
        <div 
          className="relative max-w-4xl mx-auto"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {portfolioProjects.map((project) => (
                <div key={project.id} className="w-full flex-shrink-0">
                  <div className="relative group">
                    {/* Project image */}
                    <div className="aspect-[16/9] overflow-hidden rounded-2xl">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                    </div>

                    {/* Project info overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                        {project.name}
                      </h3>
                      
                      <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-3 bg-card/80 backdrop-blur-sm px-4 py-3 rounded-xl border border-border/50">
                          <Calendar className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide">Year Purchased</p>
                            <p className="text-foreground font-semibold">{project.yearPurchased}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 bg-card/80 backdrop-blur-sm px-4 py-3 rounded-xl border border-border/50">
                          <Building2 className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide">Units Secured</p>
                            <p className="text-foreground font-semibold">{project.units} Units</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevProject}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card hover:border-primary/50 transition-all duration-300"
            aria-label="Previous project"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={nextProject}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card hover:border-primary/50 transition-all duration-300"
            aria-label="Next project"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-8">
          {portfolioProjects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-primary w-8"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export { ClientPortfolioSection };
