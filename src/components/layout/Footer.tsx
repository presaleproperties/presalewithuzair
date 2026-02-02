import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";
import realBrokerLogo from "@/assets/real-broker-logo.avif";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container-xl py-8 md:py-16">
        {/* Mobile: Compact stacked layout */}
        <div className="md:hidden">
          {/* Brand & Contact Row */}
          <div className="flex items-center justify-between mb-6">
            <Link to="/">
              <img src={logo} alt="Presale with Uzair" className="h-8 w-auto" />
            </Link>
            <div className="flex items-center gap-3">
              <a
                href="tel:+17782313592"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"
              >
                <Phone className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/17782313592"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="mailto:info@meetuzair.com"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links - Horizontal */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6 text-sm">
            <Link to="/about" className="text-muted-foreground hover:text-primary">About</Link>
            <Link to="/services" className="text-muted-foreground hover:text-primary">Services</Link>
            <Link to="/blog" className="text-muted-foreground hover:text-primary">Blog</Link>
            <Link to="/contact" className="text-muted-foreground hover:text-primary">Contact</Link>
            <Link to="/developers" className="text-muted-foreground hover:text-primary">Developers</Link>
            <Link to="/agents" className="text-muted-foreground hover:text-primary">Agents</Link>
            <Link to="/book" className="text-primary hover:text-primary/80">Book a Call</Link>
            <a
              href="https://presaleproperties.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              Search Projects
            </a>
          </div>

          {/* Brokered by */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-muted-foreground text-xs">Brokered by</span>
            <img src={realBrokerLogo} alt="Real Broker" className="h-5 w-auto" />
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Uzair Muhammad PREC. All rights reserved.
          </p>
        </div>

        {/* Desktop: Full layout */}
        <div className="hidden md:block">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link to="/">
                <img src={logo} alt="Presale with Uzair" className="h-10 w-auto mb-6" />
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Vancouver's Top Presale Expert. Specializing in presale condos, assignments, and new construction investments.
              </p>
              <p className="text-muted-foreground text-xs mb-4">Brokered by Real Broker</p>
              <img src={realBrokerLogo} alt="Real Broker" className="h-8 w-auto mb-6" />
              <div className="flex items-center gap-4">
                <a
                  href="https://wa.me/17782313592"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display text-lg font-semibold mb-6 text-foreground">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { href: "/about", label: "About Uzair" },
                  { href: "/services", label: "Services" },
                  { href: "/blog", label: "Blog" },
                  { href: "/contact", label: "Contact" },
                  { href: "/book", label: "Book a Call", highlight: true },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className={`transition-colors text-sm ${
                        'highlight' in link && link.highlight 
                          ? "text-primary hover:text-primary/80" 
                          : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href="https://presaleproperties.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    Search Presale Projects
                  </a>
                </li>
              </ul>
            </div>

            {/* For Professionals */}
            <div>
              <h4 className="font-display text-lg font-semibold mb-6 text-foreground">For Professionals</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/developers"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    Developer Advisory
                  </Link>
                </li>
                <li>
                  <Link
                    to="/agents"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    Agent Education
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display text-lg font-semibold mb-6 text-foreground">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <a href="tel:+17782313592" className="text-foreground hover:text-primary transition-colors">
                      +1 (778) 231-3592
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a href="mailto:info@meetuzair.com" className="text-foreground hover:text-primary transition-colors">
                      info@meetuzair.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Office</p>
                    <p className="text-foreground text-sm">
                      3211 152 St Building C, Suite 402<br />
                      Surrey, BC V3Z 1H8
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Uzair Muhammad PREC | Brokered by Real Broker. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Vancouver's Premier Presale Expert
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
