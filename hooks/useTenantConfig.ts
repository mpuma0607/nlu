"use client"

import { useTenantConfig as useContextTenantConfig } from "@/contexts/tenant-context"

// Re-export the hook from the context for backward compatibility
export const useTenantConfig = useContextTenantConfig

// Also export as default for different import styles
export default useTenantConfig
