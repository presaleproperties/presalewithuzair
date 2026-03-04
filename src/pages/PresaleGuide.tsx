import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const PresaleGuide = () => {
  return (
    <>
      <Helmet>
        <title>Presale Guide | Uzair Muhammad</title>
        <meta name="description" content="Your complete guide to buying presale condos in Vancouver and Fraser Valley." />
      </Helmet>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl mb-6">Presale Guide</h1>
          <p className="text-muted-foreground">Coming soon.</p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PresaleGuide;
