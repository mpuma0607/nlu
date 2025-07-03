"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { TenantProvider } from "@/contexts/tenant-context"
import { TranslationProvider } from "@/contexts/translation-context"
import Navigation from "@/components/navigation"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  return (
    <TenantProvider>
      <TranslationProvider>
        {!isHomePage && <Navigation />}
        {children}
      </TranslationProvider>
    </TenantProvider>
  )
}
