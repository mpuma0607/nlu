import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userEmail, toolType, title, content, formData, metadata } = body

    if (!userEmail || !toolType || !title || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Don't save RealDeal contract analyses
    if (toolType === "realdeal-ai") {
      return NextResponse.json({
        success: true,
        message: "RealDeal content not saved for security",
      })
    }

    // Insert new creation
    const result = await sql`
      INSERT INTO user_creations (user_email, tool_type, title, content, form_data, metadata)
      VALUES (${userEmail}, ${toolType}, ${title}, ${content}, ${JSON.stringify(formData)}, ${JSON.stringify(metadata)})
      RETURNING id
    `

    return NextResponse.json({ success: true, id: result[0].id })
  } catch (error) {
    console.error("Error saving user creation:", error)
    return NextResponse.json({ error: "Failed to save creation" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Get user creations from database
    const creations = await sql`
      SELECT * FROM user_creations 
      WHERE user_email = ${email}
      ORDER BY created_at DESC
    `

    return NextResponse.json({ creations })
  } catch (error) {
    console.error("Error fetching user creations:", error)
    return NextResponse.json({ error: "Failed to fetch user creations" }, { status: 500 })
  }
}
