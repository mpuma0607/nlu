"use client"

import { useState, useEffect } from "react"
import { useTenantConfig } from "@/contexts/tenant-context"

interface MemberSpaceUser {
  id: string
  email: string
  firstName: string
  lastName: string
  planName: string
  planId: string
  isActive: boolean
}

export function useMemberSpaceUser() {
  const [user, setUser] = useState<MemberSpaceUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const tenantConfig = useTenantConfig()

  useEffect(() => {
    // Only load MemberSpace for tenants configured to use it
    if (tenantConfig.auth?.provider !== "memberspace") {
      setLoading(false)
      return
    }

    let timeoutId: NodeJS.Timeout

    const loadMemberSpaceUser = () => {
      try {
        // Check if MemberSpace is available
        if (typeof window !== "undefined" && window.MemberSpace) {
          const memberSpaceUser = window.MemberSpace.getMember()

          if (memberSpaceUser && memberSpaceUser.id) {
            setUser({
              id: memberSpaceUser.id,
              email: memberSpaceUser.email || "",
              firstName: memberSpaceUser.firstName || "",
              lastName: memberSpaceUser.lastName || "",
              planName: memberSpaceUser.planName || "",
              planId: memberSpaceUser.planId || "",
              isActive: memberSpaceUser.isActive || false,
            })
          } else {
            setUser(null)
          }
          setLoading(false)
        } else {
          // MemberSpace not loaded yet, try again
          timeoutId = setTimeout(loadMemberSpaceUser, 100)
        }
      } catch (err) {
        console.error("Error loading MemberSpace user:", err)
        setError("Failed to load user data")
        setLoading(false)
      }
    }

    // Start loading immediately
    loadMemberSpaceUser()

    // Set a maximum timeout of 10 seconds
    const maxTimeout = setTimeout(() => {
      if (loading) {
        console.warn("MemberSpace loading timeout")
        setLoading(false)
      }
    }, 10000)

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      clearTimeout(maxTimeout)
    }
  }, [tenantConfig.auth?.provider, loading])

  return { user, loading, error }
}

// Extend the Window interface to include MemberSpace
declare global {
  interface Window {
    MemberSpace: {
      getMember: () => any
      [key: string]: any
    }
  }
}
