import { getAmenities } from "@/lib/data/service";
import { AmenitiesAdminClient } from "@/components/admin/GenericAdminClients";

export default async function AmenitiesPage() {
  const amenities = await getAmenities(false);
  return <AmenitiesAdminClient amenities={amenities} />;
}
