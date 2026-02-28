import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Uzair" },
  { href: "/services", label: "Services" },
  // { href: "/developers", label: "Developers" },
  // { href: "/agents", label: "Agents" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleBookClick = () => {
    if (location.pathname === '/') {
      // On homepage, scroll to booking section
      document.getElementById('book-section')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // On other pages, navigate to /book
      navigate('/book');
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`dark-section fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-lg"
          : "bg-background lg:bg-transparent"
      }`}
    >
      {/* Gold accent stripe */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-80" />
      <div className="container-xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={logo} 
              alt="Presale with Uzair" 
              className="h-8 md:h-10 w-auto" 
            />
          </Link>

          {/* Mobile CTA + Menu */}
          <div className="flex lg:hidden items-center gap-3">
            <Button 
              variant="hero" 
              size="sm" 
              className="rounded-full px-4 py-2 text-sm font-semibold shadow-[0_0_20px_rgba(212,163,22,0.4)] hover:shadow-[0_0_30px_rgba(212,163,22,0.6)] transition-shadow duration-300"
              onClick={handleBookClick}
            >
              Book a Discovery Call
            </Button>
            <button
              className="p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors duration-300 hover:text-primary ${
                  location.pathname === link.href
                    ? "text-primary"
                    : "text-foreground/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Button 
              variant="hero" 
              size="lg" 
              className="rounded-full shadow-[0_0_20px_rgba(212,163,22,0.4)] hover:shadow-[0_0_30px_rgba(212,163,22,0.6)] transition-shadow duration-300"
              onClick={handleBookClick}
            >
              Book a Discovery Call
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-lg border-b border-border transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="container-xl py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`block text-lg font-medium py-2 transition-colors ${
                location.pathname === link.href
                  ? "text-primary"
                  : "text-foreground/80 hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4">
            <Button 
              variant="hero" 
              size="lg" 
              className="w-full rounded-full"
              onClick={handleBookClick}
            >
              Book a Discovery Call
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};