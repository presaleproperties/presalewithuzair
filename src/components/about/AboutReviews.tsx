import { Star } from "lucide-react";
import { staticReviews } from "@/data/googleReviews";

const GBP_URL = "https://share.google/qgUTcQF2kOnjBBPr7";

// Three verbatim Google reviews — same source of truth used on /call.
const FEATURED = ["Ray M", "Mehreen Chaudry", "Adam Lai"];

const featured = FEATURED
  .map((name) => staticReviews.find((r) => r.name === name))
  .filter(Boolean) as typeof staticReviews;

const Stars = () => (
  <div className="flex gap-0.5" aria-label="5 out of 5 stars">
    {[0, 1, 2, 3, 4].map((i) => (
      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
    ))}
  </div>
);

/**
 * Reviews on /about. Also carries the Review objects that accompany the
 * sitewide aggregateRating in index.html — Google requires individual reviews
 * to render on the same page as any rating markup.
 */
export const AboutReviews = () => {
  const reviewLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": "https://presalewithuzair.com/#agent",
    name: "Uzair Muhammad — Presale With Uzair",
    url: "https://presalewithuzair.com",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.9,
      reviewCount: 36,
      bestRating: 5,
    },
    review: featured.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name.split(" ")[0] },
      reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
      reviewBody: r.quote.replace(/\s+/g, " ").slice(0, 240),
      itemReviewed: { "@id": "https://presalewithuzair.com/#agent" },
    })),
  };

  return (
    <section className="section-y bg-background divider-y">
      <div className="container-xl">
        <div className="max-w-2xl mb-12">
          <p className="section-label mb-4">What buyers say</p>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground">
            Reviews from families I've represented.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((r) => (
            <figure key={r.name} className="rounded-sm border border-foreground/10 bg-card p-6 flex flex-col">
              <Stars />
              <blockquote className="mt-4 text-foreground/80 leading-relaxed text-[0.95rem] flex-1">
                “{r.quote.replace(/\s+/g, " ")}”
              </blockquote>
              <figcaption className="mt-5 pt-4 border-t border-foreground/10 text-sm font-semibold text-foreground">
                {r.name}
                <span className="block font-normal text-muted-foreground">Google review · {r.timeAgo}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-8 text-sm">
          <a
            href={GBP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-semibold text-foreground hover:text-primary transition-colors"
          >
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
            4.9★ · 36 Google reviews
          </a>
        </p>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewLd) }} />
      </div>
    </section>
  );
};
