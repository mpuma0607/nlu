import type { TenantConfig } from "@/lib/types"

export const century21BegginsConfig: TenantConfig = {
  id: "century21-beggins",
  name: "Beggins University",
  branding: {
    name: "Beggins University",
    logo: {
      light: "/images/beggins-university-light.png",
      dark: "/images/beggins-university-dark.png",
    },
    colors: {
      primary: "#C8102E", // Century 21 Red
      secondary: "#FFD100", // Century 21 Gold
      accent: "#1F4E79", // Professional Blue
      background: "#FFFFFF",
      text: "#333333",
    },
    favicon: "/images/nlu-favicon.png",
  },
  auth: {
    provider: "memberspace",
    settings: {
      memberspace: {
        loginUrl: "https://thenextlevelu.memberspace.com/sign-in",
        signupUrl: "https://thenextlevelu.memberspace.com/sign-up",
        logoutUrl: "https://thenextlevelu.memberspace.com/logout",
        profileUrl: "https://thenextlevelu.memberspace.com/profile",
        apiKey: process.env.MEMBERSPACE_API_KEY,
      },
    },
    requireAuth: true,
    redirectAfterLogin: "/portal",
    redirectAfterLogout: "/",
  },
  features: {
    enabledTools: [
      "ideahub-ai",
      "listit-ai",
      "scriptit-ai",
      "quickcma-ai",
      "realbio",
      "realcoach-ai",
      "realdeal-ai",
      "propbot-ai",
      "goalscreen-ai",
      "action-ai",
      "bizplan-ai",
      "roleplay-ai",
      "whos-who-ai",
    ],
    hiddenFeatures: [],
    customizations: {
      showBrandedContent: true,
      allowCustomBranding: false,
      showTenantSwitcher: false,
    },
  },
  navigation: {
    mainMenu: [
      { label: "Portal", href: "/portal", icon: "home" },
      { label: "AI Hub", href: "/ai-hub", icon: "brain" },
      { label: "Training Hub", href: "/training-hub", icon: "graduation-cap" },
      { label: "Prospecting Hub", href: "/prospecting-hub", icon: "target" },
      { label: "Marketing Hub", href: "/marketing-hub", icon: "megaphone" },
      { label: "Onboarding Hub", href: "/onboarding-hub", icon: "user-plus" },
      { label: "Services Hub", href: "/services-hub", icon: "briefcase" },
      { label: "Networking Hub", href: "/networking-hub", icon: "users" },
      { label: "Gear Hub", href: "/gear-hub", icon: "settings" },
    ],
    footerLinks: [
      { label: "Support", href: "/support" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
  localization: {
    defaultLanguage: "en",
    supportedLanguages: ["en", "es", "fr"],
    translations: {
      "welcome.title": "Welcome to Beggins University",
      "welcome.subtitle": "Your Century 21 Real Estate Training Platform",
      "nav.portal": "Portal",
      "nav.ai-hub": "AI Hub",
      "nav.training-hub": "Training Hub",
      "nav.prospecting-hub": "Prospecting Hub",
      "nav.marketing-hub": "Marketing Hub",
      "nav.onboarding-hub": "Onboarding Hub",
      "nav.services-hub": "Services Hub",
      "nav.networking-hub": "Networking Hub",
      "nav.gear-hub": "Gear Hub",
    },
  },
  integrations: {
    memberspace: {
      enabled: true,
      apiKey: process.env.MEMBERSPACE_API_KEY,
      baseUrl: "https://api.memberspace.com",
    },
    analytics: {
      enabled: true,
      googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
    },
    email: {
      provider: "resend",
      settings: {
        apiKey: process.env.RESEND_API_KEY,
        fromEmail: "noreply@c21be.com",
        fromName: "Beggins University",
      },
    },
  },
  content: {
    homepage: {
      hero: {
        title: "Welcome to Beggins University",
        subtitle: "Your Century 21 Real Estate Training Platform",
        ctaText: "Get Started",
        ctaLink: "/portal",
      },
    },
  },
}
