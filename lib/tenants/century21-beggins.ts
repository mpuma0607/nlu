import type { TenantConfig } from "@/lib/types"

export const century21BegginsConfig: TenantConfig = {
  id: "century21-beggins",
  name: "Beggins University",
  domain: ["beggins-university.com", "beggins.com", "beggins-university"],

  branding: {
    name: "Beggins University",
    tagline: "EMPOWER • EDUCATE • ENCOURAGE",
    logo: {
      light: "/images/beggins-university-light.png",
      dark: "/images/beggins-university-dark.png",
    },
    colors: {
      primary: "#1a365d", // Navy blue
      secondary: "#2d3748", // Dark gray
      accent: "#3182ce", // Blue
      background: "#f7fafc", // Light gray
      text: "#1a202c", // Dark text
    },
    fonts: {
      heading: "Inter",
      body: "Inter",
    },
  },

  features: {
    customHomePage: "/beggins-home", // This is the key line that was missing!
    enabledTools: [
      "ideahub-ai",
      "listit-ai",
      "scriptit-ai",
      "realbio",
      "quickcma-ai",
      "roleplay-ai",
      "propbot-ai",
      "whos-who-ai",
      "goalscreen-ai",
      "action-ai",
      "realcoach-ai",
      "bizplan-ai",
      "realdeal-ai",
    ],
    hiddenFeatures: [],
    enableAnalytics: true,
    enableCommunity: true,
    enableMarketingHub: true,
    enableProspectingHub: true,
    enableTrainingHub: true,
    enableNetworkingHub: true,
    enableServicesHub: false, // Disabled for this tenant
  },

  localization: {
    language: "en",
    currency: "USD",
    timezone: "America/New_York",
    translations: {
      welcome: "Welcome to Beggins University",
      tagline: "EMPOWER • EDUCATE • ENCOURAGE",
      get_started: "Access Your Portal",
    },
  },

  integrations: {
    memberspace: {
      enabled: true,
      subdomain: "thenextlevelu",
    },
    analytics: {
      enabled: true,
    },
  },

  customization: {
    showTenantSwitcher: true,
    allowCustomBranding: false,
    restrictedDomains: [],
  },
}
