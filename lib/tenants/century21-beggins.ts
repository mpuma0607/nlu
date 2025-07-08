import type { TenantConfig } from "@/lib/types"

export const century21BegginsConfig: TenantConfig = {
  id: "century21-beggins",
  branding: {
    name: "Beggins University",
    logo: "/images/beggins-university-light.png",
    logoDark: "/images/beggins-university-dark.png",
    primaryColor: "#10b981",
    secondaryColor: "#059669",
  },
  features: {
    enabledTools: [
      "ideahub-ai",
      "realbio",
      "listit-ai",
      "scriptit-ai",
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
    customSections: [
      {
        id: "onboarding",
        title: "Agent Onboarding",
        href: "/training-hub/onboarding",
        description: "Complete agent onboarding process",
      },
    ],
  },
  memberspace: {
    subdomain: "begginsagents",
    loginUrl: "https://begginsagents.memberspace.com/sign-in",
    signupUrl: "https://begginsagents.memberspace.com/sign-up",
    profileUrl: "https://begginsagents.memberspace.com/member/sign_in",
    logoutUrl: "https://begginsagents.memberspace.com/sign-out",
    emailDomain: "@begginsagents.com",
  },
  localization: {
    language: "en",
    translations: {},
  },
}
