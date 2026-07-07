"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, BadgeCheck, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Testimonial } from "@/types";

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="bg-luxury-white shadow-luxury p-6 sm:p-8 md:p-10 relative h-full flex flex-col">
      <Quote className="absolute top-4 right-4 sm:top-6 sm:right-6 text-champagne/15 pointer-events-none" size={36} />

      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-champagne/30">
          <SafeImage src={testimonial.guestPhoto} alt={testimonial.guestName} fill className="object-cover" sizes="56px" />
        </div>
        <div>
          <h4 className="font-serif text-base sm:text-lg text-charcoal break-words">{testimonial.guestName}</h4>
          <p className="text-sm text-charcoal/55 break-words">{testimonial.city}, {testimonial.country}</p>
        </div>
      </div>

      <div className="flex items-center gap-0.5 mb-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={15} className={i < testimonial.rating ? "text-champagne fill-champagne" : "text-warm-beige"} />
        ))}
      </div>

      <p className="text-charcoal/65 leading-relaxed italic flex-1 text-sm sm:text-base md:text-lg">
        &ldquo;{testimonial.review}&rdquo;
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-5 sm:pt-6 mt-5 sm:mt-6 border-t border-warm-beige">
        <span className="text-sm text-charcoal/50">
          Stayed in: <span className="text-charcoal font-medium">{testimonial.roomStayed}</span>
        </span>
        {testimonial.verified && (
          <span className="flex items-center gap-1 text-xs text-forest">
            <BadgeCheck size={14} /> Verified Guest
          </span>
        )}
      </div>
    </article>
  );
}

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isPaused, next, testimonials.length]);

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="section-padding bg-warm-beige/20 relative overflow-hidden">
      <div className="container-luxury">
        <SectionHeading
          subtitle="Guest Experiences"
          title="What Our Guests Say"
          description="Discover why discerning travelers from around the world choose us."
        />

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <TestimonialCard testimonial={t} />
            </motion.div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div
          className="md:hidden relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <TestimonialCard testimonial={testimonials[current]} />
            </motion.div>
          </AnimatePresence>

          {testimonials.length > 1 && (
            <>
              <div className="flex items-center justify-center gap-4 mt-6">
                <button onClick={prev} className="p-2.5 min-w-[44px] min-h-[44px] border border-champagne/30 text-champagne hover:bg-champagne/10 touch-manipulation" aria-label="Previous">
                  <ChevronLeft size={18} />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors touch-manipulation ${i === current ? "bg-champagne" : "bg-champagne/30"}`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>
                <button onClick={next} className="p-2.5 min-w-[44px] min-h-[44px] border border-champagne/30 text-champagne hover:bg-champagne/10 touch-manipulation" aria-label="Next">
                  <ChevronRight size={18} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
