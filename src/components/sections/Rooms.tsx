"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Maximize, Bed, ArrowRight, Eye } from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/Animations";
import { RoomDetailModal } from "@/components/sections/RoomDetailModal";
import { FilterScroll, FilterChip } from "@/components/ui/FilterScroll";
import { formatPrice, getCategoryLabel } from "@/lib/utils";
import type { Room } from "@/types";

const categories = ["all", "deluxe", "executive", "premium", "suite", "family", "presidential"];

export function RoomsSection({ rooms }: { rooms: Room[] }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const filteredRooms =
    activeCategory === "all"
      ? rooms
      : rooms.filter((r) => r.category === activeCategory);

  return (
    <section id="rooms" className="section-padding bg-warm-beige/25 relative">
      <div className="absolute inset-0 texture-overlay opacity-50" />
      <div className="container-luxury relative">
        <SectionHeading
          subtitle="Accommodations"
          title="Luxury Rooms & Suites"
          description="Each room is a sanctuary of comfort, blending traditional Indian elegance with contemporary luxury."
        />

        <FilterScroll className="mb-8 sm:mb-12" ariaLabel="Room categories">
          {categories.map((cat) => (
            <FilterChip
              key={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === "all" ? "All Rooms" : getCategoryLabel(cat)}
            </FilterChip>
          ))}
        </FilterScroll>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredRooms.map((room, index) => (
              <FadeIn key={room.id} delay={index * 0.06}>
                <motion.article
                  layout
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-luxury-white shadow-luxury group overflow-hidden h-full flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden cursor-pointer" onClick={() => setSelectedRoom(room)}>
                    <SafeImage
                      src={room.images[0]}
                      alt={room.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {room.featured && (
                      <span className="absolute top-4 left-4 bg-champagne text-charcoal text-[10px] tracking-widest uppercase px-3 py-1">
                        Featured
                      </span>
                    )}
                    {room.availability === "limited" && (
                      <span className="absolute top-4 right-4 bg-forest text-luxury-white text-[10px] tracking-widest uppercase px-3 py-1">
                        Limited
                      </span>
                    )}
                    <div className="absolute inset-0 bg-charcoal/20 sm:bg-charcoal/0 sm:group-hover:bg-charcoal/30 transition-colors duration-300 flex items-center justify-center">
                      <span className="sm:opacity-0 sm:group-hover:opacity-100 transition-opacity flex items-center gap-2 text-luxury-white text-xs sm:text-sm tracking-widest uppercase bg-charcoal/50 sm:bg-transparent px-3 py-1.5 sm:p-0">
                        <Eye size={16} /> View Details
                      </span>
                    </div>
                  </div>

                  <div className="p-5 md:p-6 flex flex-col flex-1">
                    <span className="text-[10px] tracking-widest uppercase text-forest">{getCategoryLabel(room.category)}</span>
                    <h3 className="text-xl font-serif text-charcoal mt-1 mb-3">{room.name}</h3>

                    <div className="flex flex-wrap gap-2 sm:gap-3 text-xs text-charcoal/55 mb-4">
                      <span className="flex items-center gap-1"><Users size={13} /> {room.capacity} Guests</span>
                      <span className="flex items-center gap-1"><Maximize size={13} /> {room.size}</span>
                      <span className="flex items-center gap-1 min-w-0"><Bed size={13} className="shrink-0" /> <span className="truncate">{room.bedType}</span></span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {room.amenities.slice(0, 3).map((a) => (
                        <span key={a} className="text-[10px] bg-warm-beige/60 text-charcoal/60 px-2 py-0.5 tracking-wide">{a}</span>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-warm-beige mt-auto">
                      <div className="shrink-0">
                        <span className="text-[10px] text-charcoal/45 tracking-widest uppercase">From</span>
                        <p className="text-lg sm:text-xl font-serif text-champagne">{formatPrice(room.price)}</p>
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <Button variant="ghost" size="sm" className="flex-1 sm:flex-none" onClick={() => setSelectedRoom(room)}>
                          Details
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          className="flex-1 sm:flex-none"
                          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                        >
                          Enquire <ArrowRight size={13} className="ml-1 hidden sm:inline" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </FadeIn>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedRoom && (
          <RoomDetailModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
