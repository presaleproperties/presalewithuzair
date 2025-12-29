import { useState, useRef, TouchEvent } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import AI-generated client photos
import michellePhoto from "@/assets/testimonials/michelle.jpg";
import anishPhoto from "@/assets/testimonials/anish.jpg";
import rayPhoto from "@/assets/testimonials/ray.jpg";
import sonaliPhoto from "@/assets/testimonials/sonali.jpg";
import hissanPhoto from "@/assets/testimonials/hissan.jpg";
import andresPhoto from "@/assets/testimonials/andres.jpg";
import adamPhoto from "@/assets/testimonials/adam.jpg";
import miwaPhoto from "@/assets/testimonials/miwa.jpg";
import mehreenPhoto from "@/assets/testimonials/mehreen.jpg";
import baldeepPhoto from "@/assets/testimonials/baldeep.jpg";
import jamilaPhoto from "@/assets/testimonials/jamila.jpg";
import monaPhoto from "@/assets/testimonials/mona.jpg";
import akhiPhoto from "@/assets/testimonials/akhi.jpg";
import bryantPhoto from "@/assets/testimonials/bryant.jpg";
import rehmanPhoto from "@/assets/testimonials/rehman.jpg";

type ClientType = "First-Time Buyer" | "Investor" | "Repeat Client" | "Presale Buyer" | "Seller & Buyer" | "Buyer";

interface Testimonial {
  name: string;
  quote: string;
  clientType: ClientType;
  timeAgo: string;
  photo: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Michelle",
    quote: "Uzair was very knowledgeable when I first approached him about purchasing my first home. He answered my questions honestly, gave me options between presale and resale, and made sure I was informed the entire way through. He never pressured me and ensured my possession went smoothly.",
    clientType: "First-Time Buyer",
    timeAgo: "1 month ago",
    photo: michellePhoto,
  },
  {
    name: "Anish",
    quote: "As first-time buyers, we were nervous, but Uzair made everything clear, manageable, and stress-free. He took the time to understand what we wanted, explained every step thoroughly, and never once rushed us. His professionalism and attention to detail helped us find the perfect home for our family.",
    clientType: "First-Time Buyer",
    timeAgo: "1 day ago",
    photo: anishPhoto,
  },
  {
    name: "Ray",
    quote: "Now I see why he's called the presale expert. Uzair's relationships with developers helped us secure the best unit in the building at an incredible price. His transparency and guidance helped our family find our first home in just two weeks.",
    clientType: "First-Time Buyer",
    timeAgo: "1 year ago",
    photo: rayPhoto,
  },
  {
    name: "Sonali",
    quote: "Uzair's knowledge and expertise made the entire process smooth and easy to understand for us. We are extremely grateful for his efforts in helping us get our first home and would absolutely recommend him.",
    clientType: "First-Time Buyer",
    timeAgo: "1 year ago",
    photo: sonaliPhoto,
  },
  {
    name: "M Hissan",
    quote: "Uzair guided me through my first home purchase and made sure I felt comfortable throughout the journey. Even after getting the house, he continued to help with upgrades and advice, which really stood out.",
    clientType: "First-Time Buyer",
    timeAgo: "1 year ago",
    photo: hissanPhoto,
  },
  {
    name: "Andres",
    quote: "Uzair turned what could have been a difficult first home purchase in a market we knew nothing about into an easy and enjoyable experience. He guided us from the search all the way to completion, and we'd work with him again without hesitation.",
    clientType: "First-Time Buyer",
    timeAgo: "1 month ago",
    photo: andresPhoto,
  },
  {
    name: "Adam",
    quote: "Uzair helped me with my investment property and made sure I got the best deal. He's straightforward, knows the market, and will tell you directly if a project isn't right. No fluff, no hype — just honesty and expertise.",
    clientType: "Investor",
    timeAgo: "8 months ago",
    photo: adamPhoto,
  },
  {
    name: "Miwa",
    quote: "Uzair's knowledge of presales is incredible. Whenever we find a project to invest in, he already knows about it and provides detailed insights. Even though he's busy, he's always willing to help and guide us.",
    clientType: "Investor",
    timeAgo: "1 year ago",
    photo: miwaPhoto,
  },
  {
    name: "Mehreen",
    quote: "Uzair is an expert when it comes to presales in Vancouver. His personalized approach and deep market knowledge make the process very easy. I highly recommend reaching out to him if you're considering a presale purchase.",
    clientType: "Presale Buyer",
    timeAgo: "1 year ago",
    photo: mehreenPhoto,
  },
  {
    name: "Baldeep",
    quote: "Uzair made our home-selling process seamless and stress-free. He took the time to understand our needs, communicated clearly, and continues to support us as we search for our next home. His professionalism and market expertise are unmatched.",
    clientType: "Seller & Buyer",
    timeAgo: "1 year ago",
    photo: baldeepPhoto,
  },
  {
    name: "Jamila",
    quote: "Uzair was professional, knowledgeable, and always had my best interests at heart. He made the buying and selling process smooth, kept me informed at every step, and his attention to detail truly set him apart.",
    clientType: "Buyer",
    timeAgo: "9 months ago",
    photo: jamilaPhoto,
  },
  {
    name: "Mona",
    quote: "Uzair is a very honest realtor who always puts his clients first. We've been working with him for years and he has never failed us. I would advise anyone to work with him.",
    clientType: "Repeat Client",
    timeAgo: "10 months ago",
    photo: monaPhoto,
  },
  {
    name: "Akhi",
    quote: "I've been working with Uzair for nearly three years now and would highly recommend him for any property purchase or sale. He's consistent, reliable, and great to work with.",
    clientType: "Repeat Client",
    timeAgo: "1 year ago",
    photo: akhiPhoto,
  },
  {
    name: "Bryant",
    quote: "From presale to closing, Uzair was extremely helpful throughout the entire process. He's talented, reliable, and someone I would recommend anytime.",
    clientType: "Presale Buyer",
    timeAgo: "7 months ago",
    photo: bryantPhoto,
  },
  {
    name: "Rehman",
    quote: "Uzair is a true professional — very blunt, honest, and straight to the point. He doesn't beat around the bush, works long hours, and is extremely responsive. I truly respect his work ethic.",
    clientType: "Buyer",
    timeAgo: "4 years ago",
    photo: rehmanPhoto,
  },
];

