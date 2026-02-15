import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, TrendingUp, Users, Star, Phone, CheckCircle, X, ChevronDown, Home, BadgeDollarSign, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import logoImage from "@/assets/logo.png";
import headshotImage from "@/assets/uzair-headshot.jpeg";
import michellePhoto from "@/assets/testimonials/michelle.jpg";
import anishPhoto from "@/assets/testimonials/anish.jpg";
import rayPhoto from "@/assets/testimonials/ray.jpg";
import sonaliPhoto from "@/assets/testimonials/sonali.jpg";
import hissanPhoto from "@/assets/testimonials/hissan.jpg";
import andresPhoto from "@/assets/testimonials/andres.jpg";
import adamPhoto from "@/assets/testimonials/adam.jpg";
import miwaPhoto from "@/assets/testimonials/miwa.jpg";
import mehreenPhoto from "@/assets/testimonials/mehreen.jpg";
import baldeepPhoto from "@/assets/testimonials/baldeep.jpg";
import jamilaPhoto from "@/assets/testimonials/jamila.jpg";
import monaPhoto from "@/assets/testimonials/mona.jpg";
import akhiPhoto from "@/assets/testimonials/akhi.jpg";
import bryantPhoto from "@/assets/testimonials/bryant.jpg";
import rehmanPhoto from "@/assets/testimonials/rehman.jpg";
import { supabase } from "@/integrations/supabase/client";

