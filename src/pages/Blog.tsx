import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Calendar, ArrowRight, Loader2, BookOpen, Clock,
} from "lucide-react";
import { useBlogPosts, BlogPost } from "@/hooks/useBlogPosts";
import blogHero from "@/assets/blog/blog-hero.jpg";

/* ── Helpers ── */
const CATEGORIES = [
  { slug: "resources", label: "Resources" },
  { slug: "pre-sale-tips", label: "Pre-Sale Tips" },
  { slug: "investment-strategy", label: "Investment Strategy" },
  { slug: "tax-legal", label: "Tax & Legal" },
  { slug: "market-analysis", label: "Market Analysis" },
];

function readTime(content: string) {
  return Math.max(1, Math.round(content.trim().split(/\s+/).length / 200));
}

function formatDate(d: string | null) {
  return d
    ? new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "";
}

/* ── Featured card — compact horizontal ── */
function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group grid md:grid-cols-2 rounded-xl overflow-hidden border border-border bg-card transition-all duration-400 hover:-translate-y-0.5"
    >
      <div className="relative h-56 md:h-full overflow-hidden bg-muted">
        {post.image_url && (
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ filter: "saturate(1.1) contrast(1.05)" }}
          />
        )}
      </div>
      <div className="p-6 md:p-8 flex flex-col justify-center">
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-3">
          Featured
        </span>
        <h2 className="font-display text-xl md:text-2xl leading-tight text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
            {post.excerpt}
          </p>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(post.published_at)}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{readTime(post.content)} min</span>
          </div>
          <span className="text-sm font-semibold text-primary inline-flex items-center gap-1 group-hover:gap-2.5 transition-all">
            Read <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ── Standard post card ── */
function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group rounded-xl overflow-hidden flex flex-col border border-border bg-card transition-all duration-400 hover:-translate-y-0.5"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        {post.image_url && (
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ filter: "saturate(1.08) contrast(1.04)" }}
          />
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h2 className="font-display text-base leading-snug text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2 flex-1">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3">
            {post.excerpt}
          </p>
        )}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3 w-3" />{formatDate(post.published_at)}
          </span>
          <span className="text-xs font-semibold text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
            Read <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ── Main page ── */
const Blog = () => {
  const { data: posts, isLoading, error } = useBlogPosts();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? (posts ?? []).filter((p) => p.category?.slug === activeCategory)
    : (posts ?? []);

  const featuredPost = filtered[0];
  const remainingPosts = filtered.slice(1);

  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Presale With Uzair Blog",
    description: "Expert insights on presale condos, assignments, and real estate investment in Vancouver and Fraser Valley.",
    url: "https://presalewithuzair.com/blog",
    author: { "@type": "Person", name: "Uzair Muhammad", url: "https://presalewithuzair.com" },
    publisher: { "@type": "Organization", name: "Presale With Uzair", url: "https://presalewithuzair.com" },
  };

  return (
    <>
      <Helmet>
        <title>Presale Condo Investment Blog | Fraser Valley | Uzair Muhammad</title>
        <meta name="description" content="Straight-talk advice on presale condos, new construction, and real estate investment in Surrey, Langley, Abbotsford, and the Fraser Valley. No hype. No developer bias." />
        <meta name="keywords" content="presale blog Vancouver, condo investment tips, presale condo advice, Vancouver real estate blog, assignment sale guide, Fraser Valley presale blog" />
        <link rel="canonical" href="https://presalewithuzair.com/blog" />
        <meta property="og:type" content="blog" />
        <meta property="og:url" content="https://presalewithuzair.com/blog" />
        <meta property="og:title" content="Presale Condo Investment Blog | Fraser Valley | Uzair Muhammad" />
        <meta property="og:description" content="Straight-talk advice on presale condos, new construction, and real estate investment in Surrey, Langley, Abbotsford, and the Fraser Valley. No hype. No developer bias." />
        <meta property="og:image" content="https://presalewithuzair.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Presale Condo Investment Blog | Fraser Valley | Uzair Muhammad" />
        <meta name="twitter:description" content="Straight-talk advice on presale condos, new construction, and real estate investment in the Fraser Valley." />
        <meta name="twitter:image" content="https://presalewithuzair.com/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(blogStructuredData)}</script>
      </Helmet>

      <Navbar />

      <main className="bg-background">

        {/* ── Hero with background image ── */}
        <section className="relative min-h-[40vh] md:min-h-[45vh] flex items-end overflow-hidden">
          <img
            src={blogHero}
            alt="Vancouver presale condos"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

          <div className="relative z-10 w-full px-5 sm:px-8 lg:px-16 pb-10 pt-28">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-primary mb-3 block">
              Blog
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-black text-white leading-tight mb-2">
              Presale Insights
            </h1>
            <p className="text-white/60 text-sm md:text-base max-w-lg">
              Expert guides, market intelligence, and investment insights for Metro Vancouver presales.
            </p>
          </div>
        </section>

        {/* ── Articles ── */}
        <section className="py-12 pb-20 bg-background">
          <div className="container-xl px-5 sm:px-8 lg:px-16">
            {isLoading ? (
              <div className="flex justify-center py-24">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="text-center py-24">
                <p className="text-muted-foreground">Failed to load articles.</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-24">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="font-display text-xl mb-2 text-foreground">No articles in this category yet</p>
                <button onClick={() => setActiveCategory(null)} className="text-sm font-semibold underline mt-2 text-primary">
                  View all articles
                </button>
              </div>
            ) : (
              <div className="space-y-12">

                {/* Featured */}
                {featuredPost && !activeCategory && (
                  <FeaturedCard post={featuredPost} />
                )}

                {/* Grid */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display text-lg text-foreground">
                      {activeCategory
                        ? CATEGORIES.find((c) => c.slug === activeCategory)?.label
                        : "All Articles"}
                    </h2>
                    <span className="text-sm text-muted-foreground">
                      {(activeCategory ? filtered : remainingPosts).length} articles
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {(activeCategory ? filtered : remainingPosts).map((post) => (
                      <PostCard key={post.slug} post={post} />
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>
        </section>

        {/* ── Dark CTA strip ── */}
        <section className="dark-section py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black/95 to-black/80" />
          <div className="container-xl text-center relative z-10 px-5">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-primary mb-3 block">
              Free Strategy Call
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-white mb-3">
              Ready to Buy Smart?
            </h2>
            <p className="max-w-lg mx-auto mb-7 text-sm text-white/60">
              Get unfiltered, no-BS presale advice from a buyer-only presale specialist — my fee comes from the developer's marketing budget.
            </p>
            <a
              href="https://wa.me/17782313592?text=Hi%20Uzair%2C%20I%20read%20your%20blog%20and%20would%20like%20a%20free%20strategy%20call"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg font-bold text-sm bg-primary text-primary-foreground hover:-translate-y-0.5 transition-all"
            >
              Book a Free Call
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
};

export default Blog;
