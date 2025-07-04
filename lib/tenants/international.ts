import type { TenantConfig } from "../types"

export const internationalConfig: TenantConfig = {
  id: "international",
  name: "International Platform",
  domain: ["international.thenextlevelu.com"],
  branding: {
    name: "International Platform",
    logo: "/images/international-logo.png",
    colors: {
      primary: "#16a34a",
      secondary: "#059669",
      accent: "#0d9488",
      background: "#ffffff",
      text: "#1f2937",
    },
  },
  features: {
    enabledTools: [
      "ideahub-ai",
      "realbio",
      "listit",
      "scriptit",
      "roleplay-ai",
      "action-ai",
      "realcoach-ai",
      "bizplan-ai",
      "realdeal-ai",
      "quickcma-ai",
      "whos-who-ai",
      "goalscreen-ai",
      "propbot-ai",
    ],
    customSections: [],
    hiddenFeatures: [],
    customNavigation: false,
  },
  localization: {
    language: "en",
    currency: "USD",
    dateFormat: "MM/DD/YYYY",
    translations: {},
  },
  auth: {
    provider: "memberspace",
    settings: {
      memberspace: {
        subdomain: "international",
        planUrls: {
          monthly: "/plans/monthly",
          annual: "/plans/annual",
        },
      },
    },
    billing: {
      model: "subscription",
      currency: "USD",
      plans: [],
    },
  },
  content: {
    customTraining: false,
    onboardingFlow: false,
    privateResources: false,
  },
}
