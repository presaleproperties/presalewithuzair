import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, TrendingUp, Users, Star, Phone, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import logoImage from "@/assets/logo.png";
import headshotImage from "@/assets/uzair-headshot.jpeg";
import anishPhoto from "@/assets/testimonials/anish.jpg";
import baldeepPhoto from "@/assets/testimonials/baldeep.jpg";
import rehmanPhoto from "@/assets/testimonials/rehman.jpg";
import monaPhoto from "@/assets/testimonials/mona.jpg";
import rayPhoto from "@/assets/testimonials/ray.jpg";

const ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/11244776/uwxiv7d/";

const LandingPage = () => {
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    helpWith: "",
    callTime: "",
  });

  // Pre-fill from URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFormData(prev => ({
      ...prev,
      name: [params.get("firstName"), params.get("lastName")].filter(Boolean).join(" ") || prev.name,
      email: params.get("email") || prev.email,
      phone: params.get("phone") || prev.phone,
    }));
  }, []);

  // Lock body scroll when form is open
  useEffect(() => {
    if (isFormOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
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
      await fetch(ZAPIER_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          help_with: formData.helpWith,
          preferred_call_time: formData.callTime,
          landing_page: cleanUrl,
          utm_source: urlParams.get("utm_source") || "",
          utm_medium: urlParams.get("utm_medium") || "",
          utm_campaign: urlParams.get("utm_campaign") || "",
        }),
      });

      setIsSubmitted(true);
      toast({ title: "You're booked! 🎉", description: "Uzair will call you soon." });
    } catch {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const testimonials = [
    { name: "Anish", text: "First-time buyers — Uzair made everything clear and stress-free.", rating: 5, photo: anishPhoto },
    { name: "Baldeep", text: "Made our home-selling process seamless. Professionalism unmatched.", rating: 5, photo: baldeepPhoto },
    { name: "Rehman", text: "Very blunt, honest, and straight to the point. Respect his work ethic.", rating: 5, photo: rehmanPhoto },
    { name: "Mona", text: "Honest realtor who always puts clients first. Would advise anyone to work with him.", rating: 5, photo: monaPhoto },
    { name: "Ray", text: "Now I see why he's called the presale expert. Found our home in two weeks.", rating: 5, photo: rayPhoto },
  ];

  return (
    <>
      <Helmet>
        <title>Book A Call With Uzair | BC's Presale Expert</title>
        <meta name="description" content="Book a call with Uzair, BC's trusted presale expert. Get guidance on Vancouver presale condos and townhomes." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://presalewithuzair.com/requestacall" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pb-24">

        {/* Minimal Header */}
        <header className="py-4 px-4 border-b border-white/5">
          <div className="max-w-6xl mx-auto flex justify-center">
            <img src={logoImage} alt="Uzair Presales" className="h-8" />
          </div>
        </header>

        {/* Hero */}
        <section className="px-4 pt-8 pb-10 md:pt-14 md:pb-16">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
              <span className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
                🗣️ ਪੰਜਾਬੀ • हिंदी • اردو • English
              </span>
            </motion.div>

            <motion.img
              src={headshotImage}
              alt="Uzair"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto object-cover border-4 border-primary/30 shadow-lg shadow-primary/20 mb-5"
            />

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold text-white leading-tight mb-3"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              Work With <span className="text-primary">Uzair.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-slate-300 mb-6"
            >
              BC's trusted presale expert for condo & townhome buyers.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => setIsFormOpen(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-10 py-4 rounded-full shadow-lg shadow-primary/25 hover:shadow-xl transition-all font-semibold inline-flex items-center gap-2"
            >
              <Phone className="w-5 h-5" /> Request A Call
            </motion.button>

            <div className="mt-6 flex flex-wrap justify-center gap-3 text-slate-400 text-xs md:text-sm">
              <span className="bg-slate-800/50 px-3 py-1 rounded-full">✓ 350+ Families Helped</span>
              <span className="bg-slate-800/50 px-3 py-1 rounded-full">✓ $1M+ Saved</span>
              <span className="bg-slate-800/50 px-3 py-1 rounded-full">✓ 100% Free Advice</span>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="px-4 py-12 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8" style={{ fontFamily: "Raleway, sans-serif" }}>
              Real Clients. Real Results. 💬
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-slate-800/50 rounded-xl p-5 border border-white/10"
                >
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm mb-3">"{t.text}"</p>
                  <div className="flex items-center gap-2">
                    <img src={t.photo} alt={t.name} className="w-8 h-8 rounded-full object-cover border border-primary/30" />
                    <span className="text-white font-medium text-sm">{t.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Work With Uzair */}
        <section className="px-4 py-12 bg-slate-900/50 border-y border-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-8" style={{ fontFamily: "Raleway, sans-serif" }}>
              Why Work With Uzair?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Shield, title: "Save Money", desc: "Avoid bad deals. 350+ presales reviewed." },
                { icon: TrendingUp, title: "Best Units First", desc: "Early access before public launch." },
                { icon: Users, title: "Trusted by Families", desc: "350+ families across Metro Vancouver." },
              ].map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-800/50 rounded-xl p-6 border border-white/10 text-center"
                >
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <b.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{b.title}</h3>
                  <p className="text-slate-400 text-sm">{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer text */}
        <footer className="py-6 px-4 bg-slate-950 border-t border-white/5 text-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Uzair Presales • Vancouver's Presale Expert
          </p>
        </footer>
      </div>

      {/* Sticky Footer CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-white/10 px-4 py-3 safe-area-bottom">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => { setIsFormOpen(true); setIsSubmitted(false); }}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-4 rounded-full shadow-[0_0_20px_rgba(0,200,200,0.4)] hover:shadow-[0_0_30px_rgba(0,200,200,0.5)] transition-all font-semibold inline-flex items-center justify-center gap-2"
          >
            <Phone className="w-5 h-5" /> Request A Call
          </button>
        </div>
      </div>

      {/* Bottom Sheet Form Overlay */}
      <AnimatePresence>
        {isFormOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t border-white/10 rounded-t-3xl max-h-[90dvh] overflow-y-auto"
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>

              {/* Close button */}
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-1"
                aria-label="Close form"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="px-5 pb-8 pt-2 max-w-md mx-auto">
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "Raleway, sans-serif" }}>
                      You're In! 🎉
                    </h3>
                    <p className="text-slate-300 mb-2">Uzair will call you at your preferred time.</p>
                    <p className="text-slate-400 text-sm mb-6">Check your email for confirmation.</p>
                    <a
                      href="/"
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm transition-colors"
                    >
                      Visit Our Website →
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="text-center mb-1">
                      <h2 className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: "Raleway, sans-serif" }}>
                        Request A <span className="text-primary">Call</span>
                      </h2>
                      <p className="text-slate-400 text-xs mt-1">Takes 30 seconds. Uzair calls you.</p>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-slate-300 text-sm">Your Name *</Label>
                      <Input
                        placeholder="Full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-slate-800/80 border-white/10 text-white placeholder:text-slate-500 focus:border-primary h-12"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-slate-300 text-sm">Phone Number *</Label>
                      <Input
                        type="tel"
                        placeholder="+1 (xxx) xxx-xxxx"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-slate-800/80 border-white/10 text-white placeholder:text-slate-500 focus:border-primary h-12"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-slate-300 text-sm">Email *</Label>
                      <Input
                        type="email"
                        placeholder="you@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-slate-800/80 border-white/10 text-white placeholder:text-slate-500 focus:border-primary h-12"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-slate-300 text-sm">How Can I Help? *</Label>
                      <Select value={formData.helpWith} onValueChange={(v) => setFormData({ ...formData, helpWith: v })}>
                        <SelectTrigger className="bg-slate-800/80 border-white/10 text-white h-12">
                          <SelectValue placeholder="Select one" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border border-white/10 z-[60]">
                          <SelectItem value="buying-first-home">Buying My First Home</SelectItem>
                          <SelectItem value="presale-investment">Presale Investment</SelectItem>
                          <SelectItem value="selling-property">Selling My Property</SelectItem>
                          <SelectItem value="market-advice">Market Advice / General</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-slate-300 text-sm">Preferred Time For A Call *</Label>
                      <Select value={formData.callTime} onValueChange={(v) => setFormData({ ...formData, callTime: v })}>
                        <SelectTrigger className="bg-slate-800/80 border-white/10 text-white h-12">
                          <SelectValue placeholder="Select a time" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border border-white/10 z-[60]">
                          <SelectItem value="morning">Morning (9am – 12pm)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (12pm – 5pm)</SelectItem>
                          <SelectItem value="evening">Evening (5pm – 8pm)</SelectItem>
                          <SelectItem value="anytime">Anytime Works</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 rounded-xl shadow-lg shadow-primary/25 font-semibold"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      {isSubmitting ? "Sending..." : "Request My Call"}
                    </Button>

                    <p className="text-xs text-slate-500 text-center">
                      ⚡ Limited weekly availability · Serious inquiries only
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default LandingPage;
