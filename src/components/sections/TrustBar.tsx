"use client";

import { motion } from "framer-motion";
import { Star, Award, Shield, Leaf } from "lucide-react";

const badges = [
  { icon: Star, label: "5-Star Luxury", sub: "Forbes Recommended" },
  { icon: Award, label: "Best Hotel 2025", sub: "Hospitality Awards India" },
  { icon: Shield, label: "Safe Stay Certified", sub: "Ministry of Tourism" },
  { icon: Leaf, label: "Eco-Conscious", sub: "Green Hospitality" },
];

export function TrustBar() {
  return (
    <section className="relative bg-charcoal border-y border-champagne/20 overflow-hidden">
      <div className="absolute inset-0 texture-overlay" />
      <div className="container-luxury relative z-10 py-4 sm:py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-2.5 sm:gap-3 lg:gap-4"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full border border-champagne/30 flex items-center justify-center shrink-0">
                <badge.icon size={16} className="text-champagne sm:hidden" />
                <badge.icon size={18} className="text-champagne hidden sm:block" />
              </div>
              <div className="min-w-0">
                <p className="text-luxury-white text-xs sm:text-sm font-medium leading-tight">{badge.label}</p>
                <p className="text-warm-beige/50 text-[10px] sm:text-xs mt-0.5 line-clamp-2">{badge.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
