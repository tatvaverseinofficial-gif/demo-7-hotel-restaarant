import { NextResponse } from "next/server";
import { requireAdminAuth, requireAdminWrite } from "@/lib/auth/guard";
import { getExperiences, createExperience, updateExperience, deleteExperience } from "@/lib/data/service";

export async function GET() {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  const experiences = await getExperiences(false);
  return NextResponse.json(experiences);
}

export async function POST(request: Request) {
  const writeError = await requireAdminWrite();
  if (writeError) return writeError;

  const data = await request.json();
  const experience = await createExperience(data);
  return NextResponse.json(experience, { status: 201 });
}

export async function PUT(request: Request) {
  const writeError = await requireAdminWrite();
  if (writeError) return writeError;

  const { id, ...updates } = await request.json();
  const experience = await updateExperience(id, updates);
  if (!experience) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(experience);
}

export async function DELETE(request: Request) {
  const writeError = await requireAdminWrite();
  if (writeError) return writeError;

  const { id } = await request.json();
  const success = await deleteExperience(id);
  if (!success) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
