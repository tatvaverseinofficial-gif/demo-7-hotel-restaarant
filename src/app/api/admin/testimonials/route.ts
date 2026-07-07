import { NextResponse } from "next/server";
import { requireAdminAuth, requireAdminWrite } from "@/lib/auth/guard";
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from "@/lib/data/service";

export async function GET() {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  const testimonials = await getTestimonials(false);
  return NextResponse.json(testimonials);
}

export async function POST(request: Request) {
  const writeError = await requireAdminWrite();
  if (writeError) return writeError;

  const data = await request.json();
  const testimonial = await createTestimonial(data);
  return NextResponse.json(testimonial, { status: 201 });
}

export async function PUT(request: Request) {
  const writeError = await requireAdminWrite();
  if (writeError) return writeError;

  const { id, ...updates } = await request.json();
  const testimonial = await updateTestimonial(id, updates);
  if (!testimonial) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(testimonial);
}

export async function DELETE(request: Request) {
  const writeError = await requireAdminWrite();
  if (writeError) return writeError;

  const { id } = await request.json();
  const success = await deleteTestimonial(id);
  if (!success) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
