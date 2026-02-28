import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  TrendingUp, Shield, Banknote, PiggyBank, Workflow, ArrowRightLeft,
  CheckCircle, Loader2, BookOpen, AlertTriangle, Users, ClipboardList,
  Footprints, MapPin, Download, HelpCircle, BarChart3, Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import logoImage from "@/assets/logo.png";
import presaleBuilding from "@/assets/presale-building.jpg";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  buyerType: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const highlights = [
  {
    icon: BarChart3,
    title: "26% Price Collapse = Your Entry Point",
    body: "Low-rise construction that sold at $950/sqft in 2022 now trades at $700/sqft. Townhomes are down $150K–$200K from peak. Developers are selling below build cost to stay afloat.",
  },
  {
    icon: Banknote,
    title: "Near-Immediate Cash Flow",
    body: "For the first time in years, new 1-bed & 2-bed condos in the Fraser Valley generate cash flow that nearly covers all expenses from day one — and fully covers by year 5–7.",
  },
  {
    icon: TrendingUp,
    title: "SkyTrain-Driven Appreciation",
    body: "The SkyTrain extension to Langley opens in 2025–2026. Properties near new stations historically appreciate 20–40% over 5–10 years. You can still buy before that wave.",
  },
  {
    icon: PiggyBank,
    title: "$47,000 in Tax Savings",
    body: "First-time buyers get a full GST rebate (5%) + Property Transfer Tax exemption on new homes up to $1.1M. On a $630K presale, that's $47,000 back.",
  },
  {
    icon: Shield,
    title: "Brand New with 2-5-10 Warranty",
    body: "BC's home warranty covers structural defects (2 yrs), building envelope (5 yrs), and structural integrity (10 yrs). No major repairs for a decade — saving $25K–$40K.",
  },
  {
    icon: ArrowRightLeft,
    title: "VIP Access Is Closing",
    body: "By late 2026, 60–70% of the best inventory will be allocated privately to VIP buyers. Public inventory and public pricing are still available — but the window is closing fast.",
  },
];

const whatsInside = [
  { icon: BarChart3, part: "Part 1", title: "The Market Collapse & Why It Happened", desc: "The 26% price decline, the 3 crises driving developer desperation, and why this is a historic opportunity." },
  { icon: Banknote, part: "Part 2", title: "The Cash Flow Breakthrough", desc: "Real numbers: mortgage, strata, rental income, and how rents rising 5–8%/yr flip the math in your favour." },
  { icon: MapPin, part: "Part 3", title: "Neighbourhoods & Opportunities", desc: "Surrey, Langley, and Abbotsford — with current pricing, appreciation potential, and the best areas in each." },
  { icon: Workflow, part: "Part 4", title: "Investment Strategies by Budget", desc: "The Appreciation Play, the Cash Flow Play, and the Hybrid Play — each with real numbers." },
  { icon: Building2, part: "Part 5", title: "Developer Risk & How to Protect Yourself", desc: "How to tell Tier-1 from weak developers, and how to protect your deposit." },
  { icon: HelpCircle, part: "Part 6", title: "The Full FAQ — 20+ Questions Answered", desc: "Mortgages, strata, assignment, closing costs, CMHC insurance, and more." },
  { icon: ClipboardList, part: "Part 7", title: "10-Step Action Plan", desc: "Week-by-week roadmap from pre-approval to signed contract." },
  { icon: AlertTriangle, part: "Part 8", title: "The Closing Window", desc: "Why 2026 is the last year to access public inventory at below-build-cost pricing." },
];

const neighborhoods = [
  { name: "Surrey City Centre", tag: "SkyTrain Today", range: "$450K–$750K", note: "SFU, hospital, city hall anchors" },
  { name: "King George Corridor", tag: "Best Value", range: "$450K–$650K", note: "10–15% cheaper than City Centre" },
  { name: "Langley City Centre", tag: "SkyTrain Coming", range: "$400K–$550K", note: "20–30% appreciation potential" },
  { name: "Willoughby, Langley", tag: "Established", range: "$450K–$600K", note: "Top schools, family-friendly" },
  { name: "Abbotsford", tag: "Cash Flow Play", range: "$350K–$480K", note: "Near break-even from day one" },
];

const stats = [
  { value: "26%", label: "Price decline since 2022 peak" },
  { value: "$150K–$200K", label: "Townhome discount from peak" },
  { value: "$47K", label: "Tax savings for first-time buyers" },
  { value: "2025–26", label: "SkyTrain extension to Langley opens" },
];

