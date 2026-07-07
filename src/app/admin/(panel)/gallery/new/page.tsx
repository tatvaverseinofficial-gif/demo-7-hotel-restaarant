import { GalleryForm } from "@/components/admin/GenericForms";
import { requireEditMode } from "@/lib/auth/require-edit";

export default function NewGalleryPage() {
  requireEditMode("/admin/gallery");
  return <GalleryForm />;
}
