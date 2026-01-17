import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Calendar, ArrowRight, Loader2 } from "lucide-react";
import { useBlogPosts } from "@/hooks/useBlogPosts";

const Blog = () => {
  const { data: posts, isLoading, error } = useBlogPosts();

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Presale With Uzair Blog",
    "description": "Expert insights on presale condos, assignments, and real estate investment in Vancouver and Fraser Valley.",
    "url": "https://presalewithuzair.com/blog",
    "author": {
      "@type": "Person",
      "name": "Uzair Muhammad",
      "url": "https://presalewithuzair.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Presale With Uzair",
      "url": "https://presalewithuzair.com"
    }
  };

  return (
    <>
      <Helmet>
        <title>Presale Blog Vancouver | Condo Investment Tips & Insights | Uzair Muhammad</title>
        <meta
          name="description"
          content="Expert insights on Vancouver presale condos, investment strategies, assignment sales, and real estate tips from Uzair Muhammad, Vancouver's top presale expert."
        />
        <meta name="keywords" content="presale blog Vancouver, condo investment tips, presale condo advice, Vancouver real estate blog, assignment sale guide" />
        <link rel="canonical" href="https://presalewithuzair.com/blog" />
        
        {/* Open Graph */}
        <meta property="og:type" content="blog" />
        <meta property="og:url" content="https://presalewithuzair.com/blog" />
        <meta property="og:title" content="Presale Blog | Investment Tips & Insights" />
        <meta property="og:description" content="Expert insights on Vancouver presale condos and investment strategies." />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Presale Blog | Uzair Muhammad" />
        
        <script type="application/ld+json">
          {JSON.stringify(blogStructuredData)}
        </script>
      </Helmet>

      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-card">
          <div className="container-xl">
            <div className="max-w-3xl">
              <p className="section-label mb-4 animate-fade-up">Presale Blogs</p>
              <h1 className="font-display text-5xl lg:text-6xl font-bold text-foreground animate-fade-up delay-100">
                Learn More About <span className="text-gradient">Presales</span>
              </h1>
              <p className="mt-6 text-xl text-foreground/80 animate-fade-up delay-200">
                Our blog features insights from our team of Vancouver-based real estate consultants, 
                focusing on presale investments and other related topics.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-24 bg-background">
          <div className="container-xl">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Failed to load blog posts.</p>
              </div>
            ) : !posts || posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                  <Link
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    className="group bg-card rounded-2xl overflow-hidden border border-border hover-lift animate-fade-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Image */}
                    <div className="aspect-[16/10] image-reveal bg-muted">
                      {post.image_url ? (
                        <img
                          src={post.image_url}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          No image
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-3">
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
                      <h2 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-3">
                        {post.title}
                      </h2>
                      <p className="text-sm text-foreground/70 line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                        Read more
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
