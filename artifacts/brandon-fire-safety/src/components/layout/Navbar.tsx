import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Reviews", href: "/reviews" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-navbar/97 backdrop-blur-md shadow-lg shadow-black/30"
          : "bg-navbar"
      }`}
    >
      <div className={`container mx-auto px-4 flex items-center justify-between transition-all duration-300 ${isScrolled ? "h-20" : "h-28"}`}>
        <Link to="/" className="flex items-center gap-3 group" data-testid="link-logo">
          <img
            src="/logo.png"
            alt="Brandon Fire & Safety logo"
            className={`rounded-lg object-contain bg-white transition-all duration-300 ${isScrolled ? "h-12 w-12" : "h-16 w-16"}`}
          />
          <span className={`font-display font-bold tracking-tight text-white transition-all duration-300 ${isScrolled ? "text-lg" : "text-2xl"}`}>
            Brandon Fire & Safety Equipment Co Inc
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    data-testid={`link-nav-${link.name.toLowerCase()}`}
                    className={`text-sm font-medium transition-colors ${
                      isActive
                        ? "text-primary"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-3">
            <div className="text-right hidden lg:block">
              <p className="text-xs text-white/50 font-medium uppercase tracking-wider">24/7 Emergency</p>
              <a href="tel:8136519191" className="font-display font-bold text-white hover:text-primary transition-colors">
                (813) 651-9191
              </a>
            </div>
            <Button
              asChild
              size="lg"
              className="font-semibold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/40 border-0"
              data-testid="button-nav-call"
            >
              <a href="tel:8136519191">
                <Phone className="w-4 h-4 mr-1.5" />
                Call Now
              </a>
            </Button>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          data-testid="button-mobile-menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-navbar border-t border-white/10 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        data-testid={`link-mobile-nav-${link.name.toLowerCase()}`}
                        className={`block py-3 text-lg font-medium border-b border-white/10 ${
                          isActive ? "text-primary" : "text-white/80"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="pt-4 flex flex-col gap-3">
                <div className="text-center">
                  <p className="text-sm text-white/50 font-medium uppercase tracking-wider mb-1">24/7 Emergency</p>
                  <a href="tel:8136519191" className="font-display font-bold text-2xl text-white">
                    (813) 651-9191
                  </a>
                </div>
                <Button asChild size="lg" className="w-full font-semibold bg-primary hover:bg-primary/90 text-white border-0" data-testid="button-mobile-call">
                  <a href="tel:8136519191">Call Now</a>
                </Button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
