import { defaultTenantConfig } from "./tenants/default"
import { century21BegginsConfig } from "./tenants/century21-beggins"
import { brokeragePrivateConfig } from "./tenants/brokerage-private"
import { internationalConfig } from "./tenants/international"
import type { TenantConfig } from "./types"

const tenantConfigs: Record<string, TenantConfig> = {
  default: defaultTenantConfig,
  "century21-beggins": century21BegginsConfig,
  "brokerage-private": brokeragePrivateConfig,
  international: internationalConfig,
}

export function getTenantConfig(hostname?: string): TenantConfig {
  // In browser environment
  if (typeof window !== "undefined") {
    // Check for preview tenant override
    const previewTenant = localStorage.getItem("preview-tenant")
    if (previewTenant && tenantConfigs[previewTenant]) {
      return tenantConfigs[previewTenant]
    }

    hostname = window.location.hostname
  }

  if (!hostname) {
    return defaultTenantConfig
  }

  // Find tenant by domain
  for (const config of Object.values(tenantConfigs)) {
    if (config.domain && config.domain.includes(hostname)) {
      return config
    }
  }

  return defaultTenantConfig
}

export function getAllTenants(): TenantConfig[] {
  return Object.values(tenantConfigs)
}
