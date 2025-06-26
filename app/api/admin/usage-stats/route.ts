import { type NextRequest, NextResponse } from "next/server"
import { getPlatformUsageStats } from "@/lib/database/usage-tracking"

// Admin email - replace with your actual email
const ADMIN_EMAIL = "your-admin-email@example.com"

export async function GET(request: NextRequest) {
  try {
    // Get user email from query params or headers (you'll need to implement auth)
    const userEmail = request.nextUrl.searchParams.get("email")

    // Simple admin check - you might want to implement proper auth
    if (userEmail !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const days = Number.parseInt(request.nextUrl.searchParams.get("days") || "30")
    const stats = await getPlatformUsageStats(days)

    return NextResponse.json({ success: true, stats })
  } catch (error) {
    console.error("Error fetching usage stats:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch usage stats",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
