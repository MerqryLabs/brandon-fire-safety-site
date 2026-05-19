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
        {/* Animated Fire Background */}
        <div className="absolute inset-0 z-0 bg-navbar">
          {/* Primary red glow — slow pulse */}
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: [0.55, 0.85, 0.6, 0.9, 0.55] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background:
                "radial-gradient(ellipse 75% 65% at 65% 50%, rgba(220,20,20,0.55) 0%, rgba(180,10,10,0.2) 50%, transparent 75%)",
            }}
          />
          {/* Orange ember glow — medium speed */}
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: [0.7, 0.35, 0.75, 0.45, 0.7], x: [0, 20, -10, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            style={{
              background:
                "radial-gradient(ellipse 50% 70% at 75% 60%, rgba(234,88,12,0.4) 0%, transparent 65%)",
            }}
          />
          {/* Amber hot spot — fast flicker */}
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: [0.6, 0.9, 0.5, 0.85, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            style={{
              background:
                "radial-gradient(ellipse 30% 30% at 70% 65%, rgba(251,146,60,0.3) 0%, transparent 55%)",
            }}
          />
          {/* Second red pulse — offset */}
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: [0.3, 0.65, 0.3, 0.7, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 40% 40%, rgba(185,10,10,0.35) 0%, transparent 65%)",
            }}
          />
          {/* Dark left overlay — keeps text legible */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/10" />
          {/* Bottom vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary text-white font-semibold text-sm mb-6 border border-primary/60 shadow-lg shadow-primary/30">
                <ShieldCheck className="w-4 h-4" />
                <span>Licensed & Insured in Florida</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-display leading-tight mb-6 text-white drop-shadow-lg">
                Protecting Businesses &amp; Properties With{" "}
                <span className="text-primary drop-shadow-[0_0_20px_rgba(220,20,20,0.8)]">
                  Professional
                </span>{" "}
                Fire Safety Solutions
              </h1>
              <p className="text-lg md:text-xl text-white/75 mb-10 max-w-2xl leading-relaxed">
                Trusted fire protection services including inspections, extinguishers, suppression systems, emergency lighting, and code compliance solutions for commercial properties in Tampa, FL.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="text-base font-semibold bg-primary hover:bg-primary/90 text-white border-0 shadow-xl shadow-primary/40"
                  data-testid="button-hero-call"
                >
                  <a href="tel:8136578888">Call Now: (813) 657-8888</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-base font-semibold border-white/40 text-white bg-white/10 hover:bg-white/20 hover:border-white/60 backdrop-blur-sm"
                  data-testid="button-hero-request"
                >
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
      <section className="bg-surface border-y border-white/8 relative z-20">
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
                <div className="text-primary group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(220,20,20,0.5)]">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-white/55">{item.text}</p>
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
              <div className="inline-block w-12 h-1 bg-primary rounded-full mb-6" />
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
            <Button asChild variant="outline" size="lg" className="font-semibold border-primary text-primary hover:bg-primary hover:text-white transition-all" data-testid="button-all-services">
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-navbar text-white relative overflow-hidden">
        {/* Subtle red glow background */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(220,20,20,0.6) 0%, transparent 70%)",
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Flame className="w-12 h-12 text-primary mx-auto mb-6 drop-shadow-[0_0_12px_rgba(220,20,20,0.8)]" />
            <h2 className="text-4xl font-display font-bold mb-6">Need an Inspection or Service?</h2>
            <p className="text-xl text-white/75 mb-10">
              Don't wait until it's too late. Ensure your business is compliant and protected today with Brandon Fire & Safety Equipment Co Inc.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="font-semibold bg-primary hover:bg-primary/90 text-white border-0 shadow-xl shadow-primary/40"
                data-testid="button-cta-call"
              >
                <a href="tel:8136578888">Call (813) 657-8888</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="font-semibold border-white/30 text-white hover:bg-white/10 hover:border-white/50"
                data-testid="button-cta-contact"
              >
                <Link to="/contact">Get Directions</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
