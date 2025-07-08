import type { TenantConfig } from "../types"

export const empowerAiConfig: TenantConfig = {
  id: "empower-ai",
  name: "Empower AI",
  domains: ["getempowerai.com", "www.getempowerai.com"],
  branding: {
    name: "Empower AI",
    logo: "/images/empower-ai-portal-logo.png",
    primaryColor: "#10b981",
    secondaryColor: "#059669",
  },
  features: {
    aiHub: true,
    marketingHub: true,
    prospectingHub: true,
    trainingHub: true,
    servicesHub: true,
    networkingHub: true,
    gearHub: true,
    customSections: [],
  },
  memberSpace: {
    subdomain: "getempowerai",
    loginUrl: "https://getempowerai.memberspace.com/sign-in",
    signupUrl: "https://getempowerai.memberspace.com/sign-up",
    profileUrl: "https://getempowerai.memberspace.com/account",
    logoutUrl: "https://getempowerai.memberspace.com/sign-out",
  },
  emailIntegration: {
    fromEmail: "noreply@getempowerai.com",
    supportEmail: "support@getempowerai.com",
  },
}
