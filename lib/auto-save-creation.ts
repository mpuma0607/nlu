interface AutoSaveData {
  toolType: string
  title: string
  content: string
  formData?: any
  metadata?: any
}

export async function autoSaveCreation(data: AutoSaveData): Promise<boolean> {
  try {
    // Don't save RealDeal contract analyses
    if (data.toolType === "realdeal-ai") {
      return false
    }

    const response = await fetch("/api/user-creations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tool_type: data.toolType,
        title: data.title,
        content: data.content,
        form_data: data.formData,
        metadata: data.metadata,
      }),
    })

    return response.ok
  } catch (error) {
    console.error("Auto-save error:", error)
    return false
  }
}
