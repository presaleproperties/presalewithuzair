import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  TrendingUp, Shield, Banknote, PiggyBank, Workflow, ArrowRightLeft,
  CheckCircle, Loader2, BookOpen, AlertTriangle, Users, ClipboardList, Footprints,
  MapPin, Download, ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import logoImage from "@/assets/logo.png";
import presaleBuilding from "@/assets/presale-building.jpg";

// ─── Types ───────────────────────────────────────────────────────────────────

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  buyerType: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const highlights = [
  {
    icon: TrendingUp,
    title: "Lock In Today's Prices",
    body: "A $600K presale bought in 2026 could be worth $660K by completion — that's $60K in equity before you even get the keys.",
  },
  {
    icon: Banknote,
    title: "Massive Leverage",
    body: "Put down just 5–10% now. Your $30K deposit can grow to $45K+ in equity (150% return) in 3 years while the property is still being built.",
  },
  {
    icon: Shield,
    title: "Brand New with Warranty",
    body: "BC's 2-5-10 warranty covers structural defects, building envelope & structural integrity. No major repairs for a decade — saving $25K–$40K.",
  },
  {
    icon: PiggyBank,
    title: "$47,000 in Tax Savings",
    body: "First-time buyers get a $35K GST rebate + $12K Property Transfer Tax exemption on qualifying presales. That's $47,000 back in your pocket.",
  },
  {
    icon: Workflow,
    title: "Strong Cash Flow",
    body: "New condos command $200–$600/month more in rent than older buildings. Your tenant covers the mortgage, strata, taxes, insurance & utilities.",
  },
  {
    icon: ArrowRightLeft,
    title: "Assignment Flexibility",
    body: "Life changes. An assignment clause lets you sell your contract before completion — built-in exit strategy at no extra cost to lock in your profit early.",
  },
];

const whatsInside = [
  { icon: BookOpen, part: "Part 1", title: "What is a Presale & Why It Works", desc: "The mechanics, the BC market opportunity, and why now is the right time." },
  { icon: Banknote, part: "Part 2", title: "The Money — Real Numbers", desc: "Deposit structures, closing costs, monthly costs, rental income breakdowns." },
  { icon: AlertTriangle, part: "Part 3", title: "7 Deadly Mistakes to Avoid", desc: "From missing closing costs to weak developers — what trips buyers up." },
  { icon: Users, part: "Part 4", title: "Real Success Stories", desc: "Sarah & Mike, David, and James — real numbers, real outcomes." },
  { icon: ClipboardList, part: "Part 5", title: "Decision Framework", desc: "10-question checklist: is presale right for YOU right now?" },
  { icon: Footprints, part: "Part 6", title: "10-Step Action Plan", desc: "Week-by-week roadmap from pre-approval to signed contract." },
];

const neighborhoods = [
  { name: "Clayton, Surrey", tag: "SkyTrain Coming", range: "$500K–$650K", rent: "$2,500–$2,700/mo" },
  { name: "Guildford, Surrey", tag: "Hidden Gem", range: "$450K–$600K", rent: "$2,300–$2,500/mo" },
  { name: "Langley City", tag: "Emerging Market", range: "$400K–$550K", rent: "$2,200–$2,400/mo" },
  { name: "Willoughby, Langley", tag: "Established", range: "$450K–$600K", rent: "$2,200–$2,400/mo" },
  { name: "South Surrey", tag: "Premium", range: "$550K–$750K", rent: "$2,400–$2,700/mo" },
];

// ─── Component ───────────────────────────────────────────────────────────────

