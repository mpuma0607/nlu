import type { TenantConfig } from "../types"

export const century21BegginsConfig: TenantConfig = {
  id: "century21-beggins",
  name: "Century 21 Beggins Enterprises",
  domain: "begginsagents.com",
  branding: {
    name: "Century 21 Beggins Enterprises",
    logo: "/images/beggins-university-light.png",
    logoDark: "/images/beggins-university-dark.png",
    colors: {
      primary: "#B8860B",
      secondary: "#DAA520",
      accent: "#FFD700",
      background: "#ffffff",
      text: "#1f2937",
    },
  },
  features: {
    aiHub: true,
    marketingHub: true,
    prospectingHub: true,
    trainingHub: true,
    servicesHub: true,
    networkingHub: true,
    customSections: [
      {
        id: "onboarding",
        title: "Agent Onboarding",
        href: "/training-hub/onboarding",
        description: "Complete onboarding process for new agents",
      },
    ],
  },
  integrations: {
    memberSpace: {
      subdomain: "begginsagents",
      loginUrl: "https://begginsagents.memberspace.com/sign-in",
      signupUrl: "https://begginsagents.memberspace.com/sign-up",
      profileUrl: "https://begginsagents.memberspace.com/account",
      logoutUrl: "https://begginsagents.memberspace.com/sign-out",
    },
    community: {
      enabled: true,
      ssoUrl: "/api/community-sso",
    },
  },
  localization: {
    language: "en",
    translations: {
      "ai-hub.title": "AI Tools",
      "marketing-hub.title": "Marketing Resources",
      "training-hub.title": "Training Center",
    },
  },
}
