import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const { userId, userEmail, toolType, title, content, formData, metadata } = await request.json()

    if (!userId || !userEmail || !toolType || !title || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Don't save RealDeal contract analyses
    if (toolType === "realdeal-ai") {
      return NextResponse.json({
        success: true,
        message: "RealDeal content not saved for security",
      })
    }

    const result = await sql`
      INSERT INTO user_creations (
        user_id, user_email, tool_type, title, content, form_data, metadata, created_at, expires_at
      ) VALUES (
        ${userId}, ${userEmail}, ${toolType}, ${title}, ${content}, 
        ${JSON.stringify(formData)}, ${JSON.stringify(metadata)}, 
        NOW(), NOW() + INTERVAL '6 months'
      )
      RETURNING id, created_at
    `

    return NextResponse.json({
      success: true,
      id: result[0].id,
      createdAt: result[0].created_at,
    })
  } catch (error) {
    console.error("Error saving user creation:", error)
    return NextResponse.json({ error: "Failed to save creation" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const toolType = searchParams.get("toolType")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    let query = `
      SELECT id, tool_type, title, content, form_data, metadata, created_at, expires_at
      FROM user_creations 
      WHERE user_id = $1 AND expires_at > NOW()
    `
    const params = [userId]

    if (toolType) {
      query += ` AND tool_type = $2`
      params.push(toolType)
    }

    query += ` ORDER BY created_at DESC`

    const result = await sql(query, params)

    return NextResponse.json({
      success: true,
      creations: result,
    })
  } catch (error) {
    console.error("Error fetching user creations:", error)
    return NextResponse.json({ error: "Failed to fetch creations" }, { status: 500 })
  }
}
