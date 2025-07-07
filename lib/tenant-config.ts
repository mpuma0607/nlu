import { defaultTenantConfig } from "@/lib/tenants/default"
import { brokeragePrivateConfig } from "@/lib/tenants/brokerage-private"
import { internationalConfig } from "@/lib/tenants/international"
import { century21BegginsConfig } from "@/lib/tenants/century21-beggins"
import type { TenantConfig } from "@/lib/types"

const tenantConfigs: Record<string, TenantConfig> = {
  default: defaultTenantConfig,
  "brokerage-private": brokeragePrivateConfig,
  international: internationalConfig,
  "century21-beggins": century21BegginsConfig,
}

export function getTenantConfig(): TenantConfig {
  if (typeof window === "undefined") {
    return defaultTenantConfig
  }

  // Client-side: All existing methods preserved in exact same order

  // 1. Check for preview tenant override (existing)
  const previewTenant = localStorage.getItem("preview-tenant")
  if (previewTenant && tenantConfigs[previewTenant]) {
    return tenantConfigs[previewTenant]
  }

  // 2. Check URL parameter (existing)
  const urlParams = new URLSearchParams(window.location.search)
  const tenantParam = urlParams.get("tenant")
  if (tenantParam && tenantConfigs[tenantParam]) {
    return tenantConfigs[tenantParam]
  }

  // 3. Check domain detection (additive - doesn't break existing)
  const hostname = window.location.hostname

  // Check for exact subdomain matches first
  if (hostname === "beggins.thenextlevelu.com") {
    return century21BegginsConfig
  }
  if (hostname === "brokerage.thenextlevelu.com") {
    return brokeragePrivateConfig
  }
  if (hostname === "international.thenextlevelu.com") {
    return internationalConfig
  }

  // Fallback to partial matches (existing logic)
  if (hostname.includes("beggins") || hostname.includes("century21-beggins")) {
    return century21BegginsConfig
  }
  if (hostname.includes("brokerage1") || hostname.includes("brokerage-private")) {
    return brokeragePrivateConfig
  }
  if (hostname.includes("international")) {
    return internationalConfig
  }

  // 4. Fallback to default (existing)
  return defaultTenantConfig
}

export function getAllTenants() {
  return [
    { id: "default", name: "The Next Level U" },
    { id: "century21-beggins", name: "Beggins University" },
    { id: "brokerage-private", name: "Private Brokerage" },
    { id: "international", name: "International Platform" },
  ]
}

export function getTenantById(id: string): TenantConfig | undefined {
  return tenantConfigs[id]
}

// Utility functions for feature checking
export function isToolEnabled(toolId: string, config: TenantConfig): boolean {
  return config.features.enabledTools?.includes(toolId) || false
}

export function isFeatureHidden(featureId: string, config: TenantConfig): boolean {
  return config.features.hiddenFeatures?.includes(featureId) || false
}

export function getTranslation(key: string, config: TenantConfig): string {
  return config.localization?.translations?.[key] || key
}
