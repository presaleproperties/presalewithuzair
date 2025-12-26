import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container-xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/">
              <img src={logo} alt="Presale with Uzair" className="h-10 w-auto mb-6" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Vancouver's Top Presale Expert. Specializing in presale condos, assignments, and new construction investments.
            </p>
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
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-foreground">Services</h4>
            <ul className="space-y-3">
              {[
                "Presale Condos",
                "Presale Assignments",
                "Resale Properties",
                "Portfolio Management",
              ].map((service) => (
                <li key={service}>
                  <span className="text-muted-foreground text-sm">{service}</span>
                </li>
              ))}
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
                  <a href="mailto:uzair@presalewithuzair.com" className="text-foreground hover:text-primary transition-colors">
                    uzair@presalewithuzair.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Office</p>
                  <p className="text-foreground text-sm">
                    666 Burrard St, Suite 500<br />
                    Vancouver, BC V6C 3P6
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Uzair Muhammad PREC | Real Broker. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Vancouver's Premier Presale Expert
          </p>
        </div>
      </div>
    </footer>
  );
};
