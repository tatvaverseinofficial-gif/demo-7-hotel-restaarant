import { getDashboardStats } from "@/lib/data/service";
import { getAdminMode } from "@/lib/config";
import { Bed, UtensilsCrossed, Image, MessageSquare } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const stats = await getDashboardStats();
  const { readOnly, demoMode, editEnabled, supabaseConfigured } = getAdminMode();

  const cards = [
    { label: "Total Rooms", value: stats.totalRooms, sub: `${stats.featuredRooms} featured`, icon: Bed, href: "/admin/rooms", color: "text-champagne" },
    { label: "Menu Items", value: stats.totalDishes, sub: `${stats.signatureDishes} signature`, icon: UtensilsCrossed, href: "/admin/restaurant", color: "text-forest" },
    { label: "Gallery Images", value: stats.galleryImages, sub: "All categories", icon: Image, href: "/admin/gallery", color: "text-wood" },
    { label: "Testimonials", value: stats.testimonials, sub: `${stats.visibleTestimonials} visible`, icon: MessageSquare, href: "/admin/testimonials", color: "text-champagne" },
  ];

  const quickActions = [
    { label: "Add Room", href: "/admin/rooms/new" },
    { label: "Add Dish", href: "/admin/restaurant/new" },
    { label: "Upload Image", href: "/admin/gallery/new" },
    { label: "Edit Homepage", href: "/admin/homepage" },
    { label: "SEO Settings", href: "/admin/seo" },
  ];

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-serif text-charcoal mb-2">Dashboard</h1>
      <p className="text-sm sm:text-base text-charcoal/60 mb-6 sm:mb-8">Welcome to Grand Imperial Palace admin panel</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-12">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-luxury-white p-4 sm:p-6 shadow-luxury hover:shadow-luxury-lg transition-shadow touch-manipulation"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <card.icon className={card.color} size={24} />
            </div>
            <p className="text-2xl sm:text-3xl font-serif text-charcoal">{card.value}</p>
            <p className="text-xs sm:text-sm text-charcoal/60 mt-1">{card.label}</p>
            <p className="text-xs text-charcoal/40 mt-2">{card.sub}</p>
          </Link>
        ))}
      </div>

      {!readOnly && (
        <div className="bg-luxury-white p-4 sm:p-6 shadow-luxury mb-8">
          <h2 className="text-lg sm:text-xl font-serif text-charcoal mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="px-3 sm:px-4 py-2.5 min-h-[44px] flex items-center bg-champagne/10 text-champagne text-sm hover:bg-champagne/20 transition-colors touch-manipulation"
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {demoMode && (
        <div className="bg-warm-beige/30 border border-warm-beige p-4 text-sm text-charcoal/70">
          <strong>Demo mode</strong> — you can browse all admin sections but cannot create, edit, delete, or upload.
        </div>
      )}

      {!demoMode && !supabaseConfigured && (
        <div className="bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900">
          Configure Supabase in <code className="bg-amber-100 px-1">.env.local</code> and set{" "}
          <code className="bg-amber-100 px-1">NEXT_PUBLIC_DEMO_MODE=false</code> to enable editing.
        </div>
      )}

      {editEnabled && (
        <div className="mt-4 bg-forest/10 border border-forest/20 p-4 text-sm text-charcoal/70">
          Full edit mode is active. Changes persist to Supabase and image uploads are enabled.
        </div>
      )}
    </div>
  );
}
