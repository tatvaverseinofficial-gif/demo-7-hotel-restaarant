import { getRestaurantItems } from "@/lib/data/service";
import { RestaurantAdminClient } from "@/components/admin/RestaurantAdminClient";

export default async function RestaurantPage() {
  const items = await getRestaurantItems(false);
  return <RestaurantAdminClient items={items} />;
}
