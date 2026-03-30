import { Button } from "@/components/ui/button";
import expoImage from "@/assets/uzair-expo-wide.jpg";

export const FinalCTASection = () => {
  const handleBookClick = () => {
    document.getElementById('book-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="dark-section py-20 sm:py-28 bg-[hsl(222,20%,8%)]">
      <div className="container-xl px-5 sm:px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <p className="text-blue-400 font-bold tracking-[0.2em] text-xs sm:text-sm mb-3 uppercase">
              Community Leader
            </p>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-5">
              Founder, Vancouver{" "}
              <span className="text-blue-400">Presale Expo</span>
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

          {/* Image */}
          <div className="order-1 lg:order-2 relative rounded-2xl overflow-hidden">
            <img
              src={expoImage}
              alt="Uzair Muhammad speaking at Vancouver Presale Expo"
              className="w-full h-[300px] sm:h-[380px] lg:h-[420px] object-cover object-center rounded-2xl"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(222,20%,8%)]/40 via-transparent to-transparent rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};
