import { Helmet } from "react-helmet-async";
import { useParams, Link, Navigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, Phone } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <Helmet>
        <title>{post.title} | Uzair Muhammad</title>
        <meta name="description" content={post.excerpt} />
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
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                  {post.category}
                </span>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                </div>
              </div>
              <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground">
                {post.title}
              </h1>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="py-8 bg-card">
          <div className="container-xl">
            <div className="max-w-4xl mx-auto">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-background">
          <div className="container-xl">
            <div className="max-w-3xl mx-auto">
              <article className="prose prose-lg prose-invert max-w-none">
                <div
                  className="text-foreground/90 leading-relaxed space-y-6"
                  dangerouslySetInnerHTML={{
                    __html: post.content
                      .split("\n")
                      .map((line) => {
                        if (line.startsWith("# ")) {
                          return `<h1 class="font-display text-4xl font-bold text-foreground mt-8 mb-6">${line.slice(2)}</h1>`;
                        }
                        if (line.startsWith("## ")) {
                          return `<h2 class="font-display text-2xl font-bold text-foreground mt-8 mb-4">${line.slice(3)}</h2>`;
                        }
                        if (line.startsWith("### ")) {
                          return `<h3 class="font-display text-xl font-semibold text-foreground mt-6 mb-3">${line.slice(4)}</h3>`;
                        }
                        if (line.startsWith("- ")) {
                          return `<li class="text-foreground/80 ml-4">${line.slice(2)}</li>`;
                        }
                        if (line.match(/^\d+\./)) {
                          return `<li class="text-foreground/80 ml-4">${line.slice(line.indexOf(" ") + 1)}</li>`;
                        }
                        if (line.trim() === "") {
                          return "";
                        }
                        return `<p class="text-foreground/80">${line}</p>`;
                      })
                      .join(""),
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
                    <div className="w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-2">{relatedPost.date}</p>
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
