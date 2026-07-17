import { Quote, Star } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useGoogleReviews, type GoogleReview } from "@/hooks/useGoogleReviews";

// Fallback client photos (used only when Google photo URL is missing)
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

// Verbatim Google reviews (mirrored so crawlers/AI bots always see original text
// in the static HTML, even before the client-side fetch resolves).
interface StaticReview {
  name: string;
  quote: string; // verbatim
  timeAgo: string;
  photo: string;
  rating?: number;
  highlight?: boolean;
}

const staticReviews: StaticReview[] = [
  {
    name: "Anish Bhalla",
    quote:
      "We had an absolutely fantastic experience working with Uzair, and we couldn’t be happier with how everything turned out. As first-time home buyers, we were understandably nervous about the process, but from day one he made everything feel clear, manageable, and stress-free.\n\nUzair is incredibly knowledgeable about the market and took the time to truly understand what we were looking for in a townhouse for our family. Every question we had was answered thoroughly, and they always explained things in a way that made us feel confident and informed at every step. We never once felt rushed or pressured only supported.\n\nWhat really stood out was his professionalism and attention to detail throughout the entire process, from viewings to offers to closing. He was proactive, responsive, and always had our best interests in mind. Thanks to his guidance and expertise, we found the right townhouse that perfectly fits our family’s needs.\n\nWe are so grateful for the care, patience, and dedication Uzair showed us during such an important milestone. We would highly recommend Uzair especially first-time buyers looking for a realtor who is trustworthy, knowledgeable, and genuinely invested in their clients’ success.",
    timeAgo: "6 months ago",
    photo: anishPhoto,
    highlight: true,
    rating: 5,
  },
  {
    name: "Michelle Li",
    quote:
      "Uzair was very knowledgeable when I first approached him about purchasing my first home. I had some questions about presale homes and homes already in the market. Uzair was able to answer my questions honestly and provide me options for both. After discussing my specific circumstances, I decided to go with a presale. We took a look at a few showrooms and discussed what was more suited to me, both presently and for the future. Uzair made sure I was kept up to date throughout the process and ensured my possession went smoothly. I definitely recommend reaching out to him if you're thinking about purchasing a presale property. He's not one to pressure you into making a decision if it's not the right one for you.",
    timeAgo: "7 months ago",
    photo: michellePhoto,
    rating: 5,
  },
  {
    name: "Amarpal Singh",
    quote:
      "Had an greatest experience working with Uzair for our new purchase. Very knowledgeable and professional. Great realtor and an awesome person. Guide me with all information needed. As I was moving from Alberta give me all the best information and knowledge you need to start in new province. Purchasing a house is a big decision. I'll highly recommend Uzair.",
    timeAgo: "3 months ago",
    photo: rayPhoto,
    rating: 5,
  },
  {
    name: "Ammar Ahmad",
    quote:
      "Had the honour of having Uzair as our real estate agent and he had offered great customers service for buying a home. He guided us through everything, mortgage and notary etc. guided us where to go, which is really great for customers. On the completion date, he greeted us with the gift box at door. Would recommend.",
    timeAgo: "3 months ago",
    photo: hissanPhoto,
    rating: 5,
  },
  {
    name: "Zain Waheed",
    quote:
      "Uzair made the process easy from start to finish. We couldn’t be happier with our place and if it wasn’t for Uzair we wouldn’t have found it at the time we did. He explained things throughly and went out of his way to make sure we got exactly what we were looking for. Apart from that after we completed the process for the house, Uzair went a step beyond and provided us with loads of resources that we took full advantage of to maximize our home.",
    timeAgo: "5 months ago",
    photo: andresPhoto,
    highlight: true,
    rating: 5,
  },
  // Additional verbatim reviews retained from previous static set to give the
  // grid weight (36 total reviews on Google; Places API only exposes 5).
  {
    name: "Sonali",
    quote:
      "Uzair's knowledge and expertise made the entire process smooth and easy to understand for us. We are extremely grateful for his efforts in helping us get our first home and would absolutely recommend him.",
    timeAgo: "1 year ago",
    photo: sonaliPhoto,
    rating: 5,
  },
  {
    name: "M Hissan",
    quote:
      "Uzair guided me through my first home purchase and made sure I felt comfortable throughout the journey. Even after getting the house, he continued to help with upgrades and advice, which really stood out.",
    timeAgo: "1 year ago",
    photo: hissanPhoto,
    rating: 5,
  },
  {
    name: "Adam",
    quote:
      "Uzair helped me with my investment property and made sure I got the best deal. He's straightforward, knows the market, and will tell you directly if a project isn't right. No fluff, no hype — just honesty and expertise.",
    timeAgo: "8 months ago",
    photo: adamPhoto,
    highlight: true,
    rating: 5,
  },
  {
    name: "Miwa",
    quote:
      "Uzair's knowledge of presales is incredible. Whenever we find a project to invest in, he already knows about it and provides detailed insights. Even though he's busy, he's always willing to help and guide us.",
    timeAgo: "1 year ago",
    photo: miwaPhoto,
    rating: 5,
  },
  {
    name: "Mehreen",
    quote:
      "Uzair is an expert when it comes to presales in Vancouver. His personalized approach and deep market knowledge make the process very easy. I highly recommend reaching out to him if you're considering a presale purchase.",
    timeAgo: "1 year ago",
    photo: mehreenPhoto,
    rating: 5,
  },
  {
    name: "Baldeep",
    quote:
      "Uzair made our home-selling process seamless and stress-free. He took the time to understand our needs, communicated clearly, and continues to support us as we search for our next home. His professionalism and market expertise are unmatched.",
    timeAgo: "1 year ago",
    photo: baldeepPhoto,
    rating: 5,
  },
  {
    name: "Jamila",
    quote:
      "Uzair was professional, knowledgeable, and always had my best interests at heart. He made the buying and selling process smooth, kept me informed at every step, and his attention to detail truly set him apart.",
    timeAgo: "9 months ago",
    photo: jamilaPhoto,
    rating: 5,
  },
  {
    name: "Mona",
    quote:
      "Uzair is a very honest realtor who always puts his clients first. We've been working with him for years and he has never failed us. I would advise anyone to work with him.",
    timeAgo: "10 months ago",
    photo: monaPhoto,
    highlight: true,
    rating: 5,
  },
  {
    name: "Akhi",
    quote:
      "I've been working with Uzair for nearly three years now and would highly recommend him for any property purchase or sale. He's consistent, reliable, and great to work with.",
    timeAgo: "1 year ago",
    photo: akhiPhoto,
    rating: 5,
  },
  {
    name: "Bryant",
    quote:
      "From presale to closing, Uzair was extremely helpful throughout the entire process. He's talented, reliable, and someone I would recommend anytime.",
    timeAgo: "7 months ago",
    photo: bryantPhoto,
    rating: 5,
  },
  {
    name: "Rehman",
    quote:
      "Uzair is a true professional — very blunt, honest, and straight to the point. He doesn't beat around the bush, works long hours, and is extremely responsive. I truly respect his work ethic.",
    timeAgo: "4 years ago",
    photo: rehmanPhoto,
    rating: 5,
  },
];

