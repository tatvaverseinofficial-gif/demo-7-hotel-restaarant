"use client";

import { Plane, Train, ShoppingBag, Church, Landmark, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/Animations";
import type { Attraction, WebsiteSettings } from "@/types";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  plane: Plane,
  train: Train,
  shopping: ShoppingBag,
  church: Church,
  landmark: Landmark,
};

export function AttractionsSection({
  attractions,
  settings,
}: {
  attractions: Attraction[];
  settings: WebsiteSettings;
}) {
  const mapUrl = `https://maps.google.com/maps?q=${settings.mapLat},${settings.mapLng}&z=14&output=embed`;

  return (
    <section id="attractions" className="section-padding bg-warm-beige/20">
      <div className="container-luxury">
        <SectionHeading
          subtitle="Explore Jaipur"
          title="Nearby Attractions"
          description="Discover the rich heritage and vibrant culture surrounding our hotel."
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <FadeIn direction="left">
            <div className="relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-auto lg:h-full min-h-[240px] sm:min-h-[320px] lg:min-h-[400px] overflow-hidden shadow-luxury">
              <iframe
                src={mapUrl}
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hotel location map"
              />
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.2}>
            <div className="space-y-3 sm:space-y-4">
              {attractions.map((attraction) => {
                const Icon = iconMap[attraction.icon] || MapPin;
                return (
                  <div
                    key={attraction.id}
                    className="flex items-start gap-3 sm:gap-4 bg-luxury-white p-4 sm:p-5 shadow-luxury hover:shadow-luxury-lg transition-shadow"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-champagne/10 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-champagne sm:hidden" />
                      <Icon size={20} className="text-champagne hidden sm:block" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                        <h4 className="font-serif text-base sm:text-lg text-charcoal">{attraction.name}</h4>
                        <span className="text-xs sm:text-sm text-champagne whitespace-nowrap">{attraction.distance}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-charcoal/60 mt-1">{attraction.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
