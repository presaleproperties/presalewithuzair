import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";
import realBrokerLogo from "@/assets/real-broker-logo.avif";

const trackPhone = () => { try { (window as any).gtag?.("event", "click_phone", { location: "footer" }); } catch {} };
const trackWa = () => { try { (window as any).gtag?.("event", "click_whatsapp", { location: "footer" }); } catch {} };

export const Footer = () => {
  return (
    <footer className="dark-section relative overflow-hidden">
      {/* Deep navy gradient background — matches hero aesthetic */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(222_25%_8%)] via-[hsl(222_25%_6%)] to-[hsl(222_25%_4%)]" />

      {/* Subtle blue ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-[15%] w-[400px] h-[200px] rounded-full bg-primary/6 blur-[120px]" />
        <div className="absolute bottom-0 right-[10%] w-[300px] h-[150px] rounded-full bg-blue-400/4 blur-[100px]" />
      </div>

      {/* Blue accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container-xl relative z-10 py-10 md:py-16 px-5 sm:px-8 lg:px-16">

        {/* ── Mobile ── */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-8">
            <Link to="/">
              <img src={logo} alt="Presale with Uzair" className="h-12 w-auto" />
            </Link>
            <div className="flex items-center gap-2.5">
              <a
                href="tel:+17782313592"
                onClick={trackPhone}
                className="w-10 h-10 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/15 hover:text-white transition-all"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/17782313592"
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackWa}
                className="w-10 h-10 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/15 hover:text-white transition-all"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href="mailto:info@meetuzair.com"
                className="w-10 h-10 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/15 hover:text-white transition-all"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2.5 mb-8 text-sm">
            <Link to="/about" className="text-white/50 hover:text-primary transition-colors">About</Link>
            <Link to="/services" className="text-white/50 hover:text-primary transition-colors">Services</Link>
            <Link to="/blog" className="text-white/50 hover:text-primary transition-colors">Blog</Link>
            <Link to="/contact" className="text-white/50 hover:text-primary transition-colors">Contact</Link>
            <Link to="/book" className="text-white font-medium hover:text-primary transition-colors">Book a Call</Link>
            <a
              href="https://presaleproperties.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-primary transition-colors"
            >
              Search Projects
            </a>
          </div>

          <div className="flex items-center gap-2.5 mb-5">
            <span className="text-white text-xs">Brokered by</span>
            <img src={realBrokerLogo} alt="Real Broker" className="h-5 w-auto brightness-200 opacity-100" />
          </div>

          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Uzair Muhammad PREC. All rights reserved.
          </p>
        </div>

        {/* ── Desktop ── */}
        <div className="hidden md:block">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link to="/" className="inline-block mb-5">
                <img src={logo} alt="Presale with Uzair" className="h-14 w-auto" />
              </Link>
              <p className="text-white/50 text-sm leading-relaxed mb-5">
                Fraser Valley's Top Presale Expert. Specializing in presale condos, assignments, and new construction investments.
              </p>
              <div className="flex items-center gap-2 mb-5">
                <span className="text-white text-xs">Brokered by</span>
                <img src={realBrokerLogo} alt="Real Broker" className="h-6 w-auto brightness-200 opacity-100" />
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://wa.me/17782313592"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-white/60 hover:bg-primary/20 hover:text-primary hover:border-primary/30 transition-all duration-300"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
                <a
                  href="https://www.instagram.com/presalewithuzair"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-white/60 hover:bg-primary/20 hover:text-primary hover:border-primary/30 transition-all duration-300"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display text-sm font-bold tracking-[0.15em] uppercase text-white/80 mb-6">Quick Links</h4>
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
                          ? "text-primary font-medium hover:text-primary/80"
                          : "text-white/50 hover:text-white transition-colors"
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
                    className="text-white/50 hover:text-white transition-colors text-sm"
                  >
                    Search Presale Projects ↗
                  </a>
                </li>
              </ul>
            </div>

            {/* Cities */}
            <div>
              <h4 className="font-display text-sm font-bold tracking-[0.15em] uppercase text-white/80 mb-6">Cities</h4>
              <ul className="space-y-3">
                {[
                  { href: "/surrey", label: "Surrey" },
                  { href: "/langley", label: "Langley" },
                  { href: "/abbotsford", label: "Abbotsford" },
                  { href: "/coquitlam", label: "Coquitlam" },
                  { href: "/delta", label: "Delta" },
                  { href: "/burnaby", label: "Burnaby" },
                  { href: "/chilliwack", label: "Chilliwack" },
                  { href: "/maple-ridge", label: "Maple Ridge" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-white/50 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display text-sm font-bold tracking-[0.15em] uppercase text-white/80 mb-6">Contact</h4>
              <ul className="space-y-5">
                <li className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-primary mt-1 shrink-0" />
                  <div>
                    <p className="text-xs text-white/40 mb-0.5">Phone</p>
                    <a href="tel:+17782313592" className="text-sm text-white/80 hover:text-white transition-colors">
                      +1 (778) 231-3592
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-primary mt-1 shrink-0" />
                  <div>
                    <p className="text-xs text-white/40 mb-0.5">Email</p>
                    <a href="mailto:info@meetuzair.com" className="text-sm text-white/80 hover:text-white transition-colors">
                      info@meetuzair.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-primary mt-1 shrink-0" />
                  <div>
                    <p className="text-xs text-white/40 mb-0.5">Office</p>
                    <p className="text-sm text-white/80">
                      3211 152 St, Building C<br />
                      Surrey, BC V3Z 1H8
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-xs text-white/30">
              © {new Date().getFullYear()} Uzair Muhammad PREC | Brokered by Real Broker. All rights reserved.
            </p>
            <p className="text-xs text-white/30">
              Fraser Valley's Premier Presale Expert
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
