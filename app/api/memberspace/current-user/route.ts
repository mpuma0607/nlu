import { type NextRequest, NextResponse } from "next/server"
import { memberSpaceAPI } from "@/lib/memberspace-api"

export async function GET(request: NextRequest) {
  try {
    // Try to get session token from cookies or headers
    const sessionToken =
      request.cookies.get("memberspace_session")?.value || request.headers.get("x-memberspace-session")

    const result = await memberSpaceAPI.getCurrentUser(sessionToken)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      user: result.user,
    })
  } catch (error) {
    console.error("Current user API error:", error)
    return NextResponse.json({ error: "Failed to get current user" }, { status: 500 })
  }
}
