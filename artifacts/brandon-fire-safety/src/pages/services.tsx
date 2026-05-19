import { useEffect } from "react";
import { motion } from "framer-motion";
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
  useEffect(() => {
    document.title = "Our Services | Brandon Fire & Safety";
  }, []);

  return (
    <Layout>
      {/* Header */}
      <section className="bg-card py-20 border-b">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            Comprehensive Fire Safety Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground"
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

      {/* Call to action */}
      <section className="py-20 bg-muted border-t">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold mb-6">Need a Custom Maintenance Plan?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We offer customized service contracts tailored to your facility's specific equipment and operational schedule.
          </p>
          <Button asChild size="lg" className="font-semibold shadow-md" data-testid="button-services-call">
            <a href="tel:8136578888">Call to Discuss Your Needs</a>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
