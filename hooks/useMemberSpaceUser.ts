"use client"

import { useState, useEffect } from "react"
import { useTenantConfig } from "./useTenantConfig"

interface MemberSpaceUser {
  id: string
  email: string
  name: string
  firstName?: string
  lastName?: string
  customFields?: Record<string, any>
}

export function useMemberSpaceUser() {
  const [user, setUser] = useState<MemberSpaceUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const tenantConfig = useTenantConfig()

  useEffect(() => {
    // Only load MemberSpace for tenants configured to use it
    if (tenantConfig.auth.provider !== "memberspace") {
      setLoading(false)
      return
    }

    let timeoutId: NodeJS.Timeout

    const loadMemberSpace = () => {
      try {
        // Check if MemberSpace is available
        if (typeof window !== "undefined" && (window as any).MemberSpace) {
          const memberspace = (window as any).MemberSpace

          // Get current user
          const currentUser = memberspace.getCurrentMember()

          if (currentUser) {
            setUser({
              id: currentUser.id,
              email: currentUser.email,
              name: currentUser.name || `${currentUser.firstName || ""} ${currentUser.lastName || ""}`.trim(),
              firstName: currentUser.firstName,
              lastName: currentUser.lastName,
              customFields: currentUser.customFields,
            })
          }

          setLoading(false)
        } else {
          // MemberSpace not loaded yet, try again
          timeoutId = setTimeout(loadMemberSpace, 500)
        }
      } catch (err) {
        console.error("Error loading MemberSpace user:", err)
        setError("Failed to load user data")
        setLoading(false)
      }
    }

    // Start loading with a timeout to prevent infinite waiting
    const maxWaitTime = setTimeout(() => {
      setLoading(false)
      setError("MemberSpace took too long to load")
    }, 10000) // 10 seconds max wait

    loadMemberSpace()

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      if (maxWaitTime) clearTimeout(maxWaitTime)
    }
  }, [tenantConfig.auth.provider])

  return { user, loading, error }
}
