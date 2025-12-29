import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blogPosts";

export const BlogPreviewSection = () => {
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container-xl px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-10 sm:mb-16">
          <div>
            <p className="section-label mb-3 sm:mb-4">Blogs</p>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              More On <span className="text-gradient">Presales</span>
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-foreground/70 max-w-xl">
              Our blog features insights from our team of Vancouver-based real estate consultants, 
              focusing on presale investments and other related topics.
            </p>
          </div>
          <Button variant="outline" size="lg" className="mt-5 lg:mt-0 gap-2 w-full sm:w-auto h-11 sm:h-12" asChild>
            <Link to="/blog">
              View All Posts
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {latestPosts.map((post, index) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group bg-card rounded-xl sm:rounded-2xl overflow-hidden border border-border hover-lift"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="aspect-[16/10] image-reveal">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                  <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  {post.date}
                </div>
                <h3 className="font-display text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-foreground/70 line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
