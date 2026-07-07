import { NextResponse } from "next/server";
import { requireAdminAuth, requireAdminWrite } from "@/lib/auth/guard";
import {
  getHomepageSettings,
  updateHomepageSettings,
  getSEOSettings,
  updateSEOSettings,
  getWebsiteSettings,
  updateWebsiteSettings,
} from "@/lib/data/service";

export async function GET(request: Request) {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  switch (type) {
    case "homepage":
      return NextResponse.json(await getHomepageSettings());
    case "seo":
      return NextResponse.json(await getSEOSettings());
    case "website":
      return NextResponse.json(await getWebsiteSettings());
    default:
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  const writeError = await requireAdminWrite();
  if (writeError) return writeError;

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const data = await request.json();

  switch (type) {
    case "homepage":
      return NextResponse.json(await updateHomepageSettings(data));
    case "seo":
      return NextResponse.json(await updateSEOSettings(data));
    case "website":
      return NextResponse.json(await updateWebsiteSettings(data));
    default:
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }
}
