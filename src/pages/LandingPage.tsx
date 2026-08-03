import { useState, useEffect } from "react";
import { UnifiedLeadForm } from "@/components/forms/UnifiedLeadForm";
import { staticReviews } from "@/data/googleReviews";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, TrendingUp, Users, Star, Phone, CheckCircle, X, ChevronDown, Home, BadgeDollarSign, FileSearch, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";

import logoImage from "@/assets/logo.png";
import headshotImage from "@/assets/uzair-headshot.jpeg";

const LandingPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [ctaVariant] = useState<'A' | 'B'>(() => Math.random() < 0.5 ? 'A' : 'B');
  const ctaText = ctaVariant === 'A' ? 'Talk To Uzair' : 'Book Your Free Call';

  // Lock body scroll when form is open
  useEffect(() => {
    if (isFormOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFormOpen]);
  const testimonials = staticReviews.map((r) => ({
    name: r.name,
    text: r.quote,
    rating: r.rating ?? 5,
    photo: r.photo,
    timeAgo: r.timeAgo,
  }));
  const visibleTestimonials = showAllReviews ? testimonials : testimonials.slice(0, 6);
  return <>
      <Helmet>
        <title>Book A Call With Uzair | BC's Presale Expert</title>
        <meta name="description" content="Book a call with Uzair, BC's trusted presale expert. Get guidance on Vancouver presale condos and townhomes." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://presalewithuzair.com/call" />
      </Helmet>

      <div className="dark-section min-h-screen bg-background text-foreground pb-32">

        {/* Minimal Header */}
        <header className="py-4 px-4 border-b border-border/70">
          <div className="max-w-6xl mx-auto flex justify-start">
            <img src={logoImage} alt="Uzair Presales" className="h-8" />
          </div>
        </header>

        {/* Hero */}
        <section className="px-4 pt-10 pb-12 md:pt-16 md:pb-20">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-start gap-6 md:gap-10">
              {/* Headshot */}
              <motion.img src={headshotImage} alt="Uzair" initial={{
              opacity: 0,
              scale: 0.9
            }} animate={{
              opacity: 1,
              scale: 1
            }} className="w-28 h-28 md:w-36 md:h-36 rounded-sm object-cover flex-shrink-0" />

              <div className="text-left">
                <motion.div initial={{
                opacity: 0,
                y: -10
              }} animate={{
                opacity: 1,
                y: 0
              }} className="mb-3">
                  <span className="inline-flex items-center gap-1.5 text-foreground/55 text-xs font-semibold tracking-[0.18em] uppercase">
                    Fraser Valley Buyer-Only Presale Specialist
                  </span>

                </motion.div>

                <motion.h1 initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.5
               }} className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight mb-3">
                  Work With <span className="text-foreground/65">Uzair.</span>
                </motion.h1>

                <motion.p initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} transition={{
                delay: 0.1
              }} className="text-base md:text-lg text-foreground/75 mb-5 max-w-lg">Trusted guidance for New Condo & Townhome buyers across Metro Vancouver. No fluff — just honest, expert advice.</motion.p>

                <motion.div initial={{
                opacity: 0,
                y: 10
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.2
              }} className="flex flex-wrap justify-start gap-2 text-foreground/60 text-xs">
                  <span className="bg-card px-3 py-1.5 rounded-sm border border-border/70">✓ 450+ Families Helped</span>
                  
                  <span className="bg-card px-3 py-1.5 rounded-sm border border-border/70">✓ No Pressure, Just Guidance</span>
                  <span className="bg-card px-3 py-1.5 rounded-sm border border-border/70">English · Punjabi · Urdu · Hindi</span>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="px-4 section-y-sm border-t border-border/70">
          <div className="max-w-5xl mx-auto">
            <div className="text-left mb-8">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                What Our Clients Say
              </h2>
              <div className="flex items-center justify-start gap-2">
                <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google" className="h-4" />
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <span className="text-foreground/60 text-xs">4.9 rating</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleTestimonials.map((t, i) => <motion.div key={t.name} initial={{
              opacity: 0,
              y: 15
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: i * 0.05
            }} className="bg-card rounded-sm p-5 border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-0.5">
                      {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <span className={`px-2 py-0.5 rounded-sm text-[10px] font-semibold ${clientTypeColors[t.clientType]}`}>
                      {t.clientType}
                    </span>
                  </div>
                  <p className="text-foreground/75 text-sm mb-3">"{t.text}"</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={t.photo} alt={t.name} className="w-8 h-8 rounded-full object-cover border border-primary/30" />
                      <span className="text-foreground font-medium text-sm">{t.name}</span>
                    </div>
                    <span className="text-foreground/45 text-xs">{t.timeAgo}</span>
                  </div>
                </motion.div>)}
            </div>

            {!showAllReviews && <div className="text-left mt-6">
                <button onClick={() => setShowAllReviews(true)} className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 font-medium text-sm transition-colors">
                  See More Reviews <ChevronDown className="w-4 h-4" />
                </button>
              </div>}

            {showAllReviews && <div className="text-left mt-6">
                <a href="https://share.google/qgUTcQF2kOnjBBPr7" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 font-medium text-sm transition-colors">
                  Read All Reviews on Google →
                </a>
              </div>}
          </div>
        </section>

        {/* Why Buyers Work With Uzair */}
        <section className="px-4 section-y-sm bg-secondary/40 border-y border-border/70">
          <div className="max-w-4xl mx-auto">
            <p className="text-primary text-xs font-semibold tracking-wider uppercase text-left mb-2">For First-Time Buyers & Investors</p>
             <h2 className="font-display text-2xl md:text-3xl font-bold text-left text-foreground mb-3">
              Why Buyers Work With Uzair?
            </h2>
            <p className="text-foreground/60 text-sm text-left max-w-xl mb-10">
              Buying a new condo or townhome is a big decision. Here's how Uzair makes it easier.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {[{
              icon: FileSearch,
              title: "Every Contract, Reviewed",
              desc: "Presale contracts are complex. Uzair breaks down every clause so you know exactly what you're signing — no surprises at completion."
            }, {
              icon: Home,
              title: "Early Access to Best Units",
              desc: "Get priority access to new condo & townhome launches before they go public. The best floorplans and pricing go first."
            }, {
              icon: BadgeDollarSign,
              title: "Protect Your Investment",
              desc: "Not every presale is worth buying. Uzair evaluates the developer, location, and pricing — and will tell you when to walk away."
            }, {
              icon: Handshake,
              title: "With You From Start to Finish",
              desc: "From choosing the right project to completion day — Uzair guides you through deposits, milestones, inspections, and beyond."
            }].map((b, i) => <motion.div key={b.title} initial={{
              opacity: 0,
              y: 15
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: i * 0.08
            }} className="bg-card rounded-sm p-6 border border-border flex gap-4">
                  <div className="w-11 h-11 bg-primary/15 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                    <b.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-1.5">{b.title}</h3>
                    <p className="text-foreground/60 text-sm leading-relaxed">{b.desc}</p>
                  </div>
                </motion.div>)}
            </div>
          </div>
        </section>

        {/* Footer text */}
        <footer className="py-6 px-4 bg-background border-t border-border/70 text-left">
          <p className="text-foreground/45 text-sm">
            © {new Date().getFullYear()} Uzair Presales • Vancouver's Presale Expert
          </p>
        </footer>
      </div>

      {/* Sticky Footer CTA */}
      <div className="dark-section fixed bottom-0 left-0 right-0 z-40 bg-background backdrop-blur-md border-t border-border px-4 pt-3 pb-3" style={{
      paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))'
    }}>
        <div className="max-w-md mx-auto">
          <button onClick={() => {
          setIsFormOpen(true);
          setIsSubmitted(false);
        }} className="w-full group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-4 rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 font-bold inline-flex items-center justify-center gap-2.5">
            <span className="absolute inset-0 bg-foreground/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-sm" />
            <Phone className="w-5 h-5 relative z-10" />
            <span className="relative z-10">{ctaText}</span>
          </button>
          <p className="text-center text-foreground/60 text-xs mt-1.5">Same day call back</p>
        </div>
      </div>

      {/* Bottom Sheet Form Overlay */}
      <AnimatePresence>
        {isFormOpen && <>
            {/* Backdrop */}
            <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} onClick={() => setIsFormOpen(false)} className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm" />

            {/* Sheet */}
            <motion.div initial={{
          y: "100%"
        }} animate={{
          y: 0
        }} exit={{
          y: "100%"
        }} transition={{
          type: "spring",
          damping: 30,
          stiffness: 300
        }} className="dark-section fixed bottom-0 left-0 right-0 z-50 bg-background text-foreground border-t border-border rounded-t-sm max-h-[90dvh] overflow-y-auto">
              {/* Drag handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-foreground/20" />
              </div>

              {/* Close button */}
              <button onClick={() => setIsFormOpen(false)} className="absolute top-4 right-4 text-foreground/60 hover:text-foreground transition-colors p-1" aria-label="Close form">
                <X className="w-6 h-6" />
              </button>

              <div className="px-5 pb-8 pt-2 max-w-md mx-auto">
                {isSubmitted ? <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-primary" />
                    </div>
                     <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                      You're In.
                    </h3>
                    <p className="text-foreground/75 mb-2">Uzair will call you at your preferred time.</p>
                    <p className="text-foreground/60 text-sm mb-6">Check your email for confirmation.</p>
                    <a href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm transition-colors">
                      Visit Our Website →
                    </a>
                  </div> : <div>
                    <div className="text-center mb-4">
                       <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">
                        Request A <span className="text-primary">Call</span>
                      </h2>
                      <p className="text-foreground/60 text-xs mt-1">Same day call back.</p>
                    </div>
                    <UnifiedLeadForm
                      variant="dark"
                      eyebrow=""
                      heading=""
                      subheading=""
                      buttonText="Request A Call"
                      showTrust={false}
                    />
                  </div>}
              </div>
            </motion.div>
          </>}
      </AnimatePresence>
    </>;
};
export default LandingPage;