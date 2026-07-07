import { AmenityForm } from "@/components/admin/GenericForms";
import { requireEditMode } from "@/lib/auth/require-edit";

export default function NewAmenityPage() {
  requireEditMode("/admin/amenities");
  return <AmenityForm />;
}
