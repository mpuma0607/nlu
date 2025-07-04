"use client"

import type React from "react"

import { TenantProvider } from "@/contexts/tenant-context"
import { TranslationProvider } from "@/contexts/translation-context"
import Navigation from "@/components/navigation"
import { Toaster } from "@/components/ui/toaster"
import { useTenantConfig } from "@/contexts/tenant-context"

function LayoutContent({ children }: { children: React.ReactNode }) {
  const tenantConfig = useTenantConfig()

  // Only wrap with TranslationProvider for Century 21 Canada tenant
  if (tenantConfig.id === "century21-canada") {
    return (
      <TranslationProvider>
        <div className="min-h-screen bg-background">
          <Navigation />
          <main>{children}</main>
          <Toaster />
        </div>
      </TranslationProvider>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>{children}</main>
      <Toaster />
    </div>
  )
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <TenantProvider>
      <LayoutContent>{children}</LayoutContent>
    </TenantProvider>
  )
}
