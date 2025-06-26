import { sql } from "./connection"

export interface TrackingData {
  userEmail: string
  toolName: string
  actionType: "generate" | "download" | "email" | "copy" | "view"
  deviceType?: "mobile" | "desktop" | "tablet"
  userAgent?: string
  ipAddress?: string
  success?: boolean
  errorMessage?: string
  metadata?: Record<string, any>
}

export interface PageViewData {
  userEmail?: string
  pagePath: string
  pageTitle?: string
  referrer?: string
  deviceType?: string
  sessionId?: string
  timeSpent?: number
}

export interface ContentInteractionData {
  userEmail?: string
  contentType: "video" | "training" | "document"
  contentId: string
  contentTitle?: string
  interactionType: "view" | "complete" | "download"
  progressPercentage?: number
  deviceType?: string
}

// Track tool usage
export async function trackToolUsage(data: TrackingData) {
  try {
    await sql`
      INSERT INTO tool_usage (
        user_email, tool_name, action_type, device_type, 
        user_agent, ip_address, success, error_message, metadata
      ) VALUES (
        ${data.userEmail}, ${data.toolName}, ${data.actionType}, ${data.deviceType || null},
        ${data.userAgent || null}, ${data.ipAddress || null}, ${data.success ?? true}, 
        ${data.errorMessage || null}, ${JSON.stringify(data.metadata || {})}
      )
    `
    return true
  } catch (error) {
    console.error("Error tracking tool usage:", error)
    return false
  }
}

// Track page views
export async function trackPageView(data: PageViewData) {
  try {
    await sql`
      INSERT INTO page_views (
        user_email, page_path, page_title, referrer, 
        device_type, session_id, time_spent
      ) VALUES (
        ${data.userEmail || null}, ${data.pagePath}, ${data.pageTitle || null}, 
        ${data.referrer || null}, ${data.deviceType || null}, 
        ${data.sessionId || null}, ${data.timeSpent || null}
      )
    `
    return true
  } catch (error) {
    console.error("Error tracking page view:", error)
    return false
  }
}

// Track content interactions
export async function trackContentInteraction(data: ContentInteractionData) {
  try {
    await sql`
      INSERT INTO content_interactions (
        user_email, content_type, content_id, content_title,
        interaction_type, progress_percentage, device_type
      ) VALUES (
        ${data.userEmail || null}, ${data.contentType}, ${data.contentId}, 
        ${data.contentTitle || null}, ${data.interactionType}, 
        ${data.progressPercentage || 0}, ${data.deviceType || null}
      )
    `
    return true
  } catch (error) {
    console.error("Error tracking content interaction:", error)
    return false
  }
}

// Upsert user (create or update)
export async function upsertUser(email: string, name?: string, memberspaceId?: string) {
  try {
    await sql`
      INSERT INTO users (email, name, memberspace_id, last_active)
      VALUES (${email}, ${name || null}, ${memberspaceId || null}, CURRENT_TIMESTAMP)
      ON CONFLICT (email) 
      DO UPDATE SET 
        name = COALESCE(EXCLUDED.name, users.name),
        memberspace_id = COALESCE(EXCLUDED.memberspace_id, users.memberspace_id),
        last_active = CURRENT_TIMESTAMP
    `
    return true
  } catch (error) {
    console.error("Error upserting user:", error)
    return false
  }
}

// Get user usage statistics
export async function getUserUsageStats(userEmail: string, days = 30) {
  try {
    const stats = await sql`
      SELECT 
        tool_name,
        action_type,
        COUNT(*) as usage_count,
        DATE(created_at) as usage_date
      FROM tool_usage 
      WHERE user_email = ${userEmail} 
        AND created_at >= CURRENT_DATE - INTERVAL '${days} days'
      GROUP BY tool_name, action_type, DATE(created_at)
      ORDER BY usage_date DESC, usage_count DESC
    `
    return stats
  } catch (error) {
    console.error("Error getting user usage stats:", error)
    return []
  }
}

// Get platform-wide usage statistics (admin only)
export async function getPlatformUsageStats(days = 30) {
  try {
    const stats = await sql`
      SELECT 
        tool_name,
        action_type,
        COUNT(*) as total_usage,
        COUNT(DISTINCT user_email) as unique_users,
        DATE(created_at) as usage_date
      FROM tool_usage 
      WHERE created_at >= CURRENT_DATE - INTERVAL '${days} days'
      GROUP BY tool_name, action_type, DATE(created_at)
      ORDER BY usage_date DESC, total_usage DESC
    `
    return stats
  } catch (error) {
    console.error("Error getting platform usage stats:", error)
    return []
  }
}
