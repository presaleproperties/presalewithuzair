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
      <main className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl mb-6">Presale Guide</h1>
          <p className="text-muted-foreground">A practical guide to buying presale from the buyer's side.</p>
          <p className="text-muted-foreground mt-2">Coming soon.</p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PresaleGuide;
