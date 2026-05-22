import { motion } from "framer-motion";
import { useSEO } from "@/hooks/use-seo";
import { 
  FlameKindling, Flame, Zap, FileCheck2, Wrench, ShieldCheck, PackageOpen, PackagePlus, Archive, Bell
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Fire Extinguisher Inspection & Service",
    description: "Thorough annual and monthly inspections to ensure every extinguisher is fully charged, properly tagged, and ready for immediate use.",
    icon: <FlameKindling className="w-7 h-7" />
  },
  {
    title: "Fire Extinguisher Recharging",
    description: "Fast, professional recharging after any use or when pressure drops below rated levels — restoring units to full operational status.",
    icon: <Wrench className="w-7 h-7" />
  },
  {
    title: "Hydrostatic Testing",
    description: "Certified hydrostatic pressure testing for fire extinguisher cylinders to meet NFPA 10 and DOT requirements. We test, certify, and document.",
    icon: <FileCheck2 className="w-7 h-7" />
  },
  {
    title: "New Extinguisher Sales",
    description: "We carry and sell new fire extinguishers of all types — ABC dry chemical, CO₂, wet chemical, and more — for any commercial or residential need.",
    icon: <PackagePlus className="w-7 h-7" />
  },
  {
    title: "Reconditioned Extinguisher Sales",
    description: "Quality reconditioned fire extinguishers inspected, recharged, and certified to NFPA standards — a cost-effective alternative to new units.",
    icon: <PackageOpen className="w-7 h-7" />
  },
  {
    title: "Emergency Lighting Installation",
    description: "Professional installation of emergency egress lighting and exit signs to meet code requirements for commercial and industrial facilities.",
    icon: <Zap className="w-7 h-7" />
  },
  {
    title: "Emergency Lighting Service",
    description: "Routine monthly and annual testing, battery replacement, bulb service, and repair of emergency exit lighting systems.",
    icon: <ShieldCheck className="w-7 h-7" />
  },
  {
    title: "Fire Extinguisher Cabinet Sales & Installation",
    description: "We sell and professionally install fire extinguisher cabinets — surface-mount and recessed — ensuring proper placement and code-compliant accessibility.",
    icon: <Archive className="w-7 h-7" />
  },
];

export default function Services() {
  useSEO({
    title: "Our Services | Brandon Fire & Safety Equipment Co Inc",
    description: "Comprehensive fire safety services in Tampa, FL — extinguisher inspections, recharging, hydrostatic testing, emergency lighting, cabinet installation, and more.",
    canonical: "https://brandonfiresafety.com/services",
    ogImage: "https://brandonfiresafety.com/opengraph.jpg",
    ogUrl: "https://brandonfiresafety.com/services",
  });

  return (
    <Layout>
      {/* Header — dark, fire-themed */}
      <section className="bg-surface py-24 border-b border-white/10 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 50% 120%, rgba(220,20,20,0.7) 0%, transparent 65%)",
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
        <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 text-sm font-semibold mb-6"
          >
            <Flame className="w-4 h-4" /> Full Service Fire Protection
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-5xl font-display font-bold mb-6 text-white"
          >
            Comprehensive Fire Safety Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/65"
          >
            From annual inspections to complex installations, we provide everything your business needs to stay compliant and protected.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard 
                key={service.title}
                index={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
              />
            ))}
            {/* Coming Soon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: services.length * 0.1 }}
              className="relative"
            >
              <div className="h-full border border-dashed border-primary/40 bg-primary/5 rounded-xl p-8 flex flex-col opacity-80">
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-primary text-white tracking-wide uppercase">
                    Coming Soon
                  </span>
                </div>
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <Bell className="w-7 h-7" />
                </div>
                <h3 className="font-display font-semibold text-xl mb-3 text-foreground">
                  Fire Alarm Service & Testing
                </h3>
                <p className="text-muted-foreground leading-relaxed flex-1">
                  Annual inspection, functional testing, and servicing of commercial fire alarm systems — coming soon to Brandon Fire & Safety.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to action — dark with red glow */}
      <section className="py-20 bg-navbar border-t border-white/10 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            background:
              "radial-gradient(ellipse 50% 80% at 50% 100%, rgba(220,20,20,0.6) 0%, transparent 65%)",
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-display font-bold mb-6 text-white">Need a Custom Maintenance Plan?</h2>
          <p className="text-lg text-white/65 mb-8 max-w-2xl mx-auto">
            We offer customized service contracts tailored to your facility's specific equipment and operational schedule.
          </p>
          <Button
            asChild
            size="lg"
            className="font-semibold bg-primary hover:bg-primary/90 text-white border-0 shadow-xl shadow-primary/40"
            data-testid="button-services-call"
          >
            <a href="tel:8136519191">Call to Discuss Your Needs</a>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
