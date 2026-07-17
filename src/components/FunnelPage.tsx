import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Phone, Calendar, CheckCircle2 } from "lucide-react";

export interface FunnelFAQ {
  question: string;
  answer: string;
}

interface FunnelPageProps {
  path: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  intro: string; // 50-80 word quick answer
  breadcrumbName: string;
  faqs: FunnelFAQ[];
  articleDatePublished?: string; // ISO date
  /** Absolute URL for the page's OG/twitter image. Omit to auto-use /og/<slug>.png. */
  image?: string;
  children: ReactNode;
}

const SITE = "https://presalewithuzair.com";
export const DEFAULT_SOCIAL_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/5CBz3t8hJXQlE60NLFmYURMrWQu2/social-images/social-1775073854345-Screenshot_2026-03-03_at_2.54.42_PM.webp";
export const TRACK_RECORD =
  "450+ Units Sold · $200M+ in Sales Volume · 5 Years in the Presale Market · 4.9★ Google Rating · Buyer-only representation.";
const PHONE = "+1 672-258-1100";
const PHONE_HREF = "tel:+16722581100";

export const FunnelPage = ({
  path,
  title,
  description,
  h1,
  eyebrow,
  intro,
  breadcrumbName,
  faqs,
  articleDatePublished = "2026-07-09",
  image,
  children,
}: FunnelPageProps) => {
  const canonical = `${SITE}${path}`;
  const ogImage = image || `${SITE}/og${path}.png`;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: breadcrumbName, item: canonical },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: h1,
    description,
    datePublished: articleDatePublished,
    dateModified: "2026-07-09",
    author: {
      "@type": "Person",
      name: "Uzair Muhammad",
      url: `${SITE}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: "Presale With Uzair",
      url: SITE,
    },
    mainEntityOfPage: canonical,
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>

      <Navbar />

      <main>
        {/* HERO */}
        <section className="pt-28 sm:pt-32 pb-10 sm:pb-14 border-b border-border">
          <div className="container-xl px-4 sm:px-6 max-w-4xl">
            <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground mb-4">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">{breadcrumbName}</span>
            </nav>
            <p className="section-label mb-3">{eyebrow}</p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground uppercase tracking-tight leading-tight">
              {h1}
            </h1>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
              {intro}
            </p>
            <p className="mt-4 text-xs sm:text-sm text-foreground/80 font-medium">
              {TRACK_RECORD}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/call"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
              >
                <Calendar className="h-4 w-4" />
                Book a free strategy call
              </Link>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-5 py-2.5 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition"
              >
                <Phone className="h-4 w-4" />
                {PHONE}
              </a>
            </div>
          </div>
        </section>

        {/* PAGE CONTENT */}
        <section className="section-y-sm">
          <div className="container-xl px-4 sm:px-6 max-w-4xl">
            <article className="prose-uzair space-y-10 text-foreground">
              {children}
            </article>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-y-sm bg-muted/20 border-t border-border">
          <div className="container-xl px-4 sm:px-6 max-w-4xl">
            <p className="section-label mb-3">FAQ</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground uppercase tracking-tight">
              Frequently Asked Questions
            </h2>
            <div className="mt-8 space-y-6">
              {faqs.map((f) => (
                <div key={f.question} className="rounded-2xl border border-border bg-background p-5 sm:p-6">
                  <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground">
                    {f.question}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {f.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-y-sm bg-foreground text-background">
          <div className="container-xl px-4 sm:px-6 max-w-3xl text-center">
            <p className="section-label mb-3 !text-primary">Next Step</p>
            <h2 className="font-display text-2xl sm:text-4xl font-bold uppercase tracking-tight">
              Talk to Uzair before you talk to any developer.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-background/70 leading-relaxed">
              Buyer-only, no developer bias — my fee comes from the developer's marketing budget. I'll review the project,
              the contract, and the deposit structure before you sign anything.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-xs sm:text-sm text-background/70">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              {TRACK_RECORD}
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/call"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
              >
                <Calendar className="h-4 w-4" />
                Book a free strategy call
              </Link>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 rounded-full border border-background/30 px-6 py-3 text-sm font-semibold text-background hover:border-primary hover:text-primary transition"
              >
                <Phone className="h-4 w-4" />
                {PHONE}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

/** Small helper — internal-link cluster block used inside funnel page bodies. */
export const RelatedLinks = ({
  links,
}: {
  links: { to: string; label: string }[];
}) => (
  <div className="rounded-2xl border border-border bg-muted/20 p-5 sm:p-6 not-prose">
    <p className="section-label mb-3">Keep Reading</p>
    <ul className="grid sm:grid-cols-2 gap-2">
      {links.map((l) => (
        <li key={l.to}>
          <Link
            to={l.to}
            className="text-sm sm:text-base text-foreground hover:text-primary font-medium underline-offset-4 hover:underline"
          >
            → {l.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
