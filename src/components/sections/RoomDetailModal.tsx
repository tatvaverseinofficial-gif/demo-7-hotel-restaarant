"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Users, Maximize, Bed, Check, ArrowRight } from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";
import { Button } from "@/components/ui/Button";
import { formatPrice, getCategoryLabel } from "@/lib/utils";
import type { Room } from "@/types";

export function RoomDetailModal({
  room,
  onClose,
}: {
  room: Room;
  onClose: () => void;
}) {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-charcoal/90 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 safe-bottom"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${room.name} details`}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: "spring", damping: 28 }}
        className="bg-luxury-white w-full sm:max-w-4xl max-h-[90vh] sm:max-h-[92vh] overflow-y-auto rounded-t-lg sm:rounded-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[16/9] sm:aspect-[2/1]">
          <SafeImage
            src={room.images[activeImage] || room.images[0]}
            alt={room.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 w-11 h-11 bg-charcoal/70 text-luxury-white flex items-center justify-center hover:bg-charcoal transition-colors touch-target"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          {room.images.length > 1 && (
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {room.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative w-14 h-11 sm:w-16 sm:h-12 shrink-0 overflow-hidden border-2 transition-colors touch-manipulation ${
                    activeImage === i ? "border-champagne" : "border-transparent opacity-70"
                  }`}
                >
                  <SafeImage src={img} alt="" fill className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4">
            <div>
              <span className="text-xs tracking-widest uppercase text-forest">{getCategoryLabel(room.category)}</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-charcoal mt-1">{room.name}</h2>
            </div>
            <div className="sm:text-right">
              <span className="text-xs text-charcoal/50">Starting from</span>
              <p className="text-xl sm:text-2xl font-serif text-champagne">{formatPrice(room.price)}<span className="text-sm text-charcoal/50">/night</span></p>
            </div>
          </div>

          <p className="text-charcoal/65 leading-relaxed mb-6">{room.description}</p>

          <div className="flex flex-wrap gap-5 text-sm text-charcoal/60 mb-6 pb-6 border-b border-warm-beige">
            <span className="flex items-center gap-2"><Users size={16} className="text-champagne" /> {room.capacity} Guests</span>
            <span className="flex items-center gap-2"><Maximize size={16} className="text-champagne" /> {room.size}</span>
            <span className="flex items-center gap-2"><Bed size={16} className="text-champagne" /> {room.bedType}</span>
          </div>

          <div className="mb-8">
            <h4 className="text-sm tracking-widest uppercase text-charcoal/50 mb-3">Amenities</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {room.amenities.map((a) => (
                <span key={a} className="flex items-center gap-2 text-sm text-charcoal/70">
                  <Check size={14} className="text-forest shrink-0" /> {a}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="primary"
              size="lg"
              className="flex-1"
              onClick={() => {
                onClose();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Enquire Now <ArrowRight size={16} className="ml-2" />
            </Button>
            <Button variant="outline" size="lg" onClick={onClose}>Close</Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
