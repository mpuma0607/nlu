"use client"

import { useEffect } from "react"

interface UseTrackingProps {
  userEmail?: string
  toolName?: string
  pagePath?: string
  pageTitle?: string
}

export function useTracking({ userEmail, toolName, pagePath, pageTitle }: UseTrackingProps) {
  // Track page view
  useEffect(() => {
    if (pagePath) {
      trackPageView({
        userEmail,
        pagePath,
        pageTitle,
        deviceType: getDeviceType(),
        referrer: document.referrer,
      })
    }
  }, [pagePath, userEmail, pageTitle])

  // Function to track tool usage
  const trackToolUsage = async (
    actionType: "generate" | "download" | "email" | "copy",
    metadata?: Record<string, any>,
  ) => {
    if (!userEmail || !toolName) return

    try {
      await fetch("/api/track-usage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail,
          toolName,
          actionType,
          deviceType: getDeviceType(),
          userAgent: navigator.userAgent,
          metadata,
        }),
      })
    } catch (error) {
      console.error("Tracking error:", error)
    }
  }

  // Function to track page views
  const trackPageView = async (data: any) => {
    try {
      await fetch("/api/track-page-view", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
    } catch (error) {
      console.error("Page view tracking error:", error)
    }
  }

  return { trackToolUsage }
}

// Utility function to detect device type
function getDeviceType(): "mobile" | "desktop" | "tablet" {
  if (typeof window === "undefined") return "desktop"

  const userAgent = navigator.userAgent.toLowerCase()

  if (/tablet|ipad|playbook|silk/.test(userAgent)) {
    return "tablet"
  }

  if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/.test(userAgent)) {
    return "mobile"
  }

  return "desktop"
}
