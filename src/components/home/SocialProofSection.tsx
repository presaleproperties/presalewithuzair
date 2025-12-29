import { Quote, Star } from "lucide-react";
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
  highlight?: boolean;
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
    highlight: true,
  },
  {
    name: "Ray",
    quote: "Now I see why he's called the presale expert. Uzair's relationships with developers helped us secure the best unit in the building at an incredible price. His transparency and guidance helped our family find our first home in just two weeks.",
    clientType: "First-Time Buyer",
    timeAgo: "1 year ago",
    photo: rayPhoto,
    highlight: true,
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
    highlight: true,
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
    highlight: true,
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

const GOOGLE_BUSINESS_URL = "https://share.google/qgUTcQF2kOnjBBPr7";

const clientTypeColors: Record<ClientType, string> = {
  "First-Time Buyer": "bg-primary/20 text-primary border-primary/30",
  "Investor": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "Repeat Client": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "Presale Buyer": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Seller & Buyer": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Buyer": "bg-rose-500/20 text-rose-400 border-rose-500/30",
};

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
          <p className="text-primary font-semibold text-base sm:text-lg mb-4">
            Just look at the results.
          </p>
          
          {/* Google Rating Badge */}
          <div className="flex flex-wrap items-center justify-center gap-2">
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
            <a 
              href={GOOGLE_BUSINESS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground text-xs md:text-sm hover:text-primary transition-colors underline underline-offset-2"
            >
              5.0 (31+ reviews) → See all on Google
            </a>
          </div>
        </div>

        {/* All Testimonials Grid */}
        <div className="mb-10 sm:mb-14">
          {/* Mobile: Horizontal Scroll */}
          <div className="sm:hidden">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory px-4 -mx-4">
              {testimonials.map((testimonial, index) => (
                <a
                  key={index}
                  href={GOOGLE_BUSINESS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-shrink-0 w-[300px] rounded-xl p-5 snap-center cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg ${
                    testimonial.highlight
                      ? 'bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20' 
                      : 'bg-card border border-border'
                  }`}
                >
                  {/* Header: Photo + Name + Badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <img 
                      src={testimonial.photo} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground">{testimonial.name}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${clientTypeColors[testimonial.clientType]}`}>
                          {testimonial.clientType}
                        </span>
                        <span className="text-[10px] text-muted-foreground">{testimonial.timeAgo}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <p className="text-sm text-foreground/90 leading-relaxed line-clamp-5">
                    "{testimonial.quote}"
                  </p>
                  <p className="text-xs text-primary mt-3 font-medium">View on Google →</p>
                </a>
              ))}
            </div>
          </div>

          {/* Desktop: Masonry-style Grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {testimonials.map((testimonial, index) => (
              <a
                key={index}
                href={GOOGLE_BUSINESS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-xl p-6 transition-all hover:scale-[1.02] hover:shadow-lg cursor-pointer block ${
                  testimonial.highlight 
                    ? 'bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20' 
                    : 'bg-card border border-border'
                }`}
              >
                {/* Header: Photo + Name + Badge */}
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={testimonial.photo} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${clientTypeColors[testimonial.clientType]}`}>
                        {testimonial.clientType}
                      </span>
                      <span className="text-xs text-muted-foreground">{testimonial.timeAgo}</span>
                    </div>
                  </div>
                </div>
                
                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <Quote className={`h-5 w-5 mb-2 ${testimonial.highlight ? 'text-primary/50' : 'text-muted-foreground/30'}`} />
                
                {/* Quote */}
                <p className="text-sm lg:text-base text-foreground/90 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <p className="text-xs text-primary mt-3 font-medium">View on Google →</p>
              </a>
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
            Work With Uzair
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
