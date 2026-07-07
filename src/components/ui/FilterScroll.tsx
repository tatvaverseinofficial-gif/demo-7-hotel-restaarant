"use client";

import { cn } from "@/lib/utils";

interface FilterScrollProps {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

/** Horizontally scrollable filter chips — mobile-friendly, no layout wrap */
export function FilterScroll({ children, className, ariaLabel = "Filters" }: FilterScrollProps) {
  return (
    <div className={cn("filter-scroll-outer", className)}>
      <div
        className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible scrollbar-hide"
        role="tablist"
        aria-label={ariaLabel}
      >
        {children}
      </div>
    </div>
  );
}

export function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "shrink-0 min-h-[44px] px-4 py-2.5 text-xs tracking-widest uppercase transition-all duration-300 touch-manipulation",
        active
          ? "bg-charcoal text-champagne shadow-luxury"
          : "bg-luxury-white/90 border border-charcoal/10 text-charcoal/60 hover:border-champagne hover:text-champagne"
      )}
    >
      {children}
    </button>
  );
}

export function FilterChipDark({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "shrink-0 min-h-[44px] px-4 py-2.5 text-xs tracking-wider uppercase transition-all duration-300 touch-manipulation",
        active
          ? "bg-champagne text-charcoal"
          : "border border-warm-beige/30 text-warm-beige/70 hover:border-champagne hover:text-champagne"
      )}
    >
      {children}
    </button>
  );
}
