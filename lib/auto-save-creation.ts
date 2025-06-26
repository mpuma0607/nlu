interface SaveCreationParams {
  userId: string
  userEmail: string
  toolType: string
  title: string
  content: string
  formData?: any
  metadata?: any
}

export async function saveUserCreation(params: SaveCreationParams): Promise<boolean> {
  try {
    // Don't save RealDeal contract analyses
    if (params.toolType === "realdeal-ai") {
      console.log("Skipping save for RealDeal contract analysis (security policy)")
      return true
    }

    const response = await fetch("/api/user-creations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      throw new Error("Failed to save creation")
    }

    const result = await response.json()
    console.log("Creation saved successfully:", result)
    return true
  } catch (error) {
    console.error("Error saving creation:", error)
    return false
  }
}

// Helper function to generate titles for different tool types
export function generateCreationTitle(toolType: string, formData: any): string {
  switch (toolType) {
    case "listit-ai":
      return `Listing: ${formData.propertyAddress || "Property"}`
    case "realbio":
      return `Bio: ${formData.agentName || "Agent"}`
    case "scriptit-ai":
      return `Script: ${formData.scriptType || "Custom"}`
    case "quickcma-ai":
      return `CMA: ${formData.address || "Property"}`
    case "action-ai":
      return `Action Plan: ${new Date().toLocaleDateString()}`
    case "bizplan-ai":
      return `Business Plan: ${formData.agentName || "Agent"}`
    case "ideahub-ai":
      return `Content Ideas: ${formData.contentType || "Social Media"}`
    case "goalscreen-ai":
      return `Goal Wallpaper: ${new Date().toLocaleDateString()}`
    case "realcoach-ai":
      return `Coaching: ${formData.focusArea || "Business"}`
    default:
      return `${toolType}: ${new Date().toLocaleDateString()}`
  }
}
