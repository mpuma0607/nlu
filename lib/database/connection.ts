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
    // Execute schema statements directly
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        memberspace_id VARCHAR(255),
        subscription_status VARCHAR(50) DEFAULT 'active'
      )
    `

    await sql`
      CREATE TABLE IF NOT EXISTS tool_usage (
        id SERIAL PRIMARY KEY,
        user_email VARCHAR(255) NOT NULL,
        tool_name VARCHAR(100) NOT NULL,
        action_type VARCHAR(50) NOT NULL,
        device_type VARCHAR(20),
        user_agent TEXT,
        ip_address INET,
        success BOOLEAN DEFAULT true,
        error_message TEXT,
        metadata JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    await sql`
      CREATE TABLE IF NOT EXISTS page_views (
        id SERIAL PRIMARY KEY,
        user_email VARCHAR(255),
        page_path VARCHAR(500) NOT NULL,
        page_title VARCHAR(255),
        referrer VARCHAR(500),
        device_type VARCHAR(20),
        session_id VARCHAR(255),
        time_spent INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    await sql`
      CREATE TABLE IF NOT EXISTS content_interactions (
        id SERIAL PRIMARY KEY,
        user_email VARCHAR(255),
        content_type VARCHAR(50) NOT NULL,
        content_id VARCHAR(255) NOT NULL,
        content_title VARCHAR(255),
        interaction_type VARCHAR(50) NOT NULL,
        progress_percentage INTEGER DEFAULT 0,
        device_type VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    await sql`
      CREATE TABLE IF NOT EXISTS user_sessions (
        id SERIAL PRIMARY KEY,
        user_email VARCHAR(255),
        session_id VARCHAR(255) UNIQUE NOT NULL,
        device_type VARCHAR(20),
        user_agent TEXT,
        ip_address INET,
        started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ended_at TIMESTAMP,
        page_count INTEGER DEFAULT 0,
        tool_usage_count INTEGER DEFAULT 0
      )
    `

    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_tool_usage_user_email ON tool_usage(user_email)`
    await sql`CREATE INDEX IF NOT EXISTS idx_tool_usage_created_at ON tool_usage(created_at)`
    await sql`CREATE INDEX IF NOT EXISTS idx_tool_usage_tool_name ON tool_usage(tool_name)`
    await sql`CREATE INDEX IF NOT EXISTS idx_page_views_user_email ON page_views(user_email)`
    await sql`CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at)`
    await sql`CREATE INDEX IF NOT EXISTS idx_content_interactions_user_email ON content_interactions(user_email)`
    await sql`CREATE INDEX IF NOT EXISTS idx_user_sessions_user_email ON user_sessions(user_email)`

    console.log("Database initialized successfully")
    return true
  } catch (error) {
    console.error("Database initialization failed:", error)
    return false
  }
}
