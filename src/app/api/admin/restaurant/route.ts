import { NextResponse } from "next/server";
import { requireAdminAuth, requireAdminWrite } from "@/lib/auth/guard";
import { getRestaurantItems, createRestaurantItem, updateRestaurantItem, deleteRestaurantItem } from "@/lib/data/service";

export async function GET() {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  const items = await getRestaurantItems(false);
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const writeError = await requireAdminWrite();
  if (writeError) return writeError;

  const data = await request.json();
  const item = await createRestaurantItem(data);
  return NextResponse.json(item, { status: 201 });
}

export async function PUT(request: Request) {
  const writeError = await requireAdminWrite();
  if (writeError) return writeError;

  const { id, ...updates } = await request.json();
  const item = await updateRestaurantItem(id, updates);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function DELETE(request: Request) {
  const writeError = await requireAdminWrite();
  if (writeError) return writeError;

  const { id } = await request.json();
  const success = await deleteRestaurantItem(id);
  if (!success) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
