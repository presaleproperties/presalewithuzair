import { Quote } from "lucide-react";

const textTestimonials = [
  {
    quote: "Very knowledgeable. Works with passion. Highly recommend. Won't be disappointed. He takes care of all my properties. Trust him with everything.",
    name: "Richard",
    title: "Investor with $15M+ Portfolio",
  },
  {
    quote: "Uzair was a true professional and helped us find the perfect home/investment. His ongoing customer service is a testament to his commitment to his clients.",
    name: "Sukh",
    title: "Investor",
  },
  {
    quote: "I see why he's called the 'presale expert.' His strong relationships with developers enabled us to secure the best unit in the building at an incredible price.",
    name: "Ray M",
    title: "First Time Investor",
  },
  {
    quote: "Uzair's expertise in the presale market is exceptional. Went above and beyond to help me understand the disclosure documents and deposit structures.",
    name: "Alladi",
    title: "Upsizer",
  },
  {
    quote: "After working with multiple agents, Uzair was the only one who truly understood presales. His developer relationships got us VIP pricing.",
    name: "Sarah K",
    title: "First-Time Buyer",
  },
  {
    quote: "Uzair helped me navigate a complex assignment sale. His knowledge of assignment clauses saved me thousands in potential issues.",
    name: "Michael T",
    title: "Assignment Buyer",
  },
];

export const SocialProofSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-background to-card">
      <div className="container-xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-foreground uppercase tracking-tight mb-4">
            BUT DON'T LISTEN TO ME...
          </h2>
          <p className="text-primary font-semibold text-lg">
            Just look at the results.
          </p>
        </div>

        {/* Scrolling Testimonials - Horizontal */}
        <div className="relative">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling container */}
          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
            {textTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[300px] sm:w-[350px] bg-card rounded-xl border border-border p-6 snap-center"
              >
                <Quote className="h-6 w-6 text-primary/40 mb-4" />
                <p className="text-sm sm:text-base text-foreground/90 leading-relaxed mb-6 line-clamp-5">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">
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

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 sm:mt-16 pt-8 border-t border-border/30">
          <div className="text-center">
            <p className="text-3xl sm:text-4xl font-display font-black text-gradient">$200M+</p>
            <p className="text-sm text-muted-foreground mt-1">Presales Closed</p>
          </div>
          <div className="text-center">
            <p className="text-3xl sm:text-4xl font-display font-black text-gradient">300+</p>
            <p className="text-sm text-muted-foreground mt-1">Units Sold</p>
          </div>
          <div className="text-center">
            <p className="text-3xl sm:text-4xl font-display font-black text-gradient">$26M+</p>
            <p className="text-sm text-muted-foreground mt-1">Assignments</p>
          </div>
          <div className="text-center">
            <p className="text-3xl sm:text-4xl font-display font-black text-gradient">99%</p>
            <p className="text-sm text-muted-foreground mt-1">Close Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
};