import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Clock, Award, CheckCircle2, FlameKindling, Zap, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ServiceCard } from "@/components/ServiceCard";
import { useSEO } from "@/hooks/use-seo";

export default function Home() {
  useSEO({
    title: "Brandon Fire & Safety Equipment Co Inc | Commercial Fire Protection Services",
    description: "Professional fire safety services including extinguisher inspections, suppression systems, emergency lighting, and code compliance solutions in Tampa, FL.",
    ogImage: "/hero-bg.png",
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-bg.png" 
            alt="Commercial fire safety equipment" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/30 dark:from-background dark:via-background/90 dark:to-background/50" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20 backdrop-blur-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>Licensed & Insured in Florida</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-display leading-tight mb-6 text-foreground drop-shadow-sm">
                Protecting Businesses & Properties With <span className="text-primary">Professional</span> Fire Safety Solutions
              </h1>
              <p className="text-lg md:text-xl text-foreground/80 mb-10 max-w-2xl leading-relaxed">
                Trusted fire protection services including inspections, extinguishers, suppression systems, emergency lighting, and code compliance solutions for commercial properties in Tampa, FL.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-base font-semibold shadow-xl" data-testid="button-hero-call">
                  <a href="tel:8136578888">
                    Call Now: (813) 657-8888
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-base font-semibold bg-background/50 backdrop-blur-sm hover:bg-background/80" data-testid="button-hero-request">
                  <Link to="/contact">
                    Request Info <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-card border-y relative z-20 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10">
            {[
              { icon: <Award className="w-8 h-8" />, title: "Years of Experience", text: "Trusted local experts" },
              { icon: <ShieldCheck className="w-8 h-8" />, title: "Fully Licensed", text: "& Insured in FL" },
              { icon: <Clock className="w-8 h-8" />, title: "Fast Response", text: "When you need us" },
              { icon: <CheckCircle2 className="w-8 h-8" />, title: "Free Estimates", text: "On new installations" },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex flex-col items-center text-center gap-3 group"
              >
                <div className="text-primary group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Teaser */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-display font-bold mb-6 tracking-tight">Our Core Services</h2>
              <p className="text-lg text-muted-foreground">
                Comprehensive fire protection solutions tailored to your business needs, ensuring total compliance and safety.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              index={0}
              icon={<FlameKindling className="w-7 h-7" />}
              title="Fire Extinguisher Services"
              description="Complete inspection, testing, recharging, and certification of all commercial fire extinguishers."
            />
            <ServiceCard 
              index={1}
              icon={<Flame className="w-7 h-7" />}
              title="Suppression Systems"
              description="Installation and maintenance of kitchen hood and industrial fire suppression systems."
            />
            <ServiceCard 
              index={2}
              icon={<Zap className="w-7 h-7" />}
              title="Emergency Exit Lighting"
              description="Monthly and annual testing, battery replacement, and repair of emergency exit signs."
            />
          </div>

          <div className="mt-16 text-center">
            <Button asChild variant="outline" size="lg" className="font-semibold" data-testid="button-all-services">
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-display font-bold mb-6">Need an Inspection or Service?</h2>
            <p className="text-xl text-primary-foreground/90 mb-10">
              Don't wait until it's too late. Ensure your business is compliant and protected today with Brandon Fire & Safety Equipment Co Inc.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="font-semibold shadow-lg" data-testid="button-cta-call">
                <a href="tel:8136578888">
                  Call (813) 657-8888
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-semibold bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary" data-testid="button-cta-contact">
                <Link to="/contact">Get Directions</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
