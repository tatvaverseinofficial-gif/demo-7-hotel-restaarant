import { NextResponse } from "next/server";
import { requireAdminAuth, requireAdminWrite } from "@/lib/auth/guard";
import { getAmenities, createAmenity, updateAmenity, deleteAmenity } from "@/lib/data/service";

export async function GET() {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  const amenities = await getAmenities(false);
  return NextResponse.json(amenities);
}

export async function POST(request: Request) {
  const writeError = await requireAdminWrite();
  if (writeError) return writeError;

  const data = await request.json();
  const amenity = await createAmenity(data);
  return NextResponse.json(amenity, { status: 201 });
}

export async function PUT(request: Request) {
  const writeError = await requireAdminWrite();
  if (writeError) return writeError;

  const { id, ...updates } = await request.json();
  const amenity = await updateAmenity(id, updates);
  if (!amenity) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(amenity);
}

export async function DELETE(request: Request) {
  const writeError = await requireAdminWrite();
  if (writeError) return writeError;

  const { id } = await request.json();
  const success = await deleteAmenity(id);
  if (!success) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
