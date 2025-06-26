import { type NextRequest, NextResponse } from "next/server"
import { trackToolUsage, upsertUser } from "@/lib/database/usage-tracking"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Upsert user first
    await upsertUser(data.userEmail)

    // Track the usage
    const success = await trackToolUsage({
      userEmail: data.userEmail,
      toolName: data.toolName,
      actionType: data.actionType,
      deviceType: data.deviceType,
      userAgent: data.userAgent,
      ipAddress: request.ip,
      success: data.success ?? true,
      errorMessage: data.errorMessage,
      metadata: data.metadata,
    })

    return NextResponse.json({ success })
  } catch (error) {
    console.error("Usage tracking error:", error)
    return NextResponse.json(
      {
        error: "Failed to track usage",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
