import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const PresaleGuide = () => {
  return (
    <>
      <Helmet>
        <title>BC Presale Buyer Guide | Uzair Muhammad</title>
        <meta name="description" content="A practical guide to evaluating BC presales, including projects, deposits, purchase terms, closing costs and completion." />
      </Helmet>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-card divider-b">
          <div className="container-xl">
            <div className="max-w-3xl">
              <p className="eyebrow mb-4 animate-fade-up">Buyer Resources</p>
              <h1 className="h-display text-foreground animate-fade-up delay-100">
                Presale Guide
              </h1>
              <p className="mt-6 lede animate-fade-up delay-200">
                A practical guide to buying presale from the buyer's side.
              </p>
            </div>
          </div>
        </section>

        <section className="section-y bg-background">
          <div className="container-xl">
            <div className="max-w-3xl">
              <p className="text-foreground/70 leading-relaxed text-lg">Coming soon.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PresaleGuide;
