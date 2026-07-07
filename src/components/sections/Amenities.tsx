"use client";

import { motion } from "framer-motion";
import {
  Waves, Sparkles, Dumbbell, Presentation, Wifi, Car,
  ParkingCircle, ConciergeBell, Shirt, Baby,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/Animations";
import type { Amenity } from "@/types";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  waves: Waves,
  sparkles: Sparkles,
  dumbbell: Dumbbell,
  presentation: Presentation,
  wifi: Wifi,
  car: Car,
  parking: ParkingCircle,
  concierge: ConciergeBell,
  shirt: Shirt,
  baby: Baby,
};

export function AmenitiesSection({ amenities }: { amenities: Amenity[] }) {
  return (
    <section id="amenities" className="section-padding bg-luxury-white">
      <div className="container-luxury">
        <SectionHeading
          subtitle="World-Class Facilities"
          title="Premium Amenities"
          description="Indulge in an array of exceptional facilities designed for your comfort and pleasure."
        />

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-6">
          {amenities.map((amenity, index) => {
            const Icon = iconMap[amenity.icon] || Sparkles;
            return (
              <FadeIn key={amenity.id} delay={index * 0.05}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="bg-warm-beige/20 p-4 sm:p-6 text-center group hover:bg-champagne/10 transition-colors duration-300 h-full"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 flex items-center justify-center rounded-full bg-champagne/10 group-hover:bg-champagne/20 transition-colors">
                    <Icon size={24} className="text-champagne sm:hidden" />
                    <Icon size={28} className="text-champagne hidden sm:block" />
                  </div>
                  <h3 className="text-base sm:text-lg font-serif text-charcoal mb-1 sm:mb-2">{amenity.name}</h3>
                  <p className="text-xs sm:text-sm text-charcoal/60 leading-snug">{amenity.description}</p>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
