import { ArrowRight, ExternalLink, Loader2, Quote, Star } from "lucide-react";
import { Helmet } from "react-helmet-async";
import type { ReactNode } from "react";
import { useGoogleReviews, type GoogleReview } from "@/hooks/useGoogleReviews";
import { Skeleton } from "@/components/ui/skeleton";

import { staticReviews, type StaticReview } from "@/data/googleReviews";

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
            className="bg-transparent text-foreground font-semibold decoration-foreground/25 underline underline-offset-[3px] decoration-1"
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
    ? "flex-shrink-0 w-[300px] h-[360px] rounded-sm p-5 snap-center cursor-pointer flex flex-col"
    : "rounded-sm p-6 h-[380px] cursor-pointer flex flex-col";

  const themeClass = "bg-card border border-border hover-lift";

  return (
    <a
      href={GOOGLE_BUSINESS_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Read ${testimonial.name}'s review on Google`}
      className={`group ${className} ${themeClass}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <img
          src={testimonial.photo}
          alt={testimonial.name}
          className="w-11 h-11 rounded-full object-cover border border-border"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-foreground">
            {testimonial.name}
          </p>
          <span className="text-xs text-muted-foreground">{testimonial.timeAgo}</span>
        </div>
      </div>

      <StarRating rating={testimonial.rating ?? 5} size="sm" />

      <p className="text-sm text-foreground/85 leading-relaxed whitespace-pre-line line-clamp-6 flex-1 mt-3">
        “{highlightKeywords(testimonial.quote)}”
      </p>
      <p className="text-[0.6875rem] uppercase tracking-[0.14em] text-foreground/45 mt-4 font-semibold shrink-0 transition-colors duration-300 group-hover:text-foreground">
        View on Google
      </p>
    </a>
  );
};


const ReviewSkeletonCard = ({ mobile = false }: { mobile?: boolean }) => {
  const className = mobile
    ? "flex-shrink-0 w-[300px] h-[360px] rounded-sm p-5 snap-center flex flex-col bg-card border border-border"
    : "rounded-sm p-6 h-[380px] flex flex-col bg-card border border-border";
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
    className={`group rounded-sm snap-center cursor-pointer hover-lift flex flex-col items-center justify-center text-center border border-border bg-card ${
      mobile ? "flex-shrink-0 w-[300px] h-[360px] p-5" : "h-[380px] p-6"
    }`}
  >
    <div className="w-14 h-14 rounded-sm bg-background border border-border flex items-center justify-center mb-5 transition-colors duration-500 group-hover:border-foreground/30">
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
    <span className="inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.14em] font-semibold text-foreground/55 transition-colors duration-300 group-hover:text-foreground">
      View on Google
      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1" />
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
    <section className="section-y bg-card">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(reviewSchema)}</script>
      </Helmet>
      <div className="container-xl px-4 sm:px-6">
        {/* Google Reviews Widget Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <GoogleLogo className="h-4 md:h-[1.125rem]" />
              <span className="text-[0.6875rem] font-semibold text-foreground/45 uppercase tracking-[0.22em]">
                Google Reviews
              </span>
            </div>
            <h2 className="h-section text-foreground">
              What Uzair's clients say
            </h2>
          </div>

          <div className="flex items-center gap-6 sm:gap-8 bg-card border border-border rounded-sm px-5 py-4">
            <div>
              <p className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-none">
                {liveData?.overallRating ?? 4.9}
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                Google rating
              </p>
            </div>

            <div>
              <StarRating rating={liveData?.overallRating ?? 4.9} size="md" />
              <a
                href={GOOGLE_BUSINESS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 mt-1 underline underline-offset-2"
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
          <div className="mb-10 sm:mb-14 rounded-sm border border-destructive/20 bg-destructive/5 p-4 text-center">
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
