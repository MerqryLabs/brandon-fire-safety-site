import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ReviewCardProps {
  name: string;
  rating: number;
  text: string;
  index?: number;
}

export function ReviewCard({ name, rating, text, index = 0 }: ReviewCardProps) {
  const initials = name.substring(0, 2).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="h-full border-border/50 bg-card shadow-sm hover:shadow-md transition-shadow" data-testid={`card-review-${name.toLowerCase().replace(/\s+/g, '-')}`}>
        <CardContent className="p-8 flex flex-col h-full">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="w-12 h-12 border border-border">
              <AvatarFallback className="bg-primary/10 text-primary font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold text-foreground">{name}</h4>
              <div className="flex gap-0.5 mt-1" aria-label={`Rating: ${rating} out of 5 stars`}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <blockquote className="text-muted-foreground leading-relaxed flex-1 italic">
            "{text}"
          </blockquote>
        </CardContent>
      </Card>
    </motion.div>
  );
}