const clientTypeColors: Record<ClientType, string> = {
  "First-Time Buyer": "bg-primary/20 text-primary border-primary/30",
  "Investor": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "Repeat Client": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "Presale Buyer": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Seller & Buyer": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Buyer": "bg-rose-500/20 text-rose-400 border-rose-500/30",
};

const StarRating = () => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className="h-4 w-4 fill-yellow-400 text-yellow-400"
        />
      ))}
    </div>
  );
};

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

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

  const current = testimonials[currentIndex];

  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container-xl px-4 md:px-6 relative z-10">
        {/* Dan Martell Style Header */}
        <div className="text-center mb-10 md:mb-16">
          <p className="text-muted-foreground uppercase tracking-widest text-xs md:text-sm mb-3">
            Client Reviews
          </p>
          <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-foreground uppercase tracking-tight">
            But Don't Listen To <span className="text-primary">Me...</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm md:text-base">
            Here's what real clients say about working with Uzair
          </p>
          
          {/* Google Rating Badge */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <img
              src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
              alt="Google"
              className="h-4 md:h-5"
            />
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-muted-foreground text-xs md:text-sm">
              5.0 (15+ reviews)
            </span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <div 
            className="relative bg-card rounded-2xl md:rounded-3xl p-6 md:p-10 lg:p-12 border border-border shadow-2xl touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <Quote className="h-10 w-10 md:h-14 md:w-14 text-primary/20 absolute top-6 left-6 md:top-10 md:left-10" />
            
            <div className="relative z-10 pt-8 md:pt-10">
              {/* Client Type Badge + Stars */}
              <div className="flex flex-wrap items-center gap-3 mb-4 md:mb-6">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${clientTypeColors[current.clientType]}`}>
                  {current.clientType}
                </span>
                <StarRating />
                <span className="text-muted-foreground text-xs">
                  {current.timeAgo}
                </span>
              </div>

              {/* Quote */}
              <blockquote className="font-display text-lg md:text-xl lg:text-2xl text-foreground leading-relaxed mb-8 md:mb-10">
                "{current.quote}"
              </blockquote>
              
              {/* Author & Navigation */}
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={current.photo}
                    alt={current.name}
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-primary/30 flex-shrink-0"
                  />
                  <div>
                    <p className="font-bold text-foreground text-lg md:text-xl">{current.name}</p>
                    <p className="text-sm text-muted-foreground">{current.clientType}</p>
                  </div>
                </div>
                
                <div className="flex gap-3 self-end md:self-auto">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevTestimonial}
                    className="rounded-full h-11 w-11 md:h-12 md:w-12 border-border hover:border-primary hover:bg-primary/10"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextTestimonial}
                    className="rounded-full h-11 w-11 md:h-12 md:w-12 border-border hover:border-primary hover:bg-primary/10"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "w-8 bg-primary" 
                    : "w-2 bg-foreground/20 hover:bg-foreground/40"
                }`}
              />
            ))}
          </div>

          {/* Testimonial Count */}
          <p className="text-center text-muted-foreground text-sm mt-6">
            {currentIndex + 1} of {testimonials.length} reviews
          </p>
        </div>
      </div>
    </section>
  );
};
