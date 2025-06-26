import { type NextRequest, NextResponse } from "next/server"
import { trackPageView } from "@/lib/database/usage-tracking"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const success = await trackPageView({
      userEmail: data.userEmail,
      pagePath: data.pagePath,
      pageTitle: data.pageTitle,
      referrer: data.referrer,
      deviceType: data.deviceType,
      sessionId: data.sessionId,
      timeSpent: data.timeSpent,
    })

    return NextResponse.json({ success })
  } catch (error) {
    console.error("Page view tracking error:", error)
    return NextResponse.json(
      {
        error: "Failed to track page view",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
