import { Helmet } from "react-helmet-async";
import { useParams, Link, Navigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, Phone, Loader2 } from "lucide-react";
import { useBlogPost, useBlogPosts } from "@/hooks/useBlogPosts";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, error } = useBlogPost(slug || "");
  const { data: allPosts } = useBlogPosts();

  const relatedPosts = allPosts?.filter((p) => p.slug !== slug).slice(0, 2) || [];

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

  const articleStructuredData = post ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt || "",
    "image": post.image_url || "https://presalewithuzair.com/og-image.jpg",
    "datePublished": post.published_at,
    "dateModified": post.published_at,
    "author": {
      "@type": "Person",
      "name": "Uzair Muhammad",
      "url": "https://presalewithuzair.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Presale With Uzair",
      "url": "https://presalewithuzair.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://presalewithuzair.com/og-image.jpg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://presalewithuzair.com/blog/${slug}`
    }
  } : null;

  return (
    <>
      <Helmet>
        <title>{post.title} | Presale Blog | Uzair Muhammad</title>
        <meta name="description" content={post.excerpt || ""} />
        <meta name="keywords" content={`${post.title.toLowerCase().split(' ').slice(0, 5).join(', ')}, presale Vancouver, real estate tips`} />
        <link rel="canonical" href={`https://presalewithuzair.com/blog/${slug}`} />
        
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://presalewithuzair.com/blog/${slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || ""} />
        {post.image_url && <meta property="og:image" content={post.image_url} />}
        <meta property="article:published_time" content={post.published_at || ""} />
        <meta property="article:author" content="Uzair Muhammad" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt || ""} />
        
        {articleStructuredData && (
          <script type="application/ld+json">
            {JSON.stringify(articleStructuredData)}
          </script>
        )}
      </Helmet>

      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-12 bg-card">
          <div className="container-xl">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-4">
                {post.category && (
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    {post.category.name}
                  </span>
                )}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.published_at)}
                </div>
              </div>
              <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground">
                {post.title}
              </h1>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        {post.image_url && (
          <section className="py-8 bg-card">
            <div className="container-xl">
              <div className="max-w-4xl mx-auto">
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Content */}
        <section className="py-16 bg-background">
          <div className="container-xl">
            <div className="max-w-3xl mx-auto">
              <article className="prose prose-lg prose-invert max-w-none">
                <div
                  className="text-foreground/90 leading-relaxed space-y-6"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      post.content
                        .split("\n")
                        .map((line) => {
                          // Escape HTML entities in content to prevent XSS
                          const escapeHtml = (text: string) =>
                            text
                              .replace(/&/g, "&amp;")
                              .replace(/</g, "&lt;")
                              .replace(/>/g, "&gt;")
                              .replace(/"/g, "&quot;")
                              .replace(/'/g, "&#039;");
                          
                          if (line.startsWith("# ")) {
                            return `<h1 class="font-display text-4xl font-bold text-foreground mt-8 mb-6">${escapeHtml(line.slice(2))}</h1>`;
                          }
                          if (line.startsWith("## ")) {
                            return `<h2 class="font-display text-2xl font-bold text-foreground mt-8 mb-4">${escapeHtml(line.slice(3))}</h2>`;
                          }
                          if (line.startsWith("### ")) {
                            return `<h3 class="font-display text-xl font-semibold text-foreground mt-6 mb-3">${escapeHtml(line.slice(4))}</h3>`;
                          }
                          if (line.startsWith("- ")) {
                            return `<li class="text-foreground/80 ml-4">${escapeHtml(line.slice(2))}</li>`;
                          }
                          if (line.match(/^\d+\./)) {
                            return `<li class="text-foreground/80 ml-4">${escapeHtml(line.slice(line.indexOf(" ") + 1))}</li>`;
                          }
                          if (line.trim() === "") {
                            return "";
                          }
                          return `<p class="text-foreground/80">${escapeHtml(line)}</p>`;
                        })
                        .join(""),
                      {
                        ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li', 'ul', 'ol', 'strong', 'em', 'a', 'blockquote', 'code', 'pre'],
                        ALLOWED_ATTR: ['class', 'href', 'target', 'rel']
                      }
                    ),
                  }}
                />
              </article>

              {/* CTA */}
              <div className="mt-12 p-8 bg-card rounded-2xl border border-border text-center">
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                  Ready to Invest in Presales?
                </h3>
                <p className="text-foreground/70 mb-6">
                  Connect with Uzair to discuss your investment goals and discover exclusive opportunities.
                </p>
                <a
                  href="https://wa.me/17782313592?text=Hi%20Uzair%2C%20I%27m%20interested%20in%20presale%20and%20would%20like%20to%20discuss%20further..."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="hero" size="lg" className="gap-2">
                    <Phone className="h-4 w-4" />
                    Chat with Uzair
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-card">
            <div className="container-xl">
              <h2 className="font-display text-3xl font-bold text-foreground mb-8">
                Related <span className="text-gradient">Articles</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    to={`/blog/${relatedPost.slug}`}
                    className="group flex gap-6 bg-background rounded-xl p-4 border border-border hover-lift"
                  >
                    <div className="w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                      {relatedPost.image_url ? (
                        <img
                          src={relatedPost.image_url}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-2">
                        {formatDate(relatedPost.published_at)}
                      </p>
                      <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
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
