import { getRestaurantItems } from "@/lib/data/service";
import { RestaurantForm } from "@/components/admin/RestaurantForm";
import { notFound } from "next/navigation";

export default async function RestaurantEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (id === "new") return <RestaurantForm />;
  const items = await getRestaurantItems(false);
  const item = items.find((i) => i.id === id);
  if (!item) notFound();
  return <RestaurantForm item={item} />;
}
