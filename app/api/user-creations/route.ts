import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const creations = await sql`
      SELECT * FROM user_creations 
      WHERE user_id = ${userId} 
      ORDER BY created_at DESC
    `

    return NextResponse.json({ creations })
  } catch (error) {
    console.error("Error fetching user creations:", error)
    return NextResponse.json({ error: "Failed to fetch user creations" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, userEmail, toolType, title, content, formData, metadata } = body

    if (!userId || !userEmail || !toolType || !title || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Set expiration to 30 days from now
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 30)

    const result = await sql`
      INSERT INTO user_creations (user_id, user_email, tool_type, title, content, form_data, metadata, expires_at)
      VALUES (${userId}, ${userEmail}, ${toolType}, ${title}, ${content}, ${JSON.stringify(formData)}, ${JSON.stringify(metadata)}, ${expiresAt})
      RETURNING *
    `

    return NextResponse.json({
      success: true,
      creation: result[0],
    })
  } catch (error) {
    console.error("Error saving user creation:", error)
    return NextResponse.json({ error: "Failed to save user creation" }, { status: 500 })
  }
}
