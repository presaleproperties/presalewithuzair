import expoImage from "@/assets/uzair-expo-wide.jpg";

export const FinalCTASection = () => {


  return (
    <section className="dark-section section-y bg-[hsl(222,20%,8%)]">
      <div className="container-xl px-5 sm:px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <p className="text-white/50 font-semibold tracking-[0.22em] text-[0.6875rem] mb-5 uppercase">
              Community Leader
            </p>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-[3rem] font-bold text-white tracking-tight leading-[1.08] mb-6">
              Founder, Vancouver Presale Expo
            </h2>

            <p className="text-base sm:text-lg text-white/70 mb-4 leading-relaxed">
              The largest annual gathering for real estate agents and developers in the presale space — training 1,000+ realtors and launching groundbreaking projects.
            </p>

            <p className="text-sm text-white/50 mb-8 italic">
              Get guidance from the same expert who educates the industry.
            </p>

            <div>
              <a
                href="https://vancouverpresaleexpo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-b border-white/25 pb-1 text-sm font-semibold text-white/75 transition-colors duration-300 hover:border-white hover:text-white"
              >
                vancouverpresaleexpo.com ↗
              </a>
            </div>

          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative rounded-sm overflow-hidden">
            <img
              src={expoImage}
              alt="Uzair Muhammad speaking at Vancouver Presale Expo"
              className="w-full h-[300px] sm:h-[380px] lg:h-[420px] object-cover object-center"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(222,20%,8%)]/45 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};
