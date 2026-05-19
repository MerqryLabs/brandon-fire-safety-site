import { useSEO } from "@/hooks/use-seo";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Users, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

export default function About() {
  useSEO({
    title: "About Us | Brandon Fire & Safety Equipment Co Inc",
    description: "Learn about Brandon Fire & Safety Equipment Co Inc — a trusted commercial fire protection company serving Tampa, FL with licensed inspections, suppression systems, and code compliance solutions.",
    canonical: "https://brandonfiresafety.com/about",
    ogImage: "https://brandonfiresafety.com/opengraph.jpg",
    ogUrl: "https://brandonfiresafety.com/about",
  });

  return (
    <Layout>
      {/* Header */}
      <section className="bg-surface py-24 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
        <div
          className="absolute inset-0 opacity-15"
          style={{ background: "radial-gradient(ellipse 60% 80% at 50% 120%, rgba(220,20,20,0.7) 0%, transparent 65%)" }}
        />
        <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold mb-6 text-white"
          >
            About Brandon Fire & Safety Equipment Co Inc
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/65"
          >
            Your trusted local partner in commercial fire protection, compliance, and life safety services.
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-display font-bold mb-6">Our Commitment to Safety</h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  At Brandon Fire & Safety Equipment Co Inc, we understand that protecting your business, employees, and customers is your top priority. That makes it our top priority, too.
                </p>
                <p>
                  Based in Tampa, FL, we provide comprehensive commercial fire protection services designed to keep your facility compliant, safe, and prepared for any emergency. From routine annual inspections to complex kitchen hood suppression systems, our certified technicians handle it all with precision and professionalism.
                </p>
                <p>
                  We don't just sell equipment; we provide peace of mind. When you partner with us, you're getting a dedicated team that shows up on time, performs the job correctly the first time, and maintains meticulous records of your compliance status.
                </p>
              </div>

              <div className="mt-10">
                <Button asChild size="lg" className="font-semibold shadow-md" data-testid="button-about-contact">
                  <Link to="/contact">Contact Our Team</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/about-technician.png" 
                  alt="Professional technician inspecting a fire extinguisher" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -top-6 -right-6 w-48 h-48 bg-secondary/10 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-card border-y">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-bold mb-6">Why Choose Us?</h2>
            <p className="text-lg text-muted-foreground">
              We stand apart through our dedication to rigorous standards, clear communication, and unwavering reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Uncompromising Quality",
                desc: "We never cut corners. Every inspection and installation is performed strictly according to NFPA standards and local codes."
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Expert Technicians",
                desc: "Our team is highly trained, fully certified, and brings years of hands-on experience to every job site."
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "Clear Communication",
                desc: "No confusing jargon or surprise fees. We clearly explain what your business needs to stay compliant and safe."
              }
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-background p-8 rounded-2xl shadow-sm border border-border"
              >
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold font-display mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
