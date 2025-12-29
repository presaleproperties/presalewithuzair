import { useState, useRef, TouchEvent } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGoogleReviews, GoogleReview } from "@/hooks/useGoogleReviews";

// Fallback testimonials in case API fails
const fallbackTestimonials = [
  {
    quote: "Very knowledgeable. Works with passion. Highly recommend. Won't be disappointed. He takes care of all my properties. Trust him with everything.",
    name: "Richard",
    title: "Investor with $15M+ Portfolio",
  },
  {
    quote: "Uzair was a true professional and helped us find the perfect home/investment. His ongoing customer service is a testament to his commitment to his clients. Thanks again!!",
    name: "Sukh",
    title: "Investor",
  },
  {
    quote: "Uzair is a very professional and agile realtor. Keeps your requirements in mind and works towards getting it done for you. He was our realtor for buying new property and selling ours.",
    name: "Alladi",
    title: "Upsizer",
  },
  {
    quote: "Now I see why he's called the 'presale expert.' Uzair's expertise in the presale market is exceptional. His strong relationships with developers enabled us to secure the best unit in the building at an incredible price.",
    name: "Ray M",
    title: "First Time Investor",
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );
};

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: googleData, isLoading, error } = useGoogleReviews();
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Use Google reviews if available, otherwise fallback
  const hasGoogleReviews = googleData?.reviews && googleData.reviews.length > 0;
  const testimonials: { quote: string; name: string; title: string; rating: number; photo?: string }[] = hasGoogleReviews
    ? googleData.reviews.map((review: GoogleReview) => ({
        quote: review.text,
        name: review.authorName,
        title: review.relativeTime,
        rating: review.rating,
        photo: review.authorPhoto,
      }))
    : fallbackTestimonials.map((t) => ({ ...t, rating: 5 }));

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        nextTestimonial();
      } else {
        prevTestimonial();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section className="py-12 md:py-24 bg-card">
      <div className="container-xl px-4 md:px-6">
        <div className="text-center mb-8 md:mb-16">
          <p className="section-label mb-2 md:mb-4">Client Reviews</p>
          <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-foreground">
            What's Everyone <span className="text-gradient">Saying</span>
          </h2>
          {hasGoogleReviews && googleData && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3 md:mt-4">
              <img
                src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                alt="Google"
                className="h-4 md:h-5"
              />
              <StarRating rating={Math.round(googleData.overallRating)} />
              <span className="text-muted-foreground text-xs md:text-sm">
                {googleData.overallRating.toFixed(1)} ({googleData.totalReviews} reviews)
              </span>
            </div>
          )}
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div 
            className="relative bg-background rounded-xl md:rounded-2xl p-5 md:p-8 lg:p-12 border border-border touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <Quote className="h-8 w-8 md:h-12 md:w-12 text-primary/20 absolute top-4 left-4 md:top-8 md:left-8" />
            
            <div className="relative z-10 pt-6 md:pt-8">
              {isLoading ? (
                <div className="animate-pulse">
                  <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
                  <div className="h-6 bg-muted rounded w-1/2"></div>
                </div>
              ) : (
                <>
                  <div className="mb-3 md:mb-4">
                    <StarRating rating={testimonials[currentIndex].rating} />
                  </div>
                  <blockquote className="font-display text-base md:text-xl lg:text-2xl text-foreground leading-relaxed mb-6 md:mb-8">
                    "{testimonials[currentIndex].quote}"
                  </blockquote>
                  
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-3">
                      {testimonials[currentIndex].photo && (
                        <img
                          src={testimonials[currentIndex].photo}
                          alt={testimonials[currentIndex].name}
                          className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover flex-shrink-0"
                        />
                      )}
                      <div className="min-w-0">
                        <p className="font-semibold text-foreground text-sm md:text-base truncate">{testimonials[currentIndex].name}</p>
                        <p className="text-xs md:text-sm text-muted-foreground truncate">{testimonials[currentIndex].title}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 self-end md:self-auto">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={prevTestimonial}
                        className="rounded-full h-9 w-9 md:h-10 md:w-10"
                      >
                        <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={nextTestimonial}
                        className="rounded-full h-9 w-9 md:h-10 md:w-10"
                      >
                        <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6 md:mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? "w-6 md:w-8 bg-primary" : "w-2 bg-foreground/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
