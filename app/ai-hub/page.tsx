"use client"

import { useEffect } from "react"
import { useTracking } from "@/lib/hooks/use-tracking"

export default function AIHub() {
  const { trackPageView } = useTracking()

  useEffect(() => {
    trackPageView("/ai-hub")
  }, [])

  return (
    <div>
      <h1>AI Hub</h1>
      <p>Welcome to the AI Hub!</p>
    </div>
  )
}
