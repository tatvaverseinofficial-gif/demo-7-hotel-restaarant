"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useAdminMode } from "@/components/admin/AdminModeProvider";
import { ImageUpload } from "@/components/admin/ImageUpload";

const inputClass = "w-full border border-warm-beige px-4 py-2.5 text-charcoal focus:outline-none focus:border-champagne bg-luxury-white";
const labelClass = "block text-sm text-charcoal/70 mb-1.5";

export function GalleryForm() {
  const router = useRouter();
  const { readOnly } = useAdminMode();
  const [form, setForm] = useState({ src: "", alt: "", category: "hotel", featured: false, order: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (readOnly) return;
    setIsSubmitting(true);
    await fetch("/api/admin/gallery", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    router.push("/admin/gallery");
    router.refresh();
  };

  return (
    <div>
      <Link href="/admin/gallery" className="flex items-center gap-2 text-charcoal/60 hover:text-champagne mb-6 text-sm"><ArrowLeft size={16} /> Back</Link>
      <h1 className="text-3xl font-serif text-charcoal mb-8">Add Gallery Image</h1>
      <form onSubmit={handleSubmit} className="bg-luxury-white p-6 shadow-luxury space-y-5 max-w-2xl">
        <ImageUpload label="Image" folder="gallery" value={form.src} onChange={(url) => setForm({ ...form, src: url })} />
        <div><label className={labelClass}>Alt Text</label><input className={inputClass} required value={form.alt} onChange={(e) => setForm({ ...form, alt: e.target.value })} readOnly={readOnly} disabled={readOnly} /></div>
        <div><label className={labelClass}>Category</label>
          <select className={inputClass} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {["hotel", "rooms", "restaurant", "events", "pool", "spa", "lobby", "night"].map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <label className="flex items-center gap-2"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /><span className="text-sm">Featured</span></label>
        <button type="submit" disabled={isSubmitting || readOnly} className="px-6 py-3 bg-champagne text-charcoal text-sm uppercase disabled:opacity-50">Save</button>
      </form>
    </div>
  );
}

export function AmenityForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", description: "", icon: "sparkles", image: "/images/amenities/wifi.jpg", visible: true, order: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await fetch("/api/admin/amenities", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    router.push("/admin/amenities");
    router.refresh();
  };

  return (
    <div>
      <Link href="/admin/amenities" className="flex items-center gap-2 text-charcoal/60 hover:text-champagne mb-6 text-sm"><ArrowLeft size={16} /> Back</Link>
      <h1 className="text-3xl font-serif text-charcoal mb-8">Add Amenity</h1>
      <form onSubmit={handleSubmit} className="bg-luxury-white p-6 shadow-luxury space-y-5 max-w-2xl">
        <div><label className={labelClass}>Name</label><input className={inputClass} required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
        <div><label className={labelClass}>Description</label><textarea className={inputClass} rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
        <div><label className={labelClass}>Icon</label><input className={inputClass} value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} /></div>
        <button type="submit" disabled={isSubmitting} className="px-6 py-3 bg-champagne text-charcoal text-sm uppercase disabled:opacity-50">Save</button>
      </form>
    </div>
  );
}

export function ExperienceForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", description: "", image: "/images/experiences/wedding.jpg", icon: "heart", visible: true, order: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await fetch("/api/admin/experiences", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    router.push("/admin/experiences");
    router.refresh();
  };

  return (
    <div>
      <Link href="/admin/experiences" className="flex items-center gap-2 text-charcoal/60 hover:text-champagne mb-6 text-sm"><ArrowLeft size={16} /> Back</Link>
      <h1 className="text-3xl font-serif text-charcoal mb-8">Add Experience</h1>
      <form onSubmit={handleSubmit} className="bg-luxury-white p-6 shadow-luxury space-y-5 max-w-2xl">
        <div><label className={labelClass}>Name</label><input className={inputClass} required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
        <div><label className={labelClass}>Description</label><textarea className={inputClass} rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
        <div><label className={labelClass}>Image URL</label><input className={inputClass} value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} /></div>
        <button type="submit" disabled={isSubmitting} className="px-6 py-3 bg-champagne text-charcoal text-sm uppercase disabled:opacity-50">Save</button>
      </form>
    </div>
  );
}

export function TestimonialForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    guestName: "", guestPhoto: "/images/guests/guest-1.jpg", rating: 5,
    review: "", country: "India", city: "", roomStayed: "", verified: true, visible: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await fetch("/api/admin/testimonials", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    router.push("/admin/testimonials");
    router.refresh();
  };

  return (
    <div>
      <Link href="/admin/testimonials" className="flex items-center gap-2 text-charcoal/60 hover:text-champagne mb-6 text-sm"><ArrowLeft size={16} /> Back</Link>
      <h1 className="text-3xl font-serif text-charcoal mb-8">Add Testimonial</h1>
      <form onSubmit={handleSubmit} className="bg-luxury-white p-6 shadow-luxury space-y-5 max-w-2xl">
        <div><label className={labelClass}>Guest Name</label><input className={inputClass} required value={form.guestName} onChange={(e) => setForm({ ...form, guestName: e.target.value })} /></div>
        <div><label className={labelClass}>Review</label><textarea className={inputClass} rows={4} required value={form.review} onChange={(e) => setForm({ ...form, review: e.target.value })} /></div>
        <div className="grid sm:grid-cols-2 gap-5">
          <div><label className={labelClass}>City</label><input className={inputClass} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></div>
          <div><label className={labelClass}>Country</label><input className={inputClass} value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} /></div>
        </div>
        <div><label className={labelClass}>Room Stayed</label><input className={inputClass} value={form.roomStayed} onChange={(e) => setForm({ ...form, roomStayed: e.target.value })} /></div>
        <div><label className={labelClass}>Rating</label>
          <select className={inputClass} value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}>
            {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} Stars</option>)}
          </select>
        </div>
        <button type="submit" disabled={isSubmitting} className="px-6 py-3 bg-champagne text-charcoal text-sm uppercase disabled:opacity-50">Save</button>
      </form>
    </div>
  );
}
