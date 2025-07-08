import type { TenantConfig } from "@/lib/types"

export const brokeragePrivateConfig: TenantConfig = {
  id: "brokerage-private",
  branding: {
    name: "Private Brokerage Platform",
    logo: "/images/nlu-logo-dark-new.png",
    logoDark: "/images/nlu-logo-dark-new.png",
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
    customSections: [],
  },
  memberspace: {
    subdomain: "thenextlevelu",
    loginUrl: "https://thenextlevelu.memberspace.com/sign-in",
    signupUrl: "https://thenextlevelu.memberspace.com/sign-up",
    profileUrl: "https://thenextlevelu.memberspace.com/member/sign_in",
    logoutUrl: "https://thenextlevelu.memberspace.com/sign-out",
    emailDomain: "@thenextlevelu.com",
  },
  localization: {
    language: "en",
    translations: {},
  },
}
