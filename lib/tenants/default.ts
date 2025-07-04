import type { TenantConfig } from "../types"

export const defaultConfig: TenantConfig = {
  id: "default",
  name: "The Next Level U",
  domain: ["thenextlevelu.com", "localhost", "vusercontent.net"],
  branding: {
    name: "The Next Level U",
    logo: "/images/nlu-logo-light.png",
    logoDark: "/images/nlu-logo-dark.png",
    colors: {
      primary: "#b6a888",
      secondary: "#a39577",
      accent: "#d4c5a0",
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
    enableTranslation: false,
  },
  localization: {
    language: "en",
    currency: "USD",
    dateFormat: "MM/DD/YYYY",
    supportedLanguages: ["en"],
    translations: {},
  },
  auth: {
    provider: "memberspace",
    settings: {},
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
    customAbout: "The Next Level U's comprehensive real estate platform with AI-powered tools and training.",
  },
}
