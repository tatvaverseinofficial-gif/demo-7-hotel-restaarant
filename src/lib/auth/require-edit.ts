import { redirect } from "next/navigation";
import { getAdminMode } from "@/lib/config";

/** Redirect to admin dashboard when edit mode is disabled (demo / no Supabase). */
export function requireEditMode(redirectTo = "/admin") {
  if (getAdminMode().readOnly) {
    redirect(redirectTo);
  }
}
