import { Play, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

// Video testimonials - placeholder thumbnails with names
const videoTestimonials = [
  { name: "Richard", title: "Investor", initial: "R" },
  { name: "Sukh", title: "Investor", initial: "S" },
  { name: "Ray M", title: "First Time Investor", initial: "R" },
  { name: "Alladi", title: "Upsizer", initial: "A" },
  { name: "Sarah K", title: "First-Time Buyer", initial: "S" },
  { name: "Michael T", title: "Assignment Buyer", initial: "M" },
];

const textTestimonials = [
  {
    quote: "Very knowledgeable. Works with passion. Highly recommend. Won't be disappointed. He takes care of all my properties. Trust him with everything.",
    name: "Richard",
    title: "Investor with $15M+ Portfolio",
    highlight: false,
  },
  {
    quote: "Uzair was a true professional and helped us find the perfect home/investment. His ongoing customer service is a testament to his commitment to his clients. Thanks again!!",
    name: "Sukh",
    title: "Investor",
    highlight: false,
  },
  {
    quote: "Now I see why he's called the 'presale expert.' Uzair's expertise in the presale market is exceptional. His strong relationships with developers enabled us to secure the best unit in the building at an incredible price.",
    name: "Ray M",
    title: "First Time Investor",
    highlight: true,
  },
  {
    quote: "Uzair is a very professional and agile realtor. Keeps your requirements in mind and works towards getting it done for you. He was our realtor for buying new property and selling ours.",
    name: "Alladi",
    title: "Upsizer",
    highlight: false,
  },
  {
    quote: "After working with multiple agents who didn't understand presales, Uzair was a breath of fresh air. His developer relationships got us VIP pricing and early access to the best units.",
    name: "Sarah K",
    title: "First-Time Buyer",
    highlight: false,
  },
  {
    quote: "Uzair helped me navigate a complex assignment sale. His knowledge of assignment clauses and developer restrictions saved me thousands in potential issues.",
    name: "Michael T",
    title: "Assignment Buyer",
    highlight: true,
  },
  {
    quote: "From the first meeting, I knew Uzair was different. He took the time to explain every line of the disclosure document. That level of care is rare.",
    name: "Jessica L",
    title: "First-Time Buyer",
    highlight: false,
  },
  {
    quote: "Uzair's strategy for timing the presale market helped us maximize our ROI. His data-driven approach is exactly what investors need.",
    name: "David C",
    title: "Repeat Investor",
    highlight: false,
  },
];

export const SocialProofSection = () => {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ 
      behavior: "smooth",
      block: "start"
    });
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-background via-card/50 to-background">
      <div className="container-xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-foreground uppercase tracking-tight mb-3">
            BUT DON'T LISTEN TO ME...
          </h2>
          <p className="text-primary font-semibold text-base sm:text-lg">
            Just look at the results.
          </p>
        </div>

        {/* Video Testimonial Thumbnails - Horizontal Scroll */}
        <div className="relative mb-12 sm:mb-16">
          <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory px-4 -mx-4">
            {videoTestimonials.map((video, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[140px] sm:w-[180px] snap-center group cursor-pointer"
              >
                {/* Video Thumbnail */}
                <div className="relative aspect-[4/5] rounded-lg sm:rounded-xl overflow-hidden bg-gradient-to-br from-secondary to-muted mb-2 sm:mb-3">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                  
                  {/* Initial placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl sm:text-5xl font-display font-black text-foreground/10">
                      {video.initial}
                    </span>
                  </div>
                  
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-foreground/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play className="h-4 w-4 sm:h-5 sm:w-5 text-background ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                  
                  {/* Bottom gradient with name */}
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
                    <p className="text-xs sm:text-sm font-semibold text-foreground truncate">{video.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Text Testimonials - Two Column Grid on Desktop, Horizontal Scroll on Mobile */}
        <div className="mb-10 sm:mb-14">
          {/* Mobile: Horizontal Scroll */}
          <div className="sm:hidden">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory px-4 -mx-4">
              {textTestimonials.slice(0, 6).map((testimonial, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 w-[280px] rounded-xl p-5 snap-center ${
                    testimonial.highlight 
                      ? 'bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20' 
                      : 'bg-card border border-border'
                  }`}
                >
                  <p className="text-sm text-foreground/90 leading-relaxed mb-4 line-clamp-6">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                      testimonial.highlight ? 'bg-primary/20' : 'bg-secondary'
                    }`}>
                      <span className={`text-xs font-bold ${testimonial.highlight ? 'text-primary' : 'text-foreground/60'}`}>
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: Two Column Masonry-style Grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {textTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`rounded-xl p-6 ${
                  testimonial.highlight 
                    ? 'bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20' 
                    : 'bg-card border border-border'
                }`}
              >
                <Quote className={`h-5 w-5 mb-3 ${testimonial.highlight ? 'text-primary/50' : 'text-muted-foreground/30'}`} />
                <p className="text-sm lg:text-base text-foreground/90 leading-relaxed mb-5">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    testimonial.highlight ? 'bg-primary/20' : 'bg-secondary'
                  }`}>
                    <span className={`text-sm font-bold ${testimonial.highlight ? 'text-primary' : 'text-foreground/60'}`}>
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mid-section CTA */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-base sm:text-lg text-foreground/80 italic mb-5 max-w-xl mx-auto">
            "Uzair's expertise in presales is unmatched..."
          </p>
          <Button 
            variant="outline"
            size="lg"
            className="rounded-full border-2 border-foreground/80 text-foreground bg-transparent hover:bg-foreground hover:text-background px-8 py-6 text-base font-semibold"
            onClick={scrollToForm}
          >
            Work With Me
          </Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-border/30">
          <div className="text-center p-4">
            <p className="text-2xl sm:text-4xl font-display font-black text-gradient">$200M+</p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Presales Closed</p>
          </div>
          <div className="text-center p-4">
            <p className="text-2xl sm:text-4xl font-display font-black text-gradient">300+</p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Units Sold</p>
          </div>
          <div className="text-center p-4">
            <p className="text-2xl sm:text-4xl font-display font-black text-gradient">$26M+</p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Assignments</p>
          </div>
          <div className="text-center p-4">
            <p className="text-2xl sm:text-4xl font-display font-black text-gradient">99%</p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Close Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
};