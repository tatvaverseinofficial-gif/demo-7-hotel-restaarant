"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";
import { Button } from "@/components/ui/Button";
import type { HomepageSettings } from "@/types";

const EASE_LUXURY = [0.22, 1, 0.36, 1] as const;

/* ─── Signature animation: masked word-by-word title reveal + gold shimmer ─── */
function HeroTitleReveal({
  text,
  reducedMotion,
  compact,
}: {
  text: string;
  reducedMotion: boolean;
  compact?: boolean;
}) {
  const words = text.split(" ").filter(Boolean);

  if (reducedMotion) {
    return (
      <h1
        className={`font-serif text-luxury-white mb-4 sm:mb-6 leading-[1.12] tracking-tight px-2 ${
          compact
            ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
        }`}
      >
        {text}
      </h1>
    );
  }

  return (
    <div className="relative mb-4 sm:mb-6 px-2">
      <motion.h1
        className={`relative font-serif text-luxury-white leading-[1.12] tracking-tight ${
          compact
            ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
        }`}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: compact ? 0.07 : 0.11, delayChildren: 0.55 },
          },
        }}
        aria-label={text}
      >
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden align-bottom mr-[0.22em] last:mr-0"
            aria-hidden="true"
          >
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "115%", opacity: 0, rotateX: 12 },
                visible: {
                  y: 0,
                  opacity: 1,
                  rotateX: 0,
                  transition: { duration: compact ? 0.75 : 0.95, ease: EASE_LUXURY },
                },
              }}
              style={{ transformOrigin: "50% 100%" }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.h1>

      {/* One-time gold light sweep across the headline */}
      <motion.div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <motion.div
          className="absolute inset-y-0 w-1/2 hero-title-shimmer"
          initial={{ x: "-120%", opacity: 0 }}
          animate={{ x: "280%", opacity: [0, 1, 1, 0] }}
          transition={{
            delay: compact ? 1.1 : 1.45,
            duration: compact ? 0.9 : 1.15,
            ease: EASE_LUXURY,
          }}
        />
      </motion.div>
    </div>
  );
}

export function HeroSection({
  settings,
  hotelName,
}: {
  settings: HomepageSettings;
  hotelName: string;
}) {
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const parallaxY = useTransform(scrollY, [0, 600], [0, isMobile ? 40 : 160]);
  const contentOpacity = useTransform(scrollY, [0, 420], [1, 0]);
  const bgScale = useTransform(scrollY, [0, 600], [1, isMobile ? 1.04 : 1.1]);

  const kenBurnsFrom = isMobile ? 1.09 : 1.16;
  const kenBurnsDuration = isMobile ? 2.2 : 2.9;

  return (
    <section className="relative h-[100dvh] min-h-[520px] max-h-[900px] flex items-center justify-center overflow-hidden">
      {/* Cinematic background — Ken Burns settle + gentle scroll parallax */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={reducedMotion ? undefined : { y: parallaxY, scale: bgScale }}
        initial={reducedMotion ? false : { scale: kenBurnsFrom }}
        animate={reducedMotion ? undefined : { scale: 1 }}
        transition={{ duration: kenBurnsDuration, ease: EASE_LUXURY }}
      >
        <SafeImage
          src={settings.heroImage}
          alt="Luxury hotel exterior at golden hour"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/75 via-charcoal/35 to-charcoal/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/45 via-transparent to-charcoal/45" />
        <div className="absolute inset-0 hero-vignette pointer-events-none" />
        <div className="absolute inset-0 hero-grain pointer-events-none opacity-[0.035]" />
      </motion.div>

      {/* Opening curtain — subtle vertical reveal on first paint */}
      {!reducedMotion && (
        <motion.div
          className="absolute inset-0 z-[15] bg-charcoal pointer-events-none"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 1.1, ease: EASE_LUXURY, delay: 0.05 }}
          style={{ transformOrigin: "top" }}
          aria-hidden="true"
        />
      )}

      {/* Decorative frames */}
      <div className="hidden sm:block absolute inset-6 md:inset-10 border border-champagne/20 pointer-events-none z-20" />
      <div className="hidden sm:block absolute inset-8 md:inset-14 border border-champagne/10 pointer-events-none z-20" />

      <motion.div
        style={reducedMotion ? undefined : { opacity: contentOpacity }}
        className="relative z-20 text-center px-4 sm:px-6 max-w-5xl mx-auto pt-16 sm:pt-0"
      >
        <motion.div
          initial={reducedMotion ? false : { scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE_LUXURY }}
          className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-champagne to-transparent mx-auto mb-6 sm:mb-8"
        />

        <motion.span
          initial={reducedMotion ? false : { opacity: 0, y: 16, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: isMobile ? "0.25em" : "0.45em" }}
          transition={{ duration: 0.85, delay: 0.25, ease: EASE_LUXURY }}
          className="inline-block text-champagne text-[10px] sm:text-xs md:text-sm uppercase mb-4 sm:mb-6"
        >
          {hotelName}
        </motion.span>

        <HeroTitleReveal
          text={settings.heroTitle}
          reducedMotion={!!reducedMotion}
          compact={isMobile}
        />

        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: isMobile ? 0.95 : 1.25, ease: EASE_LUXURY }}
          className="text-sm sm:text-base md:text-xl text-warm-beige/85 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed font-light px-2"
        >
          {settings.heroSubtitle}
        </motion.p>

        <motion.div
          initial={reducedMotion ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.85, delay: isMobile ? 1.05 : 1.35, ease: EASE_LUXURY }}
          className="w-20 sm:w-24 h-px bg-gradient-to-r from-transparent via-champagne/60 to-transparent mx-auto mb-8 sm:mb-10"
        />

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: isMobile ? 1.15 : 1.5, ease: EASE_LUXURY }}
          className="flex flex-col w-full max-w-sm sm:max-w-none mx-auto sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center px-2"
        >
          <Button
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => document.getElementById("rooms")?.scrollIntoView({ behavior: "smooth" })}
          >
            Explore Rooms
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-luxury-white/80 text-luxury-white hover:bg-luxury-white hover:text-charcoal"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Reserve Now
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto text-luxury-white/90 hover:text-champagne"
            onClick={() => document.getElementById("restaurant")?.scrollIntoView({ behavior: "smooth" })}
          >
            View Restaurant
          </Button>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reducedMotion ? 0 : isMobile ? 1.6 : 2, duration: 0.6 }}
        className="absolute bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-champagne/70 hover:text-champagne transition-colors touch-manipulation"
        aria-label="Scroll to content"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Discover</span>
        <motion.div
          animate={reducedMotion ? undefined : { y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
        >
          <ChevronDown size={22} className="sm:w-6 sm:h-6" />
        </motion.div>
      </motion.a>
    </section>
  );
}
