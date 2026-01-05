import { Helmet } from "react-helmet-async";
import { Star, Quote } from "lucide-react";
import logo from "@/assets/logo.png";
import uzairPhoto from "@/assets/uzair-headshot.jpeg";

// Testimonial photos
import adamPhoto from "@/assets/testimonials/adam.jpg";
import akhiPhoto from "@/assets/testimonials/akhi.jpg";
import anishPhoto from "@/assets/testimonials/anish.jpg";
import michellePhoto from "@/assets/testimonials/michelle.jpg";
import rayPhoto from "@/assets/testimonials/ray.jpg";
import monaPhoto from "@/assets/testimonials/mona.jpg";

const GOOGLE_REVIEWS_URL = "https://share.google/qgUTcQF2kOnjBBPr7";

const testimonials = [
  { 
    name: "Michelle K.", 
    quote: "Uzair made my first presale purchase completely stress-free! He walked me through every step and was always available to answer my questions.", 
    type: "First-Time Buyer",
    photo: michellePhoto
  },
  { 
    name: "Ray S.", 
    quote: "His market knowledge saved me from a bad investment. He actually told me NOT to buy a unit that I was excited about because the developer had issues.", 
    type: "Investor",
    photo: rayPhoto
  },
  { 
    name: "Anish P.", 
    quote: "Honest advice that actually helped me make the right decision. No pressure, just facts and expertise.", 
    type: "Buyer",
    photo: anishPhoto
  },
  { 
    name: "Adam T.", 
    quote: "Uzair's disclosure review caught several red flags that I would have completely missed. Worth every minute.", 
    type: "Investor",
    photo: adamPhoto
  },
  { 
    name: "Akhi M.", 
    quote: "Finally found a realtor who actually knows presales inside and out. The difference in expertise is night and day.", 
    type: "Repeat Buyer",
    photo: akhiPhoto
  },
  { 
    name: "Mona R.", 
    quote: "Best decision I made was booking that first call. Uzair helped me understand exactly what to look for.", 
    type: "First-Time Buyer",
    photo: monaPhoto
  },
];

const StarRating = () => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
    ))}
  </div>
);

const Book = () => {
  return (
    <div className="min-h-screen min-h-[100dvh] bg-background flex flex-col">
      <Helmet>
        <title>Book a Call | Presale with Uzair</title>
        <meta name="description" content="Schedule a one-on-one call with Uzair to discuss your presale real estate needs." />
      </Helmet>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src={logo} alt="Presale with Uzair" className="h-8 w-auto" />
          </a>
          <a 
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="font-medium">31+ Reviews</span>
          </a>
        </div>
      </header>

      {/* Hero Section - Compact on mobile */}
      <section className="py-3 sm:py-6 lg:py-12 border-b border-border/30">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2 sm:mb-4">
            <div className="w-10 h-10 sm:w-14 sm:h-14 lg:w-20 lg:h-20 rounded-full overflow-hidden border-2 border-primary/50 shadow-lg shadow-primary/20">
              <img 
                src={uzairPhoto} 
                alt="Uzair" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left sm:hidden">
              <h1 className="text-base font-bold text-foreground">
                Book a Call
              </h1>
              <p className="text-xs text-muted-foreground">
                Discuss your presale goals
              </p>
            </div>
          </div>
          <h1 className="hidden sm:block text-2xl lg:text-3xl font-bold text-foreground mb-2">
            Book a One-on-One Call
          </h1>
          <p className="hidden sm:block text-base text-muted-foreground max-w-md mx-auto">
            Let's discuss your presale goals and how I can help you make smarter investment decisions.
          </p>
        </div>
      </section>

      {/* Testimonials Section - Compact on mobile */}
      <section className="py-2 sm:py-4 lg:py-6 border-b border-border/30 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <a 
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded-full hover:border-primary/50 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <StarRating />
              <span className="text-sm font-medium text-foreground">31+ Reviews</span>
            </a>
          </div>

          {/* Mobile: Horizontal scroll - compact */}
          <div className="lg:hidden">
            <div className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
              {testimonials.slice(0, 4).map((testimonial, index) => (
                <a
                  key={index}
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 w-[220px] snap-center bg-card border border-border rounded-lg p-2.5 hover:border-primary/50 transition-all"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 border border-border">
                      <img 
                        src={testimonial.photo} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-medium text-foreground text-xs truncate">{testimonial.name}</h3>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    "{testimonial.quote}"
                  </p>
                </a>
              ))}
            </div>
            <div className="text-center mt-1">
              <a 
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:text-primary/80 transition-colors"
              >
                View all on Google →
              </a>
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <a
                key={index}
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-border">
                    <img 
                      src={testimonial.photo} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-medium text-foreground text-sm truncate">{testimonial.name}</h3>
                      <StarRating />
                    </div>
                    <span className="text-xs text-primary/80">{testimonial.type}</span>
                  </div>
                </div>
                <div className="relative">
                  <Quote className="absolute -top-1 -left-1 w-4 h-4 text-primary/20" />
                  <p className="text-sm text-muted-foreground pl-4 line-clamp-3">
                    {testimonial.quote}
                  </p>
                </div>
              </a>
            ))}
          </div>

          <div className="hidden lg:block text-center mt-4">
            <a 
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              View all reviews on Google →
            </a>
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="flex-1 pb-16 lg:pb-4">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <div className="text-center mb-3 sm:mb-4">
            <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-foreground mb-1 uppercase tracking-tight">
              Pick a Time That Works
            </h2>
            <p className="text-xs sm:text-sm text-foreground/70">
              Consultations available in <span className="text-primary font-medium">English</span>, <span className="text-primary font-medium">Punjabi</span>, <span className="text-primary font-medium">Hindi</span> & <span className="text-primary font-medium">Urdu</span>
            </p>
          </div>

          {/* Mobile: Viewport-based height like homepage */}
          <div className="lg:hidden">
            <div className="rounded-xl overflow-hidden border border-border bg-card h-[calc(100dvh-170px)] min-h-[620px]">
              <iframe
                src="https://calendly.com/meetuzair/30min?hide_gdpr_banner=1&background_color=0f1419&text_color=fafafa&primary_color=0fd9e8"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Schedule a meeting with Uzair"
                style={{ border: 'none' }}
              />
            </div>
            <div className="text-center mt-2">
              <p className="text-xs text-muted-foreground">
                Limited weekly availability. Serious inquiries only.
              </p>
            </div>
            {/* Extra space so Safari bottom bar doesn’t cover the final CTA */}
            <div className="h-20" />
          </div>

          {/* Desktop: Full-width calendar */}
          <div className="hidden lg:block">
            <div className="w-full rounded-xl overflow-hidden border border-border bg-card h-[800px] xl:h-[850px]">
              <iframe
                src="https://calendly.com/meetuzair/30min?hide_gdpr_banner=1&background_color=0f1419&text_color=fafafa&primary_color=0fd9e8"
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
      </section>

      {/* Footer */}
      <footer className="py-4 sm:py-6 border-t border-border/50 bg-card/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            © {new Date().getFullYear()} Presale with Uzair. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Book;
