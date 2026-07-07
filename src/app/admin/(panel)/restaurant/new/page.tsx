import { RestaurantForm } from "@/components/admin/RestaurantForm";
import { requireEditMode } from "@/lib/auth/require-edit";

export default function NewRestaurantPage() {
  requireEditMode("/admin/restaurant");
  return <RestaurantForm />;
}
