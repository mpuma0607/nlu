import type { TenantConfig } from "../types"

export const century21BegginsConfig: TenantConfig = {
  id: "century21-beggins",
  name: "Beggins University",
  domain: [
    "beggins-university.com",
    "www.beggins-university.com",
    "beggins.thenextlevelu.com",
    "localhost:3000", // for local development
  ],
  branding: {
    name: "Beggins University",
    logo: "/images/beggins-university-light.png",
    logoDark: "/images/beggins-university-dark.png",
    colors: {
      primary: "#000000",
      secondary: "#b6a888",
      accent: "#b6a888",
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
    customSections: [
      {
        id: "dotloop-training",
        title: "Dotloop Training",
        href: "/training-hub/dotloop-training",
        description: "Complete Dotloop platform training",
      },
      {
        id: "onboarding",
        title: "Onboarding",
        href: "/training-hub/onboarding",
        description: "New agent onboarding process",
      },
      {
        id: "brokerage-logos",
        title: "Brokerage Logos",
        href: "/marketing-hub/brokerage-logos",
        description: "Century 21 Beggins logos and branding assets",
      },
      {
        id: "zillow-showcase",
        title: "Zillow Showcase",
        href: "/marketing-hub/zillow-showcase",
        description: "Learn about and purchase Zillow Showcase service",
      },
    ],
    hiddenFeatures: ["profile"],
    customNavigation: false,
  },
  localization: {
    language: "en",
    currency: "USD",
    dateFormat: "MM/DD/YYYY",
    translations: {
      "ai-hub.title": "AI Hub",
      "marketing-hub.title": "Marketing Hub",
      "prospecting-hub.title": "Prospecting Hub",
      "training-hub.title": "Training Hub",
      "services-hub.title": "Services Hub",
      "networking-hub.title": "Networking Hub",
      "gear-hub.title": "Gear Hub",
    },
  },
  auth: {
    provider: "memberspace",
    settings: {
      memberspace: {
        subdomain: "beggins-university",
        planUrls: {
          monthly: "/plans/monthly",
          annual: "/plans/annual",
        },
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
      "Beggins University is Century 21 Beggins' comprehensive training and development platform, designed to elevate our agents to the next level of success.",
  },
}
