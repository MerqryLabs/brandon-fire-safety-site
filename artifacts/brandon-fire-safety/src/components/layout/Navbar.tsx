import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Flame } from "lucide-react";
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
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm border-b" : "bg-background"
      }`}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group" data-testid="link-logo">
          <div className="bg-primary p-2 rounded-lg group-hover:bg-primary/90 transition-colors">
            <Flame className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-foreground">
            Brandon Fire & Safety
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
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-4">
            <div className="text-right hidden lg:block">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">24/7 Emergency</p>
              <a href="tel:8136578888" className="font-display font-bold text-foreground hover:text-primary transition-colors">
                (813) 657-8888
              </a>
            </div>
            <Button asChild size="lg" className="font-semibold shadow-md hover:shadow-lg transition-all" data-testid="button-nav-call">
              <a href="tel:8136578888">Call Now</a>
            </Button>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
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
            className="md:hidden bg-background border-b overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <ul className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        data-testid={`link-mobile-nav-${link.name.toLowerCase()}`}
                        className={`block py-3 text-lg font-medium border-b border-border/50 ${
                          isActive ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="pt-4 flex flex-col gap-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-1">24/7 Emergency</p>
                  <a href="tel:8136578888" className="font-display font-bold text-2xl text-foreground">
                    (813) 657-8888
                  </a>
                </div>
                <Button asChild size="lg" className="w-full font-semibold" data-testid="button-mobile-call">
                  <a href="tel:8136578888">Call Now</a>
                </Button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
