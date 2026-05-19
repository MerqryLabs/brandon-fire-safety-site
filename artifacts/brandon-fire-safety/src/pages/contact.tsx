import { motion } from "framer-motion";
import { useSEO } from "@/hooks/use-seo";
import { Phone, MapPin, Clock, Navigation } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";

export default function Contact() {
  useSEO({
    title: "Contact Us | Brandon Fire & Safety Equipment Co Inc",
    description: "Contact Brandon Fire & Safety Equipment Co Inc at (813) 657-8888. Located at 4107 Cragmont Drive, Tampa, FL 33610. Open Monday–Friday 9AM–5PM. Schedule an inspection or request emergency service.",
  });

  return (
    <Layout>
      {/* Header */}
      <section className="bg-[#111111] py-24 border-b border-white/10 relative overflow-hidden">
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
            Contact Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/65"
          >
            Fast response, clear communication, and reliable service. We're here when you need us.
          </motion.p>
        </div>
      </section>

      {/* Split Layout */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
            
            {/* Left: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-display font-bold mb-2">Get in Touch</h2>
                <p className="text-muted-foreground">Call us today to schedule an inspection or request emergency service.</p>
              </div>

              <div className="space-y-6">
                <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow" data-testid="card-contact-phone">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Phone</h3>
                      <a href="tel:8136578888" className="text-2xl font-display font-bold text-foreground hover:text-primary transition-colors">
                        (813) 657-8888
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">Available for emergency service</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm" data-testid="card-contact-address">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Office Location</h3>
                      <address className="not-italic text-muted-foreground leading-relaxed">
                        Brandon Fire & Safety Equipment Co Inc<br />
                        4107 Cragmont Drive<br />
                        Tampa, FL 33610
                      </address>
                      <a 
                        href="https://maps.google.com/?q=4107+Cragmont+Drive,+Tampa,+FL+33610" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 mt-3 transition-colors"
                      >
                        <Navigation className="w-4 h-4" /> Get Directions
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50 shadow-sm" data-testid="card-contact-hours">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-3">Business Hours</h3>
                      <ul className="space-y-3 text-muted-foreground">
                        <li className="grid grid-cols-[1fr_auto] gap-6 items-center">
                          <span>Monday – Friday</span>
                          <span className="font-medium text-foreground">9 AM – 5 PM</span>
                        </li>
                        <li className="grid grid-cols-[1fr_auto] gap-6 items-center">
                          <span>Saturday</span>
                          <span className="font-medium text-foreground">Closed</span>
                        </li>
                        <li className="grid grid-cols-[1fr_auto] gap-6 items-center">
                          <span>Sunday</span>
                          <span className="font-medium text-foreground">Closed</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Right: Embedded Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="h-full min-h-[400px] lg:min-h-full rounded-2xl overflow-hidden shadow-xl border border-border"
              data-testid="container-map"
            >
              <iframe 
                src="https://maps.google.com/maps?q=4107+Cragmont+Dr,+Tampa,+FL+33610&output=embed" 
                className="w-full h-full border-0"
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location for Brandon Fire & Safety Equipment Co Inc"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
