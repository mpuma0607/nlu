"use client"

import type React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { TenantProvider } from "@/contexts/tenant-context"
import { Toaster } from "@/components/ui/toaster"
import { Navigation } from "@/components/navigation"
import { TenantSwitcher } from "@/components/tenant-switcher"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <TenantProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <div className="min-h-screen bg-background">
          <Navigation />
          <main className="container mx-auto px-4 py-8">{children}</main>
          <Toaster />
          {process.env.NODE_ENV === "development" && <TenantSwitcher />}
        </div>
      </ThemeProvider>
    </TenantProvider>
  )
}
