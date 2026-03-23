import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Calendar, ArrowRight, Loader2, BookOpen,
  TrendingUp, Lightbulb, Scale, BarChart2, X, Clock,
} from "lucide-react";
import { useBlogPosts, BlogPost } from "@/hooks/useBlogPosts";

/* ── Category config ── */
const CATEGORIES = [
  {
    slug: "resources",
    label: "Resources",
    description: "Practical guides for presale buyers and investors",
    icon: BookOpen,
    color: "hsl(220 80% 50%)",
    bg: "hsl(220 80% 97%)",
  },
  {
    slug: "pre-sale-tips",
    label: "Pre-Sale Tips",
    description: "Expert tips to navigate presale purchases with confidence",
    icon: Lightbulb,
    color: "hsl(38 90% 40%)",
    bg: "hsl(38 90% 97%)",
  },
  {
    slug: "investment-strategy",
    label: "Investment Strategy",
    description: "ROI calculations, timing strategies, and long-term thinking",
    icon: TrendingUp,
    color: "hsl(160 55% 35%)",
    bg: "hsl(160 55% 96%)",
  },
  {
    slug: "tax-legal",
    label: "Tax & Legal",
    description: "BC flipping tax, assignments, and contract essentials",
    icon: Scale,
    color: "hsl(270 55% 50%)",
    bg: "hsl(270 55% 97%)",
  },
  {
    slug: "market-analysis",
    label: "Market Analysis",
    description: "Metro Vancouver price trends and market reports",
    icon: BarChart2,
    color: "hsl(0 60% 48%)",
    bg: "hsl(0 60% 97%)",
  },
];

function readTime(content: string) {
  return Math.max(1, Math.round(content.trim().split(/\s+/).length / 200));
}

function formatDate(d: string | null) {
  return d
    ? new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "";
}

