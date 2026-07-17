import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import logo from "@/assets/logo.png";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Uzair" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const cityLinks = [
  { href: "/surrey", label: "Surrey" },
  { href: "/langley", label: "Langley" },
  { href: "/abbotsford", label: "Abbotsford" },
  { href: "/coquitlam", label: "Coquitlam" },
  { href: "/delta", label: "Delta" },
  { href: "/burnaby", label: "Burnaby" },
  { href: "/chilliwack", label: "Chilliwack" },
  { href: "/maple-ridge", label: "Maple Ridge" },
];

const trackBookCall = (loc: string) => {
  try { (window as any).gtag?.("event", "book_call", { location: loc }); } catch {}
};

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPresalesOpen, setIsPresalesOpen] = useState(false);
  const [isMobilePresalesOpen, setIsMobilePresalesOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isLightPage = ["/blog", "/about", "/services", "/contact", "/book"].some(
    (p) => location.pathname === p || location.pathname.startsWith("/blog/")
  ) || location.pathname.startsWith("/projects/");
  const isDarkHeroPage = location.pathname === "/" || location.pathname === "/call";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsPresalesOpen(false);
    setIsMobilePresalesOpen(false);
  }, [location]);

  const handleFormCTA = () => {
    trackBookCall("navbar_mobile");
    if (location.pathname === '/') {
      document.getElementById('book-section')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/?scroll=book-section');
    }
    setIsMobileMenuOpen(false);
  };

  const handleGuideClick = () => {
    setIsMobileMenuOpen(false);
    if (location.pathname === '/') {
      window.dispatchEvent(new CustomEvent('open-presale-guide'));
    } else {
      navigate('/?open-guide=1');
    }
  };

  const navBg = isScrolled
    ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-lg"
    : isLightPage
    ? "bg-background border-b border-border/60"
    : isDarkHeroPage
    ? "bg-[hsl(var(--sidebar-background))]"
    : "bg-transparent";

  const shouldUseDarkNavContent = isScrolled || isLightPage;

  const linkColor = (active: boolean) =>
    active
      ? shouldUseDarkNavContent
        ? "text-foreground font-semibold"
        : "text-white font-semibold"
      : shouldUseDarkNavContent
      ? "text-foreground/70 hover:text-foreground"
      : "text-white/70 hover:text-white";

  const logoClassName = shouldUseDarkNavContent
    ? "h-8 md:h-10 w-auto brightness-0"
    : "h-8 md:h-10 w-auto";

  const presalesActive = cityLinks.some((c) => location.pathname === c.href);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      <div className="container-xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Presale with Uzair" className={logoClassName} />
          </Link>

          {/* Mobile menu toggle */}
          <div className="flex lg:hidden items-center">
            <button
              className={`p-2 transition-colors ${shouldUseDarkNavContent ? "text-foreground" : "text-white"}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors duration-300 ${linkColor(location.pathname === "/")}`}
            >
              Home
            </Link>

            {/* Presales dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsPresalesOpen(true)}
              onMouseLeave={() => setIsPresalesOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsPresalesOpen((v) => !v)}
                className={`flex items-center gap-1 text-sm font-medium transition-colors duration-300 ${linkColor(presalesActive)}`}
                aria-haspopup="true"
                aria-expanded={isPresalesOpen}
              >
                Presales
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isPresalesOpen ? "rotate-180" : ""}`} />
              </button>
              {isPresalesOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 min-w-[220px]">
                  <div className="bg-background border border-border shadow-xl rounded-xl py-2">
                    {cityLinks.map((c) => (
                      <Link
                        key={c.href}
                        to={c.href}
                        className={`block px-4 py-2 text-sm transition-colors ${
                          location.pathname === c.href
                            ? "text-primary font-semibold bg-primary/5"
                            : "text-foreground/80 hover:text-foreground hover:bg-muted"
                        }`}
                      >
                        {c.label} Presales
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors duration-300 ${linkColor(location.pathname === link.href)}`}
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
              className="rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 gap-2"
              onClick={handleFormCTA}
            >
              <Phone className="h-4 w-4" />
              Book Strategy Call
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-white backdrop-blur-lg border-b border-border transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="container-xl py-6 space-y-2 max-h-[80vh] overflow-y-auto">
          <Link
            to="/"
            className={`block text-lg font-medium py-2 transition-colors ${
              location.pathname === "/" ? "text-foreground font-bold" : "text-foreground/70 hover:text-foreground"
            }`}
          >
            Home
          </Link>

          {/* Mobile Presales expandable */}
          <div>
            <button
              type="button"
              onClick={() => setIsMobilePresalesOpen((v) => !v)}
              className={`w-full flex items-center justify-between text-lg font-medium py-2 transition-colors ${
                presalesActive ? "text-foreground font-bold" : "text-foreground/70 hover:text-foreground"
              }`}
              aria-expanded={isMobilePresalesOpen}
            >
              <span>Presales</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isMobilePresalesOpen ? "rotate-180" : ""}`} />
            </button>
            {isMobilePresalesOpen && (
              <div className="pl-4 py-2 space-y-1 border-l-2 border-primary/20 ml-1">
                {cityLinks.map((c) => (
                  <Link
                    key={c.href}
                    to={c.href}
                    className={`block text-base py-1.5 transition-colors ${
                      location.pathname === c.href
                        ? "text-primary font-semibold"
                        : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.slice(1).map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`block text-lg font-medium py-2 transition-colors ${
                location.pathname === link.href
                  ? "text-foreground font-bold"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-4 space-y-3">
            <Button variant="hero" size="lg" className="w-full rounded-full gap-2" onClick={handleFormCTA}>
              <Phone className="h-4 w-4" />
              Book Strategy Call
            </Button>
            <Button variant="outline" size="lg" className="w-full rounded-full" onClick={handleGuideClick}>
              Get Presale Guide
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
