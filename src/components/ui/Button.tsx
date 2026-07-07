"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const variants = {
      primary: "bg-champagne text-charcoal hover:bg-soft-gold",
      secondary: "bg-charcoal text-luxury-white hover:bg-charcoal-light",
      outline: "border border-champagne text-champagne hover:bg-champagne hover:text-charcoal",
      ghost: "text-champagne hover:bg-champagne/10",
    };

    const sizes = {
      sm: "px-4 py-2.5 text-sm min-h-[40px]",
      md: "px-6 py-3 text-sm min-h-[44px]",
      lg: "px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base min-h-[48px]",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center font-medium tracking-wide uppercase transition-colors duration-300 touch-manipulation",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export { Button };
