import { useState, useEffect } from "react";
import { Quote } from "lucide-react";
import uzairImage from "@/assets/uzair-walking.jpg";
import anishPhoto from "@/assets/testimonials/anish.jpg";
import adamPhoto from "@/assets/testimonials/adam.jpg";
import rayPhoto from "@/assets/testimonials/ray.jpg";

const testimonials = [
  {
    quote: "As first-time buyers, we were nervous, but Uzair made everything clear, manageable, and stress-free. He took the time to understand what we wanted, explained every step thoroughly, and never once rushed us.",
    name: "Anish",
    type: "First-Time Buyer",
    photo: anishPhoto,
  },
  {
    quote: "Uzair helped me with my investment property and made sure I got the best deal. He's straightforward, knows the market, and will tell you directly if a project isn't right. No fluff, no hype — just honesty and expertise.",
    name: "Adam",
    type: "Investor",
    photo: adamPhoto,
  },
  {
    quote: "Now I see why he's called the presale expert. Uzair's relationships with developers helped us secure the best unit in the building at an incredible price. His transparency and guidance helped our family find our first home in just two weeks.",
    name: "Ray",
    type: "First-Time Buyer",
    photo: rayPhoto,
  },
];

export const BookingContextSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="book-section" className="py-16 sm:py-24 bg-background relative overflow-hidden">
      {/* Colorful bokeh effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-[5%] w-32 h-32 md:w-48 md:h-48 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-40 right-[10%] w-24 h-24 md:w-40 md:h-40 rounded-full bg-pink-500/20 blur-3xl" />
        <div className="absolute top-1/3 right-[5%] w-28 h-28 md:w-44 md:h-44 rounded-full bg-purple-500/15 blur-3xl" />
      </div>

      <div className="container-xl px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Rotating Testimonial Quotes */}
          <div className="max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="relative bg-card/50 backdrop-blur-sm rounded-2xl border border-border p-6 sm:p-8 min-h-[220px] sm:min-h-[240px]">
              <Quote className="absolute top-4 left-4 sm:top-6 sm:left-6 h-8 w-8 sm:h-10 sm:w-10 text-primary/20" />
              <blockquote 
                className={`relative z-10 text-center transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
              >
                {/* Client Photo */}
                <div className="flex justify-center mb-4">
                  <img 
                    src={currentTestimonial.photo} 
                    alt={currentTestimonial.name}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-primary/30"
                  />
                </div>
                <p className="text-base sm:text-lg lg:text-xl text-foreground/90 italic leading-relaxed">
                  "{currentTestimonial.quote}"
                </p>
                <footer className="mt-4 sm:mt-6">
                  <p className="text-sm sm:text-base font-semibold text-foreground">{currentTestimonial.name}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{currentTestimonial.type}</p>
                </footer>
              </blockquote>
              
              {/* Dots indicator */}
              <div className="flex justify-center gap-2 mt-4 sm:mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsAnimating(true);
                      setTimeout(() => {
                        setCurrentIndex(index);
                        setIsAnimating(false);
                      }, 300);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-primary w-6' 
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-10 sm:mb-12">
            <p className="section-label mb-3 sm:mb-4">Ready to Get Started?</p>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground uppercase tracking-tight">
              Book a <span className="text-gradient">Discovery Call</span>
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-foreground/70 max-w-2xl mx-auto font-normal normal-case tracking-normal">
              A quick conversation to understand your goals and see if we're a good fit.
            </p>
          </div>

          {/* Mobile: Calendar only */}
          <div className="lg:hidden space-y-4">
            {/* Calendly Calendar - Full viewport height on mobile */}
            <div className="rounded-xl overflow-hidden border border-border bg-card h-[calc(100vh-120px)] min-h-[500px]">
              <iframe
                src="https://calendly.com/meetuzair/30min?hide_gdpr_banner=1&background_color=0a0a0a&text_color=ffffff&primary_color=d4a853"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Schedule a meeting with Uzair"
                style={{ border: 'none' }}
              />
            </div>
            
            <div className="text-center">
              <p className="text-xs text-foreground/70">
                Consultations available in <span className="text-primary font-medium">English</span>, <span className="text-primary font-medium">Punjabi</span>, <span className="text-primary font-medium">Hindi</span> & <span className="text-primary font-medium">Urdu</span>
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Limited weekly availability. Serious inquiries only.
              </p>
            </div>
          </div>

          {/* Desktop: Side by side layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={uzairImage}
                alt="Uzair Muhammad - Presale Expert"
                className="w-full aspect-[4/5] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>

            {/* Right Column - Calendly Calendar */}
            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden border border-border bg-card h-[700px]">
                <iframe
                  src="https://calendly.com/meetuzair/30min?hide_gdpr_banner=1&background_color=0a0a0a&text_color=ffffff&primary_color=d4a853"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  title="Schedule a meeting with Uzair"
                  style={{ border: 'none' }}
                />
              </div>
              
              <div className="text-center">
                <p className="text-sm text-foreground/70">
                  Consultations available in <span className="text-primary font-medium">English</span>, <span className="text-primary font-medium">Punjabi</span>, <span className="text-primary font-medium">Hindi</span> & <span className="text-primary font-medium">Urdu</span>
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Limited weekly availability. Serious inquiries only.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