/* ── Featured (large) card ── */
function FeaturedCard({ post }: { post: BlogPost }) {
  const cat = CATEGORIES.find((c) => c.slug === post.category?.slug);
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group grid md:grid-cols-[1.1fr_1fr] rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1"
      style={{
        background: "#fff",
        border: "1px solid hsl(var(--border))",
        boxShadow: "0 4px 32px -8px hsla(25,20%,15%,0.10)",
      }}
    >
      {/* Image */}
      <div className="relative h-72 md:h-full overflow-hidden" style={{ background: "hsl(var(--muted))" }}>
        {post.image_url && (
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ filter: "saturate(1.1) contrast(1.05)" }}
          />
        )}
        {/* Gold shimmer overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: "linear-gradient(135deg, hsl(40 85% 45% / 0.08) 0%, transparent 60%)" }}
        />
      </div>

      {/* Content */}
      <div className="p-8 md:p-10 flex flex-col justify-between">
        <div>
          {/* Label + category */}
          <div className="flex items-center gap-3 mb-5">
            <span
              className="text-xs font-black tracking-[0.2em] uppercase"
              style={{ color: "hsl(var(--primary))" }}
            >
              Featured
            </span>
            {post.category && (
              <>
                <span style={{ color: "hsl(var(--border))" }}>·</span>
                <span
                  className="px-2.5 py-0.5 text-xs font-bold tracking-wide uppercase rounded-sm"
                  style={{
                    background: cat ? cat.bg : "hsl(var(--primary) / 0.1)",
                    color: cat ? cat.color : "hsl(var(--primary))",
                  }}
                >
                  {post.category.name}
                </span>
              </>
            )}
          </div>

          {/* Gold rule */}
          <div
            className="w-10 h-[2px] rounded-full mb-5"
            style={{ background: "var(--text-gradient)" }}
          />

          <h2
            className="font-display text-2xl lg:text-[1.75rem] leading-tight mb-4 group-hover:text-primary transition-colors duration-300"
            style={{ color: "hsl(var(--foreground))", letterSpacing: "-0.01em" }}
          >
            {post.title}
          </h2>
          {post.excerpt && (
            <p
              className="text-sm leading-relaxed line-clamp-3 mb-6"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              {post.excerpt}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-3 text-xs"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3 w-3" />
              {formatDate(post.published_at)}
            </div>
            <span>·</span>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3 w-3" />
              {readTime(post.content)} min
            </div>
          </div>
          <span
            className="inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-3 transition-all duration-300"
            style={{ color: "hsl(var(--primary))" }}
          >
            Read <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ── Standard post card ── */
function PostCard({ post }: { post: BlogPost }) {
  const cat = CATEGORIES.find((c) => c.slug === post.category?.slug);
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group rounded-2xl overflow-hidden flex flex-col transition-all duration-400 hover:-translate-y-1"
      style={{
        background: "#fff",
        border: "1px solid hsl(var(--border))",
        boxShadow: "0 2px 16px -4px hsla(25,20%,15%,0.07)",
      }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/9] overflow-hidden" style={{ background: "hsl(var(--muted))" }}>
        {post.image_url && (
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ filter: "saturate(1.08) contrast(1.04)" }}
          />
        )}
        {/* Category pill overlay */}
        {post.category && (
          <span
            className="absolute top-3 left-3 px-2.5 py-1 text-xs font-bold tracking-wide uppercase rounded-sm backdrop-blur-sm"
            style={{
              background: cat ? `${cat.bg}ee` : "hsl(var(--primary) / 0.15)",
              color: cat ? cat.color : "hsl(var(--primary))",
              border: `1px solid ${cat ? cat.color + "33" : "hsl(var(--primary) / 0.2)"}`,
            }}
          >
            {post.category.name}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <h2
          className="font-display text-[1.05rem] leading-snug mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2 flex-1"
          style={{ color: "hsl(var(--foreground))", letterSpacing: "-0.01em" }}
        >
          {post.title}
        </h2>
        {post.excerpt && (
          <p
            className="text-sm leading-relaxed line-clamp-2 mb-4"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            {post.excerpt}
          </p>
        )}

        {/* Footer */}
        <div
          className="flex items-center justify-between mt-auto pt-4"
          style={{ borderTop: "1px solid hsl(var(--border))" }}
        >
          <div className="flex items-center gap-3 text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(post.published_at)}
            </div>
          </div>
          <span
            className="inline-flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all duration-300"
            style={{ color: "hsl(var(--primary))" }}
          >
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
        <title>Presale Blog Vancouver | Condo Investment Tips & Insights | Uzair Muhammad</title>
        <meta name="description" content="Expert insights on Vancouver presale condos, investment strategies, assignment sales, and real estate tips from Uzair Muhammad." />
        <meta name="keywords" content="presale blog Vancouver, condo investment tips, presale condo advice, Vancouver real estate blog, assignment sale guide" />
        <link rel="canonical" href="https://presalewithuzair.com/blog" />
        <meta property="og:type" content="blog" />
        <meta property="og:url" content="https://presalewithuzair.com/blog" />
        <meta property="og:title" content="Presale Blog | Investment Tips & Insights" />
        <meta property="og:description" content="Expert insights on Vancouver presale condos and investment strategies." />
        <meta property="og:image" content="https://presalewithuzair.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(blogStructuredData)}</script>
      </Helmet>

      <Navbar />

      <main style={{ background: "hsl(40 20% 97%)" }}>

        {/* ── Hero ── */}
        <section
          className="pt-32 pb-16 relative overflow-hidden"
          style={{ background: "hsl(25 15% 10%)" }}
        >
          {/* Subtle gold radial glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, hsl(40 85% 45% / 0.12) 0%, transparent 70%)",
            }}
          />
          {/* Gold top bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "var(--text-gradient)" }} />

          <div className="container-xl text-center relative z-10">
            <p
              className="text-xs font-black tracking-[0.3em] uppercase mb-4"
              style={{ color: "hsl(var(--primary))" }}
            >
              Educational Resources
            </p>
            <h1
              className="font-display text-5xl lg:text-6xl mb-6 text-white"
              style={{ letterSpacing: "-0.02em" }}
            >
              Guides &amp; <span className="text-gradient">Resources</span>
            </h1>
            <div
              className="w-14 h-[2px] mx-auto mb-7 rounded-full"
              style={{ background: "var(--text-gradient)" }}
            />
            <p
              className="max-w-xl mx-auto text-base leading-relaxed"
              style={{ color: "hsl(40 15% 70%)" }}
            >
              Everything you need to navigate Metro Vancouver presales with confidence — expert guides, market intelligence, and investment insights.
            </p>
          </div>
        </section>

        {/* ── Category filters ── */}
        <section
          className="py-10 border-b"
          style={{ background: "#fff", borderColor: "hsl(var(--border))" }}
        >
          <div className="container-xl">
            <div className="flex items-center justify-between mb-6">
              <h2
                className="font-display text-xl"
                style={{ color: "hsl(var(--foreground))" }}
              >
                Browse by Topic
              </h2>
              {activeCategory && (
                <button
                  onClick={() => setActiveCategory(null)}
                  className="flex items-center gap-1.5 text-xs font-semibold transition-colors hover:underline"
                  style={{ color: "hsl(var(--primary))" }}
                >
                  <X className="h-3.5 w-3.5" /> Clear filter
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const count = posts?.filter((p) => p.category?.slug === cat.slug).length ?? 0;
                const isActive = activeCategory === cat.slug;

                return (
                  <button
                    key={cat.slug}
                    onClick={() => setActiveCategory(isActive ? null : cat.slug)}
                    className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl border transition-all duration-200"
                    style={{
                      background: isActive ? cat.bg : "hsl(var(--background))",
                      borderColor: isActive ? cat.color : "hsl(var(--border))",
                      boxShadow: isActive ? `0 0 0 2px ${cat.color}33` : "none",
                    }}
                  >
                    <div
                      className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                      style={{ background: isActive ? cat.color + "22" : cat.bg }}
                    >
                      <Icon className="h-3.5 w-3.5" style={{ color: cat.color }} />
                    </div>
                    <span
                      className="text-sm font-semibold"
                      style={{ color: isActive ? cat.color : "hsl(var(--foreground))" }}
                    >
                      {cat.label}
                    </span>
                    <span
                      className="text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[1.25rem] text-center"
                      style={{
                        background: isActive ? cat.color : "hsl(var(--muted))",
                        color: isActive ? "#fff" : "hsl(var(--muted-foreground))",
                      }}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Articles ── */}
        <section className="py-14 pb-24" style={{ background: "hsl(40 20% 97%)" }}>
          <div className="container-xl">
            {isLoading ? (
              <div className="flex justify-center py-24">
                <Loader2 className="h-8 w-8 animate-spin" style={{ color: "hsl(var(--primary))" }} />
              </div>
            ) : error ? (
              <div className="text-center py-24">
                <p style={{ color: "hsl(var(--muted-foreground))" }}>Failed to load articles.</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-24">
                <BookOpen className="h-12 w-12 mx-auto mb-4" style={{ color: "hsl(var(--muted-foreground))" }} />
                <p className="font-display text-xl mb-2" style={{ color: "hsl(var(--foreground))" }}>No articles in this category yet</p>
                <button onClick={() => setActiveCategory(null)} className="text-sm font-semibold underline mt-2" style={{ color: "hsl(var(--primary))" }}>
                  View all articles
                </button>
              </div>
            ) : (
              <div className="space-y-14">

                {/* Featured */}
                {featuredPost && !activeCategory && (
                  <div>
                    <div className="flex items-center gap-4 mb-7">
                      <div className="w-8 h-[2px] rounded-full" style={{ background: "var(--text-gradient)" }} />
                      <h2
                        className="font-display text-xl tracking-tight"
                        style={{ color: "hsl(var(--foreground))" }}
                      >
                        Featured Article
                      </h2>
                    </div>
                    <FeaturedCard post={featuredPost} />
                  </div>
                )}

                {/* Grid */}
                <div>
                  <div className="flex items-center justify-between mb-7">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-[2px] rounded-full" style={{ background: "var(--text-gradient)" }} />
                      <h2
                        className="font-display text-xl tracking-tight"
                        style={{ color: "hsl(var(--foreground))" }}
                      >
                        {activeCategory
                          ? CATEGORIES.find((c) => c.slug === activeCategory)?.label
                          : "All Articles"}
                      </h2>
                    </div>
                    <span className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                      {(activeCategory ? filtered : remainingPosts).length} articles
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <section
          className="py-20 relative overflow-hidden"
          style={{ background: "hsl(25 15% 10%)" }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: "var(--text-gradient)" }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 60% 50%, hsl(40 85% 45% / 0.07) 0%, transparent 70%)" }}
          />
          <div className="container-xl text-center relative z-10">
            <p className="text-xs font-black tracking-[0.3em] uppercase mb-4" style={{ color: "hsl(var(--primary))" }}>
              Free Strategy Call
            </p>
            <h2 className="font-display text-4xl text-white mb-4" style={{ letterSpacing: "-0.02em" }}>
              Ready to Buy Smart?
            </h2>
            <p className="max-w-lg mx-auto mb-8 text-base" style={{ color: "hsl(40 15% 65%)" }}>
              Stop guessing. Get unfiltered, no-BS presale advice from BC's top specialist — at no cost to you.
            </p>
            <a
              href="https://wa.me/17782313592?text=Hi%20Uzair%2C%20I%20read%20your%20blog%20and%20would%20like%20a%20free%20strategy%20call"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "var(--text-gradient)",
                color: "hsl(25 15% 10%)",
                boxShadow: "0 8px 32px -8px hsl(40 85% 45% / 0.5)",
              }}
            >
              Book a Free Call with Uzair
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
