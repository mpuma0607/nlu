import type { TenantConfig } from "../types"

export const brokeragePrivateConfig: TenantConfig = {
  id: "brokerage-private",
  name: "Private Brokerage Portal",
  domain: "private.example.com",
  branding: {
    name: "Private Brokerage Portal",
    logo: "/placeholder-logo.png",
    logoDark: "/placeholder-logo.png",
    colors: {
      primary: "#1e40af",
      secondary: "#1e3a8a",
      accent: "#3b82f6",
      background: "#ffffff",
      text: "#1f2937",
    },
  },
  features: {
    aiHub: true,
    marketingHub: false,
    prospectingHub: true,
    trainingHub: true,
    servicesHub: false,
    networkingHub: false,
    customSections: [],
  },
  integrations: {
    memberSpace: {
      subdomain: "private-brokerage",
      loginUrl: "https://private-brokerage.memberspace.com/sign-in",
      signupUrl: "https://private-brokerage.memberspace.com/sign-up",
      profileUrl: "https://private-brokerage.memberspace.com/account",
      logoutUrl: "https://private-brokerage.memberspace.com/sign-out",
    },
    community: {
      enabled: false,
      ssoUrl: "/api/community-sso",
    },
  },
  localization: {
    language: "en",
    translations: {},
  },
}