// ─── Component ────────────────────────────────────────────────────────────────

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
        <title>2026 Fraser Valley Presale Buyer's Guide | Free Download</title>
        <meta
          name="description"
          content="Download the free 2026 Fraser Valley Presale Buyer's Guide. Discover why developers are selling below build cost and how to capitalize on the historic opportunity."
        />
        <link rel="canonical" href="https://presalewithuzair.com/presale-guide" />
      </Helmet>

      <div className="min-h-screen bg-background">

        {/* ── Sticky Navbar ── */}
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border py-3 px-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <a href="/"><img src={logoImage} alt="Uzair Presales" className="h-8" /></a>
            <Button variant="hero" size="sm" onClick={scrollToForm} className="text-xs sm:text-sm">
              <Download className="h-3.5 w-3.5 mr-1.5" />
              Download Free Guide
            </Button>
          </div>
        </header>

        {/* ── Hero ── */}
        <section className="relative overflow-hidden pt-14 pb-20 px-4">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/6 via-background to-background pointer-events-none" />

          <div className="relative max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 items-center">

              {/* Left copy */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <span className="inline-block text-xs font-bold tracking-widest text-primary uppercase mb-4">
                  Free Download · 2026 Edition
                </span>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-5">
                  The 2026 Fraser Valley<br />
                  <span className="text-primary">Presale Buyer's Guide</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                  For the first time in a decade, developers are selling presales <strong className="text-foreground">below build cost</strong>. Low-rise construction that sold for <strong className="text-foreground">$950/sqft in 2022</strong> now sells for <strong className="text-foreground">$700/sqft</strong> — a 26% collapse. Townhomes are down $150K–$200K from peak.
                </p>
                <p className="text-base text-muted-foreground mb-8">
                  This guide explains exactly why this happened, which neighbourhoods to buy in, how the cash flow math works, and how to close before the window shuts in late 2026.
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

              {/* Right image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="hidden lg:block"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img src={presaleBuilding} alt="Fraser Valley Presale" className="w-full aspect-[4/3] object-cover" />
                  <div className="absolute bottom-5 left-5 right-5 bg-background/90 backdrop-blur rounded-xl p-4 border border-border">
                    <p className="text-xs text-primary font-bold tracking-wide uppercase mb-1">Historic Opportunity</p>
                    <p className="text-sm text-foreground font-semibold">Developers selling below build cost · Cash flow from day one · Window closing late 2026</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Stats Bar ── */}
        <section className="py-10 px-4 bg-primary/8 border-y border-primary/20">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                >
                  <p className="font-display text-2xl sm:text-3xl font-bold text-primary mb-1">{s.value}</p>
                  <p className="text-xs text-muted-foreground leading-snug">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6 Key Highlights ── */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-xs font-bold tracking-widest text-primary uppercase mb-3 block">Why 2026 Is Different</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                The 6 Reasons This Is a Historic Buying Opportunity
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
                  className="bg-card rounded-xl p-6 border border-border hover:border-primary/40 transition-colors"
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
        <section className="py-20 px-4 bg-card/40 border-y border-border">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-xs font-bold tracking-widest text-primary uppercase mb-3 block">Inside the Guide</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">What You'll Learn</h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                8 comprehensive parts — from the market collapse to your signed contract.
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
                  className="flex gap-4 p-5 bg-background rounded-xl border border-border"
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

        {/* ── Urgency: The Window Is Closing ── */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive border border-destructive/30 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase mb-6">
                <AlertTriangle className="h-3.5 w-3.5" />
                Window Closing Late 2026
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
                60–70% of the Best Inventory Will Be Gone by Late 2026
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                VIP buyers (those on developer lists) get early access, VIP pricing (10–15% below public launch), and $10K–$25K in buyer incentives. Public buyers — right now, that's still you — see the remaining 30–40% at public pricing. Once developer desperation fades and financing normalises, discounts disappear.
              </p>
              <p className="text-foreground font-semibold">
                This guide shows you exactly how to act before that happens.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Neighbourhoods ── */}
        <section className="py-16 px-4 bg-card/40 border-y border-border">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <span className="text-xs font-bold tracking-widest text-primary uppercase mb-3 block">Where to Buy</span>
              <h2 className="font-display text-3xl font-bold text-foreground">Featured Neighbourhoods</h2>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-4">
              {neighborhoods.map((n, i) => (
                <motion.div
                  key={n.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-background border border-border rounded-xl px-5 py-4 flex-1 min-w-[180px] max-w-[220px]"
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <MapPin className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                    <span className="text-xs font-bold text-primary uppercase tracking-wide">{n.tag}</span>
                  </div>
                  <p className="font-semibold text-foreground text-sm mb-1">{n.name}</p>
                  <p className="text-xs text-muted-foreground">Presale: <span className="text-foreground font-medium">{n.range}</span></p>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.note}</p>
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
                  In the meantime, Uzair may reach out personally to walk you through any questions.
                </p>
                <a href="/"><Button variant="outline" size="lg">← Back to Main Site</Button></a>
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
                    Fill in your details and we'll email the full 2026 guide to you right away.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
                  <form onSubmit={handleSubmit} className="space-y-4">
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
                        <><Loader2 className="h-5 w-5 animate-spin mr-2" />Submitting...</>
                      ) : (
                        <><Download className="h-5 w-5 mr-2" />Send Me the Guide</>
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
