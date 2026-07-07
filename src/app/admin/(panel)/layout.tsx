import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminModeProvider } from "@/components/admin/AdminModeProvider";
import { AdminBanner } from "@/components/admin/AdminBanner";
import { getAdminMode } from "@/lib/config";
import { isAdminAuthenticated } from "@/lib/auth/guard";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const mode = getAdminMode();

  return (
    <AdminModeProvider mode={mode}>
      <div className="min-h-screen bg-warm-beige/20">
        <AdminSidebar />
        <main className="lg:ml-64 min-h-screen">
          <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
            <AdminBanner />
            {children}
          </div>
        </main>
      </div>
    </AdminModeProvider>
  );
}
