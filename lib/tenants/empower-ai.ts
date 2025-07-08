import type { TenantConfig } from "@/lib/types"

export const empowerAiConfig: TenantConfig = {
  id: "empower-ai",
  name: "Empower AI",
  branding: {
    name: "Empower AI",
    logo: "/images/empower-ai-logo.png",
    favicon: "/favicon.ico",
    colors: {
      primary: "#2563eb",
      secondary: "#64748b",
      accent: "#f59e0b",
    },
  },
  memberspace: {
    subdomain: "getempowerai",
    loginUrl: "https://getempowerai.memberspace.com/sign-in",
    signupUrl: "https://getempowerai.memberspace.com/sign-up",
    profileUrl: "https://getempowerai.memberspace.com/account",
    logoutUrl: "https://getempowerai.memberspace.com/sign-out",
  },
  features: {
    enabledTools: [
      "listit-ai",
      "ideahub-ai",
      "realcoach-ai",
      "realdeal-ai",
      "propbot-ai",
      "goalscreen-ai",
      "action-ai",
      "bizplan-ai",
      "quickcma-ai",
      "realbio",
      "roleplay-ai",
      "scriptit-ai",
      "whos-who-ai",
    ],
    hiddenFeatures: [],
    customizations: {
      showBranding: true,
      customCSS: "",
    },
  },
  localization: {
    language: "en",
    translations: {},
  },
  integrations: {
    analytics: {
      googleAnalytics: "",
      mixpanel: "",
    },
    email: {
      provider: "resend",
      fromEmail: "noreply@getempowerai.com",
    },
  },
}
