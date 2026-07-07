import { NextResponse } from "next/server";
import { submitContactForm } from "@/lib/data/service";
import type { ContactFormData } from "@/types";

export async function POST(request: Request) {
  try {
    const data: ContactFormData = await request.json();

    if (!data.name || !data.email || !data.phone) {
      return NextResponse.json(
        { success: false, message: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const result = await submitContactForm(data);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to submit form." },
      { status: 500 }
    );
  }
}
