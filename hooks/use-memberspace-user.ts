"use client"

import { useState, useEffect } from "react"
import { memberSpaceClient } from "@/lib/memberspace-client"

interface MemberSpaceUser {
  id: string
  email: string
  name?: string
  firstName?: string
  lastName?: string
  status: "active" | "inactive" | "trial"
  planName?: string
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

        const currentUser = await memberSpaceClient.getCurrentUser()
        setUser(currentUser)
      } catch (err) {
        console.error("Error fetching user:", err)
        setError(err instanceof Error ? err.message : "Unknown error")
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()

    // Listen for login/logout events
    memberSpaceClient.onLogin((user) => {
      setUser(user)
      setLoading(false)
    })

    memberSpaceClient.onLogout(() => {
      setUser(null)
      setLoading(false)
    })
  }, [])

  const refreshUser = async () => {
    setLoading(true)
    try {
      const currentUser = await memberSpaceClient.getCurrentUser()
      setUser(currentUser)
    } catch (err) {
      console.error("Error refreshing user:", err)
      setError(err instanceof Error ? err.message : "Unknown error")
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
