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

  useEffect(() => {
    // Only track if path has changed
    if (pathname === lastPathRef.current) return
    lastPathRef.current = pathname

    const sessionId = getSessionId()
    if (!sessionId) return

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
