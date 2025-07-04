export interface BrandingConfig {
  name: string
  logo: string
  logoDark?: string // Optional dark version of logo
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
  }
}

export interface CustomSection {
  id: string
  title: string
  href: string
  description: string
}

export interface FeatureConfig {
  enabledTools: string[]
  customSections: CustomSection[]
  hiddenFeatures: string[]
  customNavigation: boolean
  customHomePage?: string
}

export interface LocalizationConfig {
  language: string
  currency: string
  dateFormat: string
  translations: Record<string, string>
}

export interface AuthSettings {
  memberspace?: {
    subdomain: string
    planUrls: Record<string, string>
  }
  stripe?: {
    publishableKey: string
    priceIds: Record<string, string>
  }
  sso?: {
    provider: "okta" | "auth0" | "azure"
    domain: string
    clientId: string
  }
  internal?: {
    adminEmails: string[]
    requireApproval: boolean
  }
  googleWorkspace?: {
    allowedDomains: string[]
    clientId: string
  }
}

export interface BillingPlan {
  id: string
  name: string
  price: number
  interval: "month" | "year"
  features: string[]
}

export interface AuthConfig {
  provider: "memberspace" | "custom" | "stripe" | "internal" | "sso" | "google-workspace"
  settings: AuthSettings
  billing: {
    model: "subscription" | "one-time" | "free" | "enterprise"
    currency: string
    plans: BillingPlan[]
  }
}

export interface ContentConfig {
  customTraining?: boolean
  onboardingFlow?: boolean
  privateResources?: boolean
  customAbout?: string
}

export interface TenantConfig {
  id: string
  name: string
  domain: string[]
  branding: BrandingConfig
  features: FeatureConfig
  localization: LocalizationConfig
  auth: AuthConfig
  content: ContentConfig
}
