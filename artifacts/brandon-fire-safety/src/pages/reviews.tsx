import { motion } from "framer-motion";
import { useSEO } from "@/hooks/use-seo";
import { Layout } from "@/components/layout/Layout";
import { ReviewCard } from "@/components/ReviewCard";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

// Future Enhancement: Replace static review data with Google Places API integration — https://developers.google.com/maps/documentation/places/web-service
const reviews = [
  {
    name: "John M.",
    rating: 5,
    text: "Excellent service and professional technicians. Fast response times and very knowledgeable staff. Highly recommend for any commercial fire safety needs."
  },
  {
    name: "Sandra R.",
    rating: 5,
    text: "Brandon Fire & Safety Equipment Co Inc handled our restaurant's kitchen hood suppression inspection quickly and thoroughly. We passed code without any issues."
  },
  {
    name: "Mike T.",
    rating: 5,
    text: "Very professional company. They walked us through everything we needed and made compliance easy to understand. Will use them again."
  },
  {
    name: "Lisa C.",
    rating: 4,
    text: "Great service overall. Responsive, on time, and thorough. Our fire extinguishers and exit lights are all up to code now."
  },
  {
    name: "David W.",
    rating: 5,
    text: "Been using Brandon Fire & Safety Equipment Co Inc for 3 years now for our annual inspections. Always reliable, always on time. Best in the area."
  }
];

export default function Reviews() {
  useSEO({
    title: "Customer Reviews | Brandon Fire & Safety Equipment Co Inc",
    description: "Read what customers say about Brandon Fire & Safety Equipment Co Inc. Trusted fire safety inspections and services in Tampa, FL with 5-star reviews from local businesses.",
  });

  const averageRating = (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1);

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
            What Our Customers Say
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/65 mb-8"
          >
            Don't just take our word for it. See why local businesses trust us with their fire protection needs.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex flex-col items-center p-6 bg-background rounded-2xl shadow-sm border border-border"
          >
            <div className="text-4xl font-display font-bold text-foreground mb-2">{averageRating}</div>
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-sm font-medium text-muted-foreground">Based on {reviews.length} reviews</p>
          </motion.div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <ReviewCard 
                key={index}
                index={index}
                name={review.name}
                rating={review.rating}
                text={review.text}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold mb-6">Ready to Experience the Best Service?</h2>
          <p className="text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto">
            Join our growing list of satisfied customers. Contact us today to schedule your service.
          </p>
          <Button asChild size="lg" variant="secondary" className="font-semibold shadow-lg" data-testid="button-reviews-call">
            <a href="tel:8136578888">Call Now: (813) 657-8888</a>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
