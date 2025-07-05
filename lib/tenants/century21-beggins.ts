import type { TenantConfig } from "../types"

export const century21BegginsConfig: TenantConfig = {
  id: "century21-beggins",
  name: "Beggins University",
  domain: ["beggins.thenextlevelu.com", "beggins-university.com"],
  branding: {
    name: "Beggins University",
    logo: "/images/beggins-university-light.png", // Updated to use the new logo image
    logoDark: "/images/beggins-university-dark.png", // White text version for dark backgrounds
    colors: {
      primary: "#000000", // Black
      secondary: "#b6a888", // Vegas Gold
      accent: "#b6a888", // Vegas Gold
      background: "#ffffff", // White
      text: "#000000", // Black
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
    hiddenFeatures: ["profile"], // Hide profile page for Beggins University
    customNavigation: false,
    customHomePage: "/beggins-home", // Custom home page route
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
    provider: "google-workspace",
    settings: {
      googleWorkspace: {
        allowedDomains: ["c21be.com", "c21be3.com"],
        clientId: "your-google-client-id", // Would be configured in production
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
