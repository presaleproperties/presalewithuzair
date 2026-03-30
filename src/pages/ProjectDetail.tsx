import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { usePresaleProject, usePresaleProjects } from "@/hooks/usePresaleProjects";
import { UnifiedLeadForm } from "@/components/forms/UnifiedLeadForm";
import {
  Building2,
  ArrowLeft,
  ArrowUp,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* ── Lightbox ── */
const Lightbox = ({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-5 right-5 text-white/70 hover:text-white text-3xl font-light z-10"
        onClick={onClose}
        aria-label="Close"
      >
        ✕
      </button>

      {/* Prev */}
      {images.length > 1 && (
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      {/* Image */}
      <img
        src={images[index]}
        alt={`Gallery ${index + 1}`}
        className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Next */}
      {images.length > 1 && (
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}

      {/* Counter */}
      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/60 text-sm">
        {index + 1} / {images.length}
      </p>
    </div>
  );
};

/* ── Horizontal scrollable gallery ── */
const ScrollGallery = ({ images, name }: { images: string[]; name: string }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.7;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <>
      <div className="relative group">
        {/* Scroll buttons */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 border border-border text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 border border-border text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setLightboxIndex(i)}
              className="flex-none w-[280px] sm:w-[340px] md:w-[400px] snap-start rounded-xl overflow-hidden aspect-[4/3] cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <img
                src={img}
                alt={`${name} ${i + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((lightboxIndex - 1 + images.length) % images.length)}
          onNext={() => setLightboxIndex((lightboxIndex + 1) % images.length)}
        />
      )}
    </>
  );
};

/* ── Main Page ── */
const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: project, isLoading, error } = usePresaleProject(slug || "");
  const [showBackToTop, setShowBackToTop] = useState(false);

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

  // Collect key details into a clean list
  const details: { label: string; value: string }[] = [];
  if (project.city) details.push({ label: "Location", value: `${project.city}${project.neighborhood ? `, ${project.neighborhood}` : ""}` });
  if (project.starting_price) details.push({ label: "Starting From", value: `$${project.starting_price.toLocaleString()}` });
  if (project.project_type) details.push({ label: "Type", value: project.project_type });
  if (project.developer_name) details.push({ label: "Developer", value: project.developer_name });
  if (project.completion_year) details.push({ label: "Est. Completion", value: project.occupancy_estimate || String(project.completion_year) });
  if (project.deposit_percent) details.push({ label: "Deposit", value: `${project.deposit_percent}%` });
  if (project.unit_mix) details.push({ label: "Unit Mix", value: project.unit_mix });

  return (
    <>
      <Helmet>
        <title>{`${project.name} | Presale ${project.project_type || "Condo"} in ${project.city || "Fraser Valley"}`}</title>
        <meta
          name="description"
          content={project.short_description || `${project.name} by ${project.developer_name} — presale in ${project.city || "Fraser Valley"}. Request floor plans & pricing.`}
        />
      </Helmet>

      <Navbar />

      <main className="bg-background">
        {/* ── Hero ── */}
        <section className="dark-section relative min-h-[45vh] md:min-h-[50vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            {project.featured_image ? (
              <img src={project.featured_image} alt={project.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-muted to-secondary" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          </div>

          <div className="relative z-10 w-full px-5 sm:px-8 lg:px-16 pb-10 pt-28">
            <Link
              to={citySlug ? `/${citySlug}` : "/"}
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-5 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {project.city || "Back"}
            </Link>

            <span className="block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-3">
              {getStatusLabel()}
            </span>

            <h1 className="font-display text-3xl md:text-5xl font-black text-white leading-tight mb-1">
              {project.name}
            </h1>
            {project.developer_name && (
              <p className="text-white/60 text-base md:text-lg">
                by {project.developer_name}
              </p>
            )}
          </div>
        </section>

        {/* ── Details + CTA ── */}
        <section className="container-xl px-5 sm:px-8 lg:px-16 py-10 md:py-14">
          <div className="grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-14">
            {/* Left column */}
            <div className="space-y-10">
              {/* Quick details table */}
              {details.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-5">
                  {details.map((d) => (
                    <div key={d.label}>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{d.label}</p>
                      <p className="text-sm font-semibold text-foreground">{d.value}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Divider */}
              <div className="h-px bg-border" />

              {/* Description */}
              {(project.full_description || project.short_description) && (
                <div>
                  <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-4">About This Project</h2>
                  <div
                    className="text-foreground/75 leading-relaxed whitespace-pre-line text-[15px]"
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
                  <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-4">Highlights</h2>
                  <ul className="grid sm:grid-cols-2 gap-2.5">
                    {project.highlights.map((h: string, i: number) => (
                      <li key={i} className="flex items-start gap-2.5 text-foreground/75 text-[15px]">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Amenities */}
              {project.amenities && project.amenities.length > 0 && (
                <div>
                  <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-4">Amenities</h2>
                  <div className="flex flex-wrap gap-2">
                    {project.amenities.map((a: string, i: number) => (
                      <span key={i} className="px-3 py-1.5 text-sm rounded-full bg-secondary/60 text-foreground/75 border border-border/50">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery — horizontal scroll */}
              {project.gallery_images && project.gallery_images.length > 0 && (
                <div>
                  <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-4">Gallery</h2>
                  <ScrollGallery images={project.gallery_images} name={project.name} />
                </div>
              )}

              {/* Video */}
              {project.video_url && (
                <div>
                  <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-4">Video Tour</h2>
                  <div className="aspect-video rounded-xl overflow-hidden">
                    <iframe
                      src={project.video_url}
                      className="w-full h-full"
                      allowFullScreen
                      title={`${project.name} video`}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right column — sticky CTA */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-border bg-card p-6">
                <UnifiedLeadForm
                  heading="Request Floor Plans & Info"
                  subheading={`Get the full information package for ${project.name} — floor plans, pricing, deposit structure & incentives.`}
                  eyebrow=""
                  buttonText="Request Info Package"
                  variant="default"
                  showTrust={false}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Related ── */}
        <RelatedProjects city={project.city} currentSlug={project.slug} />
      </main>

      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-20 right-6 z-40 p-3 rounded-full bg-foreground/10 backdrop-blur-sm border border-border text-foreground hover:bg-foreground/20 transition-colors"
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
    <section className="py-14 border-t border-border">
      <div className="container-xl px-5 sm:px-8 lg:px-16">
        <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-6">
          More in {city || "Fraser Valley"}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {related.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.slug}`}
              className="group rounded-xl overflow-hidden border border-border bg-card"
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
                    <Building2 className="h-10 w-10 text-muted-foreground/30" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-display text-base font-bold text-foreground group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
                {project.developer_name && (
                  <p className="text-sm text-muted-foreground mt-0.5">{project.developer_name}</p>
                )}
                {project.starting_price && (
                  <p className="text-sm font-semibold text-foreground mt-1">
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
