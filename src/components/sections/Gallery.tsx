"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/Animations";
import { FilterScroll, FilterChipDark } from "@/components/ui/FilterScroll";

import type { GalleryImage } from "@/types";

const categories = ["all", "hotel", "rooms", "restaurant", "events", "pool", "spa", "lobby", "night"];

export function GallerySection({ images }: { images: GalleryImage[] }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  const filteredImages =
    activeCategory === "all"
      ? images
      : images.filter((img) => img.category === activeCategory);

  return (
    <section id="gallery" className="section-padding bg-charcoal relative">
      <div className="absolute inset-0 texture-overlay" />
      <div className="container-luxury relative">
        <SectionHeading
          subtitle="Visual Journey"
          title="Photo Gallery"
          description="Explore the beauty and elegance of Grand Imperial Palace through our curated collection."
          light
        />

        <FilterScroll className="mb-8 sm:mb-12" ariaLabel="Gallery categories">
          {categories.map((cat) => (
            <FilterChipDark
              key={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </FilterChipDark>
          ))}
        </FilterScroll>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 sm:gap-4">
          {filteredImages.map((image, index) => (
            <FadeIn key={image.id} delay={index * 0.05}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative break-inside-avoid mb-3 sm:mb-4 cursor-pointer group overflow-hidden active:scale-[0.98] transition-transform"
                onClick={() => setLightboxImage(image)}
              >
                <div className="relative aspect-auto">
                  <SafeImage
                    src={image.src}
                    alt={image.alt}
                    width={600}
                    height={index % 3 === 0 ? 800 : index % 3 === 1 ? 500 : 650}
                    className="w-full h-auto object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 group-active:bg-charcoal/30 transition-colors duration-300 flex items-center justify-center">
                  <ZoomIn className="text-luxury-white opacity-40 sm:opacity-0 group-hover:opacity-100 transition-opacity" size={28} />
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center p-3 sm:p-4 safe-bottom"
            onClick={() => setLightboxImage(null)}
          >
            <button
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 flex items-center justify-center text-luxury-white hover:text-champagne touch-target"
              onClick={() => setLightboxImage(null)}
              aria-label="Close lightbox"
            >
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl max-h-[80vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <SafeImage
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                width={1200}
                height={800}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <p className="text-center text-warm-beige/80 mt-4">{lightboxImage.alt}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
