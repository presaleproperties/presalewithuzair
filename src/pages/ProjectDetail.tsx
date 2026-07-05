import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import DOMPurify from "dompurify";
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
      onClick={onClose}
    >
      <button
        className="absolute top-5 right-5 text-white/60 hover:text-white z-10 p-2.5 rounded-full bg-white/5 hover:bg-white/10 transition-all"
        onClick={onClose}
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>

      {images.length > 1 && (
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-all border border-white/10"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      <img
        src={images[index]}
        alt={`Gallery ${index + 1}`}
        className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      {images.length > 1 && (
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-all border border-white/10"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
        <span className="text-white/50 text-sm font-medium bg-white/5 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
          {index + 1} / {images.length}
        </span>
      </div>
    </div>
  );
};

/* ── Gallery with main image + thumbnail strip ── */
const ProjectGallery = ({ images, name }: { images: string[]; name: string }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const maxThumbs = 4;
  const extraCount = images.length - maxThumbs;

  return (
    <>
      <div className="space-y-2.5">
        {/* Main image */}
        <button
          onClick={() => setLightboxIndex(activeIndex)}
          className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-muted cursor-pointer focus:outline-none group shadow-lg shadow-black/10"
        >
          <img
            src={images[activeIndex]}
            alt={`${name} - ${activeIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          {/* Subtle gradient overlay for counter legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-md font-medium border border-white/10">
            {activeIndex + 1} / {images.length}
          </span>
          {/* View gallery prompt on hover */}
          <span className="absolute bottom-3 left-3 bg-white/90 text-foreground text-xs px-3 py-1.5 rounded-full font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
            View Gallery
          </span>
        </button>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {images.slice(0, maxThumbs).map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`flex-none w-[72px] h-[56px] sm:w-[88px] sm:h-[66px] rounded-xl overflow-hidden transition-all duration-200 ${
                  activeIndex === i
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-background shadow-md"
                    : "opacity-60 hover:opacity-100 hover:shadow-sm"
                }`}
              >
                <img src={img} alt={`${name} thumb ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
            {extraCount > 0 && (
              <button
                onClick={() => setLightboxIndex(maxThumbs)}
                className="flex-none w-[72px] h-[56px] sm:w-[88px] sm:h-[66px] rounded-xl overflow-hidden bg-foreground/90 flex items-center justify-center text-white font-bold text-sm hover:bg-foreground transition-colors"
              >
                +{extraCount}
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
  <div className="flex items-start gap-3 py-3 border-b border-border/50 last:border-0">
    <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0 mt-0.5">
      <Icon className="h-3.5 w-3.5 text-primary" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">{label}</p>
      <p className="text-sm font-semibold text-foreground leading-snug mt-0.5">{value}</p>
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

  const getStatusColor = () => {
    if (project.status === "active") return "bg-emerald-500/10 text-emerald-700 border-emerald-500/20";
    if (project.status === "coming_soon") return "bg-amber-500/10 text-amber-700 border-amber-500/20";
    if (project.status === "sold_out") return "bg-red-500/10 text-red-700 border-red-500/20";
    return "bg-primary/10 text-primary border-primary/20";
  };

  const citySlug = project.city?.toLowerCase().replace(/\s+/g, "-") || "";

  const allImages = [
    ...(project.featured_image ? [project.featured_image] : []),
    ...(project.gallery_images || []),
  ].filter((v, i, a) => a.indexOf(v) === i);

  const completionText =
    project.occupancy_estimate ||
    (project.completion_year
      ? `${project.completion_month ? new Date(2000, project.completion_month - 1).toLocaleString("en", { month: "long" }) + " " : ""}${project.completion_year}`
      : null);

  const hasFloorplans = project.floorplan_files && project.floorplan_files.length > 0;
  const hasBrochures = project.brochure_files && project.brochure_files.length > 0;

  const pageTitle = project.seo_title || `${project.name} | Presale ${project.project_type || "Condo"} in ${project.city || "Fraser Valley"}`;
  const pageDescription = project.seo_description || project.short_description || `${project.name} by ${project.developer_name} — presale in ${project.city || "Fraser Valley"}. Request floor plans & pricing.`;
  const pageUrl = `https://presalewithuzair.com/projects/${project.slug}`;
  const canonicalUrl = project.source_slug
    ? `https://presaleproperties.com/${project.source_slug}`
    : pageUrl;
  const pageImage = project.og_image || project.featured_image || "https://presalewithuzair.com/og-image.jpg";

  const faqItems: Array<{ question: string; answer: string }> = Array.isArray(project.faq)
    ? (project.faq as any[])
        .map((f) => ({
          question: String(f?.question ?? f?.q ?? "").trim(),
          answer: String(f?.answer ?? f?.a ?? "").trim(),
        }))
        .filter((f) => f.question && f.answer)
    : [];

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: project.name,
    description: pageDescription,
    image: pageImage,
    url: pageUrl,
    brand: project.developer_name ? { "@type": "Organization", name: project.developer_name } : undefined,
    category: project.project_type || "Presale Condo",
    ...(project.city ? { areaServed: { "@type": "Place", name: project.city } } : {}),
    ...(project.starting_price ? {
      offers: {
        "@type": "Offer",
        price: project.starting_price,
        priceCurrency: "CAD",
        url: pageUrl,
        availability: project.status === "sold_out" ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
      },
    } : {}),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://presalewithuzair.com/" },
      ...(project.city ? [{
        "@type": "ListItem",
        position: 2,
        name: project.city,
        item: `https://presalewithuzair.com/${citySlug}`,
      }] : []),
      {
        "@type": "ListItem",
        position: project.city ? 3 : 2,
        name: project.name,
        item: pageUrl,
      },
    ],
  };

  const faqJsonLd = faqItems.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="noindex,follow" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={pageImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImage} />

        <script type="application/ld+json">{JSON.stringify(productJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        {faqJsonLd && (
          <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        )}
      </Helmet>


      <Navbar />

      <main className="bg-background pt-20">
        {/* ── Breadcrumb ── */}
        <div className="container-xl px-5 sm:px-8 lg:px-16 pt-6 pb-5">
          <Link
            to={citySlug ? `/${citySlug}` : "/"}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-sm transition-colors font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            {project.city ? `${project.city} Projects` : "Back"}
          </Link>
        </div>

        {/* ── Hero: Gallery + Details side-by-side ── */}
        <section className="container-xl px-5 sm:px-8 lg:px-16 pb-8">
          <div className="grid lg:grid-cols-[1fr_420px] gap-8 lg:gap-12">
            {/* Left — Gallery */}
            <div>
              {allImages.length > 0 ? (
                <ProjectGallery images={allImages} name={project.name} />
              ) : (
                <div className="aspect-[16/10] rounded-2xl bg-gradient-to-br from-muted to-secondary flex items-center justify-center shadow-lg">
                  <Building2 className="h-16 w-16 text-muted-foreground/30" />
                </div>
              )}
            </div>

            {/* Right — Project info card */}
            <div className="lg:pt-1">
              {/* Status + Featured badges */}
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-3 py-1 text-[11px] font-bold tracking-wider uppercase rounded-full border ${getStatusColor()}`}>
                  {getStatusLabel()}
                </span>
                {project.is_featured && (
                  <span className="px-3 py-1 text-[11px] font-bold tracking-wider uppercase rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20">
                    ★ Featured
                  </span>
                )}
              </div>

              {/* Name */}
              <h1 className="font-display text-2xl md:text-[2rem] font-black text-foreground leading-tight mb-2">
                {project.name}
              </h1>

              {/* Location */}
              {(project.city || project.neighborhood) && (
                <p className="flex items-center gap-1.5 text-muted-foreground text-sm mb-5">
                  <MapPin className="h-3.5 w-3.5 text-primary/60" />
                  {[project.neighborhood, project.city].filter(Boolean).join(", ")}
                </p>
              )}

              {/* Price */}
              {project.starting_price && (
                <div className="mb-6">
                  <p className="text-xs text-muted-foreground mb-0.5">Starting From</p>
                  <p className="text-3xl font-black text-primary tracking-tight">
                    ${project.starting_price.toLocaleString()}
                  </p>
                </div>
              )}

              {/* Key details */}
              <div className="rounded-xl border border-border bg-card/50 p-4 mb-5">
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
                <p className="text-sm text-foreground/65 leading-relaxed mb-5 line-clamp-3">
                  {project.short_description}
                </p>
              )}

              {/* File download CTAs */}
              <div className="flex flex-wrap gap-2.5">
                {hasFloorplans && (
                  <a
                    href={project.floorplan_files![0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300"
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
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold border-2 border-border bg-card text-foreground hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <FileText className="h-4 w-4" />
                    Brochure
                  </a>
                )}
                {!hasFloorplans && !hasBrochures && (
                  <button
                    onClick={() => document.querySelector('#project-lead-form')?.scrollIntoView({ behavior: 'smooth' })}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <Download className="h-4 w-4" />
                    Request Floor Plans
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Quick stats bar ── */}
        {(project.strata_fees || project.incentives_available || project.project_type) && (
          <section className="border-y border-border/70 bg-gradient-to-r from-card/80 to-card/40">
            <div className="container-xl px-5 sm:px-8 lg:px-16 py-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {project.developer_name && (
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium mb-1">Developer</p>
                    <p className="text-sm font-bold text-foreground">{project.developer_name}</p>
                  </div>
                )}
                {project.strata_fees && (
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium mb-1">Strata Fees</p>
                    <p className="text-sm font-bold text-foreground">{project.strata_fees}</p>
                  </div>
                )}
                {project.project_type && (
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium mb-1">Type</p>
                    <p className="text-sm font-bold text-foreground capitalize">{project.project_type}</p>
                  </div>
                )}
              </div>

              {/* Incentives banner */}
              {project.incentives_available && project.incentives && (
                <div className="mt-5 flex items-start gap-3 px-5 py-4 rounded-xl bg-emerald-500/8 border border-emerald-500/15">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-0.5">Current Incentives</p>
                    <p className="text-sm text-emerald-800 leading-relaxed">{project.incentives}</p>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── Content + Lead Form ── */}
        <section className="container-xl px-5 sm:px-8 lg:px-16 py-12 md:py-16">
          <div className="grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-16">
            {/* Left — Content */}
            <div className="space-y-12">
              {/* Full description */}
              {project.full_description && (
                <div>
                  <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-5">About This Project</h2>
                  <div
                    className="text-foreground/70 leading-[1.8] whitespace-pre-line text-[15px]"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        project.full_description
                          .replace(/\*\*(.*?)\*\*/g, "<strong class='text-foreground font-semibold'>$1</strong>"),
                        { ALLOWED_TAGS: ['strong','em','p','br','ul','ol','li','h2','h3','h4','a','span'], ALLOWED_ATTR: ['class','href','target','rel'] }
                      )
                    }}
                  />
                </div>
              )}

              {/* Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div>
                  <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-5">Highlights</h2>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {project.highlights.map((h: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-foreground/70 text-[15px] bg-card/50 rounded-xl p-3.5 border border-border/50">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        </div>
                        <span className="leading-snug">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Amenities */}
              {project.amenities && project.amenities.length > 0 && (
                <div>
                  <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-5">Amenities</h2>
                  <div className="flex flex-wrap gap-2">
                    {project.amenities.map((a: string, i: number) => (
                      <span key={i} className="px-3.5 py-2 text-sm rounded-xl bg-card text-foreground/75 border border-border/60 font-medium">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Video */}
              {project.video_url && (
                <div>
                  <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-5">Video Tour</h2>
                  <div className="aspect-video rounded-2xl overflow-hidden shadow-lg shadow-black/10">
                    <iframe
                      src={project.video_url}
                      className="w-full h-full"
                      allowFullScreen
                      title={`${project.name} video`}
                    />
                  </div>
                </div>
              )}

              {/* FAQ */}
              {faqItems.length > 0 && (
                <div>
                  <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-5">Frequently Asked Questions</h2>
                  <div className="divide-y divide-border/60 rounded-2xl border border-border/60 bg-card/40">
                    {faqItems.map((f, i) => (
                      <details key={i} className="group p-5 open:bg-card/70 transition-colors">
                        <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                          <span className="font-display text-base md:text-lg text-foreground group-open:text-primary transition-colors">
                            {f.question}
                          </span>
                          <ChevronRight className="h-4 w-4 shrink-0 mt-1.5 text-muted-foreground transition-transform group-open:rotate-90" />
                        </summary>
                        <p className="mt-3 text-[15px] leading-relaxed text-foreground/70 whitespace-pre-line">
                          {f.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right — Sticky lead form */}
            <div id="project-lead-form" className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xl shadow-primary/5">
                {/* Premium header */}
                <div className="relative bg-primary px-6 py-6 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 blur-2xl" />
                  <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-white/5 blur-xl" />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/10">
                        <FileText className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-display font-bold text-base leading-tight">
                          Get Floor Plans & Pricing
                        </h3>
                        <p className="text-white/60 text-xs mt-0.5">
                          Floor Plans · Brochure · No obligation
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <UnifiedLeadForm
                    heading=""
                    subheading=""
                    eyebrow=""
                    buttonText="Get Floor Plans & Pricing"
                    variant="default"
                    showTrust={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Related ── */}
        <RelatedProjects city={project.city} currentSlug={project.slug} />

        {/* ── Browse marketplace ── */}
        <section className="py-12 border-t border-border/40 bg-muted/20">
          <div className="container-xl px-5 sm:px-8 lg:px-16 text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-foreground/50 mb-2">Explore more</p>
            <h3 className="font-display text-2xl md:text-3xl text-foreground mb-3">
              Browse every active presale in BC
            </h3>
            <p className="text-foreground/60 mb-6 max-w-xl mx-auto">
              See floorplans, pricing, and full project details for hundreds of presales across the Lower Mainland and Fraser Valley.
            </p>
            <a
              href={`https://presaleproperties.com/projects/${project.slug}`}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
            >
              View this project on PresaleProperties.com →
            </a>
          </div>
        </section>
      </main>

      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-20 right-6 z-40 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border text-foreground shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
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
    <section className="py-16 border-t border-border/70 bg-gradient-to-b from-background to-card/30">
      <div className="container-xl px-5 sm:px-8 lg:px-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-2">More Projects</p>
            <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">
              Also in {city || "Fraser Valley"}
            </h2>
          </div>
          <Link
            to={city ? `/${city.toLowerCase().replace(/\s+/g, "-")}` : "/"}
            className="text-sm font-semibold text-primary hover:underline hidden sm:block"
          >
            View All →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {related.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.slug}`}
              className="group rounded-2xl overflow-hidden border border-border bg-card hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="aspect-[16/10] overflow-hidden bg-muted">
                {project.featured_image ? (
                  <img
                    src={project.featured_image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-secondary">
                    <Building2 className="h-10 w-10 text-muted-foreground/30" />
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-display text-base font-bold text-foreground group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
                {project.developer_name && (
                  <p className="text-sm text-muted-foreground mt-0.5">{project.developer_name}</p>
                )}
                {project.starting_price && (
                  <p className="text-sm font-bold text-primary mt-2">
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
