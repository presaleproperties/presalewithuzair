import { useState } from "react";
import { CalendlyInline } from "@/components/CalendlyInline";
import { staticReviews } from "@/data/googleReviews";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Shield, Users, Star, Phone, ChevronDown, Home, BadgeDollarSign, FileSearch, Handshake } from "lucide-react";

import logoImage from "@/assets/logo.png";
import headshotImage from "@/assets/uzair-headshot.jpeg";

const LandingPage = () => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const ctaText = 'Book a 15-Minute Call';

  const scrollToBooking = () => {
    document.getElementById("calendly-book")?.scrollIntoView({ behavior: "smooth" });
  };
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
        <title>Book a Buyer Strategy Call | Uzair Muhammad</title>
        <meta name="description" content="Book a no-pressure presale strategy call with Uzair Muhammad. Buyer-side advice for new condos and townhomes across the Fraser Valley." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://presalewithuzair.com/call/" />
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
                    Fraser Valley Presale Buyer Advisor
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
                  Before you buy a presale, get a <span className="text-foreground/65">second perspective.</span>
                </motion.h1>

                <motion.p initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} transition={{
                delay: 0.1
              }} className="text-base md:text-lg text-foreground/75 mb-5 max-w-lg">15 minutes. No sales-centre pressure. Just a conversation about what you're considering and whether it makes sense.</motion.p>

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
                  
                  <span className="bg-card px-3 py-1.5 rounded-sm border border-border/70">✓ Buyer-Side Guidance</span>
                  <span className="bg-card px-3 py-1.5 rounded-sm border border-border/70">English · Punjabi · Urdu · Hindi</span>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* What happens on the call */}
        <section className="px-4 pb-12 md:pb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              What happens on the call
            </h2>
            <p className="text-sm text-foreground/60 mb-6">15 minutes. No obligation.</p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: Users, text: "You tell me what you're trying to accomplish." },
                { icon: FileSearch, text: "We talk through your budget, timeline and preferred areas." },
                { icon: BadgeDollarSign, text: "I'll tell you what I'd compare next. If you already have a project in mind, we'll start there." },
                { icon: Shield, text: "If I don't think presale is the right move, I'll tell you." },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3 bg-card border border-border/70 rounded-sm p-4">
                  <Icon className="h-4 w-4 text-primary mt-0.5 shrink-0" strokeWidth={2.25} />
                  <span className="text-sm text-foreground/80">{text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {testimonials.slice(0, 2).map((t) => (
                <figure key={t.name} className="bg-card border border-border/70 rounded-sm p-5">
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-[#F5B72F] text-[#F5B72F]" />
                    ))}
                  </div>
                  <blockquote className="text-sm text-foreground/80 line-clamp-5">{t.text}</blockquote>
                  <figcaption className="mt-3 text-xs font-semibold text-foreground/60">{t.name} · Google review</figcaption>
                </figure>
              ))}
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
                    <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground/45">
                      Verified Google review
                    </span>
                  </div>
                  <p className="text-foreground/75 text-sm mb-3 whitespace-pre-line">"{t.text}"</p>

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
              What I help buyers evaluate
            </h2>
            <p className="text-foreground/60 text-sm text-left max-w-xl mb-10">
              Buying a new condo or townhome is a big decision. My job is to help make the decision clearer.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {[{
              icon: FileSearch,
              title: "Understand What You're Signing",
              desc: "I'll walk you through the major business terms, deposit schedule and disclosure information in plain language and identify anything that should be confirmed with your lawyer."
            }, {
              icon: Home,
              title: "Compare Projects, Not Just Marketing",
              desc: "Early access can be useful. But the bigger advantage is having someone compare the project against competing presales and nearby resale before you commit."
            }, {
              icon: BadgeDollarSign,
              title: "Pressure-Test the Decision",
              desc: "Not every presale deserves your deposit. We look at the developer, location, pricing, floor plan, terms and your own financial situation before deciding."
            }, {
              icon: Handshake,
              title: "Stay Supported Through Completion",
              desc: "Presale can take years. I stay connected through deposits, completion preparation, walkthrough timing and possession."
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
            © {new Date().getFullYear()} Uzair Presales • Presale advice from the buyer's side.
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