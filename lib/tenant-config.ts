import { headers } from "next/headers"
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
  // Server-side: Use headers from middleware
  if (typeof window === "undefined") {
    try {
      const headersList = headers()
      const tenantId = headersList.get("x-tenant-id")
      if (tenantId && tenantConfigs[tenantId]) {
        return tenantConfigs[tenantId]
      }
    } catch (error) {
      // Headers not available, fall back to default
    }
    return defaultTenantConfig
  }

  // Client-side: Check for preview tenant override first
  const previewTenant = localStorage.getItem("preview-tenant")
  if (previewTenant && tenantConfigs[previewTenant]) {
    return tenantConfigs[previewTenant]
  }

  // Check URL parameter
  const urlParams = new URLSearchParams(window.location.search)
  const tenantParam = urlParams.get("tenant")
  if (tenantParam && tenantConfigs[tenantParam]) {
    return tenantConfigs[tenantParam]
  }

  // Detect by domain (client-side)
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
    { id: "default", name: "The Next Level U", domains: defaultTenantConfig.domain },
    { id: "century21-beggins", name: "Beggins University", domains: century21BegginsConfig.domain },
    { id: "brokerage-private", name: "Private Brokerage", domains: brokeragePrivateConfig.domain },
    { id: "international", name: "International Platform", domains: internationalConfig.domain },
  ]
}

export function getTenantById(id: string): TenantConfig | undefined {
  return tenantConfigs[id]
}

// Server-side function to get tenant from headers
export function getServerTenantConfig(): TenantConfig {
  try {
    const headersList = headers()
    const tenantId = headersList.get("x-tenant-id")
    if (tenantId && tenantConfigs[tenantId]) {
      return tenantConfigs[tenantId]
    }
  } catch (error) {
    // Headers not available
  }
  return defaultTenantConfig
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
