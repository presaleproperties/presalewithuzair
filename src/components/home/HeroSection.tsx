import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/ui/optimized-image";
import heroImage from "@/assets/uzair-walking.jpg";
import showroomImage from "@/assets/uzair-showroom-tour.jpg";
import clientMeetingImage from "@/assets/uzair-client-meeting.jpg";
import expoImage from "@/assets/uzair-expo-wide.jpg";
const heroContent = {
  label: "PRESALE EXPERT",
  headlinePart1: "NAVIGATE THE",
  headlinePart2: "PRESALE MARKET",
  headlineAccent: "WITH CLEAR",
  headlineAccent2: "GUIDANCE.",
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
  return <section className="relative min-h-screen overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />
      
      {/* Colorful bokeh/light effects at bottom - matching Dan Martell style */}
      <div className="absolute bottom-0 left-0 right-0 h-[40%] pointer-events-none">
        {/* Pink/magenta bokeh */}
        <div className="absolute bottom-20 left-[10%] w-32 h-32 md:w-48 md:h-48 rounded-full bg-pink-500/30 blur-3xl" />
        <div className="absolute bottom-40 left-[5%] w-20 h-20 md:w-32 md:h-32 rounded-full bg-pink-400/40 blur-2xl" />
        <div className="absolute bottom-10 left-[20%] w-16 h-16 md:w-24 md:h-24 rounded-full bg-fuchsia-500/30 blur-xl" />
        
        {/* Purple bokeh */}
        <div className="absolute bottom-32 left-[25%] w-24 h-24 md:w-40 md:h-40 rounded-full bg-purple-500/25 blur-3xl" />
        <div className="absolute bottom-16 left-[35%] w-16 h-16 md:w-28 md:h-28 rounded-full bg-violet-400/30 blur-2xl" />
        
        {/* Cyan/teal bokeh */}
        <div className="absolute bottom-24 right-[20%] w-28 h-28 md:w-44 md:h-44 rounded-full bg-cyan-500/25 blur-3xl" />
        <div className="absolute bottom-8 right-[30%] w-20 h-20 md:w-32 md:h-32 rounded-full bg-teal-400/30 blur-2xl" />
        
        {/* Light rays effect */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 container-xl min-h-screen px-4 sm:px-6">
        {/* Mobile Layout - Stacked like Dan Martell */}
        <div className="lg:hidden flex flex-col min-h-screen pt-20 pb-8">
          {/* Label - Cyan like Dan Martell */}
          <p className="text-primary font-bold tracking-[0.15em] text-sm mb-4 animate-fade-up">
            {heroContent.label}
          </p>
          
          {/* Large Bold Headline - Mobile */}
          <h1 className="font-display text-[2.5rem] leading-[1.05] font-black mb-6 animate-fade-up">
            <span className="text-foreground block">{heroContent.headlinePart1}</span>
            <span className="text-foreground block">{heroContent.headlinePart2}</span>
            <span className="text-muted-foreground block">{heroContent.headlineAccent}</span>
            <span className="text-muted-foreground block">{heroContent.headlineAccent2}</span>
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
            <Button variant="outline" size="lg" className="rounded-full border-2 border-foreground/80 text-foreground bg-transparent hover:bg-foreground hover:text-background px-8 py-6 text-base font-semibold" onClick={handleBookClick}>
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
          <div className="space-y-8">
            <div className="space-y-6">
              {/* Label */}
              <p className="text-primary font-bold tracking-[0.15em] text-sm animate-fade-up">
                {heroContent.label}
              </p>
              
              {/* Headline */}
              <h1 className="font-display text-5xl xl:text-6xl font-black leading-[1.1] animate-fade-up">
                <span className="text-foreground">{heroContent.headlinePart1} </span>
                <span className="text-foreground">{heroContent.headlinePart2} </span>
                <span className="text-muted-foreground">{heroContent.headlineAccent} </span>
                <span className="text-muted-foreground">{heroContent.headlineAccent2}</span>
              </h1>

              {/* Sub-headline */}
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl animate-fade-up">
                {heroContent.subheadline}
              </p>
              
              {/* Supporting Line */}
              <p className="text-sm text-primary/80 animate-fade-up font-medium">
                {heroContent.supportingLine}
              </p>
            </div>

            {/* CTA Section */}
            <div className="space-y-3 animate-fade-up">
              <Button variant="outline" size="xl" className="gap-2 rounded-full border-2 border-foreground/80 text-foreground bg-transparent hover:bg-foreground hover:text-background px-10 py-7 text-base font-semibold" onClick={handleBookClick}>
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