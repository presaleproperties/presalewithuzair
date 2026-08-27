import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import heroImage from "@/assets/uzair-hero-headshot.jpeg";

const heroContent = {
  eyebrow: "UZAIR MUHAMMAD",
  headline: "FRASER VALLEY'S LEADING PRESALE EXPERT",
  subheadline: "The sales centre knows how to sell the project.",
  body: "I help you decide whether it's actually right for you.\n\nI represent presale and new-construction buyers across Surrey, Langley, Abbotsford and the Fraser Valley — helping you compare projects, understand the numbers and make a confident decision before you commit.\u00a0English · Punjabi · Hindi · Urdu.",
  cta: "Ask Uzair About a Project",
};

const proofPoints = [
  { value: "450+", label: "Families helped" },
  { value: "$200M+", label: "In new homes" },
  { value: "4.9★", label: "Rated on Google" },
];

const ProofRow = ({ className = "" }: { className?: string }) => (
  <dl className={`grid grid-cols-3 gap-x-6 divider-t pt-5 ${className}`}>
    {proofPoints.map((point, i) => (
      <div
        key={point.label}
        className="pr-4"
      >
        <dt className="font-display text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          {point.value}
        </dt>
        <dd className="mt-1 text-[0.6875rem] sm:text-xs uppercase tracking-[0.14em] text-foreground/45">
          {point.label}
        </dd>
      </div>
    ))}
  </dl>
);

export const HeroSection = () => {
  const handleBookClick = () => {
    document.getElementById("book-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="dark-section relative overflow-hidden bg-background">
      {/* Quiet depth: one soft light source, no coloured orbs */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 90% at 78% 18%, hsl(0 0% 100% / 0.07) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 container-xl px-4 sm:px-6">
        {/* Mobile & tablet */}
        <div className="lg:hidden flex flex-col pt-20 pb-14 md:pt-24 md:pb-16 md:max-w-2xl md:mx-auto">
          <p className="eyebrow text-foreground/55 mb-5 animate-fade-up">{heroContent.eyebrow}</p>

          <h1 className="font-display text-[2.125rem] md:text-[2.625rem] leading-[1.03] font-extrabold mb-5 animate-fade-up delay-100 text-foreground tracking-[-0.03em]">
            {heroContent.headline}
          </h1>

          <p className="text-lg md:text-xl font-medium text-foreground/80 mb-4 animate-fade-up delay-200">
            {heroContent.subheadline}
          </p>

          <p className="text-[0.9375rem] md:text-base text-foreground/55 mb-7 animate-fade-up delay-300 leading-relaxed">
            {heroContent.body}
          </p>

          <div className="animate-fade-up delay-300">
            <Button variant="navSolid" size="lg" className="w-full sm:w-auto" onClick={handleBookClick}>
              {heroContent.cta}
            </Button>
          </div>

          <ProofRow className="mt-8 animate-fade-up delay-400" />

          <div className="relative mt-8 animate-fade-up delay-400">
            <div className="relative overflow-hidden rounded-sm">
              <OptimizedImage
                src={heroImage}
                alt="Uzair Muhammad — Fraser Valley presale specialist"
                className="w-full aspect-[4/5] md:aspect-[3/4]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/55 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden lg:grid lg:grid-cols-[1.05fr_0.95fr] gap-20 items-center pt-28 pb-24 xl:pt-32 xl:pb-28">
          <div>
            <p className="eyebrow text-foreground/55 mb-7 animate-fade-up">{heroContent.eyebrow}</p>

            <h1 className="font-display text-[2.75rem] xl:text-[3.25rem] font-extrabold leading-[1.02] tracking-[-0.035em] animate-fade-up delay-100 text-foreground">
              {heroContent.headline}
            </h1>

            <p className="mt-6 text-xl xl:text-[1.375rem] font-medium text-foreground/80 animate-fade-up delay-200">
              {heroContent.subheadline}
            </p>

            <p className="mt-5 text-base xl:text-[1.0625rem] text-foreground/55 max-w-xl animate-fade-up delay-300 leading-relaxed">
              {heroContent.body}
            </p>

            <div className="mt-9 animate-fade-up delay-300">
              <Button variant="navSolid" size="xl" onClick={handleBookClick}>
                {heroContent.cta}
              </Button>
            </div>

            <ProofRow className="mt-12 max-w-xl animate-fade-up delay-400" />
          </div>

          {/* Portrait */}
          <div className="relative animate-fade-up delay-200">
            <div className="relative w-full max-w-[26rem] mx-auto">
              <div className="relative overflow-hidden rounded-sm">

                <OptimizedImage
                  src={heroImage}
                  alt="Uzair Muhammad — Fraser Valley presale specialist"
                  className="w-full aspect-[3/4]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/45 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