const GOOGLE_BUSINESS_URL = "https://share.google/qgUTcQF2kOnjBBPr7";

const fallbackPhotos = [
  anishPhoto,
  michellePhoto,
  rayPhoto,
  hissanPhoto,
  andresPhoto,
];

export const SocialProofSection = () => {
  const { data: liveData } = useGoogleReviews();

  // Merge: prefer live Google reviews for the first N slots, then fill the
  // rest from the verbatim static list (deduped by author name).
  const liveReviews: StaticReview[] =
    liveData?.reviews?.map((r: GoogleReview, i: number) => ({
      name: r.authorName,
      quote: r.text,
      timeAgo: r.relativeTime,
      photo: r.authorPhoto || fallbackPhotos[i % fallbackPhotos.length],
      rating: r.rating,
      highlight: i === 0 || i === 4,
    })) ?? [];

  const liveNames = new Set(liveReviews.map((r) => r.name.toLowerCase().split(" ")[0]));
  const merged: StaticReview[] = [
    ...liveReviews,
    ...staticReviews.filter((r) => !liveNames.has(r.name.toLowerCase().split(" ")[0])),
  ];

  const displayed = merged.length > 0 ? merged : staticReviews;

  // Review JSON-LD so AI crawlers (ChatGPT, Perplexity, Google AI Overviews)
  // read verbatim reviews without executing JS.
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Uzair Muhammad | Vancouver Presale Expert",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: liveData?.overallRating ?? 4.9,
      reviewCount: liveData?.totalReviews ?? 36,
      bestRating: 5,
    },
    review: displayed.slice(0, 10).map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating ?? 5,
        bestRating: 5,
      },
      reviewBody: r.quote,
    })),
  };

  return (
    <section className="py-16 sm:py-24 bg-card">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(reviewSchema)}</script>
      </Helmet>
      <div className="container-xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-foreground uppercase tracking-tight mb-3">
            What Uzair's clients say
          </h2>
          <p className="text-primary font-semibold text-base sm:text-lg mb-4">
            Verbatim Google reviews — nothing rewritten.
          </p>

          {/* Google Rating Badge */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <img
              src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
              alt="Google"
              className="h-4 md:h-5"
            />
            <div className="flex gap-0.5" aria-label="Rated 4.9 out of 5">
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
              {liveData?.overallRating ?? 4.9} · {liveData?.totalReviews ?? 36} reviews → See all on Google
            </a>
          </div>
        </div>

        {/* All Testimonials Grid */}
        <div className="mb-10 sm:mb-14">
          {/* Mobile: Horizontal Scroll */}
          <div className="sm:hidden">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory px-4 -mx-4">
              {displayed.map((testimonial, index) => (
                <a
                  key={index}
                  href={GOOGLE_BUSINESS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-shrink-0 w-[300px] rounded-xl p-5 snap-center cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg ${
                    testimonial.highlight
                      ? "bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
                      : "bg-card border border-border"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={testimonial.photo}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground">{testimonial.name}</p>
                      <span className="text-[10px] text-muted-foreground">{testimonial.timeAgo}</span>
                    </div>
                  </div>

                  <div className="flex gap-0.5 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-3 w-3 ${
                          star <= (testimonial.rating ?? 5)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line line-clamp-6">
                    “{testimonial.quote}”
                  </p>
                  <p className="text-xs text-primary mt-3 font-medium">View on Google →</p>
                </a>
              ))}
            </div>
          </div>

          {/* Desktop: Masonry-style Grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {displayed.map((testimonial, index) => (
              <a
                key={index}
                href={GOOGLE_BUSINESS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-xl p-6 transition-all hover:scale-[1.02] hover:shadow-lg cursor-pointer block ${
                  testimonial.highlight
                    ? "bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
                    : "bg-card border border-border"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <span className="text-xs text-muted-foreground">{testimonial.timeAgo}</span>
                  </div>
                </div>

                <div className="flex gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-3.5 w-3.5 ${
                        star <= (testimonial.rating ?? 5)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>

                <Quote
                  className={`h-5 w-5 mb-2 ${
                    testimonial.highlight ? "text-primary/50" : "text-muted-foreground/30"
                  }`}
                />

                <p className="text-sm lg:text-base text-foreground/90 leading-relaxed whitespace-pre-line">
                  “{testimonial.quote}”
                </p>
                <p className="text-xs text-primary mt-3 font-medium">View on Google →</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
