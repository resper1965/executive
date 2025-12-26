"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Tenant } from "@/lib/supabase/types";

interface TenantContextType {
  tenant: Tenant | null;
}

const TenantContext = createContext<TenantContextType>({ tenant: null });

export function TenantProvider({
  tenant,
  children,
}: {
  tenant: Tenant | null;
  children: ReactNode;
}) {
  return (
    <TenantContext.Provider value={{ tenant }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error("useTenant must be used within a TenantProvider");
  }
  return context;
}
