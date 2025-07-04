import { defaultConfig } from "./tenants/default"
import { century21BeginsConfig } from "./tenants/century21-beggins"
import { century21CanadaConfig } from "./tenants/century21-canada"
import { internationalConfig } from "./tenants/international"
import { brokeragePrivateConfig } from "./tenants/brokerage-private"
import type { TenantConfig } from "./types"

const tenants: TenantConfig[] = [
  defaultConfig,
  century21BeginsConfig,
  century21CanadaConfig,
  internationalConfig,
  brokeragePrivateConfig,
]

export function getTenantConfig(): TenantConfig {
  // Check for preview tenant override first
  if (typeof window !== "undefined") {
    const previewTenant = localStorage.getItem("preview-tenant")
    if (previewTenant && previewTenant !== "default") {
      const tenant = tenants.find((t) => t.id === previewTenant)
      if (tenant) return tenant
    }
  }

  // Get hostname
  const hostname = typeof window !== "undefined" ? window.location.hostname : ""

  // Find matching tenant by domain
  const tenant = tenants.find((tenant) => {
    return tenant.domain.some((domain) => {
      if (typeof domain === "string") {
        return hostname.includes(domain) || domain.includes(hostname)
      }
      return false
    })
  })

  return tenant || defaultConfig
}

export function getAllTenants(): TenantConfig[] {
  return tenants
}

export function getTenantById(id: string): TenantConfig | undefined {
  return tenants.find((tenant) => tenant.id === id)
}
