import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
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

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="relative bg-background rounded-2xl p-8 lg:p-12 border border-border">
            <Quote className="h-12 w-12 text-primary/20 absolute top-8 left-8" />
            
            <div className="relative z-10 pt-8">
              <blockquote className="font-display text-xl lg:text-2xl text-foreground leading-relaxed mb-8">
                "{testimonials[currentIndex].quote}"
              </blockquote>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">{testimonials[currentIndex].name}</p>
                  <p className="text-sm text-muted-foreground">{testimonials[currentIndex].title}</p>
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
