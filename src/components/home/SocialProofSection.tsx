import { ArrowRight, ExternalLink, Loader2, Quote, Star } from "lucide-react";
import { Helmet } from "react-helmet-async";
import type { ReactNode } from "react";
import { useGoogleReviews, type GoogleReview } from "@/hooks/useGoogleReviews";
import { Skeleton } from "@/components/ui/skeleton";

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

interface StaticReview {
  name: string;
  quote: string;
  timeAgo: string;
  photo: string;
  rating?: number;
  highlight?: boolean;
}

// Verbatim Google reviews (originals only — no rewrites, no paraphrasing).
const staticReviews: StaticReview[] = [
  {
    name: "Amarpal Singh",
    quote:
      "Had an greatest experience working with Uzair for our new purchase. Very knowledgeable and professional. Great realtor and an awesome person. Guide me with all information needed. As I was moving from Alberta give me all the best information and knowledge you need to start in new province. Purchasing a house is a big decision. I'll highly recommend Uzair.",
    timeAgo: "3 months ago",
    photo: rayPhoto,
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
  {
    name: "Miwa Karaki",
    quote:
      "Uzair's knowledge of presales is incredible. Whenever we find a presale project to invest in, he already knows about it and provides us with a lot of information. We know he is busy but he's always willing to help with anything. We truly appreciate his assistance!",
    timeAgo: "a year ago",
    photo: miwaPhoto,
    rating: 5,
  },
  {
    name: "Mona Alkurdi",
    quote:
      "Very honest realtor who speaks the best for his clients as a priority. We have been working with him for years and he never failed us. I advise anyone to work with this amazing person.",
    timeAgo: "a year ago",
    photo: monaPhoto,
    rating: 5,
  },
  {
    name: "Akhi Thapar",
    quote:
      "I have been working with uzair for nearly 3 years now and will highly recommend him for any sale or purchase of the property.",
    timeAgo: "2 years ago",
    photo: akhiPhoto,
    rating: 5,
  },
];

const GOOGLE_BUSINESS_URL = "https://share.google/qgUTcQF2kOnjBBPr7";
const MAX_VISIBLE_REVIEWS = 5;

const fallbackPhotos = [
  anishPhoto,
  michellePhoto,
  rayPhoto,
  hissanPhoto,
  andresPhoto,
];

const KEYWORD_PATTERNS: RegExp[] = [
  /first[- ]time home buyer/gi,
  /presale[s]?/gi,
  /honest(?:y)?/gi,
  /transparen(?:t|cy)/gi,
  /developer[s]?/gi,
  /investment property|investment/gi,
  /market/gi,
  /expert(?:ise)?/gi,
  /knowledge(?:able)?/gi,
  /professional(?:ism)?/gi,
  /best interest[s]?/gi,
  /best deal/gi,
  /best unit/gi,
  /protect(?:ed|s|ing)?/gi,
  /guided|guide/gi,
  /new construction|new purchase|new property/gi,
  /trust(?:ed|worthy)?/gi,
  /reliable/gi,
];

function highlightKeywords(text: string): ReactNode[] {
  let parts: Array<string | ReactNode> = [text];
  KEYWORD_PATTERNS.forEach((re, kIdx) => {
    const next: Array<string | ReactNode> = [];
    parts.forEach((part, pIdx) => {
      if (typeof part !== "string") {
        next.push(part);
        return;
      }
      let lastIndex = 0;
      let match: RegExpExecArray | null;
      re.lastIndex = 0;
      while ((match = re.exec(part)) !== null) {
        if (match.index > lastIndex) next.push(part.slice(lastIndex, match.index));
        next.push(
          <mark
            key={`kw-${kIdx}-${pIdx}-${match.index}`}
            className="bg-primary/10 text-primary font-semibold rounded-sm px-0.5"
          >
            {match[0]}
          </mark>,
        );
        lastIndex = match.index + match[0].length;
        if (match[0].length === 0) re.lastIndex++;
      }
      if (lastIndex < part.length) next.push(part.slice(lastIndex));
    });
    parts = next;
  });
  return parts;
}

const GoogleLogo = ({ className = "h-5" }: { className?: string }) => (
  <img
    src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
    alt="Google"
    className={className}
  />
);

const FractionalStar = ({
  fill,
  className,
}: {
  fill: number;
  className: string;
}) => {
  const clamped = Math.max(0, Math.min(1, fill));
  return (
    <div className={`relative ${className}`}>
      <Star className="h-full w-full text-muted-foreground/30" />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${clamped * 100}%` }}
      >
        <Star className="h-full w-full fill-yellow-400 text-yellow-400" />
      </div>
    </div>
  );
};

const StarRating = ({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) => {
  const starClass = size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";
  return (
    <div className="flex gap-0.5" aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const fill = Math.min(1, Math.max(0, rating - (star - 1)));
        if (fill >= 1) {
          return (
            <Star
              key={star}
              className={`${starClass} fill-yellow-400 text-yellow-400`}
            />
          );
        }
        return <FractionalStar key={star} fill={fill} className={starClass} />;
      })}
    </div>
  );
};

const ReviewCard = ({
  testimonial,
  mobile = false,
}: {
  testimonial: StaticReview;
  mobile?: boolean;
}) => {
  const className = mobile
    ? "flex-shrink-0 w-[300px] h-[360px] rounded-xl p-5 snap-center cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg flex flex-col"
    : "rounded-xl p-6 h-[380px] transition-all hover:scale-[1.02] hover:shadow-lg cursor-pointer flex flex-col";

  const themeClass = testimonial.highlight
    ? "bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
    : "bg-card border border-border";

  return (
    <a
      href={GOOGLE_BUSINESS_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Read ${testimonial.name}'s review on Google`}
      className={`${className} ${themeClass}`}
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
          <p className={mobile ? "font-semibold text-sm text-foreground" : "font-semibold text-foreground"}>
            {testimonial.name}
          </p>
          <span className="text-xs text-muted-foreground">{testimonial.timeAgo}</span>
        </div>
      </div>

      <StarRating rating={testimonial.rating ?? 5} size={mobile ? "sm" : "sm"} />

      {!mobile && (
        <Quote
          className={`h-5 w-5 mb-2 shrink-0 ${
            testimonial.highlight ? "text-primary/50" : "text-muted-foreground/30"
          }`}
        />
      )}

      <p
        className={`text-sm text-foreground/90 leading-relaxed whitespace-pre-line line-clamp-6 flex-1 ${
          mobile ? "" : "lg:text-[15px]"
        }`}
      >
        “{highlightKeywords(testimonial.quote)}”
      </p>
      <p className="text-xs text-primary mt-3 font-medium shrink-0">View on Google →</p>
    </a>
  );
};

