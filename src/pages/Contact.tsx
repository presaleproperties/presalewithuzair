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
        <section className="relative pt-32 pb-20 bg-card border-b border-border/40">
          <div className="container-xl">
            <div className="max-w-3xl">
              <p className="eyebrow mb-4 animate-fade-up">Get In Touch</p>
              <h1 className="h-display text-foreground animate-fade-up delay-100">
                Let's find the right presale before you commit.
              </h1>
              <p className="mt-6 lede animate-fade-up delay-200">
                If you're thinking about a presale condo, townhome, or new-construction home, start here. Send me your budget, preferred cities, timeline, and whether you're buying to live in or invest. I'll help you understand what's worth looking at — and what's worth avoiding.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Options */}
        <section className="section-y bg-background">
          <div className="container-xl">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact Info */}
              <div>
                <h2 className="h-section text-foreground mb-8">
                  Reach out
                </h2>

                <div className="space-y-4">
                  {/* WhatsApp - Primary */}
                  <a
                    href="https://wa.me/17782313592?text=Hi%20Uzair%2C%20I%27m%20interested%20in%20presale%20and%20would%20like%20to%20discuss%20further..."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-5 bg-card rounded-xl border border-border hover:border-primary/40 transition-colors group"
                  >
                    <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div>
                     <p className="font-semibold text-foreground mb-1">WhatsApp (Preferred)</p>
                      <p className="text-muted-foreground text-sm mb-1">Fastest response time for quick questions.</p>
                      <p className="text-primary font-medium text-sm">Chat on WhatsApp</p>
                    </div>
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:+17782313592"
                    className="flex items-start gap-4 p-5 bg-card rounded-xl border border-border hover:border-primary/40 transition-colors group"
                  >
                    <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                     <p className="font-semibold text-foreground mb-1">Phone</p>
                      <p className="text-muted-foreground text-sm mb-1">Call me directly.</p>
                      <p className="text-primary font-medium text-sm">+1 (778) 231-3592</p>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:info@meetuzair.com"
                    className="flex items-start gap-4 p-5 bg-card rounded-xl border border-border hover:border-primary/40 transition-colors group"
                  >
                    <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                     <p className="font-semibold text-foreground mb-1">Email</p>
                      <p className="text-muted-foreground text-sm mb-1">Send a detailed inquiry or project question.</p>
                      <p className="text-primary font-medium text-sm">info@meetuzair.com</p>
                    </div>
                  </a>

                  {/* Office */}
                  <div className="flex items-start gap-4 p-5 bg-card rounded-xl border border-border">
                    <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">Office</p>
                      <p className="text-muted-foreground text-sm mb-1">Real Broker</p>
                      <p className="text-foreground text-sm">
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
                <div className="p-8 lg:p-10">
                <h3 className="h-card text-foreground mb-5">
                  What to include when you reach out
                </h3>
                <p className="text-foreground/70 mb-5 text-sm">
                  A few details help me give you a useful answer instead of a generic one:
                </p>
                <ul className="text-foreground/80 space-y-1.5 mb-8 list-disc pl-5 text-sm">
                  <li>Your budget</li>
                  <li>Preferred city or cities</li>
                  <li>Condo, townhome, or detached</li>
                  <li>First-time buyer, investor, or move-up</li>
                  <li>Ideal move-in timeline</li>
                  <li>Any projects you're already considering</li>
                  <li>Whether you've registered with a sales centre</li>
                </ul>

                <div className="space-y-3 mb-8 text-sm">
                  <div className="flex items-center gap-3 text-foreground/80">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>Typically responds within 2 hours.</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground/80">
                    <MessageCircle className="h-4 w-4 text-primary" />
                    <span>Zero obligation — just an honest conversation.</span>
                  </div>
                </div>

                <Button
                  variant="hero"
                  size="xl"
                  className="w-full gap-2 rounded-full"
                  onClick={handleCTA}
                >
                  <Mail className="h-5 w-5" />
                  Book a Buyer Strategy Call
                </Button>

                {/* Trust Signals */}
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-xl font-display font-bold text-foreground">450+</p>
                      <p className="text-[11px] text-muted-foreground mt-1 uppercase tracking-wider">Units Sold</p>
                    </div>
                    <div>
                      <p className="text-xl font-display font-bold text-foreground">$200M+</p>
                      <p className="text-[11px] text-muted-foreground mt-1 uppercase tracking-wider">Volume</p>
                    </div>
                    <div>
                      <p className="text-xl font-display font-bold text-foreground">5 Yrs</p>
                      <p className="text-[11px] text-muted-foreground mt-1 uppercase tracking-wider">Presale Focus</p>
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
