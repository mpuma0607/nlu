import { type NextRequest, NextResponse } from "next/server"
import { userCreationsService } from "@/lib/user-creations"
import { memberSpaceAPI } from "@/lib/memberspace-api"

export async function GET(request: NextRequest) {
  try {
    // Get current user
    const sessionToken = request.cookies.get("memberspace_session")?.value
    const userResult = await memberSpaceAPI.getCurrentUser(sessionToken)

    if (!userResult.success || !userResult.user) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const toolType = searchParams.get("tool_type")
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    let creations
    if (toolType) {
      creations = await userCreationsService.getUserCreationsByTool(userResult.user.id, toolType)
    } else {
      creations = await userCreationsService.getUserCreations(userResult.user.id, limit, offset)
    }

    return NextResponse.json({
      success: true,
      creations,
    })
  } catch (error) {
    console.error("User creations API error:", error)
    return NextResponse.json({ error: "Failed to fetch creations" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get current user
    const sessionToken = request.cookies.get("memberspace_session")?.value
    const userResult = await memberSpaceAPI.getCurrentUser(sessionToken)

    if (!userResult.success || !userResult.user) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 })
    }

    const body = await request.json()
    const { tool_type, title, content, form_data, metadata } = body

    if (!tool_type || !title || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Don't save RealDeal contract analyses
    if (tool_type === "realdeal-ai") {
      return NextResponse.json({ error: "Contract analyses are not stored for security reasons" }, { status: 400 })
    }

    const creation = await userCreationsService.saveCreation({
      user_id: userResult.user.id,
      user_email: userResult.user.email,
      tool_type,
      title,
      content,
      form_data,
      metadata,
    })

    return NextResponse.json({
      success: true,
      creation,
    })
  } catch (error) {
    console.error("Save creation API error:", error)
    return NextResponse.json({ error: "Failed to save creation" }, { status: 500 })
  }
}