const ReviewSkeletonCard = ({ mobile = false }: { mobile?: boolean }) => {
  const className = mobile
    ? "flex-shrink-0 w-[300px] h-[360px] rounded-xl p-5 snap-center flex flex-col bg-card border border-border"
    : "rounded-xl p-6 h-[380px] flex flex-col bg-card border border-border";
  return (
    <div className={className}>
      <div className="flex items-center gap-3 mb-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-3.5 w-3.5 rounded-full" />
        ))}
      </div>
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
        <Skeleton className="h-4 w-3/6" />
      </div>
    </div>
  );
};

const SeeAllReviewsCard = ({ mobile = false }: { mobile?: boolean }) => (
  <a
    href={GOOGLE_BUSINESS_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="See all reviews on Google"
    className={`group rounded-xl snap-center cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg flex flex-col items-center justify-center text-center border border-dashed border-primary/40 bg-gradient-to-br from-primary/10 to-primary/5 ${
      mobile ? "flex-shrink-0 w-[300px] h-[360px] p-5" : "h-[380px] p-6"
    }`}
  >
    <div className="w-14 h-14 rounded-full bg-white border border-primary/20 flex items-center justify-center mb-5 shadow-sm group-hover:border-primary/40 transition-colors">
      <GoogleLogo className="h-4 object-contain" />
    </div>
    <div className="flex items-center gap-1.5 mb-3">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      ))}
      <span className="ml-1 text-sm font-semibold text-foreground">4.9</span>
    </div>
    <p className="font-display text-lg font-bold text-foreground mb-2">See all reviews</p>
    <p className="text-sm text-muted-foreground mb-5 max-w-[220px]">
      Read every verified client review on Google.
    </p>
    <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:text-primary/80 transition-colors">
      View on Google
      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
    </span>
  </a>
);

