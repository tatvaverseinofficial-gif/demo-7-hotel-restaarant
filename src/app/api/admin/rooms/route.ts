import { NextResponse } from "next/server";
import { requireAdminAuth, requireAdminWrite } from "@/lib/auth/guard";
import { getRooms, createRoom, updateRoom, deleteRoom } from "@/lib/data/service";

export async function GET() {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  const rooms = await getRooms(false);
  return NextResponse.json(rooms);
}

export async function POST(request: Request) {
  const writeError = await requireAdminWrite();
  if (writeError) return writeError;

  const data = await request.json();
  const room = await createRoom(data);
  return NextResponse.json(room, { status: 201 });
}

export async function PUT(request: Request) {
  const writeError = await requireAdminWrite();
  if (writeError) return writeError;

  const { id, ...updates } = await request.json();
  const room = await updateRoom(id, updates);
  if (!room) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(room);
}

export async function DELETE(request: Request) {
  const writeError = await requireAdminWrite();
  if (writeError) return writeError;

  const { id } = await request.json();
  const success = await deleteRoom(id);
  if (!success) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
