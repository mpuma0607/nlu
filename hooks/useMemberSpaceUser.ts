"use client"

import { useState, useEffect } from "react"
import { useTenantConfig } from "@/contexts/tenant-context"

interface MemberSpaceUser {
  id: string
  email: string
  name: string
  planName?: string
  planId?: string
  customFields?: Record<string, any>
}

interface UseMemberSpaceUserReturn {
  user: MemberSpaceUser | null
  loading: boolean
  error: string | null
  isAuthenticated: boolean
  login: () => void
  logout: () => void
  refreshUser: () => Promise<void>
}

export function useMemberSpaceUser(): UseMemberSpaceUserReturn {
  const [user, setUser] = useState<MemberSpaceUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const tenantConfig = useTenantConfig()

  const login = () => {
    if (tenantConfig.auth.provider === "memberspace" && tenantConfig.auth.settings.memberspace?.loginUrl) {
      window.location.href = tenantConfig.auth.settings.memberspace.loginUrl
    }
  }

  const logout = () => {
    if (tenantConfig.auth.provider === "memberspace" && tenantConfig.auth.settings.memberspace?.logoutUrl) {
      window.location.href = tenantConfig.auth.settings.memberspace.logoutUrl
    }
  }

  const refreshUser = async () => {
    // Only proceed if this tenant uses MemberSpace
    if (tenantConfig.auth.provider !== "memberspace") {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      // Wait for MemberSpace to load
      let attempts = 0
      const maxAttempts = 100 // 10 seconds with 100ms intervals

      while (attempts < maxAttempts) {
        if (typeof window !== "undefined" && (window as any).MemberSpace) {
          break
        }
        await new Promise((resolve) => setTimeout(resolve, 100))
        attempts++
      }

      if (attempts >= maxAttempts) {
        throw new Error("MemberSpace failed to load")
      }

      const memberspace = (window as any).MemberSpace

      // Check if user is logged in
      const isLoggedIn = await new Promise<boolean>((resolve) => {
        memberspace.onReady = () => {
          resolve(memberspace.isLoggedIn())
        }
      })

      if (isLoggedIn) {
        // Get user data
        const userData = await new Promise<any>((resolve, reject) => {
          memberspace.getCurrentMember({
            success: (member: any) => resolve(member),
            error: (err: any) => reject(err),
          })
        })

        setUser({
          id: userData.id,
          email: userData.email,
          name: userData.name || userData.first_name + " " + userData.last_name,
          planName: userData.plan_name,
          planId: userData.plan_id,
          customFields: userData.custom_fields,
        })
      } else {
        setUser(null)
      }
    } catch (err) {
      console.error("Error loading MemberSpace user:", err)
      setError(err instanceof Error ? err.message : "Failed to load user")
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshUser()
  }, [tenantConfig.id])

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    logout,
    refreshUser,
  }
}