export const SocialProofSection = () => {
  const { data: liveData, isLoading, error } = useGoogleReviews();

  const liveReviews: StaticReview[] =
    liveData?.reviews?.map((r: GoogleReview, i: number) => ({
      name: r.authorName,
      quote: r.text,
      timeAgo: r.relativeTime,
      photo: r.authorPhoto || fallbackPhotos[i % fallbackPhotos.length],
      rating: r.rating,
      highlight: i === 0,
    })) ?? [];

  const liveNames = new Set(liveReviews.map((r) => r.name.toLowerCase().split(" ")[0]));
  const merged: StaticReview[] = [
    ...liveReviews,
    ...staticReviews.filter((r) => !liveNames.has(r.name.toLowerCase().split(" ")[0])),
  ];

  // Keep the widget layout clean: 5 reviews + 1 "See all" card.
  const displayed = merged.slice(0, MAX_VISIBLE_REVIEWS);

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Uzair Muhammad | Vancouver Presale Expert",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: liveData?.overallRating ?? 4.9,
      bestRating: 5,
    },
    review: displayed.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating ?? 5,
        bestRating: 5,
      },
      reviewBody: r.quote,
      itemReviewed: {
        "@type": "RealEstateAgent",
        name: "Uzair Muhammad | Vancouver Presale Expert",
      },
    })),
  };

  return (
    <section className="py-16 sm:py-24 bg-card">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(reviewSchema)}</script>
      </Helmet>
      <div className="container-xl px-4 sm:px-6">
        {/* Google Reviews Widget Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <GoogleLogo className="h-4 md:h-5" />
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Google Reviews
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight">
              What Uzair's clients say
            </h2>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 bg-card border border-border rounded-xl px-4 py-3 shadow-sm">
            <div className="text-center">
              <p className="font-display text-3xl sm:text-4xl font-black text-foreground leading-none">
                {liveData?.overallRating ?? 4.9}
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">out of 5</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <StarRating rating={liveData?.overallRating ?? 4.9} size="md" />
              <a
                href={GOOGLE_BUSINESS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors mt-1 underline underline-offset-2"
              >
                See all on Google
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="mb-10 sm:mb-14">
            <div className="sm:hidden">
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory px-4 -mx-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <ReviewSkeletonCard key={i} mobile />
                ))}
                <SeeAllReviewsCard mobile />
              </div>
            </div>
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 auto-rows-fr">
              {Array.from({ length: 5 }).map((_, i) => (
                <ReviewSkeletonCard key={i} />
              ))}
              <SeeAllReviewsCard />
            </div>
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="mb-10 sm:mb-14 rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Unable to load the latest Google reviews right now. Showing verified client reviews instead.
            </p>
          </div>
        )}

        {/* Reviews Grid */}
        {!isLoading && displayed.length > 0 && (
          <div className="mb-10 sm:mb-14">
            <div className="sm:hidden">
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory px-4 -mx-4">
                {displayed.map((testimonial, index) => (
                  <ReviewCard key={index} testimonial={testimonial} mobile />
                ))}
                <SeeAllReviewsCard mobile />
              </div>
            </div>

            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 auto-rows-fr">
              {displayed.map((testimonial, index) => (
                <ReviewCard key={index} testimonial={testimonial} />
              ))}
              <SeeAllReviewsCard />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
