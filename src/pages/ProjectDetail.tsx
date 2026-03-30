import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { usePresaleProject, usePresaleProjects } from "@/hooks/usePresaleProjects";
import { UnifiedLeadForm } from "@/components/forms/UnifiedLeadForm";
import {
  Building2,
  MapPin,
  User,
  Calendar,
  DollarSign,
  Train,
  ArrowLeft,
  ArrowUp,
  CheckCircle,
  Loader2,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: project, isLoading, error } = usePresaleProject(slug || "");
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Back to top visibility
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
          <Building2 className="h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">Project Not Found</h1>
          <p className="text-muted-foreground mb-6">This project may no longer be available.</p>
          <Link to="/" className="text-primary hover:underline font-medium">
            ← Back to Home
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const getStatusLabel = () => {
    if (project.status === "active") return "Now Selling";
    if (project.status === "coming_soon") return "Coming Soon";
    if (project.status === "sold_out") return "Sold Out";
    return project.status;
  };

  const citySlug = project.city?.toLowerCase().replace(/\s+/g, "-") || "";

  return (
    <>
      <Helmet>
        <title>{`${project.name} | Presale ${project.project_type || "Condo"} in ${project.city || "Fraser Valley"}`}</title>
        <meta
          name="description"
          content={project.short_description || `${project.name} by ${project.developer_name} — presale ${project.project_type || "condo"} in ${project.city || "Fraser Valley"}. Get VIP access & pricing.`}
        />
      </Helmet>

      <Navbar />

      <main className="bg-background">
        {/* Hero */}
        <section className="dark-section relative min-h-[50vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            {project.featured_image ? (
              <img
                src={project.featured_image}
                alt={project.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-muted to-secondary" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          </div>

          <div className="relative z-10 container-xl px-4 sm:px-6 pb-10 pt-32">
            <Link
              to={citySlug ? `/${citySlug}` : "/"}
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to {project.city || "Projects"}
            </Link>

            <div className="flex items-center gap-3 mb-3">
              <span
                className="px-3 py-1 text-xs font-bold tracking-wide uppercase rounded-sm"
                style={{
                  background: project.status === "active" ? "hsl(var(--primary) / 0.9)" : "hsl(var(--muted) / 0.9)",
                  color: project.status === "active" ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))",
                }}
              >
                {getStatusLabel()}
              </span>
              {project.near_skytrain && (
                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-white/90 bg-white/10 backdrop-blur-sm rounded-sm">
                  <Train className="h-3 w-3" /> Near SkyTrain
                </span>
              )}
            </div>

            <h1 className="font-display text-3xl md:text-5xl font-black text-white leading-tight mb-2">
              {project.name}
            </h1>
            {project.developer_name && (
              <p className="flex items-center gap-2 text-white/70 text-lg">
                <User className="h-4 w-4" />
                by {project.developer_name}
              </p>
            )}
          </div>
        </section>

        {/* Quick Stats Bar */}
        <section className="border-b border-border bg-card">
          <div className="container-xl px-4 sm:px-6 py-5">
            <div className="flex flex-wrap gap-6 md:gap-10 text-sm">
              {project.city && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{project.city}{project.neighborhood ? `, ${project.neighborhood}` : ""}</span>
                </div>
              )}
              {project.starting_price && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <span>From ${project.starting_price.toLocaleString()}</span>
                </div>
              )}
              {project.project_type && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="h-4 w-4 text-primary" />
                  <span>{project.project_type}</span>
                </div>
              )}
              {project.completion_year && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Est. {project.occupancy_estimate || project.completion_year}</span>
                </div>
              )}
              {project.deposit_percent && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-primary font-bold">{project.deposit_percent}%</span>
                  <span>Deposit</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="container-xl px-4 sm:px-6 py-12 md:py-16">
          <div className="grid lg:grid-cols-[1fr_380px] gap-12 lg:gap-16">
            {/* Left: Details */}
            <div className="space-y-10">
              {/* Description */}
              {(project.full_description || project.short_description) && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">About {project.name}</h2>
                  <div
                    className="prose prose-invert max-w-none text-foreground/80 leading-relaxed whitespace-pre-line"
                    dangerouslySetInnerHTML={{
                      __html: (project.full_description || project.short_description || "")
                        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                    }}
                  />
                </div>
              )}

              {/* Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">Key Highlights</h2>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {project.highlights.map((h: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-foreground/80">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Amenities */}
              {project.amenities && project.amenities.length > 0 && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">Amenities</h2>
                  <div className="flex flex-wrap gap-2">
                    {project.amenities.map((a: string, i: number) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 text-sm rounded-lg bg-secondary text-foreground/80 border border-border"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery */}
              {project.gallery_images && project.gallery_images.length > 0 && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {project.gallery_images.map((img: string, i: number) => (
                      <div key={i} className="rounded-xl overflow-hidden aspect-[4/3]">
                        <img
                          src={img}
                          alt={`${project.name} gallery ${i + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Video */}
              {project.video_url && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">Video Tour</h2>
                  <div className="aspect-video rounded-xl overflow-hidden">
                    <iframe
                      src={project.video_url}
                      className="w-full h-full"
                      allowFullScreen
                      title={`${project.name} video tour`}
                    />
                  </div>
                </div>
              )}

              {/* Unit Mix */}
              {project.unit_mix && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">Unit Mix</h2>
                  <p className="text-foreground/80">{project.unit_mix}</p>
                </div>
              )}
            </div>

            {/* Right: Sticky Lead Form */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
                <UnifiedLeadForm
                  heading={`Get VIP Access to ${project.name}`}
                  subheading="Get floor plans, pricing, and exclusive incentives before the public."
                  eyebrow="VIP ACCESS"
                  buttonText="Get VIP Access"
                  variant="default"
                />
              </div>
            </div>
          </div>
        </section>
        {/* Related Projects */}
        <RelatedProjects city={project.city} currentSlug={project.slug} />
      </main>

      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-20 right-6 z-40 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform duration-200"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      <Footer />
    </>
  );
};

/* ── Related Projects ── */
const RelatedProjects = ({ city, currentSlug }: { city: string | null; currentSlug: string }) => {
  const { data: projects } = usePresaleProjects(city || undefined);
  const related = (projects || []).filter((p) => p.slug !== currentSlug).slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="py-16 bg-secondary/30 border-t border-border">
      <div className="container-xl px-4 sm:px-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
          More Presales in {city || "Fraser Valley"}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {related.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.slug}`}
              className="group rounded-2xl overflow-hidden border border-border bg-card hover-lift"
            >
              <div className="aspect-[16/10] overflow-hidden bg-muted">
                {project.featured_image ? (
                  <img
                    src={project.featured_image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-secondary">
                    <Building2 className="h-12 w-12 text-muted-foreground/40" />
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
                {project.developer_name && (
                  <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" /> {project.developer_name}
                  </p>
                )}
                {project.starting_price && (
                  <p className="text-sm font-semibold text-foreground">
                    From ${project.starting_price.toLocaleString()}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectDetail;
