import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

// Create the SQL client
export const sql = neon(process.env.DATABASE_URL)

// Test database connection
export async function testConnection() {
  try {
    const result = await sql`SELECT NOW() as current_time`
    console.log("Database connected successfully:", result[0].current_time)
    return true
  } catch (error) {
    console.error("Database connection failed:", error)
    return false
  }
}

// Initialize database tables
export async function initializeDatabase() {
  try {
    // Read and execute schema
    const fs = require("fs")
    const path = require("path")
    const schemaPath = path.join(process.cwd(), "lib/database/schema.sql")
    const schema = fs.readFileSync(schemaPath, "utf8")

    // Split by semicolon and execute each statement
    const statements = schema.split(";").filter((stmt) => stmt.trim().length > 0)

    for (const statement of statements) {
      await sql`${statement}`
    }

    console.log("Database initialized successfully")
    return true
  } catch (error) {
    console.error("Database initialization failed:", error)
    return false
  }
}
