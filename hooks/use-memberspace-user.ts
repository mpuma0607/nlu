"use client"

import { useState, useEffect } from "react"
import { useTenant } from "@/contexts/tenant-context"

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
  const { tenantConfig } = useTenant()

  useEffect(() => {
    // Only load MemberSpace for the default tenant and main domain
    const isMainDomain =
      typeof window !== "undefined" &&
      (window.location.hostname === "thenextlevelu.com" ||
        window.location.hostname === "www.thenextlevelu.com" ||
        window.location.hostname === "localhost")

    const isDefaultTenant = tenantConfig.id === "default"

    if (!isMainDomain || !isDefaultTenant) {
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
