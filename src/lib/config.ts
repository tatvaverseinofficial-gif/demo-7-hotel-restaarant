import { isSupabaseConfigured } from "@/lib/supabase/client";

/** Public flag — when true, admin is view-only (no create/edit/delete/upload). */
export function isDemoMode(): boolean {
  return process.env.NEXT_PUBLIC_DEMO_MODE === "true";
}

/** Full edit mode requires demo off + Supabase configured. */
export function isEditModeEnabled(): boolean {
  return !isDemoMode() && isSupabaseConfigured();
}

export function getAdminMode() {
  return {
    demoMode: isDemoMode(),
    editEnabled: isEditModeEnabled(),
    readOnly: isDemoMode() || !isSupabaseConfigured(),
    supabaseConfigured: isSupabaseConfigured(),
  };
}
