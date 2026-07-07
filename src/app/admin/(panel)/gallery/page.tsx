import { getGalleryImages } from "@/lib/data/service";
import { GalleryAdminClient } from "@/components/admin/GenericAdminClients";

export default async function GalleryPage() {
  const images = await getGalleryImages();
  return <GalleryAdminClient images={images} />;
}
