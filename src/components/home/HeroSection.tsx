import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import heroImage from "@/assets/uzair-hero-headshot.jpeg";
import showroomImage from "@/assets/uzair-showroom-tour.jpg";
import clientMeetingImage from "@/assets/uzair-client-meeting.jpg";
import expoImage from "@/assets/uzair-expo-wide.jpg";
const heroContent = {
  label: "Presale Expert",
  headlinePart1: "Navigate the",
  headlinePart2: "Presale Market",
  headlineAccent: "With Clear",
  headlineAccent2: "Guidance.",
  subheadline: "Buying a presale shouldn't feel confusing or risky. I help you understand contracts, evaluate developers, and avoid costly mistakes — even if that means advising you not to buy.",
  supportingLine: "The unfiltered, no-BS advice you need",
  cta: "Book a Discovery Call",
  microTrust: "Trusted by 350+ first-time buyers & investors • Focused on Metro Vancouver presales"
};
export const HeroSection = () => {
  const handleBookClick = () => {
    document.getElementById('book-section')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <section className="dark-section relative min-h-screen overflow-hidden">
      {/* Navy hero background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/40" />
      
      {/* Subtle navy/gold depth effects */}
      <div className="absolute bottom-0 left-0 right-0 h-[50%] pointer-events-none">
        <div className="absolute bottom-20 left-[10%] w-48 h-48 md:w-72 md:h-72 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute bottom-10 right-[15%] w-40 h-40 md:w-64 md:h-64 rounded-full bg-primary/6 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-t from-primary/4 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 container-xl min-h-screen px-4 sm:px-6">
        {/* Mobile Layout - Stacked like Dan Martell */}
        <div className="lg:hidden flex flex-col min-h-screen pt-20 pb-8">
          {/* Label - Cyan like Dan Martell */}
          <p className="text-primary font-bold tracking-[0.15em] text-sm uppercase mb-4 animate-fade-up">
            {heroContent.label}
          </p>
          
          {/* Large Serif Headline - Mobile */}
          <h1 className="font-display text-[3rem] leading-[1.1] font-normal mb-8 animate-fade-up">
            <span className="text-foreground block">{heroContent.headlinePart1}</span>
            <span className="text-foreground block">{heroContent.headlinePart2}</span>
            <span className="text-shimmer block">{heroContent.headlineAccent}</span>
            <span className="text-shimmer block">{heroContent.headlineAccent2}</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base text-muted-foreground mb-3 animate-fade-up">
            {heroContent.subheadline}
          </p>
          
          {/* Supporting Line */}
          <p className="text-xs text-primary/80 mb-8 animate-fade-up font-medium">
            {heroContent.supportingLine}
          </p>

          {/* CTA Button - Outlined style like Dan Martell */}
          <div className="mb-4 animate-fade-up">
          <Button variant="hero" size="lg" className="rounded-full px-8 py-6 text-base font-semibold shadow-lg" onClick={handleBookClick}>
              {heroContent.cta}
            </Button>
          </div>

          {/* Micro-trust - Mobile */}
          <p className="text-xs text-muted-foreground mb-8 animate-fade-up">
            {heroContent.microTrust}
          </p>

          {/* Hero Photos Grid - Mobile (After the fold like Dan Martell) */}
          <div className="relative mb-8 animate-fade-up">
            {/* Main hero image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-4">
              <OptimizedImage src={heroImage} alt="Uzair Muhammad - Vancouver's Top Presale Expert" className="w-full aspect-[4/5]" priority />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
              
              {/* Floating badge on image */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-background/90 backdrop-blur-sm rounded-xl p-4 border border-border/50">
                  <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">Vancouver's #1</p>
                  <p className="text-sm font-bold text-foreground">Presale Expert & Strategist</p>
                </div>
              </div>
            </div>

            {/* Who I Help Grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* First-Time Buyers */}
              <button onClick={handleBookClick} className="relative rounded-xl overflow-hidden shadow-lg group hover:scale-105 transition-transform duration-300 text-left cursor-pointer">
                <OptimizedImage src={showroomImage} alt="First-time home buyers touring presale showroom" className="w-full aspect-square" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent group-hover:from-background/90 transition-all duration-300" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-[10px] text-primary font-bold uppercase tracking-wider mb-0.5">I Help</p>
                  <p className="text-sm font-bold text-foreground">First-Time Buyers</p>
                </div>
              </button>
              
              {/* Investors */}
              <button onClick={handleBookClick} className="relative rounded-xl overflow-hidden shadow-lg group hover:scale-105 transition-transform duration-300 text-left cursor-pointer">
                <OptimizedImage src={clientMeetingImage} alt="Real estate investor consultation" className="w-full aspect-square" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent group-hover:from-background/90 transition-all duration-300" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-[10px] text-primary font-bold uppercase tracking-wider mb-0.5">I Help</p>
                  <p className="text-sm font-bold text-foreground">Investors</p>
                </div>
              </button>
            </div>

            {/* Community Leader */}
            <a href="https://vancouverpresaleexpo.com/" target="_blank" rel="noopener noreferrer" className="relative rounded-xl overflow-hidden shadow-lg mt-3 block group hover:scale-[1.02] transition-transform duration-300">
              <OptimizedImage src={expoImage} alt="Uzair speaking at Vancouver Presale Expo" className="w-full aspect-[16/9]" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent group-hover:from-background transition-all duration-300" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-[10px] text-primary font-bold uppercase tracking-wider mb-0.5">Community Leader</p>
                <p className="text-sm font-bold text-foreground">Founder, Vancouver Presale Expo</p>
              </div>
            </a>
          </div>

          {/* Trust Badge - Mobile */}
          <div className="pt-6 border-t border-border/30 mt-auto animate-fade-up text-center">
            <p className="text-lg font-display font-bold text-foreground">
              Trusted by <span className="text-gradient">350+</span> First-Time Buyers & Investors
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              $200M+ in presales closed • 4+ years presale focus
            </p>
          </div>
        </div>

        {/* Desktop Layout - Keep existing side-by-side */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-center min-h-screen pt-24 pb-16">
          {/* Left Content */}
          <div className="space-y-10">
            <div className="space-y-8">
              {/* Label */}
              <p className="text-primary font-semibold tracking-[0.2em] text-xs uppercase animate-fade-up">
                {heroContent.label}
              </p>
              
              {/* Headline — premium advisory serif, light weight */}
              <h1 className="font-display text-6xl xl:text-7xl 2xl:text-8xl font-normal leading-[1.08] animate-fade-up">
                <span className="text-foreground block">{heroContent.headlinePart1}</span>
                <span className="text-foreground block">{heroContent.headlinePart2}</span>
                <span className="text-shimmer block">{heroContent.headlineAccent}</span>
                <span className="text-shimmer block">{heroContent.headlineAccent2}</span>
              </h1>

              {/* Sub-headline */}
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed animate-fade-up">
                {heroContent.subheadline}
              </p>
              
              {/* Supporting Line */}
              <p className="text-sm text-primary/80 animate-fade-up font-medium tracking-wide">
                {heroContent.supportingLine}
              </p>
            </div>

            {/* CTA Section */}
            <div className="space-y-3 animate-fade-up">
              <Button variant="hero" size="xl" className="gap-2 rounded-full px-10 py-7 text-base font-semibold shadow-lg" onClick={handleBookClick}>
                {heroContent.cta}
              </Button>
              
              {/* Micro-trust */}
              <p className="text-sm text-muted-foreground">
                {heroContent.microTrust}
              </p>
            </div>

            {/* Trust Badge */}
            <div className="pt-8 border-t border-border/50 animate-fade-up">
              <p className="text-xl font-display font-bold text-foreground">
                Trusted by <span className="text-gradient">350+</span> First-Time Buyers & Investors
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                $200M+ in presales closed • 4+ years presale focus
              </p>
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
                <OptimizedImage src={heroImage} alt="Uzair Muhammad - Vancouver's Top Presale Expert" className="w-full aspect-[3/4]" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
            </div>

            {/* Who I Help Grid - Desktop */}
            <div className="relative grid grid-cols-3 gap-4">
              {/* First-Time Buyers */}
              <button onClick={handleBookClick} className="relative rounded-xl overflow-hidden shadow-lg group hover:scale-105 transition-transform duration-300 text-left cursor-pointer">
                <OptimizedImage src={showroomImage} alt="First-time home buyers touring presale showroom" className="w-full aspect-[4/3]" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent group-hover:from-background/90 transition-all duration-300" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-[10px] text-primary font-bold uppercase tracking-wider mb-0.5">I Help</p>
                  <p className="text-sm font-bold text-foreground">First-Time Buyers</p>
                </div>
              </button>
              
              {/* Investors */}
              <button onClick={handleBookClick} className="relative rounded-xl overflow-hidden shadow-lg group hover:scale-105 transition-transform duration-300 text-left cursor-pointer">
                <OptimizedImage src={clientMeetingImage} alt="Real estate investor consultation" className="w-full aspect-[4/3]" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent group-hover:from-background/90 transition-all duration-300" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-[10px] text-primary font-bold uppercase tracking-wider mb-0.5">I Help</p>
                  <p className="text-sm font-bold text-foreground">Investors</p>
                </div>
              </button>

              {/* Community Leader */}
              <a href="https://vancouverpresaleexpo.com/" target="_blank" rel="noopener noreferrer" className="relative rounded-xl overflow-hidden shadow-lg group hover:scale-105 transition-transform duration-300">
                <OptimizedImage src={expoImage} alt="Uzair at Vancouver Presale Expo" className="w-full aspect-[4/3]" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent group-hover:from-background/90 transition-all duration-300" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-[10px] text-primary font-bold uppercase tracking-wider mb-0.5">Community</p>
                  <p className="text-sm font-bold text-foreground">Leader</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>;
};