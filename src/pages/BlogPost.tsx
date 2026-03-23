import { Helmet } from "react-helmet-async";
import { useParams, Link, Navigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { useEffect, useState, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, Phone, Loader2, Clock, ChevronRight } from "lucide-react";
import { useBlogPost, useBlogPosts } from "@/hooks/useBlogPosts";
import { FAQSchema } from "@/components/blog/FAQSchema";

/* ─── Reading progress bar ─── */
function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent pointer-events-none">
      <div
        className="h-full transition-all duration-100 ease-out"
        style={{
          width: `${progress}%`,
          background: "var(--text-gradient)",
        }}
      />
    </div>
  );
}

/* ─── Estimated read time ─── */
function readTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/* ─── Markdown → HTML renderer ─── */
function renderMarkdown(content: string): string {
  // If content already looks like HTML, pass it through
  const trimmed = content.trim();
  if (trimmed.startsWith("<") && (trimmed.startsWith("<p") || trimmed.startsWith("<h") || trimmed.startsWith("<ul") || trimmed.startsWith("<ol") || trimmed.startsWith("<div") || trimmed.startsWith("<blockquote"))) {
    // Inject blog classes into existing HTML tags
    return trimmed
      .replace(/<h1(\s[^>]*)?>/g, '<h1$1 class="blog-h1">')
      .replace(/<h2(\s[^>]*)?>/g, '<h2$1 class="blog-h2">')
      .replace(/<h3(\s[^>]*)?>/g, '<h3$1 class="blog-h3">')
      .replace(/<h4(\s[^>]*)?>/g, '<h4$1 class="blog-h3">')
      .replace(/<p(\s[^>]*)?>/g, '<p$1 class="blog-p">')
      .replace(/<ul(\s[^>]*)?>/g, '<ul$1 class="blog-ul">')
      .replace(/<ol(\s[^>]*)?>/g, '<ol$1 class="blog-ol">')
      .replace(/<blockquote(\s[^>]*)?>/g, '<blockquote$1 class="blog-pullquote">');
  }

  // Escape HTML but leave inline markdown markers intact temporarily
  const escapeHtml = (text: string) =>
    text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  // Process inline markdown: **bold**, *italic*, `code`
  const inline = (text: string): string => {
    const escaped = escapeHtml(text);
    return escaped
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`(.+?)`/g, '<code class="blog-code">$1</code>');
  };

  const lines = content.split("\n");
  const html: string[] = [];
  let inList = false;
  let listType = "";
  let firstParagraphDone = false;

  const closeList = () => {
    if (inList) {
      html.push(listType === "ul" ? "</ul>" : "</ol>");
      inList = false;
      listType = "";
    }
  };

  lines.forEach((line) => {
    // Pull-quote: lines starting with >
    if (line.startsWith("> ")) {
      closeList();
      html.push(
        `<blockquote class="blog-pullquote">${inline(line.slice(2))}</blockquote>`
      );
      return;
    }
    if (line.startsWith("# ")) {
      closeList();
      html.push(`<h1 class="blog-h1">${inline(line.slice(2))}</h1>`);
      return;
    }
    if (line.startsWith("## ")) {
      closeList();
      html.push(`<h2 class="blog-h2">${inline(line.slice(3))}</h2>`);
      return;
    }
    if (line.startsWith("### ")) {
      closeList();
      html.push(`<h3 class="blog-h3">${inline(line.slice(4))}</h3>`);
      return;
    }
    if (line.startsWith("#### ")) {
      closeList();
      html.push(`<h3 class="blog-h3">${inline(line.slice(5))}</h3>`);
      return;
    }
    if (line.startsWith("- ") || line.startsWith("* ")) {
      if (!inList || listType !== "ul") {
        closeList();
        html.push('<ul class="blog-ul">');
        inList = true;
        listType = "ul";
      }
      html.push(`<li>${inline(line.slice(2))}</li>`);
      return;
    }
    if (line.match(/^\d+\.\s/)) {
      if (!inList || listType !== "ol") {
        closeList();
        html.push('<ol class="blog-ol">');
        inList = true;
        listType = "ol";
      }
      html.push(`<li>${inline(line.slice(line.indexOf(" ") + 1))}</li>`);
      return;
    }
    if (line.trim() === "") {
      closeList();
      return;
    }
    closeList();
    if (!firstParagraphDone) {
      firstParagraphDone = true;
      html.push(`<p class="blog-p blog-dropcap">${inline(line)}</p>`);
    } else {
      html.push(`<p class="blog-p">${inline(line)}</p>`);
    }
  });

  closeList();
  return html.join("");
}

