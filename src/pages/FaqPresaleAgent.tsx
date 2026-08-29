import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { agentRef, authorRef, SITE_URL } from "@/lib/structuredData";
import {
  FAQ_PRESALE_AGENT,
  FAQ_PRESALE_AGENT_DESCRIPTION,
  FAQ_PRESALE_AGENT_H1,
  FAQ_PRESALE_AGENT_INTRO,
  FAQ_PRESALE_AGENT_PATH,
  FAQ_PRESALE_AGENT_TITLE,
  FAQ_CTA_URL,
  faqPlainText,
  faqSegments,
} from "@/data/faqPresaleAgent";

const CANONICAL = `${SITE_URL}${FAQ_PRESALE_AGENT_PATH}/`;

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_PRESALE_AGENT.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: faqPlainText(f.answer) },
  })),
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Presale Agent FAQ", item: CANONICAL },
  ],
};

const pageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": CANONICAL,
  url: CANONICAL,
  name: FAQ_PRESALE_AGENT_H1,
  description: FAQ_PRESALE_AGENT_DESCRIPTION,
  author: authorRef,
  publisher: agentRef,
};

const FaqPresaleAgent = () => (
  <div className="min-h-screen bg-background">
    <Helmet>
      <title>{FAQ_PRESALE_AGENT_TITLE}</title>
      <meta name="description" content={FAQ_PRESALE_AGENT_DESCRIPTION} />
      <link rel="canonical" href={CANONICAL} />
      <meta property="og:title" content={FAQ_PRESALE_AGENT_TITLE} />
      <meta property="og:description" content={FAQ_PRESALE_AGENT_DESCRIPTION} />
      <meta property="og:url" content={CANONICAL} />
      <meta property="og:type" content="website" />
      <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      <script type="application/ld+json">{JSON.stringify(pageLd)}</script>
    </Helmet>

    <Navbar />

    <main className="pt-28 md:pt-36 pb-20">
      <div className="container-xl px-5 sm:px-8 lg:px-16">
        <div className="max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs tracking-[0.15em] uppercase text-foreground/50">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground/70">Presale Agent FAQ</span>
          </nav>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
            {FAQ_PRESALE_AGENT_H1}
          </h1>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-foreground/70">
            {FAQ_PRESALE_AGENT_INTRO}
          </p>
        </div>

        <div className="mt-14 max-w-3xl space-y-12">
          {FAQ_PRESALE_AGENT.map((f, i) => (
            <section key={f.question} id={`q${i + 1}`}>
              <h2 className="font-display text-xl sm:text-2xl font-bold leading-snug text-foreground">
                {f.question}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-foreground/75">
                {faqSegments(f.answer).map((s, k) =>
                  s.href ? (
                    <Link
                      key={k}
                      to={s.href}
                      className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
                    >
                      {s.text}
                    </Link>
                  ) : (
                    <span key={k}>{s.text}</span>
                  ),
                )}
              </p>
              <p className="mt-4">
                <a
                  href={FAQ_CTA_URL}
                  className="inline-flex min-h-[44px] items-center text-sm font-semibold text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
                >
                  {f.cta}
                </a>
              </p>
            </section>
          ))}
        </div>
      </div>
    </main>

    <Footer />
  </div>
);

export default FaqPresaleAgent;
