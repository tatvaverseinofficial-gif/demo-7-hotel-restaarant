"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Bed, UtensilsCrossed, Image, Sparkles,
  Heart, MessageSquare, Globe, Search, Menu, X, Home,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/rooms", label: "Rooms", icon: Bed },
  { href: "/admin/restaurant", label: "Restaurant", icon: UtensilsCrossed },
  { href: "/admin/gallery", label: "Gallery", icon: Image },
  { href: "/admin/amenities", label: "Amenities", icon: Sparkles },
  { href: "/admin/experiences", label: "Experiences", icon: Heart },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { href: "/admin/homepage", label: "Homepage", icon: Home },
  { href: "/admin/seo", label: "SEO Settings", icon: Search },
  { href: "/admin/settings", label: "Website", icon: Globe },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 w-11 h-11 flex items-center justify-center bg-charcoal text-luxury-white rounded touch-target touch-manipulation"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-charcoal text-luxury-white transform transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 border-b border-warm-beige/10">
          <Link href="/admin" className="text-xl font-serif text-champagne">
            Admin Panel
          </Link>
          <p className="text-xs text-warm-beige/50 mt-1">Grand Imperial Palace</p>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3.5 min-h-[48px] rounded text-sm transition-colors touch-manipulation",
                  isActive
                    ? "bg-champagne/20 text-champagne"
                    : "text-warm-beige/70 hover:bg-charcoal-light hover:text-luxury-white"
                )}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-warm-beige/10">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-warm-beige/60 hover:text-champagne transition-colors"
          >
            <Home size={16} /> View Website
          </Link>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-charcoal/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
