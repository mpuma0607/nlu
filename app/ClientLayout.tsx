"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { TenantProvider } from "@/contexts/tenant-context"
import Navigation from "@/components/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import TenantSwitcher from "@/components/tenant-switcher"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TenantProvider>
        {!isHomePage && <Navigation />}
        {children}
        <TenantSwitcher />
        <Toaster />
      </TenantProvider>
    </ThemeProvider>
  )
}
