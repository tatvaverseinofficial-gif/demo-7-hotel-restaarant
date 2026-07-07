"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { RestaurantItem } from "@/types";

const cuisines = ["Indian", "Chinese", "Italian", "Continental", "South Indian", "Desserts"];

export function RestaurantForm({ item }: { item?: RestaurantItem }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: item?.name || "",
    description: item?.description || "",
    category: item?.category || "main",
    cuisine: item?.cuisine || "Indian",
    price: item?.price || 0,
    image: item?.image || "/images/food/indian.jpg",
    isSignature: item?.isSignature || false,
    isChefSpecial: item?.isChefSpecial || false,
    visible: item?.visible ?? true,
  });

  const inputClass = "w-full border border-warm-beige px-4 py-2.5 text-charcoal focus:outline-none focus:border-champagne bg-luxury-white";
  const labelClass = "block text-sm text-charcoal/70 mb-1.5";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const method = item ? "PUT" : "POST";
      const body = item ? { id: item.id, ...form, price: Number(form.price) } : { ...form, price: Number(form.price) };
      await fetch("/api/admin/restaurant", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      router.push("/admin/restaurant");
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Link href="/admin/restaurant" className="flex items-center gap-2 text-charcoal/60 hover:text-champagne mb-6 text-sm">
        <ArrowLeft size={16} /> Back
      </Link>
      <h1 className="text-3xl font-serif text-charcoal mb-8">{item ? "Edit Dish" : "Add Dish"}</h1>
      <form onSubmit={handleSubmit} className="bg-luxury-white p-6 shadow-luxury space-y-5 max-w-2xl">
        <div>
          <label className={labelClass}>Name *</label>
          <input className={inputClass} required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div>
          <label className={labelClass}>Description</label>
          <textarea className={inputClass} rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Cuisine</label>
            <select className={inputClass} value={form.cuisine} onChange={(e) => setForm({ ...form, cuisine: e.target.value })}>
              {cuisines.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Price (₹)</label>
            <input className={inputClass} type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
          </div>
        </div>
        <div>
          <label className={labelClass}>Image URL</label>
          <input className={inputClass} value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
        </div>
        <div className="flex gap-6">
          <label className="flex items-center gap-2"><input type="checkbox" checked={form.isSignature} onChange={(e) => setForm({ ...form, isSignature: e.target.checked })} /><span className="text-sm">Signature</span></label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={form.isChefSpecial} onChange={(e) => setForm({ ...form, isChefSpecial: e.target.checked })} /><span className="text-sm">Chef Special</span></label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={form.visible} onChange={(e) => setForm({ ...form, visible: e.target.checked })} /><span className="text-sm">Visible</span></label>
        </div>
        <button type="submit" disabled={isSubmitting} className="px-6 py-3 bg-champagne text-charcoal text-sm uppercase disabled:opacity-50">
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
