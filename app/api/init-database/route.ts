import { NextResponse } from "next/server"
import { initializeDatabase, testConnection } from "@/lib/database/connection"

export async function GET() {
  try {
    // Test connection first
    const connectionTest = await testConnection()
    if (!connectionTest) {
      return NextResponse.json({ error: "Database connection failed" }, { status: 500 })
    }

    // Initialize database
    const initResult = await initializeDatabase()
    if (!initResult) {
      return NextResponse.json({ error: "Database initialization failed" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Database initialized successfully",
    })
  } catch (error) {
    console.error("Database initialization error:", error)
    return NextResponse.json(
      {
        error: "Database initialization failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
