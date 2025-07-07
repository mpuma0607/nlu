import type { TenantConfig } from "../types"

export const century21BegginsConfig: TenantConfig = {
  id: "century21-beggins",
  name: "Century 21 Beggins",
  domain: "beggins.thenextlevelu.com",
  customHomePage: "/beggins-home",
  branding: {
    name: "Beggins University",
    logo: {
      light: "/images/beggins-university-light.png",
      dark: "/images/beggins-university-dark.png",
    },
    colors: {
      primary: "#C8102E",
      secondary: "#FFD100",
      accent: "#1F4E79",
    },
    favicon: "/images/nlu-favicon.png",
  },
  auth: {
    provider: "memberspace",
    settings: {
      memberspace: {
        publicKey: "pk_sb_4f9a8c7e2d1b3a5f",
        loginUrl: "https://beggins.memberspace.com/sign-in",
        signupUrl: "https://beggins.memberspace.com/sign-up",
      },
    },
    requireAuth: true,
    redirectAfterLogin: "/portal",
    redirectAfterLogout: "/",
  },
  features: {
    aiHub: true,
    prospectingHub: true,
    trainingHub: true,
    marketingHub: true,
    networkingHub: true,
    servicesHub: true,
    onboardingHub: true,
    gearHub: true,
    analytics: false,
  },
  navigation: {
    showBranding: true,
    customLinks: [
      {
        title: "University Home",
        href: "/beggins-home",
        icon: "home",
      },
    ],
  },
  integrations: {
    googleAnalytics: "G-BEGGINS123",
    memberspace: {
      enabled: true,
      publicKey: "pk_sb_4f9a8c7e2d1b3a5f",
    },
  },
  customization: {
    showTenantSwitcher: false,
    customCSS: `
      :root {
        --primary: #C8102E;
        --secondary: #FFD100;
        --accent: #1F4E79;
      }
    `,
  },
}
