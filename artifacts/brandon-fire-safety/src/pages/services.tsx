import { motion } from "framer-motion";
import { useSEO } from "@/hooks/use-seo";
import { 
  FlameKindling, Flame, Zap, ShieldAlert, FileCheck2, 
  GraduationCap, Building2, HardHat, CalendarCheck, Wrench, Bell, ShieldCheck
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Fire Extinguisher Inspection",
    description: "Comprehensive visual and physical inspections to ensure your extinguishers are charged, accessible, and fully operational.",
    icon: <FlameKindling className="w-7 h-7" />
  },
  {
    title: "Fire Extinguisher Recharge",
    description: "Professional recharging services after use or during required maintenance intervals to keep units ready.",
    icon: <Wrench className="w-7 h-7" />
  },
  {
    title: "Fire Suppression Systems",
    description: "Installation, inspection, and maintenance of clean agent and industrial fire suppression systems.",
    icon: <ShieldCheck className="w-7 h-7" />
  },
  {
    title: "Kitchen Hood Suppression",
    description: "Specialized protection for commercial kitchens. We test, clean, and maintain your restaurant's vital suppression systems.",
    icon: <Flame className="w-7 h-7" />
  },
  {
    title: "Emergency Exit Lighting",
    description: "Routine testing, bulb replacement, and battery service for emergency egress lighting and exit signs.",
    icon: <Zap className="w-7 h-7" />
  },
  {
    title: "Fire Alarm Inspections",
    description: "Thorough testing of your building's fire alarm control panels, smoke detectors, and notification devices.",
    icon: <Bell className="w-7 h-7" />
  },
  {
    title: "Code Compliance Assistance",
    description: "Expert guidance to navigate complex NFPA codes and local fire marshal requirements to avoid fines.",
    icon: <FileCheck2 className="w-7 h-7" />
  },
  {
    title: "Fire Safety Training",
    description: "Hands-on, professional training for your staff on the proper and safe use of fire safety equipment.",
    icon: <GraduationCap className="w-7 h-7" />
  },
  {
    title: "Commercial Fire Protection",
    description: "End-to-end fire safety planning and equipment provision for commercial facilities of all sizes.",
    icon: <Building2 className="w-7 h-7" />
  },
  {
    title: "Safety Equipment Installation",
    description: "Expert placement and mounting of cabinets, brackets, signs, and physical safety barriers.",
    icon: <HardHat className="w-7 h-7" />
  },
  {
    title: "Annual Fire Inspections",
    description: "Scheduled, recurring total-facility compliance checks to keep your certifications up to date effortlessly.",
    icon: <CalendarCheck className="w-7 h-7" />
  },
  {
    title: "Maintenance Programs",
    description: "Customized preventative maintenance contracts that take the guesswork out of fire safety management.",
    icon: <ShieldAlert className="w-7 h-7" />
  }
];

export default function Services() {
  useSEO({
    title: "Our Services | Brandon Fire & Safety Equipment Co Inc",
    description: "Comprehensive fire safety services in Tampa, FL — extinguisher inspections, suppression systems, kitchen hood suppression, emergency lighting, alarm inspections, code compliance, and more.",
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
            <a href="tel:8136578888">Call to Discuss Your Needs</a>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
