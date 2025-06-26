import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, toolType, title, content, metadata } = body

    if (!userId || !toolType || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Don't save RealDeal contract analyses
    if (toolType === "realdeal") {
      return NextResponse.json({
        success: true,
        message: "Contract analysis not saved for security reasons",
      })
    }

    const result = await sql`
      INSERT INTO user_creations (
        user_id, 
        tool_type, 
        title, 
        content, 
        metadata,
        created_at
      ) VALUES (
        ${userId}, 
        ${toolType}, 
        ${title}, 
        ${content}, 
        ${JSON.stringify(metadata)},
        NOW()
      )
      RETURNING id, created_at
    `

    return NextResponse.json({
      success: true,
      creation: result[0],
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
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    let query = `
      SELECT id, tool_type, title, content, metadata, created_at, updated_at
      FROM user_creations 
      WHERE user_id = $1
    `
    const params = [userId]

    if (toolType) {
      query += ` AND tool_type = $2`
      params.push(toolType)
    }

    query += ` ORDER BY created_at DESC LIMIT 50`

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
