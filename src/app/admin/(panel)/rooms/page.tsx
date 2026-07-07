import { getRooms } from "@/lib/data/service";
import { RoomsAdminClient } from "@/components/admin/RoomsAdminClient";

export default async function RoomsPage() {
  const rooms = await getRooms(false);
  return <RoomsAdminClient rooms={rooms} />;
}
