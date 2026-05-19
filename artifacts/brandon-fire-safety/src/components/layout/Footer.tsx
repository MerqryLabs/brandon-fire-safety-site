import { Link } from "react-router-dom";
import { MapPin, Phone, Clock, ShieldCheck, Flame } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group" data-testid="link-footer-logo">
              <div className="bg-primary p-2 rounded-lg">
                <Flame className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">
                Brandon Fire & Safety Equipment Co Inc
              </span>
            </Link>
            <p className="text-secondary-foreground/80 leading-relaxed">
              Professional commercial fire safety and protection services you can trust. Fully licensed, insured, and dedicated to keeping your business safe and compliant.
            </p>
            <div className="flex items-center gap-2 text-primary font-medium">
              <ShieldCheck className="w-5 h-5" />
              <span>Licensed & Insured in Florida</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-6 tracking-tight">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Services", href: "/services" },
                { name: "Customer Reviews", href: "/reviews" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-secondary-foreground/80 hover:text-white transition-colors"
                    data-testid={`link-footer-${link.name.toLowerCase().replace(" ", "-")}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-6 tracking-tight">Core Services</h3>
            <ul className="space-y-3">
              {[
                "Extinguisher Inspections",
                "Suppression Systems",
                "Kitchen Hood Systems",
                "Emergency Lighting",
                "Code Compliance",
              ].map((service) => (
                <li key={service} className="text-secondary-foreground/80">
                  {service}
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Link to="/services" className="text-primary hover:text-primary/80 font-medium transition-colors">
                View all services &rarr;
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-6 tracking-tight">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-secondary-foreground/80">
                <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white mb-1">Phone</p>
                  <a href="tel:8136578888" className="hover:text-primary transition-colors" data-testid="link-footer-phone">
                    (813) 657-8888
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-secondary-foreground/80">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white mb-1">Address</p>
                  <p>4107 Cragmont Drive<br />Tampa, FL 33610</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-secondary-foreground/80">
                <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white mb-1">Hours</p>
                  <p>Mon - Fri: 9:00 AM – 5:00 PM</p>
                  <p>Sat - Sun: Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-secondary-foreground/60 text-sm">
            &copy; {currentYear} Brandon Fire & Safety Equipment Co Inc. All rights reserved.
          </p>
          <p className="text-secondary-foreground/60 text-sm">
            Serving Tampa, FL and surrounding areas.
          </p>
        </div>
      </div>
    </footer>
  );
}
