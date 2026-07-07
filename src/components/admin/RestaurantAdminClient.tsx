"use client";

import { useRouter } from "next/navigation";
import { DataTable } from "@/components/admin/DataTable";
import { useAdminMode } from "@/components/admin/AdminModeProvider";
import { formatPrice } from "@/lib/utils";
import type { RestaurantItem } from "@/types";

export function RestaurantAdminClient({ items }: { items: RestaurantItem[] }) {
  const router = useRouter();
  const { readOnly } = useAdminMode();

  const handleDelete = async (id: string) => {
    await fetch("/api/admin/restaurant", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    router.refresh();
  };

  const handleToggleVisibility = async (id: string, visible: boolean) => {
    await fetch("/api/admin/restaurant", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, visible }),
    });
    router.refresh();
  };

  return (
    <DataTable
      title="Restaurant Menu"
      data={items}
      columns={[
        { key: "name", label: "Dish" },
        { key: "cuisine", label: "Cuisine" },
        { key: "category", label: "Category" },
        { key: "price", label: "Price", render: (r) => formatPrice(r.price) },
        { key: "isSignature", label: "Signature", render: (r) => r.isSignature ? "Yes" : "No" },
      ]}
      addHref="/admin/restaurant/new"
      editHref={(id) => `/admin/restaurant/${id}`}
      onDelete={handleDelete}
      onToggleVisibility={handleToggleVisibility}
      readOnly={readOnly}
    />
  );
}
