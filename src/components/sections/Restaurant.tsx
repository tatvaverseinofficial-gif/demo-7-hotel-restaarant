"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ChefHat } from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/Animations";
import { formatPrice } from "@/lib/utils";
import type { RestaurantItem } from "@/types";
import { FilterScroll, FilterChipDark } from "@/components/ui/FilterScroll";

import { IMAGES } from "@/lib/images";

const cuisines = ["All", "Indian", "Chinese", "Italian", "Continental", "South Indian", "Desserts"];

export function RestaurantSection({ items }: { items: RestaurantItem[] }) {
  const [activeCuisine, setActiveCuisine] = useState("All");

  const filteredItems =
    activeCuisine === "All"
      ? items
      : items.filter((item) => item.cuisine === activeCuisine);

  const signatureDishes = items.filter((item) => item.isSignature);
  const chefSpecials = items.filter((item) => item.isChefSpecial);

  return (
    <section id="restaurant" className="section-padding bg-charcoal text-luxury-white relative overflow-hidden">
      <div className="absolute inset-0 texture-overlay" />
      <div className="container-luxury relative">
        <SectionHeading
          subtitle="Culinary Excellence"
          title="Fine Dining Experience"
          description="Embark on a gastronomic journey through the finest Indian and international cuisines, crafted by our award-winning chefs."
          light
        />

        <FadeIn>
          <div className="relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] mb-8 sm:mb-16 overflow-hidden">
            <SafeImage
              src={IMAGES.restaurant}
              alt="Restaurant interior"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-charcoal via-charcoal/70 sm:via-charcoal/50 to-transparent flex items-end sm:items-center">
              <div className="p-5 sm:p-8 md:p-16 max-w-xl w-full">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-champagne mb-2 sm:mb-4">
                  The Imperial Dining Room
                </h3>
                <p className="text-sm sm:text-base text-warm-beige/80 leading-relaxed">
                  An elegant setting where traditional Indian flavors meet contemporary culinary artistry.
                  Open daily from 7:00 AM to 11:00 PM.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        <FilterScroll className="mb-8 sm:mb-12" ariaLabel="Cuisine filters">
          {cuisines.map((cuisine) => (
            <FilterChipDark
              key={cuisine}
              active={activeCuisine === cuisine}
              onClick={() => setActiveCuisine(cuisine)}
            >
              {cuisine}
            </FilterChipDark>
          ))}
        </FilterScroll>

        {signatureDishes.length > 0 && (
          <div className="mb-10 sm:mb-16">
            <h3 className="text-lg sm:text-xl font-serif text-champagne mb-4 sm:mb-6 flex items-center gap-2">
              <Star size={18} className="shrink-0" /> Signature Dishes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {signatureDishes.map((dish, index) => (
                <FadeIn key={dish.id} delay={index * 0.1}>
                  <DishCard dish={dish} />
                </FadeIn>
              ))}
            </div>
          </div>
        )}

        {chefSpecials.length > 0 && (
          <div className="mb-10 sm:mb-16">
            <h3 className="text-lg sm:text-xl font-serif text-champagne mb-4 sm:mb-6 flex items-center gap-2">
              <ChefHat size={18} className="shrink-0" /> Chef&apos;s Specials
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {chefSpecials.map((dish, index) => (
                <FadeIn key={dish.id} delay={index * 0.1}>
                  <DishCard dish={dish} />
                </FadeIn>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredItems.map((dish, index) => (
            <FadeIn key={dish.id} delay={index * 0.05}>
              <DishCard dish={dish} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function DishCard({ dish }: { dish: RestaurantItem }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-charcoal-light overflow-hidden group"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <SafeImage
          src={dish.image}
          alt={dish.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-xs text-forest-light uppercase tracking-wider">{dish.cuisine}</span>
            <h4 className="text-lg font-serif text-luxury-white mt-1">{dish.name}</h4>
          </div>
          <span className="text-champagne font-serif whitespace-nowrap">{formatPrice(dish.price)}</span>
        </div>
        <p className="text-sm text-warm-beige/60 mt-2 line-clamp-2">{dish.description}</p>
      </div>
    </motion.div>
  );
}
