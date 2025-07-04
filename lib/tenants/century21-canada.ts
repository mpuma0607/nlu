import type { TenantConfig } from "../types"

export const century21CanadaConfig: TenantConfig = {
  id: "century21-canada",
  name: "Century 21 Canada",
  domain: ["c21canada.thenextlevelu.com"],
  branding: {
    name: "Century 21 Canada",
    logo: "/images/tenants/century21-canada-logo.png",
    logoDark: "/images/tenants/century21-canada-logo.png",
    colors: {
      primary: "#C8102E",
      secondary: "#FFD100",
      accent: "#FFD100",
      background: "#ffffff",
      text: "#000000",
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
    customHomePage: null,
    enableTranslation: true,
  },
  localization: {
    language: "en",
    currency: "CAD",
    dateFormat: "DD/MM/YYYY",
    supportedLanguages: ["en", "fr", "es", "pt"],
    translations: {},
  },
  auth: {
    provider: "memberspace",
    settings: {},
    billing: {
      model: "subscription",
      currency: "CAD",
      plans: [],
    },
  },
  content: {
    customTraining: false,
    onboardingFlow: false,
    privateResources: false,
    customAbout: "Century 21 Canada's comprehensive real estate platform with AI-powered tools and training.",
  },
}
