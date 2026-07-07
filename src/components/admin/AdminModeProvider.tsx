"use client";

import { createContext, useContext } from "react";

interface AdminMode {
  readOnly: boolean;
  demoMode: boolean;
  editEnabled: boolean;
  supabaseConfigured: boolean;
}

const AdminModeContext = createContext<AdminMode>({
  readOnly: true,
  demoMode: true,
  editEnabled: false,
  supabaseConfigured: false,
});

export function AdminModeProvider({
  children,
  mode,
}: {
  children: React.ReactNode;
  mode: AdminMode;
}) {
  return (
    <AdminModeContext.Provider value={mode}>
      {children}
    </AdminModeContext.Provider>
  );
}

export function useAdminMode() {
  return useContext(AdminModeContext);
}
