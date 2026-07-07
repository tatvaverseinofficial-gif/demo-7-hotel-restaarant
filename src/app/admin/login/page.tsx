import { Suspense } from "react";
import AdminLoginClient from "@/app/admin/login/AdminLoginClient";

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <p className="text-warm-beige/50 text-sm">Loading...</p>
      </div>
    }>
      <AdminLoginClient />
    </Suspense>
  );
}
