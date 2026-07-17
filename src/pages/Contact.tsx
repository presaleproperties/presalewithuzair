import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, MessageCircle, Clock, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import uzairImage from "@/assets/uzair-expo-profile.jpg";

const Contact = () => {
  const navigate = useNavigate();
  const handleCTA = () => navigate('/?scroll=book-section');

  return (
    <>
      <Helmet>
        <title>Contact Uzair Muhammad | Fraser Valley Presale Expert</title>
        <meta
          name="description"
          content="Book a free presale strategy call with Uzair Muhammad — Fraser Valley's leading new construction buyer's agent. Available in English, Punjabi, Hindi, and Urdu."
        />
        <meta name="keywords" content="contact presale expert, Vancouver presale agent contact, book presale consultation, presale advisor Vancouver, Fraser Valley presale agent" />
        <link rel="canonical" href="https://presalewithuzair.com/contact" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://presalewithuzair.com/contact" />
        <meta property="og:title" content="Contact Uzair Muhammad | Fraser Valley Presale Expert" />
        <meta property="og:description" content="Book a free presale strategy call with Uzair Muhammad — Fraser Valley's leading new construction buyer's agent. Available in English, Punjabi, Hindi, and Urdu." />
        <meta property="og:image" content="https://presalewithuzair.com/og-image.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Uzair Muhammad | Fraser Valley Presale Expert" />
        <meta name="twitter:description" content="Book a free presale strategy call with Uzair Muhammad — Fraser Valley's leading new construction buyer's agent." />
        <meta name="twitter:image" content="https://presalewithuzair.com/og-image.jpg" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "mainEntity": {
              "@type": "Person",
              "name": "Uzair Muhammad",
              "telephone": "+1-778-231-3592",
              "email": "info@meetuzair.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "3211 152 St, Building C",
                "addressLocality": "Surrey",
                "addressRegion": "BC",
                "postalCode": "V3Z 1H8",
                "addressCountry": "CA"
              }
            }
          })}
        </script>
      </Helmet>

      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 bg-card">
          <div className="container-xl">
            <div className="max-w-3xl">
              <p className="section-label mb-4 animate-fade-up">Get In Touch</p>
              <h1 className="font-display text-5xl lg:text-6xl font-bold text-foreground animate-fade-up delay-100">
                Let's find the right presale <span className="text-gradient">before you commit.</span>
              </h1>
              <p className="mt-6 text-xl text-foreground/80 animate-fade-up delay-200">
                If you're thinking about a presale condo, townhome, or new-construction home, start here. Send me your budget, preferred cities, timeline, and whether you're buying to live in or invest. I'll help you understand what's worth looking at — and what's worth avoiding.
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
                  Reach <span className="text-gradient">Out</span>
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
                      <p className="text-muted-foreground text-sm mb-2">Fastest response time for quick questions.</p>
                      <p className="text-primary font-medium">Chat on WhatsApp</p>
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
                      <p className="text-muted-foreground text-sm mb-2">Call me directly.</p>
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
                      <p className="text-muted-foreground text-sm mb-2">Send a detailed inquiry or project question.</p>
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
                        3211 152 St, Building C<br />
                        Surrey, BC V3Z 1H8
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-card rounded-2xl overflow-hidden border border-border">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={uzairImage} 
                    alt="Uzair Muhammad" 
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-8 lg:p-12">
                <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                  Get Clear Guidance
                </h3>
                <p className="text-foreground/70 mb-8">
                  Whether you're exploring your first presale or have questions about a specific project, 
                  I'm here to provide honest advice — not a sales pitch.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-foreground/80">
                    <Clock className="h-5 w-5 text-primary" />
                    <span>Typically responds within 2 hours.</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground/80">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    <span>Zero obligation — just an honest conversation.</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button 
                    variant="hero" 
                    size="xl" 
                    className="w-full gap-2"
                    onClick={handleCTA}
                  >
                    <Mail className="h-5 w-5" />
                    Work With Uzair
                  </Button>
                  <a href="https://presaleproperties.com" target="_blank" rel="noopener" className="block">
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
                      <p className="text-2xl font-display font-bold text-gradient">450+</p>
                      <p className="text-xs text-muted-foreground">Units Sold</p>
                    </div>
                    <div>
                      <p className="text-2xl font-display font-bold text-gradient">$200M+</p>
                      <p className="text-xs text-muted-foreground">in Sales Volume</p>
                    </div>
                    <div>
                      <p className="text-2xl font-display font-bold text-gradient">5 Yrs</p>
                      <p className="text-xs text-muted-foreground">in Presale Market</p>
                    </div>
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
