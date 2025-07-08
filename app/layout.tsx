import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { TenantProvider } from "@/contexts/tenant-context"
import { TranslationProvider } from "@/contexts/translation-context"
import ClientLayout from "./ClientLayout"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "The Next Level U Portal",
  description: "AI-powered real estate tools and training platform",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script id="memberspace-script" strategy="beforeInteractive">
          {`
            (function() {
              var hostname = window.location.hostname;
              var subdomain;
              
              if (hostname.includes('begginsagents.com')) {
                subdomain = 'begginsagents';
              } else if (hostname.includes('getempowerai.com')) {
                subdomain = 'getempowerai';
              } else {
                subdomain = 'getempowerai'; // default fallback
              }
              
              var MemberSpace = window.MemberSpace || {"subdomain": subdomain};
              window.MemberSpace = MemberSpace;
              
              var s = document.createElement("script");
              s.src = "https://cdn.memberspace.com/scripts/widgets.js";
              var e = document.getElementsByTagName("script")[0];
              e.parentNode.insertBefore(s,e);
            })();
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <TenantProvider>
          <TranslationProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
              <ClientLayout>{children}</ClientLayout>
              <Toaster />
            </ThemeProvider>
          </TranslationProvider>
        </TenantProvider>
      </body>
    </html>
  )
}
