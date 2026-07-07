"use client";

import { useRouter } from "next/navigation";
import { DataTable } from "@/components/admin/DataTable";
import { useAdminMode } from "@/components/admin/AdminModeProvider";
import type { GalleryImage, Amenity, Experience, Testimonial } from "@/types";

export function GalleryAdminClient({ images }: { images: GalleryImage[] }) {
  const router = useRouter();
  const { readOnly } = useAdminMode();
  const handleDelete = async (id: string) => {
    await fetch("/api/admin/gallery", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    router.refresh();
  };
  return (
    <DataTable title="Gallery" data={images} columns={[
      { key: "alt", label: "Alt Text" },
      { key: "category", label: "Category" },
      { key: "featured", label: "Featured", render: (i) => i.featured ? "Yes" : "No" },
    ]} addHref="/admin/gallery/new" editHref={(id) => `/admin/gallery/${id}`} onDelete={handleDelete} readOnly={readOnly} />
  );
}

export function AmenitiesAdminClient({ amenities }: { amenities: Amenity[] }) {
  const router = useRouter();
  const { readOnly } = useAdminMode();
  const handleDelete = async (id: string) => {
    await fetch("/api/admin/amenities", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    router.refresh();
  };
  const handleToggle = async (id: string, visible: boolean) => {
    await fetch("/api/admin/amenities", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, visible }) });
    router.refresh();
  };
  return (
    <DataTable title="Amenities" data={amenities} columns={[
      { key: "name", label: "Name" },
      { key: "description", label: "Description", render: (i) => <span className="line-clamp-3">{i.description}</span> },
      { key: "order", label: "Order", hideOnMobile: true },
    ]} addHref="/admin/amenities/new" editHref={(id) => `/admin/amenities/${id}`} onDelete={handleDelete} onToggleVisibility={handleToggle} readOnly={readOnly} />
  );
}

export function ExperiencesAdminClient({ experiences }: { experiences: Experience[] }) {
  const router = useRouter();
  const { readOnly } = useAdminMode();
  const handleDelete = async (id: string) => {
    await fetch("/api/admin/experiences", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    router.refresh();
  };
  const handleToggle = async (id: string, visible: boolean) => {
    await fetch("/api/admin/experiences", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, visible }) });
    router.refresh();
  };
  return (
    <DataTable title="Experiences" data={experiences} columns={[
      { key: "name", label: "Name" },
      { key: "description", label: "Description", render: (i) => <span className="line-clamp-3">{i.description}</span> },
    ]} addHref="/admin/experiences/new" editHref={(id) => `/admin/experiences/${id}`} onDelete={handleDelete} onToggleVisibility={handleToggle} readOnly={readOnly} />
  );
}

export function TestimonialsAdminClient({ testimonials }: { testimonials: Testimonial[] }) {
  const router = useRouter();
  const { readOnly } = useAdminMode();
  const handleDelete = async (id: string) => {
    await fetch("/api/admin/testimonials", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    router.refresh();
  };
  const handleToggle = async (id: string, visible: boolean) => {
    await fetch("/api/admin/testimonials", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, visible }) });
    router.refresh();
  };
  return (
    <DataTable title="Testimonials" data={testimonials} columns={[
      { key: "guestName", label: "Guest" },
      { key: "rating", label: "Rating" },
      { key: "city", label: "City" },
      { key: "roomStayed", label: "Room", hideOnMobile: true },
    ]} addHref="/admin/testimonials/new" editHref={(id) => `/admin/testimonials/${id}`} onDelete={handleDelete} onToggleVisibility={handleToggle} readOnly={readOnly} />
  );
}
