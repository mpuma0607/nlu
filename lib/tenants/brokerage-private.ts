import type { TenantConfig } from "../types"

export const brokeragePrivateConfig: TenantConfig = {
  id: "brokerage-private",
  name: "Brokerage Pro Platform",
  domain: ["brokerage1.thenextlevelu.com", "brokerage-pro.com"],
  branding: {
    name: "Brokerage Pro Platform",
    logo: "/images/tenants/brokerage-logo.png",
    colors: {
      primary: "#1e40af", // blue-700
      secondary: "#1d4ed8", // blue-700
      accent: "#2563eb", // blue-600
      background: "#ffffff",
      text: "#1f2937",
    },
  },
  features: {
    enabledTools: ["listit", "scriptit", "realbio", "action-ai", "realcoach-ai", "quickcma-ai", "whos-who-ai"],
    customSections: [
      {
        id: "onboarding-ai",
        title: "Onboarding AI",
        href: "/ai-hub/onboarding-ai",
        description: "New agent onboarding assistant",
      },
      {
        id: "team-management",
        title: "Team Management",
        href: "/brokerage/team-management",
        description: "Manage your agent team",
      },
    ],
    hiddenFeatures: ["gear-hub", "networking-hub"],
    customNavigation: true,
  },
  localization: {
    language: "en",
    currency: "USD",
    dateFormat: "MM/DD/YYYY",
  },
  auth: {
    provider: "internal",
    settings: {
      internal: {
        adminEmails: ["admin@brokerage-pro.com"],
        requireApproval: true,
      },
    },
    billing: {
      model: "enterprise",
      currency: "USD",
      plans: [],
    },
  },
  content: {
    customTraining: true,
    onboardingFlow: true,
    privateResources: true,
    customAbout:
      "Welcome to your private brokerage platform with exclusive tools and training designed specifically for your team.",
  },
}
