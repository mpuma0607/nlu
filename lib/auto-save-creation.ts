interface SaveCreationParams {
  userId: string
  toolType: string
  title: string
  content: string
  metadata?: Record<string, any>
}

export async function saveUserCreation(params: SaveCreationParams): Promise<boolean> {
  try {
    // Don't save RealDeal contract analyses
    if (params.toolType === "realdeal") {
      console.log("Skipping save for RealDeal contract analysis (security)")
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
    return result.success
  } catch (error) {
    console.error("Error saving user creation:", error)
    return false
  }
}

export async function getUserCreations(userId: string, toolType?: string) {
  try {
    const params = new URLSearchParams({ userId })
    if (toolType) {
      params.append("toolType", toolType)
    }

    const response = await fetch(`/api/user-creations?${params}`)

    if (!response.ok) {
      throw new Error("Failed to fetch creations")
    }

    const result = await response.json()
    return result.creations || []
  } catch (error) {
    console.error("Error fetching user creations:", error)
    return []
  }
}
