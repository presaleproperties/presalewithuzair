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
  {
    name: "Andres Jaramillo",
    quote:
      "Uzair made what could have been a really difficult transaction as finding our first home in a new market we knew nothing about, he turned it into an easy and enjoyable process. Guided us through the process from the search all the way to completion.\nNext time we are back looking for properties, we will get him on our side for sure.\nI’d recommend Uzair and his team to anyone.",
    timeAgo: "7 months ago",
    photo: andresPhoto,
    rating: 5,
  },
  {
    name: "Jamila Kirama",
    quote:
      "I had an amazing experience working with Uzair! From start to finish, he is professional, knowledgeable, and always had my best interests at heart. He made the entire buying/selling process smooth and stress-free, answering all my questions and keeping me informed every step of the way. His attention to detail, market expertise, and dedication truly set them apart. I highly recommend Uzair to anyone looking for a top-notch real estate professional!",
    timeAgo: "a year ago",
    photo: jamilaPhoto,
    rating: 5,
  },
  {
    name: "Exponential Real Estate",
    quote:
      "Uzair is an excellent agent who fights for his clients, writes a good contract that protects his clients yet is flexible enough to get the deal done. This was my first time working with Uzair and I am impressed by his professionalism and knowledge. Would love to do another deal soon with such a good agent.",
    timeAgo: "a year ago",
    photo: baldeepPhoto,
    highlight: true,
    rating: 5,
  },
  {
    name: "Adam Lai",
    quote:
      "Uzair helped me with my investment property, and I couldn’t be more grateful. He’s focused on making sure you get the best deal and\nguiding you through every step of the process. He’s straightforward, easy to work with, and truly knows the market. If a deal or project isn’t right, he’ll tell you exactly that, no fluff, no hype. You can always count on his honesty and expertise!",
    timeAgo: "a year ago",
    photo: adamPhoto,
    rating: 5,
  },
  {
    name: "Ehsan Khan",
    quote:
      "Uzair is a very professional, kind, and helpful realtor. Him and his team work diligently in the best interest of their clients. He is very reliable, honest, and communicates clearly and promptly. There is never any \"fine print\" or surprises. I would highly recommend him and his services to everybody. We will definitely contact him again for future buying and selling. Thank you for your excellent services and pleasant experience :)",
    timeAgo: "3 years ago",
    photo: rehmanPhoto,
    rating: 5,
  },
  {
    name: "Mehreen Chaudry",
    quote:
      "I have been working with Uzair for a number of years he is an expert in his knowledge about presale in Vancouver. His personalized approach for his client is what makes it very easy to work with him. I would highly recommend that if you are considering presale to get in contact with Uzair.",
    timeAgo: "a year ago",
    photo: mehreenPhoto,
    rating: 5,
  },
  {
    name: "Ray M",
    quote:
      "Now I see why he's called the \"presale expert.\" Uzair's expertise in the presale market is exceptional. His strong relationships with developers enabled us to secure the best unit in the building at an incredible price. It was an outstanding experience. Thank you Uzair, for your hard work, transparency, and guidance in helping my family find our first home within 2 weeks!!",
    timeAgo: "a year ago",
    photo: rayPhoto,
    highlight: true,
    rating: 5,
  },
  {
    name: "alladi tejaswini",
    quote:
      "Uzair is a very professional and agile realtor. Keeps your requirements in mind and works towards getting it done for you. He was our realtor for buying new property and selling ours. Highly recommend him and will be going with him for next purchase as well.",
    timeAgo: "4 years ago",
    photo: sonaliPhoto,
    rating: 5,
  },
  {
    name: "M Hissan Zafar",
    quote:
      "Uzair is brilliant to work with\nI had an amazing experience with him and as a first time home buyer he guided me throughout the journey and made sure i feel comfortable and even after getting the house he is there to help me on different upgrades",
    timeAgo: "2 years ago",
    photo: hissanPhoto,
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
