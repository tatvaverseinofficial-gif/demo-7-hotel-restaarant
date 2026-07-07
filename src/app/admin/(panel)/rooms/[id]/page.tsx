import { getRoomById } from "@/lib/data/service";
import { RoomForm } from "@/components/admin/RoomForm";
import { notFound } from "next/navigation";

export default async function EditRoomPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (id === "new") {
    return <RoomForm />;
  }

  const room = await getRoomById(id);
  if (!room) notFound();
  return <RoomForm room={room} />;
}
