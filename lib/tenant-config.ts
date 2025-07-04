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

  const previewTenant = localStorage.getItem("preview-tenant")
  if (previewTenant && tenantConfigs[previewTenant]) {
    return tenantConfigs[previewTenant]
  }

  const urlParams = new URLSearchParams(window.location.search)
  const tenantParam = urlParams.get("tenant")
  if (tenantParam && tenantConfigs[tenantParam]) {
    return tenantConfigs[tenantParam]
  }

  const hostname = window.location.hostname

  if (hostname.includes("beggins") || hostname.includes("century21-beggins")) {
    return century21BegginsConfig
  }

  if (hostname.includes("brokerage1") || hostname.includes("brokerage-private")) {
    return brokeragePrivateConfig
  }

  if (hostname.includes("international")) {
    return internationalConfig
  }

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

export function isToolEnabled(toolId: string, config: TenantConfig): boolean {
  return config.features.enabledTools?.includes(toolId) || false
}

export function isFeatureHidden(featureId: string, config: TenantConfig): boolean {
  return config.features.hiddenFeatures?.includes(featureId) || false
}

export function getTranslation(key: string, config: TenantConfig): string {
  return config.localization?.translations?.[key] || key
}
