"use client"

import { useTenant } from "@/contexts/tenant-context"

export function useTenantConfig() {
  const { tenantConfig } = useTenant()
  return tenantConfig
}
