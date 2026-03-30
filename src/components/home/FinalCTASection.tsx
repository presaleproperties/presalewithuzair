import { Button } from "@/components/ui/button";
import communityLeaderImage from "@/assets/community-leader-stage.jpg";

export const FinalCTASection = () => {
  const handleBookClick = () => {
    document.getElementById('book-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="dark-section relative py-20 sm:py-28 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={communityLeaderImage}
          alt="Vancouver Presale Expo"
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/50" />
      </div>

      <div className="container-xl relative z-10 px-5 sm:px-8 lg:px-16">
        <div className="max-w-xl">
          <p className="text-primary font-bold tracking-[0.2em] text-xs sm:text-sm mb-3 uppercase">
            Community Leader
          </p>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-5">
            Founder, Vancouver{" "}
            <span className="text-primary">Presale Expo</span>
          </h2>

          <p className="text-base sm:text-lg text-white/70 mb-4 leading-relaxed">
            The largest annual gathering for real estate agents and developers in the presale space — training 1,000+ realtors and launching groundbreaking projects.
          </p>

          <p className="text-sm text-white/50 mb-8 italic">
            Get guidance from the same expert who educates the industry.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-2 border-white/80 text-white bg-transparent hover:bg-white hover:text-black px-8 py-6 text-base font-semibold"
              onClick={handleBookClick}
            >
              Work With Uzair
            </Button>
            <a
              href="https://vancouverpresaleexpo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors px-4 py-3"
            >
              vancouverpresaleexpo.com ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
