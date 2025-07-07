"use client"

import { useState, useEffect } from "react"
import { useTenantConfig } from "@/contexts/tenant-context"

interface MemberSpaceUser {
  id: string
  name: string
  email: string
  customFields?: Record<string, any>
}

export function useMemberSpaceUser() {
  const [user, setUser] = useState<MemberSpaceUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const tenantConfig = useTenantConfig()

  useEffect(() => {
    // Only load MemberSpace for the default tenant (main domain)
    if (tenantConfig.id !== "default") {
      setLoading(false)
      setUser(null)
      return
    }

    // Only load MemberSpace on the main domain
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname
      if (
        !hostname.includes("thenextlevelu.com") ||
        hostname.includes("beggins.") ||
        hostname.includes("brokerage.") ||
        hostname.includes("international.")
      ) {
        setLoading(false)
        setUser(null)
        return
      }
    }

    const loadMemberSpace = async () => {
      try {
        // Check if MemberSpace is available
        if (typeof window !== "undefined" && (window as any).MemberSpace) {
          const memberSpace = (window as any).MemberSpace

          // Get current member
          const currentMember = await memberSpace.getCurrentMember()

          if (currentMember) {
            setUser({
              id: currentMember.id,
              name: currentMember.name || "",
              email: currentMember.email || "",
              customFields: currentMember.customFields || {},
            })
          }
        }
      } catch (err) {
        console.error("MemberSpace error:", err)
        setError(err instanceof Error ? err.message : "Failed to load user")
      } finally {
        setLoading(false)
      }
    }

    // Wait for MemberSpace to load
    if (typeof window !== "undefined") {
      if ((window as any).MemberSpace) {
        loadMemberSpace()
      } else {
        // Wait for MemberSpace to load
        const checkMemberSpace = setInterval(() => {
          if ((window as any).MemberSpace) {
            clearInterval(checkMemberSpace)
            loadMemberSpace()
          }
        }, 100)

        // Timeout after 5 seconds
        setTimeout(() => {
          clearInterval(checkMemberSpace)
          setLoading(false)
        }, 5000)
      }
    }
  }, [tenantConfig.id])

  return { user, loading, error }
}
