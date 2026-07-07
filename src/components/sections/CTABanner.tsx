"use client";

import { motion } from "framer-motion";
import { Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CTABanner({ phone }: { phone: string }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal-light to-charcoal" />
      <div className="absolute inset-0 texture-overlay" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-champagne/40 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-champagne/40 to-transparent" />

      <div className="container-luxury relative z-10 py-12 sm:py-16 md:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-lg"
          >
            <span className="text-champagne text-xs tracking-[0.35em] uppercase">Begin Your Journey</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-luxury-white mt-2 sm:mt-3 mb-2 sm:mb-3">
              Your Perfect Escape Awaits
            </h2>
            <p className="text-sm sm:text-base text-warm-beige/65 leading-relaxed">
              Reserve your stay or enquire about our exclusive packages.
              Our concierge team is available around the clock.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full lg:w-auto"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <Calendar size={18} /> Make Enquiry
            </Button>
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 min-h-[48px] border border-champagne/50 text-champagne text-sm tracking-widest uppercase hover:bg-champagne/10 transition-colors w-full sm:w-auto touch-manipulation"
            >
              <Phone size={18} /> {phone}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
