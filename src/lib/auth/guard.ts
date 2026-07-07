import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/admin";
import { isDemoMode, isEditModeEnabled } from "@/lib/config";

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}

export async function requireAdminAuth(): Promise<NextResponse | null> {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function requireAdminWrite(): Promise<NextResponse | null> {
  const authError = await requireAdminAuth();
  if (authError) return authError;

  if (isDemoMode()) {
    return NextResponse.json(
      { error: "Demo mode is enabled. Editing is disabled." },
      { status: 403 }
    );
  }

  if (!isEditModeEnabled()) {
    return NextResponse.json(
      { error: "Edit mode requires Supabase to be configured." },
      { status: 403 }
    );
  }

  return null;
}
