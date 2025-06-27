import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const toolType = searchParams.get("toolType")

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 })
    }

    let query = sql`
      SELECT id, tool_type, title, content, form_data, metadata, created_at, expires_at
      FROM user_creations 
      WHERE user_id = ${userId}
    `

    if (toolType) {
      query = sql`
        SELECT id, tool_type, title, content, form_data, metadata, created_at, expires_at
        FROM user_creations 
        WHERE user_id = ${userId} AND tool_type = ${toolType}
      `
    }

    query = sql`
      SELECT id, tool_type, title, content, form_data, metadata, created_at, expires_at
      FROM user_creations 
      WHERE user_id = ${userId}
      ${toolType ? sql`AND tool_type = ${toolType}` : sql``}
      ORDER BY created_at DESC
    `

    const creations = await query

    return NextResponse.json({ creations })
  } catch (error) {
    console.error("Error fetching user creations:", error)
    return NextResponse.json({ error: "Failed to fetch user creations" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, userEmail, toolType, title, content, formData, metadata, expiresAt } = body

    if (!userId || !userEmail || !toolType || !title || !content) {
      return NextResponse.json(
        { error: "Missing required fields: userId, userEmail, toolType, title, content" },
        { status: 400 },
      )
    }

    const result = await sql`
      INSERT INTO user_creations (user_id, user_email, tool_type, title, content, form_data, metadata, expires_at)
      VALUES (${userId}, ${userEmail}, ${toolType}, ${title}, ${content}, ${formData ? JSON.stringify(formData) : null}, ${metadata ? JSON.stringify(metadata) : null}, ${expiresAt})
      RETURNING id, created_at
    `

    return NextResponse.json({
      success: true,
      id: result[0].id,
      createdAt: result[0].created_at,
    })
  } catch (error) {
    console.error("Error saving user creation:", error)
    return NextResponse.json({ error: "Failed to save user creation" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    const userId = searchParams.get("userId")

    if (!id || !userId) {
      return NextResponse.json({ error: "id and userId are required" }, { status: 400 })
    }

    await sql`
      DELETE FROM user_creations 
      WHERE id = ${id} AND user_id = ${userId}
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting user creation:", error)
    return NextResponse.json({ error: "Failed to delete user creation" }, { status: 500 })
  }
}
