"use client";

import { useAdminMode } from "@/components/admin/AdminModeProvider";
import { Eye, Database, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function AdminBanner() {
  const { readOnly, demoMode, editEnabled, supabaseConfigured } = useAdminMode();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="space-y-3 mb-6">
      {demoMode && (
        <div className="flex items-start gap-3 bg-champagne/10 border border-champagne/30 p-4">
          <Eye size={18} className="text-champagne shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-charcoal">Demo Mode — View Only</p>
            <p className="text-xs text-charcoal/60 mt-1">
              Editing, uploads, and deletions are disabled. Set{" "}
              <code className="bg-warm-beige/50 px-1">NEXT_PUBLIC_DEMO_MODE=false</code> with Supabase configured to enable full editing.
            </p>
          </div>
        </div>
      )}

      {!demoMode && !supabaseConfigured && (
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 p-4">
          <Database size={18} className="text-amber-700 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-900">Supabase Not Configured</p>
            <p className="text-xs text-amber-800/70 mt-1">
              Add Supabase environment variables to enable editing and image uploads.
            </p>
          </div>
        </div>
      )}

      {!readOnly && editEnabled && (
        <div className="flex items-start gap-3 bg-forest/10 border border-forest/20 p-4">
          <Database size={18} className="text-forest shrink-0 mt-0.5" />
          <p className="text-sm text-charcoal/70 flex-1">
            Full edit mode active — changes are saved to Supabase.
          </p>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-xs text-charcoal/50 hover:text-charcoal transition-colors touch-manipulation"
        >
          <LogOut size={14} /> Sign Out
        </button>
      </div>
    </div>
  );
}
