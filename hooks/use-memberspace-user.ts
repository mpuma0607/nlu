"use client"

import { useState, useEffect } from "react"

interface MemberSpaceUser {
  id: string
  email: string
  name?: string
  firstName?: string
  lastName?: string
  status?: string
  planName?: string
}

declare global {
  interface Window {
    MemberSpace?: {
      getCurrentMember(): Promise<MemberSpaceUser | null>
      onLogin(callback: (user: MemberSpaceUser) => void): void
      onLogout(callback: () => void): void
    }
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

        // Wait for MemberSpace to be available
        const waitForMemberSpace = () => {
          return new Promise<void>((resolve) => {
            if (window.MemberSpace) {
              resolve()
            } else {
              const checkInterval = setInterval(() => {
                if (window.MemberSpace) {
                  clearInterval(checkInterval)
                  resolve()
                }
              }, 100)
            }
          })
        }

        await waitForMemberSpace()

        if (window.MemberSpace?.getCurrentMember) {
          const currentUser = await window.MemberSpace.getCurrentMember()
          setUser(currentUser)
        }
      } catch (err) {
        console.error("Error fetching user:", err)
        setError(err instanceof Error ? err.message : "Unknown error")
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()

    // Set up event listeners if MemberSpace is available
    const setupListeners = () => {
      if (window.MemberSpace) {
        window.MemberSpace.onLogin?.((user) => {
          setUser(user)
          setLoading(false)
        })

        window.MemberSpace.onLogout?.(() => {
          setUser(null)
          setLoading(false)
        })
      }
    }

    setupListeners()
  }, [])

  return {
    user,
    loading,
    error,
    isLoggedIn: !!user,
  }
}
