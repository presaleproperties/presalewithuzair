import { useState, useEffect } from "react";
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
  MapPin,
  Calendar,
  Home,
  DollarSign,
  Download,
  FileText,
  Sparkles,
  X,
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
      <button
        className="absolute top-5 right-5 text-white/70 hover:text-white z-10 p-2"
        onClick={onClose}
        aria-label="Close"
      >
        <X className="h-6 w-6" />
      </button>

      {images.length > 1 && (
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      <img
        src={images[index]}
        alt={`Gallery ${index + 1}`}
        className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />

      {images.length > 1 && (
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}

      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/60 text-sm">
        {index + 1} / {images.length}
      </p>
    </div>
  );
};

/* ── Gallery with main image + thumbnail strip (presaleproperties-style) ── */
const ProjectGallery = ({ images, name }: { images: string[]; name: string }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const maxThumbs = 4;
  const extraCount = images.length - maxThumbs;

  return (
    <>
      <div className="space-y-3">
        {/* Main image */}
        <button
          onClick={() => setLightboxIndex(activeIndex)}
          className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-muted cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary group"
        >
          <img
            src={images[activeIndex]}
            alt={`${name} - ${activeIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-md backdrop-blur-sm">
            {activeIndex + 1}/{images.length}
          </span>
        </button>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {images.slice(0, maxThumbs).map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`flex-none w-20 h-16 sm:w-24 sm:h-[72px] rounded-lg overflow-hidden border-2 transition-all ${
                  activeIndex === i ? "border-primary ring-1 ring-primary/30" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img src={img} alt={`${name} thumb ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
            {extraCount > 0 && (
              <button
                onClick={() => setLightboxIndex(maxThumbs)}
                className="flex-none w-20 h-16 sm:w-24 sm:h-[72px] rounded-lg overflow-hidden bg-black/70 flex items-center justify-center text-white font-bold text-sm hover:bg-black/80 transition-colors"
              >
                +{extraCount} more
              </button>
            )}
          </div>
        )}
      </div>

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

/* ── Detail row ── */
const DetailRow = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="flex items-start gap-3 py-2.5">
    <Icon className="h-4 w-4 text-primary/70 mt-0.5 shrink-0" />
    <div className="flex-1 min-w-0">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-foreground leading-snug">{value}</p>
    </div>
  </div>
);

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
          <Link to="/" className="text-primary hover:underline font-medium">← Back to Home</Link>
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

  const allImages = [
    ...(project.featured_image ? [project.featured_image] : []),
    ...(project.gallery_images || []),
  ].filter((v, i, a) => a.indexOf(v) === i); // dedupe

  const completionText =
    project.occupancy_estimate ||
    (project.completion_year
      ? `${project.completion_month ? new Date(2000, project.completion_month - 1).toLocaleString("en", { month: "long" }) + " " : ""}${project.completion_year}`
      : null);

  const hasFloorplans = project.floorplan_files && project.floorplan_files.length > 0;
  const hasBrochures = project.brochure_files && project.brochure_files.length > 0;

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
        {/* ── Breadcrumb ── */}
        <div className="container-xl px-5 sm:px-8 lg:px-16 pt-6 pb-4">
          <Link
            to={citySlug ? `/${citySlug}` : "/"}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {project.city ? `${project.city} Projects` : "Back"}
          </Link>
        </div>

        {/* ── Hero: Gallery + Details side-by-side ── */}
        <section className="container-xl px-5 sm:px-8 lg:px-16 pb-10">
          <div className="grid lg:grid-cols-[1fr_400px] gap-8 lg:gap-10">
            {/* Left — Gallery */}
            <div>
              {allImages.length > 0 ? (
                <ProjectGallery images={allImages} name={project.name} />
              ) : (
                <div className="aspect-[16/10] rounded-xl bg-gradient-to-br from-muted to-secondary flex items-center justify-center">
                  <Building2 className="h-16 w-16 text-muted-foreground/30" />
                </div>
              )}
            </div>

            {/* Right — Project info */}
            <div>
              {/* Status badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-1 text-xs font-bold tracking-wider uppercase bg-primary/10 text-primary rounded-md">
                  {getStatusLabel()}
                </span>
                {project.is_featured && (
                  <span className="px-2.5 py-1 text-xs font-bold tracking-wider uppercase bg-amber-500/10 text-amber-600 rounded-md">
                    ★ Featured
                  </span>
                )}
              </div>

              {/* Name */}
              <h1 className="font-display text-2xl md:text-3xl font-black text-foreground leading-tight mb-1">
                {project.name}
              </h1>

              {/* Location */}
              {(project.city || project.neighborhood) && (
                <p className="flex items-center gap-1.5 text-muted-foreground text-sm mb-4">
                  <MapPin className="h-3.5 w-3.5" />
                  {[project.neighborhood, project.city].filter(Boolean).join(", ")}
                </p>
              )}

              {/* Price */}
              {project.starting_price && (
                <p className="text-2xl font-black text-primary mb-5">
                  <span className="text-sm font-normal text-muted-foreground mr-1">From</span>
                  ${project.starting_price.toLocaleString()}
                </p>
              )}

              {/* Key details */}
              <div className="border-t border-border pt-3 space-y-0.5">
                {project.developer_name && (
                  <DetailRow icon={Building2} label="Developer" value={project.developer_name} />
                )}
                {completionText && (
                  <DetailRow icon={Calendar} label="Est. Completion" value={completionText} />
                )}
                {project.unit_mix && (
                  <DetailRow icon={Home} label="Units" value={project.unit_mix} />
                )}
                {project.deposit_percent && (
                  <DetailRow
                    icon={DollarSign}
                    label="Deposit"
                    value={project.deposit_structure || `${project.deposit_percent}%`}
                  />
                )}
              </div>

              {/* Short description */}
              {project.short_description && (
                <p className="text-sm text-foreground/70 leading-relaxed mt-4 line-clamp-4">
                  {project.short_description}
                </p>
              )}

              {/* File download CTAs */}
              {(hasFloorplans || hasBrochures) && (
                <div className="flex flex-wrap gap-2 mt-5">
                  {hasFloorplans && (
                    <a
                      href={project.floorplan_files![0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:-translate-y-0.5 transition-all"
                    >
                      <Download className="h-4 w-4" />
                      Floor Plans
                    </a>
                  )}
                  {hasBrochures && (
                    <a
                      href={project.brochure_files![0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border border-border bg-card text-foreground hover:-translate-y-0.5 hover:border-primary/30 transition-all"
                    >
                      <FileText className="h-4 w-4" />
                      Brochure
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Quick stats bar ── */}
        {(project.strata_fees || project.incentives_available) && (
          <section className="border-y border-border bg-card/50">
            <div className="container-xl px-5 sm:px-8 lg:px-16 py-5">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {project.developer_name && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-0.5">Developer</p>
                    <p className="text-sm font-semibold text-foreground">{project.developer_name}</p>
                  </div>
                )}
                {project.strata_fees && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-0.5">Strata Fees</p>
                    <p className="text-sm font-semibold text-foreground">{project.strata_fees}</p>
                  </div>
                )}
                {project.project_type && (
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-0.5">Type</p>
                    <p className="text-sm font-semibold text-foreground capitalize">{project.project_type}</p>
                  </div>
                )}
              </div>

              {/* Incentives banner */}
              {project.incentives_available && project.incentives && (
                <div className="mt-4 flex items-start gap-3 px-4 py-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <Sparkles className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-green-700 mb-0.5">Current Incentives</p>
                    <p className="text-sm text-green-800 leading-relaxed">{project.incentives}</p>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── Content + Lead Form ── */}
        <section className="container-xl px-5 sm:px-8 lg:px-16 py-10 md:py-14">
          <div className="grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-14">
            {/* Left — Content */}
            <div className="space-y-10">
              {/* Full description */}
              {project.full_description && (
                <div>
                  <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-4">About This Project</h2>
                  <div
                    className="text-foreground/75 leading-relaxed whitespace-pre-line text-[15px]"
                    dangerouslySetInnerHTML={{
                      __html: project.full_description
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

            {/* Right — Sticky lead form */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                {/* Dark header */}
                <div className="bg-foreground/95 px-5 py-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Download className="h-4 w-4 text-primary" />
                    <h3 className="text-white font-display font-bold text-base">
                      Instant Access to Floor Plans & Pricing
                    </h3>
                  </div>
                  <p className="text-white/50 text-xs">
                    Floor Plans · Brochure · No obligation
                  </p>
                </div>

                <div className="p-5">
                  <UnifiedLeadForm
                    heading=""
                    subheading=""
                    eyebrow=""
                    buttonText="Get Floor Plans"
                    variant="default"
                    showTrust={false}
                  />
                </div>
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
