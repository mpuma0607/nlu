import type { TenantConfig } from "../types"

export const internationalConfig: TenantConfig = {
  id: "international",
  name: "International Real Estate Platform",
  domain: "international.example.com",
  branding: {
    name: "International Real Estate Platform",
    logo: "/placeholder-logo.png",
    logoDark: "/placeholder-logo.png",
    colors: {
      primary: "#7c3aed",
      secondary: "#6d28d9",
      accent: "#8b5cf6",
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
    customSections: [],
  },
  integrations: {
    memberSpace: {
      subdomain: "international",
      loginUrl: "https://international.memberspace.com/sign-in",
      signupUrl: "https://international.memberspace.com/sign-up",
      profileUrl: "https://international.memberspace.com/account",
      logoutUrl: "https://international.memberspace.com/sign-out",
    },
    community: {
      enabled: true,
      ssoUrl: "/api/community-sso",
    },
  },
  localization: {
    language: "en",
    translations: {},
  },
}
