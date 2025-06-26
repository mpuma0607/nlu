"use client"

import { useState, useEffect } from "react"

interface MemberSpaceUser {
  id: string
  email: string
  name?: string
  status: "active" | "inactive" | "trial"
  subscription?: {
    plan: string
    status: string
    expires_at?: string
  }
}

export function useMemberSpaceUser() {
  const [user, setUser] = useState<MemberSpaceUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch("/api/memberspace/current-user")

        if (!response.ok) {
          if (response.status === 401) {
            // User not logged in
            setUser(null)
            return
          }
          throw new Error("Failed to fetch user")
        }

        const data = await response.json()
        setUser(data.user)
      } catch (err) {
        console.error("Error fetching user:", err)
        setError(err instanceof Error ? err.message : "Unknown error")
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const refreshUser = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/memberspace/current-user")
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      }
    } catch (err) {
      console.error("Error refreshing user:", err)
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    loading,
    error,
    refreshUser,
    isLoggedIn: !!user,
  }
}
