"use client"

import { useTenantConfig as useTenantConfigFromContext } from "@/contexts/tenant-context"

// Re-export the hook from the context for backward compatibility
export const useTenantConfig = useTenantConfigFromContext

// Also export as default for different import styles
export default useTenantConfig
