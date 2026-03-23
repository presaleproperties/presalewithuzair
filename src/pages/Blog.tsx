import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Calendar, ArrowRight, Loader2, BookOpen, TrendingUp, MapPin, Users, BarChart2, ChevronRight } from "lucide-react";
import { useBlogPosts, BlogPost } from "@/hooks/useBlogPosts";

/* ── Category config ── */
const CATEGORIES = [
  {
    slug: "presale-guides",
    label: "Presale Guides",
    description: "Learn how to buy presale condos and townhomes in Metro Vancouver",
    icon: BookOpen,
    color: "hsl(220 80% 55%)",
    bg: "hsl(220 80% 97%)",
  },
  {
    slug: "market-updates",
    label: "Market Updates",
    description: "Latest presale market reports and price trends",
    icon: TrendingUp,
    color: "hsl(160 70% 40%)",
    bg: "hsl(160 70% 96%)",
  },
  {
    slug: "neighbourhood-guides",
    label: "Neighbourhood Guides",
    description: "In-depth guides to Metro Vancouver's best neighbourhoods",
    icon: MapPin,
    color: "hsl(270 65% 55%)",
    bg: "hsl(270 65% 97%)",
  },
  {
    slug: "investment-analysis",
    label: "Investment Analysis",
    description: "ROI calculations, tax strategies, and investment insights",
    icon: BarChart2,
    color: "hsl(32 85% 48%)",
    bg: "hsl(38 85% 97%)",
  },
  {
    slug: "developer-reviews",
    label: "Developer Reviews",
    description: "Track records and reputation analysis for BC developers",
    icon: Users,
    color: "hsl(0 65% 55%)",
    bg: "hsl(0 65% 97%)",
  },
];

