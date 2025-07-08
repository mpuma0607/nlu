import type { TenantConfig } from "../types"

export const defaultTenantConfig: TenantConfig = {
  id: "default",
  name: "The Next Level U",
  domain: "thenextlevelu.com",
  branding: {
    name: "The Next Level U",
    logo: "/images/nlu-logo-dark-new.png",
    logoDark: "/images/nlu-logo-dark-new.png",
    colors: {
      primary: "#10b981",
      secondary: "#059669",
      accent: "#34d399",
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
      subdomain: "thenextlevelu",
      loginUrl: "https://thenextlevelu.memberspace.com/sign-in",
      signupUrl: "https://thenextlevelu.memberspace.com/sign-up",
      profileUrl: "https://thenextlevelu.memberspace.com/account",
      logoutUrl: "https://thenextlevelu.memberspace.com/sign-out",
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
