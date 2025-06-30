"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface IdeaHubFormData {
  topic: string
  contentType: string
  tonality: string
  additionalContext: string
}

export async function generateIdeaHubContent(formData: IdeaHubFormData) {
  const { topic, contentType, tonality, additionalContext } = formData

  // Map tonality values to descriptive text for the prompt
  const tonalityMap: Record<string, string> = {
    "professional-authoritative": "professional and authoritative tone - confident, knowledgeable, clear",
    "friendly-approachable": "friendly and approachable tone - warm, conversational, down-to-earth",
    "witty-playful": "witty and playful tone - lighthearted, tongue-in-cheek, surprising twists",
    "inspirational-motivational": "inspirational and motivational tone - uplifting, aspirational, empowering",
    "educational-informative": "educational and informative tone - clear, explanatory, step-by-step",
    "conversational-story-driven":
      "conversational and story-driven tone - narrative, personal anecdotes, dialogue style",
    "urgent-action-oriented": "urgent and action-oriented tone - direct, brisk, focused on 'now'",
    "empathetic-supportive": "empathetic and supportive tone - compassionate, understanding, reassuring",
    "visionary-futuristic": "visionary and futuristic tone - forward-looking, trend-spotting, big-picture",
    "bold-disruptive": "bold and disruptive tone - challenging conventions, strong opinions, confident declarations",
  }

  const selectedTonality = tonalityMap[tonality] || "professional and authoritative tone"

  const prompt = `You are a professional real estate content creator. Generate engaging ${contentType} content about "${topic}" using a ${selectedTonality}.

${additionalContext ? `Additional context: ${additionalContext}` : ""}

Requirements:
- Make it engaging and valuable for real estate professionals and their clients
- Include relevant real estate insights and practical advice
- Use appropriate formatting for the content type
- Keep it professional yet accessible
- Include a compelling call-to-action when appropriate
- Ensure the content reflects the specified tonality throughout

Generate high-quality content that real estate agents can use immediately.`

  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      maxTokens: 1000,
    })

    return text
  } catch (error) {
    console.error("Error generating content:", error)
    throw new Error("Failed to generate content")
  }
}
