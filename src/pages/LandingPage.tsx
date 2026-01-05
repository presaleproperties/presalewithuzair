import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Shield, TrendingUp, Users, Star, X, Phone, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import logoImage from "@/assets/logo.png";

const LandingPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    buyerType: "first-time-buyer",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("capture-lead", {
        body: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          buyerType: formData.buyerType,
          leadSource: "landing-page",
          utmSource: new URLSearchParams(window.location.search).get("utm_source") || undefined,
          utmMedium: new URLSearchParams(window.location.search).get("utm_medium") || undefined,
          utmCampaign: new URLSearchParams(window.location.search).get("utm_campaign") || undefined,
        },
      });

      if (error) throw error;

      setIsSuccess(true);
      toast({
        title: "You're all set!",
        description: "We'll be in touch within 24 hours.",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: Shield,
      title: "Protect Your Investment",
      description: "I've analyzed 330+ presales and know which ones to avoid.",
    },
    {
      icon: TrendingUp,
      title: "Maximize Your Returns",
      description: "Strategic unit selection that builds equity from day one.",
    },
    {
      icon: Users,
      title: "Insider Access",
      description: "First access to projects before they hit the public market.",
    },
  ];

  const testimonials = [
    {
      name: "Michelle T.",
      text: "Uzair helped me navigate my first presale purchase. His knowledge saved me from making costly mistakes.",
      rating: 5,
    },
    {
      name: "Anish P.",
      text: "As an investor, having Uzair analyze deals has been invaluable. He spots risks others miss.",
      rating: 5,
    },
    {
      name: "Baldeep S.",
      text: "Best decision I made was working with a presale specialist. Regular agents don't have this expertise.",
      rating: 5,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Free Presale Strategy Session | Uzair Presales</title>
        <meta
          name="description"
          content="Book your free presale strategy session. Get expert guidance on Vancouver presale condos from BC's #1 presale specialist."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-sky-100 via-white to-orange-50">
        {/* Minimal Header */}
        <header className="py-6 px-4">
          <div className="max-w-6xl mx-auto flex justify-center">
            <img src={logoImage} alt="Uzair Presales" className="h-10" />
          </div>
        </header>

        {/* Hero Section */}
        <section className="px-4 pt-8 pb-16 md:pt-16 md:pb-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              Buy Your Presale
              <br />
              <span className="text-primary">With Confidence.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl md:text-2xl text-gray-600 mb-10"
            >
              Expert guidance for first-time buyers and investors.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button
                size="lg"
                onClick={() => setIsFormOpen(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                Book Free Strategy Session <ArrowRight className="ml-2" />
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-gray-500 text-sm"
            >
              330+ Presales Advised • $1M+ Saved for Clients • 7+ Personal Investments
            </motion.p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="px-4 py-16 bg-white/50">
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              Why Work With a Presale Specialist?
            </h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Presales are complex. The right guidance can save you tens of thousands.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              What My Clients Say
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="px-4 py-16 bg-white/50">
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              How It Works
            </h2>

            <div className="space-y-8">
              {[
                { step: "1", title: "Book Your Call", description: "Quick 15-minute discovery call to understand your goals." },
                { step: "2", title: "Get Your Strategy", description: "Personalized presale strategy based on your budget and timeline." },
                { step: "3", title: "Buy With Confidence", description: "Expert guidance through every step of your purchase." },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-6 items-start"
                >
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="px-4 py-20 bg-gradient-to-b from-orange-50 to-orange-100">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className="text-3xl md:text-5xl font-bold text-gray-900 mb-6"
              style={{ fontFamily: "Raleway, sans-serif" }}
            >
              Ready to Find Your Perfect Presale?
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Book your free strategy session today. No pressure, just expert advice.
            </p>
            <Button
              size="lg"
              onClick={() => setIsFormOpen(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Get Started <ArrowRight className="ml-2" />
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 bg-gray-900 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Uzair Presales • Vancouver's Presale Expert
          </p>
        </footer>
      </div>

      {/* Lead Capture Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 text-center">
              {isSuccess ? "You're All Set! 🎉" : "Book Your Free Session"}
            </DialogTitle>
          </DialogHeader>

          {isSuccess ? (
            <div className="text-center py-6">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <p className="text-gray-600 mb-6">
                We'll reach out within 24 hours to schedule your strategy session.
              </p>
              <Button onClick={() => setIsFormOpen(false)} variant="outline">
                Close
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-gray-700">First Name</Label>
                  <Input
                    id="firstName"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="John"
                    className="mt-1 bg-gray-50 border-gray-200"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
                  <Input
                    id="lastName"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Doe"
                    className="mt-1 bg-gray-50 border-gray-200"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="mt-1 bg-gray-50 border-gray-200"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-gray-700">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(604) 555-0123"
                  className="mt-1 bg-gray-50 border-gray-200"
                />
              </div>

              <div>
                <Label className="text-gray-700 mb-3 block">I am a...</Label>
                <RadioGroup
                  value={formData.buyerType}
                  onValueChange={(value) => setFormData({ ...formData, buyerType: value })}
                  className="flex flex-col gap-3"
                >
                  <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <RadioGroupItem value="first-time-buyer" id="first-time" />
                    <Label htmlFor="first-time" className="cursor-pointer flex-1">First-Time Buyer</Label>
                  </div>
                  <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <RadioGroupItem value="investor" id="investor" />
                    <Label htmlFor="investor" className="cursor-pointer flex-1">Investor</Label>
                  </div>
                  <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className="cursor-pointer flex-1">Other</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 rounded-full text-lg"
              >
                {isSubmitting ? "Submitting..." : "Book My Free Session"}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                No spam. We respect your privacy.
              </p>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LandingPage;
