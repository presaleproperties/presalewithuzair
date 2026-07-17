import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import heroImage from "@/assets/uzair-hero-headshot.jpeg";
const heroContent = {
  eyebrow: "UZAIR MUHAMMAD",
  headline: "Buyer-only presale specialist for Fraser Valley.",
  subheadline: "First-time buyers and investors across Surrey, Langley, Abbotsford and beyond.",
  body: "Uzair represents buyers only, never developers. Fees are usually covered by the builder. He works in Punjabi, Hindi, Urdu and English.",
  cta: "Book a free 15-min call"
};

export const HeroSection = () => {
  const handleBookClick = () => {
    document.getElementById('book-section')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <section className="dark-section relative min-h-screen overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />
      
      {/* Subtle blue glow effects */}
      <div className="absolute bottom-0 left-0 right-0 h-[40%] pointer-events-none">
        <div className="absolute bottom-20 left-[10%] w-32 h-32 md:w-48 md:h-48 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-40 left-[5%] w-20 h-20 md:w-32 md:h-32 rounded-full bg-primary/20 blur-2xl" />
        <div className="absolute bottom-10 left-[20%] w-16 h-16 md:w-24 md:h-24 rounded-full bg-blue-500/15 blur-xl" />
        
        <div className="absolute bottom-32 left-[25%] w-24 h-24 md:w-40 md:h-40 rounded-full bg-blue-400/12 blur-3xl" />
        <div className="absolute bottom-16 left-[35%] w-16 h-16 md:w-28 md:h-28 rounded-full bg-indigo-400/12 blur-2xl" />
        
        <div className="absolute bottom-24 right-[20%] w-28 h-28 md:w-44 md:h-44 rounded-full bg-primary/12 blur-3xl" />
        <div className="absolute bottom-8 right-[30%] w-20 h-20 md:w-32 md:h-32 rounded-full bg-blue-300/15 blur-2xl" />
        
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 container-xl min-h-screen px-4 sm:px-6">
        {/* Mobile & Tablet Layout */}
        <div className="lg:hidden flex flex-col min-h-screen pt-20 pb-8 md:pt-28 md:pb-12 md:max-w-2xl md:mx-auto">
          {/* Eyebrow */}
          <p className="text-foreground font-bold tracking-[0.2em] text-xs md:text-sm uppercase mb-4 animate-fade-up">
            {heroContent.eyebrow}
          </p>
          
          {/* Headline */}
          <h1 className="font-display text-[2.5rem] md:text-5xl leading-[1.05] font-black mb-3 animate-fade-up text-foreground">
            {heroContent.headline}
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl font-semibold text-foreground/70 mb-4 animate-fade-up">
            {heroContent.subheadline}
          </p>

          {/* Body */}
          <p className="text-base md:text-lg text-foreground/60 mb-4 animate-fade-up leading-relaxed">
            {heroContent.body}
          </p>


          {/* Authority strip */}
          <p className="text-xs md:text-sm text-foreground/60 mb-6 animate-fade-up">
            450+ units sold · $200M+ in new construction · 5 years presale only · 4.9★ from 36 Google reviews
          </p>


          {/* CTA Button */}
          <div className="mb-4 mt-2 animate-fade-up">
            <Button variant="outline" size="lg" className="rounded-full border-2 border-foreground/80 text-foreground bg-transparent hover:bg-foreground hover:text-background px-8 py-6 md:px-10 md:py-7 text-base font-semibold" onClick={handleBookClick}>
              {heroContent.cta}
            </Button>
          </div>




          {/* Hero Photos Grid */}
          <div className="relative mb-8 animate-fade-up">
            {/* Main hero image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-4">
              <OptimizedImage src={heroImage} alt="Uzair Muhammad - Fraser Valley presale specialist" className="w-full aspect-[4/5] md:aspect-[3/4]" priority />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
            </div>

          </div>

        </div>

        {/* Desktop Layout - Keep existing side-by-side */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center min-h-screen pt-24 pb-16">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              {/* Eyebrow */}
              <p className="text-foreground font-bold tracking-[0.2em] text-sm uppercase animate-fade-up">
                {heroContent.eyebrow}
              </p>
              
              {/* Headline */}
              <h1 className="font-display text-5xl xl:text-6xl font-black leading-[1.1] animate-fade-up text-foreground">
                {heroContent.headline}
              </h1>

              {/* Subheadline */}
              <p className="text-2xl font-semibold text-foreground/70 animate-fade-up">
                {heroContent.subheadline}
              </p>

              {/* Body */}
              <p className="text-lg md:text-xl text-foreground/60 max-w-xl animate-fade-up leading-relaxed">
                {heroContent.body}
              </p>


              {/* Authority strip */}
              <p className="text-sm text-foreground/60 animate-fade-up">
                450+ units sold · $200M+ in new construction · 5 years presale only · 4.9★ from 36 Google reviews
              </p>

            </div>

            {/* CTA Section */}
            <div className="space-y-3 animate-fade-up">
              <Button variant="outline" size="xl" className="gap-2 rounded-full border-2 border-foreground/80 text-foreground bg-transparent hover:bg-foreground hover:text-background px-10 py-7 text-base font-semibold" onClick={handleBookClick}>
                {heroContent.cta}
              </Button>


            </div>
          </div>


          {/* Right Column - Image + Who I Help */}
          <div className="relative animate-fade-up delay-200 space-y-6 flex flex-col items-center">
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-accent/10 rounded-full blur-2xl" />
            
            {/* Main image container */}
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0 border-2 border-primary/20 rounded-2xl translate-x-2 translate-y-2" />
              
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <OptimizedImage src={heroImage} alt="Uzair Muhammad - Fraser Valley presale specialist" className="w-full aspect-[3/4]" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>;
};