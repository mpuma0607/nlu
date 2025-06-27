"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

// Generate a simple session ID
function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Get or create session ID
function getSessionId(): string {
  if (typeof window === "undefined") return ""

  let sessionId = sessionStorage.getItem("tracking_session_id")
  if (!sessionId) {
    sessionId = generateSessionId()
    sessionStorage.setItem("tracking_session_id", sessionId)
  }
  return sessionId
}

export function useTracking() {
  const pathname = usePathname()
  const lastPathRef = useRef<string>("")
  const isInitializedRef = useRef(false)

  useEffect(() => {
    // Skip if not in browser
    if (typeof window === "undefined") return

    // Only track if path has changed or first load
    if (pathname === lastPathRef.current && isInitializedRef.current) return

    lastPathRef.current = pathname
    isInitializedRef.current = true

    const sessionId = getSessionId()
    if (!sessionId) return

    // Small delay to ensure document is ready
    const timer = setTimeout(() => {
      // Track page view
      fetch("/api/track/page-view", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
          pagePath: pathname,
          pageTitle: document.title,
          referrer: document.referrer || undefined,
        }),
      }).catch((error) => {
        console.error("Failed to track page view:", error)
      })
    }, 100)

    return () => clearTimeout(timer)
  }, [pathname])

  const trackEvent = (eventType: string, eventData?: any) => {
    const sessionId = getSessionId()
    if (!sessionId) return

    fetch("/api/track/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId,
        eventType,
        eventData,
      }),
    }).catch((error) => {
      console.error("Failed to track event:", error)
    })
  }

  return { trackEvent }
}
