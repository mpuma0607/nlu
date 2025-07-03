import type React from "react"
import { TenantProvider } from "@/contexts/tenant-context"
import { TranslationProvider } from "@/contexts/translation-context"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Navigation from "@/components/navigation"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <TenantProvider>
      <TranslationProvider>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="min-h-screen bg-background">
            <Navigation />
            <main>{children}</main>
            <Toaster />
          </div>
        </ThemeProvider>
      </TranslationProvider>
    </TenantProvider>
  )
}
