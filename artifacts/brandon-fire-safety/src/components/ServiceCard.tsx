import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  index?: number;
}

export function ServiceCard({ title, description, icon, index = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full group hover:shadow-xl transition-all duration-300 border-border hover:border-primary/50 bg-card overflow-hidden" data-testid={`card-service-${title.toLowerCase().replace(/\s+/g, '-')}`}>
        <CardContent className="p-8 flex flex-col h-full">
          <div className="w-14 h-14 rounded-xl bg-muted group-hover:bg-primary flex items-center justify-center text-primary group-hover:text-primary-foreground transition-colors duration-300 mb-6">
            {icon}
          </div>
          <h3 className="font-display font-semibold text-xl mb-3 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed flex-1">
            {description}
          </p>
        </CardContent>
        {/* Subtle decorative bottom border that expands on hover */}
        <div className="h-1 w-0 bg-primary group-hover:w-full transition-all duration-500 ease-out" />
      </Card>
    </motion.div>
  );
}
