"use client"

import type React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { TenantProvider } from "@/contexts/tenant-context"
import { Navigation } from "@/components/navigation"
import { Toaster } from "@/components/ui/toaster"
import { useEffect } from "react"
import { useTracking } from "@/hooks/use-tracking"

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const { trackPageView } = useTracking()

  useEffect(() => {
    // Track initial page view
    trackPageView()
  }, [trackPageView])

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      <TenantProvider>
        <div className="min-h-screen bg-background">
          <Navigation />
          <main className="flex-1">{children}</main>
        </div>
        <Toaster />
      </TenantProvider>
    </ThemeProvider>
  )
}