const PresaleGuide = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    buyerType: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { firstName, lastName, email, phone, buyerType } = formData;
    if (!firstName || !lastName || !email || !phone || !buyerType) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      const params = new URLSearchParams(window.location.search);
      const { error } = await supabase.functions.invoke("capture-lead", {
        body: {
          firstName,
          lastName,
          email,
          phone,
          buyerType,
          leadSource: "presale-guide",
          utmSource: params.get("utm_source"),
          utmMedium: params.get("utm_medium"),
          utmCampaign: params.get("utm_campaign"),
          utmTerm: params.get("utm_term"),
          utmContent: params.get("utm_content"),
          referrer: document.referrer || null,
          landingPage: window.location.pathname,
        },
      });
      if (error) throw error;
      setIsSuccess(true);
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>BC Presale Buyer's Guide | Free Download</title>
        <meta
          name="description"
          content="Download the free BC Presale Buyer's Guide. Learn how to build wealth through strategic presale investing in Metro Vancouver and Fraser Valley."
        />
        <link rel="canonical" href="https://presalewithuzair.com/presale-guide" />
      </Helmet>

      <div className="min-h-screen bg-background">

        {/* ── Navbar ── */}
        <header className="sticky top-0 z-40 bg-background/90 backdrop-blur border-b border-border py-3 px-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <a href="/">
              <img src={logoImage} alt="Uzair Presales" className="h-8" />
            </a>
            <Button variant="hero" size="sm" onClick={scrollToForm} className="text-xs sm:text-sm">
              Download Free Guide
            </Button>
          </div>
        </header>

        {/* ── Hero ── */}
        <section className="relative overflow-hidden pt-16 pb-20 px-4">
          {/* Subtle background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background pointer-events-none" />

          <div className="relative max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Left */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <span className="inline-block text-xs font-bold tracking-widest text-primary uppercase mb-4">
                  Free Download · 2026 Edition
                </span>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-5">
                  The BC Presale<br />
                  <span className="text-primary">Buyer's Guide</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Sudip lost his <strong className="text-foreground">$82,000 deposit</strong> on a South Surrey presale. But for every buyer who lost everything, <strong className="text-foreground">10 made $50K–$150K profit</strong>. The difference? Strategy — and avoiding 7 critical mistakes.
                </p>
                <p className="text-base text-muted-foreground mb-8">
                  This guide covers everything: real numbers, real stories, and a step-by-step action plan to build wealth through presale investing in Metro Vancouver and Fraser Valley.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="hero" size="xl" onClick={scrollToForm} className="text-base font-semibold">
                    <Download className="h-5 w-5 mr-2" />
                    Download the Free Guide
                  </Button>
                </div>
                <div className="flex flex-wrap gap-4 mt-6">
                  {["100% Free", "No obligation", "Instant access"].map((item) => (
                    <div key={item} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right — cover image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="hidden lg:block"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={presaleBuilding}
                    alt="BC Presale Building"
                    className="w-full aspect-[4/3] object-cover"
                  />
                  {/* Overlay badge */}
                  <div className="absolute bottom-5 left-5 right-5 bg-background/90 backdrop-blur rounded-xl p-4 border border-border">
                    <p className="text-xs text-primary font-bold tracking-wide uppercase mb-1">Inside the Guide</p>
                    <p className="text-sm text-foreground font-semibold">7 Deadly Mistakes · Real Numbers · 10-Step Action Plan</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── 6 Key Highlights ── */}
        <section className="py-20 px-4 bg-card/40 border-y border-border">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-xs font-bold tracking-widest text-primary uppercase mb-3 block">Why Presale?</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                6 Reasons Smart Investors Choose Presale
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {highlights.map((h, i) => (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-background rounded-xl p-6 border border-border hover:border-primary/40 transition-colors"
                >
                  <div className="w-11 h-11 bg-primary/15 rounded-lg flex items-center justify-center mb-4">
                    <h.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground text-base mb-2">{h.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{h.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── What's Inside ── */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-xs font-bold tracking-widest text-primary uppercase mb-3 block">Inside the Guide</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                What You'll Learn
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                6 comprehensive parts covering everything from first principles to your signed contract.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4">
              {whatsInside.map((item, i) => (
                <motion.div
                  key={item.part}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -15 : 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex gap-4 p-5 bg-card rounded-xl border border-border"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/15 rounded-lg flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs text-primary font-bold tracking-wide uppercase">{item.part}</span>
                    <h3 className="font-semibold text-foreground text-sm mt-0.5 mb-1">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-10"
            >
              <Button variant="hero" size="lg" onClick={scrollToForm}>
                <Download className="h-4 w-4 mr-2" />
                Get the Full Guide Free
              </Button>
            </motion.div>
          </div>
        </section>

        {/* ── Neighborhoods ── */}
        <section className="py-16 px-4 bg-card/40 border-y border-border">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <span className="text-xs font-bold tracking-widest text-primary uppercase mb-3 block">Where to Buy</span>
              <h2 className="font-display text-3xl font-bold text-foreground">Featured Neighborhoods</h2>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-4">
              {neighborhoods.map((n, i) => (
                <motion.div
                  key={n.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-background border border-border rounded-xl px-5 py-4 min-w-[200px] flex-1 max-w-[220px]"
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <MapPin className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                    <span className="text-xs font-bold text-primary uppercase tracking-wide">{n.tag}</span>
                  </div>
                  <p className="font-semibold text-foreground text-sm mb-2">{n.name}</p>
                  <p className="text-xs text-muted-foreground">Presale: <span className="text-foreground font-medium">{n.range}</span></p>
                  <p className="text-xs text-muted-foreground mt-0.5">Rent: <span className="text-foreground font-medium">{n.rent}</span></p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Lead Capture Form ── */}
        <section className="py-20 px-4" ref={formRef}>
          <div className="max-w-lg mx-auto">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/15 flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-primary" />
                </div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-3">You're All Set!</h2>
                <p className="text-muted-foreground mb-2">
                  Thanks! We'll send the guide to your email shortly.
                </p>
                <p className="text-sm text-muted-foreground mb-8">
                  In the meantime, Uzair may reach out personally to answer any questions.
                </p>
                <a href="/">
                  <Button variant="outline" size="lg">← Back to Main Site</Button>
                </a>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="text-center mb-8">
                  <span className="text-xs font-bold tracking-widest text-primary uppercase mb-3 block">Free Download</span>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
                    Get Your Free Guide — Instantly
                  </h2>
                  <p className="text-muted-foreground">
                    Fill in your details and we'll email the full guide to you right away.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name row */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1">First Name *</label>
                        <Input
                          placeholder="First"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="h-12 text-base bg-background border-border/60"
                          autoComplete="given-name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1">Last Name *</label>
                        <Input
                          placeholder="Last"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="h-12 text-base bg-background border-border/60"
                          autoComplete="family-name"
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1">Email *</label>
                      <Input
                        type="email"
                        placeholder="you@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="h-12 text-base bg-background border-border/60"
                        autoComplete="email"
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1">Phone *</label>
                      <Input
                        type="tel"
                        placeholder="(604) 555-1234"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="h-12 text-base bg-background border-border/60"
                        autoComplete="tel"
                        required
                      />
                    </div>

                    {/* Buyer Type */}
                    <div>
                      <label className="block text-xs font-medium text-foreground mb-1">I am a... *</label>
                      <Select
                        value={formData.buyerType}
                        onValueChange={(v) => setFormData({ ...formData, buyerType: v })}
                      >
                        <SelectTrigger className="h-12 text-base bg-background border-border/60">
                          <SelectValue placeholder="Select one" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="first-time-buyer">First-Time Buyer</SelectItem>
                          <SelectItem value="investor">Investor</SelectItem>
                          <SelectItem value="end-user">Upgrader / Downsizer</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      type="submit"
                      variant="hero"
                      size="xl"
                      className="w-full h-14 text-base font-semibold mt-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin mr-2" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Download className="h-5 w-5 mr-2" />
                          Send Me the Guide
                        </>
                      )}
                    </Button>

                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 pt-3 border-t border-border/30">
                      {["350+ clients helped", "5-star rated", "No spam ever"].map((t) => (
                        <div key={t} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <CheckCircle className="h-3.5 w-3.5 text-primary" />
                          {t}
                        </div>
                      ))}
                    </div>

                    <p className="text-xs text-muted-foreground text-center">
                      By submitting, you agree to receive communications from us. We respect your privacy.
                    </p>
                  </form>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* ── Trust Footer ── */}
        <footer className="border-t border-border py-8 px-4">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src={logoImage} alt="Uzair Presales" className="h-7" />
              <span className="text-sm text-muted-foreground">Presale Specialist · Metro Vancouver & Fraser Valley</span>
            </div>
            <a href="/" className="text-sm text-primary hover:text-primary/80 transition-colors font-medium">
              ← Back to main site
            </a>
          </div>
        </footer>

      </div>
    </>
  );
};

export default PresaleGuide;
