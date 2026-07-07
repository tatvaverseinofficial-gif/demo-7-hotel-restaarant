"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Phone } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom,0px))] lg:bottom-8 right-4 z-40 w-11 h-11 bg-charcoal text-champagne border border-champagne/30 flex items-center justify-center hover:bg-champagne hover:text-charcoal transition-colors shadow-luxury touch-target touch-manipulation"
          aria-label="Scroll to top"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export function MobileStickyCTA({ phone }: { phone: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-charcoal/95 backdrop-blur-md border-t border-champagne/20 px-3 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] flex gap-3"
        >
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 min-h-[48px] border border-champagne/40 text-champagne text-sm tracking-wider uppercase touch-manipulation"
          >
            <Phone size={16} /> Call
          </a>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="flex-1 py-3.5 min-h-[48px] bg-champagne text-charcoal text-sm tracking-wider uppercase font-medium touch-manipulation"
          >
            Reserve Now
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
