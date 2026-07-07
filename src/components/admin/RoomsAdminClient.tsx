"use client";

import { useRouter } from "next/navigation";
import { DataTable } from "@/components/admin/DataTable";
import { useAdminMode } from "@/components/admin/AdminModeProvider";
import { formatPrice, getCategoryLabel } from "@/lib/utils";
import type { Room } from "@/types";

export function RoomsAdminClient({ rooms }: { rooms: Room[] }) {
  const router = useRouter();
  const { readOnly } = useAdminMode();
  const handleDelete = async (id: string) => {
    await fetch("/api/admin/rooms", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    router.refresh();
  };

  const handleToggleVisibility = async (id: string, visible: boolean) => {
    await fetch("/api/admin/rooms", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, visible }),
    });
    router.refresh();
  };

  return (
    <DataTable
      title="Rooms"
      data={rooms}
      columns={[
        { key: "name", label: "Name" },
        { key: "category", label: "Category", render: (r) => getCategoryLabel(r.category) },
        { key: "price", label: "Price", render: (r) => formatPrice(r.price) },
        { key: "capacity", label: "Capacity", hideOnMobile: true },
        { key: "availability", label: "Status", hideOnMobile: true },
        { key: "featured", label: "Featured", render: (r) => r.featured ? "Yes" : "No", hideOnMobile: true },
      ]}
      addHref="/admin/rooms/new"
      editHref={(id) => `/admin/rooms/${id}`}
      onDelete={handleDelete}
      onToggleVisibility={handleToggleVisibility}
      readOnly={readOnly}
    />
  );
}
