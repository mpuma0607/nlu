import { NextResponse } from "next/server"
import { initializeDatabase, testConnection } from "@/lib/database/connection"

export async function GET() {
  try {
    console.log("Starting database initialization...")

    // Test connection first
    console.log("Testing database connection...")
    const connectionTest = await testConnection()
    if (!connectionTest) {
      console.error("Database connection test failed")
      return NextResponse.json({ error: "Database connection failed" }, { status: 500 })
    }
    console.log("Database connection successful")

    // Initialize database
    console.log("Initializing database tables...")
    const initResult = await initializeDatabase()
    if (!initResult) {
      console.error("Database initialization returned false")
      return NextResponse.json({ error: "Database initialization failed" }, { status: 500 })
    }

    console.log("Database initialization completed successfully")
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
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 },
    )
  }
}
