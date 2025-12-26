import { useState } from "react";
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

  return (
    <section className="py-24 bg-card">
      <div className="container-xl">
        <div className="text-center mb-16">
          <p className="section-label mb-4">Client Reviews</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground">
            What's Everyone <span className="text-gradient">Saying</span>
          </h2>
          {hasGoogleReviews && googleData && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <img
                src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                alt="Google"
                className="h-5"
              />
              <StarRating rating={Math.round(googleData.overallRating)} />
              <span className="text-muted-foreground text-sm">
                {googleData.overallRating.toFixed(1)} ({googleData.totalReviews} reviews)
              </span>
            </div>
          )}
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="relative bg-background rounded-2xl p-8 lg:p-12 border border-border">
            <Quote className="h-12 w-12 text-primary/20 absolute top-8 left-8" />
            
            <div className="relative z-10 pt-8">
              {isLoading ? (
                <div className="animate-pulse">
                  <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
                  <div className="h-6 bg-muted rounded w-1/2"></div>
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <StarRating rating={testimonials[currentIndex].rating} />
                  </div>
                  <blockquote className="font-display text-xl lg:text-2xl text-foreground leading-relaxed mb-8">
                    "{testimonials[currentIndex].quote}"
                  </blockquote>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {testimonials[currentIndex].photo && (
                        <img
                          src={testimonials[currentIndex].photo}
                          alt={testimonials[currentIndex].name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <p className="font-semibold text-foreground">{testimonials[currentIndex].name}</p>
                        <p className="text-sm text-muted-foreground">{testimonials[currentIndex].title}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={prevTestimonial}
                        className="rounded-full"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={nextTestimonial}
                        className="rounded-full"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "w-8 bg-primary" : "bg-foreground/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