const LandingPage = () => {
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [ctaVariant] = useState<'A' | 'B'>(() => Math.random() < 0.5 ? 'A' : 'B');
  const ctaText = ctaVariant === 'A' ? 'Talk To Uzair' : 'Book Your Free Call';
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    helpWith: "",
    callTime: "",
    foundVia: "",
    notes: ""
  });

  // Pre-fill from URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFormData(prev => ({
      ...prev,
      name: [params.get("firstName"), params.get("lastName")].filter(Boolean).join(" ") || prev.name,
      email: params.get("email") || prev.email,
      phone: params.get("phone") || prev.phone
    }));
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.helpWith || !formData.callTime) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    const cleanUrl = window.location.origin + window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    try {
      const { data, error } = await supabase.functions.invoke('send-to-zapier', {
        body: {
          Full_Name: formData.name.trim(),
          Phone: formData.phone.trim(),
          Email: formData.email.trim(),
          Help_With: formData.helpWith,
          Preferred_Call_Time: formData.callTime,
          Found_Via: formData.foundVia,
          Notes: formData.notes.trim(),
          Landing_Page: cleanUrl,
          UTM_Source: urlParams.get("utm_source") || "",
          UTM_Medium: urlParams.get("utm_medium") || "",
          UTM_Campaign: urlParams.get("utm_campaign") || "",
          CTA_Variant: ctaVariant
        }
      });
      if (error) throw error;
      setIsSubmitted(true);
      toast({ title: "You're booked! 🎉", description: "I'll call you soon." });
    } catch {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  type ClientType = "First-Time Buyer" | "Investor" | "Repeat Client" | "Presale Buyer" | "Seller & Buyer" | "Buyer";
  const clientTypeColors: Record<ClientType, string> = {
    "First-Time Buyer": "bg-primary/20 text-primary",
    "Investor": "bg-amber-500/20 text-amber-400",
    "Repeat Client": "bg-emerald-500/20 text-emerald-400",
    "Presale Buyer": "bg-purple-500/20 text-purple-400",
    "Seller & Buyer": "bg-blue-500/20 text-blue-400",
    "Buyer": "bg-rose-500/20 text-rose-400"
  };

  const testimonials = [{
    name: "Anish",
    text: "As first-time buyers, we were nervous, but Uzair made everything clear, manageable, and stress-free. He helped us find the perfect home for our family.",
    rating: 5,
    photo: anishPhoto,
    clientType: "First-Time Buyer" as ClientType,
    timeAgo: "1 day ago"
  }, {
    name: "Michelle",
    text: "Uzair was very knowledgeable when I first approached him about purchasing my first home. He answered my questions honestly and made sure I was informed the entire way through.",
    rating: 5,
    photo: michellePhoto,
    clientType: "First-Time Buyer" as ClientType,
    timeAgo: "1 month ago"
  }, {
    name: "Andres",
    text: "Uzair turned what could have been a difficult first home purchase into an easy and enjoyable experience. He guided us from search to completion.",
    rating: 5,
    photo: andresPhoto,
    clientType: "First-Time Buyer" as ClientType,
    timeAgo: "1 month ago"
  }, {
    name: "Bryant",
    text: "From presale to closing, Uzair was extremely helpful throughout the entire process. He's talented, reliable, and someone I would recommend anytime.",
    rating: 5,
    photo: bryantPhoto,
    clientType: "Presale Buyer" as ClientType,
    timeAgo: "7 months ago"
  }, {
    name: "Adam",
    text: "Uzair helped me with my investment property and made sure I got the best deal. No fluff, no hype — just honesty and expertise.",
    rating: 5,
    photo: adamPhoto,
    clientType: "Investor" as ClientType,
    timeAgo: "8 months ago"
  }, {
    name: "Jamila",
    text: "Uzair was professional, knowledgeable, and always had my best interests at heart. He made the buying and selling process smooth.",
    rating: 5,
    photo: jamilaPhoto,
    clientType: "Buyer" as ClientType,
    timeAgo: "9 months ago"
  }, {
    name: "Mona",
    text: "Uzair is a very honest realtor who always puts his clients first. We've been working with him for years. I would advise anyone to work with him.",
    rating: 5,
    photo: monaPhoto,
    clientType: "Repeat Client" as ClientType,
    timeAgo: "10 months ago"
  }, {
    name: "Ray",
    text: "Now I see why he's called the presale expert. His transparency and guidance helped our family find our first home in just two weeks.",
    rating: 5,
    photo: rayPhoto,
    clientType: "First-Time Buyer" as ClientType,
    timeAgo: "1 year ago"
  }, {
    name: "Sonali",
    text: "Uzair's knowledge and expertise made the entire process smooth and easy to understand. We are extremely grateful for his efforts.",
    rating: 5,
    photo: sonaliPhoto,
    clientType: "First-Time Buyer" as ClientType,
    timeAgo: "1 year ago"
  }, {
    name: "M Hissan",
    text: "Uzair guided me through my first home purchase. Even after getting the house, he continued to help with upgrades and advice.",
    rating: 5,
    photo: hissanPhoto,
    clientType: "First-Time Buyer" as ClientType,
    timeAgo: "1 year ago"
  }, {
    name: "Miwa",
    text: "Uzair's knowledge of presales is incredible. Whenever we find a project, he already knows about it and provides detailed insights.",
    rating: 5,
    photo: miwaPhoto,
    clientType: "Investor" as ClientType,
    timeAgo: "1 year ago"
  }, {
    name: "Mehreen",
    text: "Uzair is an expert when it comes to presales in Vancouver. His personalized approach and deep market knowledge make the process very easy.",
    rating: 5,
    photo: mehreenPhoto,
    clientType: "Presale Buyer" as ClientType,
    timeAgo: "1 year ago"
  }, {
    name: "Baldeep",
    text: "Uzair made our home-selling process seamless. His professionalism and market expertise are unmatched.",
    rating: 5,
    photo: baldeepPhoto,
    clientType: "Seller & Buyer" as ClientType,
    timeAgo: "1 year ago"
  }, {
    name: "Akhi",
    text: "I've been working with Uzair for nearly three years and would highly recommend him for any property purchase or sale.",
    rating: 5,
    photo: akhiPhoto,
    clientType: "Repeat Client" as ClientType,
    timeAgo: "1 year ago"
  }, {
    name: "Rehman",
    text: "Very blunt, honest, and straight to the point. He doesn't beat around the bush. I truly respect his work ethic.",
    rating: 5,
    photo: rehmanPhoto,
    clientType: "Buyer" as ClientType,
    timeAgo: "4 years ago"
  }];

  const visibleTestimonials = showAllReviews ? testimonials : testimonials.slice(0, 6);

  return <>
    <Helmet>
      <title>Book A Call With Uzair | BC's Presale Expert</title>
      <meta name="description" content="Book a call with Uzair, BC's trusted presale expert. Get guidance on Vancouver presale condos and townhomes." />
      <meta name="robots" content="noindex, nofollow" />
      <link rel="canonical" href="https://presalewithuzair.com/call" />
    </Helmet>

    <div className="dark-section min-h-screen bg-background pb-32">

      {/* Minimal Header */}
      <header className="py-4 px-4 border-b border-border">
        <div className="max-w-6xl mx-auto flex justify-start">
          <img src={logoImage} alt="Uzair Presales" className="h-8" />
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 pt-10 pb-12 md:pt-16 md:pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-6 md:gap-10">
            {/* Headshot */}
            <motion.img src={headshotImage} alt="Uzair" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-28 h-28 md:w-36 md:h-36 rounded-2xl object-cover border-2 border-primary/30 shadow-xl shadow-primary/10 flex-shrink-0" />

            <div className="text-left">
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-3">
                <span className="text-sm font-medium text-primary">Hey, I'm Uzair 👋</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-3xl md:text-5xl text-foreground leading-tight mb-4">
                Thinking About Buying a <span className="text-primary">Property?</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-base md:text-lg text-muted-foreground mb-5 max-w-lg">
                Whether it's your first home or your next investment — let's have an honest conversation about what makes sense for you. No pressure, no pitch. Just real advice.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-wrap justify-start gap-2 text-muted-foreground text-xs mb-5">
                <span className="bg-secondary px-3 py-1.5 rounded-full border border-border">🏠 Presales</span>
                <span className="bg-secondary px-3 py-1.5 rounded-full border border-border">🔄 Assignments</span>
                
                <span className="bg-secondary px-3 py-1.5 rounded-full border border-border">🔑 Resale Buy & Sell</span>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap justify-start gap-2 text-muted-foreground text-xs">
                <span className="bg-secondary px-3 py-1.5 rounded-full border border-border">✓ 350+ Clients Helped</span>
                
                <span className="bg-secondary px-3 py-1.5 rounded-full border border-border">🗣 English · Punjabi · Urdu · Hindi</span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="px-4 py-12 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-left mb-8">
            <h2 className="text-2xl md:text-3xl text-foreground mb-3">
              What My Clients Say 💬
            </h2>
            <div className="flex items-center justify-start gap-2">
              <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google" className="h-4" />
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
              </div>
              <span className="text-muted-foreground text-xs">5.0 rating</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleTestimonials.map((t, i) => <motion.div key={t.name} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-card rounded-xl p-5 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex gap-0.5">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${clientTypeColors[t.clientType]}`}>
                  {t.clientType}
                </span>
              </div>
              <p className="text-muted-foreground text-sm mb-3">"{t.text}"</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={t.photo} alt={t.name} className="w-8 h-8 rounded-full object-cover border border-primary/30" />
                  <span className="text-foreground font-medium text-sm">{t.name}</span>
                </div>
                <span className="text-muted-foreground text-xs">{t.timeAgo}</span>
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

      {/* Services */}
      <section className="px-4 py-14 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <p className="section-label text-left mb-2">How I Can Help</p>
          <h2 className="text-2xl md:text-3xl text-left text-foreground mb-8">
            Services
          </h2>

          {/* Primary services — 2 col */}
          <div className="grid sm:grid-cols-2 gap-5 mb-5">
            {[{
              icon: Home,
              title: "Buy a Presale",
              items: ["Condos", "Townhomes", "Single Family"],
              desc: "Get early access to new developments, expert contract review, and honest advice on which projects are actually worth your money — before they hit the public market."
            }, {
              icon: BadgeDollarSign,
              title: "Assign a Presale",
              items: null,
              desc: "Already own a presale contract? I'll help you navigate the assignment process, find qualified buyers, and maximize your return — while keeping you protected."
            }].map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary/15 rounded-lg flex items-center justify-center flex-shrink-0">
                    <s.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
                </div>
                {s.items && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {s.items.map(item => (
                      <span key={item} className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium">{item}</span>
                    ))}
                  </div>
                )}
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Resale — full width */}
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.16 }} className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-primary/15 rounded-lg flex items-center justify-center flex-shrink-0">
                <Handshake className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">"Do You Help With Resale Too?"</h3>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {["Buy Resale", "Sell Resale"].map(item => (
                <span key={item} className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium">{item}</span>
              ))}
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Yes — whether you're buying or selling a resale condo, townhome, or house, I bring the same honest analysis, negotiation strategy, and hands-on support from start to close.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What It's Like Working With Uzair */}
      <section className="px-4 py-14 bg-muted/30 border-y border-border">
        <div className="max-w-4xl mx-auto">
          <p className="section-label text-left mb-2">What Clients Say</p>
          <h2 className="text-2xl md:text-3xl text-left text-foreground mb-3">
            What It's Actually Like Working With Me
          </h2>
          <p className="text-muted-foreground text-sm text-left max-w-xl mb-10">
            Buying real estate can feel overwhelming — especially your first time. Here's how I address the fears most buyers won't say out loud.
          </p>
          <div className="space-y-5">
            {[{
              fear: "\"I'm nervous I'll sign something I don't understand.\"",
              answer: "I break down every clause in plain language so nothing catches you off guard. As one first-time buyer put it:",
              quote: "Every question we had was answered thoroughly, and they always explained things in a way that made us feel confident and informed at every step.",
              reviewer: "— Anish B., First-Time Buyer"
            }, {
              fear: "\"What if I get pressured into a bad deal?\"",
              answer: "I'll tell you when to walk away — even if it means losing a sale. I evaluate the developer, location, and pricing before I ever recommend a project.",
              quote: "He's not one to pressure you into making a decision if it's not the right one for you.",
              reviewer: "— Michelle L., First-Time Buyer"
            }, {
              fear: "\"I don't know this market. What if I make a mistake?\"",
              answer: "Whether you're new to Vancouver or new to real estate, I'll guide you through the entire process — search, offer, deposits, completion.",
              quote: "Uzair made what could have been a really difficult transaction... he turned it into an easy and enjoyable process.",
              reviewer: "— Andres J., First-Time Buyer"
            }, {
              fear: "\"Is my realtor actually looking out for me, or just chasing commission?\"",
              answer: "I invest in the same projects I recommend. I won't let you put money into something I wouldn't put my own money into.",
              quote: "He is not a realtor for just money, he is a realtor to make sure every hard earned dollar you put down is worth your struggle and sweat.",
              reviewer: "— Amrin S., Investor"
            }, {
              fear: "\"What happens after I sign? Will I be left on my own?\"",
              answer: "From choosing the right unit to completion day and beyond — I stay with you through deposits, milestones, inspections, and move-in.",
              quote: "He made the entire process smooth and stress-free, answering all my questions and keeping me informed every step of the way.",
              reviewer: "— Jamila K., Buyer"
            }].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="bg-card rounded-xl p-6 border border-border">
                <p className="text-foreground font-semibold text-base italic mb-3">{item.fear}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{item.answer}</p>
                <div className="pl-4 border-l-2 border-primary/40">
                  <p className="text-foreground/80 text-sm italic leading-relaxed">"{item.quote}"</p>
                  <p className="text-primary text-xs mt-1.5 font-medium">{item.reviewer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer text */}
      <footer className="py-6 px-4 border-t border-border text-left">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Uzair Presales • Vancouver's Presale Expert
        </p>
      </footer>
    </div>

    {/* Sticky Footer CTA */}
    <div className="dark-section fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border px-4 pt-3 pb-3" style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))' }}>
      <div className="max-w-md mx-auto">
        <button onClick={() => { setIsFormOpen(true); setIsSubmitted(false); }} className="w-full group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-4 rounded-xl shadow-[0_0_20px_rgba(212,163,22,0.4)] hover:shadow-[0_0_30px_rgba(212,163,22,0.6)] transition-all duration-300 font-bold inline-flex items-center justify-center gap-2.5">
          <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-xl" />
          <Phone className="w-5 h-5 relative z-10" />
          <span className="relative z-10">{ctaText}</span>
        </button>
        <p className="text-center text-muted-foreground text-xs mt-1.5">Same day call back</p>
      </div>
    </div>

    {/* Bottom Sheet Form Overlay */}
    <AnimatePresence>
      {isFormOpen && <>
        {/* Backdrop */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsFormOpen(false)} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />

        {/* Sheet */}
        <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }} className="dark-section fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border rounded-t-3xl max-h-[90dvh] overflow-y-auto">
          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-foreground/20" />
          </div>

          {/* Close button */}
          <button onClick={() => setIsFormOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors p-1" aria-label="Close form">
            <X className="w-6 h-6" />
          </button>

          <div className="px-5 pb-8 pt-2 max-w-md mx-auto">
            {isSubmitted ? <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl text-foreground mb-2">
                You're In! 🎉
              </h3>
              <p className="text-muted-foreground mb-2">I'll call you at your preferred time.</p>
              <p className="text-muted-foreground text-sm mb-6">Check your email for confirmation.</p>
              <a href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm transition-colors">
                Visit Our Website →
              </a>
            </div> : <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-center mb-1">
                <h2 className="text-xl md:text-2xl text-foreground">
                  Request A <span className="text-primary">Call</span>
                </h2>
                <p className="text-muted-foreground text-xs mt-1">Same day call back.</p>
              </div>

              <div className="space-y-1.5">
                <Label className="text-muted-foreground text-sm">Your Name *</Label>
                <Input placeholder="Full name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary h-12" required />
              </div>

              <div className="space-y-1.5">
                <Label className="text-muted-foreground text-sm">Phone Number *</Label>
                <Input type="tel" placeholder="+1 (xxx) xxx-xxxx" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary h-12" required />
              </div>

              <div className="space-y-1.5">
                <Label className="text-muted-foreground text-sm">Email *</Label>
                <Input type="email" placeholder="you@email.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary h-12" required />
              </div>

              <div className="space-y-1.5">
                <Label className="text-muted-foreground text-sm">How Can I Help? *</Label>
                <Select value={formData.helpWith} onValueChange={v => setFormData({ ...formData, helpWith: v })}>
                  <SelectTrigger className="bg-input border-border text-foreground h-12">
                    <SelectValue placeholder="Select one" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border border-border z-[60]">
                    <SelectItem value="buying-first-home">Buying My First Home</SelectItem>
                    <SelectItem value="presale-investment">Presale Investment</SelectItem>
                    <SelectItem value="selling-property">Selling My Property</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-muted-foreground text-sm">Where Did You Find Me? *</Label>
                <Select value={formData.foundVia} onValueChange={v => setFormData({ ...formData, foundVia: v })}>
                  <SelectTrigger className="bg-input border-border text-foreground h-12">
                    <SelectValue placeholder="Select one" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border border-border z-[60]">
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                    <SelectItem value="google">Google</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-muted-foreground text-sm">Notes</Label>
                <Textarea placeholder="Tell me more about your situation so I can prepare for the call" value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary min-h-[80px] resize-none" maxLength={500} />
              </div>

              <div className="space-y-1.5">
                <Label className="text-muted-foreground text-sm">Preferred Time For A Call *</Label>
                <Select value={formData.callTime} onValueChange={v => setFormData({ ...formData, callTime: v })}>
                  <SelectTrigger className="bg-input border-border text-foreground h-12">
                    <SelectValue placeholder="Select a time" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border border-border z-[60]">
                    <SelectItem value="morning">Morning (9am – 12pm)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12pm – 5pm)</SelectItem>
                    <SelectItem value="evening">Evening (5pm – 8pm)</SelectItem>
                    <SelectItem value="anytime">Anytime Works</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" checked={agreedToTerms} onChange={e => setAgreedToTerms(e.target.checked)} className="mt-0.5 w-4 h-4 rounded border-border bg-input text-primary focus:ring-primary accent-primary flex-shrink-0" />
                <span className="text-xs text-muted-foreground leading-relaxed">
                  I work exclusively with serious buyers and sellers who are <span className="text-foreground font-medium">not currently represented by another agent</span>. By checking this box, you confirm this applies to you.
                </span>
              </label>

              <Button type="submit" disabled={isSubmitting || !agreedToTerms} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 rounded-xl shadow-lg shadow-primary/25 font-semibold disabled:opacity-40 disabled:cursor-not-allowed">
                <Phone className="w-5 h-5 mr-2" />
                {isSubmitting ? "Sending..." : "Request A Call"}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                ⚡ Limited weekly availability
              </p>
            </form>}
          </div>
        </motion.div>
      </>}
    </AnimatePresence>
  </>;
};

export default LandingPage;
