import { Star, ExternalLink } from "lucide-react";

const GOOGLE_REVIEW_URL = "https://g.page/r/PLACEHOLDER/review";

const reviews = [
  { name: "Harpreet S.", stars: 5, text: "Uzair got us VIP access to a project in Langley that sold out in 2 days. We would have missed it without him. Best decision we made.", city: "Langley" },
  { name: "Manpreet K.", stars: 5, text: "He never pushed us to buy anything. He told us which projects to avoid and why. That honesty is rare in real estate.", city: "Surrey" },
  { name: "Raj & Priya M.", stars: 5, text: "Invested in 2 presale condos through Uzair. Both assignments sold for significant profit. His market knowledge is unreal.", city: "Surrey" },
  { name: "Ali H.", stars: 5, text: "Spoke to us in Urdu which made everything so much easier to understand. Explained the entire presale contract clearly. Highly recommend.", city: "Abbotsford" },
  { name: "Gurjit B.", stars: 5, text: "400+ deals and he still treats you like his only client. Answered every question, even at 10pm. True professional.", city: "Coquitlam" },
  { name: "David C.", stars: 5, text: "I was skeptical about presale condos. Uzair walked me through the risk analysis, showed me comps, and helped me make an informed decision. Zero pressure.", city: "Burnaby" },
];

export const ReviewsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container-xl px-5 sm:px-8 lg:px-16">
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-3">
            What Clients Say
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-foreground mb-4">
            Trusted by Fraser Valley Buyers
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real words from real clients across Surrey, Langley, Abbotsford & beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <article
              key={r.name}
              className="rounded-2xl border border-border bg-card p-7 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: r.stars }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-500" fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="text-foreground/90 leading-relaxed mb-6 flex-1">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="font-bold text-foreground">{r.name}</span>
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                  {r.city}
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold shadow-md hover:shadow-lg hover:opacity-90 transition-all"
          >
            <Star className="h-4 w-4" fill="currentColor" strokeWidth={0} />
            Leave a Google Review
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
