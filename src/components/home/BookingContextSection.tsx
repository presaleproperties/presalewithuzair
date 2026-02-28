import { useState, useEffect } from "react";
import { Quote } from "lucide-react";
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
  const [calendlyUrl, setCalendlyUrl] = useState("");

  useEffect(() => {
    // Build Calendly URL with UTM parameters
    const baseUrl = "https://calendly.com/meetuzair/30min?hide_gdpr_banner=1&background_color=f2ede5&text_color=261c14&primary_color=d4a316";
    const urlParams = new URLSearchParams(window.location.search);
    
    const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    const utmString = utmParams
      .filter(param => urlParams.get(param))
      .map(param => `${param}=${encodeURIComponent(urlParams.get(param) || '')}`)
      .join('&');
    
    setCalendlyUrl(utmString ? `${baseUrl}&${utmString}` : baseUrl);
  }, []);

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
      {/* Subtle navy/gold depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-[5%] w-48 h-48 md:w-72 md:h-72 rounded-full bg-primary/6 blur-3xl" />
        <div className="absolute bottom-40 right-[10%] w-40 h-40 md:w-56 md:h-56 rounded-full bg-primary/4 blur-3xl" />
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
          <div className="text-center mb-6 sm:mb-8">
            <p className="section-label mb-3 sm:mb-4">Ready to Get Started?</p>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Book a <span className="text-gradient">Discovery Call</span>
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-foreground/70 max-w-2xl mx-auto font-normal normal-case tracking-normal">
              A quick conversation to understand your goals and see if we're a good fit.
            </p>
            <p className="mt-3 text-xs sm:text-sm text-foreground/70">
              Consultations available in <span className="text-primary font-medium">English</span>, <span className="text-primary font-medium">Punjabi</span>, <span className="text-primary font-medium">Hindi</span> & <span className="text-primary font-medium">Urdu</span>
            </p>
          </div>

          {/* Mobile: Calendar only */}
          <div className="lg:hidden space-y-4">
            {/* Calendly Calendar - Full viewport height on mobile */}
            <div className="rounded-xl overflow-hidden border border-border bg-card h-[calc(100vh-120px)] min-h-[500px]">
              <iframe
                src={calendlyUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                title="Schedule a meeting with Uzair"
                style={{ border: 'none' }}
              />
            </div>
            
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Limited weekly availability. Serious inquiries only.
              </p>
            </div>
          </div>

          {/* Desktop: Full-width calendar - no scroll needed */}
          <div className="hidden lg:block">
            <div className="w-full rounded-xl overflow-hidden border border-border bg-card h-[750px]">
              <iframe
                src={calendlyUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                title="Schedule a meeting with Uzair"
                style={{ border: 'none' }}
              />
            </div>
            
            <div className="text-center mt-4">
              <p className="text-sm text-muted-foreground">
                Limited weekly availability. Serious inquiries only.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
