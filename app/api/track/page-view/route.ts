import { type NextRequest, NextResponse } from "next/server"
import { createOrUpdateSession, trackPageView } from "@/lib/tracking"

export async function POST(request: NextRequest) {
  try {
    const { sessionId, pagePath, pageTitle, referrer } = await request.json()

    if (!sessionId || !pagePath) {
      return NextResponse.json({ error: "Session ID and page path are required" }, { status: 400 })
    }

    // Get user info
    const userAgent = request.headers.get("user-agent") || undefined
    const forwarded = request.headers.get("x-forwarded-for")
    const ipAddress = forwarded ? forwarded.split(",")[0] : request.ip

    // Create or update session
    await createOrUpdateSession(sessionId, userAgent, ipAddress)

    // Track page view
    await trackPageView(sessionId, pagePath, pageTitle, referrer)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error tracking page view:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
