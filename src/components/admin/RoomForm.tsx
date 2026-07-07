"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useAdminMode } from "@/components/admin/AdminModeProvider";
import { ImageUpload } from "@/components/admin/ImageUpload";
import type { Room, RoomCategory, AvailabilityStatus } from "@/types";
import { getCategoryLabel } from "@/lib/utils";

const categories: RoomCategory[] = ["deluxe", "executive", "premium", "suite", "family", "presidential"];
const availabilityOptions: AvailabilityStatus[] = ["available", "limited", "sold_out"];

interface RoomFormProps {
  room?: Room;
}

export function RoomForm({ room }: RoomFormProps) {
  const router = useRouter();
  const { readOnly } = useAdminMode();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: room?.name || "",
    description: room?.description || "",
    category: room?.category || "deluxe" as RoomCategory,
    price: room?.price || 0,
    capacity: room?.capacity || 2,
    size: room?.size || "",
    bedType: room?.bedType || "",
    amenities: room?.amenities?.join(", ") || "",
    images: room?.images?.join(", ") || "/images/rooms/deluxe.jpg",
    featured: room?.featured || false,
    availability: room?.availability || "available" as AvailabilityStatus,
    visible: room?.visible ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (readOnly) return;
    setIsSubmitting(true);

    const data = {
      ...form,
      amenities: form.amenities.split(",").map((a) => a.trim()).filter(Boolean),
      images: form.images.split(",").map((i) => i.trim()).filter(Boolean),
      price: Number(form.price),
      capacity: Number(form.capacity),
    };

    try {
      if (room) {
        await fetch("/api/admin/rooms", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: room.id, ...data }),
        });
      } else {
        await fetch("/api/admin/rooms", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }
      router.push("/admin/rooms");
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full border border-warm-beige px-4 py-3 text-base text-charcoal focus:outline-none focus:border-champagne bg-luxury-white min-h-[48px]";
  const labelClass = "block text-sm text-charcoal/70 mb-1.5";

  return (
    <div>
      <Link href="/admin/rooms" className="flex items-center gap-2 text-charcoal/60 hover:text-champagne mb-6 text-sm">
        <ArrowLeft size={16} /> Back to Rooms
      </Link>

      <h1 className="text-2xl sm:text-3xl font-serif text-charcoal mb-6 sm:mb-8 break-words">
        {readOnly ? "View Room" : room ? "Edit Room" : "Add New Room"}
      </h1>

      <form onSubmit={handleSubmit} className="bg-luxury-white p-4 sm:p-6 shadow-luxury space-y-5 max-w-2xl w-full">
        <fieldset disabled={readOnly} className="space-y-5 disabled:opacity-90">
        <div>
          <label className={labelClass}>Room Name *</label>
          <input className={inputClass} required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>

        <div>
          <label className={labelClass}>Description</label>
          <textarea className={inputClass} rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Category</label>
            <select className={inputClass} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as RoomCategory })}>
              {categories.map((c) => <option key={c} value={c}>{getCategoryLabel(c)}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Price (₹) *</label>
            <input className={inputClass} type="number" required value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          <div>
            <label className={labelClass}>Capacity</label>
            <input className={inputClass} type="number" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })} />
          </div>
          <div>
            <label className={labelClass}>Size</label>
            <input className={inputClass} value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} placeholder="350 sq ft" />
          </div>
          <div>
            <label className={labelClass}>Bed Type</label>
            <input className={inputClass} value={form.bedType} onChange={(e) => setForm({ ...form, bedType: e.target.value })} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Amenities (comma separated)</label>
          <input className={inputClass} value={form.amenities} onChange={(e) => setForm({ ...form, amenities: e.target.value })} />
        </div>

        <ImageUpload
          label="Primary Image"
          folder="rooms"
          value={form.images.split(",")[0]?.trim() || ""}
          onChange={(url) => {
            const rest = form.images.split(",").slice(1).map((i) => i.trim()).filter(Boolean);
            setForm({ ...form, images: [url, ...rest].filter(Boolean).join(", ") });
          }}
        />

        <div>
          <label className={labelClass}>Additional Image URLs (comma separated)</label>
          <input className={inputClass} value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className={labelClass}>Availability</label>
            <select className={inputClass} value={form.availability} onChange={(e) => setForm({ ...form, availability: e.target.value as AvailabilityStatus })}>
              {availabilityOptions.map((a) => <option key={a} value={a}>{a.replace("_", " ")}</option>)}
            </select>
          </div>
          <label className="flex items-center gap-2 cursor-pointer min-h-[48px]">
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
            <span className="text-sm text-charcoal/70">Featured</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer min-h-[48px]">
            <input type="checkbox" checked={form.visible} onChange={(e) => setForm({ ...form, visible: e.target.checked })} />
            <span className="text-sm text-charcoal/70">Visible</span>
          </label>
        </div>

        </fieldset>

        {!readOnly && (
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-champagne text-charcoal text-sm tracking-wider uppercase hover:bg-soft-gold transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : room ? "Update Room" : "Create Room"}
          </button>
        )}
      </form>
    </div>
  );
}