/* ─── Main component ─── */
const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, error } = useBlogPost(slug || "");
  const { data: allPosts } = useBlogPosts();
  const articleRef = useRef<HTMLDivElement>(null);

  const relatedPosts = allPosts?.filter((p) => p.slug !== slug).slice(0, 3) || [];

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-background">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Footer />
      </>
    );
  }

  if (error || !post) {
    return <Navigate to="/blog" replace />;
  }

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || "",
    image: post.image_url || "https://presalewithuzair.com/og-image.jpg",
    datePublished: post.published_at,
    dateModified: post.published_at,
    author: {
      "@type": "Person",
      name: "Uzair Muhammad",
      url: "https://presalewithuzair.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "Presale With Uzair",
      url: "https://presalewithuzair.com",
      logo: {
        "@type": "ImageObject",
        url: "https://presalewithuzair.com/og-image.jpg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://presalewithuzair.com/blog/${slug}`,
    },
  };

  const mins = readTime(post.content);

  return (
    <>
      <Helmet>
        <title>{post.title} | Presale Blog | Uzair Muhammad</title>
        <meta name="description" content={post.excerpt || ""} />
        <meta
          name="keywords"
          content={`${post.title.toLowerCase().split(" ").slice(0, 5).join(", ")}, presale Vancouver, real estate tips`}
        />
        <link rel="canonical" href={`https://presalewithuzair.com/blog/${slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://presalewithuzair.com/blog/${slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || ""} />
        {post.image_url && <meta property="og:image" content={post.image_url} />}
        <meta property="article:published_time" content={post.published_at || ""} />
        <meta property="article:author" content="Uzair Muhammad" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt || ""} />
        {post.image_url && <meta name="twitter:image" content={post.image_url} />}
        <script type="application/ld+json">{JSON.stringify(articleStructuredData)}</script>
      </Helmet>

      <ReadingProgressBar />
      <Navbar />

      <main style={{ background: "hsl(40 20% 97%)" }}>

        {/* ── Premium editorial hero ── */}
        <section className="w-full pt-28 pb-0" style={{ background: "#fff" }}>
          {/* Top gold accent bar */}
          <div className="h-[3px] w-full" style={{ background: "var(--text-gradient)" }} />

          <div className="container-xl max-w-4xl pt-10">
            {/* Back link */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 mb-8 text-xs font-bold tracking-[0.15em] uppercase transition-colors w-fit hover:underline"
              style={{ color: "hsl(var(--primary))" }}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All Articles
            </Link>

            {/* Category badge */}
            {post.category && (
              <div className="mb-5">
                <span
                  className="inline-block px-3 py-1 text-xs font-bold tracking-[0.15em] uppercase rounded-sm"
                  style={{
                    background: "hsl(var(--primary) / 0.1)",
                    color: "hsl(var(--primary))",
                    border: "1px solid hsl(var(--primary) / 0.25)",
                  }}
                >
                  {post.category.name}
                </span>
              </div>
            )}

            {/* Title */}
            <h1
              className="font-display text-4xl md:text-5xl lg:text-[3.25rem] max-w-3xl leading-[1.1] mb-8"
              style={{ color: "hsl(var(--foreground))", letterSpacing: "-0.025em" }}
            >
              {post.title}
            </h1>

            {/* Meta row */}
            <div
              className="flex flex-wrap items-center gap-5 text-sm pb-8"
              style={{
                color: "hsl(var(--muted-foreground))",
                borderBottom: "1px solid hsl(var(--border))",
              }}
            >
              <div className="flex items-center gap-2.5">
                <img
                  src="/favicon.jpeg"
                  alt="Uzair Muhammad"
                  className="h-8 w-8 rounded-full object-cover"
                  style={{ border: "2px solid hsl(var(--primary) / 0.35)" }}
                />
                <span className="font-semibold" style={{ color: "hsl(var(--foreground))" }}>Uzair Muhammad</span>
              </div>
              <span className="hidden sm:block w-px h-4" style={{ background: "hsl(var(--border))" }} />
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(post.published_at)}
              </div>
              <span className="hidden sm:block w-px h-4" style={{ background: "hsl(var(--border))" }} />
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {mins} min read
              </div>
            </div>
          </div>

          {/* Hero image — full-bleed within container */}
          {post.image_url && (
            <div className="container-xl max-w-4xl mt-10 pb-0">
              <div
                className="w-full h-[360px] md:h-[480px] rounded-2xl overflow-hidden"
                style={{ boxShadow: "0 16px 64px -16px hsla(25,20%,15%,0.18)" }}
              >
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  style={{ filter: "saturate(1.08) contrast(1.04)" }}
                />
              </div>
            </div>
          )}
        </section>

        {/* ── Article body ── */}
        <section className="py-16" style={{ background: "hsl(40 20% 97%)" }}>
          <div className="container-xl">
            <div className="flex gap-16 max-w-5xl mx-auto">

              {/* ─ Main article ─ */}
              <article ref={articleRef} className="flex-1 min-w-0">

                {/* Lede / excerpt */}
                {post.excerpt && (
                  <p
                    className="font-display text-xl italic leading-relaxed mb-10"
                    style={{
                      color: "hsl(var(--foreground) / 0.7)",
                      borderLeft: "4px solid hsl(var(--primary))",
                      paddingLeft: "1.5rem",
                    }}
                  >
                    {post.excerpt}
                  </p>
                )}

                {/* Rendered content */}
                <div
                  className="blog-content"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(renderMarkdown(post.content), {
                      ALLOWED_TAGS: ["h1","h2","h3","h4","h5","h6","p","li","ul","ol","strong","em","a","blockquote","code","pre","span"],
                      ALLOWED_ATTR: ["class","href","target","rel"],
                    }),
                  }}
                />

                {/* FAQ */}
                <FAQSchema />

                {/* Author bio */}
                <div
                  className="mt-16 p-8 rounded-2xl flex gap-6 items-start"
                  style={{
                    background: "#fff",
                    border: "1px solid hsl(var(--border))",
                    boxShadow: "0 4px 24px -8px hsla(25,20%,15%,0.08)",
                  }}
                >
                  <img
                    src="/favicon.jpeg"
                    alt="Uzair Muhammad"
                    className="h-20 w-20 rounded-full object-cover flex-shrink-0"
                    style={{ border: "3px solid hsl(var(--primary) / 0.35)" }}
                  />
                  <div>
                    <p className="text-xs font-black tracking-[0.2em] uppercase mb-1" style={{ color: "hsl(var(--primary))" }}>
                      Written by
                    </p>
                    <h3 className="font-display text-xl mb-2" style={{ color: "hsl(var(--foreground))" }}>Uzair Muhammad</h3>
                    <div className="w-8 h-[2px] rounded-full mb-3" style={{ background: "var(--text-gradient)" }} />
                    <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
                      Vancouver's presale specialist with a track record of helping 350+ buyers and investors navigate the market with clarity. Uzair provides unbiased advice — even if that means advising you not to buy.
                    </p>
                    <a
                      href="https://wa.me/17782313592"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-4 text-sm font-bold transition-all hover:gap-2.5"
                      style={{ color: "hsl(var(--primary))" }}
                    >
                      Chat with Uzair <ChevronRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>

                {/* Inline CTA — dark premium */}
                <div
                  className="mt-8 p-10 rounded-2xl text-center relative overflow-hidden"
                  style={{
                    background: "hsl(25 15% 10%)",
                    border: "1px solid hsl(25 12% 20%)",
                    boxShadow: "0 16px 48px -12px hsla(25,30%,10%,0.4)",
                  }}
                >
                  <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "var(--text-gradient)" }} />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(40 85% 45% / 0.08) 0%, transparent 65%)" }}
                  />
                  <p className="text-xs font-black tracking-[0.25em] uppercase mb-3 relative z-10" style={{ color: "hsl(var(--primary))" }}>
                    Free Consultation
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl text-white mb-3 relative z-10" style={{ letterSpacing: "-0.02em" }}>
                    Ready to Navigate Your Presale?
                  </h3>
                  <p className="text-sm mb-7 max-w-sm mx-auto relative z-10" style={{ color: "hsl(40 15% 65%)" }}>
                    Connect with Uzair to discuss your investment goals and discover exclusive Metro Vancouver opportunities.
                  </p>
                  <a
                    href="https://wa.me/17782313592?text=Hi%20Uzair%2C%20I%27m%20interested%20in%20presale%20and%20would%20like%20to%20discuss%20further..."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background: "var(--text-gradient)",
                      color: "hsl(25 15% 10%)",
                      boxShadow: "0 8px 32px -8px hsl(40 85% 45% / 0.5)",
                    }}
                  >
                    <Phone className="h-4 w-4" />
                    Chat with Uzair on WhatsApp
                  </a>
                </div>
              </article>

              {/* ─ Sticky sidebar ─ */}
              {relatedPosts.length > 0 && (
                <aside className="hidden lg:block w-[260px] flex-shrink-0">
                  <div className="sticky top-24 space-y-8">
                    {/* Section header */}
                    <div>
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-6 h-[2px] rounded-full" style={{ background: "var(--text-gradient)" }} />
                        <p className="text-xs font-black tracking-[0.2em] uppercase" style={{ color: "hsl(var(--primary))" }}>
                          More Articles
                        </p>
                      </div>
                      <div className="flex flex-col divide-y" style={{ borderColor: "hsl(var(--border))" }}>
                        {relatedPosts.slice(0, 5).map((rp) => (
                          <Link
                            key={rp.slug}
                            to={`/blog/${rp.slug}`}
                            className="group flex gap-3 items-start py-4 first:pt-0"
                          >
                            <div
                              className="w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden"
                              style={{ border: "1px solid hsl(var(--border))" }}
                            >
                              {rp.image_url ? (
                                <img
                                  src={rp.image_url}
                                  alt={rp.title}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-400"
                                />
                              ) : (
                                <div className="w-full h-full" style={{ background: "hsl(var(--muted))" }} />
                              )}
                            </div>
                            <div className="min-w-0">
                              <h4
                                className="font-display text-xs leading-snug group-hover:text-primary transition-colors line-clamp-3"
                                style={{ color: "hsl(var(--foreground))" }}
                              >
                                {rp.title}
                              </h4>
                              <p className="text-[10px] mt-1.5" style={{ color: "hsl(var(--muted-foreground))" }}>
                                {formatDate(rp.published_at)}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Sidebar CTA card */}
                    <div
                      className="p-5 rounded-xl relative overflow-hidden"
                      style={{
                        background: "hsl(25 15% 10%)",
                        border: "1px solid hsl(25 12% 22%)",
                      }}
                    >
                      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "var(--text-gradient)" }} />
                      <p className="text-xs font-black tracking-[0.2em] uppercase mb-2" style={{ color: "hsl(var(--primary))" }}>
                        Free Call
                      </p>
                      <p className="font-display text-base text-white leading-tight mb-3">
                        Talk strategy with Uzair
                      </p>
                      <a
                        href="https://wa.me/17782313592"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center py-2.5 rounded-lg text-xs font-bold transition-all hover:opacity-90"
                        style={{
                          background: "var(--text-gradient)",
                          color: "hsl(25 15% 10%)",
                        }}
                      >
                        Book Free Consultation
                      </a>
                    </div>
                  </div>
                </aside>
              )}
            </div>
          </div>
        </section>

        {/* ── Related posts ── */}
        {relatedPosts.length > 0 && (
          <section className="py-20" style={{ background: "hsl(25 15% 10%)" }}>
            <div
              className="h-[2px] w-full mb-0"
              style={{ background: "var(--text-gradient)", marginBottom: 0 }}
            />
            <div className="container-xl pt-16">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="text-xs font-black tracking-[0.25em] uppercase mb-2" style={{ color: "hsl(var(--primary))" }}>Keep Reading</p>
                  <h2 className="font-display text-3xl text-white" style={{ letterSpacing: "-0.02em" }}>
                    More <span className="text-gradient">Articles</span>
                  </h2>
                </div>
                <Link
                  to="/blog"
                  className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold transition-all hover:gap-3"
                  style={{ color: "hsl(var(--primary))" }}
                >
                  View all <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((rp) => (
                  <Link
                    key={rp.slug}
                    to={`/blog/${rp.slug}`}
                    className="group rounded-2xl overflow-hidden transition-all duration-400 hover:-translate-y-1"
                    style={{
                      background: "hsl(25 12% 14%)",
                      border: "1px solid hsl(25 10% 22%)",
                      boxShadow: "0 4px 24px -8px hsla(0,0%,0%,0.3)",
                    }}
                  >
                    <div className="h-48 overflow-hidden">
                      {rp.image_url ? (
                        <img
                          src={rp.image_url}
                          alt={rp.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          style={{ filter: "saturate(1.05) brightness(0.92)" }}
                        />
                      ) : (
                        <div className="w-full h-full" style={{ background: "hsl(25 10% 20%)" }} />
                      )}
                    </div>
                    <div className="p-5">
                      {rp.category && (
                        <span
                          className="text-xs font-black tracking-[0.15em] uppercase mb-3 inline-block"
                          style={{ color: "hsl(var(--primary))" }}
                        >
                          {rp.category.name}
                        </span>
                      )}
                      <h3
                        className="font-display text-base text-white leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2"
                        style={{ letterSpacing: "-0.01em" }}
                      >
                        {rp.title}
                      </h3>
                      {rp.excerpt && (
                        <p className="text-xs line-clamp-2 mb-4" style={{ color: "hsl(30 8% 52%)" }}>
                          {rp.excerpt}
                        </p>
                      )}
                      <div
                        className="flex items-center justify-between pt-3"
                        style={{ borderTop: "1px solid hsl(25 10% 22%)" }}
                      >
                        <span className="flex items-center gap-1.5 text-xs" style={{ color: "hsl(30 8% 45%)" }}>
                          <Calendar className="h-3 w-3" />
                          {formatDate(rp.published_at)}
                        </span>
                        <span className="text-xs font-semibold group-hover:underline" style={{ color: "hsl(var(--primary))" }}>
                          Read →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
};

export default BlogPost;
          <div className="container-xl max-w-5xl">
            {/* Back link */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 mb-8 text-sm font-medium tracking-wide transition-colors w-fit"
              style={{ color: "hsl(var(--muted-foreground))" }}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            {/* Category badge */}
            {post.category && (
              <span
                className="inline-block mb-5 px-3 py-1 text-xs font-bold tracking-[0.15em] uppercase rounded-sm w-fit"
                style={{
                  background: "hsl(var(--primary) / 0.12)",
                  color: "hsl(var(--primary))",
                  border: "1px solid hsl(var(--primary) / 0.3)",
                }}
              >
                {post.category.name}
              </span>
            )}

            {/* Title */}
            <h1
              className="font-display text-4xl md:text-5xl lg:text-[3.5rem] max-w-4xl leading-tight mb-6"
              style={{ color: "hsl(var(--foreground))", letterSpacing: "-0.02em" }}
            >
              {post.title}
            </h1>

            {/* Meta row */}
            <div
              className="flex flex-wrap items-center gap-5 text-sm pb-8 mb-0"
              style={{
                color: "hsl(var(--muted-foreground))",
                borderBottom: "1px solid hsl(var(--border))",
              }}
            >
              <div className="flex items-center gap-2">
                <img
                  src="/favicon.jpeg"
                  alt="Uzair Muhammad"
                  className="h-7 w-7 rounded-full object-cover"
                  style={{ border: "2px solid hsl(var(--primary) / 0.3)" }}
                />
                <span className="font-medium" style={{ color: "hsl(var(--foreground))" }}>Uzair Muhammad</span>
              </div>
              <span className="hidden sm:block w-px h-4" style={{ background: "hsl(var(--border))" }} />
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(post.published_at)}
              </div>
              <span className="hidden sm:block w-px h-4" style={{ background: "hsl(var(--border))" }} />
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {mins} min read
              </div>
            </div>
          </div>

          {/* Full-width hero image below the header text */}
          {post.image_url && (
            <div className="container-xl max-w-5xl mt-8 pb-0">
              <div className="w-full h-[420px] md:h-[520px] rounded-xl overflow-hidden">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </section>

        {/* ── Article body ── */}
        <section className="py-16" style={{ background: "hsl(var(--cream, 38 30% 97%))" }}>
          <div className="container-xl">
            {/* Two-column layout: article + sidebar */}
            <div className="flex gap-14 max-w-6xl mx-auto">
              {/* Main article */}
              <article ref={articleRef} className="flex-1 min-w-0">
                {/* Excerpt / lede */}
                {post.excerpt && (
                  <p
                    className="text-xl leading-relaxed mb-10 font-light"
                    style={{
                      color: "hsl(var(--foreground) / 0.65)",
                      borderLeft: "3px solid hsl(var(--primary))",
                      paddingLeft: "1.25rem",
                    }}
                  >
                    {post.excerpt}
                  </p>
                )}

                {/* Rendered content */}
                <div
                  className="blog-content"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(renderMarkdown(post.content), {
                      ALLOWED_TAGS: [
                        "h1","h2","h3","h4","h5","h6",
                        "p","li","ul","ol",
                        "strong","em","a","blockquote","code","pre","span",
                      ],
                      ALLOWED_ATTR: ["class","href","target","rel"],
                    }),
                  }}
                />

                {/* FAQ Schema + Accordion */}
                <FAQSchema />

                {/* Author bio card */}
                <div
                  className="mt-16 p-8 rounded-xl flex gap-6 items-start"
                  style={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                  }}
                >
                  <img
                    src="/favicon.jpeg"
                    alt="Uzair Muhammad"
                    className="h-20 w-20 rounded-full object-cover flex-shrink-0"
                    style={{ border: "2px solid hsl(var(--primary) / 0.4)" }}
                  />
                  <div>
                    <p className="text-xs font-bold tracking-[0.15em] uppercase mb-1" style={{ color: "hsl(var(--primary))" }}>
                      Written by
                    </p>
                    <h3 className="font-display text-xl text-foreground mb-2">Uzair Muhammad</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
                      Vancouver's presale specialist with a track record of helping 350+ buyers and investors navigate the market with clarity. Uzair provides unbiased advice — even if that means advising you not to buy.
                    </p>
                    <a
                      href="https://wa.me/17782313592"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold transition-colors hover:underline"
                      style={{ color: "hsl(var(--primary))" }}
                    >
                      Chat with Uzair <ChevronRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>

                {/* Inline CTA */}
                <div
                  className="mt-8 p-8 rounded-xl text-center relative overflow-hidden"
                  style={{
                    background: "hsl(25 15% 10%)",
                    border: "1px solid hsl(25 10% 22%)",
                  }}
                >
                  {/* Gold top accent */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px]"
                    style={{ background: "var(--text-gradient)" }}
                  />
                  <p
                    className="text-xs font-bold tracking-[0.2em] uppercase mb-3"
                    style={{ color: "hsl(var(--primary))" }}
                  >
                    Free Consultation
                  </p>
                  <h3 className="font-display text-2xl text-white mb-3">
                    Ready to Navigate Your Presale?
                  </h3>
                  <p className="text-white/60 text-sm mb-6 max-w-md mx-auto">
                    Connect with Uzair to discuss your investment goals and discover exclusive Metro Vancouver opportunities.
                  </p>
                  <a
                    href="https://wa.me/17782313592?text=Hi%20Uzair%2C%20I%27m%20interested%20in%20presale%20and%20would%20like%20to%20discuss%20further..."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="hero" size="lg" className="gap-2">
                      <Phone className="h-4 w-4" />
                      Chat with Uzair on WhatsApp
                    </Button>
                  </a>
                </div>
              </article>

              {/* Sticky sidebar — desktop only */}
              {relatedPosts.length > 0 && (
                <aside className="hidden lg:block w-72 flex-shrink-0">
                  <div className="sticky top-24">
                    <p className="text-xs font-bold tracking-[0.2em] uppercase mb-5" style={{ color: "hsl(var(--primary))" }}>
                      More Articles
                    </p>
                    <div className="flex flex-col gap-5">
                      {relatedPosts.map((rp) => (
                        <Link
                          key={rp.slug}
                          to={`/blog/${rp.slug}`}
                          className="group flex gap-4 items-start hover-lift"
                        >
                          <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                            {rp.image_url ? (
                              <img
                                src={rp.image_url}
                                alt={rp.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div
                                className="w-full h-full"
                                style={{ background: "hsl(var(--muted))" }}
                              />
                            )}
                          </div>
                          <div>
                            <p className="text-xs mb-1" style={{ color: "hsl(var(--muted-foreground))" }}>
                              {formatDate(rp.published_at)}
                            </p>
                            <h4
                              className="font-display text-sm leading-snug group-hover:text-primary transition-colors line-clamp-3"
                              style={{ color: "hsl(var(--foreground))" }}
                            >
                              {rp.title}
                            </h4>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </aside>
              )}
            </div>
          </div>
        </section>

        {/* ── Related posts — full grid at bottom ── */}
        {relatedPosts.length > 0 && (
          <section
            className="py-20"
            style={{ background: "hsl(25 15% 10%)" }}
          >
            <div className="container-xl">
              {/* Header */}
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="section-label mb-2">Keep Reading</p>
                  <h2 className="font-display text-3xl text-white">
                    Related <span className="text-gradient">Articles</span>
                  </h2>
                </div>
                <Link
                  to="/blog"
                  className="hidden sm:inline-flex items-center gap-1 text-sm font-medium transition-colors"
                  style={{ color: "hsl(var(--primary))" }}
                >
                  View all articles <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((rp) => (
                  <Link
                    key={rp.slug}
                    to={`/blog/${rp.slug}`}
                    className="group rounded-xl overflow-hidden hover-lift"
                    style={{
                      background: "hsl(25 12% 14%)",
                      border: "1px solid hsl(25 10% 22%)",
                    }}
                  >
                    <div className="h-48 overflow-hidden bg-muted">
                      {rp.image_url ? (
                        <img
                          src={rp.image_url}
                          alt={rp.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full" style={{ background: "hsl(25 10% 20%)" }} />
                      )}
                    </div>
                    <div className="p-5">
                      {rp.category && (
                        <span
                          className="text-xs font-bold tracking-[0.12em] uppercase mb-2 inline-block"
                          style={{ color: "hsl(var(--primary))" }}
                        >
                          {rp.category.name}
                        </span>
                      )}
                      <h3 className="font-display text-lg text-white leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {rp.title}
                      </h3>
                      {rp.excerpt && (
                        <p className="text-sm line-clamp-2" style={{ color: "hsl(30 8% 55%)" }}>
                          {rp.excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-1.5 mt-4 text-xs" style={{ color: "hsl(30 8% 45%)" }}>
                        <Calendar className="h-3 w-3" />
                        {formatDate(rp.published_at)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
};

export default BlogPost;
