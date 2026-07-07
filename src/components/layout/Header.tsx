"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "#about", label: "About", id: "about" },
  { href: "#rooms", label: "Rooms", id: "rooms" },
  { href: "#restaurant", label: "Restaurant", id: "restaurant" },
  { href: "#amenities", label: "Amenities", id: "amenities" },
  { href: "#experiences", label: "Experiences", id: "experiences" },
  { href: "#gallery", label: "Gallery", id: "gallery" },
  { href: "#contact", label: "Contact", id: "contact" },
];

export function Header({
  hotelName,
  phone,
}: {
  hotelName: string;
  phone: string;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);

      const sections = navLinks.map((l) => l.id);
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  const shortName = hotelName.length > 18 ? hotelName.split(" ").slice(0, 2).join(" ") : hotelName;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-champagne focus:text-charcoal focus:px-4 focus:py-2"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 safe-bottom",
          isScrolled
            ? "bg-charcoal/95 backdrop-blur-lg shadow-luxury py-2.5 sm:py-3"
            : "bg-gradient-to-b from-charcoal/70 to-transparent py-3 sm:py-5"
        )}
      >
        <div className="container-luxury flex items-center justify-between gap-3">
          <Link href="/" className="group flex items-center gap-2 sm:gap-3 min-w-0 flex-1 sm:flex-none">
            <span className="w-6 sm:w-8 h-px bg-champagne hidden sm:block group-hover:w-12 transition-all shrink-0" />
            <span className="text-champagne text-base sm:text-lg md:text-2xl font-serif tracking-wide truncate">
              <span className="sm:hidden">{shortName}</span>
              <span className="hidden sm:inline">{hotelName}</span>
            </span>
          </Link>

          <nav className="hidden xl:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3 py-2 text-xs tracking-widest uppercase transition-colors duration-300",
                  activeSection === link.id
                    ? "text-champagne"
                    : "text-luxury-white/70 hover:text-luxury-white"
                )}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-3 right-3 h-px bg-champagne"
                  />
                )}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 text-luxury-white/70 hover:text-champagne transition-colors"
            >
              <Phone size={15} />
              <span className="text-sm hidden xl:inline">{phone}</span>
            </a>
            <Button
              variant="outline"
              size="sm"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Reserve Now
            </Button>
          </div>

          <button
            className="lg:hidden text-luxury-white p-2 -mr-2 touch-target flex items-center justify-center shrink-0"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-charcoal/80 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-[min(320px,88vw)] bg-charcoal z-50 lg:hidden flex flex-col safe-bottom"
            >
              <div className="p-5 sm:p-6 border-b border-warm-beige/10 flex justify-between items-center gap-3">
                <span className="text-champagne font-serif text-base sm:text-lg truncate">{hotelName}</span>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  aria-label="Close menu"
                  className="touch-target flex items-center justify-center shrink-0"
                >
                  <X size={22} className="text-luxury-white" />
                </button>
              </div>
              <nav className="flex-1 p-4 sm:p-6 flex flex-col gap-1 overflow-y-auto">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      "min-h-[48px] flex items-center py-3 px-4 text-sm tracking-widest uppercase border-l-2 transition-colors touch-manipulation",
                      activeSection === link.id
                        ? "border-champagne text-champagne bg-champagne/5"
                        : "border-transparent text-luxury-white/70 hover:text-champagne"
                    )}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>
              <div className="p-5 sm:p-6 border-t border-warm-beige/10 space-y-3">
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-warm-beige/70 text-sm min-h-[44px]"
                >
                  <Phone size={16} className="text-champagne shrink-0" />
                  <span className="break-all">{phone}</span>
                </a>
                <Button
                  variant="primary"
                  size="md"
                  className="w-full min-h-[48px]"
                  onClick={() => {
                    setIsMobileOpen(false);
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Reserve Now
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
