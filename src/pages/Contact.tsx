import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, MessageCircle, Clock, Search } from "lucide-react";
import { useCalendly } from "@/hooks/useCalendly";

const Contact = () => {
  const { openCalendly } = useCalendly();

  return (
    <>
      <Helmet>
        <title>Contact Uzair Muhammad | Vancouver Presale Expert</title>
        <meta
          name="description"
          content="Get in touch with Uzair Muhammad, Vancouver's top presale expert. Book a consultation to discuss presale condos, assignments, and investment opportunities."
        />
      </Helmet>

      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-card">
          <div className="container-xl">
            <div className="max-w-3xl">
              <p className="section-label mb-4 animate-fade-up">Get In Touch</p>
              <h1 className="font-display text-5xl lg:text-6xl font-bold text-foreground animate-fade-up delay-100">
                Contact <span className="text-gradient">Uzair</span>
              </h1>
              <p className="mt-6 text-xl text-foreground/80 animate-fade-up delay-200">
                Ready to explore presale opportunities? Get in touch to schedule a consultation 
                and discover exclusive investment options in Vancouver.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Options */}
        <section className="py-24 bg-background">
          <div className="container-xl">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Info */}
              <div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-8">
                  Let's <span className="text-gradient">Connect</span>
                </h2>

                <div className="space-y-6">
                  {/* WhatsApp - Primary */}
                  <a
                    href="https://wa.me/17782313592?text=Hi%20Uzair%2C%20I%27m%20interested%20in%20presale%20and%20would%20like%20to%20discuss%20further..."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <MessageCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">WhatsApp (Preferred)</p>
                      <p className="text-muted-foreground text-sm mb-2">Get a quick response</p>
                      <p className="text-primary font-medium">Chat Now</p>
                    </div>
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:+17782313592"
                    className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Phone</p>
                      <p className="text-muted-foreground text-sm mb-2">Call directly</p>
                      <p className="text-primary font-medium">+1 (778) 231-3592</p>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:info@meetuzair.com"
                    className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Email</p>
                      <p className="text-muted-foreground text-sm mb-2">Send a detailed inquiry</p>
                      <p className="text-primary font-medium">info@meetuzair.com</p>
                    </div>
                  </a>

                  {/* Office */}
                  <div className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Office</p>
                      <p className="text-muted-foreground text-sm mb-2">Real Broker</p>
                      <p className="text-foreground">
                        666 Burrard St, Suite 500<br />
                        Vancouver, BC V6C 3P6
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-card rounded-2xl p-8 lg:p-12 border border-border">
                <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                  Book a Consultation
                </h3>
                <p className="text-foreground/70 mb-8">
                  Whether you're a first-time buyer, seasoned investor, or looking to sell your presale, 
                  Uzair is here to help you navigate the Vancouver real estate market.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-foreground/80">
                    <Clock className="h-5 w-5 text-primary" />
                    <span>Typically responds within 2 hours</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground/80">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    <span>Free consultation with no obligation</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button 
                    variant="hero" 
                    size="xl" 
                    className="w-full gap-2"
                    onClick={openCalendly}
                  >
                    <Mail className="h-5 w-5" />
                    Schedule a Call
                  </Button>
                  <a href="https://presaleproperties.com" target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="outline" size="xl" className="w-full gap-2">
                      <Search className="h-5 w-5" />
                      Search Presale Projects
                    </Button>
                  </a>
                </div>

                {/* Trust Signals */}
                <div className="mt-10 pt-8 border-t border-border">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-display font-bold text-gradient">300+</p>
                      <p className="text-xs text-muted-foreground">Units Sold</p>
                    </div>
                    <div>
                      <p className="text-2xl font-display font-bold text-gradient">$200M+</p>
                      <p className="text-xs text-muted-foreground">In Volume</p>
                    </div>
                    <div>
                      <p className="text-2xl font-display font-bold text-gradient">5★</p>
                      <p className="text-xs text-muted-foreground">Rating</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
