import { RoomForm } from "@/components/admin/RoomForm";
import { requireEditMode } from "@/lib/auth/require-edit";

export default function NewRoomPage() {
  requireEditMode("/admin/rooms");
  return <RoomForm />;
}