/* ── Post card ── */
function PostCard({ post, large = false }: { post: BlogPost; large?: boolean }) {
  const formatDate = (d: string | null) =>
    d ? new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "";

  if (large) {
    return (
      <Link
        to={`/blog/${post.slug}`}
        className="group grid md:grid-cols-2 rounded-2xl overflow-hidden border hover:shadow-lg transition-all duration-300"
        style={{ borderColor: "hsl(var(--border))", background: "#fff" }}
      >
        {/* Image */}
        <div className="h-64 md:h-auto overflow-hidden bg-muted">
          {post.image_url ? (
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full" style={{ background: "hsl(var(--muted))" }} />
          )}
        </div>
        {/* Content */}
        <div className="p-8 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            {post.category && (
              <span
                className="px-3 py-1 text-xs font-bold tracking-wide uppercase rounded-full"
                style={{
                  background: "hsl(var(--primary) / 0.1)",
                  color: "hsl(var(--primary))",
                }}
              >
                {post.category.name}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
              <Calendar className="h-3 w-3" />
              {formatDate(post.published_at)}
            </span>
          </div>
          <h2 className="font-display text-2xl lg:text-3xl leading-tight mb-3 group-hover:text-primary transition-colors" style={{ color: "hsl(var(--foreground))" }}>
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="text-sm leading-relaxed mb-5 line-clamp-3" style={{ color: "hsl(var(--muted-foreground))" }}>
              {post.excerpt}
            </p>
          )}
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all" style={{ color: "hsl(var(--primary))" }}>
            Read article <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group rounded-2xl overflow-hidden border hover:shadow-md transition-all duration-300 flex flex-col"
      style={{ borderColor: "hsl(var(--border))", background: "#fff" }}
    >
      <div className="aspect-[16/10] overflow-hidden bg-muted">
        {post.image_url ? (
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full" style={{ background: "hsl(var(--muted))" }} />
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          {post.category && (
            <span
              className="px-2.5 py-0.5 text-xs font-bold tracking-wide uppercase rounded-full"
              style={{
                background: "hsl(var(--primary) / 0.1)",
                color: "hsl(var(--primary))",
              }}
            >
              {post.category.name}
            </span>
          )}
        </div>
        <h2
          className="font-display text-lg leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2 flex-1"
          style={{ color: "hsl(var(--foreground))" }}
        >
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-sm line-clamp-2 mb-4" style={{ color: "hsl(var(--muted-foreground))" }}>
            {post.excerpt}
          </p>
        )}
        <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: "1px solid hsl(var(--border))" }}>
          <span className="flex items-center gap-1.5 text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
            <Calendar className="h-3 w-3" />
            {formatDate(post.published_at)}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all" style={{ color: "hsl(var(--primary))" }}>
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

  const featuredPost = posts?.[0];
  const remainingPosts = posts?.slice(1) || [];

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
        <title>Presale Blog Vancouver | Condo Investment Tips & Insights | Uzair Muhammad</title>
        <meta name="description" content="Expert insights on Vancouver presale condos, investment strategies, assignment sales, and real estate tips from Uzair Muhammad, Vancouver's top presale expert." />
        <meta name="keywords" content="presale blog Vancouver, condo investment tips, presale condo advice, Vancouver real estate blog, assignment sale guide" />
        <link rel="canonical" href="https://presalewithuzair.com/blog" />
        <meta property="og:type" content="blog" />
        <meta property="og:url" content="https://presalewithuzair.com/blog" />
        <meta property="og:title" content="Presale Blog | Investment Tips & Insights" />
        <meta property="og:description" content="Expert insights on Vancouver presale condos and investment strategies." />
        <meta property="og:image" content="https://presalewithuzair.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Presale Blog | Uzair Muhammad" />
        <meta name="twitter:description" content="Expert insights on presale condos, investment strategies, and real estate tips." />
        <script type="application/ld+json">{JSON.stringify(blogStructuredData)}</script>
      </Helmet>

      <Navbar />
      <main style={{ background: "hsl(40 25% 97%)" }}>

        {/* ── Hero ── */}
        <section className="pt-32 pb-16" style={{ background: "hsl(40 30% 98%)" }}>
          <div className="container-xl text-center">
            <p className="section-label mb-3 animate-fade-up">Educational Resources</p>
            <h1
              className="font-display text-5xl lg:text-6xl animate-fade-up delay-100 mb-5"
              style={{ color: "hsl(var(--foreground))", letterSpacing: "-0.02em" }}
            >
              Guides &amp; <span className="text-gradient">Resources</span>
            </h1>
            <p
              className="max-w-2xl mx-auto text-lg leading-relaxed animate-fade-up delay-200"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              Everything you need to navigate the Metro Vancouver presale market with confidence.
              Expert guides, market updates, and investment insights.
            </p>
          </div>
        </section>

        {/* ── Browse by Category ── */}
        <section className="py-14" style={{ background: "hsl(40 25% 97%)" }}>
          <div className="container-xl">
            <div className="mb-8">
              <h2 className="font-display text-2xl mb-1" style={{ color: "hsl(var(--foreground))" }}>
                Browse by Category
              </h2>
              <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                Explore our curated content collections
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const count = posts?.filter((p) => p.category?.slug === cat.slug).length ?? 0;
                return (
                  <div
                    key={cat.slug}
                    className="rounded-xl p-5 border flex flex-col gap-3 hover:shadow-md transition-all duration-200 cursor-default"
                    style={{ background: "#fff", borderColor: "hsl(var(--border))" }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: cat.bg }}
                    >
                      <Icon className="h-5 w-5" style={{ color: cat.color }} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-1" style={{ color: "hsl(var(--foreground))" }}>
                        {cat.label}
                      </p>
                      <p className="text-xs leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
                        {cat.description}
                      </p>
                    </div>
                    {count > 0 && (
                      <p className="text-xs font-semibold mt-auto" style={{ color: cat.color }}>
                        {count} {count === 1 ? "article" : "articles"}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Articles ── */}
        <section className="py-14" style={{ background: "hsl(40 25% 97%)" }}>
          <div className="container-xl">
            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin" style={{ color: "hsl(var(--primary))" }} />
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p style={{ color: "hsl(var(--muted-foreground))" }}>Failed to load articles.</p>
              </div>
            ) : !posts || posts.length === 0 ? (
              <div className="text-center py-20">
                <BookOpen className="h-12 w-12 mx-auto mb-4" style={{ color: "hsl(var(--muted-foreground))" }} />
                <p className="font-display text-xl mb-2" style={{ color: "hsl(var(--foreground))" }}>No articles yet</p>
                <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                  We're working on adding content. Check back soon!
                </p>
              </div>
            ) : (
              <div className="space-y-14">
                {/* Featured article */}
                {featuredPost && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-display text-2xl" style={{ color: "hsl(var(--foreground))" }}>
                        Featured Article
                      </h2>
                    </div>
                    <PostCard post={featuredPost} large />
                  </div>
                )}

                {/* All articles grid */}
                {remainingPosts.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-display text-2xl" style={{ color: "hsl(var(--foreground))" }}>
                        All Articles
                      </h2>
                      <span className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                        {posts.length} {posts.length === 1 ? "article" : "articles"}
                      </span>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {remainingPosts.map((post) => (
                        <PostCard key={post.slug} post={post} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ── CTA strip ── */}
        <section className="py-16" style={{ background: "hsl(25 15% 10%)" }}>
          <div className="container-xl text-center">
            <div
              className="inline-block h-[3px] w-12 rounded mb-6"
              style={{ background: "var(--text-gradient)" }}
            />
            <h2 className="font-display text-3xl text-white mb-3">
              Have Questions About Presale?
            </h2>
            <p className="text-white/60 text-sm mb-8 max-w-lg mx-auto">
              Book a free discovery call with Uzair and get personalized, unbiased advice on your next presale purchase.
            </p>
            <Link
              to="/book"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
              style={{
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
              }}
            >
              Book a Free Discovery Call <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
