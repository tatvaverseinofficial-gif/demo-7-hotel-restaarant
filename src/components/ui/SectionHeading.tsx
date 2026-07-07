"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  subtitle,
  title,
  description,
  align = "center",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={cn(
        "mb-8 sm:mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {subtitle && (
        <motion.span
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={cn(
            "inline-block text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4",
            light ? "text-champagne" : "text-forest"
          )}
        >
          {subtitle}
        </motion.span>
      )}
      <h2
        className={cn(
          "text-xl sm:text-3xl md:text-4xl lg:text-5xl font-serif mb-3 sm:mb-4 leading-tight break-words",
          light ? "text-luxury-white" : "text-charcoal"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed",
            align === "center" && "mx-auto",
            light ? "text-warm-beige/80" : "text-charcoal/70"
          )}
        >
          {description}
        </p>
      )}
      <div
        className={cn(
          "w-16 h-0.5 bg-champagne mt-6",
          align === "center" && "mx-auto"
        )}
      />
    </motion.div>
  );
}
