"use client"

import { useState, useEffect } from "react"
import { useTenantConfig } from "@/contexts/tenant-context"

interface MemberSpaceUser {
  id: string
  email: string
  name: string
  customFields?: Record<string, any>
  planConnections?: Array<{
    planId: string
    planName: string
    status: string
  }>
}

export function useMemberSpaceUser() {
  const [user, setUser] = useState<MemberSpaceUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const tenantConfig = useTenantConfig()

  useEffect(() => {
    // Only load MemberSpace for tenants configured to use it
    const usesMemberSpace = tenantConfig.auth.provider === "memberspace"

    if (!usesMemberSpace) {
      setLoading(false)
      return
    }

    const initializeMemberSpace = async () => {
      try {
        // Check if MemberSpace is available
        if (typeof window !== "undefined" && (window as any).MemberSpace) {
          const memberSpace = (window as any).MemberSpace

          // Get current user
          const currentUser = await memberSpace.getCurrentMember()

          if (currentUser) {
            setUser({
              id: currentUser.id,
              email: currentUser.email,
              name: currentUser.name || currentUser.email,
              customFields: currentUser.customFields,
              planConnections: currentUser.planConnections,
            })
          }
        }
      } catch (err) {
        console.error("MemberSpace initialization error:", err)
        setError("Failed to load user information")
      } finally {
        setLoading(false)
      }
    }

    // Wait for MemberSpace to load
    if (typeof window !== "undefined") {
      if ((window as any).MemberSpace) {
        initializeMemberSpace()
      } else {
        // Wait for MemberSpace to load
        const checkMemberSpace = setInterval(() => {
          if ((window as any).MemberSpace) {
            clearInterval(checkMemberSpace)
            initializeMemberSpace()
          }
        }, 100)

        // Timeout after 10 seconds (increased for subdomains)
        setTimeout(() => {
          clearInterval(checkMemberSpace)
          if (!user) {
            console.warn("MemberSpace not loaded after timeout")
          }
          setLoading(false)
        }, 10000)
      }
    }
  }, [tenantConfig.auth.provider, user])

  return { user, loading, error }
}
